import styles from '../../styles/Menu.module.scss'
import axios from '../../utils/axios';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import {Button} from '@material-ui/core'
import {ArrowBack} from '@material-ui/icons'

export default function Joint(){
    const router = useRouter();
    const {jid} = router.query;
    const [joint, setJoint] = useState({})

    useEffect(() => {
        if(jid){
            axios({
                url: `/joints/${jid}`,
                method: "get",
                headers: {'Access-Control-Allow-Origin': '*'}
            }).then(res => res.data).then(data => {
                setJoint(data.data)
                console.log(data.message)
            }).catch(err => console.error(err))
        }
    }, [setJoint, jid])

    const handleTime = (num) => {
        const hour = parseInt(num.toString().slice(0,2))
        const min = num.toString().slice(2)
        let result;
        if (hour<12){
            result = hour.toString() + ':' + min + ' a.m'
        } else if(hour===12){
            result = hour.toString() + ':' + min + ' p.m'
        } else {
            result = (hour-12).toString() + ':' + min + ' p.m'
        }
        return result
    }

    return (
        <div className={styles.joint}>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="true"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;800&family=Rock+Salt&family=Varela+Round&family=Permanent+Marker&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <div style={{display: 'flex', justifyContent: 'flex-start', padding: '10px'}}>
                <ArrowBack fontSize="large" style={{color: 'white'}} onClick={() => {
                    router.replace('/')
                }}/>
            </div>
            <h1>{joint.name}</h1>
            <div>
                <div className={styles.details}>
                    <h3>{joint.address}</h3>
                    <h4>Cuisines: {joint.cuisine?.join(', ')}</h4>
                    <h4>Opens At: {joint.opensAt ? handleTime(joint.opensAt) : null}</h4>
                    <Link href={`/menus/${joint.menu}`}>
                        <Button variant="contained" color="primary">Check our Menu</Button>
                    </Link>
                </div>
                <iframe src={joint.directions} width={300} height={225} style={{border: 0}} allowFullScreen loading="lazy"></iframe>
            </div>
        </div>
    )
}