import React from 'react';
import NavMain from '../NavMain';
import animationData from '../../../public/logo-animation/data.json';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import './index.scss';

const loadPhaseImages = [
  {
    src: '/background-brooklyn-cropped-masked.png',
  },
  {
    src: '/clouds-tile.png',
  }
];

const delayBtwCloudsAndLogo = 500;
let loadPhase = 0;

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      isStopped: false,
      isPaused: false,
      loadPhase: 0,
    };
  }

  componentDidMount() {
    this.setState({
      isLoaded: true,
    });
  }

  handleImageLoaded = e => {
    // use loadPhase instead of this.state.loadPhase to ensure that
    // react doesn't skip one when it optimizes
    ++loadPhase;

    if (loadPhase === 2) {
      this.setState({
        loadPhase: loadPhase,
      });

      setTimeout(() => {
        ++loadPhase

        this.setState({
          loadPhase: loadPhase
        });
      }, delayBtwCloudsAndLogo);
    }
  }

  handleImageError = e => {
    console.log('One of the images failed to load')
  }

  render() {
    // for temp testing
    let shouldShowClouds = true;
    let shouldShowDemo;

    if (typeof window !== 'undefined' && window.location.search.indexOf('demo') > 0) {
      shouldShowDemo = true;
    }

    const defaultOptions = {
      // loop, but we'll pause the animation at the end of each loop.
      loop: false,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      },
    };

    const imgSrc0 = this.state.isLoaded ? loadPhaseImages[0].src : null;
    const imgSrc1 = this.state.isLoaded ? loadPhaseImages[1].src : null;

    return (
      <div className={`page page-home ${shouldShowClouds ? 'page-clouds' : ''} ${shouldShowDemo ? 'demo' : ''}`}>
        <div className="hidden-preloaders">
          <img src={imgSrc0} onLoad={this.handleImageLoaded} onError={this.handleImageError} />
          <img src={imgSrc1} onLoad={this.handleImageLoaded} onError={this.handleImageError} />
        </div>
        <NavMain activePage='home'/>
        <div className="page-inner">
          <div className="page-panel">
            <h1>SIGN UP</h1>

            <Form.Group>
              <Form.Label>Generate Master Password</Form.Label>
              <Form.Control type="password" placeholder="Generate me!" disabled="true" />
            </Form.Group>

            <Form.Group>
              <Button className="generate-button" variant="secondary">Generate</Button>
              <Button className="copy-button" variant="secondary">Copy</Button>
            </Form.Group>

            <div className="divider">OR</div>

            <Form.Group>
              <Form.Label>Choose your Master Password</Form.Label>
              <Form.Control type="password" placeholder="xxxxxxxxxxxxxxxx" />
              <a className="info">Why 15 characters?</a>
            </Form.Group>

            <Form.Group>
              <a href="/signup_confirmation">
                <Button className="next-button" variant="secondary">
                  Next
                </Button>
              </a>
            </Form.Group>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
