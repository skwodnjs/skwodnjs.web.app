import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

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

const id = new URLSearchParams(location.search).get("id");

const docSnap = await getDoc(doc(db, "growth", id));

if (docSnap.exists()) {
    const data = docSnap.data();

    // 1. 태그
    const typeName = {
        daily: "Daily Note",
        weekly: "Weekly Note",
        monthly: "Monthly Note"
    };
    document.querySelector(".post-tags").innerHTML = `<span class="post-tag">Maplestory</span>
    <span class="tag-separator">·</span>
    <span class="post-tag">${typeName[data.type]}</span>`;

    // 2. 날짜 Timestamp → 문자열
    const date = data.date.toDate();

    const formattedDate =
        `${date.getFullYear()}. ` +
        `${String(date.getMonth() + 1).padStart(2, "0")}. ` +
        `${String(date.getDate()).padStart(2, "0")}.`;

    document.querySelector(".post-date").textContent = formattedDate;

    // 3. 제목
    if (data.type == "daily") {
        document.querySelector(".post-title").textContent = `${date.getFullYear()}년 ` +
            `${String(date.getMonth() + 1).padStart(2, "0")}월 ` +
            `${String(date.getDate()).padStart(2, "0")}일`;
    } else if (data.type == "weekly") {

    } else if (data.type == "monthly") {
        document.querySelector(".post-title").textContent
            = `${date.getFullYear()}. ` + `${String(date.getMonth() + 1).padStart(2, "0")}.`;
    }

    // 4. 내용 Markdown → HTML
    document.querySelector(".post-content").innerHTML =
        marked.parse(data.contents);
}