import React from 'react'
import ReactDOM from 'react-dom'
import './search.less'
import '../../common'
import { a } from './tree-shaking'

class Search extends React.Component {
  constructor () {
    super ();
    this.state={
      Text: ''
    }
  }
  loadComponent () {
    import('../component/text.js').then(txt => {
      this.setState({
        Text: txt.default
      })
    })
  }
  render() {
    const { Text } = this.state
    return <div className="search">
      {Text ? <text /> : ''}
      <div className="text" onClick="loadComponent">{a()}Search Text搜索</div>
    </div>
  }
}
ReactDOM.render(
  <Search />,
  document.getElementById('root')
)