import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";
import { useAuth } from "../src/contexts/AuthContext";

type LoginScreenProps = NativeStackScreenProps<
    RootStackParamList,
    "Login"
    >;

    export default function LoginScreen({
    navigation,
    }: LoginScreenProps) {
    const { fazerLogin } = useAuth();

    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function entrar() {
        if (carregando) return;

        setErro("");

        if (!login.trim() || !senha) {
        setErro("Preencha o e-mail e a senha.");
        return;
        }

        setCarregando(true);

        try {
        const loginRealizado = await fazerLogin(login, senha);

        if (!loginRealizado) {
            setErro("E-mail ou senha incorretos.");
            return;
        }

        navigation.navigate("Catalogo");
        } catch {
        setErro("Não foi possível entrar. Verifique sua conexão.");
        } finally {
        setCarregando(false);
        }
    }

    return (
        <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
        <ScrollView
            contentContainerStyle={styles.conteudo}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}
            automaticallyAdjustKeyboardInsets={Platform.OS === "ios"}
        >
            <View style={styles.cabecalho}>
            <View style={styles.logoCirculo}>
                <Text style={styles.patinha}>🐾</Text>
            </View>

            <Text style={styles.logo}>PetFacil</Text>
            </View>

            <View style={styles.formulario}>
            <Text style={styles.titulo}>Bem-vindo!</Text>

            <Text style={styles.descricao}>
                Entre para encontrar tudo para o seu pet.
            </Text>

            <Text style={styles.label}>E-mail</Text>

            <TextInput
                style={styles.input}
                placeholder="Digite seu e-mail"
                placeholderTextColor="#8A94A6"
                value={login}
                onChangeText={setLogin}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
            />

            <Text style={styles.label}>Senha</Text>

            <TextInput
                style={styles.input}
                placeholder="Digite sua senha"
                placeholderTextColor="#8A94A6"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={entrar}
            />

            {erro ? <Text style={styles.erro}>{erro}</Text> : null}

            <TouchableOpacity
                style={[
                styles.botao,
                carregando && styles.botaoDesabilitado,
                ]}
                onPress={entrar}
                disabled={carregando}
                activeOpacity={0.8}
            >
                <Text style={styles.textoBotao}>
                {carregando ? "Entrando..." : "Entrar"}
                </Text>
            </TouchableOpacity>

            <View style={styles.rodape}>
                <Text style={styles.textoRodape}>
                Ainda não tem uma conta?
                </Text>

                <TouchableOpacity
                onPress={() => navigation.navigate("Cadastro")}
                >
                <Text style={styles.link}> Criar conta</Text>
                </TouchableOpacity>
            </View>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7FAFF",
    },
    conteudo: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 28,
        paddingVertical: 24,
    },
    cabecalho: {
        alignItems: "center",
        marginBottom: 28,
    },
    logoCirculo: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: "#E8F1FF",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },
    patinha: {
        fontSize: 35,
    },
    logo: {
        fontSize: 34,
        fontWeight: "bold",
        color: "#1E3A8A",
        letterSpacing: 0.5,
    },
    formulario: {
        width: "100%",
    },
    titulo: {
        fontSize: 27,
        fontWeight: "bold",
        color: "#1E3A8A",
        marginBottom: 8,
    },
    descricao: {
        fontSize: 15,
        color: "#64748B",
        marginBottom: 24,
    },
    label: {
        color: "#334155",
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 8,
    },
    input: {
        height: 54,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#DCE6F4",
        borderRadius: 14,
        paddingHorizontal: 16,
        fontSize: 15,
        color: "#1E293B",
        marginBottom: 18,
    },
    erro: {
        color: "#D32F2F",
        fontSize: 14,
        marginBottom: 14,
    },
    botao: {
        minHeight: 54,
        backgroundColor: "#2563EB",
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 4,
        elevation: 2,
    },
    botaoDesabilitado: {
        opacity: 0.6,
    },
    textoBotao: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    rodape: {
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        marginTop: 24,
        paddingBottom: 12,
    },
    textoRodape: {
        color: "#64748B",
        fontSize: 14,
    },
    link: {
        color: "#2563EB",
        fontSize: 14,
        fontWeight: "bold",
    },
});
