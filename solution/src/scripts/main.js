const apiBaseUrl = 'https://hacker-news.firebaseio.com/v0';

const fetchStory = function(storyId) {
  const storyUrl = `${apiBaseUrl}/item/${storyId}.json`
  return fetch(storyUrl)
    .then(response => response.json());
}

const fetchTopStoriesList = function() {
  const topStoriesUrl = `${apiBaseUrl}/topstories.json`;
  return fetch(topStoriesUrl)
    .then(response => response.json());
}

const fetchTopStories = function() {
  return fetchTopStoriesList()
    .then(topStoryIds => {
      const stories = topStoryIds.slice(0, 30).map(fetchStory);
      return Promise.all(stories);
    });
}

window.addEventListener('load', () => {

  fetchTopStories()
  .then(stories => {
    console.log(stories)
    let storiesHtml = '';
    stories.forEach(story => {
      storiesHtml +=
        `<ul>
          <li>Title: ${story.title}</li>
          <li>by: ${story.by}</li>
        </ul>`
    });
    document.getElementById('loading').style.display = 'none';
    document.getElementById('main').insertAdjacentHTML('beforeend', storiesHtml);
  })
  // catch fallback - error page

});
