const giftBtn = document.getElementById("giftBtn");
const yay = document.getElementById("yay");
const revealBtn = document.getElementById("revealBtn");
const finalMsg = document.getElementById("finalMsg");
const customizeBtn = document.getElementById("customizeBtn");
const customizeBox = document.getElementById("customizeBox");
const customMsg = document.getElementById("customMsg");
const copyBtn = document.getElementById("copyBtn");
const copied = document.getElementById("copied");
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiPieces = [];
const shapes = ["square", "circle", "emoji"];
const emojis = ["✨","❤️","🎉","🌟","💎"];

function ConfettiPiece() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height - canvas.height;
  this.size = Math.random() * 10 + 6;
  this.speed = Math.random() * 3 + 2;
  this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  this.shape = shapes[Math.floor(Math.random() * shapes.length)];
  this.emoji = emojis[Math.floor(Math.random() * emojis.length)];
}

ConfettiPiece.prototype.update = function () {
  this.y += this.speed;
  if (this.y > canvas.height) {
    this.y = -10;
    this.x = Math.random() * canvas.width;
  }
};

ConfettiPiece.prototype.draw = function () {
  if (this.shape === "square") {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  } else if (this.shape === "circle") {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size/2, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();
  } else {
    ctx.font = `${this.size*2}px serif`;
    ctx.fillText(this.emoji, this.x, this.y);
  }
};

function createConfetti() {
  for (let i = 0; i < 150; i++) {
    confettiPieces.push(new ConfettiPiece());
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiPieces.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateConfetti);
}

const urlParam = new URLSearchParams(window.location.search);
let customText = urlParam.get("msg");
if (!customText) {
  customText = "💖 You are beautiful, strong, <br>and you've got this! 💖";
} else {
  customText = decodeURIComponent(customText);
}

giftBtn.addEventListener("click", () => {
  giftBtn.style.display = "none";
  yay.classList.remove("hidden");
  revealBtn.classList.remove("hidden");
});

revealBtn.addEventListener("click", () => {
  revealBtn.style.display = "none";
  finalMsg.innerHTML = customText;
  finalMsg.classList.remove("hidden");
  setTimeout(() => finalMsg.classList.add("show"), 100);
  createConfetti();
  animateConfetti();
  customizeBtn.classList.remove("hidden");
  bgMusic.play().catch(() => {});
  musicToggle.classList.remove("hidden");
  musicToggle.innerText = "🔊 Pause";
});

musicToggle.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.innerText = "🔊 Pause";
  } else {
    bgMusic.pause();
    musicToggle.innerText = "🎶 Play";
  }
});

customizeBtn.addEventListener("click", () => {
  customizeBox.classList.remove("hidden");
  customMsg.value = finalMsg.innerText;
});

copyBtn.addEventListener("click", () => {
  const baseUrl = window.location.origin + window.location.pathname;
  const encodedMsg = encodeURIComponent(customMsg.value);
  const fullLink = `${baseUrl}?msg=${encodedMsg}`;
  navigator.clipboard.writeText(fullLink);
  copied.classList.remove("hidden");
});

const shareWhatsApp = document.getElementById("shareWhatsApp");
const shareTwitter = document.getElementById("shareTwitter");

shareWhatsApp.addEventListener("click", () => {
  const baseUrl = window.location.origin + window.location.pathname;
  const encodedMsg = encodeURIComponent(customMsg.value);
  const fullLink = `${baseUrl}?msg=${encodedMsg}`;

  // Detect mobile
  const isMobile = /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    // Open WhatsApp app
    window.location.href = `whatsapp://send?text=${fullLink}`;
  } else {
    // Open WhatsApp Web
    window.open(`https://wa.me/?text=${fullLink}`, "_blank");
  }
});


shareTwitter.addEventListener("click", () => {
  const baseUrl = window.location.origin + window.location.pathname;
  const encodedMsg = encodeURIComponent(customMsg.value);
  const fullLink = `${baseUrl}?msg=${encodedMsg}`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${fullLink}`;
  window.open(tweetUrl, "_blank");
});


window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
