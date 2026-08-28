import { createContext, ReactNode, useContext, useState } from "react";

type Usuario = {
    nomeCompleto: string;
    cpf: string;
    login: string;
    senha: string;
    };

    type AuthContextData = {
    usuario: Usuario | null;
    usuarioAutenticado: Usuario | null;
    cadastrarUsuario: (novoUsuario: Usuario) => void;
    fazerLogin: (login: string, senha: string) => boolean;
    sair: () => void;
    };

    const AuthContext = createContext<AuthContextData | undefined>(undefined);

    type AuthProviderProps = {
    children: ReactNode;
    };

    export function AuthProvider({ children }: AuthProviderProps) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [usuarioAutenticado, setUsuarioAutenticado] =
        useState<Usuario | null>(null);

    function cadastrarUsuario(novoUsuario: Usuario) {
        setUsuario(novoUsuario);
    }

    function fazerLogin(login: string, senha: string) {
        if (!usuario) {
        return false;
        }

        const loginValido =
        usuario.login === login.trim().toLowerCase();

        const senhaValida = usuario.senha === senha;

        if (loginValido && senhaValida) {
        setUsuarioAutenticado(usuario);
        return true;
        }

        return false;
    }

    function sair() {
        setUsuarioAutenticado(null);
    }

    return (
        <AuthContext.Provider
        value={{
            usuario,
            usuarioAutenticado,
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