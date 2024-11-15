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

  const textSpan = addToGroupButton.querySelector("span[data-testid='app-text-transition-container']");
  if (textSpan) {
    textSpan.innerHTML = `
      <span class="css-1jxf684 r-1ttztb7 r-qvutc0 r-poiln3 r-n6v787 r-1cwl3u0 r-1k6nrdp r-n7gxbd" style="text-overflow: unset;">
        <span class="css-1jxf684 r-bcqeeo r-1ttztb7 r-qvutc0 r-poiln3" style="text-overflow: unset;">Add</span>
      </span>`;
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
