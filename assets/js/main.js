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

  function getQueryLang() {
    try {
      var l = new URLSearchParams(window.location.search).get('lang');
      return (l === 'en' || l === 'ru') ? l : null;
    } catch (e) { return null; }
  }

  function syncUrlLang(lang) {
    try {
      var url = new URL(window.location.href);
      if (url.searchParams.get('lang') !== lang) {
        url.searchParams.set('lang', lang);
        history.replaceState({}, '', url);
      }
    } catch (e) {}
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
    syncUrlLang(lang);
  }

  applyTheme(safeGet(STORAGE_KEYS.theme, 'light'));
  applyLang(getQueryLang() || safeGet(STORAGE_KEYS.lang, root.getAttribute('data-lang') || 'ru'));

  document.addEventListener('click', function (evt) {
    if (evt.target.closest('.toggle-theme')) {
      applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
      return;
    }
    if (evt.target.closest('.toggle-lang')) {
      applyLang(root.getAttribute('data-lang') === 'en' ? 'ru' : 'en');
    }
  });
})();
