import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome6, FontAwesome, Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../Context/AuthContext';

import Home from '../Pages/Home';
import Busca from '../Pages/Busca';
import Profile from '../Pages/Profile';
import Login from '../Pages/Login';


const Tab = createBottomTabNavigator();

export default function Rotas() {
  const { logado, theme } = useContext(AuthContext); // Obtendo logado e theme do contexto

  if (!logado) {
    return <Login />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: theme.background }, // Cor de fundo da barra de navegação
          tabBarLabelStyle: { display: 'none' }, // Ocultando rótulos das abas
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? 'home' : 'home-outline'} // Ícone completo ou contorno para não selecionado
                size={size}
                color={focused ? theme.primary : theme.text} // Cor do ícone baseado no foco e no tema
              />
            ),
          }}
        />
        <Tab.Screen
          name="Busca"
          component={Busca}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <FontAwesome
                name={focused ? 'search' : 'search'} // Ícone completo ou alternativo para não selecionado
                size={size}
                color={focused ? theme.primary : theme.text} // Cor do ícone baseado no foco e no tema
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <FontAwesome
                name={focused ? 'user-circle' : 'user-circle-o'} // Ícone completo ou contorno para não selecionado
                size={size}
                color={focused ? theme.primary : theme.text} // Cor do ícone baseado no foco e no tema
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
