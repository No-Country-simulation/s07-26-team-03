import styles from "./ProgressBar.module.css";
import type { ProgressBarProps } from "../../types/Progressbar.types";

export default function ProgressBar({
    title = "Fine tune your capacity(MW)",
    startValue = 5,
    activeValue = 7.5,
    endValue = 10,
    unit = "MW",
    onChange,
}: ProgressBarProps) {
    const range = endValue - startValue;
    const activePercentage =
        range > 0
            ? Math.min(Math.max(((activeValue - startValue) / range) * 100, 0), 100)
            : 50;

    return (
        <div className={styles.container}>
            <p className={styles.title}>{title}</p>

            <div className={styles.wrapper}>
                <div className={styles.track}>
                    <div
                        className={styles.progress}
                        style={{
                            left: "0%",
                            width: `${activePercentage}%`,
                        }}
                    />

                    <div
                        className={styles.dot}
                        style={{
                            left: `${activePercentage}%`,
                        }}
                    />
                </div>

                <div className={styles.labels}>
                    <span className={styles.start}>
                        {startValue}
                        {unit}
                    </span>

                    <span
                        className={styles.middle}
                        style={{
                            left: `${activePercentage}%`,
                            transform: "translateX(-50%)",
                            position: "absolute",
                        }}
                    >
                        {activeValue}
                        {unit}
                    </span>

                    <span className={styles.end}>
                        {endValue}
                        {unit}
                    </span>
                </div>
            </div>
        </div>
    );
}