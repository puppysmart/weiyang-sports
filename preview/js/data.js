/* 未央体育 · 调整版数据层 V0.5-preview
   V0.5：数据全面替换为体育部 2026 年真实工作材料（赛事/打卡/班团/资讯/后台），
        月历改为多月份数据支持滑动切换；系队/器材/证书等暂无档案的模块仍为演示占位。
   真实数据来源：2026-2027 系内体育工作计划、长乐杯第六届章程与秩序册、源力杯总结材料、
   新生体育打卡总结材料、新生拔河选拔赛总结材料、体测指导总结材料、冰雪/虚拟运动会规程、
   班级体育支持计划说明（2026 秋）等。 */

const term = { label: '2026 秋 · 第 11 周', month: '2026-11' };

/* ── 首页 · 月历（按月组织，有活动的日期涂色，左右滑动/箭头切换月份） ── */
const calendarMonths = {
  '2026-09': {
    '09-19': { title: '新生拔河选拔赛 · 紫荆操场', type: 'comp', target: 'comp' },
    '09-28': { title: '校新生拔河比赛预赛（9.28-29）', type: 'comp', target: 'comp' },
  },
  '2026-10': {
    '10-08': { title: '新生赤足运动会 · 提前项目', type: 'comp', target: 'comp' },
    '10-10': { title: '新生赤足运动会 · 正式比赛+拔河决赛', type: 'comp', target: 'comp' },
    '10-15': { title: '体测指导活动 · 紫荆操场', type: 'svc', target: 'camp' },
    '10-26': { title: '虚拟运动会报名开始（10.26-31）', type: 'comp', target: 'comp' },
  },
  '2026-11': {
    '11-14': { title: '清华大学虚拟运动会 · 综体/北馆', type: 'comp', target: 'comp' },
    '11-15': { title: '清华大学虚拟运动会 · 综体/北馆', type: 'comp', target: 'comp' },
    '11-19': { title: '冰雪运动会报名开始（11.19-24）', type: 'comp', target: 'comp' },
    '11-21': { title: '长乐杯 Day1 · 小组赛（北体育馆）', type: 'comp', target: 'comp' },
    '11-22': { title: '长乐杯 Day2 · 淘汰赛+王中王交流赛', type: 'comp', target: 'comp' },
    '11-24': { title: '冰雪运动会报名截止', type: 'comp', target: 'comp' },
    '11-27': { title: '未央体育周报 WEEK 11 发布', type: 'svc', target: 'news' },
  },
  '2026-12': {
    '12-03': { title: '冰雪领队会 16:00 · 班团材料截止 23:59', type: 'svc', target: 'comp' },
    '12-05': { title: '冰雪运动会 · 冰壶开赛（12.5-6）', type: 'comp', target: 'comp' },
    '12-06': { title: '班团支持计划 · 评估节点', type: 'svc', target: 'class' },
    '12-07': { title: '冰雪运动会 · 冰球开赛（12.7-13）', type: 'comp', target: 'comp' },
    '12-12': { title: '冰雪运动会 · 雪上项目@崇礼（12.12-13）', type: 'comp', target: 'comp' },
    '12-13': { title: '冰雪运动会 · 花样滑冰表演赛', type: 'comp', target: 'comp' },
    '12-20': { title: '班团基础经费决算截止', type: 'svc', target: 'class' },
  },
};

/* ── 首页 · 近期活动（点击跳转子页） ── */
const weeklyList = [
  { d: '11-27 周五', title: '未央体育周报 · WEEK 11', tag: '预告', target: 'news', note: '长乐杯收官战报 · 冰雪运动会备战' },
  { d: '12-03 周四', title: '班团支持计划 · 材料提交截止', tag: '进行中', target: 'class', note: '第 12 周周四 23:59 前 · 云盘提交' },
  { d: '12-05 周六', title: '冰雪运动会 · 冰壶开赛', tag: '已确定', target: 'comp', note: '北馆冰上运动中心 · 冰上项目 12.5-13' },
  { d: '12-12 周日', title: '冰雪运动会 · 雪上项目', tag: '已确定', target: 'comp', note: '崇礼富龙滑雪场 · 双板/单板大回转 · 仗雪垒' },
];

/* ── 球类与通用能力对照表（1-5 分；约球与赛事难度共用） ── */
const levelTables = {
  tt: { name: '乒乓球', rows: [
    { lv: 1, desc: '零基础：会握拍，能来回 2-3 板' },
    { lv: 2, desc: '入门：基本发球与推挡，打过班级赛' },
    { lv: 3, desc: '进阶：正反手攻球稳定，有旋转意识' },
    { lv: 4, desc: '高手：有校内外比赛经验，能执行战术' },
    { lv: 5, desc: '院队级：马杯/长乐杯出场水平' } ] },
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
  bk: { name: '篮球', rows: [
    { lv: 1, desc: '零基础：会运球投篮，打过半场娱乐局' },
    { lv: 2, desc: '入门：半场 3v3 有基本跑位，罚球稳定' },
    { lv: 3, desc: '进阶：全场攻防到位，打过班级联赛' },
    { lv: 4, desc: '高手：书院杯/院队替补水平' },
    { lv: 5, desc: '院队级：书院杯主力' } ] },
  run: { name: '跑步', rows: [
    { lv: 1, desc: ' 3 km 配速 8\' 以内可完成' },
    { lv: 2, desc: '5 km 配速 7\' 以内' },
    { lv: 3, desc: '10 km 配速 6\'30" 以内' },
    { lv: 4, desc: '半马完赛，配速 6\' 以内' },
    { lv: 5, desc: '院队级：马杯中长跑出场' } ] },
  gen: { name: '综合', rows: [
    { lv: 1, desc: '零基础：想参与、能完赛即可' },
    { lv: 2, desc: '入门：参加过院内群体活动' },
    { lv: 3, desc: '进阶：熟悉规则，稳定参与' },
    { lv: 4, desc: '高手：有校级比赛经验' },
    { lv: 5, desc: '院队级：代表书院出场' } ] },
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

/* ── 赛事中心（2026 年真实赛事，含难度分级 + 赛果） ── */
const competitions = [
  { id: 'clbg6', name: '第六届"长乐杯"八系联合乒乓球联赛', host: '八系联办 · 未央主办', status: '已结束', deadline: null,
    joinTypes: ['班级报名', '混编联队 · 每队 12 人'], levelKey: 'tt', difficulty: 2, recommend: 2,
    summary: '八系 16 支联队 192 人 · 团体五盘 11 分制 · 赛后设"王中王"院友交流赛（11.21-22 北体育馆）',
    format: ['11.21 上午 C/D 组 · 下午 A/B 组小组赛', '11.22 上午淘汰赛与三、四名决赛', '专业组(G)/非专业组(P) 分盘出场', '红双喜 DJ40+ 用球 · 禁穿白色上衣'],
    result: '已收官 · 成绩册整理中',
    pastResults: ['2025 第五届 · 11.29-30 北体育馆 · 8 支联队', '本届扩军至 16 队 192 人 · 系史上最大规模'] },
  { id: 'bx', name: '清华大学冰雪运动会', host: '校级 · 大马杯积分', status: '进行中', deadline: '11.24（已截止）',
    joinTypes: ['院系报名 · 中锐赛事助手'], levelKey: 'gen', difficulty: 3, recommend: 2,
    summary: '冰上（北馆冰上运动中心 12.5-13）+ 雪上（崇礼富龙滑雪场 12.12-13）· 报名 11.19-24 已截止',
    format: ['冰壶 12.5-6 · 冰球 12.7-13 · 花滑 12.12-13', '雪上：双板/单板大回转 + 集体项目"仗雪垒"', '领队会 12.3（周四）16:00 北馆教工之家', '雪上项目食宿自理 · 装备自备或雪场租赁'],
    pastResults: ['报名已截止：11.19 00:00 - 11.24 24:00', '冰壶参赛须有冰壶协会活动或课程经历'] },
  { id: 'ylbj', name: '"源力杯"四系联合羽毛球联赛', host: '能动·未央·行健·自强', status: '已结束', deadline: null,
    joinTypes: ['双打团体（主赛）', '单打擂台（副赛）'], levelKey: 'bad', difficulty: 2, recommend: 2,
    summary: '四系 64 人（未央 28 人）· 气膜馆 8 片场地一日完赛 · 双打团体 + 单打擂台双项目',
    format: ['小组单循环 15 分单局制 · 每场 15 分钟滚动', '淘汰赛 15 分三局两胜', '单打擂台 21 分每球得分 · 群接龙留痕'],
    result: '冠军 郑景滔/高子涵 · 亚军 王梓霖/吕墨 · 季军 梁奕驰/艾森特',
    pastResults: ['"最强擂主" 梁奕驰 · "女单擂主" 俞人丹', '第 4-8 名优胜奖：D4/A3/C1/E3/H4 各队'] },
  { id: 'xn', name: '清华大学虚拟运动会', host: '校级 · 马杯积分', status: '已结束', deadline: '10.31（已截止）',
    joinTypes: ['院系报名 · 每人限报 2 项'], levelKey: 'gen', difficulty: 1, recommend: 1,
    summary: '跑步机/动感单车/划船机虚拟竞速 · 虚拟爬楼 · 电子光电射击 · 室内高尔夫（11.14-15 综体+北馆）',
    format: ['甲乙组分别录取前 8 名（9-1 分计分）', '电子射击按团体双倍计分', '赛前 30 分钟检录 · 须出示学生证'],
    pastResults: ['2026.11.14-15 · 综合体育馆 / 北体育馆'] },
  { id: 'czyd', name: '新生"健康始于足下"赤足运动会', host: '校级', status: '已结束', deadline: null,
    joinTypes: ['新生班级报名'], levelKey: 'gen', difficulty: 1, recommend: 1,
    summary: '赤足个人与团体项目 · 拔河预赛 9.28-29 · 提前项目 10.8 · 正式比赛 10.10 全天（东操场）',
    format: ['赤足：100 米/实心球/跳远/立定跳远/1 分钟跳绳', '团体：10×60 米迎面接力（至少 2 女）· 4×100 接力', '新生拔河：预赛 9.28-29 · 决赛 10.10'],
    pastResults: ['未央新生拔河选拔赛 9.19 紫操 · 9 队 162 人', '选拔赛冠军未央 62 班 · 四战全胜代表书院出征'] },
  { id: 'xyh', name: '"强理兴央"三系联合系运会', host: '未央·致理·自强', status: '已结束', deadline: null,
    joinTypes: ['班级报名'], levelKey: 'run', difficulty: 1, recommend: 1,
    summary: '2026 春 · 3.29 东大操场 · 个人 20 项 + 团体/趣味项目 · 以班级为单位计总分',
    format: ['个人单项前八名按 9-1 分计分', '团体项目双倍计分 · 破校纪录 +10 分', '老师/辅导员参赛另有加分'],
    pastResults: ['2026.3.29（第五周周日）· 东大操场'] },
  { id: 'clbgfb5', name: '第五届"长乐杯"足球联赛', host: '院级', status: '已结束', deadline: null,
    joinTypes: ['班级报名 → 分档联队'], levelKey: 'fb', difficulty: 2, recommend: 1,
    summary: '2026 春 · 8 人制 · 班级报名 → A/B/C 三档投票 → 组建 8 支联队 → 小组赛+淘汰赛',
    format: ['每班报名（队员+裁判+队长）', '各班代表投票分档', '两三班组建联队 · 抽签定组', '半场 25 分钟 · 指定周次内完赛'],
    pastResults: ['2026 春 · 8 支联队参赛'] },
  { id: 'wlq', name: '五系联合网球联赛', host: '五系联办', status: '预计', deadline: null,
    joinTypes: ['个人/联队'], levelKey: 'gen', difficulty: 2, recommend: 2,
    summary: '本学期计划举办 · 网球入门友好 · 详情以体育部通知为准',
    format: ['赛制以规程发布为准'], pastResults: [] },
  { id: 'clbgbk5', name: '第五届"长乐杯"篮球联赛', host: '院级', status: '预计', deadline: null,
    joinTypes: ['班级报名'], levelKey: 'bk', difficulty: 2, recommend: 1,
    summary: '本学期计划举办 · 以班级为单位 · 详情以体育部通知为准',
    format: ['赛制以规程发布为准'], pastResults: [] },
  { id: 'scbk7', name: '第七届"书院杯"篮球联赛', host: '校级书院间', status: '预计', deadline: null,
    joinTypes: ['书院代表队'], levelKey: 'bk', difficulty: 3, recommend: 3,
    summary: '本学期计划举办 · 书院间联合赛事 · 详情以通知为准',
    format: ['书院代表队参赛'], pastResults: [] },
  { id: 'hsb', name: '"贺岁杯"七系联合电竞比赛', host: '七系联办', status: '预计', deadline: null,
    joinTypes: ['个人/组队'], levelKey: 'gen', difficulty: 1, recommend: 1,
    summary: '冬季（寒假前）计划举办 · 项目与赛制以后续通知为准',
    format: ['娱乐项目 · 全员友好'], pastResults: [] },
];

const teams = [
  { id: 'football', name: '足球队', honors: '长乐杯足球联赛班底', friendly: false, level: '需基础',
    train: '每周二 / 五 17:30 · 西操', recruit: '招新中', members: 26,
    intro: '未央足球的传统强队，欢迎有比赛经验的同学加入；零基础同学建议先参加长乐杯班级联赛练级。' },
  { id: 'mbasket', name: '男篮队', honors: '书院杯常客', friendly: true, level: '零基础可入',
    train: '每周三 20:00 · 综体', recruit: '常年招新', members: 18,
    intro: '分一队与训练组：一队打书院杯，训练组零基础跟练，学期中可升级进入一队。' },
  { id: 'volley', name: '排球队', honors: '鱼跃杯八强', friendly: true, level: '零基础可入',
    train: '每周六 15:00 · 东操排球场', recruit: '招新中', members: 21,
    intro: '气氛型队伍，每周一次快乐排球，代表队打马杯与鱼跃杯。' },
  { id: 'bad', name: '羽毛球队', honors: '源力杯 28 人参赛大户', friendly: true, level: '零基础可入',
    train: '每周日 14:00 · 气膜馆', recruit: '招新中', members: 24,
    intro: '人多热闹，水平跨度大；每学期内部排位赛，冠军有奖品。' },
  { id: 'tt', name: '乒乓球队', honors: '长乐杯六届东道主', friendly: true, level: '零基础可入',
    train: '每周五 19:00 · 北体育馆', recruit: '常年招新', members: 16,
    intro: '长乐杯主办方系队，专业组(G)队员来自本队；赛后常规训练恢复，欢迎新队员跟练。' },
  { id: 'go', name: '围棋队', honors: '马杯混排亚军', friendly: true, level: '零基础可入',
    train: '每周四 19:00 · 书院活动室', recruit: '招新中', members: 12,
    intro: '历史最佳战绩的智力系队，从入门规则教起，能下棋就能上场。' },
];

/* ── 运动体验营 / 群体活动（真实：系队开放 + 体测指导；报名为意向登记） ── */
const camps = [
  { id: 'open', name: '系队开放系列活动 · 第一期', week: '时间待定（先登记意向）', place: '各系队训练场地', cap: 40, taken: 0,
    status: '报名中', sci: '跟随系队体验一次正式训练：足球/男篮/排球/羽毛球/乒乓球/围棋任选，零基础可参加，具体项目与场地以各队安排为准',
    reward: '参与可抵扣 1 次集体锻炼；表现突出可获系队试训直通资格' },
  { id: 'tc2', name: '体测指导 · 2027 春季场', week: '2027 春（时间待定）', place: '紫荆操场', cap: 60, taken: 0,
    status: '预告', sci: '立定跳远与引体向上分组轮换指导，教练逐人纠动作；第一期（10.15）64 人报名、45 人到场',
    reward: '参与可抵扣 1 次集体锻炼（以正式通知为准）' },
];

const buddies = [
  { id: 'b1', sport: '羽毛球', lv: 3, time: '周三 20:00', place: '综体', need: 2, note: '进阶水平，打排位', author: '未央 42 · 李同学', ts: '2 小时前' },
  { id: 'b2', sport: '篮球', lv: 2, time: '周五 16:30', place: '北体育馆', need: 3, note: '入门半场 3v3', author: '未央 65 · 王同学', ts: '5 小时前' },
  { id: 'b3', sport: '跑步', lv: 2, time: '明早 7:00', place: '紫操', need: 1, note: '阳光长跑配速 6 分半', author: '未央 51 · 陈同学', ts: '昨天' },
];

/* ── 打卡活动（2026 年真实活动：报名 → 发记录 → 排行榜 三件套） ── */
const checkinActs = [
  { id: 'fresh', name: '新生体育打卡（六字班）', status: '已结束', window: '2026.8.24 - 9.13 · 共 21 天',
    modules: ['跑步', '场馆', '户外', '日出', '体育考核'], rule: '五模块任选 · 按累计次数排名评奖（一等 6 名 / 二等 10 名 / 三等 15 名）', joined: 33 },
  { id: 'summer', name: '夏训打卡', status: '已结束', window: '2026 暑假',
    modules: ['跑步', '球类', '冰雪', '游泳', '软件跟练'], rule: '打卡 35 / 25 / 15 天分别对应一、二、三档奖品，前三名额外奖励', joined: null },
];
/* 新生体育打卡真实统计（总结材料 · 2026.9） */
const checkinStats = {
  top: { name: '陆柏利', days: 20 },
  note: '第 2-4 名 3 人并列 16 次',
  total: { ppl: 33, hits: 237 },
  dist: [
    { range: '15 次及以上', ppl: 6, hits: 98 },
    { range: '10 — 14 次', ppl: 4, hits: 43 },
    { range: '5 — 9 次', ppl: 8, hits: 50 },
    { range: '2 — 4 次', ppl: 13, hits: 44 },
    { range: '1 次', ppl: 2, hits: 2 },
  ],
};

/* ── 游泳证书（公示 + 自查 + 体委统计）── 暂无档案，演示占位 ── */
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

/* ── 器材与活动资源申请 ── 器材台账为演示占位 ── */
const equipment = [
  { name: '篮球', total: 12, available: 7, location: '体育部器材室（书院活动中心）' },
  { name: '羽毛球拍', total: 8, available: 3, location: '体育部器材室' },
  { name: '气排球', total: 6, available: 4, location: '体育部器材室' },
  { name: '筋膜枪', total: 2, available: 2, location: '体育部器材室（押金借用）' },
  { name: '拔河绳', total: 2, available: 2, location: '器材室（仅赛事借用）' },
];
const resourceScenes = ['班团体育活动', '院级赛事（本院承办）', '体验营 / 打卡活动', '系队训练', '其他（备注说明）'];

/* ── 班团报销（2026 秋真实规则：双表 + 可视化审核流） ── */
const classWork = [
  { name: '秋季预算申报', status: '进行中', date: '每班每学年基础额度 500 元 · 预算审核通过后方可购买' },
  { name: '班级活动记录', status: '进行中', date: '学期 ≥2 次达标 · 单次 ≥30 分钟（跨班活动可拆计）' },
  { name: '总结与评分材料', status: '待提交', date: '12.3（第 12 周周四）23:59 前云盘提交' },
  { name: '评估与经费追加', status: '预计', date: '12.6 评估 · 前 40% 班级追加 200-500 元' },
];
const auditFlow = {
  current: 1,
  steps: [
    { name: '体委提交', note: '预算 / 决算表与凭证（云盘提交）' },
    { name: '体育部初审', note: '口径与票据核对 · 进行中' },
    { name: '评估追加', note: '12.6 按活动量 60 分 + 参与实效 40 分评估' },
    { name: '书院财务', note: '决算归档 · 基础经费截止 12.20' },
  ],
};

/* ── 体育资讯（周报每周五更新 / 通知公告 / 系队招募） ── */
const weeklyReports = [
  { no: 'WEEK 11', date: '11-27 发布',
    results: [
      '第六届"长乐杯"乒乓球联赛收官：16 支联队 192 人 · 北体育馆',
      '"王中王"交流赛：冠亚军联队专业组对阵八系院友联队',
      '虚拟运动会 11.14-15 举行：虚拟竞速 / 光电射击 / 室内高尔夫',
    ],
    preview: [
      '冰雪运动会领队会 12.3 16:00 北馆教工之家',
      '冰壶 12.5-6 · 冰球 12.7-13 · 花滑与雪上 12.12-13（崇礼）',
      '班团支持计划材料 12.3 截止 · 12.6 评估',
    ] },
  { no: 'WEEK 10', date: '11-20 发布',
    results: [
      '长乐杯秩序册与 16 支联队分队名单公示（192 人）',
      '冰雪运动会规程发布：报名 11.19-24 经"中锐赛事助手"',
      '"源力杯"羽毛球联赛收官：64 人参赛 · 未央 28 人',
    ],
    preview: [
      '长乐杯比赛日 11.21-22（北体育馆）',
      '虚拟运动会 11.14-15 综体 / 北馆',
      '班团支持计划：预算表陆续审核通过',
    ] },
];
const notices = [
  { type: '公示', title: '第六届长乐杯分队名单与秩序册', date: '11-16', body: '16 支联队 192 人名单与小组赛对阵已公示；比赛日 11.21-22 北体育馆，淘汰赛后举行"王中王"院友交流赛。' },
  { type: '报名', title: '冰雪运动会报名 11.24 截止', date: '11-19', body: '冰壶 / 冰球 / 花样滑冰 / 大回转 / 仗雪垒，11.19-24 经"中锐赛事助手"小程序报名；领队会 12.3 16:00 北馆教工之家。' },
  { type: '提醒', title: '班级体育支持计划 · 材料提交', date: '11-24', body: '实施总结与评分模板 12.3（第 12 周周四）23:59 前提交云盘；基础经费决算截止 12.20，追加经费截止 1.10。' },
  { type: '活动', title: '体测指导活动举行', date: '10-15', body: '紫荆操场 · 立定跳远与引体向上分组轮换指导，64 人报名、45 人到场；2027 春拟办第二期。' },
];
const recruits = [
  { team: '乒乓球队', deadline: '长期', level: '零基础可入', text: '长乐杯六届东道主之队，赛后常规训练恢复，欢迎新队员跟练。', target: 'team' },
  { team: '女排队', deadline: '11.30', level: '零基础可入', text: '备战鱼跃杯与马杯，训练周六下午，快乐排球。', target: 'team' },
  { team: '围棋队', deadline: '长期', level: '零基础可入', text: '马杯混排亚军之队招新，从规则教起，能下棋就能上场。', target: 'team' },
];

/* ── 我的（资料 + 我的系队/比赛 + 进度查询） ── */
const profile = { name: '张同学', cls: '未央 41', sid: '2026XXXXXXX', phone: '' };
const myTeams = [{ name: '羽毛球队', role: '队员', since: '2026 春' }, { name: '围棋队', role: '预备队员', since: '2026 秋' }];
const admin = {
  todos: [
    { type: '赛事收尾', text: '长乐杯成绩册与"王中王"交流赛材料归档', due: '本周' },
    { type: '冰雪备战', text: '冰雪运动会领队会材料（12.3 16:00）', due: '下周' },
    { type: '材料审核', text: '班团支持计划材料收集（12.3 截止）', due: '下周' },
    { type: '活动排期', text: '系队开放系列活动 / 长乐杯篮球联赛建档', due: '本月' },
  ],
  nodes: [
    { event: '第六届长乐杯 · 乒乓球联赛', steps: [
      { name: '立项', state: 'done' }, { name: '章程定稿', state: 'done' },
      { name: '报名与分队', state: 'done' }, { name: '秩序册', state: 'done' },
      { name: '比赛日', state: 'done', due: '11.21-22' }, { name: '决算归档', state: 'doing' } ] },
    { event: '冰雪运动会 · 备赛', steps: [
      { name: '规程发布', state: 'done' }, { name: '报名', state: 'done', due: '11.24 止' },
      { name: '领队会', state: 'todo', due: '12.3' }, { name: '冰上赛事', state: 'todo', due: '12.5-13' },
      { name: '雪上赛事', state: 'todo', due: '12.12-13' } ] },
    { event: '班级体育支持计划 · 秋季', steps: [
      { name: '预算审核', state: 'doing' }, { name: '材料提交', state: 'todo', due: '12.3' },
      { name: '评估追加', state: 'todo', due: '12.6' }, { name: '决算归档', state: 'todo', due: '12.20' } ] },
  ],
};

window.WY = { term, calendarMonths, weeklyList, levelTables, entries, competitions, teams, camps, buddies,
  checkinActs, checkinStats, cert, equipment, resourceScenes, classWork, auditFlow,
  weeklyReports, notices, recruits, profile, myTeams, admin };
