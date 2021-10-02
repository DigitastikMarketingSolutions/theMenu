import { makeStyles } from '@material-ui/core'
import Head from 'next/head'

const styles = {
    item: {
        width: '100%',
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
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@800&family=Montserrat&family=Rock+Salt&family=Varela+Round&family=Permanent+Marker&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <h3 style={styles.heading}>
                {isVeg ? <span style={styles.veg}>&#128994;</span> : <span style={styles.nonVeg}>&#128308;</span>}
                <div style={styles.foodName}>{name}</div>
                <div>
                    {new Array(spicy).fill(0).map((_) => "🌶️")}
                </div>
            </h3>
            <div style={styles.details}>
                <span  style={styles.desc}>{desc ? desc : null}</span>
                <span style={styles.price}>₹ {price}</span>
            </div>
        </div>
    );
}
