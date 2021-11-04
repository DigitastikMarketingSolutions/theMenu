import { Button, Menu, MenuItem } from "@material-ui/core";
import styles from "../styles/Menu.module.scss";
import { useRouter } from 'next/router';
import Link from 'next/link';
import Food from "./Food";
import { useState } from "react";

export default function MenuComp(props) {

    const colorScheme = {
        primary1: "#0b0c10",
        primary2: "#1f2833",
        secondary1: "#66fcf1",
        secondary2: "#45a29e",
    };

    const [menuDrawer, setMenuDrawer] = useState(null);

    const router = useRouter();

    return (
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
            {/* <Button
                className={styles.menuDrawer}
                color="primary"
                variant="outlined"
                style={{
                    color: "black",
                    border: `solid 2px ${colorScheme.primary2}`,
                    backgroundColor: "white",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    visibility: props.menu ? 'visible' : 'hidden'
                }}
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
                {props.menu
                    ? Object.keys(props.menu).map((i, idx) => (
                        // <Link key={i} href={`/menus/${props.menuId}/#${idx}`}>
                            <MenuItem
                                key={i}
                                style={{
                                    borderBottom: "solid 2px white",
                                    margin: "0 10px",
                                    fontFamily: "'Poppins', sans-serif",
                                    fontWeight: 400,
                                }}
                                onClick={() => {
                                    setMenuDrawer(null)
                                    // router.push(`/menus/${menuId}/#${idx}`)
                                    document.getElementById(`${idx}`).scrollIntoView()
                              }}
                            >
                                {i}
                            </MenuItem>
                        // </Link>
                      ))
                    : null}
            </Menu> */}
            {props.menu
                ? Object.keys(props.menu).map((i, idx) => (
                      <div className={styles.sections} key={idx}>
                          <h1
                              style={{
                                  width: '100%',
                                  color: "black",
                                  fontSize: "2.2rem",
                                  paddingTop: "30px",
                                  marginTop: "0",
                                  fontFamily: "'Poppins', sans-serif",
                                  fontWeight: 800,
                              }}
                              id={i}
                          >
                              &quot;&nbsp;{i}&nbsp;&quot;
                          </h1>
                          {props.menu[i].map((item, idx) => {
                              return (
                                  <div
                                      key={idx}
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
                : props.menu === "" ? 
                    <h1>Puja Special Menu Coming Soon...</h1> :
                    null
                }
        </div>
    )
}
