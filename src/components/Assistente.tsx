import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    } from "react-native";

    import { useState } from "react";

    import { produtosMock } from "../data/produtos";

    type Mensagem = {
    id: number;
    texto: string;
    usuario: boolean;
    };

    const perguntasFrequentes = [
    "Quais produtos estão em promoção?",
    "Quais produtos vocês têm?",
    "Como faço um pedido?",
    "Como funciona o pagamento?",
    "Onde vejo minhas compras?",
    ];

    function encontrarProduto(pergunta: string) {
    const texto = pergunta.toLowerCase();

    return produtosMock.find((produto) => {
        const nome = produto.nome.toLowerCase();
        const tipo = produto.tipo.toLowerCase();

        if (texto.includes(nome)) {
        return true;
        }

        if (texto.includes(tipo)) {
        return true;
        }

        const palavrasNome = nome.split(" ");

        return palavrasNome.some(
        (palavra) =>
            palavra.length >= 4 &&
            texto.includes(palavra)
        );
    });
    }

    function gerarResposta(pergunta: string) {
    const texto = pergunta.toLowerCase();

    // PROMOÇÕES
    if (
        texto.includes("promoção") ||
        texto.includes("promocao")
    ) {
        const produtosEmPromocao = produtosMock.filter(
        (produto) =>
            produto.precoPromocional < produto.precoAtual
        );

        if (produtosEmPromocao.length > 0) {
        const lista = produtosEmPromocao
            .map(
            (produto) =>
                `• ${produto.nome} — R$ ${produto.precoPromocional
                .toFixed(2)
                .replace(".", ",")}`
            )
            .join("\n");

        return `Temos ${produtosEmPromocao.length} produtos em promoção:\n\n${lista}`;
        }

        return "No momento não temos produtos em promoção.";
    }

    // PROCURA POR PRODUTO ESPECÍFICO
    const produtoEncontrado = encontrarProduto(pergunta);

    if (produtoEncontrado) {
        const temPromocao =
        produtoEncontrado.precoPromocional <
        produtoEncontrado.precoAtual;

        const preco = temPromocao
        ? produtoEncontrado.precoPromocional
        : produtoEncontrado.precoAtual;

        const precoFormatado = preco
        .toFixed(2)
        .replace(".", ",");

        let resposta = `Sim! Temos o ${produtoEncontrado.nome}.\n\n`;

        resposta += `Preço: R$ ${precoFormatado}\n`;
        resposta += `Tipo: ${produtoEncontrado.tipo}\n\n`;
        resposta += produtoEncontrado.descricao;

        if (temPromocao) {
        resposta += `\n\nEsse produto está em promoção!`;
        }

        return resposta;
    }

    // LISTA DE TODOS OS PRODUTOS
    if (
        texto.includes("quais produtos") ||
        texto.includes("lista de produtos") ||
        texto.includes("produtos disponíveis") ||
        texto.includes("produtos disponiveis") ||
        texto.includes("o que vocês vendem") ||
        texto.includes("o que voces vendem")
    ) {
        const listaProdutos = produtosMock
        .map((produto) => `• ${produto.nome}`)
        .join("\n");

        return `Temos ${produtosMock.length} produtos disponíveis no catálogo:\n\n${listaProdutos}`;
    }

    // PEDIDOS
    if (
        texto.includes("pedido") ||
        texto.includes("comprar")
    ) {
        return "Para fazer um pedido, escolha um produto no catálogo, adicione ao carrinho e toque em Finalizar pedido.";
    }

    // PAGAMENTO
    if (
        texto.includes("pagamento") ||
        texto.includes("pagar")
    ) {
        return "O pagamento é realizado no caixa da loja no momento da retirada do pedido.";
    }

    // HISTÓRICO
    if (
        texto.includes("compras") ||
        texto.includes("histórico") ||
        texto.includes("historico")
    ) {
        return "Você pode consultar suas compras pelo botão 'Histórico de compras' disponível no catálogo.";
    }

    return "Posso ajudar com dúvidas sobre produtos, promoções, pedidos, pagamento e histórico de compras.";
    }

    export default function Assistente() {
    const [visivel, setVisivel] = useState(false);
    const [mensagem, setMensagem] = useState("");

    const [mensagens, setMensagens] = useState<Mensagem[]>([
        {
        id: 1,
        texto:
            "Olá! Sou o assistente PetFacil. Como posso ajudar?",
        usuario: false,
        },
    ]);

    function enviarMensagem(textoEnviado?: string) {
        const texto = (
        textoEnviado ?? mensagem
        ).trim();

        if (!texto) {
        return;
        }

        const novaMensagem: Mensagem = {
        id: Date.now(),
        texto,
        usuario: true,
        };

        const resposta: Mensagem = {
        id: Date.now() + 1,
        texto: gerarResposta(texto),
        usuario: false,
        };

        setMensagens((mensagensAtuais) => [
        ...mensagensAtuais,
        novaMensagem,
        resposta,
        ]);

        setMensagem("");
    }

    return (
        <>
        <Pressable
            style={styles.floatingButton}
            onPress={() => setVisivel(true)}
        >
            <Text style={styles.floatingIcon}>🐾</Text>
        </Pressable>

        <Modal
            visible={visivel}
            animationType="slide"
            transparent
            onRequestClose={() => setVisivel(false)}
        >
            <View style={styles.overlay}>
            <View style={styles.modalContainer}>
                <View style={styles.header}>
                <View>
                    <Text style={styles.title}>
                    Assistente PetFacil
                    </Text>

                    <Text style={styles.subtitle}>
                    Estou aqui para ajudar!
                    </Text>
                </View>

                <Pressable
                    onPress={() => setVisivel(false)}
                >
                    <Text style={styles.closeButton}>
                    ✕
                    </Text>
                </Pressable>
                </View>

                <ScrollView
                style={styles.messagesContainer}
                contentContainerStyle={
                    styles.messagesContent
                }
                showsVerticalScrollIndicator={false}
                >
                {mensagens.map((item) => (
                    <View
                    key={item.id}
                    style={[
                        styles.message,
                        item.usuario
                        ? styles.userMessage
                        : styles.assistantMessage,
                    ]}
                    >
                    <Text
                        style={[
                        styles.messageText,
                        item.usuario &&
                            styles.userMessageText,
                        ]}
                    >
                        {item.texto}
                    </Text>
                    </View>
                ))}

                <Text style={styles.faqTitle}>
                    Perguntas frequentes
                </Text>

                {perguntasFrequentes.map(
                    (pergunta) => (
                    <Pressable
                        key={pergunta}
                        style={styles.faqButton}
                        onPress={() =>
                        enviarMensagem(pergunta)
                        }
                    >
                        <Text style={styles.faqText}>
                        {pergunta}
                        </Text>
                    </Pressable>
                    )
                )}
                </ScrollView>

                <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua dúvida..."
                    placeholderTextColor="#8994A8"
                    value={mensagem}
                    onChangeText={setMensagem}
                    onSubmitEditing={() =>
                    enviarMensagem()
                    }
                    returnKeyType="send"
                />

                <Pressable
                    style={styles.sendButton}
                    onPress={() => enviarMensagem()}
                >
                    <Text style={styles.sendButtonText}>
                    Enviar
                    </Text>
                </Pressable>
                </View>
            </View>
            </View>
        </Modal>
        </>
    );
    }

    const styles = StyleSheet.create({
    floatingButton: {
        position: "absolute",
        right: 20,
        bottom: 24,
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: "#2563EB",
        justifyContent: "center",
        alignItems: "center",
        elevation: 6,
    },

    floatingIcon: {
        fontSize: 27,
    },

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        justifyContent: "flex-end",
    },

    modalContainer: {
        height: "82%",
        backgroundColor: "#F7FAFF",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        overflow: "hidden",
    },

    header: {
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 20,
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: "#DCE6F5",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    title: {
        fontSize: 20,
        fontWeight: "800",
        color: "#1E3A8A",
    },

    subtitle: {
        fontSize: 13,
        color: "#64748B",
        marginTop: 3,
    },

    closeButton: {
        fontSize: 22,
        color: "#64748B",
        fontWeight: "700",
    },

    messagesContainer: {
        flex: 1,
    },

    messagesContent: {
        padding: 18,
        paddingBottom: 20,
    },

    message: {
        maxWidth: "85%",
        borderRadius: 16,
        padding: 13,
        marginBottom: 10,
    },

    assistantMessage: {
        alignSelf: "flex-start",
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#DCE6F5",
    },

    userMessage: {
        alignSelf: "flex-end",
        backgroundColor: "#2563EB",
    },

    messageText: {
        fontSize: 14,
        lineHeight: 20,
        color: "#172033",
    },

    userMessageText: {
        color: "#FFFFFF",
    },

    faqTitle: {
        fontSize: 15,
        fontWeight: "800",
        color: "#1E3A8A",
        marginTop: 10,
        marginBottom: 10,
    },

    faqButton: {
        backgroundColor: "#E8F1FF",
        borderRadius: 12,
        padding: 12,
        marginBottom: 8,
    },

    faqText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#2563EB",
    },

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#DCE6F5",
    },

    input: {
        flex: 1,
        height: 46,
        backgroundColor: "#F1F5F9",
        borderRadius: 12,
        paddingHorizontal: 14,
        fontSize: 14,
        color: "#172033",
    },

    sendButton: {
        height: 46,
        paddingHorizontal: 16,
        marginLeft: 8,
        borderRadius: 12,
        backgroundColor: "#2563EB",
        justifyContent: "center",
        alignItems: "center",
    },

    sendButtonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "800",
    },
    });

