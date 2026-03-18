import {Component} from 'react'
import TabItem from '../TabItem'
import ImageItem from '../ImageItem'
import './index.css'

class MatchGame extends Component {
  state = {
    isGameRunning: true,
    score: 0,
    timer: 60,
    activeTabId: this.props.tabsList[0].tabId,
    matchImage: this.props.imagesList[0],
  }

  componentDidMount() {
    this.timerID = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick = () => {
    const {timer} = this.state
    if (timer === 0) {
      clearInterval(this.timerID)
      this.setState({isGameRunning: false})
    } else {
      this.setState(prevState => ({timer: prevState.timer - 1}))
    }
  }

  clickTab = tabId => {
    this.setState({activeTabId: tabId})
  }

  clickThumbnail = id => {
    const {matchImage} = this.state
    const {imagesList} = this.props

    if (matchImage.id === id) {
      const randomImage =
        imagesList[Math.floor(Math.random() * imagesList.length)]
      this.setState(prevState => ({
        score: prevState.score + 1,
        matchImage: randomImage,
      }))
    } else {
      clearInterval(this.timerID)
      this.setState({isGameRunning: false})
    }
  }

  resetGame = () => {
    const {tabsList, imagesList} = this.props
    this.setState({
      isGameRunning: true,
      score: 0,
      timer: 60,
      activeTabId: tabsList[0].tabId,
      matchImage: imagesList[0],
    })
    this.timerID = setInterval(this.tick, 1000)
  }

  renderScorecard = () => {
    const {score} = this.state
    return (
      <div className="scorecard-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
          alt="trophy"
          className="trophy-image"
        />
        <p className="scorecard-heading">YOUR SCORE</p>
        <p className="final-score">{score}</p>
        <button
          type="button"
          className="play-again-button"
          onClick={this.resetGame}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
            alt="reset"
            className="reset-icon"
          />
          PLAY AGAIN
        </button>
      </div>
    )
  }

  renderGameView = () => {
    const {activeTabId, matchImage} = this.state
    const {tabsList, imagesList} = this.props
    const filteredImages = imagesList.filter(
      eachImage => eachImage.category === activeTabId,
    )

    return (
      <div className="game-view-container">
        <img src={matchImage.imageUrl} alt="match" className="match-image" />
        <ul className="tabs-list">
          {tabsList.map(eachTab => (
            <TabItem
              key={eachTab.tabId}
              tabDetails={eachTab}
              isActive={eachTab.tabId === activeTabId}
              clickTab={this.clickTab}
            />
          ))}
        </ul>
        <ul className="thumbnails-list">
          {filteredImages.map(eachImage => (
            <ImageItem
              key={eachImage.id}
              imageDetails={eachImage}
              clickThumbnail={this.clickThumbnail}
            />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isGameRunning, score, timer} = this.state

    return (
      <div className="app-container">
        <nav className="navbar">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
              alt="website logo"
              className="website-logo"
            />
          </div>
          <ul className="nav-details">
            <li className="score-details">
              {/* Separated <p> tags to perfectly pass the strict text test */}
              <p className="score-label">Score:</p>
              <p className="score-value">{score}</p>
            </li>
            <li className="timer-details">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="timer-icon"
              />
              <p className="timer-value">{timer} sec</p>
            </li>
          </ul>
        </nav>
        <div className="game-body">
          {isGameRunning ? this.renderGameView() : this.renderScorecard()}
        </div>
      </div>
    )
  }
}

export default MatchGame
