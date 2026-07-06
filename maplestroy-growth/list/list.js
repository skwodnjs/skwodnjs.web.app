import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, where, orderBy } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

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


const type = new URL(location.href).searchParams.get("type");

const title = document.querySelector(".title");
const desc = document.querySelector(".desc");
title.textContent = type == "daily" ? "일일 정산" : type == "weekly" ? "주간 정산" : type == "monthly" ? "월간 정산" : "";
desc.textContent = type == "daily" ? "일일 기록을 확인합니다." : type == "weekly" ? "주간 기록을 확인합니다." : type == "monthly" ? "월간 기록을 확인합니다." : "";


const q = query(
    collection(db, "growth"),
    where("type", "==", type),
    orderBy("date", "desc")
);

const snapshot = await getDocs(q);


const listGrid = document.querySelector(".list-grid");

function getWeekOfMonth(date) {
    // 이번 주의 목요일
    const thursday = new Date(date);
    thursday.setDate(date.getDate() + (4 - (date.getDay() || 7)));

    // 그 목요일이 속한 달의 첫날
    const firstDay = new Date(thursday.getFullYear(), thursday.getMonth(), 1);

    // 첫 번째 목요일
    const firstThursday = new Date(firstDay);
    firstThursday.setDate(
        1 + ((4 - (firstDay.getDay() || 7) + 7) % 7)
    );

    return Math.floor((thursday - firstThursday) / (7 * 24 * 60 * 60 * 1000)) + 1;
}

snapshot.forEach((doc) => {
    const data = doc.data();

    const date = data.date.toDate();

    let title;

    const weekNames = ["", "첫", "둘", "셋", "넷", "다섯"];
    if (type == "daily") {
        title =
            `${date.getFullYear()}년 ` +
            `${String(date.getMonth() + 1).padStart(2, "0")}월 ` +
            `${String(date.getDate()).padStart(2, "0")}일`;
    } else if (type == "weekly") {
        title =
            `${date.getFullYear()}` + "년 " +
            `${String(date.getMonth() + 1).padStart(2, "0")}` + "월 " +
            `${weekNames[getWeekOfMonth(date)]}째 주`;
    } else if (type == "monthly") {
        title =
            `${date.getFullYear()}` + "년 " +
            `${String(date.getMonth() + 1).padStart(2, "0")}` + "월"
    }

    const a = document.createElement("a");
    a.className = "list-button";
    a.href = `/maplestroy-growth/post/?id=${doc.id}`;

    a.innerHTML = `
        <span class="button-kicker">MAPLESTORY</span>
        <strong>${title}</strong>
    `;

    listGrid.appendChild(a);
});