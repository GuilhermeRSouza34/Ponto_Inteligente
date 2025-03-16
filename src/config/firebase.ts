import { initializeApp } from '@react-native-firebase/app';

const firebaseConfig = {
    apiKey: "seu-api-key",
    authDomain: "seu-auth-domain",
    projectId: "seu-project-id",
    storageBucket: "seu-storage-bucket",
    messagingSenderId: "seu-sender-id",
    appId: "seu-app-id"
};

export const initFirebase = () => {
    initializeApp(firebaseConfig);
}; 