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

// Obtener el botón y el dropdown menu por su id
const scanNetworkBtn = document.querySelector("#scan-network-btn");
const dropdownMenu = document.querySelector("#my-dropdown-menu");
const spinner = document.createElement("span");
let dataJson = null;
var deviceIp = "";
var deviceMac = "";

if (dropdownMenu) {
  // Variable para almacenar el valor seleccionado
  let selectedValue = "";
  let selectedValueIp = "";

  // Función para actualizar el texto del botón con el valor seleccionado
  const updateButtonText = (value) => {
    const btnText = document.querySelector("#dropdown-btn-text");
    btnText.textContent = value;
  };

  // Event listener para cada elemento del dropdown menu
  dropdownMenu.addEventListener("click", (event) => {
    // Obtener el valor del elemento seleccionado
    const selectedOption = event.target.textContent;

    // Actualizar el texto del botón con el valor seleccionado
    updateButtonText(selectedOption);

    // Almacenar el valor seleccionado
    selectedValue = selectedOption;
    selectedValueIp = dataJson[selectedValue];
    deviceIp = selectedValueIp;
    deviceMac = selectedValue;
    fetch("/get_device_ip", {
      method: "POST",
      body: JSON.stringify({ deviceIp: deviceIp }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("MAC: ", deviceMac, "IP: ", deviceIp);
  });

  // Escuchar el evento click del botón
  scanNetworkBtn.addEventListener("click", async () => {
    try {
      // Agregar el span con el ícono de carga al botón
      scanNetworkBtn.innerHTML = " Scan Network...";

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
        dataJson = data;

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

// Obtener el boton de conexion
const connectDeviceBtn = document.querySelector("#connect-device-btn");

// Escuchar el evento click del boton
if (connectDeviceBtn) {
  const spinner = document.createElement("span");

  connectDeviceBtn.addEventListener("click", async () => {
    try {
      // Agregar el span con el ícono de carga al botón
      connectDeviceBtn.innerHTML = " Connecting...";

      spinner.classList.add(
        "spinner-border",
        "spinner-border-sm",
        "float-start",
        "m-1"
      );
      spinner.setAttribute("role", "status");
      spinner.setAttribute("aria-hidden", "true");
      connectDeviceBtn.appendChild(spinner);

      // Deshabilitar el botón
      connectDeviceBtn.setAttribute("disabled", true);

      // Realizar una petición POST al servidor Flask
      const response = await fetch("/connect_device", {
        method: "POST",
      });

      // Verificar si la respuesta del servidor fue exitosa
      if (response.ok) {
        // Actualizar el contenido del dropdown con las claves del diccionario
        const data = await response.json();
        console.log(data);
      } else {
        console.error("Error al obtener respuesta de la conexion");
      }
    } catch (error) {
      console.error(`Error al realizar la petición: ${error}`);
    } finally {
      scanNetworkBtn.removeChild(spinner);
      scanNetworkBtn.innerHTML = "Connect";
      scanNetworkBtn.removeAttribute("disabled");
    }
  });
}