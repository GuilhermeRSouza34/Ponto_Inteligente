import axios from 'axios';
import { BusLocation, BusRoute } from '../types';

// Dados simulados
const mockRoutes: BusRoute[] = [
    {
        id: '1',
        number: '123',
        name: 'Terminal Central → Shopping',
        stops: [
            { id: '1', name: 'Terminal Central', latitude: -23.550520, longitude: -46.633308 },
            { id: '2', name: 'Ponto 2', latitude: -23.552520, longitude: -46.635308 },
            { id: '3', name: 'Shopping', latitude: -23.555520, longitude: -46.638308 }
        ],
        currentLocation: {
            latitude: -23.551520,
            longitude: -46.634308
        }
    },
    {
        id: '2',
        number: '456',
        name: 'Shopping → Terminal Sul',
        stops: [
            { id: '4', name: 'Shopping', latitude: -23.555520, longitude: -46.638308 },
            { id: '5', name: 'Ponto 5', latitude: -23.557520, longitude: -46.640308 },
            { id: '6', name: 'Terminal Sul', latitude: -23.560520, longitude: -46.642308 }
        ],
        currentLocation: {
            latitude: -23.556520,
            longitude: -46.639308
        }
    }
];

export const busService = {
    getRoutes: async (): Promise<BusRoute[]> => {
        // Simular delay de rede
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockRoutes;
    },

    getRouteById: async (routeId: string): Promise<BusRoute> => {
        const response = await axios.get(`http://your-api-url.com/api/routes/${routeId}`);
        return response.data;
    },

    getBusLocation: async (busId: string): Promise<BusLocation> => {
        // Simular localização aleatória próxima à rota
        const route = mockRoutes.find(r => r.id === busId);
        if (!route?.currentLocation) throw new Error('Ônibus não encontrado');

        return {
            busId,
            latitude: route.currentLocation.latitude + (Math.random() - 0.5) * 0.002,
            longitude: route.currentLocation.longitude + (Math.random() - 0.5) * 0.002,
            timestamp: new Date(),
            speed: 30 + Math.random() * 20
        };
    }
};

export default busService; 