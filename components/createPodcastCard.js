import { podcasts,genres } from './data.js';


/**
 * Converts an array of genre IDs into an array of genre titles.
 *
 * @param {number[]} genreIds - Array of genre IDs.
 * @returns {string[]} Array of genre titles. Unknown IDs return "Unknown".
 */
export function getGenreTitles(genreIds) {
  return genreIds.map(id => {
    const genre = genres.find(g => g.id === id);
    return genre ? genre.title : "Unknown";
  });
}



/**
 * creates a podcast card div and returns the  created card element
 *
 * @function createPodcastCard
 * @param {Object} podcast - The podcast object containing data to display.
 * @param {string} podcast.title - The title of the task (displayed as card content).
 * @returns {HTMLDivElement} The created podcast card element.
 */
export function createPodcastCard(podcast) {
  // Card container
  const podcastCard = document.createElement('div');
  podcastCard.classList.add('podcast-card');
  podcastCard.dataset.id = podcast.id;

  const img = document.createElement('img');
  img.src = podcast.image;
  img.alt = `${podcast.title} cover`;

  const title = document.createElement('h3');
  title.textContent = podcast.title;

  const seasons = document.createElement('p');
  seasons.textContent = `${podcast.seasons} season${podcast.seasons !== 1 ? 's' : ''}`;

  const genreContainer = document.createElement('div');
  genreContainer.classList.add('genre-tags');

  const genreTitles = getGenreTitles(podcast.genres);
  genreTitles.forEach(genre => {
    const tag = document.createElement('span');
    tag.classList.add('genre-tag');
    tag.textContent = genre;
    genreContainer.appendChild(tag);
  });

  // Last updated date
  const updated = document.createElement('time');
  const date = new Date(podcast.updated);

  updated.dateTime = podcast.updated;
  updated.textContent = `Updated ${date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })}`;

  // Click handler
  podcastCard.addEventListener('click', () => {
    console.log('Podcast clicked:', podcast.id);
    // openModal(podcast) ← this is where your modal logic plugs in
  });

  // Assemble card
  podcastCard.append(
    img,
    title,
    seasons,
    genreContainer,
    updated
  );

  return podcastCard;
}
