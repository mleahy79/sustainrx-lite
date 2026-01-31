import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";

const firebaseConfig = {
   apiKey: "AIzaSyAjSSQfXQ7iGMBTIcWn1N6fXbhYdAGaf6w",
  authDomain: "sustainrx-lite.firebaseapp.com",
  projectId: "sustainrx-lite",
  storageBucket: "sustainrx-lite.firebasestorage.app",
  messagingSenderId: "284547704508",
  appId: "1:284547704508:web:a2ecdf1e6ce1fc6c11d2b9",
  measurementId: "G-C0L3PZ7NDM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const githubProvider = new GithubAuthProvider();
export const functions = getFunctions(app);

// Request additional GitHub scopes for repo access
githubProvider.addScope("read:user");
githubProvider.addScope("repo");

// Claude chat function
export const chatWithClaude = async (message, repoContext = null) => {
  const chatFunction = httpsCallable(functions, "chat");
  const result = await chatFunction({ message, repoContext });
  return result.data.response;
};

