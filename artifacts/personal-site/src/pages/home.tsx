import { motion } from "framer-motion";
import { Github, Linkedin, BookOpen, Coffee, MousePointerClick, Heart, Zap, Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import profilePhoto from "@assets/profile-photo-C9nmBW5u_1782931675382.jpg";
import { useState } from "react";

type FormStatus = "idle" | "sending" | "success" | "error";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send message.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" data-testid="contact-form">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-name" className="font-mono text-xs uppercase tracking-widest text-primary/70">
            NAME
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={100}
            placeholder="Your name"
            disabled={status === "sending" || status === "success"}
            className="bg-transparent border border-primary/40 focus:border-primary outline-none px-4 py-3 font-mono text-sm text-foreground placeholder:text-primary/30 transition-colors disabled:opacity-50"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-email" className="font-mono text-xs uppercase tracking-widest text-primary/70">
            EMAIL
          </label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={200}
            placeholder="you@example.com"
            disabled={status === "sending" || status === "success"}
            className="bg-transparent border border-primary/40 focus:border-primary outline-none px-4 py-3 font-mono text-sm text-foreground placeholder:text-primary/30 transition-colors disabled:opacity-50"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="font-mono text-xs uppercase tracking-widest text-primary/70">
          MESSAGE
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          maxLength={5000}
          rows={6}
          placeholder="What's on your mind?"
          disabled={status === "sending" || status === "success"}
          className="bg-transparent border border-primary/40 focus:border-primary outline-none px-4 py-3 font-mono text-sm text-foreground placeholder:text-primary/30 transition-colors resize-none disabled:opacity-50"
        />
      </div>

      {status === "success" && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 border border-primary bg-primary/10 px-4 py-3 font-mono text-sm"
          data-testid="contact-success"
        >
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>MESSAGE_SENT.OK — I'll be in touch soon.</span>
        </motion.div>
      )}

      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 border border-destructive bg-destructive/10 px-4 py-3 font-mono text-sm text-destructive"
          data-testid="contact-error"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>ERROR: {errorMsg}</span>
        </motion.div>
      )}

      <button
        type="submit"
        disabled={status === "sending" || status === "success"}
        className="self-start flex items-center gap-3 border border-primary px-6 py-3 font-mono text-sm uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
        data-testid="contact-submit"
      >
        <Send className="w-4 h-4 group-hover:translate-x-1 group-disabled:translate-x-0 transition-transform" />
        {status === "sending" ? "TRANSMITTING..." : status === "success" ? "SENT ✓" : "SEND_MESSAGE.EXE"}
      </button>
    </form>
  );
}

/* ── Midcentury modern atomic starburst ───────────────────────────── */
function Starburst({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M50 4 L54 42 L82 18 L64 48 L96 50 L64 52 L82 82 L54 58 L50 96 L46 58 L18 82 L36 52 L4 50 L36 48 L18 18 L46 42 Z" />
    </svg>
  );
}

/* ── Atomic orbital ring decoration ──────────────────────────────── */
function AtomicRing({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="100" cy="100" rx="90" ry="35" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" className="spin-slow" style={{ transformOrigin: "100px 100px" }} />
      <ellipse cx="100" cy="100" rx="90" ry="35" stroke="currentColor" strokeWidth="1" strokeDasharray="2 8" className="spin-slow-reverse" style={{ transformOrigin: "100px 100px", transform: "rotate(60deg)" }} />
      <circle cx="100" cy="100" r="6" fill="currentColor" />
    </svg>
  );
}

/* ── MCM section divider with starburst ──────────────────────────── */
function SectionHeader({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="pb-3 flex items-center gap-3"
    >
      <Starburst size={14} className="text-accent shrink-0" />
      {icon && <span className="opacity-60">{icon}</span>}
      <h2 className="text-3xl font-bold font-mono tracking-tight">{children}</h2>
      <div className="flex-1 h-px bg-primary/20 ml-2" />
      <Starburst size={10} className="text-accent/50 shrink-0" />
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen w-full relative scanlines selection:bg-accent selection:text-accent-foreground">

      {/* Subtle dot grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 0)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Top marquee — amber on dark */}
      <div
        className="w-full bg-accent text-accent-foreground font-mono text-xs py-1 border-b border-accent/40 uppercase tracking-widest marquee-container"
        style={{ letterSpacing: "0.15em" }}
      >
        <div className="marquee-content" data-testid="nav-marquee">
          ✦ HEIDI WILLIAMS FOY ✦ TECHNICAL SOLUTIONS CONSULTANT ✦ SOLUTIONS ENGINEER ✦ NEW YORK CITY ✦ ONLINE 24/7 ✦
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-12 md:py-24 relative z-10 flex flex-col gap-28">

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section className="flex flex-col md:flex-row gap-12 items-center md:items-start" data-testid="hero-section">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 flex flex-col gap-6"
          >
            {/* Status pill */}
            <div className="inline-flex items-center gap-2 font-mono text-sm border border-primary/40 px-3 py-1 w-max bg-primary/8 rounded-sm">
              <span className="w-2 h-2 rounded-full bg-accent blink" />
              SYS.ONLINE_STATUS: ACTIVE
            </div>

            <h1
              className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none"
              data-testid="hero-name"
            >
              Heidi<br />
              Williams<br />
              Foy
            </h1>

            <div className="flex flex-col gap-1 font-mono text-lg text-primary/80" data-testid="hero-title">
              <p>&gt; Technical Solutions Consultant</p>
              <p>&gt; Solutions Engineer</p>
              <p>&gt; LOC: New York City</p>
            </div>

            <p
              className="text-xl md:text-2xl font-light max-w-lg mt-4 pl-4"
              style={{ borderLeft: "4px solid hsl(var(--accent))" }}
              data-testid="hero-tagline"
            >
              I bridge deeply technical architecture with actual human communication. I speak machine, but I translate to human.
            </p>

            <div className="flex gap-4 mt-2" data-testid="hero-socials">
              <a
                href="https://github.com/HeidiW"
                target="_blank"
                rel="noreferrer"
                className="p-3 border border-primary/40 hover:border-accent hover:text-accent transition-colors group flex items-center justify-center rounded-sm"
                data-testid="link-github"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.linkedin.com/in/heidiwilliamsfoy/"
                target="_blank"
                rel="noreferrer"
                className="p-3 border border-primary/40 hover:border-accent hover:text-accent transition-colors group flex items-center justify-center rounded-sm"
                data-testid="link-linkedin"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Photo with MCM offset frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-72 shrink-0 relative group"
            data-testid="hero-photo-container"
          >
            {/* Teal shadow frame */}
            <div className="absolute inset-0 border border-primary/40 translate-x-3 translate-y-3 group-hover:translate-x-5 group-hover:translate-y-5 transition-transform rounded-sm" />
            {/* Amber accent frame */}
            <div className="absolute inset-0 border-2 border-accent/60 -translate-x-1 -translate-y-1 rounded-sm" />
            <div className="absolute inset-0 bg-primary mix-blend-color z-10 pointer-events-none opacity-30 rounded-sm" />
            <img
              src={profilePhoto}
              alt="Heidi Williams Foy"
              className="relative z-0 w-full h-auto object-cover grayscale contrast-110 brightness-105 border border-primary/30 rounded-sm"
              data-testid="hero-photo"
            />
            <div className="absolute bottom-2 right-2 bg-background border border-accent/60 px-2 py-0.5 font-mono text-xs z-20 rounded-sm flex items-center gap-1">
              <Starburst size={8} className="text-accent" />
              IMG_01.JPG
            </div>

            {/* Atomic ring decoration — floats off the corner */}
            <AtomicRing className="absolute -top-10 -right-10 w-20 h-20 text-accent/25 pointer-events-none" />
          </motion.div>
        </section>

        {/* ── ABOUT ────────────────────────────────────────────────── */}
        <section className="flex flex-col gap-6" data-testid="about-section">
          <SectionHeader>ABOUT.MD</SectionHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg font-light leading-relaxed">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-muted-foreground"
            >
              I'm a Technical Solutions Consultant and Solutions Engineer in New York City.
              I live in the space where complex technical systems meet the people who need to
              understand them — translating architecture into plain English, and business
              problems into actual solutions.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground"
            >
              I've spent my career making technical things click for the humans on both sides
              of the table. Whether that's scoping a solution, closing a deal, or untangling
              why the demo broke five minutes before showtime — I'm the person you want in the room.
            </motion.p>
          </div>
        </section>

        {/* ── CURRENT WORK ─────────────────────────────────────────── */}
        <section className="flex flex-col gap-6" data-testid="work-section">
          <SectionHeader>C:\CURRENT_WORK.EXE</SectionHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border border-primary/25 bg-card p-6 hover:border-primary/60 transition-colors relative group rounded-sm"
              data-testid="card-python"
            >
              <div className="absolute top-3 right-3 text-accent opacity-50 group-hover:opacity-100 transition-opacity">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-mono">Advanced Python</h3>
              <p className="text-muted-foreground font-light leading-relaxed text-base">
                Leveling up advanced Python skills. Because scripts that just "work" aren't good enough anymore. Building elegant, scalable, and ruthlessly efficient code.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="border border-accent/30 bg-card p-6 hover:border-accent/70 transition-colors relative group rounded-sm"
              data-testid="card-jobsoxo"
            >
              <div className="absolute top-3 right-3 text-accent opacity-50 group-hover:opacity-100 transition-opacity">
                <MousePointerClick className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-mono">
                Jobsoxo
                <span className="ml-2 text-xs font-normal text-accent border border-accent/40 px-1.5 py-0.5 rounded-sm align-middle">WIP</span>
              </h3>
              <p className="text-muted-foreground font-light leading-relaxed text-base">
                Building an invoicing and job management platform tailored for small contracting businesses. Fixing the paperwork nightmare so builders can build.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── READING ──────────────────────────────────────────────── */}
        <section className="flex flex-col gap-6" data-testid="reading-section">
          <SectionHeader icon={<BookOpen className="w-5 h-5" />}>READING_LIST.TXT</SectionHeader>

          <ul className="flex flex-col gap-3 font-mono">
            {[
              { title: "Life at the Speed of Play", author: "Mark Pincus" },
              { title: "Unreasonable Hospitality", author: "Will Guidara" },
              { title: "Drayton and MacKenzie", author: "Alexander Starritt" },
            ].map((book, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 group cursor-default border border-transparent hover:border-primary/20 hover:bg-primary/5 px-3 py-2 rounded-sm transition-all"
                data-testid={`book-item-${i}`}
              >
                <Starburst size={10} className="text-accent/60 shrink-0 group-hover:text-accent transition-colors" />
                <span className="font-semibold group-hover:text-primary transition-colors">{book.title}</span>
                <span className="text-muted-foreground hidden md:inline flex-1 overflow-hidden" style={{ letterSpacing: "-0.05em" }}>· · · · · · · · · · ·</span>
                <span className="text-primary/70 text-sm shrink-0">{book.author}</span>
              </motion.li>
            ))}
          </ul>
        </section>

        {/* ── INTERESTS ────────────────────────────────────────────── */}
        <section className="flex flex-col gap-6" data-testid="interests-section">
          <SectionHeader icon={<Coffee className="w-5 h-5" />}>IDLE_PROCESSES</SectionHeader>

          <div className="flex flex-wrap gap-3 font-mono">
            {[
              { label: "Cooking", color: "primary" },
              { label: "Design", color: "accent" },
              { label: "Dance Music", color: "primary" },
              { label: "Family Life", color: "accent" },
            ].map(({ label, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className={
                  color === "accent"
                    ? "px-4 py-2 border border-accent/50 bg-accent/8 hover:bg-accent hover:text-accent-foreground transition-all cursor-default select-none rounded-sm text-accent"
                    : "px-4 py-2 border border-primary/40 bg-primary/8 hover:bg-primary hover:text-primary-foreground transition-all cursor-default select-none rounded-sm"
                }
                data-testid={`interest-${label.toLowerCase().replace(" ", "-")}`}
              >
                &lt;{label} /&gt;
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CONTACT ──────────────────────────────────────────────── */}
        <section className="flex flex-col gap-6" data-testid="contact-section">
          <SectionHeader icon={<Mail className="w-5 h-5" />}>CONTACT.EXE</SectionHeader>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <p className="text-muted-foreground font-light text-lg max-w-lg">
              Got a project in mind, an opportunity to discuss, or just want to say hello? Send a message and I'll get back to you.
            </p>
            <ContactForm />
          </motion.div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────── */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-primary/20 pt-8 pb-12 flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-sm"
          data-testid="footer-section"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <Starburst size={12} className="text-accent" />
            <span>© {new Date().getFullYear()} HEIDI WILLIAMS FOY</span>
          </div>

          <div className="flex gap-6">
            <a
              href="https://github.com/HeidiW"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition-colors flex items-center gap-2"
              data-testid="footer-link-github"
            >
              <Github className="w-4 h-4" /> GITHUB
            </a>
            <a
              href="https://www.linkedin.com/in/heidiwilliamsfoy/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition-colors flex items-center gap-2"
              data-testid="footer-link-linkedin"
            >
              <Linkedin className="w-4 h-4" /> LINKEDIN
            </a>
          </div>

          <div className="text-muted-foreground/40 text-xs flex items-center gap-1">
            EOF
            <Heart className="w-3 h-3 fill-accent/30 text-accent/30" />
          </div>
        </motion.footer>

      </main>
    </div>
  );
}
