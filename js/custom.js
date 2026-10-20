/* Abhishek Maurya portfolio: small enhancements on top of js/main.js */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Typing animation for the hero (areas of interest) ---------- */
  var typingEl = document.getElementById('typing-animation');
  if (typingEl) {
    var phrases = (typingEl.getAttribute('data-phrases') || '')
      .split('|')
      .map(function (p) { return p.trim(); })
      .filter(Boolean);

    if (reduceMotion || phrases.length === 0) {
      // Static fallback: show all interests at once, no motion.
      typingEl.textContent = phrases.join(' · ');
    } else {
      var textNode = document.createTextNode('');
      var cursor = document.createElement('span');
      cursor.className = 'typed-cursor';
      cursor.setAttribute('aria-hidden', 'true');
      typingEl.textContent = '';
      typingEl.appendChild(textNode);
      typingEl.appendChild(cursor);

      var phraseIndex = 0;
      var charIndex = 0;
      var deleting = false;

      var tick = function () {
        var phrase = phrases[phraseIndex];
        charIndex += deleting ? -1 : 1;
        textNode.nodeValue = phrase.slice(0, charIndex);

        var delay = deleting ? 45 : 95;
        if (!deleting && charIndex === phrase.length) {
          deleting = true;
          delay = 1600; // pause on the full phrase
        } else if (deleting && charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          delay = 350;
        }
        setTimeout(tick, delay);
      };
      tick();
    }
  }

  /* Closing the mobile menu after choosing a section is handled in
     onePageClick() in js/main.js, so the scroll target is measured correctly. */

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('current-year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
})();
