// modal.js
import { getGenreTitles } from './podcasts.js';
import { DateUtils } from './dateUtils.js';

export const modal = (() => {
  const modalContainer = document.getElementById('podcast-modal');
  const imgEl = document.getElementById('podcast-thumbnail');
  const titleEl = document.getElementById('podcast-title');
  const descEl = document.getElementById('podcast-desc');
  const genreContainer = document.querySelector('.genre-buttons');
  const dateEl = document.getElementById('podcast-date');
  const episodesContainer = document.querySelector('.list-episodes');
  const closeBtn = document.getElementById('close-modal-btn');

  // Close button
  closeBtn.addEventListener('click', () => close());

  function update(podcast) {
    imgEl.src = podcast.image;
    imgEl.alt = `${podcast.title} cover`;
    titleEl.textContent = podcast.title;
    descEl.textContent = podcast.description;

    genreContainer.innerHTML = ''; 
    const genreTitles = getGenreTitles(podcast.genres);
    genreTitles.forEach(title => {
      const btn = document.createElement('button');
      btn.classList.add('genre-button');
      btn.textContent = title;
      genreContainer.appendChild(btn);
    });

    dateEl.textContent = `Updated ${DateUtils.format(podcast.updated)}`;


    episodesContainer.innerHTML = ''; 
    if (podcast.seasons && podcast.seasons > 0) {
      for (let i = 1; i <= podcast.seasons; i++) {
        const ep = document.createElement('p');
        ep.textContent = `Season ${i}`;
        episodesContainer.appendChild(ep);
      }
    }
  }

  function open(podcast) {
    update(podcast);
    modalContainer.classList.remove('hidden');
  }

  function close() {
    modalContainer.classList.add('hidden');
  }

  return { open, close, update };
})();
