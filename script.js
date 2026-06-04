/* ==========================================================================
   PORTFOLIO INTERACTIVITY — Afnan Uddin (BCS377 Project 1)
   --------------------------------------------------------------------------
   Each feature is its own commented block:
     1. Mobile navigation toggle (hamburger)
     2. Light / dark theme toggle (remembers your choice)
     3. Scrollspy — highlights the nav link for the section you're viewing
     4. Scroll-reveal — fades sections in as they enter the viewport
     5. Project filter — show/hide cards by category
     6. Contact form — validation + user feedback
     7. Footer year (small touch so the © year is never stale)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- 1. MOBILE NAV TOGGLE ---------- */
  const navToggle = document.getElementById("navToggle");
  const navMenu   = document.getElementById("navMenu");

  function openMenu() {
    navMenu.classList.add("is-open");
    navToggle.classList.add("is-open");
    document.body.classList.add("menu-open");
    document.documentElement.classList.add("menu-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close navigation menu");
  }

  function closeMenu() {
    navMenu.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    document.documentElement.classList.remove("menu-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation menu");
  }

  navToggle.addEventListener("click", () => {
    navMenu.classList.contains("is-open") ? closeMenu() : openMenu();
  });

  navMenu.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.querySelector(".nav__brand").addEventListener("click", closeMenu);


  /* ---------- 2. THEME TOGGLE (light / dark) ---------- */
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement; // the <html> element

  // Try to restore a saved choice; if storage is blocked, just skip it.
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) { /* storage unavailable */ }
  if (saved === "dark") applyTheme("dark");

  themeToggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
  });

  function applyTheme(mode) {
    if (mode === "dark") {
      root.setAttribute("data-theme", "dark");
      themeToggle.setAttribute("aria-label", "Switch to light theme");
    } else {
      root.removeAttribute("data-theme");
      themeToggle.setAttribute("aria-label", "Switch to dark theme");
    }
  }


  /* ---------- 3. SCROLLSPY (active nav link) ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav__link");

  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle("is-current", link.getAttribute("href") === "#" + id);
        });
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" }); // fires when a section is near the middle

  sections.forEach((section) => spy.observe(section));


  /* ---------- 4. SCROLL-REVEAL ANIMATION ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // animate once, then stop watching
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach((el) => revealObserver.observe(el));


  /* ---------- 5. PROJECT FILTER ---------- */
  const filterBtns = document.querySelectorAll(".filter__btn");
  const cards = document.querySelectorAll("#projectGrid .card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // move the active style to the clicked button
      filterBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const filter = btn.dataset.filter;
      cards.forEach((card) => {
        const show = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });


  /* ---------- 6. CONTACT FORM (validation + feedback) ---------- */
  const USE_FORMSPREE = true;

  const form   = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // we handle validation ourselves first
    status.textContent = "";
    status.className = "form__status";

    if (!validateForm()) return; // stop if any field is invalid

    if (USE_FORMSPREE) {
      // Real submission path — sends to the Formspree endpoint in the form's action.
      try {
        const res = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          succeed();
        } else {
          fail("Something went wrong — please email me directly.");
        }
      } catch (err) {
        fail("Network error — please email me directly.");
      }
    } else {
      succeed();
    }
  });

  function succeed() {
    form.reset();
    status.textContent = "Thanks! Your message has been sent. I'll get back to you soon.";
    status.classList.add("is-success");
  }
  function fail(msg) {
    status.textContent = msg;
    status.classList.add("is-error");
  }

  // Field-by-field validation with inline error messages.
  function validateForm() {
    let valid = true;
    valid = checkField("name",    (v) => v.trim().length > 0,            "Please enter your name.") && valid;
    valid = checkField("email",   (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Please enter a valid email.") && valid;
    valid = checkField("message", (v) => v.trim().length >= 10,          "Message should be at least 10 characters.") && valid;
    return valid;
  }

  function checkField(id, test, message) {
    const input = document.getElementById(id);
    const errorEl = document.querySelector(`[data-error-for="${id}"]`);
    const ok = test(input.value);
    input.classList.toggle("is-invalid", !ok);
    input.setAttribute("aria-invalid", String(!ok));
    errorEl.textContent = ok ? "" : message;
    return ok;
  }


  /* ---------- 7. FOOTER YEAR ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
});
