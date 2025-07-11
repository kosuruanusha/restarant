const text = "Play. Win. Repeat – The Ultimate Fantasy & Casino Experience!";
let i = 0;
(function typeText() {
  const el = document.getElementById("typing-text");
  if (el && i < text.length) {
    el.innerHTML += text.charAt(i++);
    setTimeout(typeText, 50);
  }
})();

const dropdownMap = new Map([
  ["sportsToggle", "sportsDropdown"],
  ["matchesToggle", "matchesDropdown"],
  ["walletIcon", "walletDropdown"],
  ["profileIcon", "profileDropdown"]
]);

function toggleDropdown(id) {
  document.querySelectorAll(".dropdown-content").forEach(el => {
    el.style.display = (el.id === id && el.style.display !== "block") ? "block" : "none";
  });
}

dropdownMap.forEach((dropdownId, triggerId) => {
  const trigger = document.getElementById(triggerId);
  if (trigger) {
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDropdown(dropdownId);
    });
  }
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown, .drop-link, .icon")) {
    document.querySelectorAll(".dropdown-content").forEach(el => el.style.display = "none");
  }
});


window.onscroll = () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (scrollTop / scrollHeight) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
};

function debounce(fn, delay = 100) {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(fn, delay);
  };
}

function animateVisible() {
  document.querySelectorAll(".animate__animated").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
      el.classList.add("animate__fadeIn");
    }
  });
}
window.addEventListener("scroll", debounce(animateVisible));


document.querySelectorAll(".tabs button").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tabs button").forEach(btn => btn.classList.remove("active"));
    tab.classList.add("active");
  });
});

function setupCarouselScroll(carouselId, leftClass, rightClass) {
  const carousel = document.getElementById(carouselId);
  const leftBtn = document.querySelector(leftClass);
  const rightBtn = document.querySelector(rightClass);
  if (!carousel || !leftBtn || !rightBtn) return;

  const scrollAmount = 300;
  leftBtn.addEventListener("click", () => carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" }));
  rightBtn.addEventListener("click", () => carousel.scrollBy({ left: scrollAmount, behavior: "smooth" }));
}

document.addEventListener("DOMContentLoaded", () => {
  setupCarouselScroll("gameCarouselAlt", ".left-alt", ".right-alt");
  setupCarouselScroll("gameCarousel3", ".casino-section:nth-of-type(3) .left", ".casino-section:nth-of-type(3) .right");
});
document.querySelectorAll(".game-card").forEach(card => {
  card.setAttribute("tabindex", "0");
});
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate__fadeInUp");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".game-card").forEach(card => observer.observe(card));
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target?.scrollIntoView({ behavior: "smooth" });
  });
});
setInterval(() => {
  document.querySelectorAll(".live-badge i").forEach(el => el.classList.toggle("pulse"));
}, 2000);
document.querySelector(".subscribe-box button")?.addEventListener("click", () => {
  const input = document.querySelector(".subscribe-box input");
  const email = input?.value.trim();
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  alert(isValid ? "Thank you for subscribing!" : "Please enter a valid email address.");
  if (isValid) input.value = "";
});
function setupCarouselScroll(containerId, leftBtnSelector, rightBtnSelector) {
  const container = document.getElementById(containerId);
  const leftBtn = document.querySelector(leftBtnSelector);
  const rightBtn = document.querySelector(rightBtnSelector);

  if (container && leftBtn && rightBtn) {
    leftBtn.addEventListener('click', () => {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    });

    rightBtn.addEventListener('click', () => {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setupCarouselScroll("gameCarouselAlt", ".left-alt", ".right-alt");
  setupCarouselScroll("gameCarousel3", ".left", ".right");
});
document.addEventListener("DOMContentLoaded", function () {
});
const fetchBtn = document.getElementById("fetchLiveMatch");
const liveInfo = document.querySelector(".live-info");
const outputBox = document.getElementById("liveMatchDetails");

const liveData = `
  <div class="live-match-card">
    <h4>Live Match: India vs Australia</h4>
    <p><strong>Score:</strong> IND 176/5 (20 ov)</p>
    <p><strong>Status:</strong> India won by 9 runs</p>
    <p><strong>Time:</strong> July 8, 2025 | Final</p>
    <p><strong>Venue:</strong> Eden Gardens, Kolkata</p>
    <div class="video-box">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/YqKYpgZ9FWU?si=NgWs03Vh7QbKjeOG" 
      title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; 
      clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
  </div>
`;


function showMatch() {
  outputBox.innerHTML = liveData;
  outputBox.scrollIntoView({ behavior: "smooth" });
}

if (fetchBtn) fetchBtn.addEventListener("click", showMatch);
if (liveInfo) liveInfo.addEventListener("click", showMatch);
