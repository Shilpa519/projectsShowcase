import './index.css'

const FailureView = props => {
  const {retryButton} = props

  const onButtonClick = () => {
    retryButton()
  }
  return (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" onClick={onButtonClick} className="retry-button">
        Retry
      </button>
    </div>
  )
}
export default FailureView
