const langSet = ['en', 'ja'];
/**
 * 
 * @param {string} langCode language code
 */
const setPageLang = (langCode) =>{
  document.body.setAttribute('lang', langCode);
}
//setPageLang(navigator.language);
if(navigator.language=='ja'||navigator.language=='ja-JP')setPageLang('ja');

export { setPageLang };