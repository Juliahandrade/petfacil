import { StyleSheet, Text, View } from "react-native";

export default function CatalogoScreen() {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Catálogo</Text>

        <Text style={styles.subtitle}>
            Tela de catálogo precisa ser desenvolvida ainda.
        </Text>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: "#F7FAFF",
    },

    title: {
        fontSize: 28,
        fontWeight: "800",
        color: "#1E3A8A",
        marginBottom: 10,
    },

    subtitle: {
        fontSize: 15,
        color: "#5F6B7A",
        textAlign: "center",
    },
    });