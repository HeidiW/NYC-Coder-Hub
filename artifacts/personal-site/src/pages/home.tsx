import { motion } from "framer-motion";
import { Github, Linkedin, Terminal, Zap, BookOpen, Coffee, MousePointerClick, Heart } from "lucide-react";
import profilePhoto from "@assets/profile-photo-C9nmBW5u_1782931675382.jpg";

export default function Home() {
  return (
    <div className="min-h-screen w-full relative scanlines selection:bg-primary selection:text-primary-foreground">
      {/* Background noise and grid */}
      <div className="fixed inset-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'radial-gradient(hsl(var(--primary)) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      {/* Top Nav Marquee */}
      <div className="w-full bg-primary text-primary-foreground font-mono text-xs py-1 border-b border-primary uppercase tracking-widest marquee-container">
        <div className="marquee-content" data-testid="nav-marquee">
          +++ HEIDI WILLIAMS FOY +++ TECHNICAL SOLUTIONS CONSULTANT +++ SOLUTIONS ENGINEER +++ NEW YORK CITY +++ ONLINE 24/7 +++
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-12 md:py-24 relative z-10 flex flex-col gap-32">
        
        {/* HERO SECTION */}
        <section className="flex flex-col md:flex-row gap-12 items-center md:items-start" data-testid="hero-section">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 font-mono text-sm border border-primary px-3 py-1 w-max bg-primary/10">
              <span className="w-2 h-2 rounded-full bg-primary blink"></span>
              SYS.ONLINE_STATUS: ACTIVE
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none" data-testid="hero-name">
              Heidi<br/>
              Williams<br/>
              Foy
            </h1>
            
            <div className="flex flex-col gap-1 font-mono text-lg text-primary/80" data-testid="hero-title">
              <p>&gt; Technical Solutions Consultant</p>
              <p>&gt; Solutions Engineer</p>
              <p>&gt; LOC: New York City</p>
            </div>

            <p className="text-xl md:text-2xl font-light max-w-lg mt-4 border-l-4 border-primary pl-4" data-testid="hero-tagline">
              I bridge deeply technical architecture with actual human communication. I speak machine, but I translate to human.
            </p>

            <div className="flex gap-4 mt-6" data-testid="hero-socials">
              <a href="https://github.com/HeidiW" target="_blank" rel="noreferrer" className="p-3 border border-primary hover:bg-primary hover:text-primary-foreground transition-colors group flex items-center justify-center">
                <Github className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.linkedin.com/in/heidiwilliamsfoy/" target="_blank" rel="noreferrer" className="p-3 border border-primary hover:bg-primary hover:text-primary-foreground transition-colors group flex items-center justify-center">
                <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-80 shrink-0 relative group"
            data-testid="hero-photo-container"
          >
            <div className="absolute inset-0 border-2 border-primary translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform"></div>
            <div className="absolute inset-0 bg-primary mix-blend-color z-10 pointer-events-none opacity-40"></div>
            <img 
              src={profilePhoto} 
              alt="Heidi Williams Foy" 
              className="relative z-0 w-full h-auto object-cover grayscale contrast-125 brightness-110 border-2 border-primary"
              data-testid="hero-photo"
            />
            <div className="absolute bottom-0 right-0 bg-background border-t-2 border-l-2 border-primary px-2 py-1 font-mono text-xs z-20">
              IMG_01.JPG
            </div>
          </motion.div>
        </section>

        {/* WORK SECTION */}
        <section className="flex flex-col gap-8" data-testid="work-section">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="border-b-2 border-primary pb-2 flex items-center gap-3"
          >
            <Terminal className="w-6 h-6" />
            <h2 className="text-3xl font-bold font-mono tracking-tight">C:\CURRENT_WORK.EXE</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border border-primary bg-background p-6 hover:bg-primary/5 transition-colors relative group"
            >
              <div className="absolute top-0 right-0 p-2 opacity-50"><Zap className="w-5 h-5" /></div>
              <h3 className="text-xl font-bold mb-4 font-mono">Advanced Python</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Leveling up advanced Python skills. Because scripts that just "work" aren't good enough anymore. Building elegant, scalable, and ruthlessly efficient code.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, delay: 0.1 }}
              className="border border-primary bg-background p-6 hover:bg-primary/5 transition-colors relative group"
            >
              <div className="absolute top-0 right-0 p-2 opacity-50"><MousePointerClick className="w-5 h-5" /></div>
              <h3 className="text-xl font-bold mb-4 font-mono">Jobsoxo</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Building an invoicing and job management platform tailored for small contracting businesses. Fixing the paperwork nightmare so builders can build.
              </p>
            </motion.div>
          </div>
        </section>

        {/* READING SECTION */}
        <section className="flex flex-col gap-8" data-testid="reading-section">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="border-b-2 border-primary pb-2 flex items-center gap-3"
          >
            <BookOpen className="w-6 h-6" />
            <h2 className="text-3xl font-bold font-mono tracking-tight">READING_LIST.TXT</h2>
          </motion.div>

          <ul className="flex flex-col gap-4 font-mono">
            {[
              { title: "Life at the Speed of Play", author: "Mark Pincus" },
              { title: "Unreasonable Hospitality", author: "Will Guidara" },
              { title: "Drayton and MacKenzie", author: "Alexander Starritt" }
            ].map((book, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 group cursor-default"
              >
                <span className="text-primary/50 group-hover:text-primary transition-colors">[{i+1}]</span>
                <span className="font-bold border-b border-transparent group-hover:border-primary transition-colors">{book.title}</span>
                <span className="text-muted-foreground hidden md:inline">----------------</span>
                <span className="text-primary/80">{book.author}</span>
              </motion.li>
            ))}
          </ul>
        </section>

        {/* INTERESTS SECTION */}
        <section className="flex flex-col gap-8" data-testid="interests-section">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="border-b-2 border-primary pb-2 flex items-center gap-3"
          >
            <Coffee className="w-6 h-6" />
            <h2 className="text-3xl font-bold font-mono tracking-tight">IDLE_PROCESSES</h2>
          </motion.div>

          <div className="flex flex-wrap gap-4 font-mono">
            {["Cooking", "Design", "Dance Music", "Family Life"].map((interest, i) => (
              <motion.div
                key={interest}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 border border-primary/50 bg-primary/5 hover:bg-primary hover:text-primary-foreground transition-all cursor-default select-none"
              >
                &lt;{interest} /&gt;
              </motion.div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t-2 border-primary pt-8 pb-12 flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-sm"
          data-testid="footer-section"
        >
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} HEIDI WILLIAMS FOY.</span>
            <Heart className="w-4 h-4 fill-primary/20" />
          </div>
          
          <div className="flex gap-6">
            <a href="https://github.com/HeidiW" target="_blank" rel="noreferrer" className="hover:underline underline-offset-4 decoration-primary decoration-2 flex items-center gap-2">
              <Github className="w-4 h-4" /> GITHUB
            </a>
            <a href="https://www.linkedin.com/in/heidiwilliamsfoy/" target="_blank" rel="noreferrer" className="hover:underline underline-offset-4 decoration-primary decoration-2 flex items-center gap-2">
              <Linkedin className="w-4 h-4" /> LINKEDIN
            </a>
          </div>

          <div className="text-primary/50 text-xs">
            EOF.
          </div>
        </motion.footer>

      </main>
    </div>
  );
}
