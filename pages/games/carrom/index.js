import styles from "../../../styles/snake.module.css";

const carrom = () => {
  return (
    <div className={styles.game}>
      <iframe
        src="https://cdn.gamesnacks.com/carromclash1/gameCode/index.html"
        height="650"
        width="100%"
      ></iframe>
    </div>
  );
};

export default carrom;
