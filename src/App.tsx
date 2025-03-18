import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { BusProvider, useBus } from './contexts/BusContext';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapComponent: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const sãoPauloPosition: [number, number] = [-23.5505, -46.6333];
  const { buses, selectedBus, setSelectedBus } = useBus();

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        padding: '1rem',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <input
          type="text"
          placeholder="Buscar localização..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <MapContainer
          center={sãoPauloPosition}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {buses.map((bus) => (
            <Marker 
              key={bus.id} 
              position={[bus.currentLocation.latitude, bus.currentLocation.longitude]}
              eventHandlers={{
                click: () => setSelectedBus(bus)
              }}
            >
              <Popup>
                <div>
                  <h3>{bus.name}</h3>
                  <p>Linha: {bus.number}</p>
                  {selectedBus?.id === bus.id && (
                    <div>
                      <h4>Paradas:</h4>
                      <ul>
                        {bus.stops.map(stop => (
                          <li key={stop.id}>{stop.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BusProvider>
      <MapComponent />
    </BusProvider>
  );
};

export default App;