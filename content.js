// content.js

// Function to create the "Add to Group" button with a similar structure to the Like button
function createAddToGroupButton() {
  const buttonDiv = document.createElement("div");
  buttonDiv.className = "css-175oi2r r-18u37iz r-1h0z5md r-13awgt0"; // Wrapper classes for the button

  const button = document.createElement("button");
  button.setAttribute("aria-label", "Groups. Add to Group");
  button.setAttribute("role", "button");
  button.className = "css-175oi2r r-1777fci r-bt1l66 r-bztko3 r-lrvibr r-1loqt21 r-1ny4l3l"; // Button classes
  button.setAttribute("type", "button");
  button.setAttribute("title", "Add to Group");

  // Inner div for SVG icon and text
  const innerDiv = document.createElement("div");
  innerDiv.dir = "ltr";
  innerDiv.className = "css-146c3p1 r-bcqeeo r-1ttztb7 r-qvutc0 r-37j5jr r-a023e6 r-rjixqe r-16dba41 r-1awozwy r-6koalj r-1h0z5md r-o7ynqc r-clp7b1 r-3s2u2q";
  innerDiv.style.textOverflow = "unset";
  innerDiv.style.color = "rgb(113, 118, 123)";

  // Div for SVG icon
  const iconDiv = document.createElement("div");
  iconDiv.className = "css-175oi2r r-xoduu5";

  // SVG icon
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  svg.classList.add("r-4qtqp9", "r-yyyyoo", "r-dnmrzs", "r-bnwqim", "r-lrvibr", "r-m6rgpd", "r-50lct3", "r-1srniue");

  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");

  // New SVG path for a plus icon
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  // Set the path for a plus icon
  path.setAttribute("d", "M12 5v14M5 12h14"); // Vertical and horizontal lines crossing at center

  // Optionally, you could add stroke attributes for finer control over line appearance
  path.setAttribute("fill", "none"); // Ensure it's not filled
  path.setAttribute("stroke", "currentColor"); // Use current color for the icon
  path.setAttribute("stroke-width", "2"); // Set the stroke width for visibility

  g.appendChild(path);
  svg.appendChild(g);
  iconDiv.appendChild(svg);

  // Div for like count text
  const textDiv = document.createElement("div");
  textDiv.className = "css-175oi2r r-xoduu5 r-1udh08x";

  // Span for text
  const textSpan = document.createElement("span");
  textSpan.className = "css-1jxf684 r-1ttztb7 r-qvutc0 r-poiln3 r-n6v787 r-1cwl3u0 r-n7gxbd r-11pglpa r-1yz1tyy r-1noe1sz";
  textSpan.style.textOverflow = "unset";
  textSpan.textContent = "Add";

  // Append everything together
  textDiv.appendChild(textSpan);
  innerDiv.appendChild(iconDiv);
  innerDiv.appendChild(textDiv);
  button.appendChild(innerDiv);
  buttonDiv.appendChild(button);

  // Add click event to open the popup for group selection
  button.addEventListener("click", openGroupPopup);

  return buttonDiv;
}


// Function to open the popup for adding to a group
function openGroupPopup() {
  alert("Add to Group popup would appear here.");
}

// Function to inject the "Add to Group" button next to the like button
function injectAddToGroupButton() {
  document.querySelectorAll('article[data-testid="tweet"]').forEach(tweet => {
      const likeButton = tweet.querySelector('button[data-testid="like"]');
      
      // Ensure the button isn’t already added to avoid duplicates
      if (likeButton && !tweet.querySelector(".add-to-group-button")) {
          const addToGroupButton = createAddToGroupButton();
          addToGroupButton.classList.add("add-to-group-button");
          likeButton.parentNode.insertAdjacentElement("afterend", addToGroupButton); // Insert after the like button
      }
  });
}

// Initial injection of buttons when the page loads
injectAddToGroupButton();

// Use MutationObserver to detect dynamically loaded tweets and inject buttons
const observer = new MutationObserver(injectAddToGroupButton);
observer.observe(document.body, { childList: true, subtree: true });
