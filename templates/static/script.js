document.addEventListener("DOMContentLoaded", function (event) {
  const showNavbar = (toggleId, navId, bodyId, headerId) => {
    const toggle = document.getElementById(toggleId),
      nav = document.getElementById(navId),
      bodypd = document.getElementById(bodyId),
      headerpd = document.getElementById(headerId);

    // Validate that all variables exist
    if (toggle && nav && bodypd && headerpd) {
      toggle.addEventListener("click", () => {
        // show navbar
        nav.classList.toggle("show");
        // change icon
        toggle.classList.toggle("bx-x");
        // add padding to body
        bodypd.classList.toggle("body-pd");
        // add padding to header
        headerpd.classList.toggle("body-pd");
      });
    }
  };

  showNavbar("header-toggle", "nav-bar", "body-pd", "header");

  /*===== LINK ACTIVE =====*/
  // Código de JavaScript en la página de transmisión de video

  const linkColor = document.querySelectorAll(".nav_link");
  const videoLink = document.getElementById("nav_video");

  function colorLink() {
    linkColor.forEach((l) => {
      if (l.href === window.location.href) {
        l.classList.add("active");
      } else if (window.location.pathname.includes("requests")) {
        videoLink.classList.add("active");
      }
      else {
        l.classList.remove("active");
      }
    });
  }

  colorLink();

  linkColor.forEach((l) => {
    l.addEventListener("click", colorLink);
  });

  // Your code to run since DOM is loaded and ready
});
