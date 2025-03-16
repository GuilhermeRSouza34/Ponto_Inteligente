import React, { useState } from 'react';
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../contexts/AuthContext';
import { colors } from '../theme/colors';

export const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { signIn } = useAuth();

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        try {
            await signIn(email, password);
        } catch (error) {
            Alert.alert('Erro', 'Email ou senha incorretos');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image 
                    source={require('../assets/logo.png')} 
                    style={styles.logo}
                />
                <Text style={styles.title}>Ponto de Ônibus{'\n'}Inteligente</Text>
                <Text style={styles.subtitle}>
                    Acompanhe seu ônibus em tempo real
                </Text>
            </View>

            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Icon name="email" size={20} color={colors.gray[500]} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        placeholderTextColor={colors.gray[500]}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="lock" size={20} color={colors.gray[500]} />
                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        placeholderTextColor={colors.gray[500]}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Icon 
                            name={showPassword ? "visibility" : "visibility-off"} 
                            size={20} 
                            color={colors.gray[500]} 
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    style={styles.forgotPassword}
                    onPress={() => navigation.navigate('ForgotPassword')}
                >
                    <Text style={styles.forgotPasswordText}>
                        Esqueceu sua senha?
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.loginButton}
                    onPress={handleLogin}
                >
                    <Text style={styles.loginButtonText}>Entrar</Text>
                </TouchableOpacity>

                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>
                        Ainda não tem uma conta?
                    </Text>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={styles.registerLink}>Cadastre-se</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    header: {
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 40,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.primary,
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: colors.gray[500],
        textAlign: 'center',
    },
    form: {
        padding: 24,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.gray[50],
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: colors.gray[200],
    },
    input: {
        flex: 1,
        height: 50,
        marginLeft: 12,
        fontSize: 16,
        color: colors.gray[900],
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotPasswordText: {
        color: colors.primary,
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: colors.primary,
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    loginButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerText: {
        color: colors.gray[500],
        fontSize: 14,
    },
    registerLink: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 4,
    },
}); 