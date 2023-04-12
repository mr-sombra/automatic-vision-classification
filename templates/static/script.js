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

/*====== Begin Scan port Button in video-detection.html ======*/

// Search the scan-port-btn by id
const scanPortBtn = document.querySelector("#scan-port-btn");
// Search the dropdown-port-menu-list by id
const drpPortMenu = document.querySelector("#drp-port-menu");

// Conditional for scan-port-btn
if (scanPortBtn) {
  // Element to add loader icon
  const spinner = document.createElement("span");

  // Variable to storage the selected value
  let selectedValue = "";

  // Button function to update selected value
  const updateDrpText = (value) => {
    const drpText = document.querySelector("#drp-port-btn-txt");
    drpText.textContent = value;
  };

  // Event listener for each dropdown item
  drpPortMenu.addEventListener("click", (event) => {
    // Obtain the value of the selected element
    const selectedOption = event.target.textContent;

    // Update the dropdown text with the selected item
    updateDrpText(selectedOption);

    // Storage the selected value
    selectedValue = selectedOption;

    // POST request to send selected value to Flask server
    fetch("/get_port", {
      method: "POST",
      body: JSON.stringify({ serialPort: serialPort }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Port: ", selectedValue);
  });

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

/*====== End Scan port Button in video-detection.html ======*/

/*====== Begin Connect Button in video-detection.html ======*/

// Search connect-port-btn by id
const connectPortBtn = document.querySelector("#connectPortBtn");

if (connectPortBtn) {
  // Event listener connect-port-btn
  connectPortBtn.addEventListener("click", async () => {
    try {
      // TODO: add event to connect-port-btn
    } catch (error) {
      console.error(`Error trying request ${error}`);
    } finally {
      console.log("Finally OK");
    }
  });
}

/*====== End Connect Button in video-detection.html ======*/
