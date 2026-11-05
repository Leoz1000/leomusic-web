// Opening titles once per session (see index.html). A file, not inline: the
// server's Content-Security-Policy allows scripts from 'self' only.
try{if(sessionStorage.getItem('leomusic.intro'))document.documentElement.className+=' no-intro';else sessionStorage.setItem('leomusic.intro','1')}catch(e){}
// The chosen theme, before the first paint: a person who picked Chiaro on a phone set to dark
// would otherwise see a black flash. The app keeps this copy in step (src/library/settings.ts).
try{var t=localStorage.getItem('leomusic.theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}
