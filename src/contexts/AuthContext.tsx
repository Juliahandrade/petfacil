import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

import { apiPost } from "../services/api";

type Usuario = {
    id?: string;
    nomeCompleto: string;
    cpf: string;
    login: string;
    senha?: string;
    };

type AuthContextData = {
    usuario: Usuario | null;
    usuarioAutenticado: Usuario | null;
    token: string | null;
    cadastrarUsuario: (novoUsuario: Usuario) => Promise<boolean>;
    fazerLogin: (login: string, senha: string) => Promise<boolean>;
    sair: () => void;
    };

    const AuthContext = createContext<AuthContextData | undefined>(
    undefined
    );

type AuthProviderProps = {
    children: ReactNode;
    };

    export function AuthProvider({ children }: AuthProviderProps) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [usuarioAutenticado, setUsuarioAutenticado] =
        useState<Usuario | null>(null);
    const [token, setToken] = useState<string | null>(null);

    async function cadastrarUsuario(novoUsuario: Usuario) {
        try {
        await apiPost("/api/users", novoUsuario);
        setUsuario(novoUsuario);
        return true;
        } catch (error) {
        console.log("Erro no cadastro:", error);
        return false;
        }
    }

    async function fazerLogin(login: string, senha: string) {
        try {
        const resposta = await apiPost<{
            success: boolean;
            token: string;
            usuario: {
            id: string;
            nomeCompleto: string;
            login: string;
            };
        }>("/api/users/login", {
            login: login.trim().toLowerCase(),
            senha,
        });

        setToken(resposta.token);
        setUsuarioAutenticado({
        id: resposta.usuario.id,
        nomeCompleto: resposta.usuario.nomeCompleto,
        cpf: "",
        login: resposta.usuario.login,
        });

        return true;
        } catch (error) {
            console.log(
                "Erro no login:",
                error instanceof Error ? error.message : error
            );
            return false;
        }
    }

    function sair() {
        setUsuarioAutenticado(null);
        setToken(null);
    }

    return (
        <AuthContext.Provider
        value={{
            usuario,
            usuarioAutenticado,
            token,
            cadastrarUsuario,
            fazerLogin,
            sair,
        }}
        >
        {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth deve ser usado dentro de AuthProvider");
    }

    return context;
}