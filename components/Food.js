import { makeStyles } from '@material-ui/core'
import Head from 'next/head'

const styles = {
    item: {
        width: '100vw',
        // margin: '10px',
        borderBottom: 'solid 1px black',
        color: "white"
    },
    heading: {
        display: 'flex',
        alignItems: 'center',
    },
    veg: {
        border: 'solid 1px green',
        padding: '2px',
        backgroundColor: 'white',
        fontSize: '10px',
        display: 'inline-block',
    },
    nonVeg: {
        border: 'solid 1px red',
        padding: '2px',
        backgroundColor: 'white',
        fontSize: '10px',
        display: 'inline-block',
    },
    foodName: {
        display: 'inline-block',
        margin: '0 10px',
        color: 'black'
    },
    details: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: '20px',
    },
    altDetails:{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px',
    },
    desc: {
        display: 'inline-block',
        color: 'black'
    },
    price: {
        display: 'inline-block',
        minWidth: '60px',
        color: 'black',
        fontWeight: 'bold',
        fontSize: '1.1rem'
    },
    altPrice:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: ''
    },
    altPriceSections:{
        color: 'black',
        margin: '20px 20px 0 0',
    }
}

export default function Food(props) {
    const { name, desc, isVeg, spicy, price } = props;
    return (
        <div style={styles.item}>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="true"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Rubik:wght@800&family=Montserrat&family=Rock+Salt&family=Varela+Round&family=Permanent+Marker&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <h3 style={styles.heading}>
                <div  style={{border: isVeg ? 'solid 1px green' : 'solid 1px red', padding: '2px', backgroundColor: 'white', height: '16px', width: '16px', display: isVeg===undefined ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{height: '10px', width: '10px', display: 'inline-block', margin: '0', borderRadius: '50%', backgroundColor: isVeg ? 'green' : 'red'}}></div>
                </div>
                <div style={styles.foodName}>{name}</div>
                <div>
                    {new Array(spicy?spicy:0).fill(0).map((_) => "🌶️")}
                </div>
            </h3>
            <div style={typeof(price)==="number" ? styles.details : styles.altDetails}>
                {desc ? <span  style={styles.desc}>{desc}</span> : null}
                {typeof(price)==="number" ? 
                    <span style={styles.price}>₹ {price}</span> : 
                    <div style={styles.altPrice}>{price.map((i, idx)=><span style={styles.altPriceSections} key={idx}><b>₹ {i.price}</b> for {i.quan}</span>)}</div>
                }
            </div>
        </div>
    );
}
