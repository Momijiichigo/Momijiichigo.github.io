import dialogPolyfill from 'dialog-polyfill'
import anime from 'animejs/lib/anime.es.js';
/**
 * 
 * @param {string} url 
 * @param {Object} fetch_option 
 */
window.anime = anime;
//const isInStandaloneMode = () => (window.matchMedia('(display-mode: standalone)').matches) || (window.matchMedia('(display-mode: fullscreen)').matches) || (window.navigator.standalone) || document.referrer.includes('android-app://');
//global.isPWA = isInStandaloneMode();

/**
 * same as util.format in nodejs
 */
const sleep = async (time) =>{
  return new Promise(resolve=>{
    setTimeout(()=>resolve(0),time)
  })
}
function format(fmt) {
  var re = /(%?)(%([jds]))/g,
  args = Array.prototype.slice.call(arguments, 1),
  fmt = fmt.toString();
  if(args.length) {
    fmt = fmt.replace(re, function(match, escaped, ptn, flag) {
      var arg = args.shift();
      switch(flag) {
        case 's':
          arg = '' + arg;
          break;
        case 'd':
          arg = Number(arg);
          break;
        case 'j':
          arg = JSON.stringify(arg);
          break;
      }
      if(!escaped) {
        return arg; 
      }
      args.unshift(arg);
      return match;
    })
  }

  // arguments remain after formatting
  if(args.length) {
    fmt += ' ' + args.join(' ');
  }

  // update escaped %% values
  fmt = fmt.replace(/%{2,2}/g, '%');

  return '' + fmt;
}

window.runExternal = (
  url,
  fetch_option={
    method: 'GET',
    headers: {
      'Content-Type': 'text/javascript'
    },
    mode: 'cors',
  }
) =>{
  return new Promise((resolve, reject) => {
    fetch(url,fetch_option).then(r=>r.text()).then(t=>resolve(eval(t))).catch(e=>reject(e));
  })
}
/**
 * 
 * @param {string} title 
 * @param {Array.<(string|HTMLElement)>} contents 
 * @param {Object.<string, string>} buttons 
 * @returns {Promise.<string>} 
 */
window.popup = (title='', contents=[], buttons = { "OK": "ok" }) => {
  if(typeof contents === 'string')contents = [contents];
  const previousDialogs = document.querySelectorAll("dialog");
  const thePreviousOneDialog = previousDialogs[previousDialogs.length - 1]
  previousDialogs.forEach(v => {
    v.setAttribute("class", "sent-back");
  })
  /*
    background-color: red;
    -webkit-mask: url(./icon/ios-safari-share-icon.svg) no-repeat center;
    mask: url(./icon/ios-safari-share-icon.svg) no-repeat center;*/
  //below would be a shit code.
  //why didn't I just make one function that creates a new element and adds onto a specific element
  const dialog = document.createElement("dialog");
  dialogPolyfill.registerDialog(dialog);
  document.body.appendChild(dialog);
  const form = document.createElement("form");
  dialog.appendChild(form);
  form.setAttribute("method", "dialog")
  const titleBar = document.createElement("p");
  form.appendChild(titleBar);
  titleBar.setAttribute("class", "title");
  titleBar.innerText = title;
  const cancelButton = document.createElement("button");
  cancelButton.innerText = "cancel"
  cancelButton.setAttribute("value", "cancel");

  titleBar.appendChild(cancelButton);
  contents.forEach(v => {
    const columnBar = document.createElement("p");
    if (typeof v === "string") {
      let label = document.createElement("label");
      columnBar.appendChild(label);
      label.innerText = v;
    } else if (v instanceof HTMLElement) {
      columnBar.appendChild(v);
    }
    form.appendChild(columnBar);

  })
  const menu = document.createElement("menu");
  form.appendChild(menu);
  for (const v in buttons) {
    const btn = document.createElement("button");
    btn.innerHTML = v;
    menu.appendChild(btn);
    btn.setAttribute("value", buttons[v])
    btn.setAttribute("type", "submit");
  }
  return new Promise(resolve => {
    dialog.addEventListener('close',() => {
      setTimeout(() => dialog.remove(), 500);
      thePreviousOneDialog && thePreviousOneDialog.removeAttribute("class");
      resolve(dialog.returnValue);
    });
    setTimeout(() => dialog.showModal(), 100);
  })
}
window.createElementFromHTML = (htmlString) => {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}
window.secretizeFunc = (func) =>{
  if(func.name)func.toString = () => `${func.name}(){ [ secret code ] }`;
  else func.toString = () => `()=>{ [ secret code ] }`;
}
export { format }
/*
export function init(window){
  window.popup = popup;
  window.createElementFromHTML = createElementFromHTML;
  window.importExternal = importExternal;
}

popup("Install",[
    createElementFromHTML(`
        <div><div style='background-color: red;
        -webkit-mask: url(./icon/ios-safari-share-icon.svg) no-repeat center;
        mask: url(./icon/ios-safari-share-icon.svg) no-repeat center;'></div> press this button</div>
    `)]).then(res=>console.log(res))
//popup("aaaa",["vsgahjbxnjdwax","bhsajknxmdks"],{"OK",()=>{console.log(ok clicked)}})
`<dialog id="sysDialog">
<form method="dialog">
  <p class="title">${title}<button value="cancel">cancel</button></p>
  <p><label>${contents}</label></p>
  <menu>
    <button id="confirmBtn" value="default">Confirm</button>
  </menu>
</form>
</dialog>`*/
/*
        while(true){
            const imgStartIndex = str.indexOf("{img:");
            if(imgStartIndex!==0){

                let label = document.createElement("label");
                titleBar.appendChild(label);
                if(imgStartIndex!==-1){
                    label.innerText = str.substring(0,imgStartIndex);
                    str = str.substring(imgStartIndex);
                }else{
                    label.innerText = str;
                    break;
                }

            }else if(imgStartIndex===0){
                const tagEndIndex = str.indexOf("}");
                const imgSrc = str.substring(5,tagEndIndex);
                str = str.substring(tagEndIndex+1);
                let img = document.createElement("img");
                titleBar.appendChild(img);
                img.src = imgSrc;
            }else if(str.length===0)break;
        }*/