import {useRouter} from 'next/router'
import styles from '../styles/Games-Tab.module.css'

export default function GamesTab(){
    const router = useRouter()
    return (
        <div className={styles.gamesTab}>
            <div className={styles.solo} onClick={() => router.push('/games/spinning-wheel')}>
                <h1 data-text="Spinning Wheel">Spinning Wheel</h1>
            </div>
            <div className={styles.squad} onClick={() => router.push('/games/chess')}>
                <h1 data-text="Let's Play Chess">Let&apos;s Play Chess</h1>
            </div>
        </div>
    )
}