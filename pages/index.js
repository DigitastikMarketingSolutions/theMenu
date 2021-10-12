import styles from "../styles/Home.module.scss";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeTab from "../components/HomeTab";
import GamesTab from "../components/GamesTab";
import MenusTab from "../components/MenusTab";
import BlogsTab from "../components/BlogsTab";
import { Tabs, Tab, MuiThemeProvider, responsiveFontSizes, createTheme } from "@material-ui/core";
import { HomeOutlined, SportsEsportsOutlined, RestaurantMenuOutlined, BookOutlined } from "@material-ui/icons";
import SwipableViews from 'react-swipeable-views'
import { useState } from "react";

export default function HomePage() {
    let theme = createTheme();
    theme = responsiveFontSizes(theme);

    const [tab, setTab] = useState(0)

    return (
        <MuiThemeProvider theme={theme}>
            <div className={styles.home}>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={true}/>
                    <link href="https://fonts.googleapis.com/css2?family=Rock+Salt&family=Varela+Round&display=swap" rel="stylesheet"/>
                </Head>
                <Header/>
                <Tabs
                    indicatorColor="secondary"
                    textColor="secondary"
                    centered
                    value={tab}
                    onChange={(e, value) => setTab(value)}
                >
                    {/* <Tab icon={<HomeOutlined/>} label="Home"></Tab> */}
                    <Tab icon={<SportsEsportsOutlined/>} label="Games"></Tab>
                    <Tab icon={<RestaurantMenuOutlined/>} label="Menus"></Tab>
                    <Tab icon={<BookOutlined/>} label="Blogs"></Tab>
                </Tabs>
                <SwipableViews axis="x" index={tab} onChangeIndex={(index) => setTab(index)}>
                    {/* <HomeTab hidden={tab!==0}/> */}
                    <GamesTab hidden={tab!==0}/>
                    <MenusTab hidden={tab!==1}/>
                    <BlogsTab hidden={tab!==2}/>
                </SwipableViews>
                <Footer />
            </div>
        </MuiThemeProvider>
    );
}
