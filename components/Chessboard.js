import React from "react";
import styles from "../styles/Chess.module.scss";
import ChessBoard from "next-chess-board";
import PropTypes from "prop-types";
import {
    Modal,
    Button,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";

export class Chessboard extends React.Component {
    constructor(props) {
        super(props);
        this.chessboard = React.createRef();
        this.state = {
            restartModalOpen: false,
            winningModalOpen: false,
            drawModalOpen: false,
            winner: [null, null],
            means: null,
            turn: "w"
        };
        if(window !== undefined){
            this.size = window.innerWidth
        }
    }

    static propTypes = {
        // match: PropTypes.object.isRequired,
        // location: PropTypes.object.isRequired,
        // history: PropTypes.object.isRequired,
        pieces: PropTypes.string.isRequired,
        board: PropTypes.number.isRequired,
    };

    componentDidMount() {
        this.unsubsCheckMate = this.chessboard.current?.on(
            ChessBoard.Events.CHECK_MATE,
            (msg, move, result) => {
                if(move.includes('...')){
                    this.setState(curr => ({...curr, winner: [this.props.dark, "Black"], means: "CheckMate", winningModalOpen:true}))
                    console.log("Black")
                } else {
                    this.setState(curr => ({...curr, winner: [this.props.light, "White"], means: "CheckMate", winningModalOpen:true}))
                    console.log("White")
                }
            }
        );
        this.unsubsStaleMate = this.chessboard.current?.on(
            ChessBoard.Events.STALE_MATE,
            (msg, result) => {
                console.log("StaleMate!")
                this.setState(curr => ({...curr, drawModalOpen:true}))
            }
        );
        this.unsubsMove = this.chessboard.current?.on(
            ChessBoard.Events.MOVE,
            (move) => {
                this.setState(curr => ({...curr, turn:this.chessboard.current.game.turn()}))
                
            }
        );
    }
    componentWillUnmount() {
        this.unsubsCheckMate(); // Cleaning up before leaving
        this.unsubsStaleMate();
        this.unsubsMove();
    }

    render() {
        console.log(this.size);
        return (
            <div className={styles.chess__play}>
                <div className={styles.board}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "space-evenly"}}>
                        <h1 data-text={this.state.turn==="w" ? "White to Play!" : "Black to Play!"} className={styles.boardHeader} style={{textAlign: "center", fontFamily: "'Permanent Marker', cursive", color: this.state.turn==="w" ? "white" : "black"}}>{this.state.turn==="w" ? "White" : "Black"} to Play!</h1>
                        <ChessBoard
                            ref={this.chessboard}
                            size={this.size > 700 ? 450 : 300}
                            moveValidator={true}
                            chessSet={this.props.pieces}
                            lightSqsBg={ChessBoard.lightSqBgs[this.props.board]}
                            darkSqsBg={ChessBoard.darkSqBgs[this.props.board]}
                            hideNotation={true}
                            mode={ChessBoard.Modes.MODE_PLAY}
                        />
                    </div>
                </div>
                <div className={styles.panel}>
                    <div className={styles.panelHead}>
                        <span style={{ color: "#fff" }}>
                            {this.props.light ? this.props.light.toUpperCase(): "Player 1"}
                        </span>
                        <span style={{ color: "#115293" }}>v/s</span>
                        <span>{this.props.dark ? this.props.dark.toUpperCase(): "Player 2"}</span>
                    </div>
                    <div className={styles.panelButtons}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                this.chessboard.current.flip();
                            }}
                        >
                            Flip
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                this.setState((curr) => ({
                                    ...curr,
                                    restartModalOpen: true,
                                }));
                            }}
                        >
                            Restart
                        </Button>
                        <Modal
                            open={this.state.restartModalOpen}
                            onClose={() =>
                                this.setState((curr) => ({
                                    ...curr,
                                    restartModalOpen: false,
                                }))
                            }
                        >
                            <div className={styles.restart__modal}>
                                <h3>Are you sure you want to restart?</h3>
                                <div
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-evenly",
                                        padding: "20px",
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() =>
                                            this.setState((curr) => ({
                                                ...curr,
                                                restartModalOpen: false,
                                            }))
                                        }
                                    >
                                        No, continue!
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            this.chessboard.current.loadFen(
                                                ChessBoard.defaultFen
                                            );
                                            this.setState((curr) => ({
                                                ...curr,
                                                restartModalOpen: false,
                                                turn:this.chessboard.current.game.turn()
                                            }));
                                        }}
                                    >
                                        Yes, restart!
                                    </Button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
                <Modal
                    open={this.state.winningModalOpen}
                    onClose={() =>
                        this.setState((curr) => ({
                            ...curr,
                            winningModalOpen: false,
                        }))
                    }
                >
                    <div className={styles.winningModal}>
                        <div className={styles.winningModalClose}>
                            <span
                                onClick={() =>
                                    this.setState((curr) => ({
                                        ...curr,
                                        winningModalOpen: false,
                                        turn:this.chessboard.current.game.turn()
                                    }))
                                    
                                }
                            >
                                <Close />
                            </span>
                        </div>
                        <div>
                            <p>
                                {this.state.winner?this.state.winner[0]:null} ({this.state.winner? this.state.winner[1]: null})
                            </p>
                            <p>won by</p>
                            <p>{this.state.means}</p>
                        </div>
                        <div>
                            {/* <Button onClick={() => {
                                this.setState(curr => ({...curr, winner: null, means: null, winningModalOpen:false}))
                                this.props.handleBackToMenu
                            }}>
                                Back to Game Menu
                            </Button> */}
                            <Button variant="contained" color="primary" onClick={() => {
                                this.setState(curr => ({...curr, winner: null, means: null, winningModalOpen:false, turn:this.chessboard.current.game.turn()}))
                                this.chessboard.current.loadFen(
                                    ChessBoard.defaultFen
                                )
                            }}>Play again</Button>
                        </div>
                    </div>
                </Modal>
                <Modal
                    open={this.state.drawModalOpen}
                    onClose={() =>
                        this.setState((curr) => ({
                            ...curr,
                            drawModalOpen: false,
                        }))
                    }
                >
                    <div className={styles.winningModal}>
                        <div className={styles.winningModalClose}>
                            <span
                                onClick={() =>
                                    this.setState((curr) => ({
                                        ...curr,
                                        drawModalOpen: false,
                                    }))
                                    
                                }
                            >
                                <Close />
                            </span>
                        </div>
                        <p>
                            Match drawn by StaleMate!
                        </p>
                        <div>
                            {/* <Button onClick={() => {
                                this.setState(curr => ({...curr, winner: null, means: null, winningModalOpen:false}))
                                this.props.handleBackToMenu
                            }}>
                                Back to Game Menu
                            </Button> */}
                            <Button variant="contained" color="primary" onClick={() => {
                                this.setState(curr => ({...curr, winner: null, means: null, drawModalOpen:false}))
                                this.chessboard.current.loadFen(
                                    ChessBoard.defaultFen
                                )
                            }}>Play again</Button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export async function getStaticProps(context) {
    return {
        props: { pieces: "default", board: 0 }, // will be passed to the page component as props
    };
}

// export default withRouter(Chessboard)

function WinningModal(props) {
    const { team, player, means, handleRestart, handleBackToMenu } = props;
    return (
        <div>
            <Modal open={null} onClose={null}>
                <div className={styles.winningModal}>
                    <div className={styles.winningModalClose}>
                        {" "}
                        <span>
                            <Close />
                        </span>{" "}
                    </div>
                    <p>
                        {player} ({team})
                    </p>
                    <p>won by</p>
                    <p>{means}</p>
                    <div>
                        <Button onClick={handleBackToMenu}>
                            Back to Game Menu
                        </Button>
                        <Button onClick={handleRestart}>Play again</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
