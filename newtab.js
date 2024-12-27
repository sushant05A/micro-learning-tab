document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const titleElement = document.getElementById('title');
  const difficultyElement = document.getElementById('difficulty');
  const acceptanceRateElement = document.getElementById('acceptanceRate');
  const solveLinkElement = document.getElementById('solveLink');
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const clockElement = document.getElementById('clock');

  // Fetch the daily challenge from the background script
  chrome.runtime.sendMessage({ action: 'fetchDailyChallenge' }, (response) => {
    if (response.error) {
      console.error('Error fetching challenge:', response.error);

      // Display user-friendly error message
      titleElement.textContent = 'Oops! Unable to load today\'s challenge.';
      difficultyElement.textContent = 'Please check your internet connection or login to LeetCode.';
      acceptanceRateElement.textContent = '';
      solveLinkElement.style.display = 'none'; // Hide solve link in case of an error
      return;
    }

    const challenge = response.challenge;

    if (challenge) {
      console.log('Challenge received:', challenge);

      // Update the DOM with challenge details
      titleElement.textContent = challenge.title || 'Untitled Challenge';
      difficultyElement.textContent = `Difficulty: ${challenge.difficulty || 'Unknown'}`;
      acceptanceRateElement.textContent = `Acceptance Rate: ${challenge.acceptanceRate || 'N/A'}%`;
      solveLinkElement.href = `https://leetcode.com/problems/${challenge.slug}/`;
      solveLinkElement.style.display = 'inline'; // Show solve link
    } else {
      console.error('Challenge object is missing:', response);

      // Handle missing challenge object
      titleElement.textContent = 'Failed to fetch challenge.';
      difficultyElement.textContent = '';
      acceptanceRateElement.textContent = '';
      solveLinkElement.style.display = 'none';
    }
  });

  // Search functionality
  searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();

    if (query) {
      const googleSearchURL = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      window.location.href = googleSearchURL; // Open search results in the same tab
    } else {
      // Display error message below the search bar
      searchInput.classList.add('error');
      setTimeout(() => searchInput.classList.remove('error'), 2000); // Remove error class after 2 seconds
    }
  });

  // Allow Enter key to trigger search
  searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      searchButton.click();
    }
  });

  // Digital clock functionality
  function updateClock() {
    const now = new Date();
    const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateString = now.toLocaleDateString(undefined, options);

    clockElement.innerHTML = `
      <span>${dateString}</span><br>
      <span>${timeString}</span>
    `;
  }

  function startClock() {
    updateClock();
    const now = new Date();
    const msToNextSecond = 1000 - now.getMilliseconds();
    setTimeout(() => {
      updateClock();
      setInterval(updateClock, 1000);
    }, msToNextSecond);
  }

  startClock();
});
