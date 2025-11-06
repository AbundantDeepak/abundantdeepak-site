
async function loadSettings(){ const r=await fetch('/content/settings.json'); return await r.json(); }
async function loadBooks(){ const r=await fetch('/content/books.json'); return await r.json(); }
function el(tag, attrs={}, children=[]){ const e=document.createElement(tag); Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v)); (Array.isArray(children)?children:[children]).forEach(c=>{ if(typeof c==='string') e.appendChild(document.createTextNode(c)); else if(c) e.appendChild(c); }); return e; }
async function renderBooksGrid(id){
  const root=document.getElementById(id);
  const list=(await loadBooks()).filter(b=>b.status!=='archived');
  const grid=el('div',{class:'grid'});
  list.forEach(b=>{
    const card=el('div',{class:'card'},[
      el('img',{src:b.cover_image,alt:b.title}),
      el('div',{class:'pad'},[
        el('div',{},[ b.featured?el('span',{class:'badge'},'Featured'):null ]),
        el('div',{class:'h3'},b.title),
        el('div',{class:'muted'},b.blurb||''),
        el('div',{style:'margin-top:10px'}, el('a',{class:'button',href:`/books/book.html?slug=${b.slug}`},'View book'))
      ])
    ]);
    grid.appendChild(card);
  });
  root.appendChild(grid);
}
async function renderBookDetail(id){
  const params=new URLSearchParams(location.search);
  const slug=params.get('slug');
  const root=document.getElementById(id);
  const list=await loadBooks();
  const b=list.find(x=>x.slug===slug)||list[0];
  document.title=b.title+' – Abundant Deepak';
  const left=el('div',{},[ el('img',{src:b.cover_image,alt:b.title,style:'width:100%;max-width:400px;border-radius:12px;border:1px solid #242424'}) ]);
  const right=el('div',{},[
    el('h1',{},b.title),
    el('p',{class:'muted'},b.description||''),
    el('div',{style:'margin:12px 0'},[
      el('a',{class:'button',href:b.retail_links?.Books2Read||'#',target:'_blank'},'Get the book')
    ]),
    el('div',{class:'muted'},'Author: '+(b.author||''))
  ]);
  const wrap=el('div',{class:'cover'},[left,right]);
  root.appendChild(wrap);
}
