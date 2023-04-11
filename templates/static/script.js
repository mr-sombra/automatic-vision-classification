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
      } else {
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

// Obtener el botón por su id
const scanNetworkBtn = document.querySelector("#scan-network-btn");

if (scanNetworkBtn) {
  const spinner = document.createElement("span");

  // Escuchar el evento click del botón
  scanNetworkBtn.addEventListener("click", async () => {
    try {
      // Agregar el span con el ícono de carga al botón

      scanNetworkBtn.innerHTML = "Scan Network...";
      spinner.classList.add(
        "spinner-border",
        "spinner-border-sm",
        "float-start",
        "m-1"
      );
      spinner.setAttribute("role", "status");
      spinner.setAttribute("aria-hidden", "true");
      scanNetworkBtn.appendChild(spinner);

      // Deshabilitar el botón
      scanNetworkBtn.setAttribute("disabled", true);

      // Realizar una petición POST al servidor Flask
      const response = await fetch("/scan_network", {
        method: "POST",
      });

      // Verificar si la respuesta del servidor fue exitosa
      if (response.ok) {
        // Actualizar el contenido del dropdown con las claves del diccionario
        const data = await response.json();
        const dropdownMenu = document.querySelector("#my-dropdown-menu");

        // Eliminar los items actuales del dropdown
        dropdownMenu.innerHTML = "";

        // Agregar los nuevos items con las claves del diccionario
        Object.keys(data).forEach((key) => {
          const dropdownItem = document.createElement("a");
          dropdownItem.classList.add("dropdown-item");
          dropdownItem.textContent = key;
          dropdownMenu.appendChild(dropdownItem);
        });
      } else {
        console.error("Error al obtener la lista de dispositivos.");
      }
    } catch (error) {
      console.error(`Error al realizar la petición: ${error}`);
    } finally {
      // Eliminar el span con el ícono de carga y habilitar el botón
      scanNetworkBtn.removeChild(spinner);
      scanNetworkBtn.innerHTML = "Scan Network";
      scanNetworkBtn.removeAttribute("disabled");
    }
  });
}

// Search the scan-port-btn by id
const scanPortBtn = document.querySelector("#scan-port-btn");

// Conditional for scan-port-btn
if (scanPortBtn) {
  const spinner = document.createElement("span");

  // Listens to button click event
  scanPortBtn.addEventListener("click", async () => {
    try {
      // Add loader icon to the button
      scanPortBtn.innerHTML = " Scanning...";
      spinner.classList.add(
        "spinner-border",
        "spinner-border-sm",
        "float-start",
        "m-1"
      );
      spinner.setAttribute("role", "status");
      spinner.setAttribute("aria-hidden", "true");
      scanPortBtn.appendChild(spinner);

      // Disable button
      scanPortBtn.setAttribute("disabled", true);

      // Make a POST request to the Flask server
      const response = await fetch("/scan_port", {
        method: "POST",
      });

      // Verify if the response is OK
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const drpPortMenu = document.querySelector("#drp-port-menu");

        // Erase the actual dropdown items
        drpPortMenu.innerHTML = "";

        // Append the new items from a list
        data.forEach((port) => {
          const dropdownItem = document.createElement("a");
          dropdownItem.classList.add("dropdown-item");
          dropdownItem.textContent = port;
          drpPortMenu.appendChild(dropdownItem);
        });
      } else {
        console.error("Error scanning COM devices");
      }
    } catch (error) {
      console.error(`Error trying request ${error}`);
    } finally {
      // Erase the load icon and enable button
      scanPortBtn.removeChild(spinner);
      scanPortBtn.innerHTML = "Scan port";
      scanPortBtn.removeAttribute("disabled");
    }
  });
}