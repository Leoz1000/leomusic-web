// Opening titles once per day (see index.html). A file, not inline: the
// server's Content-Security-Policy allows scripts from 'self' only.
// The titles add about two seconds to a cold launch, so only the first launch of each local day shows them.
// If storage is blocked the titles simply show every time.
try{var d=new Date(),k=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();if(localStorage.getItem('leomusic.intro.v2')===k)document.documentElement.className+=' no-intro';else localStorage.setItem('leomusic.intro.v2',k)}catch(e){}
// The chosen theme, before the first paint: a person who picked Chiaro on a phone set to dark
// would otherwise see a black flash. The app keeps this copy in step (src/library/settings.ts).
try{var t=localStorage.getItem('leomusic.theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}
