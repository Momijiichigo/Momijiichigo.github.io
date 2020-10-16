const WSR = 0.6; //window shrink ratio
let scrollXStart=0;
const WXR = 50; 
let scrollRatio = 100/screen.width/WSR/WXR;  //lol nobody would understant this including me. u multiple scroll length with this value u get change in scrollLength value.
let WLScrollXstart = 0;
window.addEventListener('resize',()=>{
  scrollRatio = 100/screen.width/WSR/WXR;
})
const getDistenceFromCenter = (index, center, listLength) =>{
  const b_distance = index - center;
  if(Math.abs(b_distance)>Math.abs(b_distance+listLength)) return b_distance+listLength;
  if(Math.abs(b_distance)>Math.abs(b_distance-listLength)) return b_distance-listLength;
  return b_distance;
}
class AppWindow extends HTMLElement {
  winIndex;
  ws = window.WindowSystem;
  ready = false;
  cover = document.createElement('div');
  constructor(){
    super();
  }
  //when the object is added as DOM
  connectedCallback(){
    this.ready = true;
    this.updateIndex();
    this.appendChild(this.cover);
    this.cover.setAttribute('class','cover')
    //this.cover.className.add('cover');
    requestAnimationFrame(this.draw.bind(this));
    const eventListenerOption = {
      //capture: false,
      //passive: false
    }
    /*
    const stp = (e) =>{
      if(this.ws.listView){
        //e.stopPropagation();
        //e.preventDefault();
      }
    }*/
    this.cover.addEventListener('touchstart',e=>{
      //stp(e);
      scrollXStart = e.changedTouches[0].screenX*scrollRatio;
      WLScrollXstart = WindowSystem.scrollLength;
      WindowSystem.container.classList.add('scrolling');
    },eventListenerOption)
    this.cover.addEventListener('touchmove',e=>{
      //stp(e);
      e.preventDefault();
      const moveLength = scrollXStart-e.changedTouches[0].screenX*scrollRatio+WLScrollXstart;
      if(WindowSystem.windowList.length===1 && (moveLength > 0.4 || moveLength < -0.4))return 0;
      WindowSystem.scrollTo(moveLength);
    },eventListenerOption)
    this.cover.addEventListener('touchend',e=>{
      //stp(e);
      WindowSystem.container.classList.remove('scrolling');
      WindowSystem.bringToCenter();
    },eventListenerOption)
    /*this.addEventListener('click',e=>{
      console.log('window clicked')
    },eventListenerOption)*/
    this.cover.addEventListener('click',e=>{
      //stp(e);
      //e.stopPropagation();
      //console.log('window cover clicked')
      this.focus();
      
    },eventListenerOption)
    this.addEventListener('click',e=>{
      e.stopPropagation();
    })
  }
  focus(){
    WindowSystem.currentWin = this.winIndex;
    WindowSystem.listView = false;
  }
  updateIndex(){
    this.winIndex = this.ws.windowList.indexOf(this);
  }
  draw(){
    //dis:2 -> 90deg -> Math.PI/2 ---> dis*Math.PI/4
    
    if(this.ready===false){
      console.log('not ready');
      return 0;
    }
    if(this.classList.contains('focus')){
      this.style.transform = null;
      this.style.opacity = 1;
    }else if(this.classList.contains('away')){
      this.style.opacity = 0;
      this.style.transform = 'translateZ(-100px)';
    }else{
      const wAngle = getDistenceFromCenter(this.winIndex, this.ws.scrollLength, this.ws.windowList.length)*Math.PI/4;
      const cosA = Math.cos(wAngle);
      this.style.transform = `scale(${WSR}, ${WSR}) translateZ(${(cosA)*70}px) translateX(${Math.sin(wAngle)*WXR}%)`
      this.style.opacity = cosA**1.5;
    }
    requestAnimationFrame(this.draw.bind(this));
  }
  onfocused(){

  }
  onblur(){

  }
}
customElements.define('app-window',AppWindow);
export {AppWindow}