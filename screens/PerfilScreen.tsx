import { useCallback, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from "../src/contexts/AuthContext";
import { apiGet } from "../src/services/api";
import { RootStackParamList } from "../navigation/AppNavigator";
import Assistente from "../src/components/Assistente";

type Props = NativeStackScreenProps<RootStackParamList, "Perfil">;

type Compra = {
    _id: string;
    nomeProduto: string;
    quantidade: number;
    preco: number;
    dataCompra: string;
    };

    export default function PerfilScreen({ navigation }: Props) {
    const { usuarioAutenticado, token, sair } = useAuth();
    const [compras, setCompras] = useState<Compra[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(false);

    const carregarCompras = useCallback(async () => {
        if (!token) {
        setCompras([]);
        setCarregando(false);
        return;
        }

        try {
        setCarregando(true);
        setErro(false);
        const resposta: any = await apiGet("/api/compras", token);
        const lista = Array.isArray(resposta)
            ? resposta
            : resposta?.compras || resposta?.data || [];

        setCompras(lista);
        } catch {
        setErro(true);
        } finally {
        setCarregando(false);
        }
    }, [token]);

    useFocusEffect(
        useCallback(() => {
        carregarCompras();
        }, [carregarCompras])
    );

    function confirmarSaida() {
        Alert.alert("Sair da conta", "Deseja realmente sair da sua conta?", [
        { text: "Cancelar", style: "cancel" },
        {
            text: "Sair",
            style: "destructive",
            onPress: () => {
            sair();
            navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
            });
            },
        },
        ]);
    }

    const nome = usuarioAutenticado?.nomeCompleto || "Tutor";
    const email = usuarioAutenticado?.login || "E-mail não informado";

    return (
        <View style={styles.container}>
        <ScrollView
            contentContainerStyle={styles.conteudo}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.cabecalho}>
            <Pressable
                style={styles.botaoVoltar}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.textoVoltar}>‹</Text>
            </Pressable>
            <Text style={styles.tituloCabecalho}>Minha conta</Text>
            <View style={styles.espacador} />
            </View>

            <View style={styles.cartaoUsuario}>
            <View style={styles.avatar}>
                <Text style={styles.avatarTexto}>👤</Text>
            </View>
            <Text style={styles.nomeUsuario}>{nome}</Text>
            <Text style={styles.emailUsuario}>{email}</Text>
            <View style={styles.etiquetaConta}>
                <Text style={styles.etiquetaTexto}>Conta PetFacil</Text>
            </View>
            </View>

            <Text style={styles.tituloSecao}>Minha conta</Text>

            <View style={styles.cartaoDados}>
            <View style={styles.linhaDado}>
                <View style={styles.iconeDado}>
                <Text style={styles.emojiDado}>👤</Text>
                </View>
                <View style={styles.textosDado}>
                <Text style={styles.rotuloDado}>Nome completo</Text>
                <Text style={styles.valorDado}>{nome}</Text>
                </View>
            </View>

            <View style={styles.separador} />

            <View style={styles.linhaDado}>
                <View style={styles.iconeDado}>
                <Text style={styles.emojiDado}>✉️</Text>
                </View>
                <View style={styles.textosDado}>
                <Text style={styles.rotuloDado}>E-mail</Text>
                <Text style={styles.valorDado}>{email}</Text>
                </View>
            </View>
            </View>

            <Pressable
            style={styles.botaoHistorico}
            onPress={() => navigation.navigate("HistoricoCompras")}
            >
            <View style={styles.iconeHistorico}>
                <Text style={styles.emojiHistorico}>🛍️</Text>
            </View>
            <View style={styles.textosHistorico}>
                <Text style={styles.tituloHistorico}>Histórico de compras</Text>
                <Text style={styles.descricaoHistorico}>
                Consulte todos os seus pedidos
                </Text>
            </View>
            <Text style={styles.setaHistorico}>›</Text>
            </Pressable>

            <View style={styles.cabecalhoCompras}>
            <Text style={styles.tituloSecao}>Compras recentes</Text>
            <Text style={styles.contadorCompras}>{compras.length}</Text>
            </View>

            {carregando ? (
            <View style={styles.estado}>
                <ActivityIndicator size="large" color="#2563EB" />
                <Text style={styles.textoEstado}>Carregando suas compras...</Text>
            </View>
            ) : erro ? (
            <View style={styles.estado}>
                <Text style={styles.textoEstado}>
                Não foi possível carregar suas compras.
                </Text>
                <Pressable
                style={styles.botaoTentar}
                onPress={carregarCompras}
                >
                <Text style={styles.textoBotaoTentar}>Tentar novamente</Text>
                </Pressable>
            </View>
            ) : compras.length === 0 ? (
            <View style={styles.estado}>
                <Text style={styles.emojiVazio}>🛒</Text>
                <Text style={styles.tituloVazio}>Nenhuma compra ainda</Text>
                <Text style={styles.textoEstado}>
                Seus pedidos aparecerão aqui quando você fizer uma compra.
                </Text>
                <Pressable
                style={styles.botaoTentar}
                onPress={() => navigation.navigate("Catalogo")}
                >
                <Text style={styles.textoBotaoTentar}>Explorar produtos</Text>
                </Pressable>
            </View>
            ) : (
            <View style={styles.listaCompras}>
                {compras.map((compra) => (
                <View key={compra._id} style={styles.cartaoCompra}>
                    <View style={styles.linhaCompra}>
                    <View style={styles.iconeProduto}>
                        <Text style={styles.emojiProduto}>🐾</Text>
                    </View>
                    <View style={styles.dadosCompra}>
                        <Text style={styles.nomeProduto}>
                        {compra.nomeProduto}
                        </Text>
                        <Text style={styles.quantidadeProduto}>
                        Quantidade: {compra.quantidade}
                        </Text>
                        <Text style={styles.dataCompra}>
                        {compra.dataCompra
                            ? new Date(compra.dataCompra).toLocaleDateString(
                                "pt-BR"
                            )
                            : "Data não informada"}
                        </Text>
                    </View>
                    </View>
                    <View style={styles.linhaTotal}>
                    <Text style={styles.rotuloTotal}>Total</Text>
                    <Text style={styles.valorTotal}>
                        {(compra.preco * compra.quantidade).toLocaleString(
                        "pt-BR",
                        {
                            style: "currency",
                            currency: "BRL",
                        }
                        )}
                    </Text>
                    </View>
                </View>
                ))}
            </View>
            )}

            <Pressable style={styles.botaoSair} onPress={confirmarSaida}>
            <Text style={styles.iconeSair}>↪</Text>
            <Text style={styles.textoSair}>Sair da conta</Text>
            </Pressable>

            <Text style={styles.rodape}>PetFacil · Cuidando de quem você ama</Text>
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
    conteudo: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    cabecalho: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 52,
        paddingBottom: 20,
    },
    botaoVoltar: {
        width: 42,
        height: 42,
        borderRadius: 14,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    textoVoltar: {
        color: "#2563EB",
        fontSize: 32,
        lineHeight: 35,
    },
    tituloCabecalho: {
        color: "#1E293B",
        fontSize: 20,
        fontWeight: "800",
    },
    espacador: {
        width: 42,
    },
    cartaoUsuario: {
        backgroundColor: "#2563EB",
        borderRadius: 24,
        alignItems: "center",
        paddingVertical: 27,
        paddingHorizontal: 18,
        marginBottom: 27,
    },
    avatar: {
        width: 78,
        height: 78,
        borderRadius: 39,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 13,
        borderWidth: 4,
        borderColor: "#BFDBFE",
    },
    avatarTexto: {
        fontSize: 37,
    },
    nomeUsuario: {
        color: "#FFFFFF",
        fontSize: 22,
        fontWeight: "800",
        textAlign: "center",
    },
    emailUsuario: {
        color: "#DBEAFE",
        fontSize: 14,
        marginTop: 6,
        textAlign: "center",
    },
    etiquetaConta: {
        backgroundColor: "#3B73E8",
        paddingHorizontal: 13,
        paddingVertical: 6,
        borderRadius: 20,
        marginTop: 13,
    },
    etiquetaTexto: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "600",
    },
    tituloSecao: {
        color: "#1E293B",
        fontSize: 19,
        fontWeight: "800",
        marginBottom: 14,
    },
    cartaoDados: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        paddingHorizontal: 16,
        marginBottom: 22,
        borderWidth: 1,
        borderColor: "#E6EDF7",
    },
    linhaDado: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 17,
    },
    iconeDado: {
        width: 43,
        height: 43,
        borderRadius: 13,
        backgroundColor: "#E8F1FF",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 13,
    },
    emojiDado: {
        fontSize: 20,
    },
    textosDado: {
        flex: 1,
    },
    rotuloDado: {
        color: "#64748B",
        fontSize: 12,
        marginBottom: 4,
    },
    valorDado: {
        color: "#1E293B",
        fontSize: 15,
        fontWeight: "600",
    },
    separador: {
        height: 1,
        backgroundColor: "#E8EEF6",
    },
    botaoHistorico: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#E2EAF6",
        padding: 15,
        marginBottom: 27,
    },
    iconeHistorico: {
        width: 48,
        height: 48,
        borderRadius: 15,
        backgroundColor: "#E8F1FF",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 13,
    },
    emojiHistorico: {
        fontSize: 24,
    },
    textosHistorico: {
        flex: 1,
    },
    tituloHistorico: {
        color: "#1E293B",
        fontSize: 15,
        fontWeight: "700",
    },
    descricaoHistorico: {
        color: "#64748B",
        fontSize: 12,
        marginTop: 5,
    },
    setaHistorico: {
        color: "#2563EB",
        fontSize: 28,
        marginLeft: 8,
    },
    cabecalhoCompras: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 14,
    },
    contadorCompras: {
        color: "#2563EB",
        backgroundColor: "#E8F1FF",
        borderRadius: 12,
        paddingHorizontal: 11,
        paddingVertical: 5,
        fontSize: 13,
        fontWeight: "800",
    },
    estado: {
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 24,
        marginBottom: 22,
    },
    textoEstado: {
        color: "#64748B",
        fontSize: 14,
        lineHeight: 21,
        textAlign: "center",
        marginTop: 10,
    },
    emojiVazio: {
        fontSize: 38,
    },
    tituloVazio: {
        color: "#1E293B",
        fontSize: 17,
        fontWeight: "700",
        marginTop: 10,
    },
    botaoTentar: {
        backgroundColor: "#2563EB",
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 12,
        marginTop: 16,
    },
    textoBotaoTentar: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
    },
    listaCompras: {
        gap: 13,
        marginBottom: 25,
    },
    cartaoCompra: {
        backgroundColor: "#FFFFFF",
        borderRadius: 17,
        borderWidth: 1,
        borderColor: "#E6EDF7",
        padding: 15,
    },
    linhaCompra: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconeProduto: {
        width: 47,
        height: 47,
        borderRadius: 14,
        backgroundColor: "#F0F6FF",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    emojiProduto: {
        fontSize: 23,
    },
    dadosCompra: {
        flex: 1,
    },
    nomeProduto: {
        color: "#1E293B",
        fontSize: 15,
        fontWeight: "700",
    },
    quantidadeProduto: {
        color: "#64748B",
        fontSize: 12,
        marginTop: 5,
    },
    dataCompra: {
        color: "#94A3B8",
        fontSize: 11,
        marginTop: 4,
    },
    linhaTotal: {
        borderTopWidth: 1,
        borderTopColor: "#EDF1F7",
        marginTop: 14,
        paddingTop: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    rotuloTotal: {
        color: "#64748B",
        fontSize: 13,
    },
    valorTotal: {
        color: "#2563EB",
        fontSize: 16,
        fontWeight: "800",
    },
    botaoSair: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF1F2",
        borderRadius: 15,
        paddingVertical: 15,
        marginTop: 8,
        borderWidth: 1,
        borderColor: "#FFE4E6",
    },
    iconeSair: {
        color: "#DC2626",
        fontSize: 22,
        marginRight: 9,
    },
    textoSair: {
        color: "#DC2626",
        fontSize: 15,
        fontWeight: "700",
    },
    rodape: {
        color: "#94A3B8",
        textAlign: "center",
        fontSize: 11,
        marginTop: 20,
    },
});