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