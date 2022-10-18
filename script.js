const circles = document.querySelectorAll(".circle");
const container = document.querySelector(".container");

var clicked_val = false;

// src: https://stackoverflow.com/questions/72876983/zoom-an-area-of-a-page-to-fullscreen-on-click-with-html-css-javascript

function shrink(clone) {
  // Remove cloned element from DOM after animation is over
  clone.addEventListener("animationend", (e) => e.target.remove());

  // Trigger browser reflow to start animation
  clone.style.animation = "none";
  clone.offsetHeight;
  clone.style.animation = "";
  clone.classList.add("shrink-down");

  clicked_val = false;
}

const toggleFullScreen = (event) => {
  const { top, left } = event.target.getBoundingClientRect();

  // Clone the element and its children
  let fullScreen = event.target.cloneNode(true);

  if (clicked_val) {
    let children = getChildren();

    if (children !== undefined && children.length > 0) {
      children.forEach((child) => {
        if (child !== undefined && child.className.includes("full-screen"))
          shrink(child);
      });
    }
    return;
  }

  // fix position of the popping out  something about --inset
  // fix size of blob
  console.log(top, left);

  // Set top and left with custom property
  if (event.target.id.includes("family")) {
    fullScreen.style.setProperty(
      "--inset",
      `${top}px ${top - 2300}px ${top}px ${left}px`
    );
  } else {
    fullScreen.style.setProperty(
      "--inset",
      `${top - 10}px auto auto ${left - 50}px`
    );
  }

  // Add class with animation and position
  fullScreen.classList.add("full-screen");

  // Listen for click to close full screen
  fullScreen.addEventListener("click", (e) => shrink(e.target));

  // Place in container over element to expand
  container.appendChild(fullScreen);

  //clicked
  clicked_val = true;
};

// Add click listeners on all boxes
circles.forEach((circle) => {
  circle.addEventListener("click", toggleFullScreen);
});

function getChildren() {
  array = [];

  for (i = 0; i < container.children.length; i++) {
    child = container.children[i];

    if (child) array.push(child);
  }

  return array;
}
