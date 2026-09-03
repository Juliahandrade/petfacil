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

    function entrar() {
        setErro("");

        if (!login.trim() || !senha) {
        setErro("Preencha o e-mail e a senha.");
        return;
        }

        const loginRealizado = fazerLogin(login, senha);

        if (!loginRealizado) {
        setErro("E-mail ou senha incorretos.");
        return;
        }

        setErro("");
        navigation.navigate("Catalogo");
    }

    return (
        <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
        <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
            <View style={styles.logoContainer}>
                <View style={styles.logoCircle}>
                <Text style={styles.logo}>🐾</Text>
                </View>

                <Text style={styles.brand}>PetFacil</Text>

                <Text style={styles.subtitle}>
                Cuidado, carinho e tudo o que seu pet precisa.
                </Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>E-mail</Text>

                <TextInput
                style={[styles.input, erro && styles.inputError]}
                placeholder="Digite seu e-mail"
                placeholderTextColor="#8994A8"
                value={login}
                onChangeText={setLogin}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                />

                <Text style={styles.label}>Senha</Text>

                <TextInput
                style={[styles.input, erro && styles.inputError]}
                placeholder="Digite sua senha"
                placeholderTextColor="#8994A8"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                />

                {erro !== "" && (
                <Text style={styles.errorText}>
                    {erro}
                </Text>
                )}

                <TouchableOpacity
                style={styles.button}
                onPress={entrar}
                activeOpacity={0.8}
                >
                <Text style={styles.buttonText}>
                    Entrar
                </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.registerButton}
                onPress={() => navigation.navigate("Cadastro")}
            >
                <Text style={styles.registerText}>
                Ainda não tem uma conta?{" "}
                <Text style={styles.registerHighlight}>
                    Cadastre-se
                </Text>
                </Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
    );
    }

    const styles = StyleSheet.create({
    keyboardContainer: {
        flex: 1,
    },

    scrollContent: {
        flexGrow: 1,
    },

    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 24,
        paddingVertical: 30,
        backgroundColor: "#F7FAFF",
    },

    logoContainer: {
        alignItems: "center",
        marginBottom: 34,
    },

    logoCircle: {
        width: 78,
        height: 78,
        borderRadius: 39,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E8F1FF",
        marginBottom: 10,
    },

    logo: {
        fontSize: 38,
    },

    brand: {
        fontSize: 32,
        fontWeight: "800",
        color: "#1E3A8A",
        letterSpacing: 0.8,
        marginBottom: 10,
    },

    subtitle: {
        fontSize: 16,
        lineHeight: 23,
        color: "#5F6B7A",
        textAlign: "center",
        maxWidth: 320,
    },

    form: {
        width: "100%",
    },

    label: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1E3A8A",
        marginBottom: 7,
    },

    input: {
        height: 54,
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        paddingHorizontal: 16,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: "#CBD9F0",
        fontSize: 16,
        color: "#172033",
    },

    inputError: {
        borderColor: "#DC2626",
    },

    errorText: {
        fontSize: 13,
        color: "#DC2626",
        marginTop: -8,
        marginBottom: 10,
        marginLeft: 4,
    },

    button: {
        height: 54,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2563EB",
        marginTop: 4,
        elevation: 3,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "800",
        letterSpacing: 0.3,
    },

    registerButton: {
        marginTop: 26,
        alignItems: "center",
    },

    registerText: {
        fontSize: 15,
        color: "#5F6B7A",
    },

    registerHighlight: {
        color: "#2563EB",
        fontWeight: "800",
    },
    });

