// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyC38c2W0FG8fZtfYjc43OZydhKJdp81rtM",
  authDomain: "directorist-app.firebaseapp.com",
  projectId: "directorist-app",
  storageBucket: "directorist-app.appspot.com",
  messagingSenderId: "186094694628",
  appId: "1:186094694628:web:a6b5534e5337b0e3e3bcf1",
  measurementId: "G-TBH8082L7P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Send Notifications
sendNotifications();

// Send Notifications
async function sendNotifications()  {
    const data = {
        title: 'Test Notification From Web 6',
        body: 'This is a test notification from web',
        topic: 'test',
        data: JSON.stringify({
            notificationType: 'message',
            message: 'The full message',
            userID: 1,
        }),
        date_created: '2021-08-30 10:51:16',
    };

    try {
        const docRef = await addDoc(collection(db, "notifications"), data);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}