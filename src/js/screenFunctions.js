
const updateSafeAreaSize = () =>{
  globalThis.safeAreaTop = getComputedStyle(document.documentElement).getPropertyValue("--safe-area-top");
  globalThis.safeAreaLeft = getComputedStyle(document.documentElement).getPropertyValue("--safe-area-left");
  globalThis.safeAreaBottom = getComputedStyle(document.documentElement).getPropertyValue("--safe-area-bottom");
  globalThis.safeAreaRight = getComputedStyle(document.documentElement).getPropertyValue("--safe-area-right");
  
}

export { updateSafeAreaSize };