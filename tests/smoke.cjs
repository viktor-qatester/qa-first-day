const fs = require('node:fs');
const vm = require('node:vm');

const html = fs.readFileSync('dist/index.html', 'utf8');
const concept = fs.readFileSync('dist/concept.html', 'utf8');
const required = [
  'Сборка готова к тестированию',
  'Проверка настройки NEW10',
  'Правильно ли рассчитана скидка?',
  'DevTools открываем заранее',
  'MS SQL Server',
  'Допустимы разные варианты записи запроса',
  'SELECT TOP 10 id, user_id, total, status, order_date',
  'Swagger · Контракт API',
  'Условия воспроизведения совпали',
  '13:10 · Ретест',
  'Короткий регресс',
  'Смена завершена'
];

for (const marker of required) {
  if (!html.includes(marker)) throw new Error(`Не найден обязательный элемент: ${marker}`);
}

for (const forbidden of ['Есть ли здесь дефект?', 'SELECT * FROM orders', '<i>○</i>']) {
  if (html.includes(forbidden)) throw new Error(`Осталась устаревшая формулировка: ${forbidden}`);
}

const script = html.match(/<script>([\s\S]*)<\/script>/);
if (!script) throw new Error('Не найден JavaScript приложения');
new vm.Script(script[1]);

const stepMatches = html.match(/=>shell\(/g) || [];
if (stepMatches.length < 25) {
  throw new Error(`Ожидалось не менее 25 экранов, найдено ${stepMatches.length}`);
}

console.log(`Smoke OK: методические исправления найдены, экранов ${stepMatches.length + 1}`);

if (!html.includes('доступен только до закрытия вкладки')) {
  throw new Error('Основной сценарий не предупреждает о несохранённом прогрессе при недоступном localStorage');
}

const conceptRequired = [
  'Новый интерфейс · этап 1',
  'SP-214',
  'Командный чат',
  'data-tool="devtools"',
  'data-tool="sql"',
  'type="checkbox" name="plan"',
  'data-tool="promo"',
  'data-discount="4"',
  'qa-first-day-workspace-v1',
  'qa-first-day-v2-before-workspace',
  'index.html?resume=1',
  'id="continueShift"',
  'aria-live="polite"',
  '@media(max-width:560px)',
  'overflow:hidden;text-overflow:ellipsis'
];
for (const marker of conceptRequired) {
  if (!concept.includes(marker)) throw new Error(`В прототипе отсутствует: ${marker}`);
}
const conceptScript = concept.match(/<script>([\s\S]*)<\/script>/);
if (!conceptScript) throw new Error('Не найден JavaScript дизайн-прототипа');
new vm.Script(conceptScript[1]);
console.log('Concept smoke OK: рабочий стол и мобильная адаптация найдены');

for (const validationMarker of ['validTitle', 'validActual', 'validExpected', 'Проверь содержание']) {
  if (!html.includes(validationMarker)) throw new Error(`Нет содержательной проверки баг-репорта: ${validationMarker}`);
}
console.log('Report validation smoke OK: бессмысленный текст не проходит только по длине');

for (const sqlMarker of ['query.match(/^select\\s+top', "new Set(['id','user_id','total','status','order_date'])", "every(x=>fields.includes(x))", 'SELECT *']) {
  if (!html.includes(sqlMarker)) throw new Error(`Нет проверки смысла и безопасности SQL: ${sqlMarker}`);
}
console.log('SQL smoke OK: ограничение, таблица, фильтр и обязательные поля проверяются отдельно от форматирования');
