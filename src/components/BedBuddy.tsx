import styles from "./BedBuddy.module.css";

export type BedBuddyMood = "happy" | "sad" | "ecstatic";
export type BedBuddyDuvet = "coral" | "mint" | "grape" | "sky" | "pink" | "gold";
export type BedBuddyHat = "none" | "crown" | "nightcap" | "party";

const DUVETS: Record<BedBuddyDuvet, string> = {
  coral: "linear-gradient(160deg,#FF8466,#FF6A4A)",
  mint: "linear-gradient(160deg,#43D6A0,#1FBF8E)",
  grape: "linear-gradient(160deg,#A87BEA,#8E5BE0)",
  sky: "linear-gradient(160deg,#5BCBF2,#34AEE0)",
  pink: "linear-gradient(160deg,#FF93BC,#FF5D98)",
  gold: "linear-gradient(160deg,#FFD45E,#FFB020)",
};

const NATIVE_W = 220;
const NATIVE_H = 190;

export interface BedBuddyProps {
  mood?: BedBuddyMood;
  duvet?: BedBuddyDuvet;
  hat?: BedBuddyHat;
  shades?: boolean;
  /** Scale factor applied to the native 220×190 art. Ignored if `width` is set. */
  scale?: number;
  /** Convenience: target rendered width in px (overrides `scale`). */
  width?: number;
  className?: string;
}

/**
 * BedBuddy — the chunky bed mascot, ported 1:1 from BedBuddy.dc.html.
 * Decorative product art, so it is hidden from assistive tech (aria-hidden).
 * Sized via the scale-wrapper technique so it never clips or misaligns.
 */
export default function BedBuddy({
  mood = "happy",
  duvet = "coral",
  hat = "none",
  shades = false,
  scale,
  width,
  className,
}: BedBuddyProps) {
  const s = width ? width / NATIVE_W : (scale ?? 1);

  const isHappy = mood === "happy";
  const isSad = mood === "sad";
  const isEcstatic = mood === "ecstatic";
  const roundEyes = isHappy || isSad;
  const showCheeks = isHappy || isEcstatic;

  return (
    <div
      className={`${styles.outer}${className ? ` ${className}` : ""}`}
      style={{ width: NATIVE_W * s, height: NATIVE_H * s }}
      aria-hidden="true"
    >
      <div className={styles.scaler} style={{ transform: `scale(${s})` }}>
        <div className={`${styles.box} ${isEcstatic ? styles.bobFast : styles.bob}`}>
          <div className={styles.shadow} />

          {isEcstatic && (
            <>
              <div className={`${styles.spark} ${styles.spark1}`} />
              <div className={`${styles.spark} ${styles.spark2}`} />
              <div className={`${styles.spark} ${styles.spark3}`} />
              <div className={`${styles.spark} ${styles.spark4}`} />
            </>
          )}

          {isSad && (
            <>
              <div className={`${styles.zed} ${styles.zed1}`}>z</div>
              <div className={`${styles.zed} ${styles.zed2}`}>z</div>
            </>
          )}

          <div className={styles.duvet} style={{ background: DUVETS[duvet] }} />
          <div className={styles.sheet} />

          {isSad && (
            <>
              <div className={`${styles.brow} ${styles.browL}`} />
              <div className={`${styles.brow} ${styles.browR}`} />
            </>
          )}

          {/* Eyes */}
          <div className={`${styles.eye} ${styles.eyeL}`}>
            {roundEyes ? (
              <div className={styles.pupil}>
                <div className={styles.glint} />
              </div>
            ) : (
              <div className={styles.arcEye} />
            )}
          </div>
          <div className={`${styles.eye} ${styles.eyeR}`}>
            {roundEyes ? (
              <div className={`${styles.pupil} ${styles.pupilR}`}>
                <div className={styles.glint} />
              </div>
            ) : (
              <div className={styles.arcEye} />
            )}
          </div>

          {showCheeks && (
            <>
              <div className={`${styles.cheek} ${styles.cheekL}`} />
              <div className={`${styles.cheek} ${styles.cheekR}`} />
            </>
          )}

          {/* Mouth */}
          {isHappy && <div className={styles.mouthHappy} />}
          {isSad && <div className={styles.mouthSad} />}
          {isEcstatic && (
            <div className={styles.mouthEcstatic}>
              <div className={styles.tongue} />
              <div className={styles.teeth} />
            </div>
          )}

          {isSad && <div className={styles.tear} />}

          {shades && (
            <div className={styles.shades}>
              <div className={`${styles.lens} ${styles.lensL}`} />
              <div className={`${styles.lens} ${styles.lensR}`} />
              <div className={styles.bridge} />
            </div>
          )}

          {hat === "crown" && (
            <div className={`${styles.hat} ${styles.crown}`}>
              <div className={styles.crownBody} />
              <div className={`${styles.gem} ${styles.gemL}`} />
              <div className={`${styles.gem} ${styles.gemC}`} />
              <div className={`${styles.gem} ${styles.gemR}`} />
            </div>
          )}
          {hat === "party" && (
            <div className={`${styles.hat} ${styles.party}`}>
              <div className={styles.partyBody} />
              <div className={styles.partyPom} />
            </div>
          )}
          {hat === "nightcap" && (
            <div className={`${styles.hat} ${styles.nightcap}`}>
              <div className={styles.nightcapBody} />
              <div className={styles.nightcapBrim} />
              <div className={styles.nightcapPom} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
