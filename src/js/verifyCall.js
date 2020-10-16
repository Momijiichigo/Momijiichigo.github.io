addEventListener('DOMContentLoaded',()=>{
  const searchParams = new URLSearchParams(location.search);
  //?call=shortcut&content=shortcut1
  if(searchParams.get('call')==='shortcut'){
    switch(searchParams.get('content')){
      case 'shortcut1':
        popup('hi','opened by shortcut 1!');
        break;
      case 'shortcut2':
        popup('hi',['opened by shortcut 1!','yay']);
        break;
      default:
        break;
    }
  }
})