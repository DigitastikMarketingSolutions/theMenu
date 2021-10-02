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
import { useState, useRef, useEffect } from "react";

export default function HomePage() {
    let theme = createTheme();
    theme = responsiveFontSizes(theme);
    const tabs = useRef(null)
    const tabsPanel = useRef(null)

    const [tab, setTab] = useState(0)
    const [headerHeight, setHeaderHeight] = useState(0)

    // useEffect(() => {
    //     console.log(headerHeight)
    // }, [headerHeight])
    // useEffect(() => {
    //     if(window){
    //         tabs.current.children[0].style.height = `${window.screen.height - tabs.current.offsetTop}px`
    //     }
    //     // console.log(tabs.current.children[0])
    // })
    return (
        <MuiThemeProvider theme={theme}>
            <div className={styles.home}>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={true}/>
                    <link href="https://fonts.googleapis.com/css2?family=Rock+Salt&family=Varela+Round&display=swap" rel="stylesheet"/>
                </Head>
                <Header handleHeight={(height) => setHeaderHeight(height)}/>
                <Tabs
                innerRef={tabsPanel}
                    indicatorColor="secondary"
                    textColor="secondary"
                    centered
                    value={tab}
                    onChange={(e, value) => setTab(value)}
                >
                    <Tab icon={<HomeOutlined/>} label="Home"></Tab>
                    <Tab icon={<SportsEsportsOutlined/>} label="Games"></Tab>
                    <Tab icon={<RestaurantMenuOutlined/>} label="Foods"></Tab>
                    <Tab icon={<BookOutlined/>} label="Blogs"></Tab>
                </Tabs>
                <div ref={tabs}>
                    <SwipableViews style={styles.tabs} axis="x" index={tab} onChangeIndex={(index) => setTab(index)}>
                        <HomeTab hidden={tab!==0}/>
                        <GamesTab hidden={tab!==1}/>
                        <MenusTab hidden={tab!==2}/>
                        <BlogsTab hidden={tab!==3}/>
                    </SwipableViews>
                </div>
                <Footer />
            </div>
        </MuiThemeProvider>
    );
}
