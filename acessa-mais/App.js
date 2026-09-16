import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Platform } from 'react-native';
import {
  Home, Map, AlertTriangle, Route, FileText, BarChart2,
  Award, User, Settings, Search, Bell, Plus, Minus, Target,
  Layers, Check, ChevronDown, Accessibility, Droplets, Footprints
} from 'lucide-react-native';

export default function App() {
  const [activeMenu, setActiveMenu] = useState('Inicio');
  const [rotasAcessiveis, setRotasAcessiveis] = useState(true);

  return (
    <View style={styles.container}>

      {/* COLUNA 1: SIDEBAR LATERAL (ESQUERDA) */}
      <View style={styles.sidebar}>
        {/* LOGOTIPO EXACTO DA IMAGEM */}
        <View style={styles.logoContainer}>
          <View style={styles.logoBadge}>
            <Accessibility color="#FFFFFF" size={18} />
            <View style={styles.logoPinDot} />
          </View>
          <Text style={styles.logoText}>
            ACESSA<Text style={styles.logoPlus}>+</Text>
          </Text>
        </View>

        {/* MENU DE NAVEGAÇÃO */}
        <View style={styles.menuList}>
          {[
            { id: 'Inicio', label: 'Início', icon: Home },
            { id: 'Mapa', label: 'Mapa', icon: Map },
            { id: 'Registrar', label: 'Registrar Problema', icon: AlertTriangle },
            { id: 'Rotas', label: 'Rotas Acessíveis', icon: Route },
            { id: 'Ocorrencias', label: 'Ocorrências', icon: FileText },
            { id: 'Estatisticas', label: 'Estatísticas', icon: BarChart2 },
            { id: 'Gamificacao', label: 'Gamificação', icon: Award },
            { id: 'Perfil', label: 'Perfil', icon: User },
            { id: 'Configuracoes', label: 'Configurações', icon: Settings },
          ].map((item) => {
            const IconComponent = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.menuItem, isActive && styles.menuItemActive]}
                onPress={() => setActiveMenu(item.id)}
              >
                <IconComponent size={18} color={isActive ? '#FFFFFF' : '#8A99AD'} />
                <Text style={[styles.menuText, isActive && styles.menuTextActive]}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* PERFIL DO USUÁRIO NO RODAPÉ DA SIDEBAR */}
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

      {/* ÁREA PRINCIPAL (MAPA CENTRAL + PAINEL DIREITO) */}
      <View style={styles.mainWrapper}>

        {/* BARRA SUPERIOR DE BUSCA E NOTIFICAÇÕES */}
        <View style={styles.topHeader}>
          <View style={styles.searchContainer}>
            <Search color="#8A99AD" size={16} />
            <TextInput
              placeholder="Para onde você quer ir?"
              placeholderTextColor="#8A99AD"
              style={styles.searchInput}
            />
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconBadge}>
              <Bell color="#1F2937" size={20} />
              <View style={styles.notificationDot}><Text style={styles.dotText}>3</Text></View>
            </TouchableOpacity>
            <View style={styles.headerAvatar}>
              <Text style={styles.avatarInitialsDark}>EL</Text>
            </View>
          </View>
        </View>

        {/* CONTEÚDO DIVIDIDO EM 2 COLUNAS */}
        <View style={styles.contentBody}>

          {/* COLUNA 2: MAPA INTERATIVO CENTRAL */}
          <View style={styles.mapColumn}>
            <View style={styles.mapBox}>
              {/* MAPA EM TEMPO REAL (OPENSTREETMAP / LEAFLET) */}
              {Platform.OS === 'web' ? (
                <iframe
                  title="Mapa Recife Acessível"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  src="https://maps.google.com/maps?q=-8.05428,-34.8813&z=15&output=embed"
                />
              ) : (
                <View style={styles.mapFallback}><Text style={styles.fallbackText}>Mapa Recife em Tempo Real</Text></View>
              )}

              {/* CARD FLUTUANTE DE DETALHES NO MAPA */}
              <View style={styles.mapFloatingCard}>
                <View style={styles.cardHeaderRow}>
                  <View style={styles.cardThumbPlaceholder} />
                  <View style={{ flex: 1 }}>
                    <View style={styles.titleBadgeRow}>
                      <Text style={styles.floatingTitle}>Desnível na calçada</Text>
                      <View style={styles.badgeOrange}><Text style={styles.badgeText}>Alta</Text></View>
                    </View>
                    <Text style={styles.floatingCategory}>Calçada</Text>
                    <Text style={styles.floatingDesc}>Desnível severo na calçada em frente ao comércio.</Text>
                  </View>
                </View>

                <View style={styles.cardConfirmRow}>
                  <Check size={14} color="#00A86B" />
                  <Text style={styles.confirmText}>Confirmado por 8 pessoas</Text>
                </View>
                <Text style={styles.timeText}>Última confirmação: há 2 dias</Text>

                <View style={styles.icoProgressRow}>
                  <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: '78%' }]} />
                  </View>
                  <Text style={styles.icoText}>ICO 78%</Text>
                </View>

                <TouchableOpacity style={styles.cardButton}>
                  <Text style={styles.cardButtonText}>Ver detalhes</Text>
                </TouchableOpacity>
              </View>

              {/* CONTROLES FLUTUANTES DO MAPA (DIREITA) */}
              <View style={styles.mapControls}>
                <TouchableOpacity style={styles.controlBtn}><Plus size={16} color="#1F2937" /></TouchableOpacity>
                <TouchableOpacity style={styles.controlBtn}><Minus size={16} color="#1F2937" /></TouchableOpacity>
                <TouchableOpacity style={styles.controlBtn}><Target size={16} color="#1F2937" /></TouchableOpacity>
                <TouchableOpacity style={styles.controlBtn}><Layers size={16} color="#1F2937" /></TouchableOpacity>
              </View>

              {/* BARRA INFERIOR DE LEGENDA E FILTROS */}
              <View style={styles.mapBottomBar}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                  <View style={styles.filterItem}><View style={[styles.dotFilter, { backgroundColor: '#00A86B' }]} /><Text style={styles.filterLabel}>Calçadas</Text></View>
                  <View style={styles.filterItem}><View style={[styles.dotFilter, { backgroundColor: '#0B3D91' }]} /><Text style={styles.filterLabel}>Acessibilidade</Text></View>
                  <View style={styles.filterItem}><View style={[styles.dotFilter, { backgroundColor: '#FF7A00' }]} /><Text style={styles.filterLabel}>Travessias</Text></View>
                  <View style={styles.filterItem}><View style={[styles.dotFilter, { backgroundColor: '#E53E3E' }]} /><Text style={styles.filterLabel}>Obstáculos</Text></View>
                  <View style={styles.filterItem}><View style={[styles.dotFilter, { backgroundColor: '#3182CE' }]} /><Text style={styles.filterLabel}>Drenagem</Text></View>
                  <View style={styles.filterItem}><View style={[styles.dotFilter, { backgroundColor: '#718096' }]} /><Text style={styles.filterLabel}>Outros</Text></View>

                  <View style={styles.toggleContainer}>
                    <Text style={styles.toggleLabel}>Rotas acessíveis</Text>
                    <TouchableOpacity
                      style={[styles.toggleSwitch, rotasAcessiveis && styles.toggleSwitchActive]}
                      onPress={() => setRotasAcessiveis(!rotasAcessiveis)}
                    >
                      <View style={[styles.toggleCircle, rotasAcessiveis && styles.toggleCircleActive]} />
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>

          {/* COLUNA 3: PAINEL DE RESUMO DA CIDADE E ESTATÍSTICAS (DIREITA) */}
          <ScrollView style={styles.statsColumn} showsVerticalScrollIndicator={false}>

            {/* CABEÇALHO RESUMO */}
            <View style={styles.statsHeader}>
              <Text style={styles.statsTitle}>Resumo da Cidade</Text>
              <View style={styles.locationSelector}>
                <Text style={styles.locationText}>Recife - PE</Text>
                <ChevronDown size={14} color="#1F2937" />
              </View>
            </View>

            {/* CARDS DE NÚMEROS */}
            <View style={styles.cardsRow}>
              <View style={[styles.statBox, { backgroundColor: '#0B3D91' }]}>
                <Text style={styles.statVal}>1.452</Text>
                <Text style={styles.statSub}>Total de ocorrências</Text>
              </View>
              <View style={[styles.statBox, { backgroundColor: '#00A86B' }]}>
                <Text style={styles.statVal}>987</Text>
                <Text style={styles.statSub}>Resolvidas</Text>
              </View>
              <View style={[styles.statBox, { backgroundColor: '#FF7A00' }]}>
                <Text style={styles.statVal}>465</Text>
                <Text style={styles.statSub}>Pendentes</Text>
              </View>
            </View>

            {/* CATEGORIAS (GRÁFICO SIMULADO) */}
            <Text style={styles.sectionSubtitle}>Por categoria</Text>
            <View style={styles.categoryStatsBox}>
              <View style={styles.donutSim}>
                <View style={styles.donutHole} />
              </View>
              <View style={styles.legendList}>
                {[
                  { label: 'Calçadas', val: '32%', color: '#0B3D91' },
                  { label: 'Acessibilidade', val: '24%', color: '#00A86B' },
                  { label: 'Travessias', val: '16%', color: '#FF7A00' },
                  { label: 'Obstáculos', val: '12%', color: '#E53E3E' },
                  { label: 'Drenagem', val: '9%', color: '#3182CE' },
                  { label: 'Outros', val: '7%', color: '#718096' },
                ].map((c, i) => (
                  <View key={i} style={styles.legendRow}>
                    <View style={[styles.legendDot, { backgroundColor: c.color }]} />
                    <Text style={styles.legendLabel}>{c.label}</Text>
                    <Text style={styles.legendVal}>{c.val}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* ÍNDICE E MINI MAPA DE CALOR */}
            <View style={styles.dualMiniRow}>
              <View style={styles.miniCard}>
                <Text style={styles.miniTitle}>Índice de Acessibilidade</Text>
                <View style={styles.scoreGauge}>
                  <Text style={styles.scoreVal}>56<Text style={styles.scoreMax}>/100</Text></Text>
                  <Text style={styles.scoreTag}>Regular</Text>
                </View>
              </View>

              <View style={styles.miniCard}>
                <Text style={styles.miniTitle}>Mapa de Calor</Text>
                <View style={styles.heatMapThumb} />
              </View>
            </View>

            {/* ÚLTIMAS OCORRÊNCIAS */}
            <View style={styles.recentHeader}>
              <Text style={styles.sectionSubtitle}>Últimas ocorrências</Text>
              <Text style={styles.seeAllText}>Ver todas</Text>
            </View>

            {[
              { title: 'Buraco na calçada - Boa Viagem', time: 'Há 2 horas', severity: 'Alta', color: '#FF7A00' },
              { title: 'Faixa de pedestres apagada - Casa Forte', time: 'Há 4 horas', severity: 'Média', color: '#ECC94B' },
              { title: 'Rampa inadequada - Graças', time: 'Há 6 horas', severity: 'Alta', color: '#FF7A00' },
            ].map((o, idx) => (
              <View key={idx} style={styles.recentItem}>
                <View style={styles.recentIconBox}>
                  <AlertTriangle size={16} color="#0B3D91" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.recentTitle}>{o.title}</Text>
                  <Text style={styles.recentTime}>{o.time}</Text>
                </View>
                <View style={[styles.miniBadge, { backgroundColor: o.color }]}>
                  <Text style={styles.miniBadgeText}>{o.severity}</Text>
                </View>
              </View>
            ))}

          </ScrollView>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#F0F4F8', fontFamily: 'sans-serif' },

  /* SIDEBAR ESQUERDA */
  sidebar: { width: 220, backgroundColor: '#041E42', padding: 16, justifyContent: 'space-between' },
  logoContainer: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 24 },
  logoBadge: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#00A86B', justifyContent: 'center', alignItems: 'center', position: 'relative' },
  logoPinDot: { position: 'absolute', top: 2, right: 2, width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF7A00' },
  logoText: { fontSize: 20, fontWeight: '900', color: '#FFFFFF', letterSpacing: -0.5 },
  logoPlus: { color: '#FF7A00' },
  menuList: { gap: 4 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, gap: 10 },
  menuItemActive: { backgroundColor: '#0B3D91' },
  menuText: { fontSize: 13, color: '#8A99AD', fontWeight: '600' },
  menuTextActive: { color: '#FFFFFF', fontWeight: '700' },
  userProfileFooter: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#0F2D59' },
  avatarCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  avatarInitials: { color: '#0B3D91', fontWeight: '800', fontSize: 13 },
  userInfo: { flex: 1 },
  userName: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  userRole: { color: '#8A99AD', fontSize: 10 },
  pointsBadge: { backgroundColor: '#008D83', paddingVertical: 2, paddingHorizontal: 6, borderRadius: 10, marginTop: 4, alignSelf: 'flex-start' },
  pointsText: { color: '#FFFFFF', fontSize: 9, fontWeight: '800' },

  /* ÁREA PRINCIPAL */
  mainWrapper: { flex: 1, flexDirection: 'column' },
  topHeader: { height: 60, backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F4F8', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, width: 320, gap: 8 },
  searchInput: { flex: 1, fontSize: 12, color: '#1F2937', outlineStyle: 'none' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  iconBadge: { position: 'relative' },
  notificationDot: { position: 'absolute', top: -4, right: -4, backgroundColor: '#E53E3E', borderRadius: 8, width: 14, height: 14, justifyContent: 'center', alignItems: 'center' },
  dotText: { color: '#FFFFFF', fontSize: 8, fontWeight: '800' },
  headerAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#E2E8F0', justifyContent: 'center', alignItems: 'center' },
  avatarInitialsDark: { color: '#0B3D91', fontWeight: '800', fontSize: 11 },

  /* CONTEÚDO */
  contentBody: { flex: 1, flexDirection: 'row', padding: 16, gap: 16 },
  mapColumn: { flex: 2 },
  mapBox: { flex: 1, borderRadius: 16, overflow: 'hidden', position: 'relative', borderWidth: 1, borderColor: '#CBD5E0' },
  mapFallback: { flex: 1, backgroundColor: '#CBD5E0', justifyContent: 'center', alignItems: 'center' },
  fallbackText: { color: '#4A5568', fontWeight: '700' },

  /* CARD FLUTUANTE MAPA */
  mapFloatingCard: { position: 'absolute', top: 16, left: 16, width: 280, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 12, elevation: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8 },
  cardHeaderRow: { flexDirection: 'row', gap: 10 },
  cardThumbPlaceholder: { width: 50, height: 50, backgroundColor: '#CBD5E0', borderRadius: 6 },
  titleBadgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  floatingTitle: { fontSize: 12, fontWeight: '800', color: '#0B3D91', flex: 1 },
  badgeOrange: { backgroundColor: '#FF7A00', borderRadius: 4, paddingHorizontal: 4, paddingVertical: 1 },
  badgeText: { color: '#FFFFFF', fontSize: 8, fontWeight: '800' },
  floatingCategory: { fontSize: 10, color: '#718096' },
  floatingDesc: { fontSize: 10, color: '#2D3748', marginTop: 2 },
  cardConfirmRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8 },
  confirmText: { fontSize: 10, fontWeight: '700', color: '#00A86B' },
  timeText: { fontSize: 9, color: '#A0AEC0', marginTop: 2 },
  icoProgressRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  progressBarBg: { flex: 1, height: 6, backgroundColor: '#E2E8F0', borderRadius: 3, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#00A86B' },
  icoText: { fontSize: 9, fontWeight: '800', color: '#00A86B' },
  cardButton: { backgroundColor: '#0B3D91', paddingVertical: 6, borderRadius: 6, alignItems: 'center', marginTop: 10 },
  cardButtonText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },

  /* CONTROLES MAPA */
  mapControls: { position: 'absolute', right: 16, top: '35%', gap: 6 },
  controlBtn: { width: 32, height: 32, backgroundColor: '#FFFFFF', borderRadius: 6, justifyContent: 'center', alignItems: 'center', elevation: 3 },

  /* LEGENDA INFERIOR MAPA */
  mapBottomBar: { position: 'absolute', bottom: 12, left: 12, right: 12, backgroundColor: '#FFFFFF', borderRadius: 10, padding: 8 },
  filterScroll: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  filterItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  dotFilter: { width: 8, height: 8, borderRadius: 4 },
  filterLabel: { fontSize: 11, color: '#2D3748', fontWeight: '600' },
  toggleContainer: { flexDirection: 'row', alignItems: 'center', gap: 6, marginLeft: 'auto', borderLeftWidth: 1, borderLeftColor: '#E2E8F0', paddingLeft: 12 },
  toggleLabel: { fontSize: 11, fontWeight: '700', color: '#0B3D91' },
  toggleSwitch: { width: 32, height: 18, borderRadius: 9, backgroundColor: '#CBD5E0', padding: 2 },
  toggleSwitchActive: { backgroundColor: '#00A86B' },
  toggleCircle: { width: 14, height: 14, borderRadius: 7, backgroundColor: '#FFFFFF' },
  toggleCircleActive: { transform: [{ translateX: 14 }] },

  /* COLUNA ESTATÍSTICAS */
  statsColumn: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#CBD5E0' },
  statsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  statsTitle: { fontSize: 14, fontWeight: '800', color: '#0B3D91' },
  locationSelector: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#F0F4F8', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  locationText: { fontSize: 10, fontWeight: '700', color: '#1F2937' },
  cardsRow: { flexDirection: 'row', gap: 6, marginBottom: 16 },
  statBox: { flex: 1, padding: 8, borderRadius: 8, alignItems: 'center' },
  statVal: { color: '#FFFFFF', fontSize: 14, fontWeight: '900' },
  statSub: { color: '#FFFFFF', fontSize: 8, opacity: 0.9, textAlign: 'center' },
  sectionSubtitle: { fontSize: 12, fontWeight: '800', color: '#0B3D91', marginBottom: 8 },
  categoryStatsBox: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  donutSim: { width: 70, height: 70, borderRadius: 35, borderWidth: 10, borderColor: '#0B3D91', justifyContent: 'center', alignItems: 'center' },
  donutHole: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#FFFFFF' },
  legendList: { flex: 1, gap: 2 },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 6, height: 6, borderRadius: 3 },
  legendLabel: { flex: 1, fontSize: 10, color: '#4A5568' },
  legendVal: { fontSize: 10, fontWeight: '700', color: '#1A202C' },
  dualMiniRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  miniCard: { flex: 1, backgroundColor: '#F7FAFC', padding: 8, borderRadius: 8, borderWidth: 1, borderColor: '#E2E8F0' },
  miniTitle: { fontSize: 9, fontWeight: '700', color: '#4A5568', marginBottom: 6 },
  scoreGauge: { alignItems: 'center' },
  scoreVal: { fontSize: 16, fontWeight: '900', color: '#0B3D91' },
  scoreMax: { fontSize: 9, color: '#A0AEC0' },
  scoreTag: { fontSize: 9, fontWeight: '700', color: '#FF7A00' },
  heatMapThumb: { height: 40, backgroundColor: '#FEFCBF', borderRadius: 4, borderStyle: 'dashed', borderWidth: 1, borderColor: '#ECC94B' },
  recentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  seeAllText: { fontSize: 10, fontWeight: '700', color: '#0B3D91' },
  recentItem: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#EDF2F7' },
  recentIconBox: { width: 26, height: 26, borderRadius: 13, backgroundColor: '#EBF8FF', justifyContent: 'center', alignItems: 'center' },
  recentTitle: { fontSize: 10, fontWeight: '700', color: '#2D3748' },
  recentTime: { fontSize: 8, color: '#A0AEC0' },
  miniBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  miniBadgeText: { color: '#FFFFFF', fontSize: 8, fontWeight: '800' },
});
