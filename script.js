import { importModule } from 'https://uupaa.github.io/dynamic-import-polyfill/importModule.js';
import currentDay from './day07.js';

// currentDay();

const days = 7;
const main = document.querySelector("main");
const output = document.querySelector('aside pre code');

async function loadDay(e) {
  e.preventDefault();
  // dynamic import is not supported in Firefox
  // const module = await import(`./day${this.dataset.day}.js`);
  output.innerHTML = 'Running...';
  
  const module = await importModule(`./day${this.dataset.day}.js`);
  const result = await module.default();
  output.innerHTML = JSON.stringify(result, null, 2);
}

[...Array(days).keys()].map(day => {
  const dayLink = document.createElement('a');
  dayLink.innerHTML = `Day ${day + 1}`;
  dayLink.setAttribute('href', '#');
  dayLink.setAttribute('data-day', (day + 1).toString().padStart(2, '0'));
  dayLink.addEventListener('click', loadDay);
  main.appendChild(dayLink);
});
