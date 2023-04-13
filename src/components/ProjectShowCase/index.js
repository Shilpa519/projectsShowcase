import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import FailureView from '../FailureView'

import './index.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const appStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ProjectShowCase extends Component {
  state = {
    appStatus: appStatusConstants.initial,
    selected: '',
    projectsList: [],
  }

  componentDidMount = () => {
    this.getDetails()
  }

  onRetry = () => {
    this.getDetails()
  }

  getDetails = async () => {
    const {selected} = this.state
    this.setState({appStatus: appStatusConstants.inProgress})
    if (selected === '') {
      this.setState({selected: categoriesList[0].id})
    }
    const url = `https://apis.ccbp.in/ps/projects?category=${selected}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const fetchedData = data.projects.map(item => ({
        id: item.id,
        imageUrl: item.image_url,
        name: item.name,
      }))
      this.setState({
        appStatus: appStatusConstants.success,
        projectsList: fetchedData,
      })
    } else {
      this.setState({
        appStatus: appStatusConstants.failure,
        selected: categoriesList[0].id,
      })
    }
  }

  changeOption = e => {
    this.setState({selected: e.target.value})
    this.getDetails()
  }

  failureView = () => <FailureView retryButton={this.onRetry()} />

  renderingView = () => {
    const {appStatus} = this.state
    switch (appStatus) {
      case appStatusConstants.inProgress:
        return this.loadingView()
      case appStatusConstants.success:
        return this.projectsRendering()
      case appStatusConstants.failure:
        return this.failureView()
      default:
        return null
    }
  }

  projectsRendering = () => {
    const {projectsList} = this.state
    return (
      <ul className="list-container">
        {projectsList.map(item => (
          <li className="list-item" key={item.id}>
            <img src={item.imageUrl} alt={item.name} className="image" />
            <p className="name">{item.name}</p>
          </li>
        ))}
      </ul>
    )
  }

  loadingView = () => (
    <div className="loader" data-testid="loader">
      <Loader type="TailSpin" height="50" />
    </div>
  )

  render() {
    const {selected} = this.state
    return (
      <>
        <Header />
        <div className="project-container">
          <select
            className="select-container"
            value={selected}
            onChange={this.changeOption}
          >
            {categoriesList.map(item => (
              <option value={item.id} key={item.id} className="options">
                {item.displayText}
              </option>
            ))}
          </select>
        </div>
        {this.renderingView()}
      </>
    )
  }
}

export default ProjectShowCase
