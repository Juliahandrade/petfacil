import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCart } from "../src/contexts/CartContext";
import { apiGet } from "../src/services/api";
import { RootStackParamList } from "../navigation/AppNavigator";
import Assistente from "../src/components/Assistente";
import CardProduto from "../src/components/CardProduto";
import type { Produto } from "../src/data/produtos";

type Props = NativeStackScreenProps<RootStackParamList, "Catalogo">;

function formatarValidade(valor: unknown): string {
  if (valor === null || valor === undefined || valor === "") {
    return "Não informada";
  }

  if (typeof valor === "string") {
    const correspondencia = valor.match(/^(\d{4})-(\d{2})-(\d{2})/);

    if (correspondencia) {
      return `${correspondencia[3]}/${correspondencia[2]}/${correspondencia[1]}`;
    }

    const data = new Date(valor);

    if (!Number.isNaN(data.getTime())) {
      return data.toLocaleDateString("pt-BR", {
        timeZone: "UTC",
      });
    }

    return valor;
  }

  const data = new Date(valor as number);

  if (Number.isNaN(data.getTime())) {
    return "Não informada";
  }

  return data.toLocaleDateString("pt-BR", {
    timeZone: "UTC",
  });
}

export default function CatalogoScreen({ navigation }: Props) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const { adicionarAoCarrinho, itens } = useCart();

  const carregarProdutos = useCallback(async () => {
    try {
      setCarregando(true);
      setErro(false);

      const resposta: any = await apiGet("/api/products");

      const lista = Array.isArray(resposta)
        ? resposta
        : resposta?.produtos || resposta?.products || [];

      const produtosFormatados: Produto[] = lista.map((produto: any) => {
        const precoAtual = Number(
          produto.precoAtual ?? produto.preco ?? produto.price ?? 0
        );

        const valorPromocional = produto.precoPromocional;
        const precoPromocional =
          valorPromocional === null ||
          valorPromocional === undefined ||
          valorPromocional === ""
            ? precoAtual
            : Number(valorPromocional);

        return {
          ...produto,
          id: produto._id || produto.id,
          nome:
            produto.nome ||
            produto.nomeProduto ||
            produto.name ||
            "Produto",
          descricao: produto.descricao || produto.description || "",
          precoAtual,
          precoPromocional,
          tipo:
            produto.tipo ||
            produto.categoria ||
            produto.category ||
            "Geral",
          dataValidade: formatarValidade(
            produto.dataValidade ?? produto.validade
          ),
        } as Produto;
      });

      setProdutos(produtosFormatados);
    } catch {
      setErro(true);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarProdutos();
  }, [carregarProdutos]);

  const quantidadeCarrinho = Array.isArray(itens)
    ? itens.reduce(
        (total: number, item: any) =>
          total + (Number(item.quantidade) || 1),
        0
      )
    : 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.marca}>
          <Text style={styles.logo}>PetFacil</Text>
          <Text style={styles.subtitulo}>
            Cuidado e carinho para seu pet
          </Text>
        </View>

        <View style={styles.headerActions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Abrir perfil"
            style={({ pressed }) => [
              styles.iconeBotao,
              pressed && styles.iconePressionado,
            ]}
            onPress={() => navigation.navigate("Perfil" as never)}
          >
            <View style={styles.perfilIcone}>
              <View style={styles.perfilCabeca} />
              <View style={styles.perfilCorpo} />
            </View>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Abrir carrinho"
            style={({ pressed }) => [
              styles.iconeBotao,
              pressed && styles.iconePressionado,
            ]}
            onPress={() => navigation.navigate("Carrinho")}
          >
            <View style={styles.carrinhoIcone}>
              <View style={styles.carrinhoAlca} />
              <View style={styles.carrinhoCesto} />
              <View style={styles.carrinhoRodaEsquerda} />
              <View style={styles.carrinhoRodaDireita} />
            </View>

            {quantidadeCarrinho > 0 && (
              <View style={styles.contadorCarrinho}>
                <Text style={styles.contadorTexto}>
                  {quantidadeCarrinho > 99 ? "99+" : quantidadeCarrinho}
                </Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.tituloSecaoContainer}>
          <Text style={styles.tituloSecao}>Nossos produtos</Text>
          <Text style={styles.descricaoSecao}>
            Confira as opções disponíveis para seu pet.
          </Text>
        </View>

        {carregando ? (
          <View style={styles.estadoContainer}>
            <ActivityIndicator size="large" color="#2563EB" />
            <Text style={styles.estadoTexto}>
              Carregando produtos...
            </Text>
          </View>
        ) : erro ? (
          <View style={styles.estadoContainer}>
            <Text style={styles.estadoTitulo}>
              Não foi possível carregar os produtos
            </Text>
            <Text style={styles.estadoTexto}>
              Confira sua conexão e tente novamente.
            </Text>
            <Pressable
              style={styles.botaoTentar}
              onPress={carregarProdutos}
            >
              <Text style={styles.botaoTentarTexto}>
                Tentar novamente
              </Text>
            </Pressable>
          </View>
        ) : produtos.length === 0 ? (
          <View style={styles.estadoContainer}>
            <Text style={styles.estadoTitulo}>
              Nenhum produto disponível
            </Text>
            <Text style={styles.estadoTexto}>
              Os produtos aparecerão aqui quando estiverem cadastrados.
            </Text>
          </View>
        ) : (
          <View style={styles.listaProdutos}>
            {produtos.map((produto, indice) => (
              <View
                key={String(
                  (produto as any)._id ||
                    (produto as any).id ||
                    `${produto.nome}-${indice}`
                )}
                style={styles.produtoContainer}
              >
                <CardProduto
                  produto={produto}
                  onAdicionar={() => adicionarAoCarrinho(produto)}
                  onPress={() =>
                    navigation.navigate("DetalhesProduto", {
                      produtoId: String(
                        (produto as any)._id || (produto as any).id
                      ),
                    })
                  }
                />
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <Assistente />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    minHeight: 88,
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  marca: {
    flex: 1,
    marginRight: 12,
  },
  logo: {
    fontSize: 25,
    fontWeight: "800",
    color: "#1D4ED8",
    letterSpacing: -0.7,
  },
  subtitulo: {
    marginTop: 3,
    fontSize: 11,
    color: "#64748B",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconeBotao: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    position: "relative",
  },
  iconePressionado: {
    opacity: 0.55,
  },
  perfilIcone: {
    width: 26,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  perfilCabeca: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: "#2563EB",
    marginBottom: 2,
  },
  perfilCorpo: {
    width: 19,
    height: 11,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: "#2563EB",
  },
  carrinhoIcone: {
    width: 27,
    height: 26,
    position: "relative",
    alignItems: "center",
  },
  carrinhoAlca: {
    position: "absolute",
    width: 7,
    height: 2,
    backgroundColor: "#2563EB",
    top: 4,
    left: 0,
    transform: [{ rotate: "55deg" }],
    borderRadius: 2,
  },
  carrinhoCesto: {
    position: "absolute",
    width: 19,
    height: 12,
    top: 7,
    left: 6,
    borderWidth: 2,
    borderColor: "#2563EB",
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    transform: [{ skewX: "-8deg" }],
  },
  carrinhoRodaEsquerda: {
    position: "absolute",
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#2563EB",
    bottom: 0,
    left: 9,
  },
  carrinhoRodaDireita: {
    position: "absolute",
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#2563EB",
    bottom: 0,
    right: 3,
  },
  contadorCarrinho: {
    position: "absolute",
    top: 0,
    right: -2,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 9,
    backgroundColor: "#DC2626",
    alignItems: "center",
    justifyContent: "center",
  },
  contadorTexto: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
  scroll: {
    flex: 1,
  },
  conteudo: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 100,
  },
  tituloSecaoContainer: {
    marginBottom: 18,
  },
  tituloSecao: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
  },
  descricaoSecao: {
    marginTop: 5,
    fontSize: 13,
    color: "#64748B",
  },
  listaProdutos: {
    gap: 16,
  },
  produtoContainer: {
    marginBottom: 4,
  },
  estadoContainer: {
    minHeight: 190,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  estadoTitulo: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 8,
  },
  estadoTexto: {
    fontSize: 14,
    lineHeight: 20,
    color: "#64748B",
    textAlign: "center",
    marginTop: 10,
  },
  botaoTentar: {
    marginTop: 18,
    backgroundColor: "#2563EB",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  botaoTentarTexto: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
