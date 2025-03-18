import React, { createContext, useContext, useState, useEffect } from 'react';
import SocketService from '../services/socket';

interface Bus {
    id: string;
    number: string;
    name: string;
    currentLocation: {
        latitude: number;
        longitude: number;
    };
    stops: {
        id: string;
        name: string;
        latitude: number;
        longitude: number;
    }[];
}

interface BusContextType {
    buses: Bus[];
    selectedBus: Bus | null;
    setSelectedBus: (bus: Bus | null) => void;
}

const BusContext = createContext<BusContextType | undefined>(undefined);

export const BusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [buses, setBuses] = useState<Bus[]>([]);
    const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
    const socketService = SocketService.getInstance();

    useEffect(() => {
        // Fetch initial bus routes
        fetch('http://localhost:3000/api/routes')
            .then(response => response.json())
            .then(data => {
                setBuses(data);
                // Subscribe to location updates for each bus
                data.forEach((bus: Bus) => {
                    socketService.subscribeToBusLocation(bus.id, (location) => {
                        setBuses(prevBuses => prevBuses.map(prevBus => {
                            if (prevBus.id === location.busId) {
                                return {
                                    ...prevBus,
                                    currentLocation: {
                                        latitude: location.latitude,
                                        longitude: location.longitude
                                    }
                                };
                            }
                            return prevBus;
                        }));
                    });
                });
            });

        return () => {
            // Cleanup subscriptions
            buses.forEach(bus => {
                socketService.unsubscribeFromBusLocation(bus.id);
            });
            socketService.disconnect();
        };
    }, []);

    return (
        <BusContext.Provider value={{ buses, selectedBus, setSelectedBus }}>
            {children}
        </BusContext.Provider>
    );
};

export const useBus = () => {
    const context = useContext(BusContext);
    if (context === undefined) {
        throw new Error('useBus must be used within a BusProvider');
    }
    return context;
};