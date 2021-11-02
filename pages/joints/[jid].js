import styles from '../../styles/Menu.module.scss'
import axios from '../../utils/axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import {Button} from '@material-ui/core';
import {Home} from '@material-ui/icons';

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
                setJoint(data)
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
                <Home fontSize="large" style={{color: 'black', cursor: 'pointer'}} onClick={() => {
                    router.replace('/')
                }}/>
            </div>
            {joint.menu? <>
            <h1>
                {joint.dispName}&nbsp;
                <span
                    style={{
                        fontSize: "4rem",
                        display: "inline-block",
                        height: "2rem",
                        marginTop: "-2rem",
                    }}
                >
                    .
                </span>
            </h1>
            <div>
                <div className={styles.details}>
                    <h3>{joint.address}</h3>
                    <h4>Cuisines: {joint.cuisine?.join(', ')}</h4>
                    <h4>Opens At: {joint.opensAt ? handleTime(joint.opensAt) : null}</h4>
                    {joint.phone ? <h4>Contact us at {joint.phone}!</h4> : null}
                    <Button style={{width: '200px', alignSelf: 'center'}} variant="contained" color="primary" onClick={() => router.push(`/menus/${joint.menu}?b=1`)}>Check our Menu</Button>
                </div>
                <iframe src={joint.directions} width={300} height={225} style={{padding: '5px', border: 'solid 2px black', borderRadius: '5px'}} allowFullScreen loading="lazy"></iframe>
            </div>
            </> : null}
        </div>
    )
}

// https://docs.google.com/document/d/1g47HMvyoFJl13Iggtbu5vokiQG1ZiU1iRXgSXXpdqOM/edit