/**
 * Creates the "Add to Group" button with an optimized structure.
 *
 * @returns {HTMLElement} The created button element.
 */
function createAddToGroupButton() {
  // Main button wrapper div with button-specific classes
  const buttonDiv = document.createElement("div");
  buttonDiv.className = "css-175oi2r r-18u37iz r-1h0z5md r-13awgt0 add-to-group-button";

  // Button element with attributes and styling classes
  const button = document.createElement("button");
  button.setAttribute("aria-label", "Groups. Add to Group");
  button.setAttribute("role", "button");
  button.setAttribute("type", "button");
  button.setAttribute("title", "Add to Group");
  button.className = "css-175oi2r r-1777fci r-bt1l66 r-bztko3 r-lrvibr r-1loqt21 r-1ny4l3l";

  // Inner container div for icon and text, with text styling
  const innerDiv = document.createElement("div");
  innerDiv.dir = "ltr";
  innerDiv.className = "css-146c3p1 r-bcqeeo r-1ttztb7 r-qvutc0 r-37j5jr r-a023e6 r-rjixqe r-16dba41 r-1awozwy r-6koalj r-1h0z5md r-o7ynqc r-clp7b1 r-3s2u2q";
  innerDiv.style.textOverflow = "unset";
  innerDiv.style.color = "rgb(113, 118, 123)";

  // SVG icon container div
  const iconDiv = document.createElement("div");
  iconDiv.className = "css-175oi2r r-xoduu5";

  // Inner red div for icon background
  const redDiv = document.createElement("div");
  redDiv.className = "css-175oi2r r-xoduu5 r-1p0dtai r-1d2f490 r-u8s1d r-zchlnj r-ipm5af r-1niwhzg r-sdzlij r-xf4iuw r-o7ynqc r-6416eg r-1ny4l3l";
  iconDiv.appendChild(redDiv);

  // SVG element representing the plus icon
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  svg.classList.add("r-4qtqp9", "r-yyyyoo", "r-dnmrzs", "r-bnwqim", "r-lrvibr", "r-m6rgpd", "r-50lct3", "r-1srniue");

  // SVG path with attributes for a plus icon
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M9.5 4.5v15M2 12h15");
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "currentColor");
  path.setAttribute("stroke-width", "2");
  
  g.appendChild(path);
  svg.appendChild(g);
  iconDiv.appendChild(svg);

  // Text div container for the "Add" label
  const textDiv = document.createElement("div");
  textDiv.className = "css-175oi2r r-xoduu5 r-1udh08x";

  // Transition span for smooth appearance of text
  const transitionSpan = document.createElement("span");
  transitionSpan.setAttribute("data-testid", "app-text-transition-container");
  transitionSpan.style.transitionProperty = "transform";
  transitionSpan.style.transitionDuration = "0.3s";
  transitionSpan.style.transform = "translate3d(0px, 0px, 0px)";

  // Nested span structure for the "Add" label text
  const outerTextSpan = document.createElement("span");
  outerTextSpan.className = "css-1jxf684 r-1ttztb7 r-qvutc0 r-poiln3 r-n6v787 r-1cwl3u0 r-1k6nrdp";
  outerTextSpan.style.textOverflow = "unset";

  const innerTextSpan = document.createElement("span");
  innerTextSpan.className = "css-1jxf684 r-bcqeeo r-1ttztb7 r-qvutc0 r-poiln3";
  innerTextSpan.style.textOverflow = "unset";
  innerTextSpan.textContent = "Add";

  // Append nested text spans
  outerTextSpan.appendChild(innerTextSpan);
  transitionSpan.appendChild(outerTextSpan);
  textDiv.appendChild(transitionSpan);

  // Assemble the button structure
  innerDiv.appendChild(iconDiv);
  innerDiv.appendChild(textDiv);
  button.appendChild(innerDiv);
  buttonDiv.appendChild(button);

  // Add click event to open the popup for group selection
  button.addEventListener("click", openGroupPopup);

  return buttonDiv;
}


/**
 * Opens the "Add to Group" popup for the user to select a group
 * from their saved groups or enter a new group name.
 */
function openGroupPopup() {
  alert("Add to Group popup would appear here.");
}


/**
 * Injects the "Add to Group" button after the like button in each
 * visible tweet element. If the tweet element already has the
 * "Add to Group" button, it does nothing.
 */
function injectAddToGroupButton() {
  document.querySelectorAll('article[data-testid="tweet"]').forEach(tweet => {
      const likeButton = tweet.querySelector('button[data-testid="like"], button[data-testid="unlike"]');
      
      if (likeButton && !tweet.querySelector(".add-to-group-button")) {
          const addToGroupButton = createAddToGroupButton();
          likeButton.parentNode.insertAdjacentElement("afterend", addToGroupButton); // Insert after the like button
      }
  });
}

// Initial injection of buttons when the page loads
injectAddToGroupButton();

// Use MutationObserver to detect dynamically loaded tweets and inject buttons
const observer = new MutationObserver(injectAddToGroupButton);
observer.observe(document.body, { childList: true, subtree: true });
