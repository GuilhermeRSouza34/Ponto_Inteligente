import React, { useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { busService } from '../services/api';
import { BusRoute } from '../types';

export const SearchScreen = ({ navigation }: any) => {
    const [search, setSearch] = useState('');
    const [routes, setRoutes] = useState<BusRoute[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (search.trim() === '') return;
        
        setLoading(true);
        try {
            const data = await busService.getRoutes();
            // Filtrar rotas pelo número ou nome
            const filtered = data.filter(route => 
                route.number.includes(search) || 
                route.name.toLowerCase().includes(search.toLowerCase())
            );
            setRoutes(filtered);
        } catch (error) {
            console.error('Erro na busca:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderRoute = ({ item }: { item: BusRoute }) => (
        <TouchableOpacity 
            style={styles.routeItem}
            onPress={() => navigation.navigate('RouteDetails', { route: item })}
        >
            <Text style={styles.routeNumber}>Linha {item.number}</Text>
            <Text style={styles.routeName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Digite o número da linha ou destino"
                    value={search}
                    onChangeText={setSearch}
                    onSubmitEditing={handleSearch}
                />
                <TouchableOpacity 
                    style={styles.searchButton}
                    onPress={handleSearch}
                >
                    <Text style={styles.searchButtonText}>Buscar</Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#007AFF" />
            ) : (
                <FlatList
                    data={routes}
                    renderItem={renderRoute}
                    keyExtractor={item => item.id}
                    style={styles.list}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchContainer: {
        padding: 16,
        flexDirection: 'row',
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginRight: 8,
    },
    searchButton: {
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    searchButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    list: {
        flex: 1,
    },
    routeItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    routeNumber: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    routeName: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
}); 