declare module 'react-native-web';
declare module 'react-native-vector-icons/MaterialIcons';
declare module 'react-native-web-maps' {
  import { Component } from 'react';
  interface MapViewProps {
    style?: any;
    initialRegion?: {
      latitude: number;
      longitude: number;
      latitudeDelta: number;
      longitudeDelta: number;
    };
    region?: {
      latitude: number;
      longitude: number;
      latitudeDelta: number;
      longitudeDelta: number;
    };
    onRegionChange?: (region: any) => void;
    children?: React.ReactNode;
  }

  interface MarkerProps {
    coordinate: {
      latitude: number;
      longitude: number;
    };
    title?: string;
    description?: string;
    onPress?: () => void;
  }

  interface PolylineProps {
    coordinates: Array<{
      latitude: number;
      longitude: number;
    }>;
    strokeColor?: string;
    strokeWidth?: number;
  }

  export class Marker extends Component<MarkerProps> {}
  export class Polyline extends Component<PolylineProps> {}
  export class MapView extends Component<MapViewProps> {}
}
declare module '*.png';
declare module '*.jpg';
declare module '*.svg';
declare module 'react-native-screens';
declare module 'react-native-safe-area-context';
declare module 'react-native-gesture-handler';