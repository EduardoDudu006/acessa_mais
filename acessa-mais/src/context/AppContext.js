import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const theme = {
    colors: {
        primary: "#0B3D91", // Azul - Confiança / Tecnologia
        secondary: "#00A86B", // Verde - Esperança / Inclusão
        accent: "#FF7A00", // Laranja - Energia / Transformação
        background: "#E8F0F5", // Fundo Claro - Leveza / Clareza
        text: "#1F2937", // Escuro - Texto / Contraste
        white: "#FFFFFF",
        cardBorder: "#D1DCE5",
    },
};

export const AppProvider = ({ children }) => {
    const [reports, setReports] = useState([
        {
            id: "1",
            title: "Desnível na calçada",
            category: "Calçada",
            description: "Desnível severo na calçada em frente ao comércio.",
            severity: "Alta",
            confirmations: 8,
            lastConfirmation: "há 2 dias",
            ico: "78%",
            status: "Confirmado",
            location: "Recife - PE",
        },
        {
            id: "2",
            title: "Buraco na calçada",
            category: "Calçada",
            description:
                "Buraco profundo dificultando passagem de cadeirantes.",
            severity: "Alta",
            confirmations: 12,
            lastConfirmation: "há 2 horas",
            ico: "85%",
            status: "Confirmado",
            location: "Boa Viagem",
        },
        {
            id: "3",
            title: "Faixa de pedestres apagada",
            category: "Faixa",
            description:
                "Faixa com sinalização apagada dificultando a travessia.",
            severity: "Média",
            confirmations: 5,
            lastConfirmation: "há 4 horas",
            ico: "60%",
            status: "Em análise",
            location: "Casa Forte",
        },
    ]);

    const [userPoints, setUserPoints] = useState(320);

    const addReport = (newReport) => {
        setReports((prev) => [
            {
                id: String(Date.now()),
                confirmations: 1,
                lastConfirmation: "Agora",
                ico: "50%",
                status: "Em análise",
                ...newReport,
            },
            ...prev,
        ]);
        setUserPoints((prev) => prev + 15);
    };

    return (
        <AppContext.Provider value={{ reports, userPoints, addReport, theme }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
