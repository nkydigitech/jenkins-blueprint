
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

let currentId = 1;
const STORAGE_KEY = 'jenkins-blueprint-progress';
const THEME_KEY = 'jenkins-blueprint-theme';

function loadProgress(){
  try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {completed:{}, last:1}; } catch{ return {completed:{}, last:1}; }
}
function saveProgress(p){ localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); }
function loadTheme(){ return localStorage.getItem(THEME_KEY) || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark':'light'); }
function applyTheme(t){ document.documentElement.setAttribute('data-theme', t); localStorage.setItem(THEME_KEY, t); }

function getProgressPercent(progress){
  const total = window.CHAPTERS.length;
  const done = Object.keys(progress.completed).length;
  return Math.round((done/total)*100);
}

function renderSidebar(){
  const progress = loadProgress();
  const list = $('#chaptersList');
  list.innerHTML = '';
  window.CHAPTERS.forEach(ch=>{
    const done = !!progress.completed[ch.id];
    const div = document.createElement('div');
    div.className = 'chapter-item' + (ch.id===currentId ? ' active':'');
    div.onclick = ()=>navigateTo(ch.id);
    div.innerHTML = `
      <div class="chapter-num">${ch.id}</div>
      <div class="ch-meta">
        <div class="ch-title">${ch.emoji} ${ch.title.split('—')[0].trim().split(' ')[0]} ${ch.title.includes('—') ? '— '+ch.title.split('—').slice(1).join('—') : ch.title}</div>
        <div class="ch-desc">${ch.desc}</div>
      </div>
      <div class="check ${done?'done':''}">${done?'✓':''}</div>
    `;
    // Show full title on data attr
    div.title = ch.title;
    list.appendChild(div);
  });
  const percent = getProgressPercent(progress);
  $('#progressFill').style.width = percent + '%';
  $('#progressText').textContent = percent + '% • ' + Object.keys(progress.completed).length + '/' + window.CHAPTERS.length;
}

function copyCode(btn){
  const pre = btn.closest('.code-block').querySelector('pre code');
  const text = pre.innerText;
  navigator.clipboard.writeText(text).then(()=>{
    const old = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(()=>btn.textContent=old, 1200);
  });
}
window.copyCode = copyCode;

function renderChapter(id){
  const ch = window.CHAPTERS.find(c=>c.id===id);
  if(!ch) return;
  currentId = id;
  const progress = loadProgress();
  progress.last = id;
  saveProgress(progress);
  const wrap = $('#content');
  wrap.innerHTML = `
    ${ch.content}
    <div class="nav-row">
      <div style="display:flex;gap:8px">
        <button class="btn btn-ghost" id="prevBtn" ${id===1?'disabled':''}>← Previous</button>
        <button class="btn btn-primary" id="nextBtn" ${id===window.CHAPTERS.length?'disabled':''}>Next →</button>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn" id="completeBtn">${progress.completed[id]?'✅ Completed':'✓ Mark Complete'}</button>
        <button class="btn btn-ghost" onclick="window.scrollTo({top:0,behavior:'smooth'})">↑ Top</button>
      </div>
    </div>
    <div class="footer">
      <div>© 2026 Jenkins Blueprint • Factory Assembly Line • Theme #D24939 • Part of nkydigitech Blueprint Series</div>
      <div><kbd>G</kbd>+<kbd>N</kbd> next, <kbd>G</kbd>+<kbd>P</kbd> prev, <kbd>D</kbd> dark toggle</div>
    </div>
  `;
  renderSidebar();
  $('#currentCrumb').textContent = `${id}. ${ch.title}`;
  // bind
  const prev = $('#prevBtn');
  const next = $('#nextBtn');
  const comp = $('#completeBtn');
  if(prev) prev.onclick = ()=>navigateTo(id-1);
  if(next) next.onclick = ()=>navigateTo(id+1);
  if(comp) comp.onclick = ()=>{
    const p = loadProgress();
    if(p.completed[id]) delete p.completed[id];
    else p.completed[id]=true;
    saveProgress(p);
    renderSidebar();
    comp.textContent = p.completed[id]?'✅ Completed':'✓ Mark Complete';
    // auto update progress bar
    // confetti? just pulse
    $('#progressFill').animate([{transform:'scaleY(1)'},{transform:'scaleY(1.6)'},{transform:'scaleY(1)'}],{duration:300});
  };
  // close mobile sidebar after nav
  $('#sidebar').classList.remove('open');
  // highlight copy buttons already handled global
  // scroll to top
  window.scrollTo({top:0, behavior:'smooth'});
}

function navigateTo(id){
  if(id<1 || id>window.CHAPTERS.length) return;
  renderChapter(id);
  history.replaceState(null,'','#ch'+id);
}

function init(){
  applyTheme(loadTheme());
  const p = loadProgress();
  let startId = p.last || 1;
  // hash override
  const hash = location.hash;
  if(hash && hash.match(/^#ch(\d+)/)){
    const m = parseInt(hash.match(/^#ch(\d+)/)[1]);
    if(m>=1 && m<=window.CHAPTERS.length) startId = m;
  }
  // bind theme toggle
  $('#themeToggle').onclick = ()=>{
    const cur = document.documentElement.getAttribute('data-theme');
    const nxt = cur==='dark'?'light':'dark';
    applyTheme(nxt);
  };
  $('#hamburger').onclick = ()=>{ $('#sidebar').classList.toggle('open'); };
  // keyboard shortcuts
  document.addEventListener('keydown', (e)=>{
    if(e.key.toLowerCase()==='d' && !e.metaKey && !e.ctrlKey && document.activeElement.tagName!=='INPUT'){
      const cur = document.documentElement.getAttribute('data-theme');
      applyTheme(cur==='dark'?'light':'dark');
    }
    if(e.key==='ArrowRight' && e.altKey){ navigateTo(currentId+1); }
    if(e.key==='ArrowLeft' && e.altKey){ navigateTo(currentId-1); }
  });
  renderChapter(startId);
  renderSidebar();
}
document.addEventListener('DOMContentLoaded', init);
