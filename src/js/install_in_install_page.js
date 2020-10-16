import "./baseFunctions";
import { mouse, ios, safari } from 'platform-detect'
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import anime from 'animejs/lib/anime.es.js';
//import '../node_modules/dialog-polyfill/dist/dialog-polyfill.css';
import '../css/main.scss';
import '../css/main_in_install_page.scss';
/*
this file name is so wierd btw
lmao
I was struggling naming this file 

this script is for doing main task in install.html,

install.js is for interacting with service worker 
and which is called everytime in index.html
*/

/*background animation*/
const canvas = document.querySelector('canvas');
const fitCanvasToScreen = () =>{
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
}
fitCanvasToScreen();
window.addEventListener('resize',e=>{
  fitCanvasToScreen();
  drawMain();
})
const ctx = canvas.getContext('2d');
let backGradVectorYPos = {
  vStart: 0,
  vEnd: canvas.height*3,
};
let animateStarted = false;
const drawMain = () =>{
  ctx.beginPath();
  const backgroundGradient = ctx.createLinearGradient(0,backGradVectorYPos.vStart, canvas.width,backGradVectorYPos.vEnd);
  backgroundGradient.addColorStop(0, 'black');
  backgroundGradient.addColorStop(1/3, 'rgb(10, 15, 85)');
  backgroundGradient.addColorStop(2/3, 'rgb(18, 104, 218)');
  backgroundGradient.addColorStop(1, 'rgb(207, 106, 156)');
  ctx.fillStyle = backgroundGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.closePath();
}
const maxParticleRad = 4;
class BackAnimatingParticle{
  constructor(){
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height;
    this.radius = Math.random()*maxParticleRad+1;
    this.color = `rgba(255, 255, 255, ${(1-this.radius/maxParticleRad)**1.6})`;
    const v = this.radius*0.4;
    this.xVel = v*Math.random()*0.5;
    this.yVel = v*Math.random()*0.5+0.5;
  }
  
  draw(){
    //const v = this.radius*0.5;
    this.x -= this.xVel;
    this.y -= this.yVel;
    if(this.x<=-this.radius)this.x=canvas.width+this.radius;
    if(this.y<=-this.radius)this.y=canvas.height+this.radius;
    //ctx.filter = `blur(${this.radius*0.3}px)`
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
    ctx.fill();
    ctx.filter = 'none';
    ctx.closePath();
    
  }
}
drawMain();
let particleList = [];
const animateAllParticles = ()=>{
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawMain();
  particleList.forEach(v=>v.draw());
  
  requestAnimationFrame(animateAllParticles);
}

for(let i=0;i<80;i++){
  particleList.push(new BackAnimatingParticle());
}
window.onappinstalled=()=>location.href="./index.html";
//console.log(require('../icon/ios-safari-share-icon.svg'));
//console.log('test');
requestAnimationFrame(animateAllParticles);
const animateStart = () =>{
  if(animateStarted)return 0;
  document.body.classList.add('install_pressed');
  animateStarted=true;
  
  anime({
    targets: backGradVectorYPos,
    duration: 1500,
    //round: 1,
    vStart: [0,-canvas.height*2],
    vEnd: [canvas.height*3,canvas.height],
    easing: 'easeInOutSine',
  })
}
const installButton = document.querySelector("#install_button");
const pwaNotSupported = () =>{
  installButton.remove();
  popup('browser not supported',[
    'sorry, your browser does not support PWA',
    'Here is a tip:',
    'use Safari on IOS device',
    'If you are using Android, Chrome is recommended browser.',
    'make sure that you are using newer version of OS.'
  ],{'OK':'ok','go to home':'goHome'}).then(r=>{
    r==='goHome'&& (location.href = 'https://hakqlo.github.io/dist/');
  })
}
let installApp = () =>{
  if(mouse){
    popup('PC version unavailable','Sorry, we are still in development on the PC version')
    installButton.remove();
  }else if ('serviceWorker' in navigator) {
    console.log('sw supported');
    //navigator.serviceWorker.register('./sw.js')
    runtime.register().then(function() {
      console.log('succeeded');
      
      //location.href+="/pwa.html";
    }).catch(function(err) {
      console.log('error:', err);
    });
    //make an install button (or installPWA function for terminal maybe?)
    
    //installButton.innerText = "install";
    //document.body.appendChild(installButton);
    //showInstallPrompt is a function 
    /*installButton.addEventListener('click', () => {
      
      animateStarted || animateStart();
      
    });*/
    if ("onbeforeinstallprompt" in window) {
      window.addEventListener("beforeinstallprompt", e => {
        e.preventDefault();
        installButton.addEventListener('click', () => {
          popup('havig a problem?','',{'OK':'ok', 'look for solution': 'problem'})
          .then(v=>{
            if(v==='problem')popup('Try the following:', ['If you are using In-App browser, try opening the site with browser app.','chrome is recommended browser.'])
          }).catch(e => console.warn(e))
          e.prompt().then(r=>console.log(r));
          e.userChoice.then(r=>{
            console.log(r);
            if(r.outcome==='accepted')animateStart();
            else installButton.remove();
          });
          
        })
      })
    } else if (ios&&safari) {
      //show a prompt exaplaining how to install(in IOS safari)
      console.log('ios safari');
      installButton.addEventListener('click', () => {
        animateStart();
        popup("Install", [
          "You can install Hakqlo App by adding this website to your home screen.",
          createElementFromHTML(`
            <ol>
            <li> Tap the <div style='background-color: rgba(56, 172, 255, 0.91);
            -webkit-mask: url(${require('../icon/ios-safari-share-icon.svg').default}) no-repeat center;
            mask: url(${require('../icon/ios-safari-share-icon.svg').default}) no-repeat center;width: 28px;
            height: 28px;'></div> icon at the bottom of your browser</li>
            <li> Choose <div style='background-color: white;
            -webkit-mask: url(${require('../icon/ios-safari-add-to-home-icon.svg').default}) no-repeat center;
            mask: url(${require('../icon/ios-safari-add-to-home-icon.svg').default}) no-repeat center;width: 28px;
            height: 28px;'></div> 'Add to Home Screen'.</li></ol>
          `)
        ],{'OK':'ok', 'getting a problem?': 'problem'})
        .then(v=>{
          if(v==='problem')popup('Try the following:', 'If you are not using Safari, try to use safari.')
        })
        .catch(e => console.warn(e))
      })
      /*

      popup("インストール",[
          "ホーム画面に追加することでインストールが出来ます。",
          createElementFromHTML(`
            <ol>
            <li><div style='background-color: rgba(60, 138, 255, 0.911);
            -webkit-mask: url(./icon/ios-safari-share-icon.svg) no-repeat center;
            mask: url(./icon/ios-safari-share-icon.svg) no-repeat center;width: 28px;
            height: 28px;'></div> 共有ボタンを押して、</li><li><div style='background-color: white;
          -webkit-mask: url(./icon/ios-safari-add-to-home-icon.svg) no-repeat center;
          mask: url(./icon/ios-safari-add-to-home-icon.svg) no-repeat center;width: 28px;
          height: 28px;'></div> ホームに追加ボタンを押す。</li></ol>
      `)]).then(res=>console.log(res)).catch(e=>console.warn(e))
      */

    }else{
      pwaNotSupported();
    }
  }else{
    console.log('sw supported');
    pwaNotSupported();
  } 
}
installApp();