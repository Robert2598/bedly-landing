import BedBuddy from "@/components/BedBuddy";
import Sparkle from "@/components/Sparkle";
import AppStoreButton from "@/components/AppStoreButton";
import styles from "./FinalCta.module.css";

export default function FinalCta() {
  return (
    <section id="get" className={styles.section} aria-labelledby="cta-title">
      <div className={styles.panel}>
        <Sparkle size={18} color="#FFCB2D" top={40} left="10%" duration={3} />
        <Sparkle size={14} color="#fff" bottom={48} right="12%" duration={3.4} delay={0.4} />

        <div className={`${styles.mascot} anim-float-sm`}>
          <BedBuddy mood="happy" scale={0.825} />
        </div>

        <h2 id="cta-title" className={`font-display ${styles.title}`}>
          Make your bed. Make your day.
        </h2>
        <p className={styles.sub}>
          Your first win of the day is two minutes away. Download Bedly and start your
          streak this morning.
        </p>
        <div className={styles.btnRow}>
          <AppStoreButton height={62} appleSize={31} labelSize={21} pulse />
        </div>
        <p className={styles.fine}>Free to download · Pro is optional · iPhone</p>
      </div>
    </section>
  );
}
