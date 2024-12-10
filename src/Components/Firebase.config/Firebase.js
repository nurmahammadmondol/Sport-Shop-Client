// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyANFi6m-oOiBylpyyGvpjcQVUHgrUE0QP8',
  authDomain: 'proplayaccessories-46e6a.firebaseapp.com',
  projectId: 'proplayaccessories-46e6a',
  storageBucket: 'proplayaccessories-46e6a.firebasestorage.app',
  messagingSenderId: '380789007490',
  appId: '1:380789007490:web:82133f949c21454619009b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
