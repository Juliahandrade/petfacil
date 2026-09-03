import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import CadastroScreen from "../screens/CadastroScreen";
import CatalogoScreen from "../screens/CatalogoScreen";
import CarrinhoScreen from "../screens/CarrinhoScreen";
import HistoricoComprasScreen from "../screens/HistoricoComprasScreen";


export type RootStackParamList = {
    Login: undefined;
    Cadastro: undefined;
    Catalogo: undefined;
    Carrinho: undefined;
    HistoricoCompras: undefined;

    };

    const Stack = createNativeStackNavigator<RootStackParamList>();

    export default function AppNavigator() {
    return (
        <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
            headerShown: false,
        }}
        >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Catalogo" component={CatalogoScreen} />
        <Stack.Screen name="Carrinho" component={CarrinhoScreen} />
        <Stack.Screen name="HistoricoCompras"component={HistoricoComprasScreen}/>
        </Stack.Navigator>
    );
    }