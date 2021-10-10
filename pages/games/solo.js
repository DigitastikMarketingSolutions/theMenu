import styles from "../../styles/SoloGames.module.scss"
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Solo() {
    const router = useRouter()
    return (
        <div className={styles.solo}>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={true}/>
                <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet"/>
            </Head>
            <div className={styles.card} onClick={() => router.push('/games/chess')}>
                <h1 data-text="Let's Play Chess">Let&apos;s Play Chess</h1>
            </div>
        </div>
    )
}