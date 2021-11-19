import styles from "../../../styles/snake.module.css";
import Header from "../../../components/Header";

const index = () => {
  return (
    <div className={styles.game}>
      <Header />
      <iframe
        src="https://games.crazygames.com/en_US/tic-tac-toe-paper-note/index.html"
        height="652"
        width="100%"
      ></iframe>
    </div>
  );
};

export default index;
