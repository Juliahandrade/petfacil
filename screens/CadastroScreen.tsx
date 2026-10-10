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

    type CampoProps = {
    titulo: string;
    placeholder: string;
    valor: string;
    alterar: (texto: string) => void;
    teclado?: "default" | "email-address" | "numeric";
    senhaSegura?: boolean;
    maiusculas?: "none" | "words" | "sentences" | "characters";
    maxLength?: number;
    };

    function Campo({
    titulo,
    placeholder,
    valor,
    alterar,
    teclado = "default",
    senhaSegura = false,
    maiusculas = "none",
    maxLength,
    }: CampoProps) {
    return (
        <View style={styles.grupoCampo}>
        <Text style={styles.label}>{titulo}</Text>
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="#94A3B8"
            value={valor}
            onChangeText={alterar}
            keyboardType={teclado}
            secureTextEntry={senhaSegura}
            autoCapitalize={maiusculas}
            autoCorrect={false}
            maxLength={maxLength}
            blurOnSubmit={false}
            returnKeyType="next"
        />
        </View>
    );
    }

    function limparCPF(valor: string) {
    return valor.replace(/\D/g, "");
    }

    function formatarCPF(valor: string) {
    const numeros = limparCPF(valor).slice(0, 11);

    return numeros
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1-$2");
    }

    function validarCPF(cpfInformado: string) {
    const cpf = limparCPF(cpfInformado);

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let soma = 0;

    for (let i = 0; i < 9; i++) {
        soma += Number(cpf[i]) * (10 - i);
    }

    let resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;

    if (resto !== Number(cpf[9])) return false;

    soma = 0;

    for (let i = 0; i < 10; i++) {
        soma += Number(cpf[i]) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;

    return resto === Number(cpf[10]);
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
    const [carregando, setCarregando] = useState(false);

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const cpfValido = validarCPF(cpf);
    const nomeValido = nome.trim().length >= 2;
    const senhaValida = senha.length >= 6;
    const senhasConferem =
        senha.length > 0 && senha === confirmarSenha;

    const formularioValido =
        nomeValido &&
        emailValido &&
        cpfValido &&
        senhaValida &&
        senhasConferem;

    async function cadastrar() {
        if (carregando || !formularioValido) return;

        setErroCadastro("");
        setCarregando(true);

        const usuario = {
        nomeCompleto: nome.trim(),
        cpf: limparCPF(cpf),
        login: email.trim().toLowerCase(),
        senha,
        };

        try {
        const cadastroRealizado = await cadastrarUsuario(usuario);

        if (!cadastroRealizado) {
            setErroCadastro(
            "Não foi possível criar a conta. Confira se o CPF ou e-mail já está cadastrado."
            );
            return;
        }

        navigation.navigate("Login");
        } finally {
        setCarregando(false);
        }
    }

    return (
        <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
        <ScrollView
            contentContainerStyle={styles.conteudo}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="none"
            showsVerticalScrollIndicator={false}
        >
            <TouchableOpacity
            style={styles.voltar}
            onPress={() => navigation.navigate("Login")}
            activeOpacity={0.7}
            >
            <Text style={styles.setaVoltar}>‹</Text>
            <Text style={styles.textoVoltar}>Voltar ao login</Text>
            </TouchableOpacity>

            <View style={styles.cabecalho}>
            <View style={styles.logoCirculo}>
                <Text style={styles.patinha}>🐾</Text>
            </View>

            <Text style={styles.logo}>PetFacil</Text>
            <Text style={styles.slogan}>
                Mais carinho em cada cuidado.
            </Text>
            </View>

            <View style={styles.cartao}>
            <Text style={styles.titulo}>Crie sua conta</Text>

            <Text style={styles.descricao}>
                Preencha seus dados para realizar seu cadastro.
            </Text>

            <View style={styles.linhaSecao}>
                <View style={styles.indicadorSecao} />
                <Text style={styles.textoSecao}>SEUS DADOS</Text>
            </View>

            <Campo
                titulo="Nome completo"
                placeholder="Digite seu nome completo"
                valor={nome}
                alterar={setNome}
                maiusculas="words"
            />

            {nome.length > 0 && !nomeValido ? (
                <Text style={styles.erroCampo}>
                Informe pelo menos 2 caracteres.
                </Text>
            ) : null}

            <Campo
                titulo="E-mail"
                placeholder="exemplo@email.com"
                valor={email}
                alterar={setEmail}
                teclado="email-address"
            />

            {email.length > 0 && !emailValido ? (
                <Text style={styles.erroCampo}>
                Digite um e-mail válido.
                </Text>
            ) : null}

            <Campo
                titulo="CPF"
                placeholder="000.000.000-00"
                valor={cpf}
                alterar={(texto) => setCpf(formatarCPF(texto))}
                teclado="numeric"
                maxLength={14}
            />

            {cpf.length > 0 && !cpfValido ? (
                <Text style={styles.erroCampo}>
                Confira os números do CPF.
                </Text>
            ) : null}

            <Campo
                titulo="Senha"
                placeholder="Mínimo de 6 caracteres"
                valor={senha}
                alterar={setSenha}
                senhaSegura
            />

            {senha.length > 0 && !senhaValida ? (
                <Text style={styles.erroCampo}>
                A senha deve ter pelo menos 6 caracteres.
                </Text>
            ) : null}

            <Campo
                titulo="Confirmar senha"
                placeholder="Digite a senha novamente"
                valor={confirmarSenha}
                alterar={setConfirmarSenha}
                senhaSegura
            />

            {confirmarSenha.length > 0 && !senhasConferem ? (
                <Text style={styles.erroCampo}>
                As senhas não coincidem.
                </Text>
            ) : null}

            {erroCadastro ? (
                <View style={styles.caixaErro}>
                <Text style={styles.textoErro}>{erroCadastro}</Text>
                </View>
            ) : null}

            <TouchableOpacity
                style={[
                styles.botao,
                (!formularioValido || carregando) &&
                    styles.botaoDesabilitado,
                ]}
                onPress={cadastrar}
                disabled={!formularioValido || carregando}
                activeOpacity={0.8}
            >
                <Text style={styles.textoBotao}>
                {carregando ? "Criando sua conta..." : "Criar minha conta"}
                </Text>

                {!carregando ? (
                <Text style={styles.setaBotao}>→</Text>
                ) : null}
            </TouchableOpacity>

            <View style={styles.rodape}>
                <Text style={styles.textoRodape}>
                Já tem uma conta?
                </Text>

                <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                >
                <Text style={styles.link}> Entrar</Text>
                </TouchableOpacity>
            </View>
            </View>

            <Text style={styles.rodapeAplicativo}>
            PETFACIL • CUIDANDO DE QUEM VOCÊ AMA
            </Text>
        </ScrollView>
        </KeyboardAvoidingView>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F6FD",
    },
    conteudo: {
        flexGrow: 1,
        paddingHorizontal: 22,
        paddingTop: 20,
        paddingBottom: 24,
    },
    voltar: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        paddingVertical: 5,
        marginBottom: 18,
    },
    setaVoltar: {
        color: "#2563EB",
        fontSize: 30,
        lineHeight: 32,
        marginRight: 7,
    },
    textoVoltar: {
        color: "#475569",
        fontSize: 14,
        fontWeight: "500",
    },
    cabecalho: {
        alignItems: "center",
        marginBottom: 25,
    },
    logoCirculo: {
        width: 66,
        height: 66,
        borderRadius: 33,
        backgroundColor: "#DCEAFF",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 9,
    },
    patinha: {
        fontSize: 33,
    },
    logo: {
        color: "#1E3A8A",
        fontSize: 31,
        fontWeight: "800",
        letterSpacing: 0.3,
    },
    slogan: {
        color: "#718096",
        fontSize: 13,
        marginTop: 5,
    },
    cartao: {
        backgroundColor: "#FFFFFF",
        borderRadius: 22,
        paddingHorizontal: 21,
        paddingTop: 25,
        paddingBottom: 23,
        borderWidth: 1,
        borderColor: "#E7EDF7",
        elevation: 3,
        shadowColor: "#1E3A8A",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
    },
    titulo: {
        color: "#172B4D",
        fontSize: 25,
        fontWeight: "800",
        marginBottom: 7,
    },
    descricao: {
        color: "#718096",
        fontSize: 13,
        lineHeight: 20,
        marginBottom: 23,
    },
    linhaSecao: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    indicadorSecao: {
        width: 4,
        height: 16,
        borderRadius: 3,
        backgroundColor: "#3B82F6",
        marginRight: 9,
    },
    textoSecao: {
        color: "#3563A9",
        fontSize: 11,
        fontWeight: "800",
        letterSpacing: 1.2,
    },
    grupoCampo: {
        marginBottom: 14,
    },
    label: {
        color: "#334155",
        fontSize: 13,
        fontWeight: "700",
        marginBottom: 7,
    },
    input: {
        height: 49,
        backgroundColor: "#F8FAFE",
        borderWidth: 1,
        borderColor: "#DFE7F2",
        borderRadius: 12,
        paddingHorizontal: 13,
        color: "#1E293B",
        fontSize: 14,
    },
    erroCampo: {
        color: "#D14343",
        fontSize: 12,
        marginTop: -9,
        marginBottom: 12,
    },
    caixaErro: {
        backgroundColor: "#FFF1F2",
        borderWidth: 1,
        borderColor: "#FECDD3",
        borderRadius: 10,
        padding: 11,
        marginTop: 2,
        marginBottom: 12,
    },
    textoErro: {
        color: "#BE123C",
        fontSize: 13,
        lineHeight: 19,
    },
    botao: {
        height: 53,
        backgroundColor: "#2563EB",
        borderRadius: 13,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 7,
        elevation: 2,
        shadowColor: "#2563EB",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.18,
        shadowRadius: 5,
    },
    botaoDesabilitado: {
        backgroundColor: "#A8BFDF",
        elevation: 0,
        shadowOpacity: 0,
    },
    textoBotao: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "800",
    },
    setaBotao: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "600",
        marginLeft: 10,
    },
    rodape: {
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        marginTop: 22,
    },
    textoRodape: {
        color: "#718096",
        fontSize: 13,
    },
    link: {
        color: "#2563EB",
        fontSize: 13,
        fontWeight: "800",
    },
    rodapeAplicativo: {
        color: "#94A3B8",
        fontSize: 9,
        fontWeight: "700",
        letterSpacing: 1.4,
        textAlign: "center",
        marginTop: 20,
    },
});