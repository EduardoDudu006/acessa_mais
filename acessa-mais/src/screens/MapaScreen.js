import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Platform,
} from "react-native";
import Header from "../components/Header";
import Card from "../components/Card";
import { useApp } from "../context/AppContext";
import { Search, Plus, ThumbsUp } from "lucide-react-native";

export default function MapaScreen({ navigation }) {
    const appData = useApp() || {};
    const reports = appData.reports || [];

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={styles.content}>
                {/* Busca */}
                <View style={styles.searchBar}>
                    <Search color="#1F2937" size={18} />
                    <Text style={styles.searchText}>
                        Para onde você quer ir?
                    </Text>
                </View>

                {/* Container do Mapa Real via Web/Iframe */}
                <View style={styles.mapContainer}>
                    {Platform.OS === "web" ? (
                        <iframe
                            title="Mapa de Recife"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            src="https://maps.google.com/maps?q=-8.05428,-34.8813&z=14&output=embed"
                        />
                    ) : (
                        <View style={styles.mobilePlaceholder}>
                            <Text style={styles.mobilePlaceholderText}>
                                Carregando mapa interativo de Recife...
                            </Text>
                        </View>
                    )}

                    <TouchableOpacity
                        style={styles.registerFloatingButton}
                        onPress={() => navigation?.navigate("Registrar")}
                    >
                        <Plus color="#FFFFFF" size={18} />
                        <Text style={styles.registerButtonText}>
                            Registrar Problema
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Categorias */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoriesRow}
                >
                    {["Buraco", "Obstáculo", "Rampa", "Calçada", "Outro"].map(
                        (cat, idx) => (
                            <View key={idx} style={styles.categoryChip}>
                                <Text style={styles.categoryChipText}>
                                    {cat}
                                </Text>
                            </View>
                        ),
                    )}
                </ScrollView>

                {/* Ocorrências */}
                <Text style={styles.sectionTitle}>Últimas Ocorrências</Text>
                {reports.map((item) => (
                    <Card key={item.id}>
                        <View style={styles.reportHeader}>
                            <Text style={styles.reportTitle}>{item.title}</Text>
                            <View
                                style={[
                                    styles.badgeSeverity,
                                    {
                                        backgroundColor:
                                            item.severity === "Alta"
                                                ? "#FF7A00"
                                                : "#0B3D91",
                                    },
                                ]}
                            >
                                <Text style={styles.badgeText}>
                                    {item.severity}
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.reportDesc}>
                            {item.description}
                        </Text>

                        <View style={styles.reportFooter}>
                            <Text style={styles.reportInfo}>
                                <ThumbsUp size={12} color="#00A86B" />{" "}
                                Confirmado por {item.confirmations} pessoas
                            </Text>
                            <Text style={styles.reportStatus}>
                                {item.status}
                            </Text>
                        </View>
                    </Card>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#E8F0F5" },
    content: { padding: 16 },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#D1DCE5",
        gap: 8,
        marginBottom: 12,
    },
    searchText: { color: "#617184", fontSize: 13 },
    mapContainer: {
        height: 300,
        borderRadius: 16,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#D1DCE5",
        marginBottom: 16,
        position: "relative",
        backgroundColor: "#D0E4F7",
    },
    mobilePlaceholder: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    mobilePlaceholderText: {
        color: "#0B3D91",
        fontWeight: "700",
        textAlign: "center",
    },
    registerFloatingButton: {
        position: "absolute",
        bottom: 12,
        alignSelf: "center",
        backgroundColor: "#FF7A00",
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        elevation: 4,
    },
    registerButtonText: { color: "#FFFFFF", fontWeight: "800", fontSize: 13 },
    categoriesRow: { flexDirection: "row", marginBottom: 16 },
    categoryChip: {
        backgroundColor: "#FFFFFF",
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#D1DCE5",
        marginRight: 8,
    },
    categoryChipText: { fontSize: 12, fontWeight: "700", color: "#0B3D91" },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "800",
        color: "#0B3D91",
        marginVertical: 10,
    },
    reportHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    reportTitle: { fontSize: 14, fontWeight: "800", color: "#0B3D91" },
    badgeSeverity: {
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 4,
    },
    badgeText: { color: "#FFFFFF", fontSize: 9, fontWeight: "800" },
    reportDesc: { fontSize: 12, color: "#1F2937", marginVertical: 6 },
    reportFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 4,
    },
    reportInfo: { fontSize: 11, color: "#00A86B", fontWeight: "600" },
    reportStatus: { fontSize: 11, fontWeight: "800", color: "#0B3D91" },
});
