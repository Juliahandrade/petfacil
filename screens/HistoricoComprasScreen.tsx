import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    } from "react-native";

    import { useNavigation } from "@react-navigation/native";
    import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

    import { comprasMock } from "../src/data/compras";
    import type { RootStackParamList } from "../navigation/AppNavigator";

    type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

    export default function HistoricoComprasScreen() {
    const navigation = useNavigation<NavigationProp>();

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

            <Text style={styles.title}>
            Histórico de compras
            </Text>

            <Text style={styles.subtitle}>
            Confira os produtos que você já comprou.
            </Text>

            {comprasMock.length === 0 ? (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>
                Nenhuma compra realizada
                </Text>

                <Text style={styles.emptySubtitle}>
                Quando você finalizar um pedido, ele aparecerá aqui.
                </Text>
            </View>
            ) : (
            comprasMock.map((compra, index) => (
                <View
                key={`${compra.nomeProduto}-${index}`}
                style={styles.card}
                >
                <Text style={styles.productName}>
                    {compra.nomeProduto}
                </Text>

                <View style={styles.infoContainer}>
                    <Text style={styles.label}>
                    Preço
                    </Text>

                    <Text style={styles.price}>
                    R${" "}
                    {compra.preco
                        .toFixed(2)
                        .replace(".", ",")}
                    </Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.label}>
                    Data da compra
                    </Text>

                    <Text style={styles.date}>
                    {compra.dataCompra}
                    </Text>
                </View>
                </View>
            ))
            )}
        </ScrollView>
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
        fontSize: 18,
        fontWeight: "800",
        color: "#172033",
        marginBottom: 16,
    },

    infoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 8,
    },

    label: {
        fontSize: 14,
        color: "#64748B",
    },

    price: {
        fontSize: 17,
        fontWeight: "800",
        color: "#2563EB",
    },

    date: {
        fontSize: 14,
        fontWeight: "600",
        color: "#172033",
    },

    emptyContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 24,
        borderWidth: 1,
        borderColor: "#DCE6F5",
        alignItems: "center",
        marginTop: 10,
    },

    emptyTitle: {
        fontSize: 20,
        fontWeight: "800",
        color: "#1E3A8A",
        textAlign: "center",
        marginBottom: 8,
    },

    emptySubtitle: {
        fontSize: 14,
        lineHeight: 20,
        color: "#64748B",
        textAlign: "center",
    },
});