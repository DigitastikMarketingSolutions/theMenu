import { useEffect, useRef, useState } from "react";
import styles from "../styles/SpinningWheel.module.css";
import Image from "next/image";
import wheel from "../public/wheel.png";
import stopper from "../public/stopper.png";
import { Button, makeStyles } from "@material-ui/core";

export default function SpinningWheel(props) {
    const [spins, setSpins] = useState(0);
    const wheelRef = useRef()

    const weighted_random = () => {
        var i;
        const weights = [40, 30, 15, 10, 5];

        for (i = 0; i < weights.length; i++) weights[i] += weights[i - 1] || 0;

        var random = Math.random() * weights[weights.length - 1];

        for (i = 0; i < weights.length; i++) if (weights[i] > random) break;

        return i;
    };

    return (
        <div className={styles.container}>
            <div>
                <Image width={25} height={45} src={stopper} alt="" />
            </div>
            <div ref={wheelRef}>
                <Image width={250} height={250} src={wheel} alt="" />
            </div>
            <Button color="secondary" variant="contained" onClick={() => {
                const num = weighted_random()
                setSpins(num)
                wheelRef.current.style.animation = `spin${num} 5s ease-in-out 1s 1 normal forwards`
                console.log(wheelRef)
                setTimeout(() => {
                    props.handleModal(num)
                }, 6500)
            }}>
                Spin It!
            </Button>
        </div>
    );
}
