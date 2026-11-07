/* 未央体育 · 调整版视图层 V0.3-preview
   四 Tab（首页 / 全部功能 / 体育资讯 / 我的）+ 子页面路由（history 返回）。
   外壳选择器使用 #app（preview/index.html 已配 id）。 */
'use strict';
const $ = (s, p) => (p || document).querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const P = {
  home:'M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5',
  user:'M4 21c0-4 4-6 8-6s8 2 8 6M8 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0',
  grid:'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  news:'M4 5h16v14H4zM8 9h8M8 13h8M8 17h5',
  back:'M19 12H5M11 18l-6-6 6-6',
  trophy:'M8 21h8M12 17v4M7 4h10v6a5 5 0 0 1-10 0zM7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3',
  shield:'M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z',
  heart:'M12 20s-7-4.6-9-9c-1.2-3 .8-6 3.7-6 1.8 0 3 .9 4.3 2.6C12.3 5.9 13.5 5 15.3 5c2.9 0 4.9 3 3.7 6-2 4.4-7 9-7 9z',
  calendar:'M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v12A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5zM16 3v4M8 3v4M4 11h16',
  clock:'M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM12 7v5l3 2',
  pin:'M12 21s-6.5-6-6.5-10.5a6.5 6.5 0 1 1 13 0C18.5 15 12 21 12 21zM12 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4z',
  users:'M9 11.5A3.5 3.5 0 1 1 9 4.5a3.5 3.5 0 0 1 0 7zM2.5 20c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5M16 4.8a3.5 3.5 0 0 1 0 6.4M17.5 14.9c2.5.7 4 2.5 4 5.1',
  check:'M5 13l4 4L19 7', plus:'M12 5v14M5 12h14',
  volley:'M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM12 3v18M3.6 7.5c5 2.6 11.8 2.6 16.8 0M3.6 16.5c5-2.6 11.8-2.6 16.8 0',
  flag:'M5 21V4M5 4c4-2 7 2 11 0v8c-4 2-7-2-11 0',
  run:'M13 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM9 21l2-5 3-3 1-4-3 1-3 2M11 13l-3 1M15 9l3 2 2 3',
  medal:'M12 14a5 5 0 1 1 0-10 5 5 0 0 1 0 10zM8.5 13.5 7 21l5-2.5L17 21l-1.5-7.5',
  search:'M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14zM16.5 16.5 21 21',
  edit:'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z',
};
const icon = (n, s) => `<svg width="${s||18}" height="${s||18}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${P[n]}"/></svg>`;

const STATUS_PILL = { '报名中':'pill-open','进行中':'pill-doing','已结束':'pill-done','预计':'pill-planned','已满 · 候补中':'pill-gold','预告':'pill-planned','招新中':'pill-open','常年招新':'pill-confirmed','公示':'pill-gold','场地':'pill-doing','活动':'pill-open' };
const pill = (t, cls) => `<span class="pill ${cls||STATUS_PILL[t]||'pill-confirmed'}">${t}</span>`;
const stars = n => `<span class="stars">${'★'.repeat(n)}${'☆'.repeat(5-n)}</span>`;

const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { localStorage.setItem(k, JSON.stringify(v)); },
};

let toastTimer;
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => (t.hidden = true), 2200);
}
function openSheet(html) {
  $('#sheetLayer').innerHTML =
    `<div class="sheet-mask" onclick="closeSheet()"></div><div class="sheet" role="dialog">${html}</div>`;
  document.body.style.overflow = 'hidden';
}
function closeSheet() { $('#sheetLayer').innerHTML = ''; document.body.style.overflow = ''; }

const D = window.WY;
let CUR = 'home';

/* ══════════ Tab 1：首页（月历 + 近期活动） ══════════ */
function calGrid() {
  const [y, m] = D.term.month.split('-').map(Number);
  const mm = String(m).padStart(2, '0');
  const first = new Date(y, m - 1, 1), days = new Date(y, m, 0).getDate();
  const pad = first.getDay(); // 周日起
  const now = new Date();
  const todayKey = (now.getFullYear() === y && now.getMonth() === m - 1)
    ? String(now.getDate()).padStart(2, '0') : null;
  let cells = '<span class="cal-wd">日</span><span class="cal-wd">一</span><span class="cal-wd">二</span><span class="cal-wd">三</span><span class="cal-wd">四</span><span class="cal-wd">五</span><span class="cal-wd">六</span>';
  for (let i = 0; i < pad; i++) cells += '<span class="cal-day"></span>';
  for (let d = 1; d <= days; d++) {
    const dd = String(d).padStart(2, '0'), ev = D.calendarDates[mm + '-' + dd];
    const cls = ['cal-day', ev ? 'has' : '', dd === todayKey ? 'today' : ''].join(' ');
    cells += ev
      ? `<button class="${cls}" data-nav="${ev.target}" title="${esc(ev.title)}"><i>${d}</i><b></b></button>`
      : `<span class="${cls}"><i>${d}</i></span>`;
  }
  return cells;
}
function pageHome() {
  return `
  <section class="hero small">
    <h1>未央体育</h1>
    <p class="slogan">清华之光，体育未央 · 竞技看得懂，群众找得到</p>
  </section>
  <div class="sec-title"><h2>体育周历 · ${D.term.month.replace('-', ' 年 ')} 月</h2><button data-nav="news">体育资讯</button></div>
  <div class="card cal-card"><div class="cal-grid">${calGrid()}</div>
    <p class="sub" style="margin-top:8px">标记日期有体育活动，点击可直接跳转对应版块</p>
  </div>
  <div class="sec-title"><h2>近期活动</h2><button data-nav="all">全部功能</button></div>
  ${D.weeklyList.map(w => `
    <div class="card card-row" data-nav="${w.target}" style="cursor:pointer">
      <div><h3>${esc(w.title)}</h3><p class="sub" style="margin-top:4px">${esc(w.note)}</p></div>
      <div style="text-align:right;flex:none"><span class="pill ${STATUS_PILL[w.tag]||'pill-confirmed'}">${w.tag}</span><p class="sub" style="margin-top:5px">${esc(w.d)}</p></div>
    </div>`).join('')}`;
}

/* ══════════ Tab 2：全部功能 ══════════ */
function pageAll() {
  const colors = { comp:'#660874', team:'#8d2f9e', camp:'#1e8e5a', buddy:'#3a6fd8', checkin:'#c59b58', cert:'#3a6fd8', equip:'#5a8a2e', class:'#c34a4a' };
  const icons = { comp:'trophy', team:'shield', camp:'heart', buddy:'users', checkin:'run', cert:'medal', equip:'volley', class:'flag' };
  const groups = [['竞技', '竞技体育'],['群体', '群众体育'],['服务', '事务服务']];
  return `
  <p class="sub" style="margin:2px 2px 4px">八大功能集中入口，点击进入对应版块</p>
  ${groups.map(([g, label]) => `
    <div class="sec-title"><h2>${label}</h2></div>
    <div class="entry-grid">
      ${D.entries.filter(e => e.group === g).map(e =>
        `<button class="entry" data-nav="${e.target}"><span class="ico" style="background:${colors[e.key]}">${icon(icons[e.key],17)}</span>${e.label}</button>`).join('')}
    </div>`).join('')}
  <div class="card card-row" data-nav="admin" style="cursor:pointer;margin-top:14px">
    <div style="display:flex;gap:10px;align-items:center"><span style="color:var(--primary)">${icon('shield',20)}</span>
    <div><b style="font-size:14px">体育部工作台（管理后台）</b><p class="sub">待办 ${D.admin.todos.length} 项 · 仅干事及以上</p></div></div>
    <span class="sub">›</span>
  </div>`;
}

/* ══════════ Tab 3：体育资讯 ══════════ */
function pageNews() {
  const seg = store.get('WY_NEWS_SEG', 'weekly');
  const segBtn = (k, t) => `<button class="seg-btn ${seg === k ? 'on' : ''}" data-nseg="${k}">${t}</button>`;
  let body = '';
  if (seg === 'weekly') {
    body = D.weeklyReports.map((w, i) => `
      <div class="card" data-weekly="${i}">
        <div class="card-row"><h3>未央体育周报 · ${w.no}</h3><span class="sub">${w.date}</span></div>
        <ul class="weekly" style="margin-top:6px">${w.results.slice(0,2).map(r => `<li><span class="dot"></span>${esc(r)}</li>`).join('')}</ul>
        <p class="sub">结果速览 ${w.results.length} 条 · 比赛预告 ${w.preview.length} 条 ›</p>
      </div>`).join('');
  } else if (seg === 'notice') {
    body = D.notices.map(n => `
      <div class="card">
        <div class="card-row"><h3>${esc(n.title)}</h3>${pill(n.type)}</div>
        <p class="sub" style="margin-top:6px">${esc(n.body)}</p>
        <p class="sub" style="margin-top:6px;text-align:right">${n.date}</p>
      </div>`).join('');
  } else {
    body = D.recruits.map(r => `
      <div class="card card-row">
        <div><h3>${r.team} 招新</h3><p class="sub" style="margin-top:4px">${esc(r.text)}</p>
        <p class="sub" style="margin-top:4px">截止 ${r.deadline} · ${r.level}</p></div>
        <button class="btn sm" data-nav="${r.target}">去报名</button>
      </div>`).join('');
  }
  return `
  <div class="seg">${segBtn('weekly','体育周报')}${segBtn('notice','通知公告')}${segBtn('recruit','系队招募')}</div>
  ${body}
  <p class="sub" style="text-align:center;margin-top:10px">周报每周一更新 · 公告同步公众号发布</p>`;
}
function weeklySheet(w) {
  return `
  <h2>未央体育周报 · ${w.no}</h2>
  <div class="sec-title"><h2>结果速览</h2></div>
  <ul class="weekly">${w.results.map(r => `<li><span class="dot"></span>${esc(r)}</li>`).join('')}</ul>
  <div class="sec-title"><h2>比赛预告</h2></div>
  <ul class="weekly">${w.preview.map(r => `<li><span class="dot gold"></span>${esc(r)}</li>`).join('')}</ul>
  <button class="btn ghost block" style="margin-top:12px" onclick="closeSheet()">关闭</button>`;
}

/* ══════════ Tab 4：我的 ══════════ */
function getProfile() {
  const p = store.get('WY_PROFILE', null);
  return p ? Object.assign({}, D.profile, p) : D.profile;
}
function pageMe() {
  const p = getProfile();
  const joined = store.get('WY_JOINED', []);
  const joinedNames = joined.map(id => {
    const c = D.competitions.find(x => x.id === id); if (c) return { name: c.name, st: c.status };
    const t = D.teams.find(x => x.id === id); if (t) return { name: t.name + '（招新报名）', st: t.recruit };
    return null; }).filter(Boolean);
  return `
  <div class="card card-row" style="background:linear-gradient(135deg,#fff,#f7f0fa)">
    <div style="display:flex;gap:12px;align-items:center">
      <span style="width:46px;height:46px;border-radius:14px;background:var(--primary);color:#fff;display:grid;place-items:center;font-size:18px;font-weight:700">${esc(p.name[0])}</span>
      <div><h3>${esc(p.name)} <span class="pill pill-confirmed" style="margin-left:6px">已认证</span></h3>
      <p class="sub" style="margin-top:3px">${esc(p.cls)} · 学号 ${esc(p.sid)}</p></div>
    </div>
    <button class="btn sm ghost" onclick="profileForm()">${icon('edit',14)} 编辑</button>
  </div>
  <div class="sec-title"><h2>我的系队</h2></div>
  ${D.myTeams.map(t => `<div class="card card-row"><div><h3>${t.name}</h3><p class="sub" style="margin-top:3px">${t.role} · ${t.since} 加入</p></div>${pill('进行中')}</div>`).join('')}
  <div class="sec-title"><h2>我的比赛与报名</h2></div>
  ${joinedNames.length ? joinedNames.map(j => `<div class="card card-row"><div><h3 style="font-size:14px">${esc(j.name)}</h3></div>${pill(j.st)}</div>`).join('')
    : '<div class="card"><p class="sub" style="text-align:center;padding:8px 0">暂无报名记录，去「全部功能」报名第一项活动吧</p></div>'}
  <div class="sec-title"><h2>活动进度查询</h2></div>
  <div class="card">
    <div style="display:flex;gap:8px">
      <input id="q-kw" class="search-input" placeholder="输入活动名称，如：长乐杯 / 打卡 / 证书 / 报销">
      <button class="btn sm" onclick="doSearch()">${icon('search',15)} 查询</button>
    </div>
    <div id="q-result" style="margin-top:10px"></div>
  </div>
  <p class="sub" style="text-align:center;margin-top:18px">未央体育调整版预览 V0.3 · 演示数据<br>清华大学未央书院学生会体育部</p>`;
}
function profileForm() {
  const p = getProfile();
  openSheet(`
  <h2>编辑资料</h2>
  <div class="field"><label>姓名</label><input id="p-name" value="${esc(p.name)}"></div>
  <div class="field"><label>学号</label><input id="p-sid" value="${esc(p.sid)}"></div>
  <div class="field"><label>班级</label><input id="p-cls" value="${esc(p.cls)}"></div>
  <div class="field"><label>手机号（选填）</label><input id="p-phone" value="${esc(p.phone||'')}" placeholder="用于活动联络"></div>
  <button class="btn block" onclick="saveProfile()">保存</button>
  <button class="btn ghost block" style="margin-top:10px" onclick="closeSheet()">取消</button>`);
}
function saveProfile() {
  const name = $('#p-name').value.trim(); if (!name) return toast('请填写姓名');
  store.set('WY_PROFILE', { name, sid: $('#p-sid').value.trim(), cls: $('#p-cls').value.trim(), phone: $('#p-phone').value.trim() });
  closeSheet(); refresh(); toast('资料已更新（演示，仅存本机）');
}
function doSearch() {
  const kw = $('#q-kw').value.trim();
  const box = $('#q-result');
  if (!kw) { box.innerHTML = '<p class="sub">请输入关键词</p>'; return; }
  const hits = [];
  D.competitions.forEach(c => { if (c.name.includes(kw)) hits.push({ name: c.name, steps: ['报名', '秩序册', '比赛日', '成绩归档'], cur: c.status }); });
  D.checkinActs.forEach(a => { if (a.name.includes(kw) || kw === '打卡') hits.push({ name: a.name, steps: ['报名', '打卡中', '统计公示'], cur: a.status }); });
  if (kw.includes('证书')) D.cert.batches.forEach(b => hits.push({ name: b.round + '游泳证书 · ' + b.time, steps: ['名单核对', '在线登记', '现场核销'], cur: '报名中' }));
  if (kw.includes('报销') || kw.includes('班团')) hits.push({ name: '班团体育支持计划', steps: D.auditFlow.steps.map(s => s.name), cur: '体育部初审' });
  box.innerHTML = hits.length ? hits.map(h => `
    <div style="padding:10px 0;border-bottom:1px dashed var(--border)">
      <div class="card-row"><b style="font-size:13px">${esc(h.name)}</b>${pill(h.cur)}</div>
      <div class="steps" style="margin:8px 0 2px">${h.steps.map((s, i) => `<span class="step ${s === h.cur ? 'doing' : ''}">${s}</span>`).join('')}</div>
    </div>`).join('') : '<p class="sub">未找到相关活动，试试"长乐杯 / 打卡 / 证书 / 报销"</p>';
}

/* ══════════ 子页：赛事中心（难度 + 过往成绩 + 分级表） ══════════ */
function pageComp() {
  const filter = store.get('WY_COMP_FILTER', '全部');
  const list = D.competitions.filter(c => filter === '全部' || c.status === filter);
  return `
  <div class="chips">
    ${['全部','报名中','进行中','已结束','预计'].map(f =>
      `<button class="chip ${f === filter ? 'on' : ''}" data-filter="${f}">${f}</button>`).join('')}
  </div>
  ${list.map(c => `
    <div class="card" data-comp="${c.id}">
      <div class="card-row"><h3>${esc(c.name)}</h3>${pill(c.status)}</div>
      <p class="sub" style="margin-top:6px">${esc(c.summary)}</p>
      <div class="card-row" style="margin-top:8px">
        <span>难度 ${stars(c.difficulty)}</span>
        <span class="sub">推荐 ${'≥'.repeat(0)}${c.recommend} 分以上报名</span>
      </div>
      <div class="card-row" style="margin-top:6px"><span class="sub">${c.deadline ? '报名截止 ' + c.deadline : c.result || '详见章程'}</span><span class="sub">主办方：${c.host}</span></div>
    </div>`).join('') || '<p class="sub" style="text-align:center;padding:40px 0">该状态下暂无赛事</p>'}`;
}
function compSheet(c) {
  const joined = store.get('WY_JOINED', []);
  const lt = D.levelTables[c.levelKey];
  return `
  <h2>${esc(c.name)}</h2>
  <div style="margin:4px 0 10px">${pill(c.status)} ${pill(c.host)} <span class="pill pill-gold">难度 ${c.difficulty} 分</span></div>
  <div class="kv"><b>赛制安排</b><span>${c.format.join('；')}</span></div>
  <div class="kv"><b>报名方式</b><span>${c.joinTypes.join(' / ')}</span></div>
  ${c.deadline ? `<div class="kv"><b>报名截止</b><span>${c.deadline}</span></div>` : ''}
  <div class="kv"><b>推荐水平</b><span>${c.recommend} 分及以上（${lt.rows[c.recommend-1].desc.split('：')[0]}）的同学报名</span></div>
  <div class="sec-title"><h2>过往赛事成绩</h2></div>
  <ul class="weekly">${c.pastResults.map(r => `<li><span class="dot gold"></span>${esc(r)}</li>`).join('')}</ul>
  <div class="sec-title"><h2>${lt.name}难度分级对照表</h2></div>
  <div class="lv-table">
    ${lt.rows.map(r => `<div class="lv-row ${r.lv === c.recommend ? 'rec' : ''}">
      <span class="lv-tag">${r.lv} 分${r.lv === c.recommend ? ' · 推荐' : ''}</span><span>${esc(r.desc)}</span></div>`).join('')}
  </div>
  <p class="sub" style="font-size:11px;margin-top:6px">高亮行为本项赛事的推荐报名水平</p>
  ${joined.includes(c.id)
    ? `<button class="btn block" disabled>${icon('check',16)} 已报名（演示）</button>`
    : `<button class="btn block" style="margin-top:12px" onclick="joinForm('${c.id}','赛事报名')">${icon('plus',16)} 立即报名</button>`}`;
}
function joinForm(id, kind) {
  openSheet(`
  <h2>${kind === '系队招新' ? '系队招新报名' : '赛事报名'} · 演示表单</h2>
  <div class="field"><label>姓名</label><input id="f-name" value="${esc(getProfile().name)}"></div>
  <div class="field"><label>学号</label><input id="f-sid" value="${esc(getProfile().sid)}"></div>
  <div class="field"><label>班级</label><input id="f-cls" value="${esc(getProfile().cls)}"></div>
  <button class="btn block" onclick="submitJoin('${id}')">提交报名</button>
  <button class="btn ghost block" style="margin-top:10px" onclick="closeSheet()">取消</button>`);
}
function submitJoin(id) {
  if (!$('#f-sid').value.trim()) return toast('请填写学号');
  const j = store.get('WY_JOINED', []); if (!j.includes(id)) j.push(id);
  store.set('WY_JOINED', j); closeSheet(); refresh(); toast('报名成功！进度可在「我的-活动进度查询」跟踪');
}

/* ══════════ 子页：系队风采 ══════════ */
function pageTeam() {
  const filter = store.get('WY_TEAM_FILTER', '全部');
  const list = D.teams.filter(t => filter === '全部' || (filter === '零基础可入' ? t.friendly : filter === '招新中' ? t.recruit === '招新中' : !t.friendly));
  return `
  <p class="sub" style="margin:2px 2px 12px">每支系队一张"诚实名片"：门槛写清楚，敢不敢报一目了然</p>
  <div class="chips">
    ${['全部','零基础可入','需基础','招新中'].map(f =>
      `<button class="chip ${f === filter ? 'on' : ''}" data-tfilter="${f}">${f}</button>`).join('')}
  </div>
  ${list.map(t => `
    <div class="card" data-team="${t.id}">
      <div class="card-row"><h3>${t.name}</h3><span class="team-badge ${t.friendly ? 'tf' : 'tn'}">${t.level}</span></div>
      <p class="honor" style="margin-top:5px">${icon('medal',13)} ${esc(t.honors)}</p>
      <div class="card-row" style="margin-top:8px"><span class="sub">${icon('clock',13)} ${esc(t.train)}</span>${pill(t.recruit)}</div>
      <p class="sub" style="margin-top:6px">在队 ${t.members} 人</p>
    </div>`).join('')}`;
}
function teamSheet(t) {
  return `
  <h2>${t.name}</h2>
  <div style="margin:4px 0 10px"><span class="team-badge ${t.friendly ? 'tf' : 'tn'}">${t.level}</span> ${pill(t.recruit)}</div>
  <div class="kv"><b>训练安排</b><span>${esc(t.train)}</span></div>
  <div class="kv"><b>历史成绩</b><span>${esc(t.honors)}</span></div>
  <div class="kv"><b>队伍规模</b><span>在队 ${t.members} 人</span></div>
  <div class="kv"><b>队伍介绍</b><span>${esc(t.intro)}</span></div>
  <button class="btn block" style="margin-top:12px" onclick="joinForm('${t.id}','系队招新')">${icon('plus',16)} 招新报名 / 咨询</button>`;
}

/* ══════════ 子页：体验营 / 约球 ══════════ */
function pageCamp() {
  return D.camps.map(c => `
    <div class="card">
      <div class="card-row"><h3>${esc(c.name)}</h3>${pill(c.status)}</div>
      <p class="sub" style="margin-top:6px">${icon('calendar',13)} ${esc(c.week)} · ${icon('pin',13)} ${esc(c.place)}</p>
      <div class="progress"><i style="width:${Math.round(c.taken / c.cap * 100)}%"></i></div>
      <div class="progress-note"><span>已报 ${c.taken} / ${c.cap} 人</span><span>${c.taken >= c.cap ? '候补队列开放中' : '先到先得'}</span></div>
      <p class="sub" style="margin:8px 0 10px">${esc(c.sci)}</p>
      ${c.status === '报名中' ? `<button class="btn sm" onclick="toast('体验营报名成功（演示）——候补机制见策划案')">立即报名</button>`
        : `<button class="btn ghost sm" onclick="toast('已加入候补队列（演示），有退订将按序递补')">候补登记</button>`}
    </div>`).join('') +
  `<p class="sub" style="text-align:center;margin-top:8px">定期场地 + 运动科普 + 先到先得 · 新项目持续增加</p>`;
}
function pageBuddy() {
  const extra = store.get('WY_BUDDIES', []);
  const buddies = [...extra, ...D.buddies];
  return `
  <button class="btn block big-pub" style="margin-bottom:14px" onclick="buddyForm()">${icon('plus',18)} 发布约球</button>
  ${buddies.map(b => `
    <div class="card card-row">
      <div>
        <h3>${esc(b.sport)} · ${esc(b.time)}</h3>
        <p class="sub" style="margin-top:4px">${icon('pin',12)} ${esc(b.place)} · 还缺 <b style="color:var(--primary)">${b.need}</b> 人 · <b style="color:#9a7424">${b.lv} 分水平</b></p>
        <p class="sub" style="margin-top:3px">${esc(b.note)} · ${esc(b.author)} · ${esc(b.ts)}</p>
      </div>
      <button class="btn sm" onclick="toast('已应答！满员后将以平台消息提醒建群（演示）')">应答</button>
    </div>`).join('')}
  <p class="sub" style="text-align:center;margin-top:8px">水平按球类能力对照表 1-5 分标注 · 线下运动注意安全</p>`;
}
function buddyForm() {
  openSheet(`
  <h2>发布约球</h2>
  <div class="field"><label>项目</label><select id="b-sport" onchange="renderLvPick()">${['羽毛球','乒乓球','排球','篮球','跑步'].map(x => `<option data-lk="${x==='羽毛球'?'bad':x==='乒乓球'?'tt':x==='排球'?'volley':x==='篮球'?'fb':'run'}">${x}</option>`).join('')}</select></div>
  <div class="field"><label>时间</label><input id="b-time" placeholder="如：周三 20:00"></div>
  <div class="field"><label>场地</label><input id="b-place" placeholder="如：综体 / 气膜馆 / 紫操"></div>
  <div class="field"><label>还需要几人</label><input id="b-need" type="number" value="2" min="1" max="10"></div>
  <div class="field"><label>我的水平（按该项目能力对照表）</label><div id="b-lv" class="steps" style="margin-top:2px"></div></div>
  <button class="btn block" onclick="submitBuddy()">发布</button>
  <button class="btn ghost block" style="margin-top:10px" onclick="closeSheet()">取消</button>`);
  renderLvPick();
}
function renderLvPick() {
  const sel = $('#b-sport'); if (!sel || !sel.selectedOptions) return;
  const lk = sel.selectedOptions[0].dataset.lk, lt = D.levelTables[lk];
  const cur = store.get('WY_BUDDY_LV', 3);
  $('#b-lv').innerHTML = lt.rows.map(r =>
    `<button type="button" class="step ${r.lv === cur ? 'doing' : ''}" onclick="pickLv(${r.lv})" title="${esc(r.desc)}">${r.lv} 分</button>`).join('') +
    `<span class="sub" style="width:100%;margin-top:4px;font-size:11px">${esc(lt.rows[cur-1].desc)}</span>`;
}
function pickLv(lv) { store.set('WY_BUDDY_LV', lv); renderLvPick(); }
function submitBuddy() {
  const v = id => $(id).value.trim();
  if (!v('#b-time') || !v('#b-place')) return toast('请填写时间与场地');
  const post = { id: 'u' + Date.now(), sport: v('#b-sport'), time: v('#b-time'), place: v('#b-place'),
    need: +v('#b-need') || 1, lv: store.get('WY_BUDDY_LV', 3), note: D.levelTables[$('#b-sport').selectedOptions[0].dataset.lk].rows[store.get('WY_BUDDY_LV',3)-1].desc.split('：')[0],
    author: esc(getProfile().cls) + ' · 我', ts: '刚刚' };
  store.set('WY_BUDDIES', [post, ...store.get('WY_BUDDIES', [])]);
  closeSheet(); refresh(); toast('发布成功！满员后记得回来关闭帖子（演示）');
}

/* ══════════ 子页：打卡活动（报名 / 记录 / 排行榜） ══════════ */
function pageCheckin() {
  const seg = store.get('WY_CK_SEG', 'acts');
  const joined = store.get('WY_CK_JOIN', []);
  const recs = store.get('WY_CK_REC', []);
  const segBtn = (k, t) => `<button class="seg-btn ${seg === k ? 'on' : ''}" data-cseg="${k}">${t}</button>`;
  let body = '';
  if (seg === 'acts') {
    body = D.checkinActs.map(a => {
      const isIn = joined.includes(a.id);
      return `
      <div class="card">
        <div class="card-row"><h3>${a.name}</h3>${pill(a.status)}</div>
        <p class="sub" style="margin-top:6px">${icon('calendar',13)} ${a.window} · 模块：${a.modules.join(' / ')}</p>
        <p class="sub" style="margin-top:4px">${esc(a.rule)} · 已报 ${a.joined} 人</p>
        <div class="steps" style="margin:10px 0 4px">${isIn ? `<button class="btn sm" onclick="ckRecForm('${a.id}')">${icon('plus',14)} 发布打卡记录</button><span class="step done">已报名</span>` : `<button class="btn sm" onclick="ckJoin('${a.id}')">报名该活动</button>`}</div>
      </div>`; }).join('');
  } else if (seg === 'mine') {
    body = recs.length ? recs.map(r => `
      <div class="card card-row">
        <div><h3 style="font-size:14px">${r.module} · ${r.date}</h3>
        <p class="sub" style="margin-top:3px">${esc(r.note || '今日已完成')} · ${r.amount}</p></div>
        <span class="pill ${r.perm === 2 ? 'pill-open' : r.perm === 1 ? 'pill-doing' : 'pill-done'}">${['仅自己','班内可见','全员可见'][r.perm]}</span>
      </div>`).join('') : '<div class="card"><p class="sub" style="text-align:center;padding:8px 0">还没有打卡记录：先在「活动报名」页报名，再发布第一条记录</p></div>';
  } else {
    const myDays = recs.length;
    const board = [...D.checkinBoard, { name: '我', days: myDays, me: true }].sort((a, b) => b.days - a.days);
    body = `
    <div class="card" style="background:linear-gradient(135deg,#fff,#faf3e6)">
      <div class="card-row"><b>我的累计打卡</b><span class="pill pill-gold">${myDays} 天</span></div>
      <p class="sub" style="margin-top:4px">当前排名：第 ${board.findIndex(b => b.me) + 1} 名（演示榜）</p>
    </div>
    ${board.map((b, i) => `
      <div class="card card-row rank-row ${b.me ? 'me' : ''}">
        <div style="display:flex;gap:12px;align-items:center">
          <span class="rank-no ${i < 3 ? 'top' : ''}">${i + 1}</span>
          <b style="font-size:14px">${esc(b.name)}</b>
        </div>
        <span class="sub"><b style="color:var(--primary);font-size:15px">${b.days}</b> 天</span>
      </div>`).join('')}`;
  }
  return `
  <div class="seg">${segBtn('acts','活动报名')}${segBtn('mine','我的打卡')}${segBtn('board','排行榜')}</div>
  ${body}
  ${seg === 'acts' ? '<p class="sub" style="text-align:center;margin-top:8px">报名后方可发布打卡记录；记录可设置可见范围，体育部后台可核查凭证</p>' : ''}`;
}
function ckJoin(id) {
  const j = store.get('WY_CK_JOIN', []); if (!j.includes(id)) j.push(id);
  store.set('WY_CK_JOIN', j); refresh(); toast('报名成功！现在可以发布打卡记录了');
}
function ckRecForm(actId) {
  const a = D.checkinActs.find(x => x.id === actId);
  openSheet(`
  <h2>发布打卡记录 · ${a.name}</h2>
  <div class="field"><label>模块</label><select id="ck-mod">${a.modules.map(m => `<option>${m}</option>`).join('')}</select></div>
  <div class="field"><label>时长 / 里程</label><input id="ck-amt" placeholder="如：30 分钟 / 5 km"></div>
  <div class="field"><label>一句话感想（选填）</label><input id="ck-note" placeholder="今天状态不错"></div>
  <div class="field"><label>凭证截图（演示占位）</label><button class="btn ghost sm" onclick="toast('上线后此处为截图上传（Keep / 场馆照片等）')">选择图片</button></div>
  <div class="field"><label>谁可以看到这条记录</label>
    <div class="steps">
      <button type="button" class="step doing" onclick="this.parentNode.querySelectorAll('.step').forEach(x=>x.classList.remove('doing'));this.classList.add('doing');this.dataset.v='0'">仅自己</button>
      <button type="button" class="step" data-v="1" onclick="this.parentNode.querySelectorAll('.step').forEach(x=>x.classList.remove('doing'));this.classList.add('doing');this.dataset.v='1'">班内可见</button>
      <button type="button" class="step" data-v="2" onclick="this.parentNode.querySelectorAll('.step').forEach(x=>x.classList.remove('doing'));this.classList.add('doing');this.dataset.v='2'">全员可见</button>
    </div></div>
  <button class="btn block" onclick="ckSubmit('${actId}')">提交记录</button>
  <button class="btn ghost block" style="margin-top:10px" onclick="closeSheet()">取消</button>`);
}
function ckSubmit(actId) {
  const amt = $('#ck-amt').value.trim(); if (!amt) return toast('请填写时长或里程');
  const permBtn = [...document.querySelectorAll('.sheet .step.doing')].pop();
  const perm = permBtn && permBtn.dataset.v !== undefined ? +permBtn.dataset.v : 0;
  const rec = { id: 'r' + Date.now(), act: actId, module: $('#ck-mod').value, amount: amt,
    note: $('#ck-note').value.trim(), perm, date: new Date().toISOString().slice(5, 10) };
  store.set('WY_CK_REC', [rec, ...store.get('WY_CK_REC', [])]);
  closeSheet(); refresh(); toast('打卡成功！记录已保存（演示）');
}

/* ══════════ 子页：游泳证书（公示 / 自查 / 体委统计） ══════════ */
function pageCert() {
  const view = store.get('WY_CERT_VIEW', 'me');
  return `
  <div class="card" style="background:linear-gradient(135deg,#eef4fd,#f7f0fa);border-color:#d8e3f5">
    <b style="font-size:14px">体育部公示 · 发放安排</b>
    ${D.cert.batches.map(b => `<p class="sub" style="margin-top:6px">${b.round}：${b.time} · ${b.place}</p>`).join('')}
    <p class="sub" style="margin-top:6px;font-size:11px">凭校园卡现场核销；名单见下方查询</p>
  </div>
  <div class="seg" style="margin-top:14px">
    <button class="seg-btn ${view === 'me' ? 'on' : ''}" data-certview="me">我的证书查询</button>
    <button class="seg-btn ${view === 'cls' ? 'on' : ''}" data-certview="cls">体委视角（本班统计）</button>
  </div>
  ${view === 'me' ? `
  <div class="card">
    <div style="display:flex;gap:8px">
      <input id="cert-kw" class="search-input" placeholder="输入学号或姓名查询">
      <button class="btn sm" onclick="certQuery()">${icon('search',15)} 查询</button>
    </div>
    <div id="cert-res" style="margin-top:10px"></div>
  </div>` : `
  ${D.cert.classStats.map(c => `
    <div class="card">
      <div class="card-row"><b>${c.cls}</b><span class="pill ${c.done === c.total ? 'pill-open' : 'pill-gold'}">已领 ${c.done} / ${c.total}</span></div>
      <div class="progress"><i style="width:${Math.round(c.done / c.total * 100)}%"></i></div>
      <p class="sub" style="margin-top:4px">待领取 ${c.total - c.done} 人 · 建议体委在发放时段集中带队领取</p>
    </div>`).join('')}
  <p class="sub" style="text-align:center;margin-top:8px">体委视角仅本班数据可见（角色权限见策划案 3.7）</p>`}`;
}
function certQuery() {
  const kw = $('#cert-kw').value.trim();
  const box = $('#cert-res');
  if (!kw) { box.innerHTML = '<p class="sub">请输入学号或姓名</p>'; return; }
  const hit = Object.entries(D.cert.db).find(([sid, v]) => sid.includes(kw) || v.name.includes(kw));
  box.innerHTML = hit ? `
    <div class="card-row" style="padding:10px 0;border-top:1px dashed var(--border)">
      <div><b style="font-size:14px">${hit[1].name} · ${hit[1].cls}</b><p class="sub" style="margin-top:3px">${hit[1].batch} · 学号 ${hit[0]}</p></div>
      <span class="pill ${hit[1].state === '可领取' ? 'pill-open' : hit[1].state === '已领取' ? 'pill-done' : 'pill-gold'}">${hit[1].state}</span>
    </div>
    ${hit[1].state === '可领取' ? `<button class="btn sm" onclick="toast('领取登记成功（演示）')">登记领取</button>` : ''}`
    : '<p class="sub">未查询到记录：可能尚未进入发放名单，请关注下一批公示</p>';
}

/* ══════════ 子页：器材借用 + 活动资源申请 ══════════ */
function pageEquip() {
  return `
  <div class="sec-title"><h2>器材台账</h2></div>
  <div class="card">
    ${D.equipment.map(e => `
    <div class="card-row" style="padding:8px 0;border-bottom:1px dashed var(--border)">
      <div><b style="font-size:14px">${e.name}</b><p class="sub">${e.location}</p></div>
      <span class="sub">可借 <b style="color:${e.available > 0 ? 'var(--green)' : 'var(--red)'};font-size:15px">${e.available}</b> / ${e.total}</span>
    </div>`).join('')}
    <button class="btn sm" style="margin-top:12px" onclick="borrowForm()">个人借用申请</button>
  </div>
  <div class="sec-title"><h2>活动资源申请</h2><span class="sub" style="font-size:12px;color:var(--muted-foreground)">依托活动批量申请</span></div>
  <div class="card">
    <p class="sub">举办班级活动、承办赛事或开设体验营时，可在此按活动整体申请器材与场地资源，一次申请、统一审批，替代逐件零散借用。</p>
    <button class="btn sm" style="margin-top:10px" onclick="resourceForm()">发起活动资源申请</button>
  </div>`;
}
function borrowForm() {
  openSheet(`
  <h2>个人借用申请</h2>
  <div class="field"><label>器材</label><select id="e-name">${D.equipment.map(e => `<option>${e.name}</option>`).join('')}</select></div>
  <div class="field"><label>数量</label><input id="e-num" type="number" value="1" min="1" max="5"></div>
  <div class="field"><label>使用时间</label><input id="e-time" placeholder="如：周三 16:00-18:00"></div>
  <button class="btn block" onclick="submitBorrow()">提交申请</button>
  <button class="btn ghost block" style="margin-top:10px" onclick="closeSheet()">取消</button>`);
}
function submitBorrow() {
  if (!$('#e-time').value.trim()) return toast('请填写使用时间');
  closeSheet(); refresh(); toast('借用申请已提交，待体育部审批（演示）');
}
function resourceForm() {
  openSheet(`
  <h2>活动资源申请</h2>
  <div class="field"><label>依托活动类型</label><select id="r-scene">${D.resourceScenes.map(s => `<option>${s}</option>`).join('')}</select></div>
  <div class="field"><label>活动名称 / 班级</label><input id="r-act" placeholder="如：未央 41 班羽毛球友谊赛"></div>
  <div class="field"><label>所需资源</label><textarea id="r-res" rows="3" placeholder="如：羽毛球拍 ×8、羽毛球 ×2 桶、综体场地 1 片（11.16 周六 14:00-16:00）"></textarea></div>
  <div class="field"><label>说明（选填）</label><input id="r-note" placeholder="预算来源：班团支持计划"></div>
  <button class="btn block" onclick="submitResource()">提交申请</button>
  <button class="btn ghost block" style="margin-top:10px" onclick="closeSheet()">取消</button>`);
}
function submitResource() {
  if (!$('#r-act').value.trim() || !$('#r-res').value.trim()) return toast('请填写活动名称与所需资源');
  closeSheet(); toast('资源申请已提交，体育部将统一审批并协调场地（演示）');
}

/* ══════════ 子页：班团服务（双表 + 审核流） ══════════ */
function pageClass() {
  const f = D.auditFlow;
  return `
  <div class="sec-title"><h2>班团体育支持计划</h2></div>
  <div class="card">
    <div style="display:flex;gap:10px;margin-bottom:12px">
      <button class="btn sm" style="flex:1" onclick="budgetForm()">${icon('plus',14)} 提交预算表</button>
      <button class="btn ghost sm" style="flex:1" onclick="finalForm()">${icon('check',14)} 提交决算表</button>
    </div>
    <ul class="tl">
      ${D.classWork.map(w => `<li class="${w.status === '已通过' ? 'ok' : w.status === '进行中' ? 'now' : ''}">
        <b>${w.name}</b> <span class="pill ${w.status === '待提交' ? 'pill-gold' : w.status === '已通过' ? 'pill-open' : 'pill-doing'}" style="margin-left:6px">${w.status}</span>
        <p class="sub">${w.date}</p></li>`).join('')}
    </ul>
  </div>
  <div class="sec-title"><h2>审核流程（可视化）</h2></div>
  <div class="card">
    <ol class="stepper">
      ${f.steps.map((s, i) => `
        <li class="${i < f.current ? 'ok' : i === f.current ? 'now' : ''}">
          <span class="sp-dot"></span>
          <div><b>${s.name}</b><p class="sub">${s.note}</p></div>
          <span class="pill ${i < f.current ? 'pill-done' : i === f.current ? 'pill-doing' : 'pill-planned'}">${i < f.current ? '已完成' : i === f.current ? '进行中' : '待处理'}</span>
        </li>`).join('')}
    </ol>
    <p class="sub" style="font-size:11px;margin-top:8px">退回时会标注原因并回到第 1 步；全流程留痕可查</p>
  </div>`;
}
function budgetForm() {
  openSheet(`
  <h2>提交预算表</h2>
  <div class="field"><label>项目类别</label><select><option>体育器材采购（班级公共财产）</option><option>校内场地租赁</option><option>其他（一事一议）</option></select></div>
  <div class="field"><label>明细（品名 × 数量 × 单价）</label><textarea rows="3" placeholder="如：羽毛球 ×2 桶 ×130 元；场地 1 片 ×2 小时 ×60 元"></textarea></div>
  <div class="field"><label>总额</label><input placeholder="≤ 剩余额度"></div>
  <button class="btn block" onclick="closeSheet();toast('预算表已提交，进入体育部初审（演示）')">提交</button>
  <button class="btn ghost block" style="margin-top:10px" onclick="closeSheet()">取消</button>`);
}
function finalForm() {
  openSheet(`
  <h2>提交决算表</h2>
  <div class="field"><label>实际支出总额</label><input placeholder="与预算偏差请说明"></div>
  <div class="field"><label>发票张数</label><input type="number" value="1" min="0"></div>
  <div class="field"><label>物资领用名单</label><textarea rows="2" placeholder="领用人逐项登记（演示）"></textarea></div>
  <button class="btn block" onclick="closeSheet();toast('决算表已提交，待负责人复核（演示）')">提交</button>
  <button class="btn ghost block" style="margin-top:10px" onclick="closeSheet()">取消</button>`);
}

/* ══════════ 子页：管理后台 ══════════ */
function pageAdmin() {
  return `
  <p class="sub" style="margin:2px 2px 10px">演示视图：实际仅体育部干事及以上可见（角色权限见策划案 3.7）</p>
  <div class="sec-title"><h2>待办工单</h2></div>
  ${D.admin.todos.map(t => `
    <div class="card card-row">
      <div><b style="font-size:13px">${t.type}</b><p class="sub">${esc(t.text)}</p></div>
      <span class="pill pill-gold">${t.due}</span>
    </div>`).join('')}
  <div class="sec-title"><h2>内部工作节点</h2></div>
  ${D.admin.nodes.map(n => `
    <div class="card"><b style="font-size:14px">${n.event}</b>
    <div class="steps">${n.steps.map(s => `<span class="step ${s.state}" title="${s.due ? '截止 ' + s.due : ''}">${s.name}${s.due ? ' · ' + s.due : ''}</span>`).join('')}</div></div>`).join('')}`;
}

/* ══════════ 路由 ══════════ */
const TABS = {
  home: { label: '首页',     icon: 'home', render: pageHome },
  all:  { label: '全部功能', icon: 'grid',  render: pageAll },
  news: { label: '体育资讯', icon: 'news',  render: pageNews },
  me:   { label: '我的',     icon: 'user',  render: pageMe },
};
const SUB = {
  comp:    { title: '赛事中心',   render: pageComp },
  team:    { title: '系队风采',   render: pageTeam },
  camp:    { title: '运动体验营', render: pageCamp },
  buddy:   { title: '约球搭子',   render: pageBuddy },
  checkin: { title: '打卡活动',   render: pageCheckin },
  cert:    { title: '游泳证书',   render: pageCert },
  equip:   { title: '器材与资源', render: pageEquip },
  class:   { title: '班团报销',   render: pageClass },
  admin:   { title: '体育部工作台', render: pageAdmin },
};

function navTo(id, push) {
  if (!(id in SUB) && !(id in TABS)) id = 'home';
  if (push !== false) history.pushState({ id }, '', '#' + id);
  renderRoute(id);
}
function goBack() { history.back(); }
function refresh() { renderRoute(CUR); }

function renderRoute(id) {
  if (!(id in SUB) && !(id in TABS)) id = CUR = 'home';
  CUR = id;
  const app = $('#app');
  if (id in TABS) {
    app.classList.remove('submode');
    $('#pages').innerHTML = `<div class="page active">${TABS[id].render()}</div>`;
    $('#tabbar').innerHTML = Object.entries(TABS).map(([k, t]) =>
      `<button class="tab ${k === id ? 'on' : ''}" data-tab="${k}">${icon(t.icon, 22)}<span>${t.label}</span></button>`).join('');
    $('#tabbar').hidden = false;
  } else {
    app.classList.add('submode');
    const s = SUB[id];
    $('#pages').innerHTML = `
      <div class="page active">
        <header class="sub-top">
          <button class="icon-btn" onclick="goBack()" aria-label="返回上一页">${icon('back', 20)}</button>
          <h1>${s.title}</h1>
          <button class="icon-btn" onclick="navTo('home')" aria-label="回到首页">${icon('home', 20)}</button>
        </header>
        ${s.render()}
      </div>`;
    $('#tabbar').hidden = true;
  }
  window.scrollTo(0, 0);
}

window.addEventListener('popstate', e => {
  let id = e.state && e.state.id;
  if (!(id in SUB) && !(id in TABS)) {
    const h = location.hash.slice(1);
    id = (h in SUB) || (h in TABS) ? h : 'home';
  }
  renderRoute(id);
});

document.addEventListener('click', e => {
  const nav = e.target.closest('[data-nav]'); if (nav) { navTo(nav.dataset.nav); return; }
  const tab = e.target.closest('[data-tab]'); if (tab) { navTo(tab.dataset.tab); return; }
  const nseg = e.target.closest('[data-nseg]');
  if (nseg) { store.set('WY_NEWS_SEG', nseg.dataset.nseg); refresh(); return; }
  const cseg = e.target.closest('[data-cseg]');
  if (cseg) { store.set('WY_CK_SEG', cseg.dataset.cseg); refresh(); return; }
  const cv = e.target.closest('[data-certview]');
  if (cv) { store.set('WY_CERT_VIEW', cv.dataset.certview); refresh(); return; }
  const chip = e.target.closest('[data-filter]');
  if (chip) { store.set('WY_COMP_FILTER', chip.dataset.filter); refresh(); return; }
  const tchip = e.target.closest('[data-tfilter]');
  if (tchip) { store.set('WY_TEAM_FILTER', tchip.dataset.tfilter); refresh(); return; }
  const wk = e.target.closest('[data-weekly]');
  if (wk) { openSheet(weeklySheet(D.weeklyReports[+wk.dataset.weekly])); return; }
  const cc = e.target.closest('[data-comp]');
  if (cc) { const c = D.competitions.find(x => x.id === cc.dataset.comp); if (c) openSheet(compSheet(c)); return; }
  const tc = e.target.closest('[data-team]');
  if (tc) { const t = D.teams.find(x => x.id === tc.dataset.team); if (t) openSheet(teamSheet(t)); return; }
});

/* 启动：支持 #id 深链接 */
$('#weekChip').textContent = D.term.label;
const initId = location.hash.slice(1);
const startId = (initId in SUB) || (initId in TABS) ? initId : 'home';
history.replaceState({ id: startId }, '', '#' + startId);
renderRoute(startId);
