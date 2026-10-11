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
import { apiGet } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

type Mensagem = {
    id: number;
    texto: string;
    usuario: boolean;
};

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

type CompraApi = {
    _id: string;
    nomeProduto: string;
    quantidade: number;
    preco: number;
    dataCompra: string;
};

type RespostaCompras = {
    success: boolean;
    compras: CompraApi[];
};

const perguntasFrequentes = [
    "Quais produtos estão em promoção?",
    "Quais produtos vocês têm?",
    "Como faço um pedido?",
    "Como funciona o pagamento?",
    "Onde vejo minhas compras?",
];

function normalizar(texto: string) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    }

function formatarPreco(preco: number) {
    return preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
    }

function temPromocao(produto: ProdutoApi) {
    return (
        produto.precoPromocional != null &&
        produto.precoPromocional < produto.precoAtual
    );
}

function encontrarProduto(
    pergunta: string,
    produtos: ProdutoApi[]
    ): ProdutoApi | undefined {
    const texto = normalizar(pergunta);

    const produtoPorNomeExato = produtos.find(
        (produto) => normalizar(produto.nome) === texto
    );

    if (produtoPorNomeExato) {
        return produtoPorNomeExato;
    }

    const produtosPorNomeContido = produtos.filter((produto) => {
        const nome = normalizar(produto.nome);
        return nome.length > 0 && texto.includes(nome);
    });

    if (produtosPorNomeContido.length === 1) {
        return produtosPorNomeContido[0];
    }

    if (produtosPorNomeContido.length > 1) {
        return produtosPorNomeContido.sort(
        (a, b) => normalizar(b.nome).length - normalizar(a.nome).length
        )[0];
    }

    const palavrasIgnoradas = new Set([
        "para",
        "com",
        "sem",
        "qual",
        "quais",
        "quanto",
        "custa",
        "preco",
        "precos",
        "tem",
        "temos",
        "voces",
        "produto",
        "produtos",
        "quero",
        "saber",
        "sobre",
        "mostrar",
        "mostre",
        "vende",
        "vendem",
        "disponivel",
        "disponiveis",
        "uma",
        "uns",
        "umas",
        "dos",
        "das",
        "que",
        "esse",
        "essa",
        "isso",
        "gostaria",
        "existe",
    ]);

    const palavrasPergunta = texto
        .split(" ")
        .filter(
        (palavra) =>
            palavra.length >= 3 && !palavrasIgnoradas.has(palavra)
        );

    if (palavrasPergunta.length === 0) {
        return undefined;
    }

    const correspondencias = produtos
        .map((produto) => {
        const palavrasNome = normalizar(produto.nome).split(" ");

        const pontosNome = palavrasNome.filter(
            (palavra) =>
            palavra.length >= 3 && palavrasPergunta.includes(palavra)
        ).length;

        const tipo = normalizar(produto.tipo);
        const descricao = normalizar(produto.descricao);

        const pontosTipo = palavrasPergunta.some((palavra) =>
            tipo.split(" ").includes(palavra)
        )
            ? 0.25
            : 0;

        const pontosDescricao = palavrasPergunta.some(
            (palavra) => palavra.length >= 4 && descricao.includes(palavra)
        )
            ? 0.1
            : 0;

        return {
            produto,
            pontos: pontosNome + pontosTipo + pontosDescricao,
            pontosNome,
        };
        })
        .filter((item) => item.pontosNome > 0)
        .sort((a, b) => {
        if (b.pontosNome !== a.pontosNome) {
            return b.pontosNome - a.pontosNome;
        }

        return b.pontos - a.pontos;
        });

    if (correspondencias.length === 0) {
        return undefined;
    }

    if (
        correspondencias.length > 1 &&
        correspondencias[0].pontosNome === correspondencias[1].pontosNome &&
        correspondencias[0].pontos === correspondencias[1].pontos
    ) {
        return undefined;
    }

    return correspondencias[0].produto;
    }

    async function gerarResposta(
    pergunta: string,
    token: string | null
    ): Promise<string> {
    const texto = normalizar(pergunta);

    try {
        if (
        texto.includes("promocao") ||
        texto.includes("promocoes") ||
        texto.includes("desconto") ||
        texto.includes("descontos")
        ) {
        const resposta = await apiGet<RespostaProdutos>("/api/products");

        const produtosEmPromocao = resposta.produtos.filter(temPromocao);

        if (produtosEmPromocao.length === 0) {
            return "No momento não temos produtos em promoção.";
        }

        const lista = produtosEmPromocao
            .map(
            (produto) =>
                `• ${produto.nome} — ${formatarPreco(
                produto.precoPromocional!
                )}`
            )
            .join("\n");

        return `Temos ${produtosEmPromocao.length} produtos em promoção:\n\n${lista}`;
        }

        if (
        texto.includes("historico") ||
        texto.includes("compras") ||
        texto.includes("comprei") ||
        texto.includes("meus pedidos") ||
        texto.includes("minhas compras")
        ) {
        if (!token) {
            return "Faça login para consultar seu histórico de compras.";
        }

        const resposta = await apiGet<RespostaCompras>(
            "/api/compras",
            token
        );

        if (resposta.compras.length === 0) {
            return "Você ainda não tem compras registradas.";
        }

        const lista = resposta.compras
            .map((compra) => {
            const data = new Date(compra.dataCompra);

            const dataFormatada = Number.isNaN(data.getTime())
                ? "Data indisponível"
                : data.toLocaleDateString("pt-BR");

            return (
                `• ${compra.nomeProduto}\n` +
                `  Quantidade: ${compra.quantidade}\n` +
                `  Valor: ${formatarPreco(compra.preco * compra.quantidade)}\n` +
                `  Data: ${dataFormatada}`
            );
            })
            .join("\n\n");

        return `Encontrei ${resposta.compras.length} registro(s) no seu histórico:\n\n${lista}`;
        }

        if (
        texto.includes("quais produtos") ||
        texto.includes("lista de produtos") ||
        texto.includes("produtos disponiveis") ||
        texto.includes("o que voces vendem") ||
        texto.includes("o que tem no catalogo") ||
        texto.includes("catalogo de produtos")
        ) {
        const resposta = await apiGet<RespostaProdutos>("/api/products");

        if (resposta.produtos.length === 0) {
            return "No momento não há produtos cadastrados no catálogo.";
        }

        const lista = resposta.produtos
            .map((produto) => `• ${produto.nome}`)
            .join("\n");

        return `Temos ${resposta.produtos.length} produtos no catálogo:\n\n${lista}`;
        }

        if (
        texto.includes("como faco um pedido") ||
        texto.includes("como fazer um pedido") ||
        texto.includes("como comprar") ||
        texto.includes("fazer pedido") ||
        texto.includes("finalizar pedido")
        ) {
        return "Para fazer um pedido, escolha um produto no catálogo, adicione ao carrinho e toque em Finalizar pedido.";
        }

        if (
        texto.includes("pagamento") ||
        texto.includes("pagar") ||
        texto.includes("formas de pagamento")
        ) {
        return "As formas de pagamento ainda não estão disponíveis no aplicativo. Consulte a loja para obter mais informações.";
        }

        const resposta = await apiGet<RespostaProdutos>("/api/products");

        const produtoEncontrado = encontrarProduto(pergunta, resposta.produtos);

        if (produtoEncontrado) {
        const preco = temPromocao(produtoEncontrado)
            ? produtoEncontrado.precoPromocional!
            : produtoEncontrado.precoAtual;

        let mensagem =
            `Encontrei ${produtoEncontrado.nome} no catálogo.\n\n` +
            `Preço: ${formatarPreco(preco)}\n` +
            `Tipo: ${produtoEncontrado.tipo}\n\n` +
            produtoEncontrado.descricao;

        if (temPromocao(produtoEncontrado)) {
            mensagem += "\n\nEsse produto está em promoção!";
        }

        return mensagem;
        }

        return "Não encontrei um produto correspondente à sua pergunta. Tente digitar o nome do produto como aparece no catálogo ou pergunte sobre promoções, pedidos, pagamento e histórico de compras.";
    } catch (error) {
        console.log(
        "Erro no assistente:",
        error instanceof Error ? error.message : error
        );

        return "Não consegui consultar os dados agora. Confira se o servidor está funcionando e tente novamente.";
    }
    }

    export default function Assistente() {
    const { token } = useAuth();
    const [visivel, setVisivel] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [respondendo, setRespondendo] = useState(false);

    const [mensagens, setMensagens] = useState<Mensagem[]>([
        {
        id: 1,
        texto: "Olá! Sou o assistente PetFacil. Como posso ajudar?",
        usuario: false,
        },
    ]);

    async function enviarMensagem(textoEnviado?: string) {
        const texto = (textoEnviado ?? mensagem).trim();

        if (!texto || respondendo) {
        return;
        }

        const idMensagem = Date.now();

        setMensagens((atuais) => [
        ...atuais,
        {
            id: idMensagem,
            texto,
            usuario: true,
        },
        ]);

        setMensagem("");
        setRespondendo(true);

        const textoResposta = await gerarResposta(texto, token);

        setMensagens((atuais) => [
        ...atuais,
        {
            id: idMensagem + 1,
            texto: textoResposta,
            usuario: false,
        },
        ]);

        setRespondendo(false);
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
                    <Text style={styles.title}>Assistente PetFacil</Text>
                    <Text style={styles.subtitle}>Estou aqui para ajudar!</Text>
                </View>

                <Pressable onPress={() => setVisivel(false)}>
                    <Text style={styles.closeButton}>✕</Text>
                </Pressable>
                </View>

                <ScrollView
                style={styles.messagesContainer}
                contentContainerStyle={styles.messagesContent}
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
                        item.usuario && styles.userMessageText,
                        ]}
                    >
                        {item.texto}
                    </Text>
                    </View>
                ))}

                {respondendo && (
                    <Text style={styles.loadingText}>
                    Consultando informações...
                    </Text>
                )}

                <Text style={styles.faqTitle}>Perguntas frequentes</Text>

                {perguntasFrequentes.map((pergunta) => (
                    <Pressable
                    key={pergunta}
                    style={[
                        styles.faqButton,
                        respondendo && styles.disabledButton,
                    ]}
                    disabled={respondendo}
                    onPress={() => enviarMensagem(pergunta)}
                    >
                    <Text style={styles.faqText}>{pergunta}</Text>
                    </Pressable>
                ))}
                </ScrollView>

                <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua dúvida..."
                    placeholderTextColor="#8994A8"
                    value={mensagem}
                    onChangeText={setMensagem}
                    onSubmitEditing={() => enviarMensagem()}
                    returnKeyType="send"
                    editable={!respondendo}
                />

                <Pressable
                    style={[
                    styles.sendButton,
                    respondendo && styles.disabledButton,
                    ]}
                    disabled={respondendo}
                    onPress={() => enviarMensagem()}
                >
                    <Text style={styles.sendButtonText}>Enviar</Text>
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
    loadingText: {
        color: "#64748B",
        fontSize: 13,
        marginBottom: 12,
    },
    disabledButton: {
        opacity: 0.5,
    },
});