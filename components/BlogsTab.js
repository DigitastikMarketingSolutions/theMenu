import styles from '../styles/Blogs-Tab.module.scss'
import Head from 'next/head'

export default function BlogsTab(){
    return (
        <div className={styles.blogsTab}>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="true"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Rubik:wght@400&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <h1>Blogs Coming Soon ...</h1>
        </div>
    )
}