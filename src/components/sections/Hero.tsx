import {
  Sparkle as SparkleIcon,
  CameraSlash,
  HandWaving,
  Fire,
  Star,
} from "@phosphor-icons/react/dist/ssr";
import BedBuddy from "@/components/BedBuddy";
import PhoneFrame from "@/components/PhoneFrame";
import Sparkle from "@/components/Sparkle";
import AppStoreButton from "@/components/AppStoreButton";
import styles from "./Hero.module.css";

/** Decorative app-home mockup shown in the hero phone. */
function HeroScreen() {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 12, color: "var(--color-muted-light)", fontWeight: 700 }}>
            Good morning,
          </div>
          <div className={styles.screenHeadName}>
            Alex <HandWaving weight="fill" size={17} color="#FFB020" aria-hidden />
          </div>
        </div>
        <div className={styles.streakPill}>
          <Fire weight="fill" size={15} color="#FF6F5E" aria-hidden />
          <span className="font-display" style={{ fontWeight: 700, fontSize: 14 }}>
            7
          </span>
        </div>
      </div>

      <div className={styles.greenCard}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <BedBuddy mood="ecstatic" duvet="mint" scale={0.69} />
        </div>
        <div style={{ textAlign: "center", marginTop: 2 }}>
          <div className="font-display" style={{ fontWeight: 700, fontSize: 19, color: "#fff" }}>
            Bed made. You legend.
          </div>
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,.92)",
              marginTop: 4,
              fontWeight: 600,
            }}
          >
            Scored 92 today · streak secured
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 9, marginTop: 13 }}>
        <div className={styles.tile}>
          <Fire weight="fill" size={19} color="#FF6F5E" style={{ display: "block", margin: "0 auto" }} aria-hidden />
          <div className={styles.tileNum}>7</div>
          <div className={styles.tileLabel}>streak</div>
        </div>
        <div className={styles.tile}>
          <Star weight="fill" size={19} color="#FFCB2D" style={{ display: "block", margin: "0 auto" }} aria-hidden />
          <div className={styles.tileNum}>1,240</div>
          <div className={styles.tileLabel}>points</div>
        </div>
        <div className={styles.tile}>
          <div
            className="font-display"
            style={{
              width: 19,
              height: 19,
              borderRadius: "50%",
              background: "var(--color-grape)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              fontWeight: 700,
              fontSize: 11,
              color: "#fff",
            }}
          >
            #
          </div>
          <div className={styles.tileNum}>2</div>
          <div className={styles.tileLabel}>squad rank</div>
        </div>
      </div>
    </>
  );
}

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      {/* Decorative sparkles */}
      <Sparkle size={24} color="#FFCB2D" top={90} left="7%" duration={3} />
      <Sparkle size={14} color="#fff" top={200} left="14%" duration={3.6} delay={0.5} />
      <Sparkle size={18} color="#4CC9F0" top={130} right="10%" duration={2.8} delay={0.3} />
      <Sparkle size={13} color="#FFCB2D" bottom={120} right="18%" duration={3.2} delay={0.7} />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <div className={styles.badge}>
            <SparkleIcon weight="fill" size={14} color="#FFCB2D" aria-hidden />
            The playful make-your-bed habit
          </div>
          <h1 id="hero-title" className={`font-display ${styles.title}`}>
            Win your morning
            <br />
            before it begins.
          </h1>
          <p className={styles.sub}>
            Make your bed, scan it, and let our AI score your handiwork 0–100. Build a
            streak, rally your squad, and start every day with a win.
          </p>
          <div className={styles.actions}>
            <AppStoreButton />
            <div className={styles.trust}>
              <CameraSlash weight="fill" size={20} color="#fff" aria-hidden />
              <span className={styles.trustText}>
                We never store
                <br />
                your photos
              </span>
            </div>
          </div>
        </div>

        <div className={`${styles.phoneCol} anim-float`}>
          <PhoneFrame
            width={286}
            height={600}
            bezelRadius={42}
            padding={11}
            screenRadius={32}
            notch
            shadow="0 40px 80px rgba(42,33,64,.4)"
            screenBackground="var(--color-cream)"
            screenPadding="44px 18px 18px"
          >
            <HeroScreen />
          </PhoneFrame>
        </div>
      </div>

      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className={styles.wave}
        aria-hidden="true"
      >
        <path
          d="M0,80 L0,36 C240,4 480,4 720,28 C960,52 1200,52 1440,24 L1440,80 Z"
          fill="#FFF3EA"
        />
      </svg>
    </section>
  );
}
