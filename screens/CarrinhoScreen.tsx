import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    } from "react-native";

    import { useNavigation } from "@react-navigation/native";
    import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

    import { useCart } from "../src/contexts/CartContext";
    import type { RootStackParamList } from "../navigation/AppNavigator";
    import Assistente from "../src/components/Assistente";
    import BotaoPrimario from "../src/components/BotaoPrimario";

    type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

    export default function CarrinhoScreen() {
    const navigation = useNavigation<NavigationProp>();

    const {
        itens,
        aumentarQuantidade,
        diminuirQuantidade,
        removerDoCarrinho,
        calcularSubtotal,
        calcularTotal,
        finalizarPedido,
    } = useCart();

    function handleFinalizarPedido() {
        finalizarPedido();

        Alert.alert(
        "Pedido realizado!",
        "Seu pedido foi registrado com sucesso.\n\nO pagamento será realizado na retirada na loja.",
        [
            {
            text: "OK",
            onPress: () => navigation.navigate("Catalogo"),
            },
        ]
        );
    }

    // CARRINHO VAZIO
    if (itens.length === 0) {
        return (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
            Seu carrinho está vazio
            </Text>

            <Text style={styles.emptySubtitle}>
            Adicione produtos ao carrinho para continuar.
            </Text>

            <Pressable
            style={styles.backButton}
            onPress={() => navigation.navigate("Catalogo")}
            >
            <Text style={styles.backButtonText}>
                Voltar ao catálogo
            </Text>
            </Pressable>

            <Assistente />
        </View>
        );
    }

    // CARRINHO COM PRODUTOS
    return (
        <View style={styles.container}>
        <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <Pressable
            style={styles.backLink}
            onPress={() => navigation.navigate("Catalogo")}
            >
            <Text style={styles.backLinkText}>
                ← Voltar ao catálogo
            </Text>
            </Pressable>

            <Text style={styles.title}>Meu carrinho</Text>

            <Text style={styles.subtitle}>
            Confira os produtos selecionados.
            </Text>

            {itens.map((item) => {
            const subtotal = calcularSubtotal(item);

            const precoUnitario =
                subtotal / item.quantidade;

            return (
                <View
                key={item.produto.id}
                style={styles.card}
                >
                <Text style={styles.productName}>
                    {item.produto.nome}
                </Text>

                <Text style={styles.productType}>
                    {item.produto.tipo}
                </Text>

                <Text style={styles.price}>
                    R${" "}
                    {precoUnitario
                    .toFixed(2)
                    .replace(".", ",")}
                </Text>

                <View style={styles.quantityContainer}>
                    <Pressable
                    style={styles.quantityButton}
                    onPress={() =>
                        diminuirQuantidade(item.produto.id)
                    }
                    >
                    <Text style={styles.quantityButtonText}>
                        −
                    </Text>
                    </Pressable>

                    <Text style={styles.quantity}>
                    {item.quantidade}
                    </Text>

                    <Pressable
                    style={styles.quantityButton}
                    onPress={() =>
                        aumentarQuantidade(item.produto.id)
                    }
                    >
                    <Text style={styles.quantityButtonText}>
                        +
                    </Text>
                    </Pressable>
                </View>

                <Text style={styles.subtotal}>
                    Subtotal: R${" "}
                    {subtotal
                    .toFixed(2)
                    .replace(".", ",")}
                </Text>

                <Pressable
                    style={styles.removeButton}
                    onPress={() =>
                    removerDoCarrinho(item.produto.id)
                    }
                >
                    <Text style={styles.removeText}>
                    Remover produto
                    </Text>
                </Pressable>
                </View>
            );
            })}

            <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>
                Total
            </Text>

            <Text style={styles.total}>
                R${" "}
                {calcularTotal()
                .toFixed(2)
                .replace(".", ",")}
            </Text>
            </View>

           <BotaoPrimario
            titulo="Finalizar pedido"
            onPress={handleFinalizarPedido}
            style={styles.finishButton}/>
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
        marginBottom: 18,
    },

    backLinkText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#2563EB",
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

    productName: {
        fontSize: 19,
        fontWeight: "800",
        color: "#172033",
    },

    productType: {
        fontSize: 13,
        color: "#64748B",
        marginTop: 4,
    },

    price: {
        fontSize: 17,
        fontWeight: "700",
        color: "#2563EB",
        marginTop: 12,
    },

    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 16,
    },

    quantityButton: {
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: "#E8F1FF",
        justifyContent: "center",
        alignItems: "center",
    },

    quantityButtonText: {
        fontSize: 22,
        fontWeight: "700",
        color: "#2563EB",
    },

    quantity: {
        fontSize: 17,
        fontWeight: "700",
        color: "#172033",
        marginHorizontal: 18,
    },

    subtotal: {
        fontSize: 16,
        fontWeight: "700",
        color: "#172033",
        marginTop: 14,
    },

    removeButton: {
        marginTop: 14,
        alignSelf: "flex-start",
    },

    removeText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#DC2626",
    },

    totalContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 20,
        marginTop: 4,
        borderWidth: 1,
        borderColor: "#DCE6F5",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    totalLabel: {
        fontSize: 19,
        fontWeight: "800",
        color: "#172033",
    },

    total: {
        fontSize: 22,
        fontWeight: "800",
        color: "#2563EB",
    },

    finishButton: {
        backgroundColor: "#2563EB",
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: "center",
        marginTop: 16,
    },

    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: "#F7FAFF",
    },

    emptyTitle: {
        fontSize: 24,
        fontWeight: "800",
        color: "#1E3A8A",
        textAlign: "center",
        marginBottom: 8,
    },

    emptySubtitle: {
        fontSize: 15,
        color: "#5F6B7A",
        textAlign: "center",
        marginBottom: 20,
    },

    backButton: {
        backgroundColor: "#2563EB",
        borderRadius: 12,
        paddingVertical: 13,
        paddingHorizontal: 22,
    },

    backButtonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
    },
    });

