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
    textSpan.textContent = 'أظهر الترجمة الإنجليزية — Show English Translation';
  } else {
    textSpan.textContent = 'أخفِ الترجمة الإنجليزية — Hide English Translation';
  }
}
