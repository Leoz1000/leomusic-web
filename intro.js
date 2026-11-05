// Removes the opening titles (see index.html), as LeoTv does: once the L has
// settled (its animation is the last to end; with reduced motion it is a plain
// fade), has rested for a moment and the app has drawn its first screen,
// whichever comes last, the overlay fades. If the app is late the titles stay
// on the resting L (they never loop); never later than six seconds.
// A file, not inline: the server's Content-Security-Policy allows scripts
// from 'self' only.
(function () {
  var REST = 300; // the violet L rests before the overlay fades
  var FADE = 380; // keep equal to EXIT in scripts/brand_intro.py
  var intro = document.getElementById('intro');
  if (!intro) return;
  if (getComputedStyle(intro).display === 'none') { intro.remove(); return; }
  var settled = false, drawn = false, gone = false;
  function leave() {
    if (gone) return;
    gone = true;
    intro.className = 'is-out';
    setTimeout(function () { intro.remove(); }, FADE + 40);
  }
  function check() { if (settled && drawn) leave(); }
  intro.addEventListener('animationend', function (e) {
    if (settled || (e.target.getAttribute('class') || '').indexOf('intro__l') < 0) return;
    setTimeout(function () { settled = true; check(); }, REST);
  });
  var root = document.getElementById('root');
  function seen() { if (root && root.firstElementChild) { drawn = true; check(); return true; } return false; }
  if (!seen() && root && window.MutationObserver) {
    var mo = new MutationObserver(function () { if (seen()) mo.disconnect(); });
    mo.observe(root, { childList: true });
  }
  setTimeout(leave, 6000);
})();
