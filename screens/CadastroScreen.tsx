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

    type CadastroScreenProps = NativeStackScreenProps<
    RootStackParamList,
    "Cadastro"
    >;

    function limparCPF(cpf: string) {
    return cpf.replace(/\D/g, "");
    }

    function validarCPF(cpf: string) {
    const numero = limparCPF(cpf);

    if (numero.length !== 11) {
        return false;
    }

    if (/^(\d)\1{10}$/.test(numero)) {
        return false;
    }

    let soma = 0;

    for (let i = 0; i < 9; i++) {
        soma += Number(numero[i]) * (10 - i);
    }

    let resto = soma % 11;
    const primeiroDigito = resto < 2 ? 0 : 11 - resto;

    if (primeiroDigito !== Number(numero[9])) {
        return false;
    }

    soma = 0;

    for (let i = 0; i < 10; i++) {
        soma += Number(numero[i]) * (11 - i);
    }

    resto = soma % 11;
    const segundoDigito = resto < 2 ? 0 : 11 - resto;

    return segundoDigito === Number(numero[10]);
    }

    function formatarCPF(valor: string) {
    const numero = valor.replace(/\D/g, "").slice(0, 11);

    if (numero.length <= 3) {
        return numero;
    }

    if (numero.length <= 6) {
        return `${numero.slice(0, 3)}.${numero.slice(3)}`;
    }

    if (numero.length <= 9) {
        return `${numero.slice(0, 3)}.${numero.slice(3, 6)}.${numero.slice(
        6
        )}`;
    }

    return `${numero.slice(0, 3)}.${numero.slice(
        3,
        6
    )}.${numero.slice(6, 9)}-${numero.slice(9)}`;
    }

    function validarEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    export default function CadastroScreen({
    navigation,
    }: CadastroScreenProps) {
    const { cadastrarUsuario } = useAuth();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [erroCadastro, setErroCadastro] = useState("");

    const nomeValido = nome.trim().length >= 2;
    const emailValido = validarEmail(email);
    const cpfValido = validarCPF(cpf);
    const senhaValida = senha.length >= 6;
    const confirmacaoValida =
        confirmarSenha.length > 0 && confirmarSenha === senha;

    const formularioValido =
        nomeValido &&
        emailValido &&
        cpfValido &&
        senhaValida &&
        confirmacaoValida;

    function cadastrar() {
        if (!formularioValido) {
        return;
        }

        setErroCadastro("");

        const usuario = {
        nomeCompleto: nome.trim(),
        cpf: limparCPF(cpf),
        login: email.trim().toLowerCase(),
        senha,
        };

        const cadastroRealizado = cadastrarUsuario(usuario);

        if (!cadastroRealizado) {
        setErroCadastro(
            "Este CPF ou e-mail já está cadastrado."
        );

        return;
        }

        navigation.navigate("Login");
    }

    return (
        <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
        <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.header}>
            <View style={styles.logoCircle}>
                <Text style={styles.logo}>🐾</Text>
            </View>

            <Text style={styles.brand}>PetFacil</Text>

            <Text style={styles.title}>Criar sua conta</Text>

            <Text style={styles.subtitle}>
                Cadastre-se para começar a cuidar ainda mais do seu pet.
            </Text>
            </View>

            <View style={styles.form}>
            <Text style={styles.label}>Nome completo</Text>

            <TextInput
                style={[
                styles.input,
                nome.length > 0 &&
                    !nomeValido &&
                    styles.inputError,
                ]}
                placeholder="Digite seu nome completo"
                placeholderTextColor="#8994A8"
                value={nome}
                onChangeText={(valor) => {
                setNome(valor);
                setErroCadastro("");
                }}
                autoCapitalize="words"
                returnKeyType="next"
            />

            {nome.length > 0 && !nomeValido && (
                <Text style={styles.errorText}>
                O nome deve ter pelo menos 2 caracteres.
                </Text>
            )}

            <Text style={styles.label}>E-mail</Text>

            <TextInput
                style={[
                styles.input,
                email.length > 0 &&
                    !emailValido &&
                    styles.inputError,
                ]}
                placeholder="Digite seu e-mail"
                placeholderTextColor="#8994A8"
                value={email}
                onChangeText={(valor) => {
                setEmail(valor);
                setErroCadastro("");
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
            />

            {email.length > 0 && !emailValido && (
                <Text style={styles.errorText}>
                Digite um e-mail válido.
                </Text>
            )}

            <Text style={styles.label}>CPF</Text>

            <TextInput
                style={[
                styles.input,
                cpf.length > 0 &&
                    !cpfValido &&
                    styles.inputError,
                ]}
                placeholder="000.000.000-00"
                placeholderTextColor="#8994A8"
                value={cpf}
                onChangeText={(valor) => {
                setCpf(formatarCPF(valor));
                setErroCadastro("");
                }}
                keyboardType="numeric"
                maxLength={14}
                returnKeyType="next"
            />

            {cpf.length > 0 && !cpfValido && (
                <Text style={styles.errorText}>
                Digite um CPF válido.
                </Text>
            )}

            <Text style={styles.label}>Senha</Text>

            <TextInput
                style={[
                styles.input,
                senha.length > 0 &&
                    !senhaValida &&
                    styles.inputError,
                ]}
                placeholder="Digite sua senha"
                placeholderTextColor="#8994A8"
                value={senha}
                onChangeText={(valor) => {
                setSenha(valor);
                setErroCadastro("");
                }}
                secureTextEntry
                returnKeyType="next"
            />

            {senha.length > 0 && !senhaValida && (
                <Text style={styles.errorText}>
                A senha deve ter pelo menos 6 caracteres.
                </Text>
            )}

            <Text style={styles.label}>Confirmar senha</Text>

            <TextInput
                style={[
                styles.input,
                confirmarSenha.length > 0 &&
                    !confirmacaoValida &&
                    styles.inputError,
                ]}
                placeholder="Digite sua senha novamente"
                placeholderTextColor="#8994A8"
                value={confirmarSenha}
                onChangeText={(valor) => {
                setConfirmarSenha(valor);
                setErroCadastro("");
                }}
                secureTextEntry
                returnKeyType="done"
            />

            {confirmarSenha.length > 0 &&
                !confirmacaoValida && (
                <Text style={styles.errorText}>
                    As senhas precisam ser iguais.
                </Text>
                )}

            {erroCadastro !== "" && (
                <Text style={styles.errorText}>
                {erroCadastro}
                </Text>
            )}

            <TouchableOpacity
                style={[
                styles.button,
                !formularioValido &&
                    styles.buttonDisabled,
                ]}
                onPress={cadastrar}
                disabled={!formularioValido}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText}>
                Criar conta
                </Text>
            </TouchableOpacity>
            </View>

            <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.goBack()}
            >
            <Text style={styles.loginText}>
                Já possui uma conta?{" "}
                <Text style={styles.loginHighlight}>
                Entrar
                </Text>
            </Text>
            </TouchableOpacity>
        </ScrollView>
        </KeyboardAvoidingView>
    );
    }

    const styles = StyleSheet.create({
    keyboardContainer: {
        flex: 1,
    },

    container: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingVertical: 40,
        paddingBottom: 60,
        backgroundColor: "#F7FAFF",
    },

    header: {
        alignItems: "center",
        marginBottom: 30,
    },

    logoCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E8F1FF",
        marginBottom: 8,
    },

    logo: {
        fontSize: 30,
    },

    brand: {
        fontSize: 27,
        fontWeight: "800",
        color: "#1E3A8A",
        letterSpacing: 0.7,
        marginBottom: 22,
    },

    title: {
        fontSize: 27,
        fontWeight: "800",
        color: "#172033",
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 15,
        lineHeight: 22,
        color: "#5F6B7A",
        textAlign: "center",
        maxWidth: 330,
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
        marginBottom: 6,
        borderWidth: 1,
        borderColor: "#CBD9F0",
        fontSize: 16,
        color: "#172033",
    },

    inputError: {
        borderColor: "#DC2626",
    },

    errorText: {
        fontSize: 12,
        color: "#DC2626",
        marginBottom: 12,
        marginLeft: 4,
    },

    button: {
        height: 54,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2563EB",
        marginTop: 12,
        elevation: 3,
    },

    buttonDisabled: {
        backgroundColor: "#AFC5E8",
        elevation: 0,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "800",
        letterSpacing: 0.3,
    },

    loginButton: {
        marginTop: 25,
        alignItems: "center",
        paddingBottom: 15,
    },

    loginText: {
        fontSize: 15,
        color: "#5F6B7A",
    },

    loginHighlight: {
        color: "#2563EB",
        fontWeight: "800",
    },
});