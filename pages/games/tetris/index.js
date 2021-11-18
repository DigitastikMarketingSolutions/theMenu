import styles from "../../../styles/snake.module.css";

const tetris = () => {
  return (
    <div className={styles.game}>
      <iframe
        src="https://tetris.com/games-content/play-tetris-content/resources/project-tetriscom/game/game-333939EF295B389F/if_game_html5.php?p=d&cbidg=333939EF295B389F"
        height="650"
        width="100%"
      ></iframe>
    </div>
  );
};

export default tetris;
