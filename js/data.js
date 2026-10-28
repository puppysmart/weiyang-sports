/* 未央体育 · 数据层
   维护约定（与天境祁连项目一致）：数据与视图分离，内容只在本文件维护，视图只读数据。
   ⚠ 全部条目为演示占位数据，上线前需逐项核对替换；
   带 sourceNote 的条目参照了未央书院官网"文体活动"栏目与体育部工作资料。 */

/** @typedef {'planned'|'confirmed'} CalStatus 周历状态：预计开设 / 已确定 */

/** 学期与周次 */
const term = { label: '2026 秋 · 第 9 周', week: 9 };

/** 首页 · 学年体育周历（预计 vs 确定，对应策划案 3.1） */
const calendar = [
  { week: 10, title: '长乐杯 · 八系联合乒乓球联赛', status: 'confirmed', tag: '报名中', type: '联办', note: '八系混编联队 · 报名截止 10.31' },
  { week: 10, title: '气排球联赛 · 小组赛', status: 'confirmed', tag: '进行中', type: '院级', note: '综体 · 每周三/六晚' },
  { week: 11, title: '马杯足球 · 小组赛 vs 行健', status: 'confirmed', tag: '赛前', type: '马杯', note: '西操 · 时间以赛程为准' },
  { week: 12, title: '迷你马拉松', status: 'planned', tag: '预计', type: '群体', note: '名额与路线待确认后开放报名' },
  { week: 13, title: '冰雪运动会', status: 'planned', tag: '预计', type: '群体', note: '等待学校统一通知' },
  { week: 14, title: '班团体育支持计划 · 评估节点', status: 'confirmed', tag: '内部', type: '班团', note: '材料提交截止第 12 周周四' },
];

/** 首页 · 体育周报（沿用"未央体育 周报 WEEK N"栏式） */
const weekly = {
  no: 'WEEK 9',
  title: '未央体育周报',
  items: [
    { icon: 'trophy', text: '新生赤足运动会收官：未央 7 金 1 银 3 铜', sourceNote: '参照 2025-09 官网战报' },
    { icon: 'flag', text: '长乐杯乒乓球报名过半，八系混编联队规则见赛事中心' },
    { icon: 'volley', text: '气排球联赛揭幕，A 组未央 41 逆转取胜' },
    { icon: 'run', text: '新生体育打卡进入第三周，全年级参与率 82%' },
  ],
};

/** 首页 · 快速入口 */
const entries = [
  { key: 'comp', label: '赛事报名', target: 'comp' },
  { key: 'team', label: '系队风采', target: 'team' },
  { key: 'camp', label: '运动体验营', target: 'camp' },
  { key: 'buddy', label: '约球搭子', target: 'buddy' },
  { key: 'checkin', label: '打卡活动', target: 'checkin' },
  { key: 'cert', label: '游泳证书', target: 'cert' },
  { key: 'class', label: '班团服务', target: 'class' },
  { key: 'equip', label: '器材借用', target: 'equip' },
];

/** 赛事中心 */
const competitions = [
  { id: 'clbg', name: '长乐杯 · 八系联合乒乓球联赛', host: '八系联办', status: '报名中', deadline: '10.31 23:59',
    joinTypes: ['混编联队', '个人'], summary: '八系混编联队制，同班同学可能被拆入不同联队；比赛日 11.21-11.22。',
    format: ['八系混编抽签组队', '团体赛 + 擂台赛', '参赛即有纪念品'] },
  { id: 'mp5', name: '马杯足球（乙级）', host: '校级马杯', status: '进行中', deadline: null,
    joinTypes: ['院队'], summary: '未央代表队卫冕之路（23-24 赛季马五冠军 6:3 击败能动）。', format: ['小组赛 + 淘汰赛'] },
  { id: 'psdh', name: '排山倒海 · 班级排球赛', host: '院级', status: '进行中', deadline: null,
    joinTypes: ['班级'], summary: '以班级为单位报名，女生上场有加分规则。', format: ['小组赛 35 分制', '淘汰赛 3 局 2 胜'] },
  { id: 'ylb', name: '源力杯 · 四系联合羽毛球联赛', host: '四系联办', status: '已结束', deadline: null,
    joinTypes: ['双打团体', '单打擂台'], summary: '能动·未央·行健·自强四系联办，64 人规模。', format: ['小组循环 + 淘汰赛'], result: '未央二队获团体季军（演示占位）' },
  { id: 'fb', name: '班级足球联赛', host: '院级', status: '预计', deadline: null,
    joinTypes: ['班级联队'], summary: '分档联队制（A/B/C 档班级组合），下学期开赛。', format: ['分档投票', '联队抽签', '小组 + 淘汰'] },
];

/** 系队风采（入门友好度为核心信息，对应策划案 3.3） */
const teams = [
  { id: 'football', name: '足球队', honors: '23-24 马杯马五冠军', friendly: false, level: '需基础',
    train: '每周二 / 五 17:30 · 西操', recruit: '招新中', members: 26,
    intro: '未央足球的传统强队，欢迎有比赛经验的同学加入；零基础同学建议先参加班级联赛练级。' },
  { id: 'mbasket', name: '男篮队', honors: '书院杯四强', friendly: true, level: '零基础可入',
    train: '每周三 20:00 · 综体', recruit: '常年招新', members: 18,
    intro: '分一队与训练组：一队打马杯，训练组零基础跟练，学期中可升级进入一队。' },
  { id: 'volley', name: '排球队', honors: '鱼跃杯八强', friendly: true, level: '零基础可入',
    train: '每周六 15:00 · 东操排球场', recruit: '招新中', members: 21,
    intro: '气氛型队伍，每周一次快乐排球，代表队打马杯与鱼跃杯。' },
  { id: 'bad', name: '羽毛球队', honors: '源力杯团体季军', friendly: true, level: '零基础可入',
    train: '每周日 14:00 · 气膜馆', recruit: '招新中', members: 24,
    intro: '人多热闹，水平跨度大；每学期内部排位赛，冠军有奖品。' },
  { id: 'tt', name: '乒乓球队', honors: '长乐杯承办队', friendly: true, level: '零基础可入',
    train: '每周五 19:00 · 北体育馆', recruit: '常年招新', members: 16,
    intro: '本学期的长乐杯东道主，欢迎来当东道主队员兼志愿者。' },
  { id: 'go', name: '围棋队', honors: '马杯混排亚军', friendly: true, level: '零基础可入',
    train: '每周四 19:00 · 书院活动室', recruit: '招新中', members: 12,
    intro: '历史最佳战绩的智力系队，从入门规则教起，能下棋就能上场。' },
];

/** 群体活动 · 运动体验营（雨课堂机制：定期场地 + 科普 + 先到先得） */
const camps = [
  { id: 'qv', name: '气排球体验营', week: '第 10 周周六 15:00', place: '综合体育馆', cap: 24, taken: 22,
    status: '报名中', sci: '15 分钟规则科普 + 分组对抗，器材由体育部提供' },
  { id: 'fd', name: '飞盘体验营', week: '第 11 周周六 10:00', place: '紫荆操场', cap: 16, taken: 16,
    status: '已满 · 候补中', sci: '极限飞盘入门：传接盘练习 + 混合友谊赛' },
  { id: 'sq', name: '壁球体验营', week: '第 12 周（待定）', place: '北体育馆', cap: 8, taken: 0,
    status: '预告', sci: '场地确认后开放报名，先到先得' },
];

/** 群体活动 · 打卡 */
const checkins = [
  { id: 'fresh', name: '新生体育打卡', progress: 'DAY 14 / 21', rate: '82%', desc: '跑步 / 场馆 / 球类 / 冰雪 / 跟练五模块' },
];

/** 群体活动 · 约球搭子（演示帖） */
const buddies = [
  { id: 'b1', sport: '羽毛球', time: '周三 20:00', place: '综体', need: 2, note: '中等水平，打养生球', author: '未央 42 · 李同学', ts: '2 小时前' },
  { id: 'b2', sport: '篮球', time: '周五 16:30', place: '北体育馆', need: 3, note: '半场 3v3，来了就有球打', author: '未央 65 · 王同学', ts: '5 小时前' },
  { id: 'b3', sport: '跑步', time: '明早 7:00', place: '紫操', need: 1, note: '阳光长跑配速 6 分半，找搭子', author: '未央 51 · 陈同学', ts: '昨天' },
];

/** 物资借用 · 器材台账（演示数据） */
const equipment = [
  { name: '篮球', total: 12, available: 7, location: '体育部器材室（书院活动中心）' },
  { name: '羽毛球拍', total: 8, available: 3, location: '体育部器材室' },
  { name: '气排球', total: 6, available: 4, location: '体育部器材室' },
  { name: '筋膜枪', total: 2, available: 2, location: '体育部器材室（押金借用）' },
  { name: '拔河绳', total: 2, available: 2, location: '器材室（仅赛事借用）' },
];

/** 我的 · 班团工作台（体委视角演示） */
const classWork = [
  { name: '秋季预算申报', status: '已通过', date: '额度 500 元' },
  { name: '班级活动记录', status: '进行中', date: '已组织 2 / 2 次' },
  { name: '决算与票据提交', status: '待提交', date: '截止 12.20' },
];

/** 我的 · 管理后台演示（待办 + 内部工作节点视图，对应策划案 3.1 / 3.7） */
const admin = {
  todos: [
    { type: '材料审核', text: '未央 43 班团预算表待审', due: '今日' },
    { type: '内容发布', text: '长乐杯章程推送待排版', due: '明日' },
    { type: '名单核对', text: '游泳测试通过名单导入', due: '本周' },
  ],
  nodes: [
    { event: '长乐杯 · 乒乓球联赛', steps: [
      { name: '立项', state: 'done' }, { name: '章程定稿', state: 'done' },
      { name: '报名开启', state: 'doing' }, { name: '秩序册', state: 'todo', due: '11.05' },
      { name: '比赛日', state: 'todo', due: '11.21' }, { name: '决算归档', state: 'todo', due: '12.10' },
    ] },
    { event: '班级足球联赛', steps: [
      { name: '立项', state: 'done' }, { name: '分档投票', state: 'todo', due: '下学期 W1' },
      { name: '联队抽签', state: 'todo', due: 'W2' }, { name: '小组赛', state: 'todo', due: 'W3-8' },
    ] },
  ],
};

/** 我的 · 演示账号 */
const profile = { name: '张同学', cls: '未央 41', sid: '2026XXXXXXX', cert: '待领取 3 张' };

window.WY = { term, calendar, weekly, entries, competitions, teams, camps, checkins, buddies, equipment, classWork, admin, profile };
