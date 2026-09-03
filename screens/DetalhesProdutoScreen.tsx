import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    } from "react-native";

    import { useNavigation, useRoute } from "@react-navigation/native";
    import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
    import type { RouteProp } from "@react-navigation/native";

    import { useCart } from "../src/contexts/CartContext";
    import { produtosMock } from "../src/data/produtos";
    import type { RootStackParamList } from "../navigation/AppNavigator";
    import Assistente from "../src/components/Assistente";
    import BotaoPrimario from "../src/components/BotaoPrimario";

    type NavigationProp =
    NativeStackNavigationProp<RootStackParamList>;

    type DetalhesRouteProp = RouteProp<
    RootStackParamList,
    "DetalhesProduto"
    >;

    export default function DetalhesProdutoScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<DetalhesRouteProp>();

    const { adicionarAoCarrinho } = useCart();

    const produto = produtosMock.find(
        (item) => item.id === route.params.produtoId
    );

    if (!produto) {
        return (
        <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>
            Produto não encontrado
            </Text>

            <BotaoPrimario
            titulo="Voltar ao catálogo"
            onPress={() => navigation.navigate("Catalogo")}
            />
        </View>
        );
    }

    const temPromocao =
        produto.precoPromocional < produto.precoAtual;

    function handleAdicionarAoCarrinho() {
        if (!produto) {
            return;
        }

        adicionarAoCarrinho(produto);
        navigation.navigate("Carrinho");
    }

    return (
        <View style={styles.container}>
        <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <Pressable
            style={styles.backLink}
            onPress={() => navigation.goBack()}
            >
            <Text style={styles.backLinkText}>
                ← Voltar
            </Text>
            </Pressable>

            {temPromocao && (
            <View style={styles.badge}>
                <Text style={styles.badgeText}>
                PROMOÇÃO
                </Text>
            </View>
            )}

            <Text style={styles.title}>
            {produto.nome}
            </Text>

            <View style={styles.typeContainer}>
            <Text style={styles.typeLabel}>
                Categoria
            </Text>

            <Text style={styles.type}>
                {produto.tipo}
            </Text>
            </View>

            <View style={styles.priceContainer}>
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
            </View>

            <View style={styles.section}>
            <Text style={styles.sectionTitle}>
                Descrição
            </Text>

            <Text style={styles.description}>
                {produto.descricao}
            </Text>
            </View>

            <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>
                Informações do produto
            </Text>

            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>
                Tipo
                </Text>

                <Text style={styles.infoValue}>
                {produto.tipo}
                </Text>
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>
                Validade
                </Text>

                <Text style={styles.infoValue}>
                {produto.dataValidade}
                </Text>
            </View>
            </View>

            <BotaoPrimario
            titulo="Adicionar ao carrinho"
            onPress={handleAdicionarAoCarrinho}
            />
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
        paddingTop: 50,
        paddingBottom: 40,
    },

    backLink: {
        marginBottom: 24,
    },

    backLinkText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#2563EB",
    },

    badge: {
        alignSelf: "flex-start",
        backgroundColor: "#DCFCE7",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        marginBottom: 12,
    },

    badgeText: {
        color: "#15803D",
        fontSize: 11,
        fontWeight: "800",
    },

    title: {
        fontSize: 30,
        fontWeight: "800",
        color: "#1E3A8A",
        lineHeight: 36,
    },

    typeContainer: {
        marginTop: 18,
    },

    typeLabel: {
        fontSize: 12,
        color: "#94A3B8",
        fontWeight: "600",
    },

    type: {
        fontSize: 15,
        color: "#64748B",
        marginTop: 3,
        fontWeight: "600",
    },

    priceContainer: {
        marginTop: 20,
        marginBottom: 26,
    },

    oldPrice: {
        fontSize: 15,
        color: "#94A3B8",
        textDecorationLine: "line-through",
    },

    price: {
        fontSize: 28,
        fontWeight: "800",
        color: "#2563EB",
        marginTop: 2,
    },

    section: {
        marginBottom: 24,
    },

    sectionTitle: {
        fontSize: 19,
        fontWeight: "800",
        color: "#172033",
        marginBottom: 8,
    },

    description: {
        fontSize: 15,
        lineHeight: 23,
        color: "#5F6B7A",
    },

    infoCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 18,
        borderWidth: 1,
        borderColor: "#DCE6F5",
        marginBottom: 20,
    },

    infoTitle: {
        fontSize: 17,
        fontWeight: "800",
        color: "#172033",
        marginBottom: 16,
    },

    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
    },

    infoLabel: {
        fontSize: 14,
        color: "#64748B",
    },

    infoValue: {
        fontSize: 14,
        fontWeight: "700",
        color: "#172033",
    },

    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: "#F7FAFF",
    },

    errorTitle: {
        fontSize: 22,
        fontWeight: "800",
        color: "#1E3A8A",
        marginBottom: 20,
    },
});