import styles from "../../../styles/snake.module.css";

const tabletennis = () => {
  return (
    <div className={styles.game}>
      <iframe
        src="https://games.crazygames.com/en_US/table-tennis-world-tour/index.html"
        height="650"
        width="100%"
      ></iframe>
    </div>
  );
};

export default tabletennis;
