function setupMenuToggle() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (!hamburger || !navLinks) return;
  // Idempotent binding: override previous handler if any
  hamburger.onclick = () => {
    navLinks.classList.toggle("expanded");
  };
}

["astro:page-load", "astro:after-swap"].forEach((evt) => {
  document.addEventListener(evt, setupMenuToggle);
});
