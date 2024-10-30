document.addEventListener("DOMContentLoaded", () => {
  const groupSelect = document.getElementById("groupSelect");
  const newGroupName = document.getElementById("newGroupName");
  const saveButton = document.getElementById("saveButton");

  // Load groups
  chrome.storage.sync.get("tweetGroups", (result) => {
    const groups = result.tweetGroups || [];
    groups.forEach(group => {
      const option = document.createElement("option");
      option.value = group;
      option.textContent = group;
      groupSelect.appendChild(option);
    });
  });

  // Save tweet to group
  saveButton.addEventListener("click", () => {
    const selectedGroup = groupSelect.value;
    const newGroup = newGroupName.value.trim();
    const groupName = newGroup || selectedGroup;

    if (!groupName) {
      alert("Please select or enter a group name.");
      return;
    }

    chrome.storage.sync.get("tweetGroups", (result) => {
      const groups = result.tweetGroups || [];
      if (!groups.includes(groupName)) groups.push(groupName);

      // Save the tweet to the selected group
      chrome.storage.sync.set({ tweetGroups: groups });
      chrome.storage.sync.get("groupTweets", (groupTweetsResult) => {
        const groupTweets = groupTweetsResult.groupTweets || {};
        groupTweets[groupName] = groupTweets[groupName] || [];
        groupTweets[groupName].push(/* Insert tweet data here */);

        chrome.storage.sync.set({ groupTweets });
      });
    });
  });
});
