(function () {
  "use strict";
  var NAV_OFFSET = 96;

  /* ---- Smooth scroll con compensación de la barra fija ---- */
  function scrollToId(id) {
    var el = document.querySelector(id);
    if (!el) return;
    var y = el.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  }
  document.querySelectorAll("[data-scroll]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      var href = a.getAttribute("href");
      if (href && href.charAt(0) === "#") {
        e.preventDefault();
        closeMobileMenu();
        scrollToId(href);
        history.replaceState(null, "", href);
      }
    });
  });

  /* ---- Barra fija al hacer scroll ---- */
  var navbar = document.getElementById("navbar");
  var hero = document.getElementById("inicio");
  function onScroll() {
    var trigger = hero ? hero.offsetHeight - 160 : 400;
    if (window.pageYOffset > trigger) navbar.classList.add("show");
    else navbar.classList.remove("show");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Reveal de secciones ---- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll(".section").forEach(function (s) { io.observe(s); });
  } else {
    document.querySelectorAll(".section").forEach(function (s) { s.classList.add("in"); });
  }

  /* ---- Tarjetas de competencia (voltear) ---- */
  document.querySelectorAll(".comp-card").forEach(function (card) {
    function flip() { card.classList.toggle("flipped"); }
    card.addEventListener("click", flip);
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); }
    });
  });

  /* ---- Acordeón de experiencia ---- */
  document.querySelectorAll(".exp-row").forEach(function (row) {
    var main = row.querySelector(".exp-row-main");
    var detail = row.querySelector(".exp-detail");
    function toggle() {
      var open = row.classList.toggle("open");
      detail.style.maxHeight = open ? detail.scrollHeight + "px" : "0";
    }
    main.addEventListener("click", toggle);
    row.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
    });
  });

  /* ---- Galerías ---- */
  var GALLERIES = {
    fis: { title: "FIS Financial Center", imgs: count("fis", 8) },
    ufnorth: { title: "UF Health North — Phase 3", imgs: count("ufnorth", 8) },
    morgue: { title: "UF Health Morgue / Forensic Facility", imgs: count("morgue", 8) },
    jean: { title: "Jean Ribault High School", imgs: count("jean", 8) }
  };
  function count(prefix, n) {
    var a = [];
    for (var i = 1; i <= n; i++) a.push("assets/img/" + prefix + "-" + i + ".webp");
    return a;
  }

  var viewer = document.getElementById("galleryViewer");
  var gvImg = document.getElementById("gvImg");
  var gvCaption = document.getElementById("gvCaption");
  var gvThumbs = document.getElementById("gvThumbs");
  var current = { imgs: [], i: 0, title: "" };
  var lastFocused = null;

  function openGallery(key) {
    var g = GALLERIES[key];
    if (!g) return;
    lastFocused = document.activeElement;
    current.imgs = g.imgs; current.i = 0; current.title = g.title;
    gvThumbs.innerHTML = "";
    g.imgs.forEach(function (src, idx) {
      var t = new Image();
      t.src = src; t.alt = g.title + " — foto " + (idx + 1);
      t.addEventListener("click", function () { current.i = idx; render(); });
      gvThumbs.appendChild(t);
    });
    render();
    viewer.classList.add("open");
    viewer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function render() {
    gvImg.src = current.imgs[current.i];
    gvImg.alt = current.title + " — foto " + (current.i + 1);
    gvCaption.textContent = current.title + " · " + (current.i + 1) + " / " + current.imgs.length;
    Array.prototype.forEach.call(gvThumbs.children, function (t, idx) {
      t.classList.toggle("active", idx === current.i);
    });
  }
  function step(d) { current.i = (current.i + d + current.imgs.length) % current.imgs.length; render(); }
  function closeGallery() {
    viewer.classList.remove("open");
    viewer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }
  document.querySelectorAll(".project-card").forEach(function (c) {
    c.addEventListener("click", function () { openGallery(c.getAttribute("data-gallery")); });
  });
  document.querySelector(".js-gallery-all").addEventListener("click", function () { openGallery("fis"); });
  document.getElementById("gvClose").addEventListener("click", closeGallery);
  document.getElementById("gvPrev").addEventListener("click", function () { step(-1); });
  document.getElementById("gvNext").addEventListener("click", function () { step(1); });
  viewer.addEventListener("click", function (e) { if (e.target === viewer) closeGallery(); });

  /* ---- Modal CV ---- */
  var cvModal = document.getElementById("cvModal");
  function openCV() { cvModal.classList.add("open"); cvModal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; }
  function closeCV() { cvModal.classList.remove("open"); cvModal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }
  document.querySelectorAll(".js-cv").forEach(function (b) { b.addEventListener("click", openCV); });
  document.getElementById("cvClose").addEventListener("click", closeCV);
  cvModal.addEventListener("click", function (e) { if (e.target === cvModal) closeCV(); });

  /* ---- Menú móvil ---- */
  var mobileMenu = document.getElementById("mobileMenu");
  function openMobileMenu() { mobileMenu.classList.add("open"); mobileMenu.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; }
  function closeMobileMenu() { mobileMenu.classList.remove("open"); mobileMenu.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }
  ["menuToggle", "menuToggleHero"].forEach(function (id) {
    var b = document.getElementById(id);
    if (b) b.addEventListener("click", openMobileMenu);
  });
  document.getElementById("mmClose").addEventListener("click", closeMobileMenu);

  /* ---- Copiar al portapapeles + toast ---- */
  var toast = document.getElementById("toast");
  var toastTimer;
  function showToast(msg) {
    toast.textContent = msg; toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 2000);
  }
  document.querySelectorAll(".js-copy").forEach(function (row) {
    row.addEventListener("click", function (e) {
      var val = row.getAttribute("data-copy");
      if (navigator.clipboard && val) {
        e.preventDefault();
        navigator.clipboard.writeText(val).then(function () { showToast("Copiado: " + val); })
          .catch(function () { window.location.href = row.getAttribute("href"); });
      }
    });
  });

  /* ---- Teclado global ---- */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeGallery(); closeCV(); closeMobileMenu(); }
    if (viewer.classList.contains("open")) {
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    }
  });
})();
