import styles from "../../../styles/snake.module.css";

const index = () => {
  return (
    <div className={styles.game}>
      <iframe
        src="https://games.crazygames.com/en_US/tic-tac-toe-paper-note/index.html"
        height="652"
        width="100%"
      ></iframe>
    </div>
  );
};

export default index;
