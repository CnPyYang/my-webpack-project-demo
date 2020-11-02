import React from 'react'
import ReactDOM from 'react-dom'
import './search.less'

class Search extends React.Component {
  render() {
    return <div className="text">Search Text搜索</div>
  }
}
ReactDOM.render(
  <Search />,
  document.getElementById('root')
)