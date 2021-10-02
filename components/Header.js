import styles from '../styles/Header.module.scss'
import Image from 'next/image'
import logo from '../public/logo.png'
import { Typography } from "@material-ui/core";

export default function Header(){
    return(
        <div className={styles.header}>
            <div className={styles.header__main}>
                <Image width={160} height={120} src={logo} alt="The Menu"/>
                <Typography variant="h1" gutterBottom={true}>Eat . Play . Share</Typography>
            </div>
        </div>
    )
}
