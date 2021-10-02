import React, { useState } from "react";
import styles from "../../../styles/Chess.module.scss";
import ChessBoard from "next-chess-board";
import Image from "next/image";
import Head from 'next/head'
import {
    Select,
    FormControl,
    MenuItem,
    InputLabel,
    Button,
    TextField
} from "@material-ui/core";
import { Chessboard } from "../../../components/Chessboard";

export default function Chess() {

    const [config, setConfig] = useState({
        pieces: "default",
        board: 1,
        whitePlayer: "",
        blackPlayer: "",
    });

    const [chessboard, setChessboard] = useState(null)

    return chessboard ? chessboard :  (
        <div className={styles.config}>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
                <link href="https://fonts.googleapis.com/css2?family=Rock+Salt&family=Varela+Round&family=Permanent+Marker&display=swap" rel="stylesheet"/>
            </Head>
            <h1>Let&apos;s Play Chess!</h1>
            <div>
                <div style={{ display: "flex", flexWrap: 'wrap', width: '100%', flexDirection: 'column' , alignItems: "center", justifyContent: "center",}}>
                  <div style={{margin: '20px 0', width: '100%', display: 'flex', flexWrap: "wrap", alignItems: 'center', justifyContent: 'space-evenly', width: '100%'}}>
                      <FormControl className={styles.select} variant="filled">
                          <InputLabel id="demo-simple-select-outlined-label">
                              Pieces
                          </InputLabel>
                          <Select
                              labelId="demo-simple-select-outlined-label"
                              value={config.pieces}
                              onChange={(e) =>
                                  setConfig((curr) => ({
                                      ...curr,
                                      pieces: e.target.value,
                                  }))
                              }
                              label="Pieces"
                          >
                              <MenuItem value={"default"}>Classic</MenuItem>
                              <MenuItem value={"alt1"}>Alt</MenuItem>
                              <MenuItem value={"eyes"}>Eyes</MenuItem>
                              <MenuItem value={"fantasy"}>Fantasy</MenuItem>
                              <MenuItem value={"modern"}>Modern</MenuItem>
                              <MenuItem value={"spatial"}>Spatial</MenuItem>
                          </Select>
                      </FormControl>
                      <FormControl className={styles.select} variant="filled">
                          <InputLabel id="demo-simple-select-outlined-label">
                              Board
                          </InputLabel>
                          <Select
                              labelId="demo-simple-select-outlined-label"
                              value={config.board}
                              onChange={(e) =>
                                  setConfig((curr) => ({
                                      ...curr,
                                      board: e.target.value,
                                  }))
                              }
                              label="Board"
                              variant="filled"
                          >
                              <MenuItem value={1}>Brown</MenuItem>
                              <MenuItem value={2}>Aqua</MenuItem>
                              <MenuItem value={3}>Maroon</MenuItem>
                          </Select>
                      </FormControl>
                  </div>
                  <div style={{margin: '20px 0', width: '100%', display: 'flex', flexWrap: "wrap", alignItems: 'center', justifyContent: 'space-evenly'}}>
                      <TextField  className={styles.select} label="Player (White)" variant="filled" value={config.whitePlayer} onChange={(e) => setConfig(curr => ({...curr, whitePlayer: e.target.value}))}/>
                      <TextField  className={styles.select} label="Player (Black)" variant="filled" value={config.blackPlayer} onChange={(e) => setConfig(curr => ({...curr, blackPlayer: e.target.value}))}/>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '100%'}}>
                    <DemoChessSet
                        chessSet={config.pieces}
                        boardColor={config.board}
                    />
                </div>
                
            </div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        // router.push({
                        //   pathname: "/games/chess/play",
                        //   query: {
                        //       pieces: config.pieces,
                        //       board: config.board,
                        //       light: config.whitePlayer,
                        //       dark: config.blackPlayer
                        //   },
                        // })
                        setChessboard(<Chessboard pieces= {config.pieces} board= {config.board} light= {config.whitePlayer} dark= {config.blackPlayer} handleBackToMenu={() => setChessboard(null)}/>)
                    }}
                >
                    Play
                </Button>
        </div>
    );
}

function DemoChessSet(props) {
    const { chessSet, boardColor } = props;
    const pieces = ChessBoard.chessSets[chessSet];
    const board = [
        ChessBoard.darkSqBgs[boardColor],
        ChessBoard.lightSqBgs[boardColor],
    ];
    
    return (
        <div className={styles.sample}>
            <div
                style={{
                    backgroundColor: board[0],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Image src={pieces.q} alt="" width={50} height={50} />
            </div>
            <div
                style={{
                    backgroundColor: board[1],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Image src={pieces.k} alt="" width={50} height={50} />
            </div>
            <div
                style={{
                    backgroundColor: board[0],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Image src={pieces.b} alt="" width={50} height={50} />
            </div>
            <div
                style={{
                    backgroundColor: board[1],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Image src={pieces.p} alt="" width={50} height={50} />
            </div>
            <div
                style={{
                    backgroundColor: board[0],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Image src={pieces.p} alt="" width={50} height={50} />
            </div>
            <div
                style={{
                    backgroundColor: board[1],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Image src={pieces.p} alt="" width={50} height={50} />
            </div>
            <div
                style={{
                    backgroundColor: board[0],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            ></div>
            <div
                style={{
                    backgroundColor: board[1],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            ></div>
            <div
                style={{
                    backgroundColor: board[0],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            ></div>
        </div>
    )
}

