import styles from "../styles/Footer.module.scss";
import Image from "next/image";
import logo from "../public/logo.png";
import { Button, Typography } from "@material-ui/core";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <Image width={25} height={25} src={logo} alt="The Menu" />
      <h5>&copy; 2021 - The Menu</h5>
    </div>
  );
}
