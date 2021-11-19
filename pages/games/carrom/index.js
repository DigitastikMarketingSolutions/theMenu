import styles from "../../../styles/snake.module.css";
import Header from "../../../components/Header";

const carrom = () => {
  return (
    <div className={styles.game}>
      <Header />
      <iframe
        src="https://cdn.gamesnacks.com/carromclash1/gameCode/index.html"
        height="650"
        width="100%"
      ></iframe>
    </div>
  );
};

export default carrom;
