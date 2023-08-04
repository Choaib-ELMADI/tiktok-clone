import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: "AIzaSyCVVw7ulyu6ee73m5EQtH6m4D6DATrnask",
	authDomain: "tiklok-videos.firebaseapp.com",
	projectId: "tiklok-videos",
	storageBucket: "tiklok-videos.appspot.com",
	messagingSenderId: "261748371283",
	appId: "1:261748371283:web:4bf159b203c6bbdfa47ba6",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
