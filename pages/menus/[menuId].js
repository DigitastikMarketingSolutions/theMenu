import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import styles from "../../styles/Menu.module.scss";
import Footer from "../../components/Footer";
import axios from "../../utils/axios";
import {
    Button,
    Menu,
    MenuItem,
    Modal,
    Snackbar,
    Tab,
    Tabs,
} from "@material-ui/core";
import MenuComp from "../../components/Menu";
import Link from "next/link";
import { Home, Share } from "@material-ui/icons";
import SwipeableViews from "react-swipeable-views";

export default function MenuPage(props) {
    const router = useRouter();
    const menuId = router.query.menuId;
    const [menu, setMenu] = useState({});
    const [menuDrawer, setMenuDrawer] = useState(null);
    const [open, setOpen] = useState(false);
    const [menuLabel, setMenuLabel] = useState([]);
    const [menuNum, setMenuNum] = useState(0);
    const colorScheme = {
        primary1: "#0b0c10",
        primary2: "#1f2833",
        secondary1: "#66fcf1",
        secondary2: "#45a29e",
    };

    useEffect(() => {
        setMenu(props.data);
        console.log(props.data)
        let labels = []
        Object.keys(props.data).forEach(i => {
            if(i.includes('menu')){
                labels.push(i)
            }
        });
        setMenuLabel(curr => {
            return labels.length === 1 ? ['menu'] : [...labels]
        })
        console.log(labels)
    }, [setMenu, setMenuLabel, props.data]);

    return (
        <div className={styles.menu}>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="true"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;800&family=Poppins:wght@800&family=Montserrat&family=Rock+Salt&family=Varela+Round&family=Permanent+Marker&display=swap"
                    rel="stylesheet"
                />
            </Head>
            {/* <Modal open={!menu.menu}>
                <div
                    style={{
                        position: "relative",
                        width: "99vw",
                        height: "99vh",
                        backgroundColor: "#f9f2e2",
                        top: "0.5vh",
                        left: "0.5vw",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <h1>Please wait!<br/>Menu incoming ...</h1>
                </div>
            </Modal> */}
            <h1
                onClick={() => {
                    router.push(`/joints/${menu.jointId}`);
                }}
            >
                {menu.joint}&nbsp;
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
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    marginBottom: "-38px",
                }}
            >
                <Link href={`/`}>
                    <Home
                        fontSize={"large"}
                        style={{
                            color: "black",
                            marginLeft: "10vw",
                            cursor: "pointer",
                        }}
                    />
                </Link>
                <Share
                    fontSize={"large"}
                    style={{
                        color: "black",
                        visibility: menuLabel.length ? "visible" : "hidden",
                        margin: "0 10px",
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        navigator.clipboard.writeText(
                            `https://trythemenu.com/menus/${menuId}`
                        );
                        setOpen(true);
                    }}
                />
                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    message="Link is copied to the clipboard."
                />
            </div>
            {menuLabel.length !== 1 ? <Tabs
                value={menuNum}
                centered
                onChange={(e, value) => setMenuNum(value)}
                style={{margin: '50px 0 -30px 0'}}
            >
                {menuLabel.map((i, idx) => (
                    <Tab style={{fontWeight: '600', fontFamily: "'Rubik', sans-serif"}} key={idx} label={`${i.split('menu')[0]} Menu`}/>
                ))}
            </Tabs>
            : null}
            <Button
                className={styles.menuDrawer}
                color="primary"
                variant="outlined"
                style={{
                    color: "black",
                    border: `solid 2px ${colorScheme.primary2}`,
                    backgroundColor: "white",
                    fontFamily: "'Rubik', sans-serif",
                    fontWeight: 600,
                    visibility: menuLabel.length ? 'visible' : 'hidden',
                    margin: menuLabel.length===1 ? '0 20px' : '-70px 20px 70px 20px',
                    alignSelf: 'end',
                    fontSize: '15px'
                }}
                onClick={(e) => {
                    setMenuDrawer(e.currentTarget);
                }}
            >
                Categories
            </Button>
            <Menu
                open={!!menuDrawer}
                onClose={() => setMenuDrawer(null)}
                anchorEl={menuDrawer}
                anchorPosition={{ top: 40, left: 40 }}
                PaperProps={{
                    style: {
                        left: "50%",
                        transform: "translateX(-25px) translateY(47px)",
                        backgroundColor: "#2f2f2f",
                        maxHeight: "60vh",
                    },
                }}
                MenuListProps={{
                    style: {
                        color: "white",
                    },
                }}
            >
                {menuLabel.length
                    ? Object.keys(menu[menuLabel[menuNum]]).map((i, idx) => (
                        //   <Link href={`/menus/${menuId}/#${idx}`}>
                              <MenuItem
                                key={idx}
                                style={{
                                    borderBottom: "solid 2px white",
                                    margin: "0 10px",
                                    fontFamily: "'Rubik', sans-serif",
                                    fontWeight: 400,
                                }}
                                onClick={async () => {
                                    setMenuDrawer(null)
                                    let section = await document.getElementById(`${i+menuLabel[menuNum]}`)
                                    console.log(section)
                                    section.scrollIntoView({behavior: 'smooth', block: 'start'})
                                }}
                              >
                                  {i}
                              </MenuItem>
                        //   </Link>
                      ))
                    : null}
            </Menu>
            {/* {menu.menu
                ? Object.keys(menu.menu).map((i, idx) => (
                      <div className={styles.sections} key={i}>
                          <h1
                              style={{
                                  color: "black",
                                  fontSize: "2.2rem",
                                  paddingTop: "30px",
                                  marginTop: "0",
                                  fontFamily: "'Rubik', sans-serif",
                                  fontWeight: 800,
                              }}
                              id={idx}
                          >
                              &quot;&nbsp;{i}&nbsp;&quot;
                          </h1>
                          {menu.menu[i].map((item) => {
                              return (
                                  <div
                                      key={item.name}
                                      style={{
                                          width: "100%",
                                          display: "flex",
                                          justifyContent: "space-between",
                                      }}
                                  >
                                      <Food
                                          name={item.name}
                                          desc={item.desc}
                                          isVeg={item.isVeg}
                                          spicy={item.spicy}
                                          price={item.price}
                                      />
                                  </div>
                              );
                          })}
                      </div>
                  ))
                : menu.menu === "" ? 
                    <h1>Puja Special Menu Coming Soon...</h1> :
                    null
                } */}
            {/* {menu.menu ? (
                    <MenuComp menu={menu.menu} menuId={menuId} />
                ) : (
                    null
                )
            } */}
            {menuLabel.length !==1 ? <SwipeableViews
                axis="x"
                index={menuNum}
                onChangeIndex={(index) => setMenuNum(index)}
                style={{width: '100vw'}}
            >
                {
                    menuLabel.map((i, idx) => {
                        return menu[i] ? (
                            <div key={idx}><MenuComp menu={menu[i]} menuName={i} menuId={menuId} /></div>
                        ) : (
                            null
                        )
                    })
                }
            </SwipeableViews> : 
            menu.menu ? (
                <MenuComp menu={menu.menu}  menuName={'menu'} menuId={menuId} />
            ) : null
            }
            <Footer />
        </div>
    );
}

export async function getServerSideProps(context) {
    let response = await axios.get(`/menus/${context.params.menuId}`, {headers: {'Access-Control-Allow-Origin': '*'}})
    return {
      props: {
          data: response.data
      }
    }
}