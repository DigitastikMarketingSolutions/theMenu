import styles from "../../../styles/snake.module.css";
import Header from "../../../components/Header";

const Snake = () => {
  return (
    <div className={styles.game}>
      <Header />
      <iframe
        src="https://helpfulsheep.com/snake-mobile/"
        height="600"
        width="100%"
      ></iframe>
    </div>
  );
};

export default Snake;
