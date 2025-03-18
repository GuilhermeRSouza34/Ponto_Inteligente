import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MapView from 'react-native-web-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../theme/colors';

const { width, height } = Dimensions.get('window');

export const MapScreen = () => {
  const mapRef = useRef<MapView | null>(null);
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log('Searching for:', search);
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={24} color={colors.gray[500]} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a location"
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

      {/* Map View */}
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: -23.550520,  // São Paulo coordinates
          longitude: -46.633308,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
        showsMyLocationButton
        showsCompass
        showsScale
      />

      {/* Zoom Controls */}
      <View style={styles.zoomControls}>
        <TouchableOpacity
          style={styles.zoomButton}
          onPress={() => mapRef.current?.animateToRegion({
            ...mapRef.current?.getRegion(),
            latitudeDelta: (mapRef.current?.getRegion().latitudeDelta || 0) * 0.5,
            longitudeDelta: (mapRef.current?.getRegion().longitudeDelta || 0) * 0.5,
          })}
        >
          <Icon name="add" size={24} color={colors.gray[800]} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.zoomButton}
          onPress={() => mapRef.current?.animateToRegion({
            ...mapRef.current?.getRegion(),
            latitudeDelta: (mapRef.current?.getRegion().latitudeDelta || 0) * 2,
            longitudeDelta: (mapRef.current?.getRegion().longitudeDelta || 0) * 2,
          })}
        >
          <Icon name="remove" size={24} color={colors.gray[800]} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
  },
  searchContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: colors.gray[800],
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  zoomControls: {
    position: 'absolute',
    right: 16,
    bottom: 100,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  zoomButton: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});