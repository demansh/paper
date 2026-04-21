(function () {
  'use strict';

  var STORAGE_KEYS = { theme: 'paper.theme' };
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

  applyTheme(safeGet(STORAGE_KEYS.theme, 'light'));

  document.addEventListener('click', function (evt) {
    var themeBtn = evt.target.closest('.toggle-theme');
    if (themeBtn) {
      var nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    }
  });
})();
