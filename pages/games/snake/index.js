import styles from "../../../styles/snake.module.css";

const Snake = () => {
  return (
    <div className={styles.game}>
      <iframe
        src="https://helpfulsheep.com/snake-mobile/"
        height="600"
        width="100%"
      ></iframe>
    </div>
  );
};

export default Snake;
