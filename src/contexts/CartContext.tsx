import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

import { Produto } from "../data/produtos";
import { comprasMock } from "../data/compras";

type ItemCarrinho = {
  produto: Produto;
  quantidade: number;
};

type CartContextData = {
  itens: ItemCarrinho[];
  adicionarAoCarrinho: (produto: Produto) => void;
  aumentarQuantidade: (produtoId: number) => void;
  diminuirQuantidade: (produtoId: number) => void;
  removerDoCarrinho: (produtoId: number) => void;
  calcularSubtotal: (item: ItemCarrinho) => number;
  calcularTotal: () => number;
  finalizarPedido: () => void;
};

const CartContext = createContext<CartContextData | undefined>(
  undefined
);

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);

  function adicionarAoCarrinho(produto: Produto) {
    setItens((itensAtuais) => {
      const itemExistente = itensAtuais.find(
        (item) => item.produto.id === produto.id
      );

      if (itemExistente) {
        return itensAtuais.map((item) =>
          item.produto.id === produto.id
            ? {
                ...item,
                quantidade: item.quantidade + 1,
              }
            : item
        );
      }

      return [
        ...itensAtuais,
        {
          produto,
          quantidade: 1,
        },
      ];
    });
  }

  function aumentarQuantidade(produtoId: number) {
    setItens((itensAtuais) =>
      itensAtuais.map((item) =>
        item.produto.id === produtoId
          ? {
              ...item,
              quantidade: item.quantidade + 1,
            }
          : item
      )
    );
  }

  function diminuirQuantidade(produtoId: number) {
    setItens((itensAtuais) =>
      itensAtuais
        .map((item) =>
          item.produto.id === produtoId
            ? {
                ...item,
                quantidade: item.quantidade - 1,
              }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  }

  function removerDoCarrinho(produtoId: number) {
    setItens((itensAtuais) =>
      itensAtuais.filter(
        (item) => item.produto.id !== produtoId
      )
    );
  }

  function calcularSubtotal(item: ItemCarrinho) {
    const preco =
      item.produto.precoPromocional < item.produto.precoAtual
        ? item.produto.precoPromocional
        : item.produto.precoAtual;

    return preco * item.quantidade;
  }

  function calcularTotal() {
    return itens.reduce(
      (total, item) => total + calcularSubtotal(item),
      0
    );
  }

  function finalizarPedido() {
    const dataCompra = new Date().toLocaleDateString("pt-BR");

    itens.forEach((item) => {
      const preco =
        item.produto.precoPromocional < item.produto.precoAtual
          ? item.produto.precoPromocional
          : item.produto.precoAtual;

      // Cria apenas UM registro para cada produto comprado
      comprasMock.push({
        nomeProduto: item.produto.nome,
        preco: preco,
        dataCompra: dataCompra,
      });
    });

    setItens([]);
  }

  return (
    <CartContext.Provider
      value={{
        itens,
        adicionarAoCarrinho,
        aumentarQuantidade,
        diminuirQuantidade,
        removerDoCarrinho,
        calcularSubtotal,
        calcularTotal,
        finalizarPedido,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart deve ser usado dentro de CartProvider"
    );
  }

  return context;
}