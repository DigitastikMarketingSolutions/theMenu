import styles from "../../../styles/snake.module.css";
import Header from "../../../components/Header";

const omnom = () => {
  return (
    <div className={styles.game}>
      <Header />
      <iframe
        src="https://gamesnacks.com/embed/games/omnomrun"
        height="650"
        width="100%"
      ></iframe>
    </div>
  );
};

export default omnom;
