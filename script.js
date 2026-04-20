// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {

    // ================= LOADING SCREEN =================
    window.addEventListener("load", () => {
        const loader = document.getElementById("loader");
        const content = document.getElementById("content");

        setTimeout(() => {
            if (loader) loader.style.display = "none";
            if (content) content.style.display = "block";
        }, 1000);
    });

    // ================= TOAST FUNCTION =================
    function showToast(message) {
        const toast = document.createElement("div");
        toast.innerText = message;

        Object.assign(toast.style, {
            position: "fixed",
            bottom: "20px",
            right: "20px",
            background: "#020617",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "10px",
            zIndex: "1000",
            boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
        });

        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2500);
    }

    // ================= ROAST FEATURE =================
    window.roastUser = function () {
        const roasts = [
            "You clicked this... now go code something 😭",
            "Even your WiFi is faster than your coding speed 😂",
            "Relax, you're improving… slowly 😄",
            "Future developer loading... still loading ⏳",
            "No bugs? That just means you didn’t code enough 😏",
            "Your code runs... only in imagination 💀",
            "My code was working… then I showed someone 😭",
            "I renamed one variable and everything collapsed 💀",
            "My laptop updated itself at the worst time 😭",
            "I wrote the code… it just doesn’t want to run 😩",
            "My code and I are no longer on speaking terms 💀",
            "I clicked run and prayed… nothing happened 😭",
            "It worked perfectly in my head 😭",

        ];

        showToast(roasts[Math.floor(Math.random() * roasts.length)]);
    };

    // ================= MINI GAME =================
    let score = 0;
    let highScore = 0;

    const gameBtn = document.getElementById("gameBtn");
    const scoreDisplay = document.getElementById("score");

    if (gameBtn) {
        const moveButton = () => {
            const btnWidth = gameBtn.offsetWidth;
            const btnHeight = gameBtn.offsetHeight;

            // Visible viewport (not full page)
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // Safe margins so it doesn’t stick to edges
            const margin = 10;

            const maxX = viewportWidth - btnWidth - margin;
            const maxY = viewportHeight - btnHeight - margin;

            const x = Math.random() * maxX;
            const y = Math.random() * maxY;

            gameBtn.style.left = `${x}px`;
            gameBtn.style.top = `${y}px`;
        };

        gameBtn.addEventListener("mouseover", moveButton);
        gameBtn.addEventListener("touchstart", moveButton);

        gameBtn.addEventListener("click", () => {
            score++;
            if (scoreDisplay) scoreDisplay.innerText = `Score: ${score}`;
            if (score > highScore) highScore = score;

            showToast(`🔥 Score: ${score}`);
            moveButton();
        });
        gameBtn.addEventListener("mouseenter", moveButton);

        moveButton();
    }

    // ================= EXCUSE GENERATOR =================
    window.generateExcuse = function () {
        const excuses = [
            "My laptop froze right when I clicked submit 😭",
            "The internet saw my assignment and gave up 💀",
            "I was debugging… turns out I was the bug 😭",
            "Power went off and came back with attitude ⚡",
            "I followed the tutorial… mine came out different 😭",
            "My code said ‘access denied’ to success 💀",
            "I copied the code correctly… I think 😭",
            "The deadline got closer and my motivation got farther 💀",
            "My code only works when no one is watching 😭",
            "I debugged for 3 hours… it was a missing semicolon 💀",
            "My code compiled… but my confidence didn’t 😭",
            "I blame the keyboard 😤",
        ];

        const excuseText = document.getElementById("excuse");
        if (excuseText) {
            excuseText.innerText = excuses[Math.floor(Math.random() * excuses.length)];
            excuseText.style.transform = "scale(1.1)";
            setTimeout(() => excuseText.style.transform = "scale(1)", 200);
        }
    };

    // ================= LIKE BUTTON =================
    let likes = 0;

    window.likeWebsite = function () {
        likes++;
        const likeCount = document.getElementById("likeCount");
        if (likeCount) likeCount.innerText = `Likes: ${likes}`;
        showToast("Thanks for liking! 👍");
    };

    // ================= SCROLL ANIMATION =================
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        sections.forEach(section => {
            const position = section.getBoundingClientRect().top;
            if (position < window.innerHeight - 100) {
                section.style.opacity = "1";
                section.style.transform = "translateY(0)";
            }
        });
    });

    // ================= CONTACT FORM =================
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const data = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: "POST",
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    status.textContent = "✅ Message sent successfully!";
                    status.style.color = "green";

                    form.reset();

                    // 🔥 Refresh page after short delay
                    setTimeout(() => {
                        location.reload();
                    }, 1500);

                } else {
                    status.textContent = "❌ Failed to send message.";
                    status.style.color = "red";
                }

            } catch (error) {
                status.textContent = "❌ Network error.";
                status.style.color = "red";
            }
        });
    }

});