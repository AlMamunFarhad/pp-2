var root = document.querySelector(":root");
var navItems = document.querySelectorAll(".nav-menu");
const themeModal = document.querySelector(".customize-theme");
const colorChange = document.querySelectorAll(".choose-color p");


function toggleMode() {
  let setTheme = document.body;
  setTheme.classList.toggle("dark-theme");

  let theme = setTheme.classList.contains("dark-theme") ? "DARK" : "LIGHT";
  updateIcon(theme);
  localStorage.setItem("siteTheme", JSON.stringify(theme));
}

// Initialize theme based on localStorage
let getTheme = JSON.parse(localStorage.getItem("siteTheme"));

function updateIcon(theme) {
  let iconElement = document.getElementById('icon');

  if (theme === "DARK") {
    // Set the icon for dark mode
    iconElement.className = "bi bi-moon text-dark ms-2";
  } else {
    // Set the icon for light mode
    iconElement.className = "bi bi-brightness-high text-light ms-2";
  }
}



if (getTheme === "DARK") {
  document.body.classList.add("dark-theme");
  updateIcon("DARK");
} else {
  updateIcon("LIGHT");
}

// Navber item active class remove
// const changeActiveItem = () => {
//   navItems.forEach(item =>{
//     item.classList.remove("menu-active");
//   });
// };

// navItems.forEach(item => {
//   item.addEventListener("click", () => {
//     changeActiveItem();
//     item.classList.add("menu-active");
//   });
// });


// Navber scroll animation
window.onscroll = () => {
  sections.forEach(section => {
    let top = window.scrollY;
    let offset = section.offsetTop - 200;
    let height = section.offsetHeight;
    let getId = section.getAttribute("id");

    if(top >= offset && top < offset+height){
      navItems.forEach(links => {
        links.classList.remove("menu-active");
        document.querySelector(".side-nav ul li a[href*="+ getId +"]").classList.add("menu-active");
      });
    }


  });
};

const container = document.querySelector('#container .row .col-lg-9');
const sections = container.querySelectorAll('section');

// Function to check if an element is in viewport
const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

// Function to show sections in viewport
const showVisibleSections = () => {
    sections.forEach(section => {
        if (isInViewport(section)) {
            section.classList.add('visible');
            section.classList.remove('hidden');
        }
    });
};

// Initial call to show visible sections
showVisibleSections();

// Event listener for scrolling
window.addEventListener('scroll', () => {
    showVisibleSections();
});

// remove active class from colors
const changeActiveColorClass = () => {
  colorChange.forEach(colorPicker => {
      colorPicker.classList.remove('active');
  })
}

const resetButton = document.getElementById('resetBtn');

resetButton.addEventListener('click', () => {
  // Remove active class from colors
  changeActiveColorClass();

  // Apply styles and add 'active' class for the first color
  const defaultColor = document.querySelector('.choose-color p.color-1');
  defaultColor.classList.add('active');

  let lightColorLightness = 24,
    whiteColorLightness = "99%",
    darkColorLightness = "50%",
    buttonColor = 33,
    buttonWhiteColor = "99%",
    buttonDarkColor = "62%";

  // Add the selected color properties to local storage
  const colorProperties = {
    lightColorLightness,
    whiteColorLightness,
    darkColorLightness,
    buttonColor,
    buttonWhiteColor,
    buttonDarkColor
  };

  localStorage.setItem('selectedColorProperties', JSON.stringify(colorProperties));

  // Apply styles for the first color
  applyStyles(colorProperties);
});


// Function to apply styles based on color properties
function applyStyles(colorProperties) {
  let setPro = root.style;
  setPro.setProperty('--border-color-hue', colorProperties.lightColorLightness);
  setPro.setProperty('--border-color-lightness', colorProperties.whiteColorLightness);
  setPro.setProperty('--light-color-lightness', colorProperties.darkColorLightness);
  setPro.setProperty('--button-color-hue', colorProperties.buttonColor);
  setPro.setProperty('--button-color-lightness', colorProperties.buttonWhiteColor);
  setPro.setProperty('--button-light-color-lightness', colorProperties.buttonDarkColor);
}

colorChange.forEach(color => {
  color.addEventListener('click', () => {
    // Remove active class from colors
    changeActiveColorClass();

    let lightColorLightness, whiteColorLightness, darkColorLightness, buttonColor, buttonWhiteColor, buttonDarkColor;

    // Set color properties based on the selected color
    if (color.classList.contains('color-1')) {
      lightColorLightness = 24;
      whiteColorLightness = "99%";
      darkColorLightness = "50%";
      buttonColor = 33;
      buttonWhiteColor = "99%";
      buttonDarkColor = "62%";
    } else if (color.classList.contains('color-2')) {
      lightColorLightness = 298;
      whiteColorLightness = "57%";
      darkColorLightness = "39%";
      buttonColor = 291;
      buttonWhiteColor = "100%";
      buttonDarkColor = "22%";
    } else if (color.classList.contains('color-3')) {
      lightColorLightness = 308;
      whiteColorLightness = "79%";
      darkColorLightness = "64%";
      buttonColor = 328;
      buttonWhiteColor = "90%";
      buttonDarkColor = "68%";
    } else if (color.classList.contains('color-4')) {
      lightColorLightness = 206;
      whiteColorLightness = "92%";
      darkColorLightness = "60%";
      buttonColor = 241;
      buttonWhiteColor = "100%";
      buttonDarkColor = "62%";
    } else if (color.classList.contains('color-5')) {
      lightColorLightness = 225;
      whiteColorLightness = "69%";
      darkColorLightness = "41%";
      buttonColor = 233;
      buttonWhiteColor = "77%";
      buttonDarkColor = "28%";
    }

    // Add the selected color properties to local storage
    const colorProperties = {
      lightColorLightness,
      whiteColorLightness,
      darkColorLightness,
      buttonColor,
      buttonWhiteColor,
      buttonDarkColor
    };

    localStorage.setItem('selectedColorProperties', JSON.stringify(colorProperties));

    // Apply styles and add 'active' class
    applyStyles(colorProperties);
    color.classList.add('active');
  });
});

// Check if a color was previously selected and apply it on page load
document.addEventListener('DOMContentLoaded', () => {
  const storedColorProperties = localStorage.getItem('selectedColorProperties');
  if (storedColorProperties) {
    const colorProperties = JSON.parse(storedColorProperties);

    // Find the color with the matching properties and add 'active' class
    colorChange.forEach(color => {
      if (
        parseFloat(colorProperties.lightColorLightness) === parseFloat(color.dataset.lightColorLightness) &&
        colorProperties.whiteColorLightness === color.dataset.whiteColorLightness &&
        colorProperties.darkColorLightness === color.dataset.darkColorLightness &&
        parseFloat(colorProperties.buttonColor) === parseFloat(color.dataset.buttonColor) &&
        colorProperties.buttonWhiteColor === color.dataset.buttonWhiteColor &&
        colorProperties.buttonDarkColor === color.dataset.buttonDarkColor 
      ) {
        color.classList.add('active');
      }
    });

    // Apply styles based on the stored color properties
    applyStyles(colorProperties);
  }
});


const skillsSection = document.getElementById("skills-section");
const progressBars = document.querySelectorAll(".porgress-bar");

// Check if animation has already been triggered from localStorage
let animationTriggered = localStorage.getItem("animationTriggered") === "true";

function showProgress() {
    if (!animationTriggered) {
        progressBars.forEach((progressBar) => {
            const value = progressBar.dataset.progress;
            progressBar.style.opacity = 1;
            progressBar.style.width = `${value}%`;
        });

        // Set the flag in localStorage to true once the animation is triggered
        localStorage.setItem("animationTriggered", "true");
        
        // Set the flag to true to prevent further animations during the same page load
        animationTriggered = true;
    }
}

window.addEventListener("scroll", () => {
    const sectionPos = skillsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight;

    if (sectionPos < screenPos) {
        showProgress();
    }
});

// Reset the flag in localStorage when the page is reloaded
window.addEventListener("load", () => {
    // Reset the localStorage flag for a new page load
    localStorage.setItem("animationTriggered", "false");
    // Reset the local flag to false
    animationTriggered = false;
});


document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    link.addEventListener('click', smoothScroll);
  });

  function smoothScroll(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }
});















