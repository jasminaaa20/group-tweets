/**
 * Creates a new "Add to Group" button by cloning and modifying the Like button.
 * @param {HTMLElement} likeButton - The existing Like button element to clone.
 * @returns {HTMLElement} The new "Add to Group" button wrapped in a div.
 */
function createDynamicAddToGroupButton(likeButton) {

  const addToGroupButton = likeButton.cloneNode(true);

  addToGroupButton.setAttribute("aria-label", "Groups. Add to Group");
  addToGroupButton.setAttribute("data-testid", "add-to-group");
  addToGroupButton.setAttribute("title", "Add to Group");

  const svg = addToGroupButton.querySelector("svg");
  if (svg) {
    svg.innerHTML = "";
    svg.appendChild(createPlusIconG());
  }

  const textOuterSpan = addToGroupButton.querySelector("span span");
  if (textOuterSpan) {
    let textSpan = textOuterSpan.querySelector("span");
    if (textSpan) {
      textSpan.textContent = "Add";
    }
    else {
      textSpan = createTextSpan("Add");
      textOuterSpan.appendChild(textSpan);
    }
  }

  const contentDiv = addToGroupButton.querySelector('div[dir="ltr"]');
  if (contentDiv) {
    contentDiv.style.color = "rgb(113, 118, 123)";
  }

  addToGroupButton.addEventListener("click", openGroupPopup);

  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add(
    "css-175oi2r", 
    "r-18u37iz", 
    "r-1h0z5md", 
    "r-13awgt0"
  );
  buttonDiv.appendChild(addToGroupButton);

  return buttonDiv;
}

/**
 * Creates an SVG <g> element containing a single <path> element with a plus (+)
 * symbol. The element is intended to be used as the icon for the "Add to Group"
 * button. The element is created with the colors and styling of the Like button
 * icon.
 * @returns {SVGGElement} The created SVG <g> element.
 */
function createPlusIconG() {
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M12 3.5v17M3.5 12h17");
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "currentColor");
  path.setAttribute("stroke-width", "2");

  g.appendChild(path);

  return g;
}

/**
 * Creates an HTML <span> element with the given text and the same
 * appearance as the text in the Like button. The element is intended
 * to be used as the text of the "Add to Group" button.
 * @param {string} text The text to display in the created <span> element.
 * @returns {HTMLSpanElement} The created <span> element.
 */
function createTextSpan(text) {
  const textSpan = document.createElement("span");
  textSpan.classList.add(
    "css-1jxf684",
    "r-bcqeeo",
    "r-1ttztb7",
    "r-qvutc0",
    "r-poiln3"
  );
  textSpan.style.textOverflow = "unset";
  textSpan.textContent = text;
  return textSpan;
}

function openGroupPopup() {
  alert("Add to Group popup would appear here.");
}

/**
 * Injects the "Add to Group" button into every tweet that doesn't already have
 * it. The button is inserted after the "Like" button.
 * @returns {void}
 */
function injectAddToGroupButton() {
  document.querySelectorAll('article[data-testid="tweet"]').forEach(tweet => {
    const likeButton = tweet.querySelector('button[data-testid="like"], button[data-testid="unlike"]');

    if (likeButton && !tweet.querySelector("[data-testid='add-to-group']")) {
      const addToGroupButtonDiv = createDynamicAddToGroupButton(likeButton);
      likeButton.parentNode.insertAdjacentElement("afterend", addToGroupButtonDiv);
    }
  });
}

/**
 * Injects the "Add to Group" button into every tweet that doesn't already have
 * it, and then starts observing the DOM for any changes to the tweets. When the
 * DOM changes, the function is called again, which will re-inject the buttons
 * into any new tweets that have been added.
 * @returns {void}
 */
function observeAndInjectButtons() {
  injectAddToGroupButton();

  const observer = new MutationObserver(injectAddToGroupButton);
  observer.observe(document.body, { childList: true, subtree: true });
}

observeAndInjectButtons();
