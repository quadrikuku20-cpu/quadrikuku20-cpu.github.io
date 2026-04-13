// ================= LOADING SCREEN =================

// Wait for full page load
window.addEventListener("load", function () {
    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
        document.getElementById("content").style.display = "block";
    }, 1500); // smooth delay
});


// ================= ROAST FUNCTION =================

// Funny messages for interaction
function roastUser() {
    const roasts = [
        "You clicked this... now go code something 😭",
        "Even your WiFi is faster than your coding speed 😂",
        "Relax small, you're doing well 😄",
        "Future developer loading... please wait ⏳",
        "No bugs? That means you didn’t code enough 😏"
    ];

    let random = Math.floor(Math.random() * roasts.length);

    showToast(roasts[random]);
}


// ================= TOAST NOTIFICATION =================

// Create popup notification instead of alert
function showToast(message) {
    let toast = document.createElement("div");
    toast.innerText = message;

    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.background = "#020617";
    toast.style.color = "white";
    toast.style.padding = "12px 20px";
    toast.style.borderRadius = "10px";
    toast.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
    toast.style.zIndex = "1000";

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}


// ================= MINI GAME (UPGRADED) =================

let score = 0;
let highScore = 0;

const button = document.getElementById("gameBtn");

if (button) {

    // Move button randomly
    button.addEventListener("mouseover", function () {
        moveButton();
    });

    // Increase score when clicked
    button.addEventListener("click", function () {
        score++;
        document.getElementById("score").innerText = "Score: " + score;

        if (score > highScore) {
            highScore = score;
        }

        showToast("Nice! Score: " + score);
    });
}

// Function to move button randomly
function moveButton() {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);

    button.style.position = "absolute";
    button.style.left = x + "px";
    button.style.top = y + "px";
}


// ================= EXCUSE GENERATOR =================

function generateExcuse() {
    const excuses = [
        "My laptop froze during submission 😭",
        "Internet disconnected at the worst time 😩",
        "I was debugging for hours!",
        "Power went off unexpectedly ⚡",
        "I mistakenly deleted my work 😭"
    ];

    let random = Math.floor(Math.random() * excuses.length);

    document.getElementById("excuse").innerText = excuses[random];
}


// ================= LIKE BUTTON =================

let likes = 0;

function likeWebsite() {
    likes++;
    document.getElementById("likeCount").innerText = "Likes: " + likes;

    showToast("Thanks for liking! 👍");
}


// ================= SCROLL ANIMATION =================

// Reveal sections when scrolling
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    sections.forEach(section => {
        const position = section.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (position < screenHeight - 100) {
            section.style.opacity = "1";
            section.style.transform = "translateY(0)";
        }
    });
});