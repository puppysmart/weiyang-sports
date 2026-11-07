/* 未央体育 · 调整版数据层（preview）
   面向学弟学妹建议的 V0.3-preview：四 Tab + 日历周历 + 赛事难度分级 + 打卡三件套
   + 证书三视角 + 活动资源申请 + 班团双表与审核流 + 资讯中心 + 个人中心查询。
   ⚠ 全部条目为演示占位数据，上线前逐项核对替换。 */

const term = { label: '2026 秋 · 第 10 周', month: '2026-11' };

/* ── 首页 · 月历（有活动的日期涂色，点击跳转） ── */
const calendarDates = {
  '11-05': { title: '长乐杯秩序册发布', type: 'comp', target: 'comp' },
  '11-08': { title: '马杯足球 vs 行健', type: 'comp', target: 'comp' },
  '11-14': { title: '气排球联赛小组赛', type: 'comp', target: 'comp' },
  '11-15': { title: '迷你马拉松', type: 'mass', target: 'camp' },
  '11-21': { title: '长乐杯比赛日', type: 'comp', target: 'comp' },
  '11-22': { title: '长乐杯比赛日', type: 'comp', target: 'comp' },
  '11-28': { title: '冰雪运动会（预计）', type: 'mass', target: 'camp' },
};

/* ── 首页 · 近期活动（点击跳转子页） ── */
const weeklyList = [
  { d: '11-07 周六', title: '长乐杯报名截止', tag: '报名中', target: 'comp', note: '八系混编 · 今晚 23:59 截止' },
  { d: '11-08 周日', title: '马杯足球小组赛 vs 行健', tag: '已确定', target: 'comp', note: '西操 15:00 · 卫冕之队' },
  { d: '11-10 周二', title: '气排球体验营', tag: '报名中', target: 'camp', note: '综体 20:00 · 仅剩 2 个名额' },
  { d: '11-15 周日', title: '迷你马拉松', tag: '预计', target: 'camp', note: '名额与路线确认后开放报名' },
];

/* ── 球类专属能力对照表（1-5 分；约球与赛事难度共用） ── */
const levelTables = {
  tt: { name: '乒乓球', rows: [
    { lv: 1, desc: '零基础：会握拍，能来回 2-3 板' },
    { lv: 2, desc: '入门：基本发球与推挡，打过班级赛' },
    { lv: 3, desc: '进阶：正反手攻球稳定，有旋转意识' },
    { lv: 4, desc: '高手：有校内外比赛经验，能执行战术' },
    { lv: 5, desc: '院队级：马杯出场水平' } ] },
  bad: { name: '羽毛球', rows: [
    { lv: 1, desc: '零基础：能打过网，不太计分' },
    { lv: 2, desc: '入门：高远球到位，打过养生双打' },
    { lv: 3, desc: '进阶：会步法与吊杀，打过排位赛' },
    { lv: 4, desc: '高手：校际比赛经验，双打有战术' },
    { lv: 5, desc: '院队级：源力杯出场水平' } ] },
  volley: { name: '排球', rows: [
    { lv: 1, desc: '零基础：能垫起下手发球' },
    { lv: 2, desc: '入门：垫传稳定，能接一传' },
    { lv: 3, desc: '进阶：会扣球与拦网，打过班级联赛' },
    { lv: 4, desc: '高手：鱼跃杯主力水平，懂轮次' },
    { lv: 5, desc: '院队级：马杯首发' } ] },
  fb: { name: '足球', rows: [
    { lv: 1, desc: '零基础：能跑位传球' },
    { lv: 2, desc: '入门：停传基本可靠，踢过班级赛' },
    { lv: 3, desc: '进阶：有位置意识，能打满全场' },
    { lv: 4, desc: '高手：马杯替补/联赛主力' },
    { lv: 5, desc: '院队级：马杯首发' } ] },
  run: { name: '跑步', rows: [
    { lv: 1, desc: ' 3 km 配速 8\' 以内可完成' },
    { lv: 2, desc: '5 km 配速 7\' 以内' },
    { lv: 3, desc: '10 km 配速 6\'30" 以内' },
    { lv: 4, desc: '半马完赛，配速 6\' 以内' },
    { lv: 5, desc: '院队级：马杯中长跑出场' } ] },
};

/* ── 全部功能 · 八大功能入口 ── */
const entries = [
  { key: 'comp', label: '赛事报名', target: 'comp', group: '竞技' },
  { key: 'team', label: '系队风采', target: 'team', group: '竞技' },
  { key: 'camp', label: '运动体验营', target: 'camp', group: '群体' },
  { key: 'buddy', label: '约球搭子', target: 'buddy', group: '群体' },
  { key: 'checkin', label: '打卡活动', target: 'checkin', group: '群体' },
  { key: 'cert', label: '游泳证书', target: 'cert', group: '服务' },
  { key: 'equip', label: '器材借用', target: 'equip', group: '服务' },
  { key: 'class', label: '班团报销', target: 'class', group: '服务' },
];

/* ── 赛事中心（含难度分级 + 过往成绩） ── */
const competitions = [
  { id: 'clbg', name: '长乐杯 · 八系联合乒乓球联赛', host: '八系联办', status: '报名中', deadline: '11.07 23:59',
    joinTypes: ['混编联队', '个人'], levelKey: 'tt', difficulty: 2, recommend: 2,
    summary: '八系混编联队制，同班同学可能被拆入不同联队；比赛日 11.21-11.22。',
    format: ['八系混编抽签组队', '团体赛 + 擂台赛', '参赛即有纪念品'],
    pastResults: ['2025 第五届 · 未央一队 团体亚军', '2024 第四届 · 未央一队 四强', '2023 第三届 · 未央二队 八强'] },
  { id: 'mp5', name: '马杯足球（乙级）', host: '校级马杯', status: '进行中', deadline: null,
    joinTypes: ['院队'], levelKey: 'fb', difficulty: 4, recommend: 4,
    summary: '未央代表队卫冕之路（23-24 赛季马五冠军 6:3 击败能动）。',
    format: ['小组赛 + 淘汰赛'],
    pastResults: ['23-24 赛季 · 马五冠军（6:3 胜能动）', '22-23 赛季 · 马乙四强', '21-22 赛季 · 小组出线'] },
  { id: 'psdh', name: '排山倒海 · 班级排球赛', host: '院级', status: '进行中', deadline: null,
    joinTypes: ['班级'], levelKey: 'volley', difficulty: 1, recommend: 1,
    summary: '以班级为单位报名，女生上场有加分规则，零基础友好。',
    format: ['小组赛 35 分制', '淘汰赛 3 局 2 胜'],
    pastResults: ['2025 秋 · 冠军 未央 61 班', '2025 春 · 冠军 未央 43 班'] },
  { id: 'ylb', name: '源力杯 · 四系联合羽毛球联赛', host: '四系联办', status: '已结束', deadline: null,
    joinTypes: ['双打团体', '单打擂台'], levelKey: 'bad', difficulty: 2, recommend: 2,
    summary: '能动·未央·行健·自强四系联办，64 人规模。',
    format: ['小组循环 + 淘汰赛'], result: '未央二队获团体季军（演示占位）',
    pastResults: ['2026 春 · 团体季军', '2025 春 · 团体冠军'] },
  { id: 'fb', name: '班级足球联赛', host: '院级', status: '预计', deadline: null,
    joinTypes: ['班级联队'], levelKey: 'fb', difficulty: 2, recommend: 1,
    summary: '分档联队制（A/B/C 档班级组合），下学期开赛，零基础可参加。',
    format: ['分档投票', '联队抽签', '小组 + 淘汰'],
    pastResults: ['2025-26 赛季 · 冠军 A 联队', '2024-25 赛季 · 冠军 C 联队'] },
];

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

const camps = [
  { id: 'qv', name: '气排球体验营', week: '11-10 周二 20:00', place: '综合体育馆', cap: 24, taken: 22,
    status: '报名中', sci: '15 分钟规则科普 + 分组对抗，器材由体育部提供' },
  { id: 'fd', name: '飞盘体验营', week: '11-15 周日 10:00', place: '紫荆操场', cap: 16, taken: 16,
    status: '已满 · 候补中', sci: '极限飞盘入门：传接盘练习 + 混合友谊赛' },
  { id: 'sq', name: '壁球体验营', week: '11-29 周日（待定）', place: '北体育馆', cap: 8, taken: 0,
    status: '预告', sci: '场地确认后开放报名，先到先得' },
];

const buddies = [
  { id: 'b1', sport: '羽毛球', lv: 3, time: '周三 20:00', place: '综体', need: 2, note: '进阶水平，打排位', author: '未央 42 · 李同学', ts: '2 小时前' },
  { id: 'b2', sport: '篮球', lv: 2, time: '周五 16:30', place: '北体育馆', need: 3, note: '入门半场 3v3', author: '未央 65 · 王同学', ts: '5 小时前' },
  { id: 'b3', sport: '跑步', lv: 2, time: '明早 7:00', place: '紫操', need: 1, note: '阳光长跑配速 6 分半', author: '未央 51 · 陈同学', ts: '昨天' },
];

/* ── 打卡活动（报名 → 发记录 → 排行榜 三件套） ── */
const checkinActs = [
  { id: 'winter', name: '寒假运动打卡', status: '报名中', window: '2027.1.18 - 2.28',
    modules: ['跑步', '球类', '冰雪', '软件跟练'], rule: '打卡 35 / 25 / 15 天分别对应一二三档奖品', joined: 386 },
  { id: 'fresh', name: '新生体育打卡', status: '进行中', window: '8.24 - 9.13',
    modules: ['跑步', '场馆', '球类', '冰雪', '跟练'], rule: '21 天 · 五模块 · 前 3 名额外奖品', joined: 512 },
];
const checkinBoard = [
  { name: '未央 53 · 刘同学', days: 21 },
  { name: '未央 41 · 张同学', days: 19 },
  { name: '未央 61 · 赵同学', days: 18 },
  { name: '未央 42 · 孙同学', days: 16 },
  { name: '未央 65 · 周同学', days: 15 },
  { name: '未央 51 · 吴同学', days: 13 },
  { name: '未央 44 · 郑同学', days: 11 },
  { name: '未央 62 · 冯同学', days: 9 },
];

/* ── 游泳证书（公示 + 自查 + 体委统计） ── */
const cert = {
  batches: [
    { round: '第一批', time: '第 10 周周五 12:30 - 13:30', place: '书院一层大厅' },
    { round: '第二批', time: '第 12 周周三 12:30 - 13:30', place: '书院一层大厅' },
  ],
  db: {
    '2026XXXXXXX': { name: '张同学', cls: '未央 41', state: '可领取', batch: '第一批' },
    '2026010101': { name: '李同学', cls: '未央 42', state: '已领取', batch: '第一批' },
    '2026010102': { name: '王同学', cls: '未央 41', state: '待第二批' },
    '2026010103': { name: '陈同学', cls: '未央 43', state: '可领取', batch: '第二批' },
  },
  classStats: [
    { cls: '未央 41', total: 12, done: 5 }, { cls: '未央 42', total: 9, done: 3 },
    { cls: '未央 43', total: 11, done: 4 }, { cls: '未央 51', total: 10, done: 6 },
  ],
};

/* ── 器材与活动资源申请 ── */
const equipment = [
  { name: '篮球', total: 12, available: 7, location: '体育部器材室（书院活动中心）' },
  { name: '羽毛球拍', total: 8, available: 3, location: '体育部器材室' },
  { name: '气排球', total: 6, available: 4, location: '体育部器材室' },
  { name: '筋膜枪', total: 2, available: 2, location: '体育部器材室（押金借用）' },
  { name: '拔河绳', total: 2, available: 2, location: '器材室（仅赛事借用）' },
];
const resourceScenes = ['班团体育活动', '院级赛事（本院承办）', '体验营 / 打卡活动', '系队训练', '其他（备注说明）'];

/* ── 班团报销（双表 + 可视化审核流） ── */
const classWork = [
  { name: '秋季预算申报', status: '已通过', date: '额度 500 元' },
  { name: '班级活动记录', status: '进行中', date: '已组织 2 / 2 次' },
  { name: '决算与票据提交', status: '待提交', date: '截止 12.20' },
];
const auditFlow = {
  current: 1,
  steps: [
    { name: '体委提交', note: '预算 / 决算表与凭证' },
    { name: '体育部初审', note: '口径与票据核对 · 进行中' },
    { name: '负责人复核', note: '额度与评分核验' },
    { name: '书院财务', note: '归档并公示' },
  ],
};

/* ── 体育资讯（周报 / 通知公告 / 系队招募） ── */
const weeklyReports = [
  { no: 'WEEK 10', date: '11-09 发布',
    results: ['新生赤足运动会收官：未央 7 金 1 银 3 铜', '马杯足球 3:1 胜环境，小组出线在望', '气排球联赛 A 组未央 41 逆转取胜'],
    preview: ['11.21-22 长乐杯比赛日（北体育馆）', '11.15 迷你马拉松报名即将开启', '围棋队马杯混排决赛 11.28'] },
  { no: 'WEEK 9', date: '11-02 发布',
    results: ['源力杯羽毛球圆满收官，未央二队季军', '未央男篮书院杯首战 62:55 取胜', '新生打卡结束，全年级参与率 82%'],
    preview: ['长乐杯乒乓球报名开启（11.07 截止）', '气排球联赛揭幕战 11.05', '游泳证书第一批发放安排公示'] },
];
const notices = [
  { type: '公示', title: '游泳测试证书第一批发放安排', date: '11-04', body: '第 10 周周五 12:30-13:30 书院一层大厅，凭校园卡核销领取；名单见"游泳证书"页查询。' },
  { type: '报名', title: '长乐杯八系乒乓球联队报名', date: '11-01', body: '八系混编联队制，报名 11.07 23:59 截止，入口见赛事中心。' },
  { type: '场地', title: '气膜馆 11 月检修时段', date: '10-30', body: '每周一 8:00-12:00 暂停开放，约球请避开该时段。' },
  { type: '活动', title: '寒假运动打卡预热', date: '10-28', body: '1.18 开赛，35/25/15 天三档奖品，即日起可预报名。' },
];
const recruits = [
  { team: '围棋队', deadline: '11.15', level: '零基础可入', text: '马杯混排亚军之队招新，从规则教起，能下棋就能上场。', target: 'team' },
  { team: '女排队', deadline: '11.20', level: '零基础可入', text: '备战鱼跃杯与马杯，训练周六下午，快乐排球。', target: 'team' },
  { team: '田径队', deadline: '长期', level: '零基础可入', text: '备战马杯田径与小马杯，每周三次紫操集训。', target: 'team' },
];

/* ── 我的（资料 + 我的系队/比赛 + 进度查询） ── */
const profile = { name: '张同学', cls: '未央 41', sid: '2026XXXXXXX', phone: '' };
const myTeams = [{ name: '羽毛球队', role: '队员', since: '2026 春' }, { name: '围棋队', role: '预备队员', since: '2026 秋' }];
const admin = {
  todos: [
    { type: '材料审核', text: '未央 43 班团预算表待审', due: '今日' },
    { type: '内容发布', text: '长乐杯章程推送待排版', due: '明日' },
    { type: '打卡审核', text: '寒假打卡凭证抽查（3 条）', due: '本周' },
    { type: '资源申请', text: '未央 51 班活动器材申请', due: '本周' },
  ],
  nodes: [
    { event: '长乐杯 · 乒乓球联赛', steps: [
      { name: '立项', state: 'done' }, { name: '章程定稿', state: 'done' },
      { name: '报名开启', state: 'doing' }, { name: '秩序册', state: 'done', due: '11.05' },
      { name: '比赛日', state: 'todo', due: '11.21' }, { name: '决算归档', state: 'todo', due: '12.10' } ] },
    { event: '班级足球联赛', steps: [
      { name: '立项', state: 'done' }, { name: '分档投票', state: 'todo', due: '下学期 W1' },
      { name: '联队抽签', state: 'todo', due: 'W2' }, { name: '小组赛', state: 'todo', due: 'W3-8' } ] },
  ],
};

window.WY = { term, calendarDates, weeklyList, levelTables, entries, competitions, teams, camps, buddies,
  checkinActs, checkinBoard, cert, equipment, resourceScenes, classWork, auditFlow,
  weeklyReports, notices, recruits, profile, myTeams, admin };
