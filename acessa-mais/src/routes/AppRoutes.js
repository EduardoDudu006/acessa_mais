import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Map, PlusCircle, User } from "lucide-react-native";

import MapaScreen from "../screens/MapaScreen";
import RegistrarScreen from "../screens/RegistrarScreen";
import ContribuicoesScreen from "../screens/ContribuicoesScreen";

const Tab = createBottomTabNavigator();

export default function AppRoutes() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#FF7A00",
                tabBarInactiveTintColor: "#FFFFFF",
                tabBarStyle: {
                    backgroundColor: "#0B3D91",
                    borderTopWidth: 0,
                    height: 60,
                    paddingBottom: 8,
                },
            }}
        >
            <Tab.Screen
                name="Início"
                component={MapaScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Home color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Mapa"
                component={MapaScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Map color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Registrar"
                component={RegistrarScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <PlusCircle color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={ContribuicoesScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <User color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
