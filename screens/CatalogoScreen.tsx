import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { produtosMock } from "../src/data/produtos";
import { useCart } from "../src/contexts/CartContext";

export default function CatalogoScreen() {
  const { adicionarAoCarrinho } = useCart();

  const produtos = produtosMock;

  // Estado de erro
  const erro = false;

  // Estado de erro
  if (erro) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>
          Não foi possível carregar os produtos
        </Text>

        <Text style={styles.emptySubtitle}>
          Ocorreu um erro ao carregar o catálogo.
          Tente novamente mais tarde.
        </Text>
      </View>
    );
  }

  // Estado vazio
  if (produtos.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>
          Nenhum produto disponível
        </Text>

        <Text style={styles.emptySubtitle}>
          No momento não há produtos para exibir.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Catálogo</Text>

      <Text style={styles.subtitle}>
        Encontre os melhores produtos para o seu pet.
      </Text>

      {produtos.map((produto) => {
        const temPromocao =
          produto.precoPromocional < produto.precoAtual;

        return (
          <View key={produto.id} style={styles.card}>
            {/* Selo de promoção */}
            {temPromocao && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  PROMOÇÃO
                </Text>
              </View>
            )}

            {/* Nome */}
            <Text style={styles.productName}>
              {produto.nome}
            </Text>

            {/* Tipo */}
            <Text style={styles.productType}>
              {produto.tipo}
            </Text>

            {/* Preços */}
            {temPromocao ? (
              <>
                <Text style={styles.oldPrice}>
                  De R${" "}
                  {produto.precoAtual
                    .toFixed(2)
                    .replace(".", ",")}
                </Text>

                <Text style={styles.price}>
                  R${" "}
                  {produto.precoPromocional
                    .toFixed(2)
                    .replace(".", ",")}
                </Text>
              </>
            ) : (
              <Text style={styles.price}>
                R${" "}
                {produto.precoAtual
                  .toFixed(2)
                  .replace(".", ",")}
              </Text>
            )}

            {/* Descrição */}
            <Text style={styles.description}>
              {produto.descricao}
            </Text>

            {/* Data de validade */}
            <Text style={styles.validade}>
              Validade: {produto.dataValidade}
            </Text>

            {/* Botão adicionar ao carrinho */}
            <Pressable
              style={styles.button}
              onPress={() => adicionarAoCarrinho(produto)}
            >
              <Text style={styles.buttonText}>
                Adicionar ao carrinho
              </Text>
            </Pressable>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAFF",
  },

  content: {
    padding: 24,
    paddingTop: 50,
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
    marginBottom: 24,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#DCE6F5",
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 10,
  },

  badgeText: {
    color: "#15803D",
    fontSize: 11,
    fontWeight: "800",
  },

  productName: {
    fontSize: 19,
    fontWeight: "800",
    color: "#172033",
  },

  productType: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 4,
    marginBottom: 12,
  },

  oldPrice: {
    fontSize: 14,
    color: "#94A3B8",
    textDecorationLine: "line-through",
  },

  price: {
    fontSize: 22,
    fontWeight: "800",
    color: "#2563EB",
    marginTop: 2,
  },

  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#5F6B7A",
    marginTop: 12,
  },

  validade: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 10,
  },

  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
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
  },
});