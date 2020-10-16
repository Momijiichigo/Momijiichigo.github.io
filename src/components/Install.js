import React from 'react'
import '../css/install.scss'
import { mouse, ios, safari } from 'platform-detect'
import  InlineSVG from './InlineSVG'
export default class extends React.Component {
  state = {
    installPrompt: null
  }

  componentDidMount() {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault()
      this.setState({installPrompt: e})
    })
  }

  render() {
    return (
      <div className='install center-content'>
        <h1>Hakqlo</h1>
        <button
          onClick={() => {
            if(mouse){
              popup('PC version unavailable')
            } else if (this.state.installPrompt) {
              this.state.installPrompt.prompt()
              this.state.installPrompt.userChoice.then(choice => {
                if (choice.outcome === 'accepted') {
                  this.setState({
                    installPrompt: null
                  })
                }
              })
            } else if(ios&&safari){
              popup('Add to Home Screen',[
                'You can install Hakqlo App by adding this website to your home screen.',
                <ol>
                  <li>Tap the <InlineSVG src={require('../../icon/ios-safari-share-icon.svg').default} color={'rgba(56, 172, 255, 0.91)'}/> icon at the bottom of your browser</li>
                  <li>Choose <InlineSVG src={require('../../icon/ios-safari-add-to-home-icon.svg').default} color={'white'}/> 'Add to Home Screen'.</li>
                </ol>
              ], ['OK',{value:'problem',text: 'getting a problem?'}]).then(v=>{
                //console.log(v);
                if(v==='problem')popup('Try the following:', 'If you are not using Safari, try to use safari.')
              })
            } else {
              popup('Could not install the app.')
            }
          }}>
          インストール
        </button>
      </div>
    )
  }
}