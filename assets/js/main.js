(function () {
  'use strict';

  var STORAGE_KEYS = { theme: 'paper.theme', lang: 'paper.lang' };
  var root = document.documentElement;

  function safeGet(key, fallback) {
    try { return localStorage.getItem(key) || fallback; } catch (e) { return fallback; }
  }
  function safeSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    var meta = document.getElementById('theme-color-meta');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0f1115' : '#ffffff');
    safeSet(STORAGE_KEYS.theme, theme);
  }

  function applyLang(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);
    safeSet(STORAGE_KEYS.lang, lang);
  }

  var initialTheme = safeGet(STORAGE_KEYS.theme, 'light');
  var initialLang = safeGet(STORAGE_KEYS.lang, root.getAttribute('data-lang') || 'en');
  applyTheme(initialTheme);
  applyLang(initialLang);

  document.addEventListener('click', function (evt) {
    var themeBtn = evt.target.closest('.toggle-theme');
    if (themeBtn) {
      var nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      return;
    }
    var langBtn = evt.target.closest('.toggle-lang');
    if (langBtn) {
      var nextLang = root.getAttribute('data-lang') === 'ru' ? 'en' : 'ru';
      applyLang(nextLang);
    }
  });
})();
