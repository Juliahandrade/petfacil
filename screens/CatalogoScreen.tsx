
import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { Produto } from "../src/data/produtos";
import { useCart } from "../src/contexts/CartContext";
import { useAuth } from "../src/contexts/AuthContext";
import { apiGet } from "../src/services/api";
import type { RootStackParamList } from "../navigation/AppNavigator";
import Assistente from "../src/components/Assistente";
import CardProduto from "../src/components/CardProduto";

type CatalogoScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Catalogo"
>;

type ProdutoApi = {
  _id: string;
  nome: string;
  precoAtual: number;
  precoPromocional?: number;
  tipo: string;
  descricao: string;
  dataValidade?: string;
};

type RespostaProdutos = {
  success: boolean;
  produtos: ProdutoApi[];
};

function formatarValidade(data?: string) {
  if (!data) {
    return "Não se aplica";
  }

  const parteData = data.slice(0, 10);

  if (/^\d{4}-\d{2}-\d{2}$/.test(parteData)) {
    const [ano, mes, dia] = parteData.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  return data;
}

export default function CatalogoScreen({
  navigation,
}: CatalogoScreenProps) {
  const { adicionarAoCarrinho, itens } = useCart();
  const { sair } = useAuth();

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    let ativo = true;

    async function carregarProdutos() {
      try {
        setCarregando(true);
        setErro(false);

        const resposta = await apiGet<RespostaProdutos>(
          "/api/products"
        );

        const produtosFormatados: Produto[] =
          resposta.produtos.map((produto) => ({
            id: produto._id,
            nome: produto.nome,
            precoAtual: produto.precoAtual,
            precoPromocional:
              produto.precoPromocional ?? produto.precoAtual,
            tipo: produto.tipo,
            descricao: produto.descricao,
            dataValidade: formatarValidade(
              produto.dataValidade
            ),
          }));

        if (ativo) {
          setProdutos(produtosFormatados);
        }
      } catch {
        if (ativo) {
          setErro(true);
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarProdutos();

    return () => {
      ativo = false;
    };
  }, []);

  function handleSair() {
    sair();

    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  }

  if (carregando) {
    return (
      <View style={styles.emptyContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.emptySubtitle}>
          Carregando produtos...
        </Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>
          Não foi possível carregar os produtos
        </Text>

        <Text style={styles.emptySubtitle}>
          Confira se o backend está funcionando e tente novamente.
        </Text>

        <Pressable
          style={styles.historyButton}
          onPress={() => navigation.replace("Catalogo")}
        >
          <Text style={styles.historyButtonText}>
            Tentar novamente
          </Text>
        </Pressable>

        <Pressable
          style={styles.logoutButton}
          onPress={handleSair}
        >
          <Text style={styles.logoutText}>
            Sair da conta
          </Text>
        </Pressable>
      </View>
    );
  }

  if (produtos.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>
          Nenhum produto disponível
        </Text>

        <Text style={styles.emptySubtitle}>
          No momento não há produtos cadastrados.
        </Text>

        <Pressable
          style={styles.logoutButton}
          onPress={handleSair}
        >
          <Text style={styles.logoutText}>
            Sair da conta
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Catálogo</Text>

        <Pressable
          style={styles.cartIconButton}
          onPress={() => navigation.navigate("Carrinho")}
        >
          <Text style={styles.cartIcon}>🛒</Text>

          {itens.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>
                {itens.length}
              </Text>
            </View>
          )}
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subtitle}>
          Encontre os melhores produtos para o seu pet.
        </Text>

        <Pressable
          style={styles.historyButton}
          onPress={() =>
            navigation.navigate("HistoricoCompras")
          }
        >
          <Text style={styles.historyButtonText}>
            🧾 Histórico de compras
          </Text>
        </Pressable>

        {produtos.map((produto) => (
          <CardProduto
            key={produto.id}
            produto={produto}
            onPress={() =>
              navigation.navigate("DetalhesProduto", {
                produtoId: produto.id,
              })
            }
            onAdicionar={() => adicionarAoCarrinho(produto)}
          />
        ))}

        <Pressable
          style={styles.logoutButton}
          onPress={handleSair}
        >
          <Text style={styles.logoutText}>
            Sair da conta
          </Text>
        </Pressable>
      </ScrollView>

      <Assistente />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAFF",
  },

  content: {
    padding: 24,
    paddingTop: 12,
    paddingBottom: 40,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#1E3A8A",
  },

  subtitle: {
    fontSize: 15,
    color: "#5F6B7A",
    marginTop: 6,
    marginBottom: 16,
  },

  historyButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#2563EB",
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
    marginBottom: 20,
  },

  historyButtonText: {
    color: "#2563EB",
    fontSize: 15,
    fontWeight: "700",
  },

  logoutButton: {
    backgroundColor: "#DC2626",
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 12,
  },

  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#F7FAFF",
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1E3A8A",
    textAlign: "center",
    marginBottom: 8,
  },

  emptySubtitle: {
    fontSize: 15,
    color: "#5F6B7A",
    textAlign: "center",
    marginTop: 12,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 6,
    backgroundColor: "#F7FAFF",
  },

  cartIconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E8F1FF",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  cartIcon: {
    fontSize: 24,
  },

  cartBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },

  cartBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },
});
