import styles from "../styles/Menus-Tab.module.scss";
import { TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useRouter } from "next/router";
import Head from "next/head";
import restaurantBg from "../public/restaurantBg.jpg";
import cafeBg from "../public/cafeBg.jpg"
import cloudKitchenBg from "../public/cloudKitchenBg.jpg"
import bakeryBg from "../public/bakeryBg.jpg"
import tapriBg from "../public/tapriBg.png"

const jointTypes = [
    { name: "Restaurants", imageUrl: restaurantBg.src, urlQuery: "restaurant" },
    { name: "Cafes & Pubs", imageUrl: cafeBg.src, urlQuery: "cafe" },
    { name: "Cloud Kitchens", imageUrl: cloudKitchenBg.src, urlQuery: "cloud" },
    { name: "Bakeries", imageUrl: bakeryBg.src, urlQuery: "bakery" },
    { name: "Chai-Tapris", imageUrl: tapriBg.src, urlQuery: "tapri" },
];

export default function MenusTab() {
    const router = useRouter();
    const [joints, setJoints] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    useEffect(() => {
        axios({
            url: "/joints",
            method: "get",
            headers: { "Access-Control-Allow-Origin": "*" },
        })
            .then((res) => res.data)
            .then((data) => setJoints(data));
    }, [setJoints]);
    const handleSearchInput = (e) => {
        const filter = joints.filter(
            (i) =>
                e.target.value !== "" &&
                i.name?.toLowerCase().includes(e.target.value.toLowerCase())
        );
        console.log(filter);
        setFilteredData(filter);
    };
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
            <h1
                style={{
                    fontWeight: 600,
                    fontFamily: '"Poppins", sans-serif',
                    padding: "10px",
                    margin: "10px",
                    borderRadius: "6px",
                    fontSize: "3rem",
                    textAlign: "center",
                    color: "black",
                }}
            >
                Food Hubs!
            </h1>
            <TextField
                className={styles.menusSearch}
                onChange={handleSearchInput}
                label="Search for menus ..."
                variant="filled"
                style={{
                    backgroundColor: "#2f2f2f",
                    borderRadius: "5px 5px 0 0",
                    border: "solid 1px #666",
                    padding: "2px",
                }}
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
                          <h2
                              key={i.name}
                              style={{
                                  width: "80vw",
                                  backgroundColor: "white",
                                  fontWeight: 400,
                                  fontFamily: '"Poppins", sans-serif',
                                  padding: "10px",
                                  margin: "10px",
                                  borderRadius: "6px",
                                  cursor: "pointer",
                                  position: "relative",
                                  zIndex: "3",
                              }}
                              onClick={() => router.push(`/joints/${i._id}`)}
                          >
                              {i.dispName}
                          </h2>
                      ))
                    : null}
            </div>
            <div className={styles.jointTypes}>
                <h2 style={{ color: "black", fontSize: "2rem" }}>
                    Search by type!
                </h2>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        width: "90vw",
                        // scrollbarColor: '#6f6f6f',
                        scrollbarColor: "#6f6f6f rgba(0, 0, 0, 0.2)",
                        scrollbarWidth: "5px",
                    }}
                >
                    {jointTypes.map((i) => (
                        <div
                            className={styles.jointCards}
                            style={{
                                backgroundImage: `url(${i.imageUrl})`,
                                backgroundSize: "cover",
                                cursor: "pointer"
                            }}
                            key={i.name}
                            onClick={() => router.push(`/joints?type=${i.urlQuery}`)}
                        >
                            <div>{i.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
