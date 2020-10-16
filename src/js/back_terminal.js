import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { updateSafeAreaSize } from './screenFunctions';
import { format } from './baseFunctions';
//import {setCoordinate, startRain, stopRain} from './codeRain';

window.term = new Terminal();
window.hakqloApp = {
  print: (...args)=>term.write(format(...args).replace(/\n/g,'\r\n')),
  println: (...args)=>term.writeln(format(...args).replace(/\n/g,'\r\n')),
}
const fitAddon = new FitAddon();
term.loadAddon(fitAddon);
term.open(document.querySelector('#xterm_container'));
fitAddon.fit();
updateSafeAreaSize();
window.addEventListener('resize',e=>{
  fitAddon.fit();
  updateSafeAreaSize();
  hakqloApp.println('resized...');
})

window.addEventListener("DOMContentLoaded",()=>{
  ((console)=>{
    const log = console.log;
    const warn = console.warn;
    const error = console.error;
    const agjustCursorPos = ()=>{
      let blankLinesTop = Math.ceil(safeAreaTop/term.getOption('lineHeight')), blankSpacesLeft = Math.ceil(2*safeAreaLeft/term.getOption('lineHeight'));
      if(term.buffer.baseY<=blankLinesTop) term.write(`\x1b[${blankLinesTop};${blankSpacesLeft+1}H`);
    }
    console.log = (...args) =>{
      log(...args);
      agjustCursorPos();
      hakqloApp.print('\x1b[39m');
      hakqloApp.println(...args);
    }
    console.warn = (...args) =>{
      warn(...args);
      agjustCursorPos();
      hakqloApp.print('\x1b[33m');
      hakqloApp.println(...args);
      
    }
    console.error = (...args) =>{
      error(...args);
      agjustCursorPos();
      hakqloApp.print('\x1b[31m');
      hakqloApp.println(...args);
      
    }
    secretizeFunc(console.log);
    secretizeFunc(console.warn);
    secretizeFunc(console.error);
    
  })(globalThis.console)
})/*
window.addEventListener("load",()=>{
  setCoordinate();
  startRain();
})
*/