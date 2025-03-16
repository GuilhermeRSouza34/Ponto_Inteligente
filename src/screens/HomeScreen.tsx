import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { busService } from '../services/api';
import socketService from '../services/socket';
import { colors } from '../theme/colors';
import { BusRoute } from '../types';

const { width } = Dimensions.get('window');

type HomeScreenProps = {
    navigation: NativeStackNavigationProp<any>;
};

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
    const mapRef = useRef<MapView | null>(null);
    const [search, setSearch] = useState('');
    const [routes, setRoutes] = useState<BusRoute[]>([]);
    const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadInitialRoutes();
        socketService.connect();

        return () => {
            socketService.disconnect();
        };
    }, []);

    const loadInitialRoutes = async () => {
        try {
            const data = await busService.getRoutes();
            setRoutes(data);
        } catch (error) {
            console.error('Erro ao carregar rotas:', error);
        }
    };

    const handleSearch = async () => {
        if (search.trim() === '') return;
        
        setLoading(true);
        try {
            const data = await busService.getRoutes();
            const filtered = data.filter(route => 
                route.number.includes(search) || 
                route.name.toLowerCase().includes(search.toLowerCase())
            );
            setRoutes(filtered);
            
            if (filtered.length > 0) {
                setSelectedRoute(filtered[0]);
                // Centralizar mapa na rota selecionada
                mapRef.current?.animateToRegion({
                    latitude: filtered[0].stops[0].latitude,
                    longitude: filtered[0].stops[0].longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
            }
        } catch (error) {
            console.error('Erro na busca:', error);
        } finally {
            setLoading(false);
        }
    };

    const getRouteColor = (congestion: number) => {
        if (congestion > 0.7) return colors.danger;
        if (congestion > 0.4) return colors.primaryLight;
        return colors.success;
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Icon name="search" size={24} color={colors.gray[500]} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar linha ou destino"
                        value={search}
                        onChangeText={setSearch}
                        onSubmitEditing={handleSearch}
                        placeholderTextColor={colors.gray[500]}
                    />
                    {search.length > 0 && (
                        <TouchableOpacity onPress={() => setSearch('')}>
                            <Icon name="close" size={24} color={colors.gray[500]} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: -23.550520,
                    longitude: -46.633308,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {routes.map(route => (
                    <React.Fragment key={route.id}>
                        {route.currentLocation && (
                            <Marker
                                coordinate={{
                                    latitude: route.currentLocation.latitude,
                                    longitude: route.currentLocation.longitude,
                                }}
                                title={`Linha ${route.number}`}
                                description={route.name}
                            >
                                <View style={styles.busMarker}>
                                    <Icon name="directions-bus" size={20} color={colors.white} />
                                </View>
                            </Marker>
                        )}
                        
                        {selectedRoute?.id === route.id && route.stops.length > 1 && (
                            <Polyline
                                coordinates={route.stops.map(stop => ({
                                    latitude: stop.latitude,
                                    longitude: stop.longitude,
                                }))}
                                strokeWidth={4}
                                strokeColor={getRouteColor(Math.random())} // Simulando congestionamento
                            />
                        )}
                    </React.Fragment>
                ))}
            </MapView>

            {selectedRoute && (
                <View style={styles.routeInfo}>
                    <Text style={styles.routeNumber}>Linha {selectedRoute.number}</Text>
                    <Text style={styles.routeName}>{selectedRoute.name}</Text>
                    <Text style={styles.eta}>
                        Chegada prevista: {new Date().toLocaleTimeString()}
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    searchContainer: {
        position: 'absolute',
        top: 16,
        left: 16,
        right: 16,
        zIndex: 1,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
        color: colors.gray[900],
    },
    map: {
        flex: 1,
    },
    busMarker: {
        backgroundColor: colors.primary,
        padding: 8,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.white,
    },
    routeInfo: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.white,
        padding: 16,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    routeNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.gray[900],
    },
    routeName: {
        fontSize: 16,
        color: colors.gray[700],
        marginTop: 4,
    },
    eta: {
        fontSize: 14,
        color: colors.primary,
        marginTop: 8,
        fontWeight: '500',
    },
}); 