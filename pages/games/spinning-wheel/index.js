import { Modal } from '@material-ui/core';
import React from 'react';

import Wheel from '../../../spinning-wheel-game-react/src';

export default class App extends React.Component {
  constructor() {
    super();
    this.places = ['3%', '5%', '%8', '10%', '15%'];
    this.state = {
      modalOpen: false,
      selected: null
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Get your Discount</h1>
        <Wheel items={this.places} handleResult={(result) => this.setState({selected: result, modalOpen: true})}/>
        <Modal open={this.state.modalOpen} onClose={() => this.setState(c => ({...c, modalOpen: false}))}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',position: 'absolute', top: '30vh', left: '10vw', height: '40vh', width: '80vw', backgroundColor: 'wheat', color: 'black'}}>
            <h1>You got {this.places[this.state.selected]} discount!</h1>
          </div>
        </Modal>
      </div>
    );
  }
}