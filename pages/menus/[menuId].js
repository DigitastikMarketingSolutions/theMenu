import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from 'next/image'
import styles from "../../styles/Menu.module.scss";
import Footer from "../../components/Footer";
import axios from "../../utils/axios";
import { Button, Menu, MenuItem, Snackbar } from "@material-ui/core";
import Food from "../../components/Food";
import Link from "next/link";
import menuBg from "../../public/MenuBG1.jpg"
import { Home, Share } from "@material-ui/icons";

export default function MenuPage() {
    const router = useRouter();
    const menuId = router.query.menuId;
    const [menu, setMenu] = useState({});
    const [menuDrawer, setMenuDrawer] = useState(null);
    const [open, setOpen] = useState(false);
    const colorScheme = {
        primary1 : '#0b0c10',
        primary2: '#1f2833',
        secondary1 : '#66fcf1',
        secondary2 : '#45a29e',
    }

    useEffect(() => {
        if (menuId) {
            axios({
                url: `/menus/${menuId}`,
                method: "get",
                headers: {'Access-Control-Allow-Origin': '*'}
            })
                .then((res) => res.data)
                .then((menu) => {
                    console.log(menu);
                    setMenu(menu);
                })
                .catch((err) => console.log(err));
        }
    }, [menuId, setMenu]);

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
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&family=Montserrat&family=Rock+Salt&family=Varela+Round&family=Permanent+Marker&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <h1>{menu.joint}&nbsp;<span style={{fontSize: '4rem', display: 'inline-block', height: '2rem', marginTop: '-2rem'}}>.</span></h1>
            <div style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '-38px'}}>
                <Link href={`/`}>
                    <Home fontSize={'large'} style={{color: 'black', marginLeft: '10vw',}}/>
                </Link>
                <Share fontSize={'large'} style={{color: 'black', margin: '0 10px',}} onClick={() => {
                    navigator.clipboard.writeText(`https://trythemenu.com/menus/${menuId}`)
                    setOpen(true)
                }}/>
                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    message="Link is copied to the clipboard."
                />
            </div>
                <Button
                    className={styles.menuDrawer}
                    color="primary"
                    variant="outlined"
                    style={{ color: 'black', border: `solid 2px ${colorScheme.primary2}`, backgroundColor: 'white', fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
                    onClick={(e) => {
                        setMenuDrawer(e.currentTarget);
                    }}
                >
                    Menu
                </Button>
                <Menu
                    open={!!menuDrawer}
                    onClose={() => setMenuDrawer(null)}
                    anchorEl={menuDrawer}
                    anchorPosition={{ top: 40, left: 40 }}
                    PaperProps={{
                        style: {
                            left: "50%",
                            transform: "translateX(-25px) translateY(40px)",
                            backgroundColor: '#2f2f2f',
                            height: "60vh"
                        },
                    }}
                    MenuListProps={{
                        style: {
                            color: "white",
                        },
                    }}
                >
                    {menu.menu
                        ? Object.keys(menu.menu).map((i, idx) => (
                            <Link key={i} href={`/menus/${menuId}/#${idx}`}>
                                <MenuItem
                                    style={{
                                        borderBottom: 'solid 2px white',
                                        margin: "0 10px",
                                        fontFamily: "'Poppins', sans-serif",
                                        fontWeight: 400
                                    }}
                                    onClick={() => setMenuDrawer(null)}
                                >
                                    {i}
                                </MenuItem>
                            </Link>
                          ))
                        : null}
                </Menu>
            {menu.menu
                ? Object.keys(menu.menu).map((i, idx) => (
                      <div className={styles.sections} key={i}>
                          <h1 style={{color: "black", fontSize: '2.2rem', paddingTop: '30px', marginTop: '0', fontFamily: "'Poppins', sans-serif", fontWeight: 800}} id={idx}>&quot;&nbsp;{i}&nbsp;&quot;</h1>
                          {menu.menu[i].map((item) => {
                              return (
                                  <div key={item.name} style={{width: '100%', display: 'flex', justifyContent: "space-between"}}>
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
                : null}
            <Footer/>
        </div>
    );
}
