
export default {
  splashDuration: 3000,
  splashAction: function(startupscreen){
    this.splashDuration; // will access to the above splashDuration property
    startupscreen.setAttribute("class","clear");
  }
}