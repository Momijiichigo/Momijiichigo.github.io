import { require } from './web_require';
const STARTUP_SCRIPT = 'https://drive.google.com/uc?export=view&id=1pZxb0cPI9bsBanv8lqmBEPBEA68wuidU';
let splashDuration, splashAction;
__non_webpack_require__(STARTUP_SCRIPT).then(v=>{
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
})
//let splashDuration = 3000;
//let splashAction = () =>{
  //startupscreen.setAttribute("class","clear");
//}


/*
.addEventListener('transitionend', (event) => {
      event.target.remove();
    });
//function for creating and adding elements
    const ce = (tagname,parent) =>{
        const el = document.createElement(tagname);
        parent.appendChild(el);
        return el;
    }
    //scale define

    const baseTriWidth = 20,baseTriHeight = baseTriWidth*Math.sqrt(3)*0.5,maxLength = document.body.clientWidth;
    const startUpScreen = document.querySelector("#startup");
    const startIcon = ce("div",startUpScreen);
    const centerTriangle = ce("div",startIcon);

    centerTriangle.dataset.sideLength=baseTriWidth;
    centerTriangle.setAttribute("data-side-length","60")
    centerTriangle.setAttribute("class","logoTriangle");
    //svg scope 
    document.addEventListener("DOMContentloaded",()=>{
        (svgdoc=>{
        })(document.querySelector("#startup > object").getSVGDocument());
    })
    

*/