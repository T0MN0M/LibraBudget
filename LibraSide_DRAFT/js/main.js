document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
  }

  // Highlight the current page in the nav
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    if (a.getAttribute("href") === current) a.classList.add("active");
  });

  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Starfield background on the landing page
  const canvas = document.getElementById("stars");
  if (canvas) initStars(canvas);

  // Contact form (placeholder — no backend yet)
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = document.getElementById("form-message");
      msg.textContent = `Thanks, ${form.name.value || "friend"}! Your message has been received. (Demo only — not actually sent.)`;
      msg.classList.add("show");
      form.reset();
    });
  }

  // Docs sidebar: highlight the section in view
  const docLinks = document.querySelectorAll(".docs-sidebar a");
  if (docLinks.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            docLinks.forEach((l) =>
              l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id)
            );
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    document.querySelectorAll(".docs-content section").forEach((s) => observer.observe(s));
  }
});

function initStars(canvas) {
  const ctx = canvas.getContext("2d");
  let stars = [];

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.3 + 0.05,
      alpha: Math.random(),
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of stars) {
      s.y -= s.speed;
      if (s.y < 0) s.y = canvas.height;
      s.alpha += (Math.random() - 0.5) * 0.05;
      s.alpha = Math.min(1, Math.max(0.2, s.alpha));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();
}
