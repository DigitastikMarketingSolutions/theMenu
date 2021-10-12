import {useRouter} from 'next/router'
import styles from '../styles/Games-Tab.module.css'

export default function GamesTab(){
    const router = useRouter()
    return (
        <div className={styles.gamesTab}>
            <div className={styles.solo} onClick={() => router.push('/games/solo')}>
                <h1 data-text="SOLO">SOLO</h1>
            </div>
            <div className={styles.squad} onClick={() => router.push('/games/squad')}>
                <h1 data-text="SQUAD">SQUAD</h1>
            </div>
        </div>
    )
}