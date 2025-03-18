import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './contexts/AuthContext';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </AuthProvider>
  );
};

export default App;