import {precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {CacheFirst} from 'workbox-strategies';

// Use the imported Workbox libraries to implement caching,
// routing, and other logic:
precacheAndRoute(self.__WB_MANIFEST);

self.portSW;
self.addEventListener('message',e=>{
  const { type } = e.data;
  console.log(type);
  switch (type) {
    case 'init':
      self.portSW = e.ports[0];
      console.log("initialized sw");
    break;

    default:
  }
  self.portSW && portSW.start();
})
console.log=(...args)=>{
  self.portSW && portSW.postMessage({type: "consoleLog", content: args });
}