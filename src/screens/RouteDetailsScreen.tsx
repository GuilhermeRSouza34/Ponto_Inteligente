import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { busService } from '../services/api';
import socketService from '../services/socket';
import { BusLocation, BusRoute } from '../types';

export const RouteDetailsScreen = ({ route }: any) => {
    const busRoute: BusRoute = route.params.route;
    const [busLocation, setBusLocation] = useState<BusLocation | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBusLocation = async () => {
            try {
                const location = await busService.getBusLocation(busRoute.id);
                setBusLocation(location);
            } catch (error) {
                console.error('Erro ao carregar localização:', error);
            } finally {
                setLoading(false);
            }
        };

        loadBusLocation();

        // Inscrever para atualizações em tempo real
        socketService.subscribeToBusUpdates(busRoute.id, (location) => {
            setBusLocation(location);
        });

        return () => {
            socketService.unsubscribeFromBusUpdates(busRoute.id);
        };
    }, [busRoute.id]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.routeNumber}>Linha {busRoute.number}</Text>
                <Text style={styles.routeName}>{busRoute.name}</Text>
                {busLocation && (
                    <Text style={styles.eta}>
                        Chegada prevista: {new Date(busLocation.timestamp).toLocaleTimeString()}
                    </Text>
                )}
            </View>

            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: busRoute.stops[0].latitude,
                    longitude: busRoute.stops[0].longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {busLocation && (
                    <Marker
                        coordinate={{
                            latitude: busLocation.latitude,
                            longitude: busLocation.longitude,
                        }}
                        title={`Ônibus ${busRoute.number}`}
                        description={`Velocidade: ${busLocation.speed} km/h`}
                    />
                )}

                {busRoute.stops.map((stop, index) => (
                    <Marker
                        key={stop.id}
                        coordinate={{
                            latitude: stop.latitude,
                            longitude: stop.longitude,
                        }}
                        title={stop.name}
                        pinColor="#4CAF50"
                    />
                ))}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContainer: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    routeNumber: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    routeName: {
        fontSize: 16,
        color: '#666',
        marginTop: 4,
    },
    eta: {
        fontSize: 14,
        color: '#007AFF',
        marginTop: 8,
    },
    map: {
        flex: 1,
    },
}); 