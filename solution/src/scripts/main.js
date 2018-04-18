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

const renderStory = function(story) {
  storyHtml =
    `<section class="card">
      <h3 class="card-title">
        <a href="${story.url}" target='_blank'>${story.title}</a>
      </h3>
      <p>
        <span class="time primary-alt">${timeSince(story.time)} </span>
        by
        <span class="by primary-alt"> ${story.by}</span>
      </p>
      <p><span class="primary-alt">${story.score}</span> points</p>
    </section>`
  return storyHtml;
}

const renderStories = function(stories) {
  return stories
    .filter(story => story.type === 'story')
    .map(renderStory)
    .join('');
}

window.addEventListener('load', () => {

  fetchTopStories()
  .then(stories => {
    let storiesHtml = renderStories(stories);
    document.getElementById('loading').style.display = 'none';
    document.getElementById('container').insertAdjacentHTML('beforeend', storiesHtml);
  })
  // catch fallback - error page

});


