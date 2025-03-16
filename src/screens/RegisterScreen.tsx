import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../contexts/AuthContext';
import { colors } from '../theme/colors';

export const RegisterScreen = ({ navigation }: any) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { signUp } = useAuth();

    const handleRegister = async () => {
        if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem');
            return;
        }

        try {
            await signUp(email, password, name);
            Alert.alert('Sucesso', 'Conta criada com sucesso!');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível criar sua conta');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Icon name="arrow-back" size={24} color={colors.gray[900]} />
            </TouchableOpacity>

            <Text style={styles.title}>Criar Conta</Text>
            <Text style={styles.subtitle}>
                Preencha seus dados para começar
            </Text>

            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Icon name="person" size={20} color={colors.gray[500]} />
                    <TextInput
                        style={styles.input}
                        placeholder="Nome completo"
                        value={name}
                        onChangeText={setName}
                        placeholderTextColor={colors.gray[500]}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="email" size={20} color={colors.gray[500]} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
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
                        secureTextEntry
                        placeholderTextColor={colors.gray[500]}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="lock" size={20} color={colors.gray[500]} />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirmar senha"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        placeholderTextColor={colors.gray[500]}
                    />
                </View>

                <TouchableOpacity 
                    style={styles.registerButton}
                    onPress={handleRegister}
                >
                    <Text style={styles.registerButtonText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 24,
    },
    backButton: {
        marginBottom: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.gray[900],
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: colors.gray[500],
        marginBottom: 32,
    },
    form: {
        gap: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.gray[50],
        borderRadius: 12,
        paddingHorizontal: 16,
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
    registerButton: {
        backgroundColor: colors.primary,
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
    },
    registerButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
}); 