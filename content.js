function createDynamicAddToGroupButton(likeButton) {

  const addToGroupButton = likeButton.cloneNode(true);

  addToGroupButton.setAttribute("aria-label", "Groups. Add to Group");
  addToGroupButton.setAttribute("data-testid", "add-to-group");
  addToGroupButton.setAttribute("title", "Add to Group");

  const svg = addToGroupButton.querySelector("svg");
  if (svg) {
    svg.innerHTML = "";
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M12 3.5v17M3.5 12h17");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "2");

    g.appendChild(path);
    svg.appendChild(g);
  }

  const textSpan = addToGroupButton.querySelector("span[data-testid='app-text-transition-container'] span span");
  if (textSpan) {
    textSpan.textContent = "Add";
  }

  const innerDiv = addToGroupButton.querySelector('div[dir="ltr"]');
  if (innerDiv) {
    innerDiv.style.color = "rgb(113, 118, 123)";
  }

  addToGroupButton.addEventListener("click", openGroupPopup);

  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("css-175oi2r", "r-18u37iz", "r-1h0z5md", "r-13awgt0");

  buttonDiv.appendChild(addToGroupButton);

  return buttonDiv;
}

function openGroupPopup() {
  alert("Add to Group popup would appear here.");
}

function injectAddToGroupButton() {
  document.querySelectorAll('article[data-testid="tweet"]').forEach(tweet => {
    const likeButton = tweet.querySelector('button[data-testid="like"], button[data-testid="unlike"]');

    if (likeButton && !tweet.querySelector("[data-testid='add-to-group']")) {
      const addToGroupButtonDiv = createDynamicAddToGroupButton(likeButton);
      likeButton.parentNode.insertAdjacentElement("afterend", addToGroupButtonDiv);
    }
  });
}

injectAddToGroupButton();

const observer = new MutationObserver(injectAddToGroupButton);
observer.observe(document.body, { childList: true, subtree: true });
