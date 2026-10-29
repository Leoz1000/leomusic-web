// Removes the opening titles (see index.html), as LeoTv does: once the icon's
// light has come on and the app has drawn its first screen, whichever comes
// last, the icon grows a little and fades; never later than five seconds.
// A file, not inline: the server's Content-Security-Policy allows scripts
// from 'self' only.
(function () {
  var intro = document.getElementById('intro');
  if (!intro) return;
  if (getComputedStyle(intro).display === 'none') { intro.remove(); return; }
  var lit = false, drawn = false, gone = false;
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function leave() {
    if (gone) return;
    gone = true;
    intro.className = 'is-out';
    setTimeout(function () { intro.remove(); }, 500);
  }
  function check() { if (lit && drawn) setTimeout(leave, 120); }
  if (reduced) setTimeout(function () { lit = true; check(); }, 600);
  else intro.addEventListener('animationend', function (e) { if (e.animationName === 'intro-light') { lit = true; check(); } });
  var root = document.getElementById('root');
  function seen() { if (root && root.firstElementChild) { drawn = true; check(); return true; } return false; }
  if (!seen() && root && window.MutationObserver) {
    var mo = new MutationObserver(function () { if (seen()) mo.disconnect(); });
    mo.observe(root, { childList: true });
  }
  setTimeout(leave, 5000);
})();
