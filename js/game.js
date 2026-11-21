"use strict";

/* 字体说明：全游戏使用本地系统字体（楷体/宋体栈），无任何网络下载依赖，
   离线或弱网环境显示效果完全一致，不会因字体加载失败影响页面。 */

/* ================= 数据定义 ================= */
const MATERIALS = {
  lingcao:  { name: "灵草",   ico: "🌿", price: 10,  attr: "木属 · 性平", desc: "最寻常的修行灵草，遍地皆是。" },
  huojing:  { name: "火晶石", ico: "🔥", price: 25,  attr: "火属 · 性烈", desc: "蕴含火行灵力，炼丹常备。" },
  yunmu:    { name: "云母",   ico: "❄️", price: 25,  attr: "水属 · 性寒", desc: "吸尽云露精华，性寒凝霜。" },
  xuelian:  { name: "雪莲",   ico: "🌸", price: 60,  attr: "冰属 · 极寒", desc: "生于极北雪峰，十分罕见。" },
  longxian: { name: "龙涎草", ico: "🐉", price: 120, attr: "龙属 · 至阳", desc: "传说沾过真龙涎液的仙草。" },
  zihouhua: { name: "紫猴花", ico: "🌺", price: 35,  attr: "紫属 · 性平", desc: "紫猴献瑞之奇花，炼丹良辅。" },
  huanglongzhi: { name: "黄龙芝", ico: "🍄", price: 45,  attr: "黄属 · 性温", desc: "黄龙腾云之瑞芝，固本培元。" },
  demicao: { name: "地髓草", ico: "🌱", price: 90,  attr: "土属 · 性厚", desc: "汲地脉精华而生，性厚养身。" },
  lingru: { name: "灵乳", ico: "💧", price: 150, attr: "乳白 · 性润", desc: "石髓灵乳，凝百年之精。" },
  tianxinlian: { name: "天心莲", ico: "🪷", price: 260, attr: "天属 · 性清", desc: "生于天池之巅，瓣含灵光。" },
  ninghuncao: { name: "凝魂草", ico: "🔮", price: 320, attr: "魂属 · 性幽", desc: "凝魂定魄之幽草，炼神之辅。" },
};

const RECIPES = {
  juqi:     { name: "聚气丹", rank: 1,  grade: "fan",   mats: { lingcao: 3 }, time: 8,  basePrice: 30,   fail: 0.10, desc: "一阶：聚气培元，筑道之基。" },
  zhuji:    { name: "筑基丹", rank: 2,  grade: "fan",   mats: { lingcao: 2, huojing: 1 }, time: 12, basePrice: 70,  fail: 0.12, desc: "二阶：固本筑基，脱胎换骨。" },
  peiyuan:  { name: "培元丹", rank: 3,  grade: "ling",  mats: { lingcao: 2, huojing: 1, yunmu: 1 }, time: 16, basePrice: 140, fail: 0.14, desc: "三阶：培补元气，滋润经脉。" },
  ningjin:  { name: "凝金丹", rank: 4,  grade: "ling",  mats: { huojing: 2, yunmu: 2 }, time: 18, basePrice: 260, fail: 0.16, desc: "四阶：金气凝形，剑心通明。" },
  yangshen: { name: "养神丹", rank: 5,  grade: "ling",  mats: { yunmu: 2, xuelian: 2 }, time: 22, basePrice: 450, fail: 0.18, desc: "五阶：温养神魂，元神日壮。" },
  huashen:  { name: "化神丹", rank: 6,  grade: "sheng", mats: { huojing: 2, xuelian: 2 }, time: 26, basePrice: 800, fail: 0.20, desc: "六阶：化神合道，神游太虚。" },
  lianxu:   { name: "炼虚丹", rank: 7,  grade: "sheng", mats: { yunmu: 2, xuelian: 2, longxian: 1 }, time: 30, basePrice: 1400, fail: 0.22, desc: "七阶：粉碎虚空，炼虚合道。" },
  heti:     { name: "合体丹", rank: 8,  grade: "sheng", mats: { xuelian: 2, longxian: 2 }, time: 35, basePrice: 2400, fail: 0.24, desc: "八阶：法体同修，天人合一。" },
  due:      { name: "渡厄丹", rank: 9,  grade: "shen",  mats: { longxian: 3, xuelian: 2 }, time: 42, basePrice: 4000, fail: 0.26, desc: "九阶：渡尽劫厄，天人五衰不惧。" },
  feisheng: { name: "飞升丹", rank: 10, grade: "shen",  mats: { longxian: 4, xuelian: 3 }, time: 50, basePrice: 7000, fail: 0.28, desc: "十阶：一丹飞升，位列仙班。" },
  xiaohuan: { name: "小还丹", rank: 2,  grade: "fan",   mats: { lingcao: 2, zihouhua: 1 }, time: 12, basePrice: 60,   fail: 0.13, desc: "二阶：疗伤续脉，行走江湖的救命良方。" },
  qingling: { name: "清灵丹", rank: 3,  grade: "ling",  mats: { lingcao: 1, zihouhua: 2, yunmu: 1 }, time: 16, basePrice: 160,  fail: 0.15, desc: "三阶：清心明灵，涤荡神识。" },
  cuiti:    { name: "淬体丹", rank: 4,  grade: "ling",  mats: { huojing: 2, huanglongzhi: 1, yunmu: 1 }, time: 18, basePrice: 300,  fail: 0.17, desc: "四阶：淬炼肉身，坚如金石。" },
  ningying: { name: "凝婴丹", rank: 5,  grade: "ling",  mats: { xuelian: 1, demicao: 2 }, time: 22, basePrice: 520,  fail: 0.19, desc: "五阶：凝元婴之基，脱胎换骨。" },
  pozhang:  { name: "破障丹", rank: 6,  grade: "sheng", mats: { huanglongzhi: 2, lingru: 1 }, time: 26, basePrice: 950,  fail: 0.21, desc: "六阶：破除境障，一念通明。" },
  xuanming: { name: "玄冥丹", rank: 7,  grade: "sheng", mats: { demicao: 2, tianxinlian: 1, longxian: 1 }, time: 30, basePrice: 1600, fail: 0.23, desc: "七阶：玄冥真水入丹，寒暑不侵。" },
  tianxind: { name: "天心丹", rank: 8,  grade: "sheng", mats: { tianxinlian: 2, lingru: 1 }, time: 35, basePrice: 2700, fail: 0.25, desc: "八阶：天心通明，洞彻玄机。" },
  taiyi:    { name: "太乙丹", rank: 9,  grade: "shen",  mats: { lingru: 2, ninghuncao: 1, longxian: 1 }, time: 42, basePrice: 4500, fail: 0.27, desc: "九阶：太乙真气，万法归一。" },
  zaohua:   { name: "造化丹", rank: 10, grade: "shen",  mats: { ninghuncao: 2, tianxinlian: 1, longxian: 2 }, time: 50, basePrice: 8000, fail: 0.29, desc: "十阶：夺天地之造化，浸日月之精华。" },
};

/* 丹方品级：凡/灵/圣/神（对应截图设定体系） */
const GRADE_DEF = {
  fan:   { name: "凡品" },
  ling:  { name: "灵品" },
  sheng: { name: "圣品" },
  shen:  { name: "神品" },
};
const GRADE_ORDER = ["fan", "ling", "sheng", "shen"];
const RANK_CN = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];

/* 丹师境界：修为经验累积晋升（对应十阶丹药体系） */
const DREALM = ["练气期", "筑基期", "金丹期", "元婴期", "化神期", "炼虚期", "合体期", "大乘期", "渡劫期", "飞升期"];
const XP_NEED = [0, 80, 220, 480, 900, 1500, 2400, 3700, 5400, 7600];

function realmIdx() {
  const xp = state.xp || 0;
  let idx = 0;
  for (let i = 0; i < XP_NEED.length; i++) if (xp >= XP_NEED[i]) idx = i;
  return idx;
}

function gainXP(n) {
  const before = realmIdx();
  state.xp = (state.xp || 0) + n;
  const after = realmIdx();
  if (after > before) {
    log(`修为精进——突破至「${DREALM[after]}」！丹师品衔晋升为${rankCN(after + 1)}品丹师，宗门委托的品阶与酬劳随之上调。`);
    sfx("levelup");
  }
}
const rankCN = (n) => RANK_CN[n] || n;

const QUALITIES = [
  { key: 1, name: "凡品", mult: 1,  color: "", luckGain: 1 },
  { key: 2, name: "良品", mult: 2,  color: "", luckGain: 2 },
  { key: 3, name: "上品", mult: 4,  color: "", luckGain: 3 },
  { key: 4, name: "极品", mult: 9,  color: "q4", luckGain: 5 },
  { key: 5, name: "仙品", mult: 22, color: "q5", luckGain: 10 },
];

/* 丹药品级：炼成即为一品，凝练升品（品级越高售价与幸运加成越高） */
const TIER_DEF = {
  t2: { name: "二品", sellMult: 4, luckGain: 6 },
  t3: { name: "三品", sellMult: 9, luckGain: 12 },
};

/* 炉底燃料：点火必耗一根，灵木有额外火候加成 */
const WOOD_DEF = {
  firewood:   { name: "柴薪", desc: "寻常火候，无额外加成。" },
  spiritwood: { name: "灵木", desc: "灵气充沛：炼丹成功率 +8%，二品/三品直接产出概率提升 50%。", failCut: 0.08, tierBoost: 1.5 },
};

const SLOT_COLOR = { q1: "#8a8378", q2: "#4a7a5a", q3: "#b8912f", q4: "#a63a2b", q5: "#7a4ad0", t2: "#4a7a5a", t3: "#7a4ad0" };

/* 丹药药性：服用后触发限时增益（二品时长 ×1.5、三品 ×2） */
const PILL_BUFF = {
  juqi:     { type: "gather",  name: "灵气充沛", mult: 2,   hours: 3,  desc: "采药产量翻倍" },
  zhuji:    { type: "success", name: "根基稳固", val: 0.05, hours: 5,  desc: "炼丹成功率 +5%" },
  peiyuan:  { type: "nocalm",  name: "元气安宁", hours: 4,  desc: "炼丹不再累积心火" },
  ningjin:  { type: "market",  name: "金石之利", mult: 1.3, hours: 6,  desc: "集市售价 +30%" },
  yangshen: { type: "clearheat", name: "宁神降火", hours: 0, desc: "立即清除全部心火" },
  huashen:  { type: "success", name: "化神通明", val: 0.10, hours: 8,  desc: "炼丹成功率 +10%" },
  lianxu:   { type: "tier",    name: "炼虚升华", mult: 1.5, hours: 8,  desc: "高品级产出概率 ×1.5" },
  heti:     { type: "market",  name: "天人合一", mult: 1.6, hours: 10, desc: "集市售价 +60%" },
  due:      { type: "success", name: "渡厄护身", val: 0.08, hours: 12, desc: "炼丹成功率 +8%" },
  feisheng: { type: "gather",  name: "飞升天威", mult: 3,   hours: 15, desc: "采药产量 ×3" },
  xiaohuan: { type: "success", name: "还元续脉", val: 0.03, hours: 3,  desc: "炼丹成功率 +3%" },
  qingling: { type: "tier",    name: "清灵涤识", mult: 1.2, hours: 4,  desc: "高品级产出概率 ×1.2" },
  cuiti:    { type: "gather",  name: "淬体强身", mult: 1.5, hours: 5,  desc: "采药产量 ×1.5" },
  ningying: { type: "market",  name: "凝婴聚宝", mult: 1.5, hours: 6,  desc: "集市售价 +50%" },
  pozhang:  { type: "nocalm",  name: "破障宁心", hours: 6,  desc: "炼丹不再累积心火" },
  xuanming: { type: "success", name: "玄冥镇火", val: 0.06, hours: 8,  desc: "炼丹成功率 +6%" },
  tianxind: { type: "tier",    name: "天心洞明", mult: 1.8, hours: 10, desc: "高品级产出概率 ×1.8" },
  taiyi:    { type: "market",  name: "太乙聚灵", mult: 2,   hours: 12, desc: "集市售价 +100%" },
  zaohua:   { type: "gather",  name: "造化天成", mult: 4,   hours: 15, desc: "采药产量 ×4" },
};

/* 成就：达成即刻获得灵石奖励 */
const ACHIEVEMENTS = [
  { id: "first",   name: "初露锋芒", desc: "炼成第一枚丹药", reward: 50,   check: () => state.stats.refined >= 1 },
  { id: "r25",     name: "丹道新秀", desc: "累计炼成 25 枚丹药", reward: 100,  check: () => state.stats.refined >= 25 },
  { id: "r100",    name: "百炼成丹", desc: "累计炼成 100 枚丹药", reward: 300,  check: () => state.stats.refined >= 100 },
  { id: "r500",    name: "千锤百炼", desc: "累计炼成 500 枚丹药", reward: 1000, check: () => state.stats.refined >= 500 },
  { id: "xianpin", name: "仙品初现", desc: "炼出仙品丹药", reward: 500,  check: () => Object.entries(state.pills).some(([k, qs]) => RECIPES[k] && qs.q5 > 0) },
  { id: "t3made",  name: "三品天成", desc: "获得三品丹药", reward: 800,  check: () => Object.entries(state.pills).some(([k, qs]) => RECIPES[k] && qs.t3 > 0) },
  { id: "luck50",  name: "福缘深厚", desc: "幸运值达到 50", reward: 600,  check: () => (state.luck || 0) >= 50 },
  { id: "gong1000", name: "门中栋梁", desc: "宗门贡献达到 1000", reward: 800, check: () => state.sect.gongxian >= 1000 },
  { id: "rich30",  name: "药满仓廪", desc: "仓库同时持有 30 枚丹药", reward: 400, check: () => Object.entries(state.pills).reduce((a, [k, qs]) => a + (RECIPES[k] ? Object.values(qs).reduce((x, y) => x + y, 0) : 0), 0) >= 30 },
  { id: "year1",   name: "岁在灵历", desc: "灵历满一年（累计 4320 时辰）", reward: 2000, check: () => Math.floor((state.gameTime || 0) / 10) >= 4320 },
];

function checkAchievements() {
  for (const a of ACHIEVEMENTS) {
    if (state.achievements[a.id]) continue;
    let ok = false;
    try { ok = a.check(); } catch (e) { ok = false; }
    if (ok) {
      state.achievements[a.id] = true;
      state.lingshi += a.reward;
      gainXP(Math.round(a.reward / 10));
      log(`达成成就「${a.name}」！奖励灵石 ${a.reward}。`);
      sfx("levelup");
    }
  }
}

/* 物品 SVG 图标库（仓库/商店/集市/炼丹等处通用） */
const ICONS = {
  lingcao: '<svg viewBox="0 0 24 24"><path d="M12,22 C11.5,15 11.5,10 12,6" stroke="#3a6a2e" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M12,9 C7,8.5 4,5 3,1.5 C8.5,3 12,6 12,9" fill="#7aa54a"/><path d="M12,7.5 C13.5,4 16.5,1.5 21,1 C19.5,5.5 15,8 12,7.5" fill="#5a8a3a"/><path d="M11.5,14 C8,13.5 5,12 2.5,9.5 C7,9.5 10.5,11.5 11.5,14" fill="#8ab55a"/><path d="M12.5,12 C15.5,11 18,9.5 20,7.5 C17.5,11 14.5,13 12.5,12.5" fill="#6a9a44"/></svg>',
  huojing: '<svg viewBox="0 0 24 24"><path d="M12,1.5 L17.5,7.5 L15.5,21 L8.5,21 L6.5,7.5 Z" fill="#c04a2b" stroke="#6e2416" stroke-width="1.2"/><path d="M12,1.5 L17.5,7.5 L12,11 L6.5,7.5 Z" fill="#e8703a"/><path d="M12,11 L15.5,21 L12,17 Z" fill="#a63a2b" opacity=".8"/><path d="M12,3 L15.5,7.5 L12,10 L8.5,7.5 Z" fill="#ffb36a" opacity=".85"/></svg>',
  yunmu: '<svg viewBox="0 0 24 24"><path d="M3,13 L12,3.5 L21,13 L12,17.5 Z" fill="#a8d4e8" stroke="#4a7a9a" stroke-width="1.2"/><path d="M5.5,15.5 L12,7.5 L18.5,15.5" fill="none" stroke="#7ab8d4" stroke-width="1.2"/><path d="M6,19 L12,12 L18,19 Z" fill="#c2e2f0" opacity=".8"/><path d="M9,8.5 L12,5.5 L15,8.5 Z" fill="#e8f4fa"/></svg>',
  xuelian: '<svg viewBox="0 0 24 24"><g fill="#f7f3ea" stroke="#b8ab90" stroke-width=".8"><path d="M12,3 C13.5,5.5 13.5,8.5 12,11 C10.5,8.5 10.5,5.5 12,3 Z"/><path d="M12,3 C14.5,4.5 16,7 15.5,10.5 C13.5,9.5 12,7 12,3 Z" transform="rotate(40 12 9)"/><path d="M12,3 C14.5,4.5 16,7 15.5,10.5 C13.5,9.5 12,7 12,3 Z" transform="rotate(-40 12 9)"/></g><circle cx="12" cy="12" r="3" fill="#e3c46a"/><circle cx="12" cy="12" r="1.4" fill="#c99a2e"/><path d="M6.5,20 Q12,16.5 17.5,20" stroke="#4a7a3a" fill="none" stroke-width="1.4"/></svg>',
  longxian: '<svg viewBox="0 0 24 24"><path d="M12,22 C11,16 11,12 12,9" stroke="#3a6a4e" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M12,10 C12,6 14,3.5 17.5,3 C20,2.8 20.5,5 18.5,6 C16.5,7 15,8.5 14.5,10.5 C16,9 18,8.5 19.5,9.5 C17,12 14,12 12,11 Z" fill="#5a8a6a" stroke="#3a6a4e" stroke-width="1"/><path d="M12,14 C15,13 18,13.5 20,15.5 C17,15 14,15.5 12,17 Z" fill="#6a9a78"/><path d="M12,18 C15,17.5 17.5,18 19.5,20 C16.5,19.5 14,19.5 12,20.5 Z" fill="#5a8a6a"/><circle cx="18.5" cy="6" r="1.1" fill="#d4af37"/></svg>',
  zihouhua: '<svg viewBox="0 0 24 24"><g fill="#b48ae0" stroke="#7a4ad0" stroke-width=".8"><ellipse cx="12" cy="6" rx="3" ry="4.5"/><ellipse cx="6.5" cy="9" rx="3.6" ry="4" transform="rotate(-45 6.5 9)"/><ellipse cx="17.5" cy="9" rx="3.6" ry="4" transform="rotate(45 17.5 9)"/><ellipse cx="6" cy="14" rx="3.4" ry="3.6" transform="rotate(-80 6 14)"/><ellipse cx="18" cy="14" rx="3.4" ry="3.6" transform="rotate(80 18 14)"/></g><circle cx="12" cy="12" r="3.4" fill="#f0d890"/><path d="M12,15 V21" stroke="#3a6a2e" stroke-width="1.5"/></svg>',
  huanglongzhi: '<svg viewBox="0 0 24 24"><path d="M4,12 Q5,6 12,5 Q19,6 20,12 Q14,9 12,10 Q10,9 4,12 Z" fill="#d4a53a" stroke="#8a6d1f" stroke-width="1.2"/><path d="M10.5,11 Q11,16 11,20 L13.5,20 Q13,15 13.5,11 Q12,10.4 10.5,11 Z" fill="#c98a2e" stroke="#8a6d1f" stroke-width="1"/><path d="M7,9 Q9,7.5 11,8" stroke="#f0d890" fill="none" stroke-width="1"/></svg>',
  demicao: '<svg viewBox="0 0 24 24"><path d="M12,22 V10" stroke="#8a6d3a" stroke-width="1.8" stroke-linecap="round"/><path d="M12,12 C10,10 8,9 5,9" stroke="#a8843a" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M12,14 C14,12 17,11 20,11" stroke="#a8843a" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M12,9 C11,7 11,5 12,3 C13,5 13,7 12,9" fill="#c9a84a" stroke="#8a6d3a" stroke-width="1"/><ellipse cx="5" cy="9" rx="2" ry="1.4" fill="#c9a84a"/><ellipse cx="20" cy="11" rx="2" ry="1.4" fill="#c9a84a"/></svg>',
  lingru: '<svg viewBox="0 0 24 24"><path d="M7,4 H17 L16,10 Q14,12 14,14 V20 H10 V14 Q10,12 8,10 Z" fill="#e8f4fa" stroke="#7ab8d4" stroke-width="1.2"/><path d="M9,20 H15 V21.5 H9 Z" fill="#c2e2f0" stroke="#7ab8d4" stroke-width="1"/><ellipse cx="12" cy="13" rx="2" ry="3" fill="#fffbe8"/><circle cx="12" cy="8.5" r="1.6" fill="#fffbe8"/></svg>',
  tianxinlian: '<svg viewBox="0 0 24 24"><g fill="#8ac4d4" stroke="#4a7a9a" stroke-width=".9"><ellipse cx="12" cy="5.5" rx="3.2" ry="4.5"/><ellipse cx="6" cy="9" rx="3.4" ry="4.2" transform="rotate(-50 6 9)"/><ellipse cx="18" cy="9" rx="3.4" ry="4.2" transform="rotate(50 18 9)"/><ellipse cx="5.5" cy="14.5" rx="3.4" ry="3.8" transform="rotate(-85 5.5 14.5)"/><ellipse cx="18.5" cy="14.5" rx="3.4" ry="3.8" transform="rotate(85 18.5 14.5)"/></g><circle cx="12" cy="12" r="3.2" fill="#e3c46a"/><circle cx="12" cy="12" r="1.6" fill="#a63a2b"/><path d="M10,21 Q12,19 14,21" stroke="#4a7a3a" fill="none" stroke-width="1.4"/></svg>',
  ninghuncao: '<svg viewBox="0 0 24 24"><path d="M12,21 C11,14 11,9 12,5" stroke="#4a6a8a" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M12,9 C14,6 16.5,5 19,5.5 C17.5,8.5 14.5,9.5 12,9" fill="#5a8ab5" stroke="#3a5a7a" stroke-width="1"/><path d="M11.5,13 C9,10.5 6.5,10 4,11 C6,13.5 9.5,14 11.5,13" fill="#6a9ac5" stroke="#3a5a7a" stroke-width="1"/><circle cx="12" cy="4" r="1.8" fill="#8ac4f0"/><circle cx="6" cy="10.5" r="1.1" fill="#8ac4f0" opacity=".8"/><circle cx="19" cy="6" r="1.1" fill="#8ac4f0" opacity=".8"/></svg>',
  scroll: '<svg viewBox="0 0 24 24"><path d="M5,4 Q12,2 19,4 V17 Q12,19 5,17 Z" fill="#f0e2b0" stroke="#8a6d1f" stroke-width="1.3"/><path d="M8,8 H16 M8,11 H16 M8,14 H13" stroke="#6e5a2e" stroke-width="1.2"/><circle cx="12" cy="6" r="1.3" fill="#a63a2b"/></svg>',
  unknown: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="#8a8378" stroke-width="1.5" stroke-dasharray="3,2"/><path d="M9.5,9.5 C9.5,7.5 11,6.5 12,6.5 C13.5,6.5 14.5,7.5 14.5,9 C14.5,10.5 13,11 12.3,12 L12.3,13.5" stroke="#5c534a" fill="none" stroke-width="1.6" stroke-linecap="round"/><circle cx="12.3" cy="16" r="1.1" fill="#5c534a"/></svg>',
  cauldron: '<svg viewBox="0 0 24 24"><path d="M4,8 Q3,15 7,18 Q10,20 12,20 Q14,20 17,18 Q21,15 20,8 Z" fill="#57493a" stroke="#221d16" stroke-width="1.3"/><ellipse cx="12" cy="8" rx="8" ry="2.4" fill="#4a4238" stroke="#221d16" stroke-width="1.2"/><path d="M7,17 Q12,19 17,17" stroke="#c9a227" fill="none" stroke-width="1.2"/><path d="M5,7 L2,4 M19,7 L22,4" stroke="#221d16" stroke-width="1.6"/></svg>',
  firewood: '<svg viewBox="0 0 24 24"><rect x="2" y="9" width="18" height="5" rx="2.5" transform="rotate(-12 11 11)" fill="#8a5a2e" stroke="#5c3a1e" stroke-width="1"/><rect x="4" y="13" width="18" height="5" rx="2.5" transform="rotate(8 13 15)" fill="#a86e38" stroke="#5c3a1e" stroke-width="1"/><circle cx="4.5" cy="9" r="2.3" fill="#c99a5e" stroke="#5c3a1e" stroke-width="1"/><circle cx="4.5" cy="9" r="1.1" fill="#8a5a2e"/></svg>',
  spiritwood: '<svg viewBox="0 0 24 24"><rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-10 12 12)" fill="#4a7a5a" stroke="#2e5a3a" stroke-width="1.2"/><path d="M6,10 Q9,7 12,10 Q15,13 18,10" stroke="#a8e0b8" fill="none" stroke-width="1.4"/><circle cx="8" cy="11" r="1.2" fill="#c0e8d0"/><circle cx="15" cy="12" r="1.2" fill="#c0e8d0"/><circle cx="16" cy="4" r="1.3" fill="#a8e0b8"/></svg>',
  talisman: '<svg viewBox="0 0 24 24"><rect x="7" y="3" width="10" height="18" rx="1" fill="#f0e2b0" stroke="#c99a2e" stroke-width="1.2"/><path d="M12,5 V19" stroke="#a63a2b" stroke-width="1.2"/><path d="M9,8 Q12,10 15,8 M9,12 Q12,14 15,12 M9.5,16 Q12,17.5 14.5,16" stroke="#a63a2b" fill="none" stroke-width="1.3"/><circle cx="12" cy="6" r="1.4" fill="#a63a2b"/></svg>',
  condense: '<svg viewBox="0 0 24 24"><path d="M8,3 H16 V8 Q18,9 18,12 L18,17 Q16,21 12,21 Q8,21 6,17 L6,12 Q6,9 8,8 Z" fill="#8ab55a" opacity=".35" stroke="#3a6a2e" stroke-width="1.2"/><path d="M8,3 H16" stroke="#3a6a2e" stroke-width="1.4"/><circle cx="10" cy="15" r="2" fill="#7aa54a"/><circle cx="14" cy="17" r="1.5" fill="#5a8a3a"/><path d="M11,6 Q12,10 10,12" stroke="#7aa54a" fill="none" stroke-width="1.2"/></svg>',
  gear: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12,2 V5.5 M12,18.5 V22 M2,12 H5.5 M18.5,12 H22 M4.9,4.9 L7.4,7.4 M16.6,16.6 L19.1,19.1 M19.1,4.9 L16.6,7.4 M7.4,16.6 L4.9,19.1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  trophy: '<svg viewBox="0 0 24 24"><path d="M7,3 H17 V8 Q17,12 12,12 Q7,12 7,8 Z" fill="currentColor" opacity=".85"/><path d="M7,4 H4 Q4,9 7,10 M17,4 H20 Q20,9 17,10" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M11,12 H13 V15 H11 Z M8,15 H16 V18 H8 Z M6,18 H18 V21 H6 Z" fill="currentColor" opacity=".6"/></svg>',
  book: '<svg viewBox="0 0 24 24"><path d="M4,4 H11 Q12,5 13,4 H20 V17 Q14,19 12,18 Q10,19 4,17 Z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12,5 V18" stroke="currentColor" stroke-width="1.4"/><path d="M6,8 H10 M6,11 H10" stroke="currentColor" stroke-width="1.2"/></svg>',
  note: '<svg viewBox="0 0 24 24"><path d="M9,18 V5 L18,3 V15" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="7" cy="18" r="2.6" fill="currentColor"/><circle cx="16" cy="15" r="2.6" fill="currentColor"/></svg>',
  rebirth: '<svg viewBox="0 0 24 24"><path d="M20,12 A8,8 0 1 1 12,4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M12,1 L17,4 L12,7 Z" fill="currentColor"/><circle cx="12" cy="12" r="2.6" fill="currentColor"/></svg>',
};

/* 丹药图标（按品阶/品级配色，高品级带品环与星芒） */
const PILL_DARK = { q1: "#6e675c", q2: "#2e5a38", q3: "#8a6a1f", q4: "#6e2416", q5: "#3f2378", t2: "#2e6a30", t3: "#4a2e8a" };

function pillIcon(slot, rank) {
  const C = { q1: ["#a89f8d", "#6e675c"], q2: ["#5a9a4a", "#2e5a38"], q3: ["#d4af37", "#8a6a1f"], q4: ["#c04a2b", "#6e2416"], q5: ["#7a4ad0", "#3f2378"], t2: ["#6aa04a", "#2e6a30"], t3: ["#9a6ad0", "#4a2e8a"] };
  const [main, dark] = C[slot] || C.q1;
  const ring = (slot === "t2" || slot === "t3") ? '<path d="M5,13 A7,7 0 0 1 19,13" fill="none" stroke="#ffe8a0" stroke-width="1.4"/>' : "";
  const ring2 = slot === "t3" ? '<path d="M6.5,13 A5.5,5.5 0 0 1 17.5,13" fill="none" stroke="#ffe8a0" stroke-width="1"/>' : "";
  const star = (+slot.slice(1) >= 4) ? '<path d="M17,3.5 L18.2,5.8 L20.6,6.2 L18.8,8 L19.2,10.4 L17,9.4 Z" fill="#ffe8a0"/>' : "";
  return `<svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="8.5" fill="${main}" stroke="${dark}" stroke-width="1.2"/><ellipse cx="9.2" cy="10" rx="3.4" ry="2.2" fill="#fffbe8" opacity=".75" transform="rotate(-25 9.2 10)"/>${ring}${ring2}${star}${pillPattern(rank, dark)}</svg>`;
}

/* 丹药花纹（随丹方阶数 rank 1-10）：
   一品一道纹 / 二品两道纹 / 灵品浅色丹气+1~3道纹 / 圣品嵌玉石+黄丹气+1~3玉纹 / 神品丹灵+紫丹气+1~2道纹 */
function pillPattern(rank, deep) {
  rank = rank || 1;
  const qi = {
    ling: '<circle cx="12" cy="13" r="10.6" fill="none" stroke="#e8f0d8" stroke-width="1.6" opacity=".55" stroke-dasharray="4,3"/>',
    sheng: '<circle cx="12" cy="13" r="10.6" fill="none" stroke="#ffd97a" stroke-width="1.8" opacity=".6" stroke-dasharray="5,2.5"/><circle cx="12" cy="13" r="10.6" fill="none" stroke="#ffd97a" stroke-width="3" opacity=".22"/>',
    shen: '<circle cx="12" cy="13" r="10.6" fill="none" stroke="#b48ae0" stroke-width="1.8" opacity=".6" stroke-dasharray="4,2"/><circle cx="12" cy="13" r="10.6" fill="none" stroke="#b48ae0" stroke-width="3" opacity=".22"/>',
  };
  const arcs = n => {
    if (n <= 0) return "";
    if (n === 1) return `<path d="M5.8,11 A6.3,6.3 0 0 1 18.2,11" fill="none" stroke="${deep}" stroke-width="1.1" opacity=".5"/>`;
    if (n === 2) return `<path d="M5.8,11 A6.3,6.3 0 0 1 18.2,11" fill="none" stroke="${deep}" stroke-width="1.1" opacity=".5"/><path d="M6.2,15.5 A6,6 0 0 0 17.8,15.5" fill="none" stroke="${deep}" stroke-width="1.1" opacity=".5"/>`;
    return `<path d="M5,11.5 A7,7 0 0 1 19,11.5" fill="none" stroke="${deep}" stroke-width="1" opacity=".45"/><path d="M5.8,13 A6.3,6.3 0 0 1 18.2,13" fill="none" stroke="${deep}" stroke-width="1" opacity=".5"/><path d="M6.2,16 A5.8,5.8 0 0 0 17.8,16" fill="none" stroke="${deep}" stroke-width="1" opacity=".45"/>`;
  };
  const jade = n => {
    const spots = { 1: [[12, 9.5, 2]], 2: [[8.5, 14.5, 1.7], [15, 14, 1.7]], 3: [[12, 9.5, 1.8], [8.2, 14.8, 1.6], [15.6, 14.4, 1.6]] };
    return (spots[n] || []).map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#8ad4b8" stroke="#3a8a5a" stroke-width=".7"/><circle cx="${x - 0.5}" cy="${y - 0.5}" r="${r * 0.35}" fill="#d8f4e4"/>`).join("");
  };
  const ling = n => {
    if (n === 1) return '<path d="M8.5,15.5 Q10,10.5 14,11 Q17.5,11.8 15.8,14.6 Q14.2,16.6 10,16 Q8.4,15.8 8.5,15.5 Z" fill="#c9a8f0" opacity=".85"/><circle cx="14.8" cy="12.4" r="1.1" fill="#e8d4ff"/>';
    return '<path d="M8,15.8 Q9.5,10 14,10.5 Q18,11 16.2,14.8 Q14.5,17 9.5,16.4 Z" fill="#c9a8f0" opacity=".9"/><path d="M10.5,14.5 Q12.5,11.5 15,12.8" fill="none" stroke="#e8d4ff" stroke-width="1" opacity=".9"/><circle cx="15.6" cy="12.8" r="1.2" fill="#f0e2ff"/><path d="M6.5,11.5 A6,6 0 0 1 17.5,11" fill="none" stroke="#b48ae0" stroke-width=".9" opacity=".6"/>';
  };
  if (rank <= 2) return arcs(rank);
  if (rank <= 5) return qi.ling + arcs(rank - 2);
  if (rank <= 8) return qi.sheng + jade(rank - 5);
  return qi.shen + ling(rank - 8);
}

const FURNACE_UPGRADES = [
  { level: 2, name: "文火炉", cost: 300,  desc: "火候更稳：炼丹时间 -30%。" },
  { level: 3, name: "紫金炉", cost: 1000, desc: "炉身紫金：极品及以上概率 +8%。" },
  { level: 4, name: "八卦炉", cost: 3000, desc: "太上遗宝：所有品阶概率再提升。" },
];

const SHOP_RECIPES = {
  zhuji:    { cost: 150 },
  peiyuan:  { cost: 400 },
  ningjin:  { cost: 800 },
  yangshen: { cost: 1600 },
  huashen:  { cost: 3000 },
  lianxu:   { cost: 6000 },
  heti:     { cost: 12000 },
  due:      { cost: 22000 },
  feisheng: { cost: 40000 },
  xiaohuan: { cost: 180 },
  qingling: { cost: 500 },
  cuiti:    { cost: 900 },
  ningying: { cost: 1800 },
  pozhang:  { cost: 3600 },
  xuanming: { cost: 7000 },
  tianxind: { cost: 14000 },
  taiyi:    { cost: 26000 },
  zaohua:   { cost: 45000 },
};

/* 每日俸禄（按宗门地位）与每日固定草药包 */
const SECT_SALARY = [50, 100, 200, 400, 800];
const DAILY_HERBS = [
  { lingcao: 6, huojing: 2 },
  { lingcao: 8, huojing: 3, zihouhua: 2 },
  { lingcao: 10, huojing: 4, yunmu: 2, huanglongzhi: 1 },
  { lingcao: 12, huojing: 5, yunmu: 4, xuelian: 1, demicao: 2 },
  { lingcao: 15, huojing: 6, yunmu: 5, xuelian: 3, lingru: 1 },
  { lingcao: 18, huojing: 8, yunmu: 6, xuelian: 4, tianxinlian: 1, ninghuncao: 1 },
];

const MILESTONES = [10, 50, 100, 300, 800];
const MILESTONE_WORDS = {
  10: "初窥门径：炼丹十枚，丹道可期！",
  50: "小有所成：五十枚丹药出炉，坊间已有人求购。",
  100: "丹道名家：百丹出炉，集市愿为你留一席柜台。",
  300: "一代丹师：三百枚丹药，仙鹤都嗅香而来。",
  800: "丹道通玄：八百金丹，诸山门争相邀你坐镇丹房。",
};

const RANKS = [
  { min: 0,    name: "外门弟子" },
  { min: 100,  name: "内门弟子" },
  { min: 300,  name: "真传弟子" },
  { min: 800,  name: "客卿长老" },
  { min: 2000, name: "太上长老" },
];

/* ================= 存档与状态 ================= */
const SAVE_KEY = "lianlegedan_save_v1";

function defaultState() {
  return {
    lingshi: 50,
    materials: { lingcao: 6, huojing: 0, yunmu: 0, xuelian: 0, longxian: 0 },
    pills: {},
    recipes: ["juqi"],
    furnaceLevel: 1,
    autoGather: false,
    shopCat: "herb",                 // 商店当前分类
    recipeCat: "fan",                // 丹方管理当前品级分类

    soundOn: true,
    marketRate: 1,
    pet: { name: "小狸", level: 1, exp: 0 },
    petPos: null,                    // 丹宠拖拽位置（视口比例坐标）
    luck: 0,                         // 幸运值：服用丹药提升，降低炼丹失败率
    xp: 0,                           // 丹师修为经验：炼丹/委托/成就累积，决定境界
    viewTier: "t1",                  // 概率面板当前查看的品级
    heatWear: 0,                     // 心火：炼丹成功后随机累积，降低成功率，跨日重置
    buffs: [],                       // 服药增益 [{type, mult, val, until, name}]
    mastery: {},                     // 丹方熟练度 {丹方key: 炼成次数}
    achievements: {},                // 已达成成就 {id: true}
    fortune: { type: "平", val: 0 }, // 今日运势：吉/平/凶
    event: null,                     // 炼丹异象事件 {kind, resolved}
    wood: { firewood: 3, spiritwood: 0 },   // 炉底燃料：柴薪/灵木
    furnaceStage: "idle",            // 丹炉弹窗阶段：idle 投药 / loaded 选柴
    furnaceWoodChoice: null,         // 选柴阶段的木柴选择
    furnaceTop: [],                  // 炉顶悬浮丹药 [{key, slot}]，点击收集入库
    burning: null,
    furnaceSel: "juqi",
    furnaceLoad: {},                 // 已投入炉中但未开火的材料
    gameTime: 0,
    sect: { gongxian: 0, rank: 0, hearts: 3, dailyTask: null, lastDay: null },
    stats: { refined: 0, refinedByRecipe: {}, earned: 0 },
    lastSeen: Date.now(),
  };
}

function isPlainObj(v) {
  return v && typeof v === "object" && !Array.isArray(v);
}

function deepMerge(base, saved) {
  for (const k of Object.keys(saved)) {
    if (isPlainObj(base[k]) && isPlainObj(saved[k])) deepMerge(base[k], saved[k]);
    else base[k] = saved[k];
  }
  return base;
}

function loadState() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return defaultState();
    const s = JSON.parse(raw);
    const st = deepMerge(defaultState(), s);
    // 旧档迁移：selectedRecipe → furnaceSel
    if (s.selectedRecipe && RECIPES[s.selectedRecipe]) st.furnaceSel = s.selectedRecipe;
    // 旧丹方体系迁移：映射到新十阶丹方，无效丹方剔除
    st.recipes = (st.recipes || []).filter(k => RECIPES[k]);
    const legacyMap = { huoyun: "zhuji", ningshuang: "peiyuan", jiuzhuan: "yangshen" };
    for (const k of Object.keys(legacyMap)) {
      if ((s.recipes || []).includes(k) && !st.recipes.includes(legacyMap[k])) st.recipes.push(legacyMap[k]);
    }
    if (!st.recipes.length) st.recipes = ["juqi"];
    // 清理旧丹方产出的库存
    for (const k of Object.keys(st.pills || {})) {
      if (!RECIPES[k]) delete st.pills[k];
    }
    return st;
  } catch {
    return defaultState();
  }
}

let state = loadState();

function save() {
  state.lastSeen = Date.now();
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch (e) { /* 存储满则忽略 */ }
}

/* ================= 音效（WebAudio 合成，无外部资源） ================= */
let audioCtx = null;
function beep(freq, dur, type, vol, endFreq) {
  if (!state.soundOn) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = type || "sine";
    o.frequency.setValueAtTime(freq, audioCtx.currentTime);
    if (endFreq) o.frequency.exponentialRampToValueAtTime(endFreq, audioCtx.currentTime + dur);
    g.gain.setValueAtTime(vol || 0.08, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
    o.connect(g); g.connect(audioCtx.destination);
    o.start(); o.stop(audioCtx.currentTime + dur);
  } catch (e) { /* 音频不可用则静默 */ }
}
function sfx(name) {
  switch (name) {
    case "fire":    beep(90, 0.5, "sawtooth", 0.06, 45); break;
    case "ding":    beep(880, 0.28, "sine", 0.1, 1500); break;
    case "rare":    beep(660, 0.15, "sine", 0.1); setTimeout(() => beep(990, 0.15, "sine", 0.1), 130); setTimeout(() => beep(1320, 0.3, "sine", 0.1), 260); break;
    case "coin":    beep(1200, 0.08, "square", 0.05); setTimeout(() => beep(1600, 0.1, "square", 0.05), 80); break;
    case "levelup": [523, 659, 784].forEach((f, i) => setTimeout(() => beep(f, 0.18, "triangle", 0.08), i * 110)); break;
    case "click":   beep(500, 0.05, "square", 0.03); break;
  }
}

/* ================= 工具 ================= */
const $ = (id) => document.getElementById(id);
const rand = (n) => Math.floor(Math.random() * n);
const pick = (arr) => arr[rand(arr.length)];

/* 修行手札：内存记录，弹窗查看 */
const logHistory = [];

function logModalOpen() {
  return !$("modal-mask").hidden && $("modal-title").textContent === "修行手札";
}

function sectModalOpen() {
  return !$("modal-mask").hidden && $("modal-title").textContent === "宗门";
}

let barTimer = null;

function showBar(msg) {
  const bar = $("toast-bar");
  if (!bar) return;
  bar.textContent = "· " + msg;
  bar.hidden = false;
  bar.classList.remove("show");
  void bar.offsetWidth;
  bar.classList.add("show");
  clearTimeout(barTimer);
  barTimer = setTimeout(() => {
    bar.classList.remove("show");
    setTimeout(() => { bar.hidden = true; }, 400);
  }, 3500);
}

function log(msg) {
  logHistory.push(msg);
  if (logHistory.length > 40) logHistory.shift();
  if (logModalOpen()) renderLogModal();
  showBar(msg);
}

function openLog() {
  openModal("修行手札", false);
  renderLogModal();
}

function renderLogModal() {
  const body = $("modal-body");
  body.innerHTML = logHistory.length
    ? `<ul class="log-list">` + logHistory.slice().reverse().map(m => `<li>· ${m}</li>`).join("") + `</ul>`
    : `<p style="text-align:center;color:var(--ink-soft);padding:30px 0">手札空空，先去采药开炉吧。</p>`;
}

function openAchv() {
  $("modal-title").textContent = "成就";
  $("rate-badge").hidden = true;
  $("modal-mask").hidden = false;
  const body = $("modal-body");
  const done = ACHIEVEMENTS.filter(a => state.achievements[a.id]).length;
  let html = `<div class="item-desc" style="margin-bottom:8px">已达成 ${done} / ${ACHIEVEMENTS.length} 项成就，达成即刻获得灵石奖励。</div>`;
  for (const a of ACHIEVEMENTS) {
    const got = state.achievements[a.id];
    html += `<div class="achv-item ${got ? "got" : ""}"><div class="achv-mark">${got ? "✓" : "？"}</div><div class="item-info"><div class="item-name">${a.name}</div><div class="item-desc">${a.desc} · 奖励 ${a.reward} 石</div></div></div>`;
  }
  body.innerHTML = html;
}

/* 设置面板：手札/成就/玩法/音效/重修 集中入口 */
function openSettings() {
  $("modal-title").textContent = "设置";
  $("rate-badge").hidden = true;
  $("modal-mask").hidden = false;
  const body = $("modal-body");
  const done = ACHIEVEMENTS.filter(a => state.achievements[a.id]).length;
  const rows = [
    { ico: ICONS.scroll, name: "修行手札", desc: "查看历次消息记录", act: "log" },
    { ico: ICONS.trophy, name: "成就", desc: `已达成 ${done} / ${ACHIEVEMENTS.length} 项`, act: "achv" },
    { ico: ICONS.book, name: "玩法说明", desc: "如何成为一名丹师", act: "help" },
    { ico: ICONS.note, name: "音效", desc: state.soundOn ? "当前：开" : "当前：关", act: "sound" },
    { ico: ICONS.rebirth, name: "散功重修", desc: "清空全部进度，从头再来", act: "reset", danger: true },
  ];
  let html = "";
  for (const r of rows) {
    html += `<div class="set-row ${r.danger ? "danger" : ""}" data-act="${r.act}"><span class="set-ico">${r.ico}</span><div class="item-info"><div class="item-name">${r.name}</div><div class="item-desc">${r.desc}</div></div><span class="set-arrow">›</span></div>`;
  }
  body.innerHTML = html;
  body.querySelectorAll("[data-act]").forEach(b => b.onclick = () => {
    const act = b.dataset.act;
    sfx("click");
    if (act === "log") return openLog();
    if (act === "achv") return openAchv();
    if (act === "help") { closeModal(); $("help-mask").hidden = false; return; }
  });
  $("help-close").onclick = () => { $("help-mask").hidden = true; };
  $("help-mask").onclick = (e) => { if (e.target === $("help-mask")) $("help-mask").hidden = true; };
}

/* 丹师简介（点击头像）：境界/修为/统计 */
function openProfile() {
  $("modal-title").textContent = "丹师";
  $("rate-badge").hidden = true;
  $("modal-mask").hidden = false;
  const body = $("modal-body");
  const idx = realmIdx();
  const xp = state.xp || 0;
  const cur = XP_NEED[idx];
  const next = XP_NEED[idx + 1];
  const pct = next ? Math.min(100, Math.round((xp - cur) / (next - cur) * 100)) : 100;
  const totalPills = Object.entries(state.pills).reduce((a, [k, qs]) => a + (RECIPES[k] ? Object.values(qs).reduce((x, y) => x + y, 0) : 0), 0);
  const days = Math.floor((state.gameTime || 0) / 10 / 12) + 1;
  const achv = ACHIEVEMENTS.filter(a => state.achievements[a.id]).length;
  const recipes = state.recipes.length;
  const html = `
    <div class="profile-head">
      <div class="profile-avatar">丹</div>
      <div class="profile-id">
        <div class="profile-name">炼丹道人</div>
        <div class="profile-realm">境界：${DREALM[idx]} · ${rankCN(idx + 1)}品丹师</div>
      </div>
    </div>
    <div class="profile-xp">
      <div class="xp-line">修为 ${xp} / ${next || "大圆满"}（${DREALM[idx]} → ${DREALM[idx + 1] || "飞升大圆满"}）</div>
      <div class="bar"><div class="fill" style="width:${pct}%"></div></div>
    </div>
    <div class="profile-stats">
      <div class="pstat"><span>炼丹总数</span><b>${state.stats.refined} 枚</b></div>
      <div class="pstat"><span>修行天数</span><b>${days} 日</b></div>
      <div class="pstat"><span>宗门贡献</span><b>${state.sect.gongxian}</b></div>
      <div class="pstat"><span>成就</span><b>${achv} / ${ACHIEVEMENTS.length}</b></div>
      <div class="pstat"><span>累计收益</span><b>${state.stats.earned} 石</b></div>
      <div class="pstat"><span>丹方习得</span><b>${recipes} / 19</b></div>
    </div>
    <div class="item-desc" style="margin-top:10px">境界越高，宗门委托的品阶与酬劳随之上调；炼成高阶丹药、完成委托与成就均可累积修为。</div>`;
  body.innerHTML = html;
}

function petExpNeed(level) {
  return Math.round(20 * Math.pow(level, 1.4));
}

/* 灵历时间：10 现实秒 = 1 时，12 时 = 1 日，30 日 = 1 月，12 月 = 1 年 */
function gameTimeParts() {
  const t = state.gameTime;
  const totalHours = Math.floor(t / 10);
  const hour = totalHours % 12 + 1;
  const totalDays = Math.floor(totalHours / 12);
  const day = totalDays % 30 + 1;
  const totalMonths = Math.floor(totalDays / 30);
  const month = totalMonths % 12 + 1;
  const year = Math.floor(totalMonths / 12) + 1;
  return { year, month, day, hour, dayKey: year + "-" + month + "-" + day };
}

function timeText() {
  const t = gameTimeParts();
  return `灵历${t.year}年${t.month}月${t.day}日${t.hour}时`;
}

/* 操作耗时驱动时间：采药/开炉等操作累计 gameTime（秒），10 秒 = 1 时辰 */
function addGameTime(sec) {
  const before = gameTimeParts().dayKey;
  state.gameTime += sec;
  const after = gameTimeParts().dayKey;
  if (after !== before) onDayChange(after);
}

function furnaceModalOpen() {
  return !$("modal-mask").hidden && $("modal-title").textContent.indexOf("丹炉") === 0;
}

/* ================= 渲染 ================= */
function renderTop() {
  $("stat-lingshi").textContent = state.lingshi;
  $("stat-pet").textContent = "Lv." + state.pet.level;
  $("stat-count").textContent = state.stats.refined;
  $("stat-time").textContent = timeText();
  const hearts = state.sect.hearts === undefined ? 3 : state.sect.hearts;
  $("stat-hearts").innerHTML = [1, 2, 3].map(i =>
    `<svg class="heart-ico ${i <= hearts ? "full" : "empty"}" viewBox="0 0 24 24"><path d="M12,20 C5,14 2,10 2,6.5 C2,3.5 4.5,2 7,2 C9,2 11,3.5 12,5.5 C13,3.5 15,2 17,2 C19.5,2 22,3.5 22,6.5 C22,10 19,14 12,20 Z"/></svg>`
  ).join("");
  $("pet-name").textContent = `${state.pet.name} · Lv.${state.pet.level}`;
  const need = petExpNeed(state.pet.level);
  $("pet-exp-fill").style.width = Math.min(100, (state.pet.exp / need) * 100) + "%";


}


function renderTaskBrief() {
  const box = $("task-brief");
  if (!box) return;
  const t = state.sect.dailyTask;
  if (!t) { box.innerHTML = `<div class="brief-task"><span class="brief-name">今日委托待宗门发放</span></div>`; return; }
  const ready = taskDeliverable(t);
  const prog = t.done ? "已完成 ✔" : (ready ? "可交付" : `进行中 ${Math.min(t.progress, t.count)}/${t.count}`);
  box.innerHTML = `<div class="brief-task"><span class="brief-name">${t.desc}</span><span class="brief-prog ${t.done || ready ? "ready" : ""}">${prog}</span></div>`;
}


function gatherMaterial(silent, noTime) {
  const gain = Math.max(1, Math.round(buffMult("gather")));
  const pool = ["lingcao", "lingcao", "lingcao", "huojing", "huojing", "yunmu", "xuelian", "longxian",
    "zihouhua", "huanglongzhi", "demicao", "lingru", "tianxinlian", "ninghuncao"];
  const got = {};
  for (let i = 0; i < gain; i++) {
    const key = pick(pool);
    state.materials[key] = (state.materials[key] || 0) + 1;
    got[key] = (got[key] || 0) + 1;
  }
  if (!noTime) addGameTime(10);          // 采药耗时 1 时辰
  if (Math.random() < 0.08) {
    state.wood.firewood = (state.wood.firewood || 0) + 1;
    if (!silent) log(`顺手捡了些柴薪。`);
  }
  if (!silent) {
    log(`采得${Object.entries(got).map(([k, c]) => `${MATERIALS[k].name}×${c}`).join("、")}。`);
    const r = Math.random();
    if (r < 0.07) { const g = 5 + rand(16); state.lingshi += g; log(`意外拾得灵石 ${g} 枚！`); }
    else if (r < 0.12) { log(`山间灵气袭来，精神一振。`); }
  }
  return Object.keys(got)[0];
}

/* 炉顶悬浮丹药：点击收取入仓库（有多少颗就悬浮多少颗） */
function pillSVG(slot, rank) {
  const dark = PILL_DARK[slot] || "#6e675c";
  return `<svg class="pill-svg" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="url(#pg_${slot})"/><ellipse cx="8.6" cy="8" rx="3.6" ry="2.3" fill="#fffbe8" opacity=".8" transform="rotate(-28 8.6 8)"/>${pillPattern(rank, dark)}</svg>`;
}

function renderFurnaceTop() {
  const top = $("furnace-top");
  if (!top) return;
  const list = state.furnaceTop || [];
  if (!list.length) { top.innerHTML = ""; top.classList.remove("has"); return; }
  top.classList.add("has");
  top.innerHTML = list.map((p, i) =>
    `<div class="fp-slot ${p.isNew ? "rise" : ""}"><div class="float-pill" style="animation-delay:${(i % 6) * 0.4}s" title="${(RECIPES[p.key] || {}).name || ""}">${pillSVG(p.slot, (RECIPES[p.key] || {}).rank)}</div></div>`
  ).join("");
  list.forEach(p => { p.isNew = false; });
}

function collectFurnaceTop(silent) {
  const list = state.furnaceTop || [];
  if (!list.length) return 0;
  for (const p of list) {
    const qs = state.pills[p.key] = state.pills[p.key] || {};
    qs[p.slot] = (qs[p.slot] || 0) + 1;
  }
  const n = list.length;
  state.furnaceTop = [];
  if (!silent) {
    log(`收取炉顶丹药 ×${n}，已收入仓库。`);
    sfx("coin");
    renderFurnaceTop(); renderAll(); save();
  }
  return n;
}

function renderRefine() {
  const burning = state.burning;
  $("furnace").classList.toggle("burning", !!burning);
  if (burning) {
    const pct = ((burning.total - burning.left) / burning.total) * 100;
    $("refine-fill").style.width = pct + "%";
    $("refine-label").textContent = `炉火正旺 · ${RECIPES[burning.recipe].name} · 还需 ${Math.ceil(burning.left)} 秒（点丹炉扇火提速）`;
  } else {
    $("refine-fill").style.width = "0%";
    const loaded = Object.values(state.furnaceLoad).some(n => n > 0);
    $("refine-label").textContent = loaded ? "炉中已有药材，点丹炉继续" : "点击丹炉，选方投药";
  }
}

function renderHot() {
  const list = $("hot-list");
  const entries = Object.entries(state.stats.refinedByRecipe)
    .filter(([k]) => RECIPES[k])
    .sort((a, b) => b[1] - a[1]).slice(0, 5);
  list.innerHTML = entries.length
    ? entries.map(([k, n], i) =>
        `<li><span><span class="rk">${["壹","贰","叁","肆","伍"][i]}</span>${RECIPES[k].name}</span><b>×${n}</b></li>`
      ).join("")
    : `<li class="empty">尚未开炉，热榜虚位以待</li>`;
}

/* 服药增益查询 */
function buffMult(type) { let m = 1; for (const b of state.buffs || []) if (b.type === type && b.until > state.gameTime) m = Math.max(m, b.mult); return m; }
function buffVal(type) { let v = 0; for (const b of state.buffs || []) if (b.type === type && b.until > state.gameTime) v += b.val; return v; }
function hasBuff(type) { return (state.buffs || []).some(b => b.type === type && b.until > state.gameTime); }
function clearExpiredBuffs() {
  const before = (state.buffs || []).length;
  state.buffs = (state.buffs || []).filter(b => b.until > state.gameTime);
  return before - state.buffs.length;
}

function currentFailChance(key) {
  const r = RECIPES[key];
  let f = (r.fail || 0.1)
    - (state.pet.level - 1) * 0.01 - (state.furnaceLevel - 1) * 0.05
    - (state.luck || 0) * 0.005
    + (state.heatWear || 0) * 0.01
    + (state.fortune.val || 0)
    - buffVal("success")
    - Math.min(0.10, (state.mastery[key] || 0) * 0.002)
    - ((state.burning && state.burning.failDelta) || 0);
  if (state.burning && state.burning.wood === "spiritwood") f -= WOOD_DEF.spiritwood.failCut;
  return Math.max(0.05, f);
}

/* 直接炼出二品/三品的概率（幸运、丹炉、丹宠均提升，灵木与增益再乘） */
function tierRates(key) {
  const luck = state.luck || 0;
  const boost = ((state.burning && state.burning.wood === "spiritwood") ? WOOD_DEF.spiritwood.tierBoost : 1)
    * ((state.burning && state.burning.tierBoost) || 1) * buffMult("tier");
  const t3 = Math.min(0.15, (0.02 + luck * 0.001 + (state.furnaceLevel - 1) * 0.01 + (state.pet.level - 1) * 0.002) * boost);
  const t2 = Math.min(0.30, (0.08 + luck * 0.003 + (state.furnaceLevel - 1) * 0.02 + (state.pet.level - 1) * 0.005) * boost);
  return { t1: Math.max(0, 1 - t2 - t3), t2, t3 };
}

function renderChance() {
  const key = state.furnaceSel;
  const r = RECIPES[key];
  const tier = state.viewTier || "t1";
  const rates = tierRates(key);
  const ok = Math.round((1 - currentFailChance(key)) * rates[tier] * 100);
  $("chance-val").textContent = ok + "%";
  $("chance-pointer").style.left = Math.min(96, Math.max(4, ok)) + "%";
  const tierName = { t1: "一品", t2: "二品", t3: "三品" }[tier];
  const mc = state.mastery[key] || 0;
  $("chance-sub").textContent = `${rankCN(r.rank)}阶·${r.name} · 幸运 ${state.luck || 0} · 熟练 ${mc} · 运势 ${state.fortune.type}` + ((state.heatWear || 0) ? ` · 心火 +${state.heatWear}` : "");
  document.querySelectorAll("#tier-tabs .tier-tab").forEach(b => b.classList.toggle("active", b.dataset.tier === tier));
}

function renderAll() {
  renderTop(); renderTaskBrief(); renderChance(); renderRefine(); renderHot(); renderFurnaceTop(); renderEvent(); checkAchievements();
}

/* ================= 丹炉弹窗（选方投药） ================= */
function openFurnace() {
  $("modal-title").textContent = "丹炉";
  $("rate-badge").hidden = true;
  $("modal-mask").hidden = false;
  renderFurnaceModal();
}

function renderFurnaceModal() {
  const body = $("modal-body");
  if (state.burning) {
    const pct = Math.round(((state.burning.total - state.burning.left) / state.burning.total) * 100);
    body.innerHTML = `
      <p style="text-align:center;font-size:15px;margin:8px 0">正在以${WOOD_DEF[state.burning.wood].name}熬制 <b style="color:var(--cinnabar)">${RECIPES[state.burning.recipe].name}</b>，还需约 ${Math.ceil(state.burning.left)} 秒。</p>
      <div class="bar" style="height:18px"><div class="fill" style="width:${pct}%"></div></div>
      <p style="text-align:center;font-size:12.5px;color:var(--ink-soft);margin-top:10px">关闭弹窗炼制继续，点击场景中的丹炉可扇火提速。</p>`;
    return;
  }

  if (state.furnaceStage === "loaded") {
    const sel = RECIPES[state.furnaceSel];
    body.innerHTML = `
      <p style="text-align:center;font-size:15px;margin:10px 0">药材已备：<b style="color:var(--cinnabar)">${sel.name}</b>（${Object.entries(sel.mats).map(([k, n]) => `${MATERIALS[k].name}×${n}`).join("、")}）</p>
      <p style="text-align:center;font-size:13px;color:var(--ink-soft);margin:12px 0">请到场景中<b style="color:var(--cinnabar)">点击炉底的柴堆</b>挑选木柴，再行点火。</p>
      <button class="ghost-btn" id="btn-back-load" style="display:block;margin:10px auto 0">返回调整药材</button>`;

    body.querySelector("#btn-back-load").onclick = () => {
      state.furnaceStage = "idle";
      renderFurnaceModal(); save();
    };
    return;
  }

  const sel = RECIPES[state.furnaceSel];
  let html = `<div class="furnace-tabs">`;
  for (const key of state.recipes) {
    html += `<button class="chip ${state.furnaceSel === key ? "active" : ""}" data-fsel="${key}">${RECIPES[key].name}</button>`;
  }
  html += `</div>`;

  html += `<div class="item-desc" style="margin-bottom:8px">${sel.desc} · 约需 ${sel.time} 秒</div>`;

  for (const [k, n] of Object.entries(sel.mats)) {
    const inLoad = state.furnaceLoad[k] || 0;
    const have = state.materials[k] || 0;
    const full = inLoad >= n;
    html += `
      <div class="shop-item">
        <span class="ico">${ICONS[k] || ""}</span>
        <div class="item-info"><div class="item-name">${MATERIALS[k].name}</div><div class="item-desc">库存 ${have} 株</div></div>
        <span class="load-count ${full ? "full" : ""}">炉内 ${inLoad} / ${n}</span>
        <button class="buy-btn" data-put="${k}" ${have <= 0 || full ? "disabled" : ""}>投入</button>
        <button class="buy-btn" data-take="${k}" ${inLoad <= 0 ? "disabled" : ""}>取回</button>
      </div>`;
  }

  const ready = loadReady();
  html += `<button class="fire-btn small" id="modal-confirm" ${ready ? "" : "disabled"}>${ready ? "确 定" : "药材未齐"}</button>`;

  body.innerHTML = html;

  body.querySelectorAll("[data-fsel]").forEach(b => b.onclick = () => {
    if (state.furnaceSel === b.dataset.fsel) return;
    unloadAll();                       // 换方前把炉内药材退回库存
    state.furnaceSel = b.dataset.fsel;
    sfx("click");
    renderFurnaceModal(); renderAll(); save();
  });
  body.querySelectorAll("[data-put]").forEach(b => b.onclick = () => { putMat(b.dataset.put, false); });
  body.querySelectorAll("[data-take]").forEach(b => b.onclick = () => { takeMat(b.dataset.take, false); });
  body.querySelector("#modal-confirm").onclick = doConfirmLoad;
}

function doConfirmLoad() {
  if (state.burning || state.furnaceStage !== "idle" || !loadReady()) return;
  const n = collectFurnaceTop(true);   // 确定新药材前，先收取炉顶旧丹
  if (n) log(`收取炉顶丹药 ×${n}，已收入仓库。`);
  state.furnaceStage = "loaded";
  state.furnaceWoodChoice = (state.wood.firewood > 0) ? "firewood" : (state.wood.spiritwood > 0 ? "spiritwood" : null);
  closeModal();
  log(`药材已备好——到炉底点一下柴堆，挑根木柴点火吧。`);
  renderAll(); save();
}

/* 炉底选柴弹窗（由点击炉底触发） */
function openWoodSelect() {
  $("modal-title").textContent = "炉底选柴";
  $("rate-badge").hidden = true;
  $("modal-mask").hidden = false;
  const body = $("modal-body");
  const choice = state.furnaceWoodChoice;
  let html = `<div class="item-desc" style="margin-bottom:10px">为 <b style="color:var(--cinnabar)">${RECIPES[state.furnaceSel].name}</b> 挑选炉底木柴：</div><div class="wood-opts">`;
  for (const [wk, w] of Object.entries(WOOD_DEF)) {
    const n = state.wood[wk] || 0;
    const none = n <= 0;
    html += `
      <div class="wood-opt ${choice === wk ? "active" : ""} ${none ? "no" : ""}" data-wood="${wk}">
        <div class="w-head"><span class="ico">${ICONS[wk] || ""}</span><span class="w-name">${w.name}</span><span class="w-count">库存 ×${n}</span></div>
        <div class="w-desc">${w.desc}</div>
      </div>`;
  }
  html += `</div>
    <button class="fire-btn small" id="modal-fire" ${choice && (state.wood[choice] || 0) > 0 ? "" : "disabled"}>点 火</button>
    <button class="ghost-btn" id="btn-wood-close" style="display:block;margin:10px auto 0">稍后再选</button>`;
  body.innerHTML = html;
  body.querySelectorAll("[data-wood]").forEach(b => b.onclick = () => {
    const wk = b.dataset.wood;
    if ((state.wood[wk] || 0) <= 0) return log(`${WOOD_DEF[wk].name}不足，可去商店购买。`);
    state.furnaceWoodChoice = wk;
    sfx("click");
    openWoodSelect();
  });
  body.querySelector("#modal-fire").onclick = doFire;
  body.querySelector("#btn-wood-close").onclick = closeModal;
}

function loadReady() {
  const mats = RECIPES[state.furnaceSel].mats;
  return Object.entries(mats).every(([k, n]) => (state.furnaceLoad[k] || 0) >= n);
}

function putMat(key, all) {
  const need = RECIPES[state.furnaceSel].mats[key] || 0;
  const inLoad = state.furnaceLoad[key] || 0;
  const have = state.materials[key] || 0;
  const add = Math.min(all ? have : 1, need - inLoad, have);
  if (add <= 0) return;
  state.materials[key] = have - add;
  state.furnaceLoad[key] = inLoad + add;

  sfx("click");
  renderFurnaceModal(); renderAll(); save();
}

function takeMat(key, all) {
  const inLoad = state.furnaceLoad[key] || 0;
  if (inLoad <= 0) return;
  const back = all ? inLoad : 1;
  state.furnaceLoad[key] = inLoad - back;
  state.materials[key] = (state.materials[key] || 0) + back;
  sfx("click");
  renderFurnaceModal(); renderAll(); save();
}

function unloadAll() {
  for (const [k, n] of Object.entries(state.furnaceLoad)) {
    if (n > 0) state.materials[k] = (state.materials[k] || 0) + n;
  }
  state.furnaceLoad = {};
}

function doFire() {
  if (state.burning || state.furnaceStage !== "loaded") return;
  const wood = state.furnaceWoodChoice;
  if (!wood || !(state.wood[wood] > 0)) return log("请先选择木柴。");
  state.wood[wood]--;
  state.furnaceLoad = {};              // 点火即正式消耗炉中药材
  const r = RECIPES[state.furnaceSel];
  const timeMult = state.furnaceLevel >= 2 ? 0.7 : 1;
  // 开炉耗时：点火 1 时辰 + 炼制时长折半
  addGameTime(10 + Math.ceil(r.time * timeMult / 2) * 10);
  state.burning = { recipe: state.furnaceSel, total: r.time * timeMult, left: r.time * timeMult, wood };
  state.furnaceStage = "idle";
  log(`点火！以${WOOD_DEF[wood].name}熬制${r.name}…`);
  sfx("fire");
  if (Math.random() < 0.4) {
    const kind = pick(["pet", "demon", "rain", "qi"]);
    if (kind === "qi") {
      state.burning.failDelta = -0.06;
      state.burning.tierBoost = 1.2;
      log(`异象：一缕纯阳灵气涌入炉中——本次成功率 +6%，高品级产出提升！`);
    } else {
      state.event = { kind, resolved: false };
      log(`炼制异象——${EVENT_DEF[kind].name}！速作抉择。`);
    }
  } else state.event = null;
  closeModal();
  renderAll(); save();
}


function fanFire() {
  if (!state.burning) return;
  state.burning.left = Math.max(0.2, state.burning.left - 0.6);
  const f = $("furnace");
  f.classList.remove("fanned");
  void f.offsetWidth;
  f.classList.add("fanned");
  setTimeout(() => f.classList.remove("fanned"), 320);
  sfx("fire");
  renderRefine();
  if (furnaceModalOpen()) renderFurnaceModal();
}

function rollQuality() {
  let weights = [52, 26, 14, 6, 2];
  if (state.furnaceLevel >= 3) weights = [44, 27, 17, 8.5, 3.5];
  if (state.furnaceLevel >= 4) weights = [34, 28, 21, 11, 6];
  const bonus = state.pet.level * 0.4 + (state.luck || 0) * 0.1;
  weights[2] += bonus;
  weights[3] += bonus * 0.6;
  weights[4] += bonus * 0.3;
  weights[0] -= bonus; weights[1] -= bonus * 0.5;
  weights = weights.map(w => Math.max(1, w));
  const total = weights.reduce((a, b) => a + b, 0);
  let roll = Math.random() * total;
  for (let i = 0; i < weights.length; i++) {
    roll -= weights[i];
    if (roll <= 0) return i + 1;
  }
  return 1;
}

function checkMilestone() {
  const n = state.stats.refined;
  if (MILESTONES.includes(n)) {
    log(MILESTONE_WORDS[n]);
    sfx("levelup");
  }
}

function finishRefine() {
  const key = state.burning.recipe;
  const failChance = currentFailChance(key);
  state.burning = null;
  state.event = null;
  const r = RECIPES[key];
  if (Math.random() < failChance) {
    log(`轰——！${r.name}炼制失败，炉中药材尽毁，只能重新采药或去商店购置。`);
    sfx("fire");
    if (furnaceModalOpen()) renderFurnaceModal();
    renderAll();
    return;
  }
  state.mastery[key] = (state.mastery[key] || 0) + 1;
  if (!state.pills[key]) state.pills[key] = {};
  const rates = tierRates(r);
  const roll2 = Math.random();
  let tierGained = null, q = null, gainedSlot = null;
  if (roll2 < rates.t3) {
    tierGained = "t3";
    gainedSlot = "t3";
  } else if (roll2 < rates.t3 + rates.t2) {
    tierGained = "t2";
    gainedSlot = "t2";
  } else {
    q = rollQuality();
    gainedSlot = "q" + q;
  }
  state.furnaceTop.push({ key, slot: gainedSlot, isNew: true });

  state.stats.refined++;
  state.mastery[key] = (state.mastery[key] || 0) + 1;
  state.stats.refinedByRecipe[key] = (state.stats.refinedByRecipe[key] || 0) + 1;
  gainXP(r.rank * 5 * (tierGained === "t3" ? 3 : tierGained === "t2" ? 2 : 1));
  gainPetExp(5);
  showPillToast(key, q, tierGained);
  if (tierGained === "t3") {
    log(`丹成异象！三品·${r.name}自炉中升起，悬于炉顶（点击丹药收取）。`);
    sfx("rare");
  } else if (tierGained === "t2") {
    log(`火候恰到好处，二品·${r.name}自炉中升起，悬于炉顶（点击丹药收取）。`);
    sfx("rare");
  } else {
    log(`${QUALITIES[q - 1].name}·${r.name}出炉了！悬于炉顶，点击收取。`);
    q >= 4 ? sfx("rare") : sfx("ding");
  }

  if (!hasBuff("nocalm") && Math.random() < 0.6) {
    const add = 1 + rand(3);
    state.heatWear = (state.heatWear || 0) + add;
    log(`炼丹耗神，心火渐起：成功率临时下降 ${add}%（跨日打坐可恢复）。`);
  }
  checkMilestone();
  if (furnaceModalOpen()) renderFurnaceModal();
  renderAll();

}

function showPillToast(key, q, tier) {
  let label, color, sub;
  if (tier) {
    label = TIER_DEF[tier].name;
    color = tier === "t3" ? "q5" : "q4";
    sub = "丹成异象，直接炼出高品级！";
  } else {
    const qual = QUALITIES[q - 1];
    label = qual.name;
    color = qual.color;
    sub = qual.mult >= 9 ? "丹香四溢，仙光乍现！" : "已收入囊中";
  }
  $("toast-quality").textContent = label;
  $("toast-quality").className = "toast-seal " + color;
  $("toast-name").textContent = RECIPES[key].name;
  $("toast-sub").textContent = sub;
  const toast = $("pill-toast");
  toast.hidden = false;
  clearTimeout(showPillToast._t);
  showPillToast._t = setTimeout(() => { toast.hidden = true; }, 2200);
}

/* ---- 丹宠 ---- */
function gainPetExp(n) {
  state.pet.exp += n;
  let need = petExpNeed(state.pet.level);
  while (state.pet.exp >= need) {
    state.pet.exp -= need;
    state.pet.level++;
    need = petExpNeed(state.pet.level);
    log(`${state.pet.name}升到了 Lv.${state.pet.level}，极品率提升了！`);
    sfx("levelup");
  }
}

function petTick() {
  if (Math.random() < 0.25) {
    const key = gatherMaterial(true);
    log(`${state.pet.name}叼回来一株${MATERIALS[key].name}。`);
    renderAll();
  }
}

function pokePet(e) {
  const zone = $("pet-zone");
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = pick(["♡", "♥", "✧"]);
  const rect = zone.getBoundingClientRect();
  heart.style.left = (e.clientX - rect.left - 8 + rand(20) - 10) + "px";
  heart.style.top = (e.clientY - rect.top - 14) + "px";
  zone.appendChild(heart);
  setTimeout(() => heart.remove(), 1000);
  sfx("click");
  if (Math.random() < 0.2) {
    gainPetExp(2);
    log(`你揉了揉${state.pet.name}的脑袋，它很开心。`);
    renderAll();
  }
}

/* ================= 宗门（每日委托 + 俸禄） ================= */
function onDayChange(newDay) {
  const sect = state.sect;
  const salary = SECT_SALARY[Math.min(sect.rank, SECT_SALARY.length - 1)];
  if (state.heatWear) {
    state.heatWear = 0;
    log(`子时打坐调息，心火尽褪，炼丹成功率恢复。`);
  }
  const fr = pick(["吉", "平", "平", "凶"]);
  state.fortune = { type: fr, val: fr === "吉" ? -0.03 : fr === "凶" ? 0.03 : 0 };
  log(`今日运势：${fr}${fr === "吉" ? "（炼丹成功率 +3%）" : fr === "凶" ? "（炼丹成功率 -3%）" : ""}。`);
  if (sect.lastDay !== null) {
    const done = !!(sect.dailyTask && sect.dailyTask.done);
    if (done) {
      state.lingshi += salary;
      if (sect.hearts < 3) {
        sect.hearts = Math.min(3, sect.hearts + 1);
        log(`完成委托戴罪立功：宗门信任恢复一颗心（现 ${sect.hearts} 颗）。`);
      }
      log(`每日委托完成，宗门发放俸禄 ${salary} 石。`);
      sfx("coin");
    } else {
      const cut = Math.floor(salary / 2);
      state.lingshi = Math.max(0, state.lingshi + salary - cut);
      sect.hearts = Math.max(0, sect.hearts - 1);
      log(`昨日委托未完成，俸禄扣半，宗门信任 -1（剩 ${sect.hearts} 颗心）。`);
      sfx("fire");
      if (sect.hearts <= 0) showExec();
    }
  }
  const herbs = DAILY_HERBS[Math.min(sect.rank, DAILY_HERBS.length - 1)];
  for (const [k, n] of Object.entries(herbs)) state.materials[k] = (state.materials[k] || 0) + n;
  state.wood.firewood = (state.wood.firewood || 0) + 2;
  log(`宗门每日发放药材：${Object.entries(herbs).map(([k, n]) => `${MATERIALS[k].name}×${n}`).join("、")}，另配发柴薪×2。`);
  sect.dailyTask = genDailyTask(herbs);
  sect.lastDay = newDay;
  renderAll();
  if (sectModalOpen()) renderSectModal();
}

function genDailyTask(herbs) {
  const realm = realmIdx();
  const usable = Object.entries(RECIPES).filter(([k, r]) =>
    state.recipes.includes(k) && Object.keys(r.mats).every(mk => (herbs[mk] || 0) >= r.mats[mk]));
  if (usable.length) {
    // 委托跟随丹师境界：境界越高，越倾向抽取高阶丹方，数量与酬劳同步上调
    const sorted = usable.slice().sort((a, b) => b[1].rank - a[1].rank);
    const poolSize = Math.max(1, Math.min(sorted.length, 2 + Math.floor(realm / 2)));
    const [rk, r] = sorted.slice(0, poolSize)[rand(poolSize)];
    const base = Object.values(r.mats).reduce((a, b) => a + b, 0) <= 4 ? 2 : 1;
    const count = Math.min(3, base + Math.floor(realm / 3));
    return { type: "pill", recipe: rk, quality: null, count, progress: 0, done: false,
      reward: Math.round((r.basePrice * count * 1.2 + 20) * (1 + realm * 0.25)), gong: 10 + count * 5 + realm * 6,
      desc: `炼制并上交 ${r.name}（任意品阶）×${count}` };
  }
  const key = Object.keys(herbs)[0];
  const n = Math.max(2, Math.min(8, (herbs[key] || 0) + Math.floor(realm * 1.5)));
  return { type: "mat", mat: key, count: n, progress: 0, done: false,
    reward: Math.round((MATERIALS[key].price * n * 0.5) * (1 + realm * 0.25)), gong: 6 + n + realm * 4,
    desc: `上交 ${MATERIALS[key].name} ×${n}（宗门配发）` };
}

function ensureDailyInit() {
  const today = gameTimeParts().dayKey;
  if (state.sect.lastDay !== today) onDayChange(today);
}

function completeDaily() {
  const t = state.sect.dailyTask;
  if (!t || t.done || !taskDeliverable(t)) return;
  if (t.type === "pill") takePillsFor(t);
  else state.materials[t.mat] -= t.count;
  t.done = true;
  t.progress = t.count;
  state.lingshi += t.reward || 0;
  state.sect.gongxian += t.gong || 0;
  gainXP(30);
  checkRank();
  log(`宗门委托完成：${t.desc}，得灵石 ${t.reward}、贡献 ${t.gong}。`);
  sfx("coin");
  checkRank();
}

function checkRank() {
  while (state.sect.rank < RANKS.length - 1 && state.sect.gongxian >= RANKS[state.sect.rank + 1].min) {
    state.sect.rank++;
    const bonus = 80 * state.sect.rank;
    state.lingshi += bonus;
    log(`宗门贡献累积，晋升为「${RANKS[state.sect.rank].name}」！赏赐灵石 ${bonus}。`);
    sfx("levelup");
  }
}

function pillCountFor(t) {
  const qs = state.pills[t.recipe] || {};
  if (t.quality) return qs["q" + t.quality] || 0;
  return Object.values(qs).reduce((a, b) => a + b, 0);
}

function takePillsFor(t) {
  if (t.quality) {
    state.pills[t.recipe]["q" + t.quality] -= t.count;
    return;
  }
  let left = t.count;
  for (const qk of ["q1", "q2", "q3", "q4", "q5"]) {   // 优先上交低品阶，高品阶留给玩家
    const qs = state.pills[t.recipe];
    if (!qs[qk]) continue;
    const use = Math.min(qs[qk], left);
    qs[qk] -= use;
    left -= use;
    if (left <= 0) break;
  }
}

function taskDeliverable(t) {
  if (t.type === "pill") return pillCountFor(t) >= t.count;
  if (t.type === "mat") return (state.materials[t.mat] || 0) >= t.count;
  return false;
}

function openSect() {
  $("modal-title").textContent = "宗门";
  $("rate-badge").hidden = true;
  $("modal-mask").hidden = false;
  renderSectModal();
}

function showExec() {
  const ov = $("exec-overlay");
  if (!ov) return;
  ov.hidden = false;
  save();
}

function renderSectModal() {
  const body = $("modal-body");
  const rank = RANKS[state.sect.rank];
  const next = RANKS[state.sect.rank + 1];
  const t = state.sect.dailyTask;
  const salary = SECT_SALARY[Math.min(state.sect.rank, SECT_SALARY.length - 1)];

  const cut = Math.floor(salary / 2);
  const salaryLine = (t && t.done) ? `今日俸禄 ${salary} 石 ✓`
    : t ? `预计俸禄 ${salary - cut} 石（未完成扣 ${cut}）`
    : `每日俸禄 ${salary} 石`;
  let html = `
    <div class="sect-head">
      <div><div class="sect-rank">${rank.name}</div>
      <div class="sect-gong">宗门贡献 ${state.sect.gongxian}${next ? ` · 距「${next.name}」还差 ${next.min - state.sect.gongxian}` : " · 已至巅峰"}</div></div>
      <div class="sect-gong">${salaryLine}<br>宗门信任 ${"♥".repeat(state.sect.hearts)}${"♡".repeat(3 - state.sect.hearts)}<br>${timeText()}</div>
    </div>
    <div class="item-desc" style="margin-bottom:8px">宗门每日发放固定药材并张贴一件委托；当日未完成将扣除一半俸禄并失去一颗信任心——三心尽则执法堂斩立决。</div>`;
  if (!t) {
    html += `<p style="text-align:center;color:var(--ink-soft);padding:20px 0">今日委托尚未张贴。</p>`;
  } else if (t.done) {
    html += `
      <div class="task-item done">
        <span class="task-tag">✔ 已完成</span>
        <div class="item-info"><div class="item-name">${t.desc}</div>
        <div class="item-desc">奖励已发放：灵石 ${t.reward} · 贡献 ${t.gong}</div></div>
      </div>
      <p style="font-size:12px;color:var(--ink-soft);margin-top:10px">明日委托将于灵历跨日时张贴，届时发放俸禄与新药材。</p>`;
  } else {
    const ready = taskDeliverable(t);
    html += `
      <div class="task-item">
        <span class="task-tag">今日委托</span>
        <div class="item-info">
          <div class="item-name">${t.desc}</div>
          <div class="item-desc">奖励 灵石 ${t.reward} · 贡献 ${t.gong} · 当前持有可交付数：${t.type === "pill" ? pillCountFor(t) : (state.materials[t.mat] || 0)}</div>
        </div>
        <button class="buy-btn" id="btn-deliver-daily" ${ready ? "" : "disabled"}>交付</button>
      </div>
      <p style="font-size:12px;color:var(--ink-soft);margin-top:10px">炼制失败会损失药材，可采药或去商店补购；跨日时未完成将扣除一半俸禄。</p>`;
  }
  body.innerHTML = html;
  const db = body.querySelector("#btn-deliver-daily");
  if (db) db.onclick = () => { completeDaily(); renderSectModal(); renderAll(); save(); };
}

/* ================= 丹方管理 ================= */
function openRecipeBook() {
  $("modal-title").textContent = "丹方";
  $("rate-badge").hidden = true;
  $("modal-mask").hidden = false;
  const body = $("modal-body");
  if (!GRADE_ORDER.includes(state.recipeCat)) state.recipeCat = "fan";
  let html = `<div class="shop-layout"><div class="shop-cats">`;
  for (const g of GRADE_ORDER) {
    html += `<button class="shop-cat ${state.recipeCat === g ? "active" : ""}" data-rcat="${g}"><span class="ico">${ICONS.scroll}</span>${GRADE_DEF[g].name}</button>`;
  }
  html += `</div><div class="shop-grid">` + renderRecipeCards(state.recipeCat) + `</div></div>`;
  body.innerHTML = html;
  body.querySelectorAll("[data-rcat]").forEach(b => b.onclick = () => {
    state.recipeCat = b.dataset.rcat;
    sfx("click");
    openRecipeBook(); save();
  });
}

function renderRecipeCards(grade) {
  let html = "";
  const group = Object.entries(RECIPES).filter(([k, r]) => r.grade === grade);
  if (!group.length) return `<p style="grid-column:1/-1;text-align:center;color:var(--ink-soft);padding:30px 0">该品级暂无丹方。</p>`;
  for (const [key, r] of group) {
    const known = state.recipes.includes(key);
    const matsText = Object.entries(r.mats).map(([k, n]) => `${MATERIALS[k].ico}${MATERIALS[k].name}×${n}`).join("、");
    html += `
      <div class="shop-card">
        <div class="card-head"><span class="ico">${known ? ICONS.scroll : ICONS.unknown}</span><span class="card-name">${rankCN(r.rank)}阶·${r.name}</span></div>
        <div class="card-attr">${GRADE_DEF[r.grade].name} · 集市底价 ${r.basePrice} 石</div>
        <div class="card-desc">${r.desc}<br>药材：${matsText} · 约需 ${r.time} 秒</div>
        <div class="card-foot"><span class="price">${known ? "已习得 ✓" : "未习得"}</span><span class="load-count">${known ? "" : "去商店研习"}</span></div>
      </div>`;
  }
  return html;
}

/* ================= 弹窗通用 ================= */
function openModal(title, showRate) {
  $("modal-title").textContent = title;
  const badge = $("rate-badge");
  badge.hidden = !showRate;
  if (showRate) badge.textContent = `行情 ×${state.marketRate.toFixed(2)}`;
  $("modal-mask").hidden = false;
}
function closeModal() { $("modal-mask").hidden = true; }

/* ---- 商店 ---- */
function openShop() {
  openModal("商店", false);
  const body = $("modal-body");
  const cats = [
    { key: "herb", name: "草药", ico: ICONS.lingcao },
    { key: "recipe", name: "丹方", ico: ICONS.scroll },
    { key: "furnace", name: "丹炉", ico: ICONS.cauldron },
    { key: "item", name: "道具", ico: ICONS.talisman },
  ];
  if (!cats.some(c => c.key === state.shopCat)) state.shopCat = "herb";
  let html = `<div class="shop-layout"><div class="shop-cats">`;
  for (const c of cats) {
    html += `<button class="shop-cat ${state.shopCat === c.key ? "active" : ""}" data-cat="${c.key}"><span class="ico">${c.ico}</span>${c.name}</button>`;
  }
  html += `</div><div class="shop-grid">` + renderShopCards(state.shopCat) + `</div></div>`;
  body.innerHTML = html;
  body.querySelectorAll("[data-cat]").forEach(b => b.onclick = () => {
    state.shopCat = b.dataset.cat;
    sfx("click");
    openShop(); save();
  });
  body.querySelectorAll(".shop-card.expander").forEach(card => card.addEventListener("click", (e) => {
    if (e.target.closest("button")) return;
    const detail = card.querySelector(".card-detail");
    const hint = card.querySelector(".detail-hint");
    if (!detail) return;
    detail.hidden = !detail.hidden;
    if (hint) hint.textContent = detail.hidden ? " ▸ 点击查看药材配方" : " ▾ 收起";
  }));
  bindShopActions(body);
}

function shopCard(ico, name, attr, desc, price, btnHtml) {
  return `
    <div class="shop-card">
      <div class="card-head"><span class="ico">${ico}</span><span class="card-name">${name}</span></div>
      <div class="card-attr">${attr}</div>
      <div class="card-desc">${desc}</div>
      <div class="card-foot"><span class="price">${price} 石</span>${btnHtml}</div>
    </div>`;
}

function renderShopCards(cat) {
  let html = "";
  if (cat === "herb") {
    for (const [key, m] of Object.entries(MATERIALS)) {
      html += shopCard(ICONS[key] || "", m.name, m.attr, m.desc, m.price, `<button class="buy-btn" data-buy-mat="${key}">购买</button>`);
    }
  } else if (cat === "recipe") {
    for (const [key, cfg] of Object.entries(SHOP_RECIPES)) {
      const known = state.recipes.includes(key);
      const r = RECIPES[key];
      const matsText = Object.entries(r.mats).map(([k, n]) => `${MATERIALS[k].ico}${MATERIALS[k].name}×${n}`).join("、");
      html += `
        <div class="shop-card expander" data-exp="recipe|${key}">
          <div class="card-head"><span class="ico">${ICONS.scroll}</span><span class="card-name">${r.name}</span></div>
          <div class="card-attr">${rankCN(r.rank)}阶 · ${GRADE_DEF[r.grade].name} · 约需 ${r.time} 秒</div>
          <div class="card-desc">${r.desc}<span class="detail-hint"> ▸ 点击查看药材配方</span></div>
          <div class="card-detail" hidden>
            <div class="detail-line">药材：${matsText}</div>
            <div class="detail-line">集市底价 ${r.basePrice} 石 · 炼制约需 ${r.time} 秒</div>
          </div>
          <div class="card-foot"><span class="price">${cfg.cost} 石</span><button class="buy-btn" data-buy-recipe="${key}" ${known ? "disabled" : ""}>${known ? "已习得" : "研习"}</button></div>
        </div>`;
    }
  } else if (cat === "furnace") {
    for (const up of FURNACE_UPGRADES) {
      const owned = state.furnaceLevel >= up.level;
      html += shopCard("⚱️", `丹炉升级 · ${up.name}`, `炉级 ${up.level}`, up.desc, up.cost,
        `<button class="buy-btn" data-buy-furnace="${up.level}" ${owned ? "disabled" : ""}>${owned ? "已拥有" : "购置"}</button>`);
    }
  } else {
    html += shopCard(ICONS.firewood, "柴薪", "燃料 · 常见", "寻常火候，无额外加成。每次点火消耗一根。", 8, `<button class="buy-btn" data-buy-wood="firewood">购买</button>`);
    html += shopCard(ICONS.spiritwood, "灵木", "燃料 · 稀有", "灵气充沛：炼丹成功率 +8%，二品/三品直接产出概率提升 50%。每次点火消耗一根。", 60, `<button class="buy-btn" data-buy-wood="spiritwood">购买</button>`);
    html += shopCard(ICONS.talisman, "自动采药符", "符箓 · 持续生效", "每 6 秒自动采得一株材料，离线也会持续采药（不推进灵历，上限 2 小时）。", 500,
      `<button class="buy-btn" data-buy-auto="1" ${state.autoGather ? "disabled" : ""}>${state.autoGather ? "生效中" : "购买"}</button>`);
  }
  return html;
}

/* 炼丹异象事件（点火后随机触发，炼制结束未抉择则自动作罢） */
const EVENT_DEF = {
  pet: { name: "小狸扒炉", desc: "小狸扒着炉口，眼巴巴地想要丹药……",
    opts: [
      { label: "递它一颗丹药（消耗任意丹药×1）", can: () => Object.values(state.pills).some(qs => Object.values(qs).some(n => n > 0)), fn: () => { for (const qs of Object.values(state.pills)) { for (const s of ["q1", "q2", "q3", "q4", "q5"]) { if (qs[s] > 0) { qs[s]--; state.burning.tierBoost = (state.burning.tierBoost || 1) * 1.3; log("小狸满足地叼走一枚丹药：本次高品级产出提升！"); return; } } } } },
      { label: "轻轻抱开小狸", fn: () => log("小狸悻悻走开，炉火如常。") },
    ] },
  demon: { name: "心魔低语", desc: "炼制中耳畔响起低语，心神不宁……",
    opts: [
      { label: "凝神静心（幸运 -3）", fn: () => { state.luck = Math.max(0, (state.luck || 0) - 3); state.burning.failDelta = (state.burning.failDelta || 0) - 0.05; log("凝神静心：本次成功率 +5%，幸运 -3。"); } },
      { label: "不为所动", fn: () => { state.burning.failDelta = (state.burning.failDelta || 0) + 0.06; log("不为所动：本次成功率 -6%。"); } },
    ] },
  rain: { name: "雷雨骤至", desc: "雷雨骤至，炉火摇曳欲熄……",
    opts: [
      { label: "添柴护火（柴薪 -1）", can: () => (state.wood.firewood || 0) > 0, fn: () => { state.wood.firewood--; log("添柴护火：炉火重新稳住。"); } },
      { label: "听天由命", fn: () => { state.burning.failDelta = (state.burning.failDelta || 0) + 0.06; log("听天由命：本次成功率 -6%。"); } },
    ] },
};

function renderEvent() {
  const box = $("event-box");
  if (!box) return;
  const ev = state.event;
  if (!ev || ev.resolved || !state.burning) { box.hidden = true; return; }
  const def = EVENT_DEF[ev.kind];
  if (!def) { box.hidden = true; return; }
  box.hidden = false;
  box.innerHTML = `<div class="ev-title">${def.name}</div><div class="ev-desc">${def.desc}</div><div class="ev-opts">${def.opts.map((o, i) => {
    const ok = !o.can || o.can();
    return `<button class="buy-btn ev-btn" data-evopt="${i}" ${ok ? "" : "disabled"}>${o.label}</button>`;
  }).join("")}</div>`;
  box.querySelectorAll("[data-evopt]").forEach(b => b.onclick = () => {
    const o = def.opts[+b.dataset.evopt];
    if (o.can && !o.can()) return;
    o.fn();
    state.event.resolved = true;
    renderEvent(); renderAll(); save();
  });
}

function bindShopActions(body) {
  body.querySelectorAll("[data-buy-mat]").forEach(b => b.onclick = () => {
    const k = b.dataset.buyMat;
    if (state.lingshi < MATERIALS[k].price) return log("灵石不足。");
    state.lingshi -= MATERIALS[k].price;
    state.materials[k]++;

    sfx("coin");
    log(`购得${MATERIALS[k].name}一株。`);
    openShop(); renderAll(); save();
  });
  body.querySelectorAll("[data-buy-recipe]").forEach(b => b.onclick = () => {
    const k = b.dataset.buyRecipe;
    if (state.lingshi < SHOP_RECIPES[k].cost) return log("灵石不足。");
    state.lingshi -= SHOP_RECIPES[k].cost;
    state.recipes.push(k);
    sfx("levelup");
    log(`习得丹方「${RECIPES[k].name}」！`);
    openShop(); renderAll(); save();
  });
  body.querySelectorAll("[data-buy-furnace]").forEach(b => b.onclick = () => {
    const lv = +b.dataset.buyFurnace;
    const up = FURNACE_UPGRADES.find(u => u.level === lv);
    if (state.lingshi < up.cost) return log("灵石不足。");
    state.lingshi -= up.cost;
    state.furnaceLevel = lv;
    sfx("levelup");
    log(`丹炉已换成${up.name}！`);
    openShop(); renderAll(); save();
  });
  body.querySelectorAll("[data-buy-wood]").forEach(b => b.onclick = () => {
    const k = b.dataset.buyWood;
    const price = k === "spiritwood" ? 60 : 8;
    if (state.lingshi < price) return log("灵石不足。");
    state.lingshi -= price;
    state.wood[k] = (state.wood[k] || 0) + 1;
    sfx("coin");
    log(`购得${WOOD_DEF[k].name}一根。`);
    openShop(); renderAll(); save();
  });
  const auto = body.querySelector("[data-buy-auto]");
  if (auto) auto.onclick = () => {
    if (state.lingshi < 500) return log("灵石不足。");
    state.lingshi -= 500;
    state.autoGather = true;
    lastAutoTs = 0;
    sfx("levelup");
    log("自动采药符生效，从此灵草不愁。");
    openShop(); renderAll(); save();
  };
}

/* ---- 集市 ---- */
function sellPrice(key, q) {
  return Math.max(1, Math.round(RECIPES[key].basePrice * QUALITIES[q - 1].mult * 0.8 * state.marketRate * buffMult("market")));
}

function sellSlotPrice(key, slot) {
  if (slot.startsWith("q")) return sellPrice(key, +slot.slice(1));
  return Math.max(1, Math.round(RECIPES[key].basePrice * TIER_DEF[slot].sellMult * state.marketRate * buffMult("market")));
}

function openMarket() {
  openModal("集市", true);
  const body = $("modal-body");
  let html = "";
  let hasPill = false;
  for (const [key, qs] of Object.entries(state.pills)) {
    if (!RECIPES[key]) continue;
    const gPre = GRADE_DEF[RECIPES[key].grade].name.slice(0, 1);
    for (const [slot, count] of Object.entries(qs)) {
      if (!count) continue;
      hasPill = true;
      const price = sellSlotPrice(key, slot);
      const label = slot.startsWith("q") ? `${QUALITIES[+slot.slice(1) - 1].name} · ${RECIPES[key].name}` : `${TIER_DEF[slot].name} · ${RECIPES[key].name}`;
      html += `
        <div class="market-item">
          <span class="ico">${pillIcon(slot, (RECIPES[key] || {}).rank)}</span>
          <div class="item-info">
            <div class="item-name">${gPre}·${label} <small style="color:var(--ink-soft)">×${count}</small></div>
            <div class="item-desc">${RECIPES[key].desc}</div>
          </div>
          <span class="price">${price} 石/枚</span>
          <button class="sell-btn" data-sell="${key}|${slot}">卖一枚</button>
        </div>`;
    }
  }
  if (!hasPill) html = `<p style="text-align:center;color:var(--ink-soft);padding:30px 0">囊中无丹，先去开炉炼上几炉吧。</p>`;
  body.innerHTML = html;
  body.querySelectorAll("[data-sell]").forEach(b => b.onclick = () => {
    const [key, slot] = b.dataset.sell.split("|");
    const price = sellSlotPrice(key, slot);
    state.pills[key][slot]--;
    state.lingshi += price;
    state.stats.earned += price;
    sfx("coin");
    log(`${slot.startsWith("q") ? QUALITIES[+slot.slice(1) - 1].name : TIER_DEF[slot].name}·${RECIPES[key].name}售出，得 ${price} 灵石。`);
    openMarket(); renderAll(); save();
  });
}

/* ---- 仓库 ---- */
function openWarehouse() {
  openModal("仓库", false);
  const body = $("modal-body");
  let html = `<div class="ware-grid">`;
  for (const [key, m] of Object.entries(MATERIALS)) {
    const n = state.materials[key] || 0;
    html += `<div class="ware-cell ${n ? "" : "none"}"><span class="ico">${ICONS[key] || ""}</span><div class="nm">${m.name}</div><b>${n}</b></div>`;
  }
  html += `<div class="ware-cell ${(state.wood.firewood || 0) ? "" : "none"}"><span class="ico">${ICONS.firewood}</span><div class="nm">柴薪</div><b>${state.wood.firewood || 0}</b></div>`;
  html += `<div class="ware-cell ${(state.wood.spiritwood || 0) ? "" : "none"}"><span class="ico">${ICONS.spiritwood}</span><div class="nm">灵木</div><b>${state.wood.spiritwood || 0}</b></div>`;
  for (const [key, qs] of Object.entries(state.pills)) {
    if (!RECIPES[key]) continue;
    const rName = RECIPES[key].name;
    const gPre = GRADE_DEF[RECIPES[key].grade].name.slice(0, 1);
    for (const [slot, count] of Object.entries(qs)) {
      if (!count) continue;
      const label = slot.startsWith("q") ? QUALITIES[+slot.slice(1) - 1].name + "·" + rName : TIER_DEF[slot].name + "·" + rName;
      html += `<div class="ware-cell"><span class="ico">${pillIcon(slot, (RECIPES[key] || {}).rank)}</span><div class="nm">${gPre}·${label}</div><b>${count}</b><button class="buy-btn eat-btn" data-eat="${key}|${slot}" title="服用：消耗一枚，提升幸运值">服用</button></div>`;
    }
  }
  for (const [k, n] of Object.entries(state.furnaceLoad)) {
    if (!n) continue;
    html += `<div class="ware-cell" style="border-style:dashed"><span class="ico">${ICONS[k] || ""}</span><div class="nm">炉中·${MATERIALS[k].name}</div><b>${n}</b></div>`;
  }
  html += `</div>`;
  for (const [key, qs] of Object.entries(state.pills)) {
    const total = ["q1", "q2", "q3", "q4", "q5"].reduce((a, s) => a + (qs[s] || 0), 0);
    const t2 = qs.t2 || 0;
    if (total < 3 && t2 < 2) continue;
    html += `<div class="condense-row"><span class="ico">${ICONS.condense}</span>
      <div class="item-info"><div class="item-name">${RECIPES[key].name} 凝练</div>
      <div class="item-desc">一品×3 → 二品 · 二品×2 → 三品（品级越高售价与幸运加成越高）</div></div>
      ${total >= 3 ? `<button class="buy-btn" data-condense="${key}|t2">凝练为二品</button>` : ""}
      ${t2 >= 2 ? `<button class="buy-btn" data-condense="${key}|t3">凝练为三品</button>` : ""}
    </div>`;
  }
  body.innerHTML = html;
  body.querySelectorAll("[data-eat]").forEach(b => b.onclick = () => {
    const [key, slot] = b.dataset.eat.split("|");
    eatPill(key, slot);
  });
  body.querySelectorAll("[data-condense]").forEach(b => b.onclick = () => {
    const [key, tier] = b.dataset.condense.split("|");
    condenseTier(key, tier);
  });
}

function eatPill(key, slot) {
  const qs = state.pills[key];
  if (!qs || !(qs[slot] > 0)) return;
  qs[slot]--;
  let gain, name;
  if (slot.startsWith("q")) {
    const q = +slot.slice(1);
    gain = QUALITIES[q - 1].luckGain;
    name = QUALITIES[q - 1].name + "·" + RECIPES[key].name;
  } else {
    const td = TIER_DEF[slot];
    gain = td.luckGain;
    name = td.name + "·" + RECIPES[key].name;
  }
  state.luck = (state.luck || 0) + gain;
  log(`服下${name}，幸运 +${gain}（当前 ${state.luck}）。`);
  const bd = PILL_BUFF[key];
  if (bd) {
    const tm = slot === "t3" ? 2 : slot === "t2" ? 1.5 : 1;
    if (bd.type === "clearheat") {
      state.heatWear = 0;
      log(`药力行开：「${bd.name}」——心火尽褪，炼丹成功率恢复。`);
    } else {
      const until = state.gameTime + Math.round(bd.hours * 10 * tm);
      state.buffs = (state.buffs || []).filter(b => b.type !== bd.type);
      state.buffs.push({ type: bd.type, mult: bd.mult || 1, val: bd.val || 0, until, name: bd.name });
      log(`药力行开：「${bd.name}」持续 ${Math.round(bd.hours * tm)} 时辰——${bd.desc}。`);
    }
  }
  sfx("levelup");
  openWarehouse(); renderAll(); save();
}

function condenseTier(key, tier) {
  const qs = state.pills[key];
  if (!qs) return;
  if (tier === "t2") {
    const total = ["q1", "q2", "q3", "q4", "q5"].reduce((a, s) => a + (qs[s] || 0), 0);
    if (total < 3) return log("一品丹不足 3 枚，无法凝练。");
    let left = 3;
    for (const s of ["q1", "q2", "q3", "q4", "q5"]) {
      if (!qs[s]) continue;
      const use = Math.min(qs[s], left);
      qs[s] -= use;
      left -= use;
      if (!left) break;
    }
    qs.t2 = (qs.t2 || 0) + 1;
    log(`凝练功成：${RECIPES[key].name} 升为二品！`);
  } else {
    if (!(qs.t2 >= 2)) return log("二品丹不足 2 枚，无法凝练。");
    qs.t2 -= 2;
    qs.t3 = (qs.t3 || 0) + 1;
    log(`凝练功成：${RECIPES[key].name} 升为三品！`);
  }
  sfx("levelup");
  openWarehouse(); renderAll(); save();
}


/* ================= 离线收益 ================= */
function offlineGains() {
  if (!state.autoGather) return;
  const awaySec = Math.min((Date.now() - (state.lastSeen || Date.now())) / 1000, 7200);
  const n = Math.floor(awaySec / 6);
  if (n <= 0) return;
  const got = {};
  for (let i = 0; i < n; i++) {
    const k = gatherMaterial(true, true);   // 离线采药不推进灵历
    got[k] = (got[k] || 0) + 1;
  }
  const detail = Object.entries(got).map(([k, c]) => `${MATERIALS[k].name}×${c}`).join("、");
  log(`离开期间自动采药符生效，小狸替你采得：${detail}。`);
}

/* ================= 主循环 ================= */
let lastAutoTs = 0;

setInterval(() => {
  if (state.burning) {
    state.burning.left -= 1;
    if (state.burning.left <= 0) finishRefine();
    else {
      renderRefine();
      if (furnaceModalOpen()) renderFurnaceModal();
    }
  }
  if (state.autoGather) {
    if (!lastAutoTs) lastAutoTs = performance.now();
    if (performance.now() - lastAutoTs >= 6000) {
      lastAutoTs = performance.now();
      gatherMaterial();
      renderAll();
    }
  }
  if (Math.random() < 0.02) petTick();
  save();
}, 1000);

setInterval(() => {
  state.marketRate = 0.85 + Math.random() * 0.3;
}, 30000);

/* ================= 事件绑定 ================= */
$("furnace").onclick = () => {
  if (state.burning) fanFire();
  else openFurnace();
};
$("furnace-top").onclick = () => collectFurnaceTop(false);
$("firepit").onclick = (e) => {
  e.stopPropagation();               // 防止冒泡触发丹炉自身的弹窗逻辑
  if (state.burning) return;
  if (state.furnaceStage === "loaded") openWoodSelect();
  else log("先点丹炉备好药材，再来挑柴。");
};
$("btn-gather").onclick = (e) => {
  const btn = e.currentTarget;
  btn.disabled = true;
  setTimeout(() => { btn.disabled = false; }, 400);
  gatherMaterial();
  sfx("click");
  renderAll(); save();
};


$("btn-sect").onclick = openSect;
$("btn-sect-open").onclick = openSect;
$("btn-recipe").onclick = openRecipeBook;
$("btn-shop").onclick = openShop;
$("btn-market").onclick = openMarket;
$("btn-warehouse").onclick = openWarehouse;
$("modal-close").onclick = closeModal;
$("modal-mask").onclick = (e) => { if (e.target === $("modal-mask")) closeModal(); };
const avatarEl = document.querySelector(".avatar-box");
if (avatarEl) avatarEl.onclick = openProfile;
$("btn-settings").onclick = openSettings;
$("help-close").onclick = () => { $("help-mask").hidden = true; };
$("help-mask").onclick = (e) => { if (e.target === $("help-mask")) $("help-mask").hidden = true; };
$("btn-reborn").onclick = () => {
  localStorage.removeItem(SAVE_KEY);
  state = defaultState();
  lastAutoTs = 0;
  ensureDailyInit();
  $("exec-overlay").hidden = true;
  renderAll();
  log(`转世重修，前尘尽忘——新的丹师生涯开始了。`);
  save();
};

/* ================= 丹宠拖拽 ================= */
function applyPetPos() {
  const zone = $("pet-zone");
  if (!zone || !state.petPos) return;
  zone.style.position = "fixed";
  zone.style.left = (state.petPos.x * window.innerWidth) + "px";
  zone.style.top = (state.petPos.y * window.innerHeight) + "px";
  zone.style.bottom = "auto";
}

(function initPetDrag() {
  const zone = $("pet-zone");
  if (!zone) return;
  let dragging = false, moved = false, sx = 0, sy = 0, ox = 0, oy = 0;
  zone.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    dragging = true;
    moved = false;
    sx = e.clientX;
    sy = e.clientY;
    const r = zone.getBoundingClientRect();
    ox = r.left;
    oy = r.top;
    try { zone.setPointerCapture(e.pointerId); } catch (err) { /* 忽略 */ }
  });
  zone.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    if (!moved && Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy) <= 6) return;
    moved = true;
    const w = zone.offsetWidth, h = zone.offsetHeight;
    const x = Math.max(6, Math.min(window.innerWidth - w - 6, ox + (e.clientX - sx)));
    const y = Math.max(64, Math.min(window.innerHeight - h - 6, oy + (e.clientY - sy)));
    zone.style.position = "fixed";
    zone.style.left = x + "px";
    zone.style.top = y + "px";
    zone.style.bottom = "auto";
  });
  zone.addEventListener("pointerup", (e) => {
    if (!dragging) return;
    dragging = false;
    if (moved) {
      state.petPos = {
        x: parseFloat(zone.style.left) / window.innerWidth,
        y: parseFloat(zone.style.top) / window.innerHeight,
      };
      save();
    } else {
      pokePet(e);
    }
  });
  zone.addEventListener("pointercancel", () => { dragging = false; });
})();

/* ================= 启动 ================= */
offlineGains();
ensureDailyInit();
applyPetPos();
renderAll();
log(`欢迎回到炼了个丹，${state.pet.name}已就位。`);