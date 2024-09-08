// Import Firebase functions from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9y0yvTAkO27Eb5mSbnMgdtERTcLobOK4",
  authDomain: "tttt-f12ab.firebaseapp.com",
  projectId: "tttt-f12ab",
  storageBucket: "tttt-f12ab.appspot.com",
  messagingSenderId: "924584368751",
  appId: "1:924584368751:web:0291eb52018bf492a3cb9a",
  measurementId: "G-26QZ6HJ18R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
  // Sign Up
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          alert('User signed up successfully!');
          window.location.href = 'login.html';
        })
        .catch((error) => {
          alert('Error: ' + error.message);
        });
    });
  }

  // Log In
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          alert('User logged in successfully!');
          window.location.href = 'game.html';
        })
        .catch((error) => {
          alert('Error: ' + error.message);
        });
    });
  }

  // Logout
  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      signOut(auth)
        .then(() => {
          alert('User logged out!');
          window.location.href = 'index.html';
        })
        .catch((error) => {
          alert('Error: ' + error.message);
        });
    });
  }
});