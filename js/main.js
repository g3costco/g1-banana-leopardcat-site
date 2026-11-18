/* =========================================================
   第一組「蕉換未來」互動元件
   每個元件都會先檢查頁面上有沒有對應的區塊，沒有就跳過，
   所以所有頁面可以共用這一個檔案。
   ========================================================= */

/* ---------- 1. 翻牌卡（展廳一）---------- */
document.querySelectorAll('.flip').forEach(function (card) {
  card.addEventListener('click', function () {
    var flipped = card.classList.toggle('is-flipped');
    card.setAttribute('aria-pressed', flipped ? 'true' : 'false');
  });
});

/* ---------- 2. 示意地圖（展廳一）---------- */
var mapInfo = document.getElementById('map-info');
document.querySelectorAll('.map-point').forEach(function (pt) {
  function show() { if (mapInfo) mapInfo.innerHTML = '<strong>' + pt.dataset.name + '</strong><br>' + pt.dataset.desc; }
  pt.addEventListener('click', show);
  pt.addEventListener('focus', show);
  pt.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(); } });
});

/* ---------- 3. 變身步驟（展廳二）---------- */
var stepper = document.querySelector('.stepper');
if (stepper) {
  var panels = stepper.querySelectorAll('.step-panel');
  var dotsBox = stepper.querySelector('.stepper-dots');
  var prev = stepper.querySelector('[data-step="prev"]');
  var next = stepper.querySelector('[data-step="next"]');
  var current = 0;
  panels.forEach(function (panel, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.textContent = i + 1;
    b.setAttribute('aria-label', '第 ' + (i + 1) + ' 步：' + panel.querySelector('h3').textContent);
    b.addEventListener('click', function () { go(i); });
    dotsBox.appendChild(b);
  });
  function go(i) {
    current = i;
    panels.forEach(function (p, j) { p.hidden = j !== i; });
    dotsBox.querySelectorAll('button').forEach(function (b, j) {
      if (j === i) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
    });
    prev.disabled = i === 0;
    next.disabled = i === panels.length - 1;
  }
  prev.addEventListener('click', function () { go(current - 1); });
  next.addEventListener('click', function () { go(current + 1); });
  go(0);
}

/* ---------- 4. 雙循環圖（展廳三）---------- */
var loop = document.querySelector('.loop');
if (loop) {
  var nodes = loop.querySelectorAll('.loop-node');
  var detail = document.getElementById('loop-detail');
  nodes.forEach(function (node, i) {
    /* 把節點平均排在圓周上，從正上方開始順時針 */
    var angle = (i / nodes.length) * 2 * Math.PI - Math.PI / 2;
    node.style.left = (50 + 38 * Math.cos(angle)) + '%';
    node.style.top = (50 + 38 * Math.sin(angle)) + '%';
    node.addEventListener('click', function () {
      nodes.forEach(function (n) { n.setAttribute('aria-pressed', 'false'); });
      node.setAttribute('aria-pressed', 'true');
      detail.innerHTML = '<h3>' + (i + 1) + '. ' + node.dataset.title + '</h3><p>' + node.dataset.detail + '</p>' +
        '<p class="note">下一站 → ' + nodes[(i + 1) % nodes.length].dataset.title + '</p>';
    });
  });
}

/* ---------- 5. 低碳里程計算機（展廳三）---------- */
/* 係數單位：公克 CO2e／每人每公里。機車、汽車為教學估算值。 */
var FACTORS = [
  { mode: '臺鐵自強號', g: 36 },
  { mode: '臺鐵莒光號', g: 50 },
  { mode: '臺鐵區間車', g: 55 },
  { mode: '機車（估算）', g: 78 },
  { mode: '汽車單人（估算）', g: 150 },
  { mode: '自行車', g: 0 },
  { mode: '步行', g: 0 }
];
var calcForm = document.getElementById('calc');
if (calcForm) {
  var kmInput = document.getElementById('km');
  var modeSelect = document.getElementById('mode');
  var bars = document.getElementById('bars');
  var result = document.getElementById('calc-result');
  FACTORS.forEach(function (f, i) {
    var opt = document.createElement('option');
    opt.value = i; opt.textContent = f.mode;
    modeSelect.appendChild(opt);
  });
  modeSelect.value = 2;
  function fmt(g) { return g >= 1000 ? (g / 1000).toFixed(2) + ' kg' : Math.round(g) + ' g'; }
  function update() {
    var km = Math.max(0, parseFloat(kmInput.value) || 0);
    var sel = parseInt(modeSelect.value, 10);
    var max = Math.max.apply(null, FACTORS.map(function (f) { return f.g; })) * km || 1;
    bars.innerHTML = '';
    FACTORS.forEach(function (f, i) {
      var total = f.g * km;
      var row = document.createElement('div');
      row.className = 'bar-row' + (i === sel ? ' is-selected' : '');
      row.innerHTML = '<span>' + f.mode + '</span><div class="bar"><span style="width:' + (total / max * 100) + '%"></span></div><span>' + fmt(total) + '</span>';
      bars.appendChild(row);
    });
    var mine = FACTORS[sel].g * km;
    var car = 150 * km;
    var saved = car - mine;
    result.innerHTML = '單程 ' + km + ' 公里搭乘「' + FACTORS[sel].mode + '」約排放 <strong>' + fmt(mine) + '</strong> CO2e' +
      (saved > 0 ? '，比單人開車少約 <strong>' + fmt(saved) + '</strong>。' : '。');
  }
  kmInput.addEventListener('input', update);
  modeSelect.addEventListener('change', update);
  update();
}

/* ---------- 6. 永續承諾牆（展廳三）---------- */
/* 注意：資料只存在「這台電腦的這個瀏覽器」。要讓全班共享，請改用 Google 表單嵌入。 */
var pledgeForm = document.getElementById('pledge-form');
if (pledgeForm) {
  var KEY = 'g1-pledges';
  var wall = document.getElementById('wall');
  var samples = [
    { name: '策展小組', text: '我會搭火車或騎單車到集集' },
    { name: '路過的樂活族', text: '我會優先購買友善石虎標章的農產品' }
  ];
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; }
  }
  function save(list) {
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) { /* 瀏覽器不允許儲存時就只顯示在畫面上 */ }
  }
  var mine = load();
  function render() {
    wall.innerHTML = '';
    mine.concat(samples).forEach(function (p) {
      var li = document.createElement('li');
      var b = document.createElement('b');
      b.textContent = p.name;
      li.appendChild(b);
      li.appendChild(document.createTextNode(p.text));
      wall.appendChild(li);
    });
  }
  pledgeForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var choice = pledgeForm.querySelector('input[name="pledge"]:checked');
    var name = pledgeForm.querySelector('#nickname').value.trim() || '匿名的朋友';
    if (!choice) { alertBox('請先選一個承諾喔！'); return; }
    mine.unshift({ name: name.slice(0, 20), text: choice.value });
    save(mine);
    render();
    pledgeForm.reset();
    alertBox('謝謝你！你的承諾已經貼上牆了。');
  });
  function alertBox(msg) { document.getElementById('pledge-msg').textContent = msg; }
  render();
}
