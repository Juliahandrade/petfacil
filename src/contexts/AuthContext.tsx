import {
    createContext,
    ReactNode,
    useContext,
    useState,
    } from "react";

    type Usuario = {
    nomeCompleto: string;
    cpf: string;
    login: string;
    senha: string;
    };

    type AuthContextData = {
    usuario: Usuario | null;
    usuarioAutenticado: Usuario | null;
    cadastrarUsuario: (novoUsuario: Usuario) => boolean;
    fazerLogin: (login: string, senha: string) => boolean;
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

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    const [usuarioAutenticado, setUsuarioAutenticado] =
        useState<Usuario | null>(null);

    function cadastrarUsuario(novoUsuario: Usuario) {
        const cpfJaCadastrado = usuarios.some(
        (usuario) => usuario.cpf === novoUsuario.cpf
        );

        if (cpfJaCadastrado) {
        return false;
        }

        const loginJaCadastrado = usuarios.some(
        (usuario) => usuario.login === novoUsuario.login
        );

        if (loginJaCadastrado) {
        return false;
        }

        setUsuarios((usuariosAtuais) => [
        ...usuariosAtuais,
        novoUsuario,
        ]);

        setUsuario(novoUsuario);

        return true;
    }

    function fazerLogin(login: string, senha: string) {
        const loginNormalizado = login.trim().toLowerCase();

        const usuarioEncontrado = usuarios.find(
        (usuario) =>
            usuario.login === loginNormalizado &&
            usuario.senha === senha
        );

        if (!usuarioEncontrado) {
        return false;
        }

        setUsuarioAutenticado(usuarioEncontrado);

        return true;
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
        throw new Error(
        "useAuth deve ser usado dentro de AuthProvider"
        );
    }

    return context;
}