function toggleTranslation(button) {
	const section = button.closest('.translation-section');
	const content = section.querySelector('.translation-content');
	const isVisible = content.classList.contains('visible');

	content.classList.toggle('visible');
	button.classList.toggle('active');
	button.setAttribute('aria-expanded', !isVisible);
	content.setAttribute('aria-hidden', isVisible);

	const textSpan = button.querySelector('.toggle-text');
	if (isVisible) {
		textSpan.textContent = 'Show English Translation';
	} else {
		textSpan.textContent = 'Hide English Translation';
	}
}

(function () {
	const searchInput = document.getElementById('story-search');
	const resultsGrid = document.getElementById('search-results');
	const emptyMsg = document.getElementById('search-empty');
	if (!searchInput || !resultsGrid) return;

	let stories = null;

	function ensureStories() {
		if (stories !== null) return Promise.resolve();
		return fetch('/index.json')
			.then(r => r.json())
			.then(data => { stories = data; })
			.catch(() => { stories = []; });
	}

	function renderCard(story) {
		const star = story.original
			? '<span class="card-original-star" title="قصّة أصليّة">★</span>'
			: '';
		const excerpt = story.description || '';
		return '<article class="story-card">' +
			'<a href="' + story.url + '" class="story-card-link">' +
			'<div class="card-arch"></div>' +
			'<div class="card-content">' +
			'<h3 class="card-title">' + story.title + '</h3>' +
			star +
			'<div class="card-divider">— ◆ —</div>' +
			'<p class="card-excerpt">' + excerpt + '</p>' +
			'<span class="card-read-more">اقرأ الحكاية ←</span>' +
			'</div></a></article>';
	}

	searchInput.addEventListener('input', function () {
		const query = this.value.trim().toLowerCase();

		if (!query) {
			resultsGrid.innerHTML = '';
			emptyMsg.hidden = true;
			return;
		}

		ensureStories().then(function () {
			const matches = stories.filter(function (s) {
				return s.title.toLowerCase().includes(query) ||
					(s.title_en && s.title_en.toLowerCase().includes(query)) ||
					(s.description && s.description.toLowerCase().includes(query)) ||
					(s.tags && s.tags.some(function (t) { return t.toLowerCase().includes(query); }));
			});

			if (matches.length === 0) {
				resultsGrid.innerHTML = '';
				emptyMsg.hidden = false;
			} else {
				resultsGrid.innerHTML = matches.map(renderCard).join('');
				emptyMsg.hidden = true;
			}
		});
	});
})();
