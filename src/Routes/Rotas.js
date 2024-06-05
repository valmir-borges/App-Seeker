import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome6, FontAwesome, Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { AuthContext } from '../Context/AuthContext';

const Tab = createBottomTabNavigator();

import Home from '../Pages/Home'
import Busca from '../Pages/Busca'
import Login from '../Pages/Login'
import Profile from '../Pages/Profile';
import Create from '../Pages/Create';
import Videos from '../Pages/Videos';

export default function Rotas(){

  const {logado} = useContext(AuthContext)//Pegando a const logado do contexto

  if(logado == false){
    return(
      <Login/>
    )
  }
  return(
    <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {backgroundColor: '#F3EFE4'},
            tabBarLabelStyle: {display: 'none'},
          }}
        >
        <Tab.Screen initialRouteName='Home'
          name="Home" 
          component={Home} 
          options={{
              headerShown: false,
              tabBarIcon: (tabInfo) => {
                  return (<Ionicons
                  name="home"
                  size={28}
                  color={tabInfo.focused ? "#4654A3" : "#FFF"}
                  />)
              }
          }}
          />
          <Tab.Screen 
            name="Busca" 
            component={Busca}
            options={{
                headerShown: false,
                tabBarIcon: (tabInfo) => {
                    return (<FontAwesome6
                    name="magnifying-glass"
                    size={28}
                    color={tabInfo.focused ? "#4654A3" : "#FFF"}
                />)
                }
            }}
            />
            <Tab.Screen 
            name="Create" 
            component={Create}
            options={{
                headerShown: false,
                tabBarIcon: (tabInfo) => {
                    return (<MaterialIcons 
                    name="add-box"
                    size={28}
                    color={tabInfo.focused ? "#4654A3" : "#FFF"}
                />)
                }
            }}
            />
            <Tab.Screen 
            name="Videos" 
            component={Videos}
            options={{
                headerShown: false,
                tabBarIcon: (tabInfo) => {
                    return (<MaterialIcons 
                      name="smart-display"
                    size={28}
                    color={tabInfo.focused ? "#4654A3" : "#FFF"}
                />)
                }
            }}
            />
          <Tab.Screen 
            name="Profile" 
            component={Profile}
            options={{
                headerShown: false,
                tabBarIcon: (tabInfo) => {
                    return (<FontAwesome
                    name="user-circle"
                    size={28}
                    color={tabInfo.focused ? "#4654A3" : "#FFF"}
                />)
                }
            }}
            />
        </Tab.Navigator>
    </NavigationContainer>
  );
}