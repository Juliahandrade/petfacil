
import { useCallback, useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
} from "react-native";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { apiGet } from "../src/services/api";
import { useAuth } from "../src/contexts/AuthContext";
import type { RootStackParamList } from "../navigation/AppNavigator";
import Assistente from "../src/components/Assistente";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Compra = {
    _id: string;
    nomeProduto: string;
    quantidade: number;
    preco: number;
    dataCompra: string;
    };

    export default function HistoricoComprasScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { token } = useAuth();

    const [compras, setCompras] = useState<Compra[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    const carregarCompras = useCallback(async () => {
        if (!token) {
        setCompras([]);
        setErro("Faça login para consultar suas compras.");
        setCarregando(false);
        return;
        }

        setCarregando(true);
        setErro("");

        try {
        const resposta = await apiGet<{
            success: boolean;
            compras: Compra[];
        }>("/api/compras", token);

        setCompras(resposta.compras);
        } catch (error) {
        setErro(
            error instanceof Error
            ? error.message
            : "Não foi possível carregar suas compras."
        );
        } finally {
        setCarregando(false);
        }
    }, [token]);

    useFocusEffect(
        useCallback(() => {
        carregarCompras();
        }, [carregarCompras])
    );

    function formatarPreco(valor: number) {
        return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        });
    }

    function formatarData(data: string) {
        const dataConvertida = new Date(data);

        if (Number.isNaN(dataConvertida.getTime())) {
        return data;
        }

        return dataConvertida.toLocaleDateString("pt-BR");
    }

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
            <Text style={styles.backLinkText}>← Voltar ao catálogo</Text>
            </Pressable>

            <Text style={styles.title}>Histórico de compras</Text>

            <Text style={styles.subtitle}>
            Confira os produtos que você já comprou.
            </Text>

            {carregando ? (
            <ActivityIndicator size="large" color="#2563EB" />
            ) : erro ? (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>
                Não foi possível carregar
                </Text>
                <Text style={styles.emptySubtitle}>{erro}</Text>

                <Pressable style={styles.retryButton} onPress={carregarCompras}>
                <Text style={styles.retryButtonText}>Tentar novamente</Text>
                </Pressable>
            </View>
            ) : compras.length === 0 ? (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>
                Nenhuma compra realizada
                </Text>
                <Text style={styles.emptySubtitle}>
                Quando você finalizar um pedido, ele aparecerá aqui.
                </Text>
            </View>
            ) : (
            compras.map((compra) => (
                <View key={compra._id} style={styles.card}>
                <Text style={styles.productName}>
                    {compra.nomeProduto}
                </Text>

                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Quantidade</Text>
                    <Text style={styles.value}>
                    {compra.quantidade}{" "}
                    {compra.quantidade === 1 ? "unidade" : "unidades"}
                    </Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Preço unitário</Text>
                    <Text style={styles.value}>
                    {formatarPreco(compra.preco)}
                    </Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Total do produto</Text>
                    <Text style={styles.total}>
                    {formatarPreco(compra.preco * compra.quantidade)}
                    </Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Data da compra</Text>
                    <Text style={styles.date}>
                    {formatarData(compra.dataCompra)}
                    </Text>
                </View>
                </View>
            ))
            )}
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
        fontSize: 18,
        fontWeight: "800",
        color: "#172033",
        marginBottom: 16,
    },
    infoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        marginTop: 10,
    },
    label: {
        fontSize: 14,
        color: "#64748B",
        flexShrink: 1,
    },
    value: {
        fontSize: 15,
        fontWeight: "600",
        color: "#172033",
    },
    total: {
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
    retryButton: {
        backgroundColor: "#2563EB",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 18,
        marginTop: 16,
    },
    retryButtonText: {
        color: "#FFFFFF",
        fontWeight: "700",
    },
});
