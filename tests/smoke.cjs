const fs = require('node:fs');
const vm = require('node:vm');

const html = fs.readFileSync('dist/index.html', 'utf8');
const required = [
  'Сборка готова к тестированию',
  'Проверка настройки NEW10',
  'Правильно ли рассчитана скидка?',
  'DevTools открываем заранее',
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
