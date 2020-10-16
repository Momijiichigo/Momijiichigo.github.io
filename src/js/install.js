import runtime from 'serviceworker-webpack-plugin/lib/runtime';
const installProcess = (global) => {
  // || (window.matchMedia('(display-mode: fullscreen)').matches) 
  global.portMain;
  const onMessage = e => {
    const { type, content } = e.data;
    switch (type) {
      case 'consoleLog':
        console.log('sw:', ...content);
        break;

      default:
    }
    portMain.start();
  }

  if ('serviceWorker' in navigator) {
    //runtime.register()
    runtime.register().then(function (reg) {
      console.log('succeeded');
      if (reg.active) {
        console.log('sw is active');
        const { port1, port2 } = new MessageChannel();
        reg.active.postMessage({ type: 'init' }, [port2]);
        global.portMain = port1;
        port1.onmessage = onMessage;
      } else {
        console.log('sw is NOT active');
      }
    }).catch(function (err) {
      console.error('error:', err);
    });
    //if the app is not installed
    //global.isPWA = false;
    /*if (!global.isPWA) {
      console.log("Not PWA: going to /install.html")
      location.href = './install.html';

    }else console.log('this is in PWA')*/
  }

}
export default installProcess;
