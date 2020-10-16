import {AppWindow} from './appWindow';

const WindowSystem = {
  windowList: [], // contains all windows
  currentWin: 0, // index num of the current window in windowList
  container: document.querySelector('#windowsContainer'),
  scrollLength:0, 
  _away: false,
  _listView: true,
  init(){
    //this.away = true;
    //requestAnimationFrame(this.draw.bind(this));
  },
  add(element){
    const win = document.createElement('app-window');
    this.windowList.push(win);
    this.container.appendChild(win);
    element && win.appendChild(element);
    this.moveTo(win.winIndex);
    return win;
  },
  moveTo(index){
    if(index>=this.windowList.length)return 0;
    const dur = 300;
    this.listView = true;
    this.currentWin = index;
    setTimeout(()=>{
      
      WindowSystem.container.classList.add('scrolling');
      anime({
        targets: this,
        scrollLength: index,
        duration: dur,
        easing: 'easeInOutQuint',
      })
      setTimeout(()=>{
        this.listView = false;
        WindowSystem.container.classList.remove('scrolling');
      },dur)
    }, 200)
  },
  draw(){
    //this.windowList.forEach(v=>v.draw());
    //for(const i in this.windowList)this.windowList[i].draw();
    //requestAnimationFrame(this.draw.bind(this))
  },
  scrollTo(l){
    // 0 <= v < this.windowList.length
    //Math.sign(l)
    let v = l%this.windowList.length;
    if(v<0)v += this.windowList.length;
    if(v===3)v = 0;
    this.scrollLength = v;
  },
  bringToCenter(){
    this.scrollLength = Math.round(this.scrollLength);
    //if(this.scrollLength===this.windowList.length||this.scrollLength===-this.windowList.length)this.scrollLength=0;
  },
  get away(){
    return this._away;
  },
  set away(state){
    if(state){
      this.container.classList.add('away');
      if(!this.listView)this.windowList[this.currentWin].onblur();
    }else{
      this.container.classList.remove('away');
      if(!this.listView)this.windowList[this.currentWin].focus();
    } 
    this._away = state;
  },
  set listView(state){
    if(state){
      //this.windowList[this.currentWin].classList.remove('focus')
      this.scrollLength = this.currentWin;
      for(const wIndex in this.windowList){
        if(wIndex == this.currentWin){
          this.windowList[wIndex].classList.remove('focus');
          this.windowList[wIndex].onblur();
        }else{
          this.windowList[wIndex].classList.remove('away');
        }
      }
    }else{
      for(const wIndex in this.windowList){
        if(wIndex == this.currentWin){
          this.windowList[wIndex].classList.add('focus')
          this.windowList[wIndex].onfocused();
        }else{
          this.windowList[wIndex].classList.add('away');
        }
      }
    }
    this._listView = state;
  },
  get listView(){
    return this._listView;
  }
}

WindowSystem.container.addEventListener('click',()=>{
  //console.log('goBase');
  WindowSystem.away=true;
})
export { WindowSystem };