import React from "react";
import { View, StyleSheet } from "react-native";
import {
    AlertTriangle,
    Accessibility,
    Footprints,
    Droplets,
} from "lucide-react-native";

export default function MapPin({ type }) {
    const renderIcon = () => {
        switch (type) {
            case "alert":
                return <AlertTriangle color="#FFFFFF" size={14} />;
            case "access":
                return <Accessibility color="#FFFFFF" size={14} />;
            case "water":
                return <Droplets color="#FFFFFF" size={14} />;
            default:
                return <Footprints color="#FFFFFF" size={14} />;
        }
    };

    const getBg = () => {
        if (type === "alert") return "#FF7A00"; // Laranja
        if (type === "access") return "#00A86B"; // Verde
        if (type === "water") return "#0B3D91"; // Azul
        return "#1F2937";
    };

    return (
        <View style={[styles.pin, { backgroundColor: getBg() }]}>
            {renderIcon()}
        </View>
    );
}

const styles = StyleSheet.create({
    pin: {
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#FFFFFF",
    },
});
