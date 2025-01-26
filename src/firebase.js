// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Your Firebase configuration object (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyD3Y4BM_MgRT3KZ9IB1MbXKHNHvZAIVr0o",
  authDomain: "project-bell-pepper.firebaseapp.com",
  databaseURL: "https://project-bell-pepper-default-rtdb.firebaseio.com",
  projectId: "project-bell-pepper",
  storageBucket: "project-bell-pepper.firebasestorage.app",
  messagingSenderId: "163215728534",
  appId: "1:163215728534:web:d5a0a52ca6965ddb1e47b7"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Realtime Database reference
const database = getDatabase(app);

export { database };
