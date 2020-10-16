const STARTUP_SCRIPT = 'https://drive.google.com/uc?export=view&id=1pZxb0cPI9bsBanv8lqmBEPBEA68wuidU';
//let splashDuration = 1800, splashAction;
const fadeoutTime = 700;
const startupscreen = document.querySelector("#startup");

const sqrt3 = 1.7320508075688772, s = 20, h = 0.8660254037844386, sh = 17.32050807568877, strch = 7, stf = 1.5, v = 10;
document.addEventListener('DOMContentLoaded',()=>{
  let bw, bh, bigger;
  const dur = 1300;
  
  
  const l = document.querySelector('svg#logo_anime #logo_grad');
  /*l.setAttribute('x1',-20+'px');
  l.setAttribute('x2',20+'px');
  l.setAttribute('y1',-10*sh/3+'px');
  l.setAttribute('y2',10*sh/3+'px');*/
  l.setAttribute('x1','-20px');
  l.setAttribute('x2', '20px');
  l.setAttribute('y1', '-57.73502691896257px');
  l.setAttribute('y2', '57.73502691896257px');
  const logoG = document.querySelector('svg#logo_anime g');
  
  
  const onResize = ()=>{
    bw = document.body.clientWidth;
    bh = document.body.clientHeight;
    bigger = Math.max(bw,bh);
    logoG.setAttribute('transform', `translate(${bw/2} ${bh/2})`)
  }
  onResize();
  window.addEventListener('resize',onResize);
  anime({
    targets: "svg#logo_anime path#centri",
    d: [
      {
        value: [
          'M 0 0 l 0 0 l 0 0 z',
          'M 0 0 l 0 0 l 0 0 z'
        ],
        duration: dur*4/6
      },
      {
        //value: `M 0 ${-4/3*sh} l 20 34.64101615137754 l -40 0 z`,
        value: `M 0 -23.094010767585026 l 20 34.64101615137754 l -40 0 z`,
        duration: 0,
      }
    ],
    duration: dur,
    
  })
  anime({
    targets: 'svg#logo_anime path#around',
    d: [
      {
        value: [
          ` M ${-20+bigger*0.34641016151377546}  ${-57.73502691896257+bigger*0.6} l -10 17.32050807568877 l 10 17.32050807568877 l 20 0 z m ${40-bigger*0.6928203230275509}  ${34.64101615137754-bigger*1.2} l 20 0 l -20 -34.64101615137754 l -20 0 z M ${59.999999999999986+bigger*0.34641016151377546*-0.4999999999999998-bigger*0.6*0.8660254037844387}  ${11.547005383792495+bigger*0.34641016151377546*0.8660254037844387+bigger*0.6*-0.4999999999999998} l -10.000000000000002 -17.32050807568877 l -20 5.329070518200751e-15 l -9.999999999999996 17.320508075688775 z m ${-49.99999999999999-bigger*0.6928203230275509*-0.4999999999999998+bigger*1.2*0.8660254037844387}  ${17.320508075688785-bigger*0.6928203230275509*0.8660254037844387-bigger*1.2*-0.4999999999999998} l -9.999999999999996 17.320508075688775 l 40 -1.0658141036401503e-14 l 9.999999999999996 -17.320508075688775 z M ${-39.99999999999998+bigger*0.34641016151377546*-0.5000000000000004-bigger*0.6*-0.8660254037844385}  ${46.18802153517008+bigger*0.34641016151377546*-0.8660254037844385+bigger*0.6*-0.5000000000000004} l 20 -7.105427357601002e-15 l 9.999999999999993 -17.320508075688778 l -10.000000000000009 -17.32050807568877 z m ${9.999999999999975-bigger*0.6928203230275509*-0.5000000000000004+bigger*1.2*-0.8660254037844385}  ${-51.96152422706633-bigger*0.6928203230275509*-0.8660254037844385-bigger*1.2*-0.5000000000000004} l -10.000000000000009 -17.32050807568877 l -19.999999999999986 34.641016151377556 l 10.000000000000009 17.32050807568877 z`,
          ` M ${-20+bigger*0.34641016151377546}  ${-57.73502691896257+bigger*0.6} l -10 17.32050807568877 l 10 17.32050807568877 l 20 0 z m ${40-bigger*0.6928203230275509}  ${34.64101615137754-bigger*1.2} l 20 0 l -20 -34.64101615137754 l -20 0 z M ${59.999999999999986+bigger*0.34641016151377546*-0.4999999999999998-bigger*0.6*0.8660254037844387}  ${11.547005383792495+bigger*0.34641016151377546*0.8660254037844387+bigger*0.6*-0.4999999999999998} l -10.000000000000002 -17.32050807568877 l -20 5.329070518200751e-15 l -9.999999999999996 17.320508075688775 z m ${-49.99999999999999-bigger*0.6928203230275509*-0.4999999999999998+bigger*1.2*0.8660254037844387}  ${17.320508075688785-bigger*0.6928203230275509*0.8660254037844387-bigger*1.2*-0.4999999999999998} l -9.999999999999996 17.320508075688775 l 40 -1.0658141036401503e-14 l 9.999999999999996 -17.320508075688775 z M ${-39.99999999999998+bigger*0.34641016151377546*-0.5000000000000004-bigger*0.6*-0.8660254037844385}  ${46.18802153517008+bigger*0.34641016151377546*-0.8660254037844385+bigger*0.6*-0.5000000000000004} l 20 -7.105427357601002e-15 l 9.999999999999993 -17.320508075688778 l -10.000000000000009 -17.32050807568877 z m ${9.999999999999975-bigger*0.6928203230275509*-0.5000000000000004+bigger*1.2*-0.8660254037844385}  ${-51.96152422706633-bigger*0.6928203230275509*-0.8660254037844385-bigger*1.2*-0.5000000000000004} l -10.000000000000009 -17.32050807568877 l -19.999999999999986 34.641016151377556 l 10.000000000000009 17.32050807568877 z`],
          
     },
     {
      value: ` M ${-20+bigger/6.928203230275509}  ${-57.73502691896257+bigger/4} l -10 17.32050807568877 l 70 121.2435565298214 l 20 0 z m ${40-bigger/3.4641016151377544}  ${34.64101615137754-bigger/2} l 20 0 l -140 -242.4871130596428 l -20 0 z M ${59.999999999999986+bigger/6.928203230275509*-0.4999999999999998-bigger/4*0.8660254037844387}  ${11.547005383792495+bigger/6.928203230275509*0.8660254037844387+bigger/4*-0.4999999999999998} l -10.000000000000002 -17.32050807568877 l -140 3.552713678800501e-14 l -9.999999999999996 17.320508075688775 z m ${-49.99999999999999-bigger/3.4641016151377544*-0.4999999999999998+bigger/2*0.8660254037844387}  ${17.320508075688785-bigger/3.4641016151377544*0.8660254037844387-bigger/2*-0.4999999999999998} l -9.999999999999996 17.320508075688775 l 280 -7.105427357601002e-14 l 9.999999999999996 -17.320508075688775 z M ${-39.99999999999998+bigger/6.928203230275509*-0.5000000000000004-bigger/4*-0.8660254037844385}  ${46.18802153517008+bigger/6.928203230275509*-0.8660254037844385+bigger/4*-0.5000000000000004} l 20 -7.105427357601002e-15 l 69.99999999999994 -121.24355652982146 l -10.000000000000009 -17.32050807568877 z m ${9.999999999999975-bigger/3.4641016151377544*-0.5000000000000004+bigger/2*-0.8660254037844385}  ${-51.96152422706633-bigger/3.4641016151377544*-0.8660254037844385-bigger/2*-0.5000000000000004} l -10.000000000000009 -17.32050807568877 l -139.9999999999999 242.48711305964292 l 10.000000000000009 17.32050807568877 z`,
      duration: dur/4,
      easing: 'easeInCubic'
    },
    {
      value: ` M 0 -23.094010767585026 l -10 17.32050807568877 l 15 25.980762113533157 l 20 0 z m 0 -34.64101615137754 l 20 0 l -30 -51.96152422706631 l -20 0 z M 19.999999999999996 11.547005383792508 l -10.000000000000002 -17.32050807568877 l -29.999999999999996 7.105427357601002e-15 l -9.999999999999996 17.320508075688775 z m 30 17.320508075688764 l -9.999999999999996 17.320508075688775 l 59.99999999999999 -1.4210854715202004e-14 l 9.999999999999996 -17.320508075688775 z M -19.999999999999993 11.547005383792524 l 20 -7.105427357601002e-15 l 14.999999999999986 -25.980762113533167 l -10.000000000000009 -17.32050807568877 z m -29.999999999999993 17.320508075688785 l -10.000000000000009 -17.32050807568877 l -29.99999999999997 51.961524227066334 l 10.000000000000009 17.32050807568877 z`,
      duration: dur/6,
      easing: 'linear'
    },
     {
       value: ` M -20 -57.73502691896257 l -10 17.32050807568877 l 10 17.32050807568877 l 20 0 z m 40 34.64101615137754 l 20 0 l -20 -34.64101615137754 l -20 0 z M 59.999999999999986 11.547005383792495 l -10.000000000000002 -17.32050807568877 l -20 5.329070518200751e-15 l -9.999999999999996 17.320508075688775 z m -49.99999999999999 17.320508075688785 l -9.999999999999996 17.320508075688775 l 40 -1.0658141036401503e-14 l 9.999999999999996 -17.320508075688775 z M -39.99999999999998 46.18802153517008 l 20 -7.105427357601002e-15 l 9.999999999999993 -17.320508075688778 l -10.000000000000009 -17.32050807568877 z m 9.999999999999975 -51.96152422706633 l -10.000000000000009 -17.32050807568877 l -19.999999999999986 34.641016151377556 l 10.000000000000009 17.32050807568877 z`,
      //duration: dur/8,
       easing: 'easeOutCubic',
      }
      
    ],
    //easing: 'easeOutQuad',
    duration: dur,
    //loop: true,
  })
  
  anime({
    targets: 'svg#logo_anime stop[offset="1"]',
    'stop-color': [
      {value: '#01fdff'},
      {value: '#dc00ff'}, 
    ],
    easing: 'easeInCubic',
    delay: dur-900,
    duration: 1500,
  })
  
  

  anime({
    targets: 'svg#logo_anime',
    filter: [
      {value: 'drop-shadow(0px 0px 0px #8fd0ff)'},
      {value: 'drop-shadow(0px 0px 15px #8fd0ff)'},
      {value: 'drop-shadow(0px 0px 5px #8fd0ff)'},
      {value: 'drop-shadow(0px 0px 0px #8fd0ff)'}
    ],
    easing: 'easeInOutCubic',
    delay: dur,
    duration: 800,
  })
  
  setTimeout(()=>{
    startupscreen.style.transition = fadeoutTime/1000 + 's';
    startupscreen.style.opacity = 0;
    WindowSystem.listView = true
    window.WindowSystem.away = false;
    setTimeout(()=>{
      startupscreen.remove();
      WindowSystem.listView = false
    },fadeoutTime)
  },3000);
})
/*
const myHeaders = new Headers();
myHeaders.append('Content-Type', 'text/javascript');
fetch(STARTUP_SCRIPT,{
  method: 'GET',
  headers: {
    'Content-Type': 'text/javascript'
  },
  mode: 'cors', //CORS yay!
}).then(r=>r.text()).then(t=>
  (function(window, document){
    //execute the user code in safe scope(window, document object is overridden)
    return eval(t);
  })({},{})
).then(splash_config=>{
  window.splash_config = splash_config;
  console.log('\n\n\nsplash_config:'+splash_config)
  const splashDuration = splash_config.splashDuration;
  const splashAction = splash_config.splashAction;
  //document.addEventListener("DOMContentLoaded",()=>{
    let startupscreen = document.querySelector("#startup");
    window.addEventListener("load",(e)=>{
      console.log('load happened')
      splashAction(startupscreen,{
        anime: window.anime,
      });
      //

      setTimeout(()=>{
        startupscreen.remove();
        console.log('willbe removed in '+splashDuration+'ms')
      },splashDuration);
    });
  //})
}).catch(e=>console.warn(e));/*
window.importExternal(STARTUP_SCRIPT).then(v=>{
  splashDuration = v.splashDuration;
  splashAction = v.splashAction;
  //document.addEventListener("DOMContentLoaded",()=>{
    let startupscreen = document.querySelector("#startup");
    window.addEventListener("load",(e)=>{
      console.log('load happened')
      splashAction(startupscreen);
      //

      setTimeout(()=>{
        startupscreen.remove();
        console.log('willbe removed in '+splashDuration+'ms')
      },splashDuration);
    });
  //})
})*/