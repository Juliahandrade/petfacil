import {
    Pressable,
    StyleSheet,
    Text,
    View,
    } from "react-native";

    import type { Produto } from "../data/produtos";

    type CardProdutoProps = {
    produto: Produto;
    onPress: () => void;
    onAdicionar: () => void;
    };

    export default function CardProduto({
    produto,
    onPress,
    onAdicionar,
    }: CardProdutoProps) {
    const temPromocao =
        produto.precoPromocional < produto.precoAtual;

    return (
        <Pressable
        style={styles.card}
        onPress={onPress}
        >
        {temPromocao && (
            <View style={styles.badge}>
            <Text style={styles.badgeText}>
                PROMOÇÃO
            </Text>
            </View>
        )}

        <Text style={styles.productName}>
            {produto.nome}
        </Text>

        <Text style={styles.productType}>
            {produto.tipo}
        </Text>

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

        <Text style={styles.description}>
            {produto.descricao}
        </Text>

        <Text style={styles.validade}>
            Validade: {produto.dataValidade}
        </Text>

        <Pressable
            style={styles.button}
            onPress={(event) => {
            event.stopPropagation();
            onAdicionar();
            }}
        >
            <Text style={styles.buttonText}>
            Adicionar ao carrinho
            </Text>
        </Pressable>

        <Text style={styles.detailsHint}>
            Toque no produto para ver detalhes
        </Text>
        </Pressable>
    );
    }

    const styles = StyleSheet.create({
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

    detailsHint: {
        fontSize: 12,
        color: "#94A3B8",
        textAlign: "center",
        marginTop: 10,
    },
    });

