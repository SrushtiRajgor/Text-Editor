let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");
let textBlocksContainer = document.getElementById("text-blocks-container");
let addTextBlockButton = document.getElementById("addTextBlock");

let blockCount = 0;

// Function to make elements draggable and keep them within container boundaries
function makeElementDraggable(element) {
  let isDragging = false;
  let offsetX, offsetY;
  
  const containerRect = textBlocksContainer.getBoundingClientRect();

  element.addEventListener("mousedown", (e) => {
    isDragging = true;
    let rect = element.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    element.style.cursor = "move";
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      // Calculate the new position
      let newX = e.clientX - offsetX;
      let newY = e.clientY - offsetY;
      
      // Constrain within the container boundaries
      if (newX < 0) newX = 0;
      if (newY < 0) newY = 0;
      if (newX + element.offsetWidth > containerRect.width) newX = containerRect.width - element.offsetWidth;
      if (newY + element.offsetHeight > containerRect.height) newY = containerRect.height - element.offsetHeight;

      element.style.position = "absolute";
      element.style.left = `${newX}px`;
      element.style.top = `${newY}px`;
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    element.style.cursor = "text";
  });
}

// Function to create a new draggable text block
function addTextBlock() {
  blockCount++;

  // Create new div for text block
  let newTextBlock = document.createElement("div");
  newTextBlock.classList.add("text-block");
  newTextBlock.contentEditable = "true";
  newTextBlock.innerHTML = "Drag me! Edit me!";
  newTextBlock.style.position = "absolute";
  newTextBlock.style.top = "50px";
  newTextBlock.style.left = "50px";
  newTextBlock.id = `text-block-${blockCount}`;
  
  // Make it draggable
  makeElementDraggable(newTextBlock);

  // Add to text blocks container (inside canvas)
  textBlocksContainer.appendChild(newTextBlock);
}

// Add new text block on button click
addTextBlockButton.addEventListener("click", () => {
  addTextBlock();
});

// Add one text block at the start
addTextBlock();

// List of fontlist
let fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "cursive",
];

// Initial Settings
const initializer = () => {
  // Function calls for highlighting buttons
  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);

  // Create options for font names
  fontList.map((value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
  });

  // Font size allows only till 7
  for (let i = 1; i <= 7; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
  }

  // Default size
  fontSizeRef.value = 3;
};

// Main logic
const modifyText = (command, defaultUi, value) => {
  document.execCommand(command, defaultUi, value);
};

// For basic operations that don’t need a value parameter
optionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});

// Options that require a value parameter (e.g., colors, fonts)
advancedOptionButton.forEach((button) => {
  button.addEventListener("change", () => {
    modifyText(button.id, false, button.value);
  });
});

// Highlight clicked button
const highlighter = (className, needsRemoval) => {
  className.forEach((button) => {
    button.addEventListener("click", () => {
      if (needsRemoval) {
        let alreadyActive = false;

        if (button.classList.contains("active")) {
          alreadyActive = true;
        }

        highlighterRemover(className);
        if (!alreadyActive) {
          button.classList.add("active");
        }
      } else {
        button.classList.toggle("active");
      }
    });
  });
};

const highlighterRemover = (className) => {
  className.forEach((button) => {
    button.classList.remove("active");
  });
};

window.onload = initializer();
