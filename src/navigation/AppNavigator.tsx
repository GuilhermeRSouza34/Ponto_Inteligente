import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { HomeScreen } from '../screens/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { RouteDetailsScreen } from '../screens/RouteDetailsScreen';
import { SearchScreen } from '../screens/SearchScreen';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen 
              name="Login" 
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Register" 
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen 
              name="Home" 
              component={HomeScreen}
              options={{ title: 'Ponto de Ônibus Inteligente' }}
            />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{ title: 'Buscar Linha' }}
            />
            <Stack.Screen
              name="RouteDetails"
              component={RouteDetailsScreen}
              options={{ title: 'Detalhes da Linha' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 