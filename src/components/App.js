import React from 'react'
import Splash from './Splash'
//import Install from './Install'
import DialogList from './DialogList'
window.searchParams = new URLSearchParams(location.search);
class App extends React.Component {
  state = {
    isPWA: window.matchMedia('(display-mode: standalone)').matches
  }
  testAppScreen = false;
  appScreen = (
    <div className='App'>
      <Splash />
      <DialogList />
    </div>
  )
  /*
  installScreen = (
    <div className='App'>
      <Install />
      <DialogList />
    </div>
  )*/
  componentDidMount() {
    window.matchMedia('(display-mode: standalone)').addEventListener('change', e => {
      this.setState({
        isPWA: e.matches
      })
    })
  }

  render() {
    return this.appScreen;
  }
}

export default App
