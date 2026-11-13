/* =====================================================
   Repository UM/MULOK - Prototype Akademik
   JavaScript Vanilla, tanpa backend. Semua data fiktif.
   ===================================================== */

/* ---------- 1. DATA SIMULASI (fiktif) ---------- */
const DATA = [
  { id:1, title:"Literasi Informasi Mahasiswa dalam Pemanfaatan Sumber Informasi Digital", author:"Andi Pratama", year:2024,
    type:"Skripsi", subject:"Literasi Informasi", prodi:"S1 Ilmu Perpustakaan", faculty:"Fakultas Ilmu Sosial (simulasi)", status:"valid",
    abstract:"Penelitian ini menggambarkan kemampuan mahasiswa dalam menemukan, menilai, dan memakai sumber informasi digital untuk tugas akademik. Data simulasi menunjukkan kemampuan evaluasi sumber masih perlu ditingkatkan.",
    keywords:["literasi informasi","sumber digital","mahasiswa"] },
  { id:2, title:"Pemanfaatan Repository Digital sebagai Sumber Referensi Akademik", author:"Siti Rahmawati", year:2023,
    type:"Skripsi", subject:"Repository Digital", prodi:"S1 Ilmu Perpustakaan", faculty:"Fakultas Ilmu Sosial (simulasi)", status:"restricted",
    abstract:"Studi ini membahas seberapa sering mahasiswa memakai repository institusi untuk mencari referensi. Hasil simulasi menunjukkan hambatan utama berupa kurangnya pengetahuan tentang cara mengakses full text.",
    keywords:["repository","referensi akademik","akses terbuka"] },
  { id:3, title:"Evaluasi Sistem Temu Kembali Informasi pada OPAC Perpustakaan", author:"Budi Santoso", year:2022,
    type:"Tesis", subject:"Sistem Temu Kembali Informasi", prodi:"S2 Ilmu Perpustakaan", faculty:"Pascasarjana (simulasi)", status:"broken",
    abstract:"Penelitian mengevaluasi ketepatan dan kelengkapan hasil penelusuran pada OPAC. Pengujian simulasi memakai ukuran precision dan recall pada sejumlah kueri pengguna.",
    keywords:["OPAC","temu kembali informasi","precision recall"] },
  { id:4, title:"Pengembangan Layanan Perpustakaan Digital di Perguruan Tinggi", author:"Rina Amelia", year:2024,
    type:"Skripsi", subject:"Perpustakaan Digital", prodi:"S1 Ilmu Perpustakaan", faculty:"Fakultas Ilmu Sosial (simulasi)", status:"none",
    abstract:"Karya ini merancang pengembangan layanan perpustakaan digital berdasarkan kebutuhan pemustaka. Rekomendasi simulasi mencakup layanan rujukan daring dan pelatihan pengguna.",
    keywords:["perpustakaan digital","layanan","perguruan tinggi"] },
  { id:5, title:"Perilaku Pencarian Informasi Mahasiswa dalam Lingkungan Akademik", author:"Dimas Saputra", year:2025,
    type:"Skripsi", subject:"Perilaku Informasi", prodi:"S1 Ilmu Perpustakaan", faculty:"Fakultas Ilmu Sosial (simulasi)", status:"valid",
    abstract:"Penelitian ini menelaah tahapan mahasiswa mencari informasi, dari mengenali kebutuhan hingga memverifikasi hasil. Temuan simulasi menunjukkan mesin pencari umum masih menjadi pilihan pertama.",
    keywords:["perilaku informasi","pencarian informasi","mahasiswa"] }
];
const STATUS = {
  valid:{ label:"Full Text Tersedia", cls:"s-valid" },
  restricted:{ label:"Akses Terbatas", cls:"s-restricted" },
  none:{ label:"Dokumen Belum Tersedia", cls:"s-none" },
  broken:{ label:"Tautan Dokumen Bermasalah", cls:"s-broken" }
};
const CRUMBS = {
  login:"Login", dashboard:"Dashboard", search:"Cari Koleksi",
  detail:"Cari Koleksi › Detail Karya Ilmiah", preview:"Cari Koleksi › Detail › Pratinjau Dokumen", flow:"Peta User Flow"
};

/* ---------- 2. STATE & HELPER ---------- */
const state = { user:null, current:null, retry:0 };
const $ = (id) => document.getElementById(id);
const byId = (id) => DATA.find((d) => d.id === Number(id));
let toastTimer;

function toast(msg){
  const t = $("toast"); t.textContent = msg; t.classList.remove("hidden");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.add("hidden"), 3200);
}
function badge(status){ return `<span class="badge ${STATUS[status].cls}">${STATUS[status].label}</span>`; }

/* ---------- 3. NAVIGASI ANTAR HALAMAN ---------- */
function go(view){
  // Halaman selain login dan peta flow memerlukan sesi aktif
  if(!state.user && view !== "login" && view !== "flow"){
    setLoginMsg("Silakan login terlebih dahulu.", "warn"); view = "login";
  }
  document.querySelectorAll(".view").forEach((v) => v.classList.add("hidden"));
  $("view-" + view).classList.remove("hidden");
  $("topbar").classList.toggle("hidden", !state.user);
  $("crumb").textContent = CRUMBS[view];
  document.querySelectorAll("[data-nav]").forEach((a) => a.classList.toggle("active", a.dataset.nav === view));
  $("nav").classList.remove("open"); $("profileMenu").classList.add("hidden");
  if(view === "search") runSearch(true);
  window.scrollTo(0, 0);
}
// Delegasi klik untuk semua elemen dengan atribut data-go
document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-go]");
  if(el){ e.preventDefault(); go(el.dataset.go); }
  if(!e.target.closest(".profile")) $("profileMenu").classList.add("hidden");
});
$("menuBtn").onclick = () => $("nav").classList.toggle("open");
$("profileBtn").onclick = () => $("profileMenu").classList.toggle("hidden");

/* ---------- 4. LOGIN & SESI ---------- */
function setLoginMsg(text, type){
  const b = $("loginError"); b.className = "alert " + type; b.textContent = text;
}
function doLogin(){
  const nim = $("nim").value.trim(), pass = $("pass").value.trim();
  if(!nim || !pass){
    const miss = !nim && !pass ? "NIM dan kata sandi" : (!nim ? "NIM" : "Kata sandi");
    setLoginMsg(miss + " belum diisi. Lengkapi data lalu tekan Login.", "err"); return;
  }
  state.user = nim; $("loginError").className = "hidden";
  $("greet").textContent = "Halo, " + nim;
  $("navUser").textContent = nim;
  $("nim").value = ""; $("pass").value = "";
  go("dashboard"); toast("Login berhasil (simulasi).");
}
$("btnLogin").onclick = doLogin;
["nim","pass"].forEach((id) => $(id).addEventListener("keydown", (e) => { if(e.key === "Enter") doLogin(); }));
$("togglePass").onclick = () => {
  const show = $("pass").type === "password";
  $("pass").type = show ? "text" : "password";
  $("togglePass").textContent = show ? "Sembunyikan" : "Tampilkan";
};
$("loginFlow").onclick = (e) => { e.preventDefault(); go("flow"); };
$("btnExpire").onclick = () => {
  state.user = null; go("login");
  setLoginMsg("Sesi Anda telah berakhir. Silakan login kembali untuk melanjutkan pencarian.", "warn");
  toast("Sesi telah berakhir (simulasi).");
};
$("btnLogout").onclick = () => {
  state.user = null; go("login"); setLoginMsg("Anda telah keluar.", "ok");
};

/* ---------- 5. DASHBOARD ---------- */
function renderStats(){
  const n = (s) => DATA.filter((d) => d.status === s).length;
  $("stats").innerHTML =
    `<div class="stat"><b>${DATA.length}</b>Total karya (fiktif)</div>` +
    `<div class="stat"><b>${n("valid")}</b>Full text tersedia</div>` +
    `<div class="stat"><b>${n("restricted")}</b>Akses terbatas</div>` +
    `<div class="stat"><b>${n("broken") + n("none")}</b>Bermasalah/belum ada</div>`;
}
$("quickBtn").onclick = () => {
  $("q").value = $("quickInput").value; document.querySelector('input[name=scope][value=title]').checked = true;
  go("search");
};
$("quickInput").addEventListener("keydown", (e) => { if(e.key === "Enter") $("quickBtn").click(); });

/* ---------- 6. PENCARIAN ---------- */
function scope(){ return document.querySelector("input[name=scope]:checked").value; }
function runSearch(instant){
  const kw = $("q").value.trim().toLowerCase(), sc = scope();
  $("results").innerHTML = ""; $("resultInfo").textContent = "";
  const finish = () => {
    $("loader").classList.add("hidden");
    // pencocokan tidak membedakan huruf besar/kecil
    const hits = DATA.filter((d) => !kw || String(d[sc]).toLowerCase().includes(kw));
    renderResults(hits, kw);
  };
  if(instant){ finish(); return; }
  $("loader").classList.remove("hidden");
  setTimeout(finish, 600); // simulasi proses pencarian
}
function renderResults(hits, kw){
  const names = { title:"judul", author:"penulis", subject:"subjek" };
  $("resultInfo").textContent = kw
    ? `${hits.length} hasil untuk "${kw}" pada ${names[scope()]}.` : `Menampilkan seluruh koleksi (${hits.length} karya ilmiah).`;
  if(!hits.length){
    $("results").innerHTML = `<div class="card empty"><h3>Karya ilmiah tidak ditemukan</h3>
      <p>Coba perluas atau ubah kata kunci: pakai kata yang lebih umum, periksa ejaan, atau ganti kategori pencarian (Judul, Penulis, Subjek).</p>
      <button class="btn primary" data-act="retry">Coba Cari Lagi</button></div>`; return;
  }
  $("results").innerHTML = hits.map((d) => `<article class="result">
    <h3>${d.title}</h3>
    <div class="note">${d.author} &bull; ${d.year} &bull; ${d.type} &bull; ${d.subject}</div>
    <p>${d.abstract.split(". ")[0]}.</p>
    ${badge(d.status)} <button class="btn primary small" data-detail="${d.id}">Lihat Detail</button>
  </article>`).join("");
}
$("btnSearch").onclick = () => runSearch(false);
$("q").addEventListener("keydown", (e) => { if(e.key === "Enter") runSearch(false); });
$("btnClear").onclick = () => { $("q").value = ""; runSearch(true); $("q").focus(); toast("Pencarian dihapus."); };
$("results").addEventListener("click", (e) => {
  const d = e.target.closest("[data-detail]");
  if(d) showDetail(d.dataset.detail);
  if(e.target.closest("[data-act=retry]")){ $("q").value = ""; $("q").focus(); runSearch(true); }
});

/* ---------- 7. DETAIL & AKSES FULL TEXT ---------- */
function showDetail(id){
  const d = byId(id); state.current = d.id; state.retry = 0;
  $("dStatus").className = "badge " + STATUS[d.status].cls; $("dStatus").textContent = STATUS[d.status].label;
  $("dTitle").textContent = d.title;
  $("dMeta").innerHTML = [["Penulis",d.author],["Tahun terbit",d.year],["Program studi",d.prodi],["Fakultas",d.faculty],["Jenis dokumen",d.type],["Subjek",d.subject]]
    .map(([k,v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("");
  $("dAbstract").textContent = d.abstract;
  $("dKeys").innerHTML = d.keywords.map((k) => `<span>${k}</span>`).join("");
  renderAccess(d);
  go("detail");
}
function renderAccess(d){
  const back = `<button class="btn ghost" data-go="search">Kembali ke Hasil Pencarian</button>`;
  const A = $("access");
  if(d.status === "valid"){
    A.innerHTML = `<div class="alert ok"><b>Full Text Tersedia.</b> Dokumen dapat dibuka.</div>
      <button class="btn primary" data-act="open">Buka Dokumen</button>`;
  } else if(d.status === "restricted"){
    A.innerHTML = `<div class="alert warn"><b>Akses Terbatas.</b> Dokumen ini memiliki pembatasan akses. Ajukan permohonan untuk meminta izin membaca.</div>
      <button class="btn primary" data-act="form">Ajukan Permohonan Akses</button>
      <form id="reqForm" class="hidden" novalidate>
        <label for="rName">Nama lengkap</label><input id="rName" type="text">
        <label for="rNim">NIM</label><input id="rNim" type="text" value="${state.user || ""}">
        <label for="rWhy">Alasan permohonan</label><textarea id="rWhy" rows="3"></textarea>
        <div id="rErr" class="alert err hidden"></div>
        <button class="btn primary block" type="submit">Kirim Permohonan</button>
      </form>
      <p class="note">Prosedur akses resmi mengikuti kebijakan perpustakaan. Permohonan di sini hanya simulasi.</p>`;
  } else if(d.status === "none"){
    A.innerHTML = `<div class="alert gray"><b>Dokumen Belum Tersedia.</b> Full text belum dapat diakses saat ini.</div>${back}`;
  } else {
    const alts = DATA.filter((x) => x.status === "valid" && x.id !== d.id);
    A.innerHTML = `<div id="brokenMsg" class="alert err"><b>Tautan Dokumen Bermasalah.</b> Dokumen gagal dibuka.</div>
      <div class="row"><button class="btn primary" data-act="retryLink">Coba Lagi</button>${back}</div>
      <h3 style="margin-top:18px">Karya ilmiah alternatif</h3><div class="alt-list">
      ${alts.map((a) => `<button class="btn ghost" data-alt="${a.id}">${a.title}</button>`).join("")}</div>`;
  }
}
$("access").addEventListener("click", (e) => {
  const act = e.target.closest("[data-act]"), alt = e.target.closest("[data-alt]");
  if(alt){ showDetail(alt.dataset.alt); toast("Menampilkan karya ilmiah alternatif."); return; }
  if(!act) return;
  if(act.dataset.act === "open") showPreview(state.current);
  if(act.dataset.act === "form"){ $("reqForm").classList.remove("hidden"); act.classList.add("hidden"); $("rName").focus(); }
  if(act.dataset.act === "retryLink"){
    state.retry++; act.disabled = true; act.textContent = "Memuat...";
    setTimeout(() => {
      act.disabled = false; act.textContent = "Coba Lagi";
      $("brokenMsg").innerHTML = `<b>Tautan Dokumen Bermasalah.</b> Percobaan ke-${state.retry} gagal: server dokumen tidak merespons. Coba lagi nanti atau pilih alternatif.`;
      toast("Gagal membuka dokumen.");
    }, 900);
  }
});
$("access").addEventListener("submit", (e) => {
  e.preventDefault();
  if(!$("rName").value.trim() || !$("rNim").value.trim() || !$("rWhy").value.trim()){
    $("rErr").textContent = "Nama, NIM, dan alasan permohonan wajib diisi."; $("rErr").classList.remove("hidden"); return;
  }
  $("reqForm").classList.add("hidden");
  $("access").insertAdjacentHTML("afterbegin", `<div class="alert ok"><b>Permohonan terkirim (simulasi).</b> Petugas akan menanggapi sesuai kebijakan perpustakaan.</div>`);
  toast("Permohonan akses simulasi berhasil diajukan.");
});

/* ---------- 8. PRATINJAU DOKUMEN ---------- */
function showPreview(id){
  const d = byId(id);
  $("paper").innerHTML = `<div class="wm">Pratinjau simulasi, bukan dokumen asli</div>
    <h1>${d.title}</h1><p class="center">${d.author} &bull; ${d.year}<br>${d.prodi}</p>
    <h3>Abstrak</h3><p>${d.abstract}</p>
    <h3>BAB I Pendahuluan</h3><p>Bagian ini berisi latar belakang, rumusan masalah, tujuan, dan manfaat penelitian. Teks ini hanyalah isian untuk memperlihatkan tampilan pratinjau dokumen.</p>
    <h3>BAB II Kajian Pustaka</h3><p>Kajian pustaka menguraikan teori dan penelitian terdahulu yang relevan dengan subjek ${d.subject}. Isi lengkap tidak tersedia pada prototype.</p>`;
  go("preview");
}
$("backDetail").onclick = () => showDetail(state.current);

/* ---------- 9. PETA USER FLOW (SVG dibuat dari data) ---------- */
// [id, tipe(s=oval,p=proses,d=keputusan,i=input/output), cx, cy, teks, halaman, parameter]
const NODES = [
  ["start","s",450,40,"Mulai","login"],["repo","p",450,120,"Halaman Repository","login"],
  ["form","p",450,200,"Form Login","login"],["inp","i",450,280,"Input NIM dan|Kata Sandi","login"],
  ["ver","p",450,360,"Verifikasi Login","login"],["d1","d",450,460,"Keberhasilan|Login?","login"],
  ["err","p",820,460,"Pesan Kesalahan|Login","login"],["dash","p",450,570,"Dashboard Repository","dashboard"],
  ["acc","p",450,650,"Akses Halaman|Pencarian","search"],["sp","p",450,730,"Halaman Pencarian","search"],
  ["kw","i",450,810,"Input Kata Kunci","search"],["proc","p",450,890,"Pemrosesan Pencarian","search"],
  ["res","i",450,970,"Hasil Pencarian","search"],["d2","d",450,1070,"Kesesuaian|Hasil?","search"],
  ["sug","p",820,1070,"Saran Kata Kunci|Alternatif","search"],["perb","p",820,950,"Perbaikan|Kata Kunci","search"],
  ["pick","p",450,1180,"Pemilihan Judul|Karya Ilmiah","search"],["det","p",450,1260,"Halaman Detail|Karya Ilmiah","detail",1],
  ["chk","p",450,1340,"Pemeriksaan Status|Dokumen dan Tautan","detail",1],["d3","d",450,1450,"Status|Dokumen?","detail",1],
  ["a1","p",130,1580,"Buka Dokumen","preview",1],["a2","p",130,1660,"Pratinjau Full Text","preview",1],["a3","s",130,1740,"Selesai","dashboard"],
  ["b1","p",340,1580,"Informasi Akses|Terbatas","detail",2],["b2","i",340,1660,"Formulir Permohonan|Akses","detail",2],
  ["b3","p",340,1740,"Pengajuan|Permohonan","detail",2],["b4","i",340,1820,"Informasi Permohonan|Dikirim","detail",2],
  ["c1","i",560,1580,"Informasi Dokumen|Tidak Tersedia","detail",4],["c2","p",560,1660,"Kembali ke|Hasil Pencarian","search"],
  ["e1","i",790,1580,"Informasi Tautan|Bermasalah","detail",3],["e2","p",790,1660,"Pemilihan Dokumen|Alternatif","detail",3],
  ["e3","p",790,1740,"Kembali ke Detail|Karya Ilmiah Alternatif","detail",5]
];
// Edge: [dari, sisi, ke, sisi, titik-belok, label, x, y, kelas]
const EDGES = [];
const chain = (ids) => ids.slice(1).forEach((id, i) => EDGES.push([ids[i],"b",id,"t"]));
chain(["start","repo","form","inp","ver","d1"]);
chain(["dash","acc","sp","kw","proc","res","d2"]); chain(["pick","det","chk","d3"]);
chain(["a1","a2","a3"]); chain(["b1","b2","b3","b4"]); chain(["c1","c2"]); chain(["e1","e2","e3"]);
EDGES.push(["d1","b","dash","t",[],"Ya",468,512,"y"], ["d1","r","err","l",[],"Tidak",600,452,""],
  ["err","t","inp","r",[[820,280]]], ["d2","b","pick","t",[],"Ya",468,1126,"y"],
  ["d2","r","sug","l",[],"Tidak",600,1062,""], ["sug","t","perb","b"], ["perb","t","kw","r",[[820,810]]]);
[["a1",130,"Tersedia & valid","y"],["b1",340,"Akses terbatas",""],["c1",560,"Tidak tersedia",""],["e1",790,"Tautan bermasalah",""]]
  .forEach(([id,x,txt,c]) => EDGES.push(["d3","b",id,"t",[[450,1530],[x,1530]],txt,x,1549,c]));

function buildFlow(){
  const svg = $("flowSvg"), N = {}; let out = "";
  svg.setAttribute("viewBox","0 0 940 1880");
  NODES.forEach(([id,t,x,y,txt,v,p]) => {
    const w = t==="d" ? 240 : (t==="s" ? 140 : (y >= 1560 ? 180 : 200)), h = t==="d" ? 88 : (t==="s" ? 40 : 48);
    N[id] = {x,y,w,h};
  });
  const pt = (id,s) => { const n = N[id];
    return s==="t" ? [n.x,n.y-n.h/2] : s==="b" ? [n.x,n.y+n.h/2] : s==="l" ? [n.x-n.w/2,n.y] : [n.x+n.w/2,n.y]; };
  out += `<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10z" fill="#19376d"/></marker></defs>`;
  EDGES.forEach(([f,fs,t,ts,via,lab,lx,ly,lc]) => {
    const pts = [pt(f,fs), ...(via||[]), pt(t,ts)];
    out += `<polyline class="edge" marker-end="url(#ah)" points="${pts.map((q) => q.join(",")).join(" ")}"/>`;
    if(lab) out += `<text class="elabel ${lc}" x="${lx}" y="${ly}">${lab}</text>`;
  });
  NODES.forEach(([id,t,x,y,txt,v,p]) => {
    const {w,h} = N[id], l = x - w/2, tp = y - h/2; let shape;
    if(t==="d") shape = `<polygon class="shape" points="${x},${tp} ${x+w/2},${y} ${x},${y+h/2} ${l},${y}"/>`;
    else if(t==="i") shape = `<polygon class="shape" points="${l+14},${tp} ${x+w/2},${tp} ${x+w/2-14},${tp+h} ${l},${tp+h}"/>`;
    else shape = `<rect class="shape" x="${l}" y="${tp}" width="${w}" height="${h}" rx="${t==="s" ? h/2 : 6}"/>`;
    const lines = txt.split("|"), y0 = y - (lines.length-1)*8 + 5;
    const tx = lines.map((s,i) => `<tspan x="${x}" y="${y0 + i*16}">${s}</tspan>`).join("");
    const cls = t==="s" && id==="start" ? "start" : t==="d" ? "decision" : t==="i" ? "io" : "";
    out += `<g class="fnode ${cls}" tabindex="0" role="button" aria-label="${txt.replace("|"," ")}" data-view="${v}" data-p="${p||""}">${shape}<text>${tx}</text></g>`;
  });
  svg.innerHTML = out;
}
function openNode(g){
  const v = g.dataset.view, p = g.dataset.p;
  if(!state.user && v !== "login"){ toast("Login terlebih dahulu untuk membuka halaman ini."); go("login"); return; }
  if(v === "detail") showDetail(p); else if(v === "preview") showPreview(p); else go(v);
}
$("flowSvg").addEventListener("click", (e) => { const g = e.target.closest(".fnode"); if(g) openNode(g); });
$("flowSvg").addEventListener("keydown", (e) => {
  const g = e.target.closest(".fnode"); if(g && (e.key === "Enter" || e.key === " ")){ e.preventDefault(); openNode(g); }
});

/* ---------- 10. INISIALISASI ---------- */
renderStats(); buildFlow(); go("login");
