import Head from 'next/head'
import Image from 'next/image'
import { Modal } from '@material-ui/core';
import React from 'react';
import SpinningWheel from '../../../components/SpinningWheel';
import styles from "../../../styles/SpinningWheel.module.css"
import ad from '../../../public/modalAd.jpg'

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
      <div  className={styles.page}>
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin="true"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&family=Montserrat&family=Rock+Salt&family=Varela+Round&family=Permanent+Marker&display=swap"
                rel="stylesheet"
            />
        </Head>
        <h1>
                Get your Discount&nbsp;
                <span
                    style={{
                        fontSize: "4rem",
                        display: "inline-block",
                        height: "2rem",
                        marginTop: "-2rem",
                        color: 'black'
                    }}
                >
                    .
                </span>
            </h1>
        <SpinningWheel handleModal={(result) => this.setState({selected: result, modalOpen: true})}/>
        <Modal open={this.state.modalOpen} onClose={() => this.setState(c => ({...c, modalOpen: false}))}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center',position: 'absolute', top: '20vh', left: '10vw', height: '60vh', width: '80vw', backgroundColor: 'black', color: 'black', padding: '10px'}}>
            <div className={styles.modalAd}><Image objectFit="cover" src={ad} alt="" /></div>
            <h1 className={styles.modalHead}>You got {this.places[this.state.selected]} discount!</h1>
          </div>
        </Modal>
      </div>
    );
  }
}