import React from 'react'
import PropTypes from 'prop-types'

export class Tabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: props.activeIndex
    }
  }
  tabChange = (event, index) => {
    event.preventDefault()
    this.setState({
      activeIndex: index
    })
    this.props.onTabChange(index)
  }
  render() {
    const { children } = this.props
    const { activeIndex } = this.state
    return (
      <ul className='nav nav-tabs nav-fill my-4'>
        {React.Children.map(children, (child, index) => {
          const activeClassName =
            activeIndex === index ? 'nav-link active' : 'nav-link'
          return (
            <li className='nav-item'>
              <span
                onClick={event => {
                  this.tabChange(event, index)
                }}
                className={activeClassName}
              >
                {child}
              </span>
            </li>
          )
        })}
      </ul>
    )
  }
}
export const Tab = ({ children }) => {
  return <>{children}</>
}
Tabs.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  onTabChange: PropTypes.func.isRequired
}
