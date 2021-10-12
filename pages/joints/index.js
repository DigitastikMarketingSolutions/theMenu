import {useState, useEffect} from 'react'
import Head from "next/head"
import {TextField} from '@material-ui/core'
import {useRouter} from "next/router"
import axios from '../../utils/axios'
import styles from '../../styles/Joints.module.scss'

const jointNames = {
    cafe: "Pubs and Cafes",
    restaurant: "Restaurants",
    bakery: "Bakeries",
    cloud: "Cloud Kitchens",
    tapri: "Chai Tapris"
}

export default function Joints() {
    const router = useRouter();
    const type = router.query.type;
    const [joints, setJoints] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    useEffect(() => {
        axios({
            url: `/joints?type=${type}`,
            method: "get",
            headers: { "Access-Control-Allow-Origin": "*" },
        })
            .then((res) => res.data)
            .then((data) => {
                setJoints(data)
                setFilteredData(data)
            });
            
    }, [setJoints, type]);
    const handleSearchInput = (e) => {
        const filter = e.target.value === "" ? joints:  joints.filter(
            (i) =>
                i.name?.toLowerCase().includes(e.target.value.toLowerCase())
        );
        console.log(filter);
        setFilteredData(filter);
    };

    return (
        <div className={styles.page}>
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
            <div className={styles.heading}>
                <h1>Food Hubs!</h1>
                {type? <h3>{jointNames[type]}</h3> : null}
            </div>
            <TextField
                className={styles.menusSearchInput}
                onChange={handleSearchInput}
                label="Search ..."
                variant="filled"
                InputProps={{
                    style: {color: "white"}
                }}
                InputLabelProps={{
                    style: {color: "wheat"}
                }}
                SelectProps={{
                    style: {borderBottom: '2px solid white'}
                }}
                type="search"
            />
            <div
                style={{
                    position: "relative",
                    zIndex: "3",
                }}
            >
                {filteredData.length
                    ? filteredData.map((i) => (
                          <div
                              key={i.name}
                              className={styles.menusSearchResults}
                              onClick={() => router.push(`/joints/${i._id}`)}
                          >
                              <h1>{i.name}</h1>
                              <h3>{i.address}</h3>
                          </div>
                      ))
                    : joints.length ? <div className={styles.message}>Sorry, there are no {jointNames[type]} with that name!</div> : <div className={styles.message}> Sorry, we don&apos;t have any {jointNames[type]} on our platform yet.<br/><br/>But, stay tuned.</div>}
            </div>
        </div>
    )
}
