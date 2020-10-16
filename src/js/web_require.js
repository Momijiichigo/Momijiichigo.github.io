const require = (url) =>{
  return new Promise((resolve,reject)=>{
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'text/javascript');
    fetch(url,{
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
    }).then(v=>v.text()).then(v=>resolve(eval(v))).catch(e=>reject(e));
  })
}
export { require };