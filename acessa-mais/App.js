import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Platform,
} from "react-native";
import {
    Home,
    Map,
    AlertTriangle,
    Route,
    FileText,
    BarChart2,
    Award,
    User,
    Settings,
    Search,
    Bell,
    Plus,
    Minus,
    Target,
    Layers,
    Check,
    ChevronDown,
    Compass,
    Footprints,
} from "lucide-react-native";

const logoPrincipal = require("./assets/logo-acessa-mais.png");
const logoLogin = require("./assets/logo-completo.png");

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const [stepAuth, setStepAuth] = useState("email");

    const [activeMenu, setActiveMenu] = useState("Inicio");
    const [rotasAcessiveis, setRotasAcessiveis] = useState(true);

    // Estados para o Roteamento de Pedestres
    const [destinoBusca, setDestinoBusca] = useState("");
    const [rotaAtiva, setRotaAtiva] = useState(false);
    const [dadosRota, setDadosRota] = useState({
        distancia: "1.2 km",
        tempo: "15 min",
        instrucoes:
            "Siga pela Rua do Imperador em direção ao Bairro do Recife.",
    });

    const [reports, setReports] = useState([
        {
            id: "1",
            title: "Desnível na calçada",
            category: "Calçada",
            description: "Desnível severo na calçada em frente ao comércio.",
            severity: "Alta",
            confirmations: 8,
            status: "Confirmado",
            location: "Recife - PE",
            time: "Há 2 dias",
        },
        {
            id: "2",
            title: "Buraco na calçada",
            category: "Calçada",
            description: "Buraco profundo dificultando passagem.",
            severity: "Alta",
            confirmations: 12,
            status: "Confirmado",
            location: "Boa Viagem",
            time: "Há 2 horas",
        },
        {
            id: "3",
            title: "Faixa de pedestres apagada",
            category: "Faixa",
            description: "Sinalização apagada dificultando travessia.",
            severity: "Média",
            confirmations: 5,
            status: "Em análise",
            location: "Casa Forte",
            time: "Há 4 horas",
        },
    ]);

    const [novoTitulo, setNovoTitulo] = useState("");
    const [novaCategoria, setNovaCategoria] = useState("Buraco");
    const [novaDescricao, setNovaDescricao] = useState("");

    const handleAvancarAuth = () => {
        if (!emailInput || !emailInput.includes("@")) {
            alert("Por favor, digite um e-mail válido.");
            return;
        }
        setStepAuth("senha");
    };

    const handleConcluirLogin = () => {
        setIsLoggedIn(true);
    };

    // Função simulada inteligente de geocodificação e roteamento a pé para pedestres
    const handleBuscarRotaPedestre = () => {
        if (!destinoBusca) {
            alert("Por favor, digite para onde deseja ir.");
            return;
        }
        setRotaAtiva(true);
        setActiveMenu("Mapa");
        setDadosRota({
            distancia: "1.4 km",
            tempo: "18 min a pé",
            instrucoes: `Rota segura para pedestres até: ${destinoBusca}. Evitando vias sem calçada.`,
        });
    };

    const handleCriarOcorrencia = () => {
        if (!novoTitulo)
            return alert("Por favor, informe o título da ocorrência.");
        const nova = {
            id: String(Date.now()),
            title: novoTitulo,
            category: novaCategoria,
            description: novaDescricao || "Relato colaborativo.",
            severity: "Alta",
            confirmations: 1,
            status: "Novo",
            location: "Recife Centro",
            time: "Agora",
        };
        setReports([nova, ...reports]);
        alert("Ocorrência registrada com sucesso!");
        setNovoTitulo("");
        setNovaDescricao("");
        setActiveMenu("Ocorrencias");
    };

    // --- TELA DE LOGIN ---
    if (!isLoggedIn) {
        return (
            <View style={styles.authWrapper}>
                <View style={styles.authCard}>
                    <View style={styles.authLogoContainer}>
                        <Image
                            source={logoLogin}
                            style={styles.authLogoImage}
                            resizeMode="contain"
                        />
                        <Text style={styles.authSubtitle}>
                            Cidade para todas as pessoas
                        </Text>
                    </View>

                    {stepAuth === "email" ? (
                        <View style={styles.authForm}>
                            <Text style={styles.authLabel}>
                                Acesse ou crie sua conta
                            </Text>
                            <Text style={styles.authInstruction}>
                                Digite seu e-mail para continuar:
                            </Text>

                            <TextInput
                                style={styles.authInput}
                                placeholder="seu.email@exemplo.com"
                                placeholderTextColor="#A0AEC0"
                                value={emailInput}
                                onChangeText={setEmailInput}
                                autoCapitalize="none"
                            />

                            <TouchableOpacity
                                style={styles.authPrimaryButton}
                                onPress={handleAvancarAuth}
                            >
                                <Text style={styles.authPrimaryButtonText}>
                                    Continuar
                                </Text>
                            </TouchableOpacity>

                            <View style={styles.dividerRow}>
                                <View style={styles.dividerLine} />
                                <Text style={styles.dividerText}>
                                    ou entre com
                                </Text>
                                <View style={styles.dividerLine} />
                            </View>

                            <TouchableOpacity
                                style={styles.socialButton}
                                onPress={handleConcluirLogin}
                            >
                                <Text style={styles.socialButtonText}>
                                    Google / Gov.br (Entrada Instantânea)
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.authForm}>
                            <Text style={styles.authLabel}>
                                Bem-vindo de volta!
                            </Text>
                            <Text style={styles.authInstruction}>
                                Digite sua senha para acessar {emailInput}:
                            </Text>

                            <TextInput
                                style={styles.authInput}
                                placeholder="Sua senha segura"
                                placeholderTextColor="#A0AEC0"
                                secureTextEntry
                            />

                            <TouchableOpacity
                                style={styles.authPrimaryButton}
                                onPress={handleConcluirLogin}
                            >
                                <Text style={styles.authPrimaryButtonText}>
                                    Entrar na Plataforma
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setStepAuth("email")}
                                style={{ marginTop: 12, alignItems: "center" }}
                            >
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: "#0B3D91",
                                        fontWeight: "700",
                                    }}
                                >
                                    ← Voltar e alterar e-mail
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        );
    }

    // --- PAINEL PRINCIPAL (DASHBOARD) ---
    const renderContent = () => {
        switch (activeMenu) {
            case "Inicio":
            case "Mapa":
                return (
                    <View style={styles.contentBody}>
                        <View style={styles.mapColumn}>
                            <View style={styles.mapBox}>
                                {/* MAPA INTERATIVO COM ROTA DE PEDESTRE DINÂMICA VIA URL/IFRAME */}
                                {Platform.OS === "web" ? (
                                    <iframe
                                        title="Mapa de Rota Acessível para Pedestres"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        loading="lazy"
                                        src={
                                            rotaAtiva
                                                ? `https://www.openstreetmap.org/export/embed.html?bbox=-34.90,-8.07,-34.86,-8.03&layer=mapnik&marker=-8.05428,-34.8813`
                                                : `https://maps.google.com/maps?q=-8.05428,-34.8813&z=15&output=embed`
                                        }
                                    />
                                ) : (
                                    <View style={styles.mapFallback}>
                                        <Text style={styles.fallbackText}>
                                            Mapa em Tempo Real
                                        </Text>
                                    </View>
                                )}

                                {/* PAINEL DE NAVEGAÇÃO PEDESTRE ESTILO GPS (SE HOUVER ROTA) */}
                                {rotaAtiva && (
                                    <View style={styles.gpsNavigationCard}>
                                        <View style={styles.gpsHeaderRow}>
                                            <Footprints
                                                color="#00A86B"
                                                size={20}
                                            />
                                            <Text style={styles.gpsTitle}>
                                                Navegação a Pé Ativa
                                            </Text>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    setRotaAtiva(false)
                                                }
                                            >
                                                <Text
                                                    style={styles.gpsCloseText}
                                                >
                                                    ✕ Fechar
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={styles.gpsDestText}>
                                            Destino: {destinoBusca}
                                        </Text>
                                        <View style={styles.gpsMetricsRow}>
                                            <Text style={styles.gpsMetricBadge}>
                                                ⏱ {dadosRota.tempo}
                                            </Text>
                                            <Text style={styles.gpsMetricBadge}>
                                                📏 {dadosRota.distancia}
                                            </Text>
                                        </View>
                                        <Text style={styles.gpsInstruction}>
                                            {dadosRota.instrucoes}
                                        </Text>
                                    </View>
                                )}

                                {/* CARD FLUTUANTE DE OCORRÊNCIA */}
                                {!rotaAtiva && (
                                    <View style={styles.mapFloatingCard}>
                                        <View style={styles.cardHeaderRow}>
                                            <View
                                                style={
                                                    styles.cardThumbPlaceholder
                                                }
                                            />
                                            <View style={{ flex: 1 }}>
                                                <View
                                                    style={styles.titleBadgeRow}
                                                >
                                                    <Text
                                                        style={
                                                            styles.floatingTitle
                                                        }
                                                    >
                                                        {reports[0]?.title ||
                                                            "Desnível"}
                                                    </Text>
                                                    <View
                                                        style={
                                                            styles.badgeOrange
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.badgeText
                                                            }
                                                        >
                                                            Alta
                                                        </Text>
                                                    </View>
                                                </View>
                                                <Text
                                                    style={
                                                        styles.floatingCategory
                                                    }
                                                >
                                                    {reports[0]?.category}
                                                </Text>
                                                <Text
                                                    style={styles.floatingDesc}
                                                >
                                                    {reports[0]?.description}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.cardConfirmRow}>
                                            <Check size={14} color="#00A86B" />
                                            <Text style={styles.confirmText}>
                                                Confirmado por{" "}
                                                {reports[0]?.confirmations}{" "}
                                                pessoas
                                            </Text>
                                        </View>
                                        <Text style={styles.timeText}>
                                            Última confirmação:{" "}
                                            {reports[0]?.time}
                                        </Text>
                                        <TouchableOpacity
                                            style={styles.cardButton}
                                            onPress={() =>
                                                alert(
                                                    "Detalhes da ocorrência aberta!",
                                                )
                                            }
                                        >
                                            <Text style={styles.cardButtonText}>
                                                Ver detalhes
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )}

                                <View style={styles.mapControls}>
                                    <TouchableOpacity style={styles.controlBtn}>
                                        <Plus size={16} color="#1F2937" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.controlBtn}>
                                        <Minus size={16} color="#1F2937" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.controlBtn}>
                                        <Target size={16} color="#1F2937" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.controlBtn}>
                                        <Layers size={16} color="#1F2937" />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.mapBottomBar}>
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={
                                            styles.filterScroll
                                        }
                                    >
                                        <View style={styles.filterItem}>
                                            <View
                                                style={[
                                                    styles.dotFilter,
                                                    {
                                                        backgroundColor:
                                                            "#00A86B",
                                                    },
                                                ]}
                                            />
                                            <Text style={styles.filterLabel}>
                                                Calçadas
                                            </Text>
                                        </View>
                                        <View style={styles.filterItem}>
                                            <View
                                                style={[
                                                    styles.dotFilter,
                                                    {
                                                        backgroundColor:
                                                            "#0B3D91",
                                                    },
                                                ]}
                                            />
                                            <Text style={styles.filterLabel}>
                                                Acessibilidade
                                            </Text>
                                        </View>
                                        <View style={styles.filterItem}>
                                            <View
                                                style={[
                                                    styles.dotFilter,
                                                    {
                                                        backgroundColor:
                                                            "#FF7A00",
                                                    },
                                                ]}
                                            />
                                            <Text style={styles.filterLabel}>
                                                Travessias
                                            </Text>
                                        </View>
                                        <View style={styles.filterItem}>
                                            <View
                                                style={[
                                                    styles.dotFilter,
                                                    {
                                                        backgroundColor:
                                                            "#E53E3E",
                                                    },
                                                ]}
                                            />
                                            <Text style={styles.filterLabel}>
                                                Obstáculos
                                            </Text>
                                        </View>

                                        <View style={styles.toggleContainer}>
                                            <Text style={styles.toggleLabel}>
                                                Rotas acessíveis
                                            </Text>
                                            <TouchableOpacity
                                                style={[
                                                    styles.toggleSwitch,
                                                    rotasAcessiveis &&
                                                        styles.toggleSwitchActive,
                                                ]}
                                                onPress={() =>
                                                    setRotasAcessiveis(
                                                        !rotasAcessiveis,
                                                    )
                                                }
                                            >
                                                <View
                                                    style={[
                                                        styles.toggleCircle,
                                                        rotasAcessiveis &&
                                                            styles.toggleCircleActive,
                                                    ]}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        </View>

                        <ScrollView
                            style={styles.statsColumn}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={styles.statsHeader}>
                                <Text style={styles.statsTitle}>
                                    Resumo da Cidade
                                </Text>
                                <View style={styles.locationSelector}>
                                    <Text style={styles.locationText}>
                                        Recife - PE
                                    </Text>
                                    <ChevronDown size={14} color="#1F2937" />
                                </View>
                            </View>

                            <View style={styles.cardsRow}>
                                <View
                                    style={[
                                        styles.statBox,
                                        { backgroundColor: "#0B3D91" },
                                    ]}
                                >
                                    <Text style={styles.statVal}>
                                        {1452 + reports.length}
                                    </Text>
                                    <Text style={styles.statSub}>
                                        Total de ocorrências
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.statBox,
                                        { backgroundColor: "#00A86B" },
                                    ]}
                                >
                                    <Text style={styles.statVal}>987</Text>
                                    <Text style={styles.statSub}>
                                        Resolvidas
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.statBox,
                                        { backgroundColor: "#FF7A00" },
                                    ]}
                                >
                                    <Text style={styles.statVal}>465</Text>
                                    <Text style={styles.statSub}>
                                        Pendentes
                                    </Text>
                                </View>
                            </View>

                            <Text style={styles.sectionSubtitle}>
                                Por categoria
                            </Text>
                            <View style={styles.categoryStatsBox}>
                                <View style={styles.donutSim}>
                                    <View style={styles.donutHole} />
                                </View>
                                <View style={styles.legendList}>
                                    {[
                                        {
                                            label: "Calçadas",
                                            val: "32%",
                                            color: "#0B3D91",
                                        },
                                        {
                                            label: "Acessibilidade",
                                            val: "24%",
                                            color: "#00A86B",
                                        },
                                        {
                                            label: "Travessias",
                                            val: "16%",
                                            color: "#FF7A00",
                                        },
                                        {
                                            label: "Obstáculos",
                                            val: "12%",
                                            color: "#E53E3E",
                                        },
                                    ].map((c, i) => (
                                        <View key={i} style={styles.legendRow}>
                                            <View
                                                style={[
                                                    styles.legendDot,
                                                    {
                                                        backgroundColor:
                                                            c.color,
                                                    },
                                                ]}
                                            />
                                            <Text style={styles.legendLabel}>
                                                {c.label}
                                            </Text>
                                            <Text style={styles.legendVal}>
                                                {c.val}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            <View style={styles.dualMiniRow}>
                                <View style={styles.miniCard}>
                                    <Text style={styles.miniTitle}>
                                        Índice de Acessibilidade
                                    </Text>
                                    <View style={styles.scoreGauge}>
                                        <Text style={styles.scoreVal}>
                                            56
                                            <Text style={styles.scoreMax}>
                                                /100
                                            </Text>
                                        </Text>
                                        <Text style={styles.scoreTag}>
                                            Regular
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.miniCard}>
                                    <Text style={styles.miniTitle}>
                                        Mapa de Calor
                                    </Text>
                                    <View style={styles.heatMapThumb} />
                                </View>
                            </View>

                            <View style={styles.recentHeader}>
                                <Text style={styles.sectionSubtitle}>
                                    Últimas ocorrências
                                </Text>
                                <TouchableOpacity
                                    onPress={() => setActiveMenu("Ocorrencias")}
                                >
                                    <Text style={styles.seeAllText}>
                                        Ver todas
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {reports.slice(0, 3).map((o, idx) => (
                                <View key={idx} style={styles.recentItem}>
                                    <View style={styles.recentIconBox}>
                                        <AlertTriangle
                                            size={14}
                                            color="#0B3D91"
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.recentTitle}>
                                            {o.title} - {o.location}
                                        </Text>
                                        <Text style={styles.recentTime}>
                                            {o.time}
                                        </Text>
                                    </View>
                                    <View
                                        style={[
                                            styles.miniBadge,
                                            {
                                                backgroundColor:
                                                    o.severity === "Alta"
                                                        ? "#FF7A00"
                                                        : "#00A86B",
                                            },
                                        ]}
                                    >
                                        <Text style={styles.miniBadgeText}>
                                            {o.severity}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                );

            case "Registrar":
                return (
                    <ScrollView style={styles.fullPane}>
                        <Text style={styles.paneTitle}>
                            Registrar Novo Problema de Acessibilidade
                        </Text>
                        <Text style={styles.paneSub}>
                            Preencha os dados abaixo para submeter a ocorrência
                            na comunidade.
                        </Text>

                        <View style={styles.formCard}>
                            <Text style={styles.formLabel}>
                                Título do Problema
                            </Text>
                            <TextInput
                                style={styles.formInput}
                                placeholder="Ex: Rampa com inclinação excessiva"
                                placeholderTextColor="#A0AEC0"
                                value={novoTitulo}
                                onChangeText={setNovoTitulo}
                            />

                            <Text style={styles.formLabel}>Categoria</Text>
                            <View style={styles.catPickerRow}>
                                {[
                                    "Buraco",
                                    "Obstáculo",
                                    "Rampa",
                                    "Calçada",
                                    "Outro",
                                ].map((cat) => (
                                    <TouchableOpacity
                                        key={cat}
                                        style={[
                                            styles.catChip,
                                            novaCategoria === cat &&
                                                styles.catChipActive,
                                        ]}
                                        onPress={() => setNovaCategoria(cat)}
                                    >
                                        <Text
                                            style={[
                                                styles.catChipText,
                                                novaCategoria === cat &&
                                                    styles.catChipTextActive,
                                            ]}
                                        >
                                            {cat}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <Text style={styles.formLabel}>
                                Descrição Detalhada
                            </Text>
                            <TextInput
                                style={[
                                    styles.formInput,
                                    { height: 80, textAlignVertical: "top" },
                                ]}
                                placeholder="Descreva o obstáculo encontrado..."
                                placeholderTextColor="#A0AEC0"
                                multiline
                                value={novaDescricao}
                                onChangeText={setNovaDescricao}
                            />

                            <TouchableOpacity
                                style={styles.primaryButton}
                                onPress={handleCriarOcorrencia}
                            >
                                <Text style={styles.primaryButtonText}>
                                    Enviar Ocorrência
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                );

            case "Rotas":
                return (
                    <ScrollView style={styles.fullPane}>
                        <Text style={styles.paneTitle}>
                            Rotas Acessíveis Inteligentes para Pedestres
                        </Text>
                        <Text style={styles.paneSub}>
                            Simulador de rotas exclusivas para pedestres e
                            cadeirantes, evitando barreiras urbanas.
                        </Text>

                        <View style={styles.formCard}>
                            <Text style={styles.formLabel}>
                                Destino Desejado
                            </Text>
                            <TextInput
                                style={styles.formInput}
                                placeholder="Ex: RioMar Recife, Boa Viagem, Marco Zero..."
                                placeholderTextColor="#A0AEC0"
                                value={destinoBusca}
                                onChangeText={setDestinoBusca}
                            />

                            <TouchableOpacity
                                style={[
                                    styles.primaryButton,
                                    { marginTop: 15 },
                                ]}
                                onPress={handleBuscarRotaPedestre}
                            >
                                <Text style={styles.primaryButtonText}>
                                    Traçar Rota a Pé Exclusiva
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                );

            case "Ocorrencias":
                return (
                    <ScrollView style={styles.fullPane}>
                        <Text style={styles.paneTitle}>
                            Gestão de Ocorrências Colaborativas
                        </Text>
                        <Text style={styles.paneSub}>
                            Lista completa de todos os relatos validados pela
                            comunidade.
                        </Text>

                        {reports.map((rep) => (
                            <View key={rep.id} style={styles.ocorrenciaRowCard}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.ocorrenciaTitle}>
                                        {rep.title}
                                    </Text>
                                    <Text style={styles.ocorrenciaMeta}>
                                        Categoria: {rep.category} | Local:{" "}
                                        {rep.location}
                                    </Text>
                                    <Text style={styles.ocorrenciaDesc}>
                                        {rep.description}
                                    </Text>
                                </View>
                                <View
                                    style={{ alignItems: "flex-end", gap: 6 }}
                                >
                                    <View
                                        style={[
                                            styles.miniBadge,
                                            { backgroundColor: "#00A86B" },
                                        ]}
                                    >
                                        <Text style={styles.miniBadgeText}>
                                            {rep.status}
                                        </Text>
                                    </View>
                                    <Text
                                        style={{
                                            fontSize: 10,
                                            color: "#718096",
                                        }}
                                    >
                                        {rep.confirmations} confirmações
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                );

            case "Estatisticas":
                return (
                    <ScrollView style={styles.fullPane}>
                        <Text style={styles.paneTitle}>
                            Painel Estatístico e Governança Urbana
                        </Text>
                        <Text style={styles.paneSub}>
                            Indicadores de prioridade e tempo médio de resolução
                            de problemas.
                        </Text>
                        <View style={styles.formCard}>
                            <Text
                                style={{
                                    fontWeight: "800",
                                    color: "#0B3D91",
                                    fontSize: 14,
                                    marginBottom: 10,
                                }}
                            >
                                Índice de Prioridade de Acessibilidade (IPA)
                            </Text>
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: "#4A5568",
                                    lineHeight: 18,
                                }}
                            >
                                O IPA avalia a gravidade, fluxo de pedestres e
                                proximidade de equipamentos públicos para
                                priorizar a atuação da prefeitura.
                            </Text>
                        </View>
                    </ScrollView>
                );

            case "Gamificacao":
                return (
                    <ScrollView style={styles.fullPane}>
                        <Text style={styles.paneTitle}>
                            Gamificação e Recompensas
                        </Text>
                        <Text style={styles.paneSub}>
                            Sua pontuação por ajudar a transformar a
                            acessibilidade de Recife.
                        </Text>
                        <View style={styles.formCard}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: "800",
                                    color: "#0B3D91",
                                }}
                            >
                                Seu Nível: Colaborador Ativo
                            </Text>
                            <Text
                                style={{
                                    fontSize: 28,
                                    fontWeight: "900",
                                    color: "#FF7A00",
                                    marginVertical: 10,
                                }}
                            >
                                320 pontos acumulados
                            </Text>
                        </View>
                    </ScrollView>
                );

            case "Perfil":
                return (
                    <ScrollView style={styles.fullPane}>
                        <Text style={styles.paneTitle}>Perfil do Usuário</Text>
                        <View style={styles.formCard}>
                            <Text style={styles.formLabel}>Nome Completo</Text>
                            <TextInput
                                style={styles.formInput}
                                defaultValue="Eduardo Luz"
                            />
                            <Text style={styles.formLabel}>E-mail</Text>
                            <TextInput
                                style={styles.formInput}
                                defaultValue="eduardo.luz@email.com"
                            />
                            <TouchableOpacity
                                style={[
                                    styles.primaryButton,
                                    { marginTop: 15 },
                                ]}
                                onPress={() => {
                                    setIsLoggedIn(false);
                                    setStepAuth("email");
                                }}
                            >
                                <Text style={styles.primaryButtonText}>
                                    Sair da Conta (Logout)
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                );

            case "Configuracoes":
                return (
                    <ScrollView style={styles.fullPane}>
                        <Text style={styles.paneTitle}>
                            Configurações do Sistema
                        </Text>
                        <View style={styles.formCard}>
                            <Text style={styles.formLabel}>
                                Idioma da Aplicação
                            </Text>
                            <TextInput
                                style={styles.formInput}
                                defaultValue="Português (Brasil)"
                            />
                        </View>
                    </ScrollView>
                );

            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.sidebar}>
                <View style={styles.logoContainer}>
                    <Image
                        source={logoPrincipal}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.menuList}>
                    {[
                        { id: "Inicio", label: "Início", icon: Home },
                        { id: "Mapa", label: "Mapa", icon: Map },
                        {
                            id: "Registrar",
                            label: "Registrar Problema",
                            icon: AlertTriangle,
                        },
                        { id: "Rotas", label: "Rotas Acessíveis", icon: Route },
                        {
                            id: "Ocorrencias",
                            label: "Ocorrências",
                            icon: FileText,
                        },
                        {
                            id: "Estatisticas",
                            label: "Estatísticas",
                            icon: BarChart2,
                        },
                        {
                            id: "Gamificacao",
                            label: "Gamificação",
                            icon: Award,
                        },
                        { id: "Perfil", label: "Perfil", icon: User },
                        {
                            id: "Configuracoes",
                            label: "Configurações",
                            icon: Settings,
                        },
                    ].map((item) => {
                        const IconComponent = item.icon;
                        const isActive = activeMenu === item.id;
                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={[
                                    styles.menuItem,
                                    isActive && styles.menuItemActive,
                                ]}
                                onPress={() => setActiveMenu(item.id)}
                            >
                                <IconComponent
                                    size={18}
                                    color={isActive ? "#FFFFFF" : "#8A99AD"}
                                />
                                <Text
                                    style={[
                                        styles.menuText,
                                        isActive && styles.menuTextActive,
                                    ]}
                                >
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <View style={styles.userProfileFooter}>
                    <View style={styles.avatarCircle}>
                        <Text style={styles.avatarInitials}>EL</Text>
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>Eduardo Luz</Text>
                        <Text style={styles.userRole}>Nível: Colaborador</Text>
                        <View style={styles.pointsBadge}>
                            <Text style={styles.pointsText}>320 pontos</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.mainWrapper}>
                {/* BARRA SUPERIOR COM BUSCA DE ROTA INTERATIVA PARA PEDESTRES */}
                <View style={styles.topHeader}>
                    <View style={styles.searchContainer}>
                        <Search color="#8A99AD" size={16} />
                        <TextInput
                            placeholder="Para onde você quer ir a pé? (Ex: RioMar)"
                            placeholderTextColor="#8A99AD"
                            style={styles.searchInput}
                            value={destinoBusca}
                            onChangeText={setDestinoBusca}
                            onSubmitEditing={handleBuscarRotaPedestre}
                        />
                        <TouchableOpacity
                            onPress={handleBuscarRotaPedestre}
                            style={styles.searchButtonMini}
                        >
                            <Text style={styles.searchButtonMiniText}>
                                Ir a pé
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity style={styles.iconBadge}>
                            <Bell color="#1F2937" size={20} />
                            <View style={styles.notificationDot}>
                                <Text style={styles.dotText}>3</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.headerAvatar}>
                            <Text style={styles.avatarInitialsDark}>EL</Text>
                        </View>
                    </View>
                </View>

                {renderContent()}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#F0F4F8",
        fontFamily: "sans-serif",
    },

    authWrapper: {
        flex: 1,
        backgroundColor: "#041E42",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    authCard: {
        width: "100%",
        maxWidth: 420,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 30,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    authLogoContainer: { alignItems: "center", marginBottom: 24 },
    authLogoImage: { width: 572, height: 234, resizeMode: "contain" },
    authSubtitle: {
        fontSize: 11,
        fontWeight: "700",
        color: "#718096",
        marginTop: 4,
        letterSpacing: 0.5,
    },
    authForm: { gap: 12 },
    authLabel: { fontSize: 18, fontWeight: "900", color: "#0B3D91" },
    authInstruction: { fontSize: 12, color: "#4A5568", marginBottom: 4 },
    authInput: {
        backgroundColor: "#F7FAFC",
        borderWidth: 1,
        borderColor: "#CBD5E0",
        borderRadius: 10,
        padding: 12,
        fontSize: 13,
        color: "#1F2937",
        outlineStyle: "none",
    },
    authPrimaryButton: {
        backgroundColor: "#FF7A00",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 6,
    },
    authPrimaryButtonText: {
        color: "#FFFFFF",
        fontWeight: "800",
        fontSize: 14,
    },
    dividerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 12,
    },
    dividerLine: { flex: 1, height: 1, backgroundColor: "#E2E8F0" },
    dividerText: {
        marginHorizontal: 10,
        fontSize: 11,
        color: "#A0AEC0",
        fontWeight: "600",
    },
    socialButton: {
        backgroundColor: "#F0F4F8",
        borderWidth: 1,
        borderColor: "#CBD5E0",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
    },
    socialButtonText: { color: "#0B3D91", fontWeight: "700", fontSize: 12 },

    sidebar: {
        width: 250,
        backgroundColor: "#041E42",
        padding: 16,
        justifyContent: "space-between",
    },
    logoContainer: { marginBottom: 20, alignItems: "center" },
    logoImage: { width: 380, height: 100, resizeMode: "contain" },
    menuList: { gap: 4 },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
        gap: 10,
    },
    menuItemActive: { backgroundColor: "#0B3D91" },
    menuText: { fontSize: 13, color: "#8A99AD", fontWeight: "600" },
    menuTextActive: { color: "#FFFFFF", fontWeight: "700" },
    userProfileFooter: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: "#0F2D59",
    },
    avatarCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
    },
    avatarInitials: { color: "#0B3D91", fontWeight: "800", fontSize: 13 },
    userInfo: { flex: 1 },
    userName: { color: "#FFFFFF", fontSize: 12, fontWeight: "700" },
    userRole: { color: "#8A99AD", fontSize: 10 },
    pointsBadge: {
        backgroundColor: "#008D83",
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 10,
        marginTop: 4,
        alignSelf: "flex-start",
    },
    pointsText: { color: "#FFFFFF", fontSize: 9, fontWeight: "800" },

    mainWrapper: { flex: 1, flexDirection: "column" },
    topHeader: {
        height: 60,
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F0F4F8",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        width: 380,
        gap: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 12,
        color: "#1F2937",
        outlineStyle: "none",
    },
    searchButtonMini: {
        backgroundColor: "#00A86B",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
    },
    searchButtonMiniText: { color: "#FFFFFF", fontSize: 11, fontWeight: "800" },

    headerRight: { flexDirection: "row", alignItems: "center", gap: 16 },
    iconBadge: { position: "relative" },
    notificationDot: {
        position: "absolute",
        top: -4,
        right: -4,
        backgroundColor: "#E53E3E",
        borderRadius: 8,
        width: 14,
        height: 14,
        justifyContent: "center",
        alignItems: "center",
    },
    dotText: { color: "#FFFFFF", fontSize: 8, fontWeight: "800" },
    headerAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#E2E8F0",
        justifyContent: "center",
        alignItems: "center",
    },
    avatarInitialsDark: { color: "#0B3D91", fontWeight: "800", fontSize: 11 },

    contentBody: { flex: 1, flexDirection: "row", padding: 16, gap: 16 },
    mapColumn: { flex: 2 },
    mapBox: {
        flex: 1,
        borderRadius: 16,
        overflow: "hidden",
        position: "relative",
        borderWidth: 1,
        borderColor: "#CBD5E0",
        backgroundColor: "#CBD5E0",
    },
    mapFallback: { flex: 1, justifyContent: "center", alignItems: "center" },
    fallbackText: { color: "#4A5568", fontWeight: "700" },

    /* CARTÃO DE NAVEGAÇÃO GPS PARA PEDESTRES */
    gpsNavigationCard: {
        position: "absolute",
        top: 16,
        left: 16,
        right: 16,
        backgroundColor: "#041E42",
        borderRadius: 12,
        padding: 14,
        elevation: 8,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    gpsHeaderRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 4,
    },
    gpsTitle: { flex: 1, color: "#00A86B", fontSize: 13, fontWeight: "900" },
    gpsCloseText: { color: "#A0AEC0", fontSize: 11, fontWeight: "700" },
    gpsDestText: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "700",
        marginBottom: 6,
    },
    gpsMetricsRow: { flexDirection: "row", gap: 10, marginBottom: 8 },
    gpsMetricBadge: {
        backgroundColor: "#0B3D91",
        color: "#FFFFFF",
        fontSize: 10,
        fontWeight: "800",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    gpsInstruction: { color: "#E2E8F0", fontSize: 11, fontStyle: "italic" },

    mapFloatingCard: {
        position: "absolute",
        top: 16,
        left: 16,
        width: 280,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 12,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    cardHeaderRow: { flexDirection: "row", gap: 10 },
    cardThumbPlaceholder: {
        width: 50,
        height: 50,
        backgroundColor: "#CBD5E0",
        borderRadius: 6,
    },
    titleBadgeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    floatingTitle: {
        fontSize: 12,
        fontWeight: "800",
        color: "#0B3D91",
        flex: 1,
    },
    badgeOrange: {
        backgroundColor: "#FF7A00",
        borderRadius: 4,
        paddingHorizontal: 4,
        paddingVertical: 1,
    },
    badgeText: { color: "#FFFFFF", fontSize: 8, fontWeight: "800" },
    floatingCategory: { fontSize: 10, color: "#718096" },
    floatingDesc: { fontSize: 10, color: "#2D3748", marginTop: 2 },
    cardConfirmRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginTop: 8,
    },
    confirmText: { fontSize: 10, fontWeight: "700", color: "#00A86B" },
    timeText: { fontSize: 9, color: "#A0AEC0", marginTop: 2 },
    cardButton: {
        backgroundColor: "#0B3D91",
        paddingVertical: 6,
        borderRadius: 6,
        alignItems: "center",
        marginTop: 10,
    },
    cardButtonText: { color: "#FFFFFF", fontSize: 11, fontWeight: "700" },

    mapControls: { position: "absolute", right: 16, top: "35%", gap: 6 },
    controlBtn: {
        width: 32,
        height: 32,
        backgroundColor: "#FFFFFF",
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
    },

    mapBottomBar: {
        position: "absolute",
        bottom: 12,
        left: 12,
        right: 12,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        padding: 8,
    },
    filterScroll: { flexDirection: "row", alignItems: "center", gap: 12 },
    filterItem: { flexDirection: "row", alignItems: "center", gap: 4 },
    dotFilter: { width: 8, height: 8, borderRadius: 4 },
    filterLabel: { fontSize: 11, color: "#2D3748", fontWeight: "600" },
    toggleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginLeft: "auto",
        borderLeftWidth: 1,
        borderLeftColor: "#E2E8F0",
        paddingLeft: 12,
    },
    toggleLabel: { fontSize: 11, fontWeight: "700", color: "#0B3D91" },
    toggleSwitch: {
        width: 32,
        height: 18,
        borderRadius: 9,
        backgroundColor: "#CBD5E0",
        padding: 2,
    },
    toggleSwitchActive: { backgroundColor: "#00A86B" },
    toggleCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: "#FFFFFF",
    },
    toggleCircleActive: { transform: [{ translateX: 14 }] },

    statsColumn: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: "#CBD5E0",
    },
    statsHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    statsTitle: { fontSize: 14, fontWeight: "800", color: "#0B3D91" },
    locationSelector: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        backgroundColor: "#F0F4F8",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    locationText: { fontSize: 10, fontWeight: "700", color: "#1F2937" },
    cardsRow: { flexDirection: "row", gap: 6, marginBottom: 16 },
    statBox: { flex: 1, padding: 8, borderRadius: 8, alignItems: "center" },
    statVal: { color: "#FFFFFF", fontSize: 14, fontWeight: "900" },
    statSub: {
        color: "#FFFFFF",
        fontSize: 8,
        opacity: 0.9,
        textAlign: "center",
    },
    sectionSubtitle: {
        fontSize: 12,
        fontWeight: "800",
        color: "#0B3D91",
        marginBottom: 8,
    },
    categoryStatsBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 16,
    },
    donutSim: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 10,
        borderColor: "#0B3D91",
        justifyContent: "center",
        alignItems: "center",
    },
    donutHole: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#FFFFFF",
    },
    legendList: { flex: 1, gap: 2 },
    legendRow: { flexDirection: "row", alignItems: "center", gap: 6 },
    legendDot: { width: 6, height: 6, borderRadius: 3 },
    legendLabel: { flex: 1, fontSize: 10, color: "#4A5568" },
    legendVal: { fontSize: 10, fontWeight: "700", color: "#1A202C" },
    dualMiniRow: { flexDirection: "row", gap: 8, marginBottom: 16 },
    miniCard: {
        flex: 1,
        backgroundColor: "#F7FAFC",
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    miniTitle: {
        fontSize: 9,
        fontWeight: "700",
        color: "#4A5568",
        marginBottom: 6,
    },
    scoreGauge: { alignItems: "center" },
    scoreVal: { fontSize: 16, fontWeight: "900", color: "#0B3D91" },
    scoreMax: { fontSize: 9, color: "#A0AEC0" },
    scoreTag: { fontSize: 9, fontWeight: "700", color: "#FF7A00" },
    heatMapThumb: {
        height: 40,
        backgroundColor: "#FEFCBF",
        borderRadius: 4,
        borderStyle: "dashed",
        borderWidth: 1,
        borderColor: "#ECC94B",
    },
    recentHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    seeAllText: { fontSize: 10, fontWeight: "700", color: "#0B3D91" },
    recentItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#EDF2F7",
    },
    recentIconBox: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: "#EBF8FF",
        justifyContent: "center",
        alignItems: "center",
    },
    recentTitle: { fontSize: 10, fontWeight: "700", color: "#2D3748" },
    recentTime: { fontSize: 8, color: "#A0AEC0" },
    miniBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    miniBadgeText: { color: "#FFFFFF", fontSize: 8, fontWeight: "800" },

    fullPane: {
        flex: 1,
        padding: 24,
        backgroundColor: "#FFFFFF",
        margin: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#CBD5E0",
    },
    paneTitle: {
        fontSize: 20,
        fontWeight: "900",
        color: "#0B3D91",
        marginBottom: 6,
    },
    paneSub: { fontSize: 13, color: "#718096", marginBottom: 20 },
    formCard: {
        backgroundColor: "#F7FAFC",
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        gap: 12,
    },
    formLabel: { fontSize: 12, fontWeight: "700", color: "#2D3748" },
    formInput: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#CBD5E0",
        borderRadius: 8,
        padding: 10,
        fontSize: 13,
        color: "#1F2937",
        outlineStyle: "none",
    },
    catPickerRow: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
    catChip: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#CBD5E0",
    },
    catChipActive: { backgroundColor: "#0B3D91", borderColor: "#0B3D91" },
    catChipText: { fontSize: 11, fontWeight: "700", color: "#0B3D91" },
    catChipTextActive: { color: "#FFFFFF" },
    primaryButton: {
        backgroundColor: "#FF7A00",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    primaryButtonText: { color: "#FFFFFF", fontWeight: "800", fontSize: 14 },
    ocorrenciaRowCard: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        padding: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginBottom: 10,
        alignItems: "center",
    },
    ocorrenciaTitle: { fontSize: 13, fontWeight: "800", color: "#0B3D91" },
    ocorrenciaMeta: { fontSize: 10, color: "#718096", marginTop: 2 },
    ocorrenciaDesc: { fontSize: 11, color: "#2D3748", marginTop: 4 },
});

