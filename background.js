chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'fetchDailyChallenge') {
    const today = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD

    try {
      // Check login status
      fetch('https://leetcode.com/api/problems/all/', { credentials: 'include' }) // Include cookies for login check
        .then(response => {
          if (!response.ok) {
            console.error('Network response was not ok:', response);
            sendResponse({ error: 'Failed to fetch problem due to network issue' });
            return;
          }
          return response.json();
        })
        .then(data => {
          if (!data) {
            sendResponse({ error: 'No data received from LeetCode API.' });
            return;
          }

          // Check if the user is logged in
          if (!data.user_name || data.user_name === '') {
            sendResponse({
              error: 'User not logged in. Please log in to LeetCode first.',
              loginUrl: 'https://leetcode.com/accounts/login/'
            });
            return;
          }

          console.log('User is logged in as:', data.user_name);

          // Fetch stored problem if already fetched today
          chrome.storage.local.get(['dailyProblem', 'lastFetchedDate'], (result) => {
            if (chrome.runtime.lastError) {
              console.error('Error fetching from storage:', chrome.runtime.lastError);
              sendResponse({ error: 'Failed to fetch data from storage' });
              return;
            }

            if (result.lastFetchedDate === today && result.dailyProblem) {
              console.log('Returning stored problem for today:', result.dailyProblem);
              sendResponse({ challenge: result.dailyProblem });
              return;
            }

            // Filter and fetch daily problem
            const problems = data.stat_status_pairs.filter(problem => !problem.paid_only);

            if (problems.length === 0) {
              sendResponse({ error: 'Sorry, we couldn\'t find any free challenges right now. Please check back later.' });
              return;
            }

            const randomProblem = problems[Math.floor(Math.random() * problems.length)];

            // Create a clean challenge object
            const challenge = {
              title: randomProblem.stat.question__title,
              slug: randomProblem.stat.question__title_slug,
              difficulty: randomProblem.difficulty.level === 1
                ? 'Easy'
                : randomProblem.difficulty.level === 2
                ? 'Medium'
                : 'Hard',
              acceptanceRate: (
                (randomProblem.stat.total_acs / randomProblem.stat.total_submitted) *
                100
              ).toFixed(2),
              question_id: randomProblem.stat.question_id,
            };

            chrome.storage.local.set({
              dailyProblem: challenge,
              lastFetchedDate: today
            }, () => {
              if (chrome.runtime.lastError) {
                console.error('Error saving to storage:', chrome.runtime.lastError);
                sendResponse({ error: 'Failed to save data to storage' });
                return;
              }
              console.log('Problem saved for today:', challenge);
              sendResponse({ challenge });
            });
          });
        })
        .catch(error => {
          console.error('Fetch error:', error);
          sendResponse({ error: 'Failed to fetch problem due to network issue' });
        });
    } catch (error) {
      console.error('Unexpected error:', error);
      sendResponse({ error: 'An unexpected error occurred. Please try again later.' });
    }

    return true; // Keep the message channel open for asynchronous response
  }
});
