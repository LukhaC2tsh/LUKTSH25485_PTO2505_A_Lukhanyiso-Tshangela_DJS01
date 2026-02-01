// modal.js
import { getGenreTitles } from './podcasts.js';

export const modal = (() => {
  const modalContainer = document.getElementById('podcast-modal');
  const imgEl = document.getElementById('podcast-thumbnail');
  const titleEl = document.getElementById('podcast-title');
  const descEl = document.getElementById('podcast-desc');
  const genreWrapper = document.querySelector('.genre-buttons');
  const dateEl = document.getElementById('podcast-date');
  const episodesWrapper = document.querySelector('.list-episodes');
  const closeBtn = document.getElementById('close-modal-btn');

  // Close button
  closeBtn.addEventListener('click', () => close());

  function update(podcast) {
    imgEl.src = podcast.image;
    imgEl.alt = `${podcast.title} cover`;
    titleEl.textContent = podcast.title;
    descEl.textContent = podcast.description;

    genreWrapper.innerHTML = ''; 
    const genreTitles = getGenreTitles(podcast.genres);
    genreTitles.forEach(title => {
      const btn = document.createElement('button');
      btn.classList.add('genre-button');
      btn.textContent = title;
      genreWrapper.appendChild(btn);
    });

    const date = new Date(podcast.updated);
    dateEl.textContent = `Updated ${date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })}`;

    episodesWrapper.innerHTML = ''; 
    if (podcast.seasons && podcast.seasons > 0) {
      for (let i = 1; i <= podcast.seasons; i++) {
        const ep = document.createElement('p');
        ep.textContent = `Season ${i}`;
        episodesWrapper.appendChild(ep);
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
