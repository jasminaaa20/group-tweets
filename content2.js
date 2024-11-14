// Function to create the "Add to Group" button dynamically based on the Like/Unlike button
function createDynamicAddToGroupButton(likeButton) {
    // Clone the like/unlike button
    const addToGroupButton = likeButton.cloneNode(true);
  
    // Update attributes for the new button
    addToGroupButton.setAttribute("aria-label", "Groups. Add to Group");
    addToGroupButton.setAttribute("data-testid", "add-to-group");
    addToGroupButton.setAttribute("title", "Add to Group");
  
    // Replace the SVG icon
    const svg = addToGroupButton.querySelector("svg");
    if (svg) {
      svg.innerHTML = ""; // Clear existing SVG
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  
      // New SVG path for a plus icon
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", "M12 5v14M5 12h14"); // Vertical and horizontal lines crossing at center
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "currentColor");
      path.setAttribute("stroke-width", "2");
  
      g.appendChild(path);
      svg.appendChild(g);
    }
  
    // Replace the text span
    const textSpan = addToGroupButton.querySelector("span[data-testid='app-text-transition-container']");
    if (textSpan) {
      textSpan.innerHTML = `
        <span class="css-1jxf684 r-1ttztb7 r-qvutc0 r-poiln3 r-n6v787 r-1cwl3u0 r-1k6nrdp r-n7gxbd" style="text-overflow: unset;">
          <span class="css-1jxf684 r-bcqeeo r-1ttztb7 r-qvutc0 r-poiln3" style="text-overflow: unset;">Add</span>
        </span>`;
    }
  
    // Add click event for the new button
    addToGroupButton.addEventListener("click", openGroupPopup);
  
    return addToGroupButton;
  }
  
  // Function to inject the "Add to Group" button dynamically
  function injectAddToGroupButton() {
    document.querySelectorAll('article[data-testid="tweet"]').forEach(tweet => {
      const likeButton = tweet.querySelector('button[data-testid="like"], button[data-testid="unlike"]');
  
      // Ensure the button isn’t already added to avoid duplicates
      if (likeButton && !tweet.querySelector("[data-testid='add-to-group']")) {
        const addToGroupButton = createDynamicAddToGroupButton(likeButton);
        likeButton.parentNode.insertAdjacentElement("afterend", addToGroupButton); // Insert after the like button
      }
    });
  }
  
  // Initial injection of buttons when the page loads
  injectAddToGroupButton();
  
  // Use MutationObserver to detect dynamically loaded tweets and inject buttons
  const observer = new MutationObserver(injectAddToGroupButton);
  observer.observe(document.body, { childList: true, subtree: true });
  