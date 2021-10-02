import styles from '../styles/Menus-Tab.module.scss'
import {TextField} from '@material-ui/core'
import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import Link from 'next/link'
import Head from 'next/head'


export default function MenusTab(){
    const [joints, setJoints] = useState([])
    const [filteredData, setFilteredData] = useState([])
    useEffect(() => {
        axios({
            url: '/joints',
            method: 'get',
            headers: {'Access-Control-Allow-Origin': '*'}
        }).then(res => res.data).then(data => setJoints(data))
    }, [setJoints])
    const handleSearchInput = (e) => {
        const filter = joints.filter(i => e.target.value !== '' && i.name?.toLowerCase().includes(e.target.value.toLowerCase()))
        console.log(filter)
        setFilteredData(filter)
    }
    return (
        <div className={styles.menusTab}>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="true"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;800&family=Montserrat&family=Rock+Salt&family=Varela+Round&family=Permanent+Marker&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <h1 style={{fontWeight: 400, fontFamily: '"Poppins", sans-serif', padding: '10px', margin: '10px', borderRadius: '6px', fontSize: '1.5rem', textAlign: 'center'}}>Food Hubs!</h1>
            <TextField  className={styles.menusSearch} onChange={handleSearchInput} label="Search for menus ..." variant="filled" color="primary" type="search" />
            <div>
                {filteredData.length ? filteredData.map(i => <h2 style={{width: '80vw', backgroundColor: 'white', fontWeight: 400, fontFamily: '"Poppins", sans-serif', padding: '10px', margin: '10px', borderRadius: '6px'}} key={i.name}><Link href={`/joints/${i._id}`}>{i.name}</Link></h2>) : null}
            </div>
        </div>
    )
}