import Image from 'next/image'
import Head from 'next/head'
import styles from "../../styles/Games-Tab.module.css"
import logo from "../../public/spinningWheelLogo.png"
import { useRouter } from 'next/router'

function Games() {
    const router = useRouter()
    return (
        <div className={styles.games}>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={true}/>
                <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet"/>
            </Head>
            <div  className={styles.card} onClick={() => router.push('/games/spinning-wheel')}>
                <Image src={logo} width={200} height={200} alt=""/>
            </div>
            <div style={{display: "flex", width: '100vw', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-evenly'}}>
                <div className={styles.card} onClick={() => router.push('/games/solo')}>
                    <h1 data-text="SOLO">SOLO</h1>
                </div>
                <div className={styles.card} onClick={() => router.push('/games/squad')}>
                    <h1 data-text="SQUAD">SQUAD</h1>
                </div>
            </div>
        </div>
    )
}

export default Games
