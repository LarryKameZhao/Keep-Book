import React from 'react'
import logo from '../logo.svg'
import PriceList from '../components/PriceList'
import ViewTab from '../components/ViewTab'
import MonthPicker from '../components/MonthPicker'
import CreateBtn from '../components/CreateBtn'
import {
  LIST_VIEW,
  CHART_VIEW,
  TYPE_INCOME,
  TYPE_OUTCOME,
  parseToYearAndMonth,
  padLeft
} from '../utility'
import TotalPrice from '../components/TotalPrice'
const items = [
  {
    id: 1,
    title: '去旅游',
    price: 2000,
    date: '2019-09-01',
    cid: 1
  },
  {
    id: 2,
    title: '基金',
    price: 1000,
    date: '2019-10-11',
    cid: 2
  }
]
const categories = {
  '1': {
    id: 1,
    name: '旅行',
    type: 'outcome',
    iconName: 'ios-plane'
  },
  '2': {
    id: 2,
    name: '基金',
    type: 'income',
    iconName: 'ios-plane'
  }
}
const newItem = {
  id: 4,
  title: '买零食',
  price: 100,
  date: '2019-10-11',
  cid: 1
}
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items,
      currentDate: parseToYearAndMonth(),
      tabView: LIST_VIEW
    }
  }
  changeView = view => {
    this.setState({
      tabView: view
    })
  }
  changeDate = (year, month) => {
    this.setState({
      currentDate: { year, month }
    })
  }
  modifyItem = modifiedItem => {
    const modifiedItems = this.state.items.map(item => {
      if (item.id === modifiedItem.id) {
        return { ...item, title: '新标题' }
      } else {
        return item
      }
    })
    this.setState({
      items: modifiedItems
    })
  }
  createItem = () => {
    this.setState({
      items: [newItem, ...this.state.items]
    })
  }
  deleteItem = deletedItem => {
    const filteredItems = this.state.items.filter(
      item => item.id !== deletedItem.id
    )
    this.setState({
      items: filteredItems
    })
  }
  render() {
    const { items, currentDate, tabView } = this.state
    const itemsWithCatgory = items
      .map(item => {
        item.category = categories[item.cid]
        return item
      })
      .filter(item => {
        return item.date.includes(
          `${currentDate.year}-${padLeft(currentDate.month)}`
        )
      })
    let totalIncome = 0
    let totalOutcome = 0
    itemsWithCatgory.forEach(item => {
      if (item.category.type === TYPE_OUTCOME) {
        totalOutcome += item.price
      } else {
        totalIncome += item.price
      }
    })
    return (
      <>
        <header className='App-header'>
          <div className='row mb-5'>
            <img src={logo} className='App-logo' alt='' />
          </div>
          <div className='row'>
            <div className='col'>
              <MonthPicker
                year={currentDate.year}
                month={currentDate.month}
                onChange={this.changeDate}
              />
            </div>
            <div className='col'>
              <TotalPrice income={totalIncome} outcome={totalOutcome} />
            </div>
          </div>
        </header>
        <div className='content-area py-3 px-3'>
          <ViewTab activeTab={tabView} onTabChange={this.changeView} />
          <CreateBtn onClick={this.createItem} />
          {tabView === LIST_VIEW && (
            <PriceList
              items={itemsWithCatgory}
              onModifyItem={this.modifyItem}
              onDeleteItem={this.deleteItem}
            />
          )}
          {tabView === CHART_VIEW && <h1>这里是图表区域</h1>}
        </div>
      </>
    )
  }
}

export default Home
