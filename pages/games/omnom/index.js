import styles from "../../../styles/snake.module.css";

const omnom = () => {
  return (
    <div className={styles.game}>
      <iframe
        src="https://gamesnacks.com/embed/games/omnomrun"
        height="650"
        width="100%"
      ></iframe>
    </div>
  );
};

export default omnom;
