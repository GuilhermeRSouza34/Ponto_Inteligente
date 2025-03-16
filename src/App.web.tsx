import { StyleSheet, Text, View } from 'react-native';
import { colors } from './theme/colors';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ponto de Ônibus Inteligente</Text>
      <Text style={styles.subtitle}>Bem-vindo!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray[500],
  },
});

export default App; 