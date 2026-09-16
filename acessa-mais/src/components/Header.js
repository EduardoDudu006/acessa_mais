import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Accessibility } from "lucide-react-native";

export default function Header() {
    return (
        <View style={styles.container}>
            <View style={styles.brandRow}>
                <View style={styles.logoCircle}>
                    <Accessibility color="#0B3D91" size={22} />
                    <View style={styles.dotOrange} />
                </View>
                <Text style={styles.logoTitle}>
                    ACESSA<Text style={styles.plus}>+</Text>
                </Text>
            </View>
            <Text style={styles.subTitle}>
                Mapeando obstáculos. Construindo caminhos acessíveis.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 48,
        paddingBottom: 12,
        paddingHorizontal: 20,
        backgroundColor: "#0B3D91",
        alignItems: "center",
    },
    brandRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    logoCircle: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    dotOrange: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#FF7A00",
    },
    logoTitle: {
        fontSize: 24,
        fontWeight: "900",
        color: "#FFFFFF",
        letterSpacing: -0.5,
    },
    plus: {
        color: "#FF7A00",
    },
    subTitle: {
        fontSize: 10,
        fontWeight: "600",
        color: "#E8F0F5",
        marginTop: 3,
    },
});
