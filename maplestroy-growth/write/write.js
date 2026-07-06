import { initializeApp } from "firebase-app.js";
import { getFirestore } from "firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAXmqUbF6QDlMXDv924wo7N9oGOEKwruWY",
    authDomain: "skwodnjs.firebaseapp.com",
    projectId: "skwodnjs",
    storageBucket: "skwodnjs.firebasestorage.app",
    messagingSenderId: "577027722735",
    appId: "1:577027722735:web:691e51d602cec69f3e7a1a",
    measurementId: "G-26GC0ZQQ7R"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();


const textarea = document.querySelector(".post-input-content");
const typeSelect = document.querySelector(".post-type");
const dateInput = document.getElementById("post-date");

async function loadTemplate(type) {
    const res = await fetch(`${type}.md`, {
        cache: "no-store"
    });

    textarea.value = await res.text();
}

// 최초 로드
loadTemplate(typeSelect.value);

// 변경 시
typeSelect.addEventListener("change", () => {
    loadTemplate(typeSelect.value);
});

const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0");
const dd = String(today.getDate()).padStart(2, "0");
dateInput.value = `${yyyy}. ${mm}. ${dd}.`;


const submitBtn = document.querySelector(".post-submit-btn");

let currentUser = null;

onAuthStateChanged(auth, (user) => {
    currentUser = user;
});

submitBtn.addEventListener("click", () => {
    if (!currentUser) {
        alert("로그인 후 제출할 수 있습니다.");
        return;
    }

    // 여기서 제출 처리
});