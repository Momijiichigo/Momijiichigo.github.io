
import anime from 'animejs/lib/anime.es.js';
import { WindowSystem } from './windowSystem';
//window.WindowSystem will be commented out when it becomes product
window.WindowSystem = WindowSystem;
window.WS = window.WindowSystem;
WindowSystem.away = true;



//document.body.addEventListener('touchmove',e=>e.preventDefault(),false)
//window.nativeOpen = window.open;

let a1 = WindowSystem.add();
WindowSystem.add();
//console.log('index of the win is ', WindowSystem.windowList.indexOf(a1));
let aa = document.createElement('div')
aa.classList.add('testing')
aa.onclick = ()=> WindowSystem.listView=1;
aa.innerText = 'cfghejkdnbhs\nvgjckanbdsjwb\nhsdsjk'
WindowSystem.add(aa);

//open('https://hakqlo.github.io')

//setInterval(()=>console.log(WindowSystem.scrollLength),100)