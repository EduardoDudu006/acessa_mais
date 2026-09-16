import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import Header from "../components/Header";
import Card from "../components/Card";
import { Route, Navigation } from "lucide-react-native";

export default function CaminhoScreen() {
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.content}>
                <Card>
                    <View style={styles.titleRow}>
                        <Route color="#0B3D91" size={20} />
                        <Text style={styles.title}>Rotas Acessíveis</Text>
                    </View>

                    <Text style={styles.label}>Origem</Text>
                    <TextInput
                        style={styles.input}
                        value="Praça do Derby, Recife - PE"
                        editable={false}
                    />

                    <Text style={styles.label}>Destino</Text>
                    <TextInput
                        style={styles.input}
                        value="Hospital da Restauração"
                        editable={false}
                    />

                    <View style={styles.routeOption}>
                        <Text style={styles.routeText}>
                            Rota com maior acessibilidade
                        </Text>
                        <Text style={styles.routeDetail}>
                            ⏱ 15 min • 1,2 km
                        </Text>
                        <Text style={styles.routeSubDetail}>
                            Menos obstáculos e calçadas adequadas
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.actionButton}>
                        <Navigation color="#FFFFFF" size={16} />
                        <Text style={styles.actionButtonText}>
                            Ver detalhes da rota
                        </Text>
                    </TouchableOpacity>
                </Card>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#E8F0F5" },
    content: { padding: 16 },
    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
    },
    title: { fontSize: 18, fontWeight: "800", color: "#0B3D91" },
    label: { fontSize: 11, fontWeight: "700", color: "#1F2937", marginTop: 8 },
    input: {
        backgroundColor: "#E8F0F5",
        borderWidth: 1,
        borderColor: "#D1DCE5",
        borderRadius: 8,
        padding: 10,
        fontSize: 12,
        color: "#1F2937",
        marginTop: 4,
    },
    routeOption: {
        backgroundColor: "#E8F0F5",
        borderRadius: 8,
        padding: 12,
        marginVertical: 14,
        borderLeftWidth: 4,
        borderLeftColor: "#00A86B",
    },
    routeText: { fontSize: 13, fontWeight: "800", color: "#0B3D91" },
    routeDetail: {
        fontSize: 12,
        fontWeight: "700",
        color: "#00A86B",
        marginTop: 2,
    },
    routeSubDetail: { fontSize: 10, color: "#617184", marginTop: 2 },
    actionButton: {
        backgroundColor: "#0B3D91",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        padding: 12,
        borderRadius: 8,
    },
    actionButtonText: { color: "#FFFFFF", fontWeight: "800", fontSize: 13 },
});
