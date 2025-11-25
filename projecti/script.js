/* Movie Store (local) - script.js
 - Place your movies in /movies/ (use the exact filenames below)
 - Place thumbnails in /thumbnails/ (exact filenames below)
 - Cart stored in localStorage under 'ms_cart'
*/

// ---------- movie & thumbnail lists (relative filenames) ----------
const rawMovies = [
  "Agent.2023.UNCUT.1080p.DS4K.WEB-DL.Hindi.5.1-Telugu.5.1.x264.mkv",
  "Baby.John.2024.1080p.Hindi.EXT-CUT.WEB-DL.5.1.HC-ESub.x264.mkv",
  "Chhaava.2025.DS4K.1080p.Hindi.WEB-DL.5.1x264.mkv",
  "Coolie.2025.1080p.DS4K.WEB-DL.Hindi.LiNE-Tamil.5.1.x264.mkv",
  "Deva.2025.1080p.WEB.HIN.1XBET.mp4",
  "F1-The.Movie.2025.1080p.DS4K.WEB-DL.Hindi.5.1-English.5.1.x264.mkv",

  "GOAT.1080p.ORG.DD5.1.HD.mkv",
  "Good.Bad.Ugly.2025.1080p.WEB-DL.Hindi.2.0-Tamil.2.0.x264.mkv",
  "Kalki.2898.AD.2024.WebRip.720p.Hindi.AAC.5.1.x264.ESub..mkv",
  "Kannappa.2025.1080p.Hindi.WEB-DL.5.1.x264.mkv",

  "Kantara-Chapter.1.2025.1080p.WEB-DL.Hindi.Line-Kannada.5.1.x264.mkv",
  "Madharaasi.2025.1080p.WEB-DL.Hindi.5.1-Tamil.5.1.x264.mkv",
  "Mahavatar.Narsimha.2025.1080p.Hindi.WEB-DL.5.1.x264.mkv",

  "Param.Sundari.2025.1080p.Hindi.WEB-DL.5.1.x264.mkv",

  "RRR.1080p.BR.ORG.mkv",
  "Saiyaara.2025.DS4K.1080p.Hindi.WEB-DL.5.1.x264.mkv",
  "Salaar.Part.1.2023.UnCut.Hindi.ORG.DD5.1.WEB.DL.720p.x264..mkv",
  "Shiddat (2021) Hindi 1080p WEB-DL ESub.mkv",

  "Stree.2-Sarkate.Ka.Aatank.2024.1080p.Hindi.WEB-DL.5.1.ESub.x264.mkv",

  "They Call Him OG (2025) {Hindi-Tamil-Telugu-Kannada-Malayalam} 720p WEB-DL ESub .mkv",
  "Vettaiyan 2024 AMZN Dual Audio Hindi (ORG 5.1) 1080p WEB-DL x264 ESubs.mkv",
  "Vidaamuyarchi 2025 NF Dual Audio Hindi (ORG 5.1) 1080p WEB-DL.mkv",
  "War.2.2025.1080p.Hindi.DS4K.WEB-DL.5.1.x264.mkv",
  "War.2019.1080p.BluRay.Hindi.5.1.x264.mkv"
];

const thumbnailFiles = [
  "Agent.2023.UNCUT.1080p.DS4K.WEB-DL.Hindi.5.1-Telugu.5.1.x264.jpeg",
  "Baby.John.2024.1080p.Hindi.EXT-CUT.WEB-DL.5.1.HC-ESub.x264.jpeg",
  "Chhaava.2025.DS4K.1080p.Hindi.WEB-DL.5.1x264.jpeg",
  "Coolie.2025.1080p.DS4K.WEB-DL.Hindi.LiNE-Tamil.5.1.x264.jpeg",
  "Deva.2025.1080p.WEB.HIN.1XBET.jpeg",
  "F1-The.Movie.2025.1080p.DS4K.WEB-DL.Hindi.5.1-English.5.1.x264.jpeg",

  "GOAT.1080p.ORG.DD5.1.HD.jpeg",
  "Good.Bad.Ugly.2025.1080p.WEB-DL.Hindi.2.0-Tamil.2.0.x264.jpeg",
  "Kalki.2898.AD.2024.WebRip.720p.Hindi.AAC.5.1.x264.ESub..jpeg",
  "Kannappa.2025.1080p.Hindi.WEB-DL.5.1.x264.jpeg",

  "Kantara-Chapter.1.2025.1080p.WEB-DL.Hindi.Line-Kannada.5.1.x264.jpeg",
  "Madharaasi.2025.1080p.WEB-DL.Hindi.5.1-Tamil.5.1.x264.jpeg",
  "Mahavatar.Narsimha.2025.1080p.Hindi.WEB-DL.5.1.x264.jpeg",

  "Param.Sundari.2025.1080p.Hindi.WEB-DL.5.1.x264.jpeg",

  "RRR.1080p.BR.ORG.jpeg",
  "Saiyaara.2025.DS4K.1080p.Hindi.WEB-DL.5.1.x264.jpeg",
  "Salaar.Part.1.2023.UnCut.Hindi.ORG.DD5.1.WEB.DL.720p.x264..jpeg",
  "Shiddat (2021) Hindi 1080p WEB-DL ESub.jpeg",

  "Stree.2-Sarkate.Ka.Aatank.2024.1080p.Hindi.WEB-DL.5.1.ESub.x264.jpeg",

  "download (17).jpeg",
  "Vettaiyan 2024 AMZN Dual Audio Hindi (ORG 5.1) 1080p WEB-DL x264 ESubs.jpeg",
  "Vidaamuyarchi 2025 NF Dual Audio Hindi (ORG 5.1) 1080p WEB-DL.jpeg",
  "War.2.2025.1080p.Hindi.DS4K.WEB-DL.5.1.x264.jpeg",
  "War.2019.1080p.BluRay.Hindi.5.1.x264.jpeg"
];

// ---------- helpers ----------
function removeExt(filename){ return filename.replace(/\.[^/.]+$/,''); }
function humanTitle(fname){
  return removeExt(fname).replace(/\.+/g,' ').replace(/[_\-\{\}\(\)\[\]]/g,' ').replace(/\b(DS4K|WEB-DL|WEB|BR|UNCUT|CUT|ORG|x264|HDTS|HDRip|BluRay|1XBET|NF|AMZN)\b/gi,'').replace(/\s{2,}/g,' ').trim();
}
function escapeHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

// ---------- build movie objects ----------
const movies = rawMovies.map((fname, idx) => {
  const title = humanTitle(fname);
  const poster = thumbnailFiles[idx] ? ('thumbnails/' + thumbnailFiles[idx]) : null;
  const yearMatch = fname.match(/(19|20)\\d{2}/);
  const year = yearMatch ? yearMatch[0] : '';
  const lower = fname.toLowerCase();
  let category = 'all';
  if(/kalki|salaar|kantara|mahavatar|madharaasi|maha/i.test(lower)) category = 'south';
  if(/war|agent|f1|good.bad|goat|coolie/i.test(lower)) category = 'action';
  if(/stree|shiddat|horror/i.test(lower)) category = 'horror';
  if(/tamil/i.test(lower)) category = 'tamil';
  if(/hindi|hin|dub/i.test(lower)) category = 'hindi';
  let price = 49;
  if(year && parseInt(year) >= 2024) price = 79;
  if(/4k|ds4k/.test(lower)) price = Math.max(price, 99);
  return {
    id: idx+1,
    filename: fname,
    title,
    year,
    category,
    quality: (fname.match(/4K|DS4K|1080p|720p/gi) || [''])[0],
    price,
    poster,
    video: 'movies/' + fname
  };
});

// ---------- DOM refs ----------
const grid = document.getElementById('grid');
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');

const modalBack = document.getElementById('modalBack');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

const cartBack = document.getElementById('cartBack');
const cartClose = document.getElementById('cartClose');
const cartList = document.getElementById('cartList');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

const payBack = document.getElementById('payBack');
const payClose = document.getElementById('payClose');
const payAmount = document.getElementById('payAmount');
const payMsg = document.getElementById('payMsg');
const payUPI = document.getElementById('payUPI');
const payCard = document.getElementById('payCard');

// ---------- cart (localStorage) ----------
let cart = JSON.parse(localStorage.getItem('ms_cart') || '[]');
function saveCart(){ localStorage.setItem('ms_cart', JSON.stringify(cart)); updateCartUI(); }
function updateCartUI(){ cartCount.textContent = cart.length; cartTotal.textContent = cart.reduce((s,i)=>s+(i.price||0),0); }

// ---------- render grid ----------
function createCard(m){
  const el = document.createElement('article');
  el.className = 'card';
  el.innerHTML = `
    <div class="thumb">${m.poster?`<img src="${m.poster}" alt="${escapeHtml(m.title)} poster">`:`<div class="placeholder">${escapeHtml(m.title)}</div>`}</div>
    <div class="meta">
      <div>
        <div class="title">${escapeHtml(m.title)}</div>
        <div class="sub">${m.year} • ${m.quality}</div>
      </div>
      <div style="text-align:right"><div class="price">₹${m.price}</div></div>
    </div>
    <div class="btn-row">
      <button class="btn" onclick="openDetails(${m.id})">Details</button>
      <button class="btn primary" onclick="addToCart(${m.id})">Add to Cart</button>
    </div>
  `;
  return el;
}
function renderList(list){ grid.innerHTML=''; if(!list.length){ grid.innerHTML = '<p style="color:var(--muted)">No movies found.</p>'; return; } list.forEach(m=>grid.appendChild(createCard(m))); }
renderList(movies);

// ---------- filters ----------
searchInput.addEventListener('input', applyFilters);
categorySelect.addEventListener('change', applyFilters);
function applyFilters(){
  const q = (searchInput.value||'').toLowerCase();
  const cat = categorySelect.value;
  const filtered = movies.filter(m=>{
    const matchQ = m.title.toLowerCase().includes(q) || (m.year && m.year.includes(q));
    const matchCat = (cat==='all') || (m.category===cat);
    return matchQ && matchCat;
  });
  renderList(filtered);
}

// ---------- details modal ----------
window.openDetails = function(id){
  const m = movies.find(x=>x.id===id); if(!m) return;
  modalContent.innerHTML = `
    <div class="modal-content">
      <div>${m.poster?`<img src="${m.poster}" alt="${escapeHtml(m.title)} poster">`:`<div style="height:340px;background:#0b1220;border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--muted)">${escapeHtml(m.title)}</div>`}</div>
      <div class="info">
        <h2>${escapeHtml(m.title)} ${m.year?`(${m.year})`:''}</h2>
        <p class="sub">Quality: ${m.quality||'N/A'}</p>
        <p style="margin-top:12px;color:var(--muted)">Category: ${m.category}</p>
        <p style="margin-top:12px;font-weight:700">Price: ₹${m.price}</p>
        <div style="margin-top:12px;display:flex;gap:8px">
          <button class="btn primary" onclick="addToCart(${m.id})">Add to Cart</button>
          <button class="btn" onclick="closeModal()">Close</button>
        </div>
      </div>
    </div>
  `;
  modalBack.style.display='flex'; modalBack.setAttribute('aria-hidden','false');
};
modalClose.addEventListener('click', closeModal);
modalBack.addEventListener('click', (e)=>{ if(e.target===modalBack) closeModal(); });
function closeModal(){ modalBack.style.display='none'; modalBack.setAttribute('aria-hidden','true'); }

// ---------- cart ----------
window.addToCart = function(id){
  const m = movies.find(x=>x.id===id); if(!m) return; cart.push(m); saveCart(); alert(m.title + ' added to cart'); 
};
cartBtn.addEventListener('click', ()=>{ renderCart(); cartBack.style.display='flex'; cartBack.setAttribute('aria-hidden','false'); });
cartClose.addEventListener('click', ()=>{ cartBack.style.display='none'; cartBack.setAttribute('aria-hidden','true'); });

function renderCart(){
  cartList.innerHTML=''; if(!cart.length){ cartList.innerHTML='<p style=\"color:var(--muted)\">Cart is empty.</p>'; cartTotal.textContent='0'; return; }
  cart.forEach((c, idx)=>{
    const div = document.createElement('div'); div.className='cart-item';
    div.innerHTML = `<div>${escapeHtml(c.title)} <small style=\"color:var(--muted)\">(${c.year})</small></div><div>₹${c.price} <button onclick="removeFromCart(${idx})">Remove</button></div>`;
    cartList.appendChild(div);
  });
  cartTotal.textContent = cart.reduce((s,i)=>s+(i.price||0),0);
}
window.removeFromCart = function(index){ cart.splice(index,1); saveCart(); renderCart(); };

// ---------- checkout / fake payment ----------
checkoutBtn.addEventListener('click', ()=>{
  const total = cart.reduce((s,i)=>s+(i.price||0),0);
  if(total<=0){ alert('Cart is empty'); return; }
  payAmount.textContent = total; payMsg.textContent=''; payBack.style.display='flex'; payBack.setAttribute('aria-hidden','false');
});
payClose.addEventListener('click', ()=>{ payBack.style.display='none'; payBack.setAttribute('aria-hidden','true'); });

function finishPayment(){ payMsg.textContent='✔ Payment successful — items unlocked.'; cart=[]; saveCart(); renderCart(); setTimeout(()=>{ payBack.style.display='none'; payBack.setAttribute('aria-hidden','true'); cartBack.style.display='none'; cartBack.setAttribute('aria-hidden','true'); },1200); }
payUPI.addEventListener('click', ()=>{ payMsg.textContent='Processing UPI...'; setTimeout(finishPayment,1200); });
payCard.addEventListener('click', ()=>{ payMsg.textContent='Processing Card...'; setTimeout(finishPayment,1400); });

// ---------- init ----------
updateCartUI();
