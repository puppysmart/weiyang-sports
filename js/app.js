/* 未央体育 · 视图层与交互 V0.2
   架构：双 Tab（未央体育 / 个人中心）+ 子页面路由。
   跳转子页面用 history.pushState 压栈，返回按钮 / 手势滑返回触发 popstate 回到上一级，
   不会直接滑出应用。视图只读 WY 数据；用户内容（报名标记、约球帖）存 localStorage（演示）。 */
'use strict';
const $ = (s, p) => (p || document).querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ── 图标（lucide 线性风格） ── */
const P = {
  home:'M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5',
  user:'M4 21c0-4 4-6 8-6s8 2 8 6M8 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0',
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
  video:'M3 8a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM16 10l5-3v10l-5-3',
  medal:'M12 14a5 5 0 1 1 0-10 5 5 0 0 1 0 10zM8.5 13.5 7 21l5-2.5L17 21l-1.5-7.5',
};
const icon = (n, s) => `<svg width="${s||18}" height="${s||18}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${P[n]}"/></svg>`;

const STATUS_PILL = { '报名中':'pill-open','进行中':'pill-doing','已结束':'pill-done','预计':'pill-planned','已满 · 候补中':'pill-gold','预告':'pill-planned','招新中':'pill-open','常年招新':'pill-confirmed' };
const pill = (t, cls) => `<span class="pill ${cls||STATUS_PILL[t]||'pill-confirmed'}">${t}</span>`;

const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { localStorage.setItem(k, JSON.stringify(v)); },
};

/* ── Toast / 浮层 ── */
let toastTimer;
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => (t.hidden = true), 2000);
}
function openSheet(html) {
  $('#sheetLayer').innerHTML =
    `<div class="sheet-mask" onclick="closeSheet()"></div><div class="sheet" role="dialog">${html}</div>`;
  document.body.style.overflow = 'hidden';
}
function closeSheet() {
  $('#sheetLayer').innerHTML = ''; document.body.style.overflow = '';
}

const D = window.WY;
let CUR = 'home';

/* ═══════════════ Tab 页：首页 ═══════════════ */
function pageHome() {
  const eColors = { comp:'#660874', team:'#8d2f9e', camp:'#1e8e5a', buddy:'#3a6fd8', checkin:'#c59b58', cert:'#3a6fd8', class:'#c34a4a', equip:'#5a8a2e' };
  const eIcons = { comp:'trophy', team:'shield', camp:'heart', buddy:'users', checkin:'run', cert:'medal', class:'flag', equip:'volley' };
  return `
  <section class="hero">
    <h1>未央体育</h1>
    <p class="slogan">清华之光，体育未央 · 竞技看得懂，群众找得到</p>
    <div class="meta"><span>学年体育周历</span><span>一站式报名</span><span>约球搭子</span></div>
  </section>
  <div class="entry-grid">
    ${D.entries.map(e => `<button class="entry" data-nav="${e.target}"><span class="ico" style="background:${eColors[e.key]}">${icon(eIcons[e.key],17)}</span>${e.label}</button>`).join('')}
  </div>
  <div class="sec-title"><h2>本周周历</h2><button data-nav="comp">全部赛事</button></div>
  ${D.calendar.map(c => `
    <div class="card card-row" data-nav="comp">
      <div>
        <h3>第 ${c.week} 周 · ${esc(c.title)}</h3>
        <p class="sub">${esc(c.note)}</p>
      </div>
      <div style="text-align:right;flex:none">${pill(c.tag)}<p class="sub" style="margin-top:5px">${c.status === 'confirmed' ? '已确定' : '预计'}</p></div>
    </div>`).join('')}
  <div class="sec-title"><h2>体育周报 · ${D.weekly.no}</h2><span class="sub" style="font-size:12px;color:var(--muted-foreground)">每周一更新</span></div>
  <div class="card"><ul class="weekly">
    ${D.weekly.items.map(i => `<li><span class="dot"></span>${esc(i.text)}</li>`).join('')}
  </ul></div>`;
}

/* ═══════════════ Tab 页：个人中心 ═══════════════ */
function pageMe() {
  const p = D.profile;
  const joined = store.get('WY_JOINED', []);
  const tiles = [
    {id:'cert',  label:'游泳证书', icon:'medal',  note:p.cert},
    {id:'class', label:'班团服务', icon:'flag',   note:'体委工作台'},
    {id:'equip', label:'器材借用', icon:'volley', note:'台账与申请'},
    {id:'admin', label:'管理后台', icon:'shield', note:'仅干事及以上'},
  ];
  return `
  <div class="card card-row" style="background:linear-gradient(135deg,#fff,#f7f0fa)">
    <div style="display:flex;gap:12px;align-items:center">
      <span style="width:46px;height:46px;border-radius:14px;background:var(--primary);color:#fff;display:grid;place-items:center;font-size:18px;font-weight:700">张</span>
      <div><h3>${esc(p.name)} <span class="pill pill-confirmed" style="margin-left:6px">已认证</span></h3>
      <p class="sub" style="margin-top:3px">${esc(p.cls)} · 学号 ${esc(p.sid)}</p></div>
    </div>
  </div>
  <div class="card card-row">
    <div><h3>我的报名</h3><p class="sub" style="margin-top:4px">共 ${joined.length} 条记录（演示）</p></div>
    <button class="btn sm ghost" onclick="toast('报名记录页面开发中，数据结构见 js/data.js')">查看</button>
  </div>
  <div class="sec-title"><h2>常用服务</h2></div>
  <div class="me-grid">
    ${tiles.map(t => `<button class="me-tile" data-nav="${t.id}">
      <span style="color:var(--primary)">${icon(t.icon,24)}</span>
      <b>${t.label}</b><span class="sub">${t.note}</span></button>`).join('')}
  </div>
  <p class="sub" style="text-align:center;margin-top:18px">未央体育框架预览 V0.2 · 内容均为演示占位<br>清华大学未央书院学生会体育部</p>`;
}

/* ═══════════════ 子页面：赛事中心 ═══════════════ */
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
      <div class="steps" style="margin:10px 0 4px">${c.joinTypes.map(t => `<span class="step todo">${t}</span>`).join('')}</div>
      <div class="card-row"><span class="sub">${c.deadline ? '报名截止 ' + c.deadline : c.result || '详见章程'}</span><span class="sub">主办方：${c.host}</span></div>
    </div>`).join('') || '<p class="sub" style="text-align:center;padding:40px 0">该状态下暂无赛事</p>'}`;
}
function compSheet(c) {
  const joined = store.get('WY_JOINED', []);
  return `
  <h2>${esc(c.name)}</h2>
  <div style="margin:4px 0 10px">${pill(c.status)} ${pill(c.host)}</div>
  <div class="kv"><b>赛制安排</b><span>${c.format.join('；')}</span></div>
  <div class="kv"><b>报名方式</b><span>${c.joinTypes.join(' / ')}</span></div>
  ${c.deadline ? `<div class="kv"><b>报名截止</b><span>${c.deadline}</span></div>` : ''}
  ${c.result ? `<div class="kv"><b>最近成绩</b><span>${esc(c.result)}</span></div>` : ''}
  <div class="kv"><b>简介</b><span>${esc(c.summary)}</span></div>
  <p style="font-size:11px;color:var(--muted-foreground);margin:10px 0">章程全文与秩序册将在确定后挂载（演示占位）</p>
  ${joined.includes(c.id)
    ? `<button class="btn block" disabled>${icon('check',16)} 已报名（演示）</button>`
    : `<button class="btn block" onclick="joinForm('${c.id}','赛事报名')">${icon('plus',16)} 立即报名</button>`}`;
}
function joinForm(id, kind) {
  openSheet(`
  <h2>${kind === '系队招新' ? '系队招新报名' : '赛事报名'} · 演示表单</h2>
  <p class="sub" style="font-size:12px;color:var(--muted-foreground)">信息为演示用途，仅保存在本机浏览器</p>
  <div class="field"><label>姓名</label><input id="f-name" value="${esc(D.profile.name)}"></div>
  <div class="field"><label>学号</label><input id="f-sid" placeholder="请输入学号"></div>
  <div class="field"><label>班级</label><select id="f-cls">${['未央 41','未央 42','未央 51','未央 61','未央 65'].map(x => `<option>${x}</option>`).join('')}</select></div>
  <button class="btn block" onclick="submitJoin('${id}')">提交报名</button>
  <button class="btn ghost block" style="margin-top:10px" onclick="closeSheet()">取消</button>`);
}
function submitJoin(id) {
  if (!$('#f-sid').value.trim()) return toast('请填写学号');
  const j = store.get('WY_JOINED', []); if (!j.includes(id)) j.push(id);
  store.set('WY_JOINED', j); closeSheet(); toast('报名成功！数据仅为本地演示');
}

/* ═══════════════ 子页面：系队风采 ═══════════════ */
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
  <div style="display:flex;align-items:center;gap:12px;background:linear-gradient(135deg,#f3e8f6,#faf3e6);border-radius:12px;padding:14px;margin:14px 0">
    <span style="color:#8d2f9e">${icon('video',26)}</span>
    <div><b style="font-size:13px">比赛视频集锦</b><p class="sub">真实强度先看一眼（外链占位 · 上线后对接公众号/视频号）</p></div>
  </div>
  <button class="btn block" onclick="joinForm('${t.id}','系队招新')">${icon('plus',16)} 招新报名 / 咨询</button>`;
}

/* ═══════════════ 子页面：群体活动族 ═══════════════ */
function pageCamp() {
  return D.camps.map(c => `
    <div class="card">
      <div class="card-row"><h3>${esc(c.name)}</h3>${pill(c.status)}</div>
      <p class="sub" style="margin-top:6px">${icon('calendar',13)} ${esc(c.week)} · ${icon('pin',13)} ${esc(c.place)}</p>
      <div class="progress"><i style="width:${Math.round(c.taken / c.cap * 100)}%"></i></div>
      <div class="progress-note"><span>已报 ${c.taken} / ${c.cap} 人</span><span>${c.taken >= c.cap ? '候补队列开放中' : '先到先得'}</span></div>
      <p class="sub" style="margin:8px 0 10px">${esc(c.sci)}</p>
      ${c.status === '报名中' ? `<button class="btn sm" onclick="toast('体验营报名成功（演示）——候补机制见策划案 3.4')">立即报名</button>`
        : `<button class="btn ghost sm" onclick="toast('已加入候补队列（演示），有退订将按序递补')">候补登记</button>`}
    </div>`).join('') +
  `<p class="sub" style="text-align:center;margin-top:8px">定期场地 + 运动科普 + 先到先得 · 新项目持续增加</p>`;
}
function pageCheckin() {
  return D.checkins.map(c => `
    <div class="card">
      <div class="card-row"><h3>${c.name}</h3><span class="pill pill-confirmed">${c.progress}</span></div>
      <p class="sub" style="margin-top:6px">${c.desc}</p>
      <div class="progress"><i style="width:67%"></i></div>
      <div class="progress-note"><span>全年级参与率 ${c.rate}</span><span>每日可提交多次凭证</span></div>
      <button class="btn sm" style="margin-top:10px" onclick="toast('凭证提交演示：跑步截图 / 场馆照片 / 球类合影')">提交今日打卡</button>
    </div>`).join('') +
  `<div class="card card-row"><div><h3>夏季训练打卡</h3><p class="sub" style="margin-top:4px">假期开放 · 35/25/15 天三档奖品</p></div><span class="pill pill-planned">未开始</span></div>`;
}
function pageBuddy() {
  const extra = store.get('WY_BUDDIES', []);
  const buddies = [...extra, ...D.buddies];
  return `
  <button class="btn block" style="margin-bottom:14px" onclick="buddyForm()">${icon('plus',16)} 发布约球</button>
  ${buddies.map(b => `
    <div class="card card-row">
      <div>
        <h3>${esc(b.sport)} · ${esc(b.time)}</h3>
        <p class="sub" style="margin-top:4px">${icon('pin',12)} ${esc(b.place)} · 还缺 <b style="color:var(--primary)">${b.need}</b> 人 · ${esc(b.note)}</p>
        <p class="sub" style="margin-top:3px">${esc(b.author)} · ${esc(b.ts)}</p>
      </div>
      <button class="btn sm" onclick="toast('已应答！满员后将以平台消息提醒建群（演示）')">应答</button>
    </div>`).join('')}
  <p class="sub" style="text-align:center;margin-top:8px">满员后帖子自动关闭并引导建群 · 请注意线下运动安全</p>`;
}
function buddyForm() {
  openSheet(`
  <h2>发布约球</h2>
  <div class="field"><label>项目</label><select id="b-sport">${['羽毛球','篮球','跑步','乒乓球','网球','飞盘','其他'].map(x => `<option>${x}</option>`).join('')}</select></div>
  <div class="field"><label>时间</label><input id="b-time" placeholder="如：周三 20:00"></div>
  <div class="field"><label>场地</label><input id="b-place" placeholder="如：综体 / 气膜馆 / 紫操"></div>
  <div class="field"><label>还需要几人</label><input id="b-need" type="number" value="2" min="1" max="10"></div>
  <div class="field"><label>水平说明</label><input id="b-note" placeholder="如：中等水平，打养生球"></div>
  <button class="btn block" onclick="submitBuddy()">发布</button>
  <button class="btn ghost block" style="margin-top:10px" onclick="closeSheet()">取消</button>`);
}
function submitBuddy() {
  const v = id => $(id).value.trim();
  if (!v('#b-time') || !v('#b-place')) return toast('请填写时间与场地');
  const post = { id: 'u' + Date.now(), sport: v('#b-sport'), time: v('#b-time'), place: v('#b-place'),
    need: +v('#b-need') || 1, note: v('#b-note') || '水平不限', author: esc(D.profile.cls) + ' · 我', ts: '刚刚' };
  store.set('WY_BUDDIES', [post, ...store.get('WY_BUDDIES', [])]);
  closeSheet(); refresh(); toast('发布成功！满员后记得回来关闭帖子（演示）');
}

/* ═══════════════ 子页面：事务服务族 ═══════════════ */
function pageCert() {
  const p = D.profile;
  return `
  <div class="card card-row">
    <div style="display:flex;gap:10px;align-items:center"><span style="color:#3a6fd8">${icon('medal',22)}</span>
    <div><b style="font-size:14px">游泳测试合格证书</b><p class="sub">${p.cert} · 凭学号现场核销</p></div></div>
    <button class="btn sm" onclick="toast('领取登记成功（演示）：第 10 周周五 12:30-13:30 书院一层')">登记领取</button>
  </div>
  <div class="card">
    <b style="font-size:14px">领取说明</b>
    <p class="sub" style="margin-top:6px">① 在线登记选择领取时段（先到先得）；② 携校园卡按时段到场；③ 现场扫码核销、记录留痕。替代原先"群里接龙 + 纸质签到"。</p>
  </div>`;
}
function pageClass() {
  return `
  <div class="card"><ul class="tl">
    ${D.classWork.map(w => `<li class="${w.status === '已通过' ? 'ok' : w.status === '进行中' ? 'now' : ''}">
      <b>${w.name}</b> <span class="pill ${w.status === '待提交' ? 'pill-gold' : w.status === '已通过' ? 'pill-open' : 'pill-doing'}" style="margin-left:6px">${w.status}</span>
      <p class="sub">${w.date}</p></li>`).join('')}
  </ul>
  <button class="btn ghost sm" style="margin-top:12px" onclick="toast('在线填报为演示；上线后替代"云盘压缩包 + 微信催"（策划案 3.5）')">提交决算材料</button></div>
  <div class="card"><b style="font-size:14px">规则速览</b>
  <p class="sub" style="margin-top:6px">每班每学年基础额度 500 元；学期评估按活动量（60 分）与参与实效（40 分）计分，前 40% 班级梯度追加（500/300/200 元）。</p></div>`;
}
function pageEquip() {
  return `
  <div class="card">
    ${D.equipment.map(e => `
    <div class="card-row" style="padding:8px 0;border-bottom:1px dashed var(--border)">
      <div><b style="font-size:14px">${e.name}</b><p class="sub">${e.location}</p></div>
      <span class="sub">可借 <b style="color:${e.available > 0 ? 'var(--green)' : 'var(--red)'};font-size:15px">${e.available}</b> / ${e.total}</span>
    </div>`).join('')}
    <button class="btn sm" style="margin-top:12px" onclick="borrowForm()">借用申请</button>
  </div>
  <div class="card"><b style="font-size:14px">借还规则</b>
  <p class="sub" style="margin-top:6px">在线申请 → 体育部审批 → 领用登记 → 归还销账；到期未还自动提醒，每学期盘点一次。替代共享文档台账（策划案 3.6）。</p></div>`;
}
function borrowForm() {
  openSheet(`
  <h2>器材借用申请</h2>
  <div class="field"><label>器材</label><select id="e-name">${D.equipment.map(e => `<option>${e.name}</option>`).join('')}</select></div>
  <div class="field"><label>数量</label><input id="e-num" type="number" value="1" min="1" max="5"></div>
  <div class="field"><label>使用时间</label><input id="e-time" placeholder="如：周三 16:00-18:00"></div>
  <div class="field"><label>事由</label><input id="e-note" placeholder="如：班级体育活动"></div>
  <button class="btn block" onclick="submitBorrow()">提交申请</button>
  <button class="btn ghost block" style="margin-top:10px" onclick="closeSheet()">取消</button>`);
}
function submitBorrow() {
  if (!$('#e-time').value.trim()) return toast('请填写使用时间');
  closeSheet(); refresh(); toast('借用申请已提交，待体育部审批（演示）');
}

/* ═══════════════ 子页面：管理后台 ═══════════════ */
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
    <div class="steps">${n.steps.map(s => `<span class="step ${s.state}" title="${s.due ? '截止 ' + s.due : ''}">${s.name}${s.due ? ' · ' + s.due : ''}</span>`).join('')}</div></div>`).join('')}
  <p class="sub" style="font-size:11px">节点视图与首页周历联动（策划案 3.1 / 3.7）：确认一项、亮一项，同学端只展示确定信息。</p>`;
}

/* ═══════════════ 路由（history 返回机制） ═══════════════ */
const TABS = {
  home: { label: '未央体育', icon: 'home', render: pageHome },
  me:   { label: '个人中心', icon: 'user',  render: pageMe },
};
const SUB = {
  comp:    { title: '赛事中心',   render: pageComp },
  team:    { title: '系队风采',   render: pageTeam },
  camp:    { title: '运动体验营', render: pageCamp },
  buddy:   { title: '约球搭子',   render: pageBuddy },
  checkin: { title: '打卡活动',   render: pageCheckin },
  cert:    { title: '游泳证书',   render: pageCert },
  class:   { title: '班团服务',   render: pageClass },
  equip:   { title: '器材借用',   render: pageEquip },
  admin:   { title: '管理后台',   render: pageAdmin },
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
      `<button class="tab ${k === id ? 'on' : ''}" data-tab="${k}">${icon(t.icon, 23)}<span>${t.label}</span></button>`).join('');
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
  if (!(id in SUB) && !(id in TABS)) id = (location.hash.slice(1) in SUB) || (location.hash.slice(1) in TABS) ? location.hash.slice(1) : 'home';
  renderRoute(id);
});

/* ── 全局事件代理 ── */
document.addEventListener('click', e => {
  const nav = e.target.closest('[data-nav]'); if (nav) { navTo(nav.dataset.nav); return; }
  const tab = e.target.closest('[data-tab]'); if (tab) { navTo(tab.dataset.tab); return; }
  const chip = e.target.closest('[data-filter]');
  if (chip) { store.set('WY_COMP_FILTER', chip.dataset.filter); refresh(); return; }
  const tchip = e.target.closest('[data-tfilter]');
  if (tchip) { store.set('WY_TEAM_FILTER', tchip.dataset.tfilter); refresh(); return; }
  const cc = e.target.closest('[data-comp]');
  if (cc) { const c = D.competitions.find(x => x.id === cc.dataset.comp); if (c) openSheet(compSheet(c)); return; }
  const tc = e.target.closest('[data-team]');
  if (tc) { const t = D.teams.find(x => x.id === tc.dataset.team); if (t) openSheet(teamSheet(t)); return; }
});

/* ── 启动：支持 #id 直达子页面（深链接） ── */
$('#weekChip').textContent = D.term.label;
const initId = location.hash.slice(1);
history.replaceState({ id: (initId in SUB || initId in TABS) ? initId : 'home' }, '',
                      '#' + ((initId in SUB || initId in TABS) ? initId : 'home'));
renderRoute(initId in SUB ? initId : (initId in TABS ? initId : 'home'));
