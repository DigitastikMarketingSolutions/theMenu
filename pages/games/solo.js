import styles from "../../styles/SoloGames.module.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../../components/Header";

export default function Solo() {
  const router = useRouter();
  return (
    <div className={styles.solo}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={true}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <div className={styles.card} onClick={() => router.push("/games/snake")}>
        <h1 data-text="Nokia Snake">Nokia Snake</h1>
        <h1 data-text="Game">Game</h1>
      </div>
      <div
        className={styles.card}
        onClick={() => router.push("/games/tabletennis")}
      >
        <h1 data-text="Table Tennis">Table Tennis</h1>
      </div>
      <div className={styles.card} onClick={() => router.push("/games/omnom")}>
        <h1 data-text="Om Nom Run">Om Nom Run</h1>
      </div>
      <div className={styles.card} onClick={() => router.push("/games/carrom")}>
        <h1 data-text="Play Carrom">Play Carrom</h1>
      </div>
    </div>
  );
}
