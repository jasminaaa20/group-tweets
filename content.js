function addButtonToActionRow() {
  const actionRows = document.querySelectorAll('div[aria-label*="like"]');
  
  actionRows.forEach((actionRow) => {
    // Avoid duplicate buttons
    if (actionRow.querySelector(".add-to-group")) return;
    
    // Create "Add to Group" button
    const addToGroupButton = document.createElement("div");
    addToGroupButton.classList.add("css-175oi2r", "r-1777fci", "r-bt1l66", "r-bztko3", "add-to-group");
    addToGroupButton.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <!-- Define SVG icon here -->
      </svg>
      <span>Add to Group</span>
    `;
    addToGroupButton.style = "display: flex; align-items: center; cursor: pointer;";
    
    addToGroupButton.addEventListener("click", () => openPopup(actionRow));
    
    // Append button to action row
    actionRow.appendChild(addToGroupButton);
  });
}

// Function to trigger the popup
function openPopup(actionRow) {
  chrome.storage.sync.get("tweetGroups", (result) => {
    // Load or create popup for groups
    const groups = result.tweetGroups || [];
    const tweetData = { /* Extract tweet details from actionRow as needed */ };
    
    chrome.runtime.sendMessage({ type: "openPopup", tweetData, groups });
  });
}

// Observe DOM changes to dynamically add button
const observer = new MutationObserver(addButtonToActionRow);
observer.observe(document.body, { childList: true, subtree: true });

addButtonToActionRow();
