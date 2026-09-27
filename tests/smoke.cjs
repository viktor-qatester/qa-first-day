const fs = require('node:fs');
const vm = require('node:vm');

const html = fs.readFileSync('dist/index.html', 'utf8');
const required = [
  'Первый день QA',
  'Как к тебе обращаться?',
  'DevTools · Network',
  'Учебная SQL-консоль',
  'API-проверка',
  'Учебная Jira',
  'Смена завершена',
  'anna-qa-mentor.webp'
];

for (const marker of required) {
  if (!html.includes(marker)) throw new Error(`Не найден обязательный элемент: ${marker}`);
}

if (!fs.existsSync('dist/anna-qa-mentor.webp')) {
  throw new Error('Не найдено изображение наставника');
}

const script = html.match(/<script>([\s\S]*)<\/script>/);
if (!script) throw new Error('Не найден JavaScript приложения');
new vm.Script(script[1]);

const stepMatches = html.match(/=>shell\(/g) || [];
if (stepMatches.length < 20) {
  throw new Error(`Ожидалось не менее 20 экранов, найдено ${stepMatches.length}`);
}

console.log(`Smoke OK: обязательные элементы найдены, экранов ${stepMatches.length}`);

