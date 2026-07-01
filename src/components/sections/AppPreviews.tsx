import { Fire, Check, Camera } from "@phosphor-icons/react/dist/ssr";
import BedBuddy from "@/components/BedBuddy";
import PhoneFrame from "@/components/PhoneFrame";
import SectionHeading from "@/components/SectionHeading";
import styles from "./AppPreviews.module.css";

function ScanResultScreen() {
  return (
    <div className={styles.scanScreen} style={{ padding: "38px 20px 22px" }}>
      <BedBuddy mood="ecstatic" duvet="mint" scale={0.555} />
      <div className={styles.ring}>
        <div className={styles.ringInner}>
          <div className={styles.scoreNum}>92</div>
          <div className={styles.scoreOut}>out of 100</div>
        </div>
      </div>
      <div className={styles.scanTitle}>Crisp &amp; clean!</div>
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <span className={styles.chip}>+92 pts</span>
        <span className={styles.chip}>
          <Fire weight="fill" size={12} aria-hidden /> +1
        </span>
      </div>
    </div>
  );
}

const WEEK: { label: string; state: "done" | "today" | "empty" }[] = [
  { label: "M", state: "done" },
  { label: "T", state: "done" },
  { label: "W", state: "done" },
  { label: "T", state: "today" },
  { label: "F", state: "empty" },
  { label: "S", state: "empty" },
  { label: "S", state: "empty" },
];

function HomeScreen() {
  return (
    <div style={{ height: "100%", padding: "30px 16px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--color-muted-light)", fontWeight: 700 }}>
            Good morning,
          </div>
          <div className={styles.homeHeadName}>Alex</div>
        </div>
        <div className={styles.homeStreak}>
          <Fire weight="fill" size={14} color="#FF6F5E" aria-hidden />
          <span className="font-display" style={{ fontWeight: 700, fontSize: 13 }}>
            7
          </span>
        </div>
      </div>

      <div className={styles.coralCard}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <BedBuddy mood="sad" duvet="coral" scale={0.53} />
        </div>
        <div style={{ textAlign: "center" }}>
          <div className="font-display" style={{ fontWeight: 700, fontSize: 17, color: "#fff" }}>
            Your bed misses you.
          </div>
          <div className={styles.scanBtn}>
            <Camera weight="fill" size={17} color="var(--color-coral-pressed)" aria-hidden />
            Scan my bed
          </div>
        </div>
      </div>

      <div className={styles.weekCard}>
        <div className="font-display" style={{ fontWeight: 700, fontSize: 13, marginBottom: 11 }}>
          This week
        </div>
        <div className={styles.weekRow}>
          {WEEK.map((d, i) => (
            <div key={i} className={styles.day}>
              <div
                className={styles.dayDot}
                style={
                  d.state === "done"
                    ? { background: "var(--color-mint)" }
                    : d.state === "today"
                      ? { background: "#fff", border: "2px solid var(--color-coral)" }
                      : { background: "var(--color-hairline)" }
                }
              >
                {d.state === "done" && <Check weight="bold" size={13} color="#fff" aria-hidden />}
              </div>
              <span
                className={styles.dayLabel}
                style={d.state === "today" ? { color: "var(--color-coral)" } : undefined}
              >
                {d.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface Leader {
  rank: string;
  rankColor: string;
  avatar: string;
  avatarBg: string;
  name: string;
  streak: string;
  points: string;
  you?: boolean;
  nudge?: boolean;
}

const LEADERS: Leader[] = [
  { rank: "1", rankColor: "#FFB800", avatar: "M", avatarBg: "var(--color-grape)", name: "Maya", streak: "23", points: "3,120" },
  { rank: "2", rankColor: "#9AA0AE", avatar: "A", avatarBg: "var(--color-coral)", name: "You", you: true, streak: "7", points: "1,240" },
  { rank: "3", rankColor: "#D98B4E", avatar: "L", avatarBg: "var(--color-sky)", name: "Leo", streak: "12", points: "1,980", nudge: true },
  { rank: "4", rankColor: "#C3BCCF", avatar: "P", avatarBg: "var(--color-mint)", name: "Priya", streak: "9", points: "1,605" },
];

function SquadScreen() {
  return (
    <div style={{ height: "100%", padding: "30px 15px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="font-display" style={{ fontWeight: 700, fontSize: 20 }}>
          Your squad
        </div>
        <div className={styles.squadAdd}>+</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }}>
        {LEADERS.map((l) => (
          <div
            key={l.name}
            className={`${styles.leaderRow}${l.you ? ` ${styles.leaderRowYou}` : ""}`}
          >
            <span className={styles.rank} style={{ color: l.rankColor }}>
              {l.rank}
            </span>
            <div className={styles.avatar} style={{ background: l.avatarBg }}>
              {l.avatar}
            </div>
            <div style={{ flex: 1 }}>
              <div className={styles.leaderName}>
                {l.name}
                {l.you && <span className={styles.youBadge}>YOU</span>}
              </div>
              <div className={styles.leaderStat}>
                <Fire weight="fill" size={11} color="#FF6F5E" aria-hidden /> {l.streak} ·{" "}
                {l.points}
              </div>
            </div>
            {l.nudge && <span className={styles.nudge}>Nudge</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AppPreviews() {
  return (
    <section className={styles.section} aria-labelledby="previews-title">
      <SectionHeading
        title="A morning ritual you'll actually open"
        titleId="previews-title"
        subcopy="Bright, satisfying and a little bit silly — exactly enough to get you out of bed."
      />
      <div className={styles.row}>
        <PhoneFrame
          width={248}
          height={516}
          bezelRadius={38}
          padding={9}
          screenRadius={30}
          shadow="0 30px 60px rgba(42,33,64,.28)"
          screenBackground="var(--grad-mint-scan)"
        >
          <ScanResultScreen />
        </PhoneFrame>

        <PhoneFrame
          width={262}
          height={556}
          bezelRadius={40}
          padding={10}
          screenRadius={31}
          shadow="0 38px 72px rgba(42,33,64,.34)"
          screenBackground="var(--color-cream)"
        >
          <HomeScreen />
        </PhoneFrame>

        <PhoneFrame
          width={248}
          height={516}
          bezelRadius={38}
          padding={9}
          screenRadius={30}
          shadow="0 30px 60px rgba(42,33,64,.28)"
          screenBackground="var(--color-cream)"
        >
          <SquadScreen />
        </PhoneFrame>
      </div>
    </section>
  );
}
