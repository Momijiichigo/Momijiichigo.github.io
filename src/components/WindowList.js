import React from 'react'
import AppWindow from './AppWindow'
import { Window1, Window2, Window3, Window4, Window5, Window6 } from './Windows'
import '../css/window.scss'
/*
Niwa-chan, I want this AppWindow to have following functionalities:
- create-window
- delete-window
- undeletable-window(used for such as settings window)
- executing onFocus method for each window-apps, when focused?
can you do this?

By the way, I added window.searchParams object:
https://developer.mozilla.org/ja/docs/Web/API/URLSearchParams
which is browser-implemented object.
you can know if the URL query has a 'parameter',
searchParams.has('parameter')  //true or false
searchParams.get('parameter')  //returns the value
*/
export default class extends React.Component {
  appWindows = [
    Window1,
    Window2,
    Window3,
    Window4,
    Window5,
    Window6,
  ]
  state = {
    currentWin: 0,
    scrollLength: 0,
    listView: true,
    scrolling: false,
  }

  componentDidMount() {
    window.onsplashend(()=>this.setState({
      listView: false
    }))
    if (searchParams.has('appWindow')) {
      this.setState({
        currentWin: Number(searchParams.get('appWindow')),
        scrollLength: Number(searchParams.get('appWindow'))
      })
    }
  }

  scrollTo(moveLength) {
    let scrollLength = moveLength % this.appWindows.length
    if (scrollLength < 0) scrollLength += this.appWindows.length
    this.setState({scrollLength: scrollLength})
  }

  bringToCenter() {
    this.setState({scrollLength: Math.round(this.state.scrollLength)})
  }

  render() {
    return (
      <div className={
          'window-list ' +
          (this.state.scrolling ? 'scrolling' : '')
        }>
        {this.appWindows.map((component, index) =>
          <AppWindow winList={this} component={component} index={index} key={index} />
        )}
      </div>
    )
  }
}