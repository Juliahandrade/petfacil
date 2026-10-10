
import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

import { Produto } from "../data/produtos";
import { apiPost } from "../services/api";
import { useAuth } from "./AuthContext";

type ItemCarrinho = {
  produto: Produto;
  quantidade: number;
};

type CartContextData = {
  itens: ItemCarrinho[];
  adicionarAoCarrinho: (produto: Produto) => void;
  aumentarQuantidade: (produtoId: string) => void;
  diminuirQuantidade: (produtoId: string) => void;
  removerDoCarrinho: (produtoId: string) => void;
  calcularSubtotal: (item: ItemCarrinho) => number;
  calcularTotal: () => number;
  finalizarPedido: () => Promise<boolean>;
};

const CartContext = createContext<CartContextData | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const { token } = useAuth();

  function adicionarAoCarrinho(produto: Produto) {
    setItens((atuais) => {
      const existente = atuais.find(
        (item) => item.produto.id === produto.id
      );

      if (existente) {
        return atuais.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      return [...atuais, { produto, quantidade: 1 }];
    });
  }

  function aumentarQuantidade(produtoId: string) {
    setItens((atuais) =>
      atuais.map((item) =>
        item.produto.id === produtoId
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    );
  }

  function diminuirQuantidade(produtoId: string) {
    setItens((atuais) =>
      atuais
        .map((item) =>
          item.produto.id === produtoId
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  }

  function removerDoCarrinho(produtoId: string) {
    setItens((atuais) =>
      atuais.filter((item) => item.produto.id !== produtoId)
    );
  }

  function calcularSubtotal(item: ItemCarrinho) {
    const promocional = item.produto.precoPromocional;
    const preco =
      promocional != null && promocional < item.produto.precoAtual
        ? promocional
        : item.produto.precoAtual;

    return preco * item.quantidade;
  }

  function calcularTotal() {
    return itens.reduce(
      (total, item) => total + calcularSubtotal(item),
      0
    );
  }

  async function finalizarPedido(): Promise<boolean> {
    if (!token || itens.length === 0) {
      return false;
    }

    try {
      await apiPost(
        "/api/compras",
        {
          itens: itens.map((item) => ({
            produto: item.produto.id,
            quantidade: item.quantidade,
          })),
        },
        token
      );

      setItens([]);
      return true;
    } catch (error) {
      console.log(
        "Erro ao finalizar pedido:",
        error instanceof Error ? error.message : error
      );

      return false;
    }
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
    throw new Error("useCart deve ser usado dentro de CartProvider");
  }

  return context;
}
