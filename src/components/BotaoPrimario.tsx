import {
    Pressable,
    StyleSheet,
    Text,
    } from "react-native";

    import type {
    StyleProp,
    ViewStyle,
    } from "react-native";

    type BotaoPrimarioProps = {
    titulo: string;
    onPress: () => void;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    };

    export default function BotaoPrimario({
    titulo,
    onPress,
    disabled = false,
    style,
    }: BotaoPrimarioProps) {
    return (
        <Pressable
        style={[
            styles.button,
            disabled && styles.buttonDisabled,
            style,
        ]}
        onPress={onPress}
        disabled={disabled}
        >
        <Text style={styles.buttonText}>
            {titulo}
        </Text>
        </Pressable>
    );
    }

    const styles = StyleSheet.create({
    button: {
        backgroundColor: "#2563EB",
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: "center",
    },

    buttonDisabled: {
        opacity: 0.5,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "800",
    },
});