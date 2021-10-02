import styles from '../styles/Header.module.scss'
import Image from 'next/image'
import logo from '../public/logo.png'
import { Button, Typography } from "@material-ui/core";
import { useEffect, useRef } from 'react';

export default function Header(props){

  useEffect(()=>{
    props.handleHeight(header.current.offsetHeight)
  })
  const header = useRef(null)
    return(
        <div ref={header} className={styles.header}>
          <div className={styles.header__main}>
            <Image width={160} height={120} src={logo} alt="The Menu"/>
            <Typography variant="h1" gutterBottom={true}>Eat . Play . Share</Typography>
          </div>
          {/* <form action="/" className="d-flex">
            <input type="search" placeholder="Search" aria-label="Search"/>
            <Button color="primary" variant="contained" type="submit">Search</Button>
          </form> */}
        </div>
    )
}
