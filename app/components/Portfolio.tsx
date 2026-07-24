"use client";

/* eslint-disable @next/next/no-img-element -- Pre-optimized WebP assets are shared with the static GitHub Pages build. */
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  Code2,
  ExternalLink,
  GitBranch,
  Mail,
  Menu,
  Moon,
  Plus,
  Send,
  Sun,
  X,
} from "lucide-react";
import { FormEvent, lazy, Suspense, useCallback, useEffect, useState } from "react";
import type { Certificate } from "./CertificateModal";

const CertificateModal = lazy(() => import("./CertificateModal"));

const navigation = [
  ["Work", "#work"],
  ["Profile", "#about"],
  ["Skills", "#skills"],
  ["Contact", "#contact"],
] as const;

const githubUrl = "https://github.com/SerhiiKharyponcuk";
const email = "kharyponchuksergej@gmail.com";

const skills = [
  {
    number: "01",
    title: "Frontend",
    text: "Responsive, accessible interfaces built with clean component architecture and close attention to performance.",
    items: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Vite"],
  },
  {
    number: "02",
    title: "Backend",
    text: "Complete JavaScript backends with secure authentication, structured data, and practical REST APIs.",
    items: ["Node.js", "Express.js", "Prisma", "REST API", "PostgreSQL", "SQLite", "JWT Authentication"],
  },
  {
    number: "03",
    title: "Tools",
    text: "A focused workflow for designing, building, versioning, and deploying modern web applications.",
    items: ["Git", "GitHub", "VS Code", "Vercel", "Render", "Figma"],
  },
];

type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type Project = {
  index: string;
  type: string;
  title: string;
  description: string;
  label: string;
  stack: string[];
  className: string;
  images: [ProjectImage, ...ProjectImage[]];
  sourceUrl: string;
  sourceLabel: string;
  liveUrl?: string;
  featured?: boolean;
  problem?: string;
  challenge?: string;
  features?: string[];
};

const projects: Project[] = [
  {
    index: "01",
    type: "Full-stack browser game",
    title: "Waves Arcade",
    description:
      "A full-stack browser game with user accounts, progression systems, leaderboards, admin tools, and secure backend validation.",
    problem:
      "The project combines an arcade gameplay experience with a complete account system, progression mechanics, analytics, and practical administration tools.",
    challenge:
      "Designing secure server-side score validation and anti-cheat checkpoints while keeping gameplay responsive.",
    features: [
      "Registration & authentication",
      "Guest mode",
      "Leaderboards",
      "In-app currency",
      "Skin shop",
      "Daily missions",
      "Achievements",
      "Admin dashboard",
      "User support",
      "Analytics",
      "Anti-cheat",
      "Multilingual support",
    ],
    label: "Authentication · Progression · Anti-cheat",
    stack: ["React", "TypeScript", "Node.js", "Express", "Prisma", "PostgreSQL", "Vercel", "Render", "Cloudflare Turnstile", "Resend"],
    className: "project-blue",
    featured: true,
    sourceUrl: "https://github.com/SerhiiKharyponcuk/waves-arcade",
    sourceLabel: "View repository",
    liveUrl: "https://waves-arcade.vercel.app/",
    images: [
      {
        src: "projects/waves-login.webp",
        alt: "Waves Arcade authentication screen with login, registration, and guest mode",
        width: 1064,
        height: 933,
      },
      {
        src: "projects/waves-gameplay.webp",
        alt: "Waves Arcade neon browser gameplay",
        width: 936,
        height: 648,
      },
    ],
  },
  {
    index: "02",
    type: "Gaming community · Interface",
    title: "Undying Metro Shop",
    description:
      "A modern gaming shop interface focused on premium UI/UX, a responsive layout, clear navigation, and fast performance.",
    label: "Premium UI · Responsive · Fast",
    stack: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    className: "project-aqua",
    sourceUrl: githubUrl,
    sourceLabel: "GitHub profile",
    liveUrl: "https://serhiikharyponcuk.github.io/undying-metro-shop/",
    images: [
      {
        src: "projects/undying-metro-shop.webp",
        alt: "Undying Metro Shop gaming community interface",
        width: 750,
        height: 721,
      },
    ],
  },
  {
    index: "03",
    type: "Web utility · Device intelligence",
    title: "IP Information Website",
    description:
      "An interactive web application that reveals browser, operating system, device, and IP-related information through a modern animated interface.",
    label: "Browser data · Device insights · Motion",
    stack: ["JavaScript", "Browser APIs", "HTML5", "CSS3"],
    className: "project-coral",
    sourceUrl: githubUrl,
    sourceLabel: "GitHub profile",
    images: [
      {
        src: "projects/ip-information.webp",
        alt: "IP Information Website terminal-style landing interface",
        width: 1600,
        height: 810,
      },
    ],
  },
  {
    index: "04",
    type: "Team project · Travel experience",
    title: "Yacht Adventures",
    description:
      "A responsive yacht rental website created as a team project, with an editorial layout, clear content hierarchy, and polished visual presentation.",
    label: "Team delivery · Editorial UI · Responsive",
    stack: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    className: "project-violet",
    sourceUrl: githubUrl,
    sourceLabel: "GitHub profile",
    liveUrl: "https://serhiikharyponcuk.github.io/yacht-adventures-team-project/",
    images: [
      {
        src: "projects/yacht-adventures.webp",
        alt: "Yacht Adventures responsive rental website",
        width: 481,
        height: 906,
      },
    ],
  },
  {
    index: "05",
    type: "Team project · Education",
    title: "Britlex",
    description:
      "A responsive language-learning landing page created as a team project, with accessible structure, clear service sections, and consistent visual rhythm.",
    label: "Team delivery · Content hierarchy · Responsive",
    stack: ["HTML5", "CSS3", "Responsive Design", "GitHub"],
    className: "project-amber",
    sourceUrl: githubUrl,
    sourceLabel: "GitHub profile",
    liveUrl: "https://serhiikharyponcuk.github.io/britlex-team-project/",
    images: [
      {
        src: "projects/britlex.webp",
        alt: "Britlex language-learning landing page",
        width: 548,
        height: 916,
      },
    ],
  },
];

const certificates: Certificate[] = [
  {
    id: "frontend-english",
    title: "Frontend Development Certificate",
    organization: "GoITeens Academy",
    completed: "December 2025",
    language: "English",
    editionLabel: "Official certificate · English edition",
    note: "International English edition issued by GoITeens Academy.",
    description:
      "Successfully completed the Frontend (HTML/CSS) course and built graduation projects including an informational website and an e-commerce website.",
    skills: ["HTML5", "CSS3", "Responsive Design", "Flexbox", "CSS Grid", "SCSS/SASS", "Git", "GitHub", "Figma", "Website Layout"],
    image: "certificates/frontend-development-goiteens-english.webp",
    imageWidth: 1055,
    imageHeight: 1491,
  },
  {
    id: "frontend-ukrainian",
    title: "Frontend Development Certificate",
    organization: "GoITeens Academy",
    completed: "December 2025",
    language: "Ukrainian",
    editionLabel: "Official certificate · Ukrainian original",
    note: "Original Ukrainian edition with the same verified course details.",
    description:
      "Successfully completed the Frontend (HTML/CSS) course and built graduation projects including an informational website and an e-commerce website.",
    skills: ["HTML5", "CSS3", "Responsive Design", "Flexbox", "CSS Grid", "SCSS/SASS", "Git", "GitHub", "Figma", "Website Layout"],
    image: "certificates/frontend-development-goiteens.webp",
    imageWidth: 1200,
    imageHeight: 1739,
  },
];

const fade = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={fade}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ProjectPreview({ images, label }: { images: [ProjectImage, ...ProjectImage[]]; label: string }) {
  const [primary, secondary] = images;

  return (
    <div className={`preview-window ${secondary ? "preview-window-dual" : ""}`}>
      <div className="preview-bar">
        <i /><i /><i />
        <span>{label}</span>
      </div>
      <div className="project-image-stage">
        <img
          className="project-shot-primary"
          src={primary.src}
          alt={primary.alt}
          width={primary.width}
          height={primary.height}
          sizes="(max-width: 980px) 92vw, 52vw"
          loading="lazy"
          decoding="async"
        />
        {secondary && (
          <div className="project-shot-secondary">
            <span>Gameplay</span>
            <img
              src={secondary.src}
              alt={secondary.alt}
              width={secondary.width}
              height={secondary.height}
              sizes="(max-width: 680px) 52vw, 25vw"
              loading="lazy"
              decoding="async"
            />
          </div>
        )}
        <span className="project-preview-badge">Real project</span>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [sent, setSent] = useState(false);
  const { scrollYProgress } = useScroll();
  const scrollScale = useSpring(scrollYProgress, { stiffness: 150, damping: 24, restDelta: 0.001 });

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const next = saved === "light" || saved === "dark" ? saved : "dark";
    document.documentElement.dataset.theme = next;
    const themeFrame = window.requestAnimationFrame(() => setTheme(next));
    const timer = window.setTimeout(() => setLoaded(true), 700);
    return () => {
      window.cancelAnimationFrame(themeFrame);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const cursor = document.querySelector<HTMLElement>(".cursor-dot");
    if (!cursor || !window.matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    let active = false;
    const move = (event: PointerEvent) => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        cursor.style.transform = `translate(${event.clientX - 5}px, ${event.clientY - 5}px)`;
        if (!active) {
          document.documentElement.classList.add("custom-cursor-active");
          active = true;
        }
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.dataset.theme = next;
  };

  const closeCertificate = useCallback(() => setSelectedCertificate(null), []);

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const replyEmail = String(form.get("email") ?? "");
    const message = String(form.get("message") ?? "");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Portfolio inquiry from ${name}`)}&body=${encodeURIComponent(`${message}\n\nReply to: ${replyEmail}`)}`;
    setSent(true);
  };

  return (
    <>
      <AnimatePresence>
        {!loaded && (
          <motion.div className="loader" exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
            <motion.div className="loader-mark" initial={{ scale: 0.8 }} animate={{ scale: 1 }} />
            <span>Building clarity</span>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div className="scroll-progress" style={{ scaleX: scrollScale }} />
      <div className="cursor-dot" aria-hidden="true" />
      <div className="site-shell">
        <div className="ambient ambient-one" aria-hidden="true" />
        <div className="ambient ambient-two" aria-hidden="true" />
        <div className="particle-field" aria-hidden="true">
          {Array.from({ length: 14 }, (_, index) => <i key={index} style={{ "--i": index } as React.CSSProperties} />)}
        </div>

        <header className="nav-wrap">
          <nav className="nav glass" aria-label="Primary navigation">
            <a className="brand" href="#top" aria-label="Serhii Kharyponchuk, home">
              <span className="brand-mark" aria-hidden="true">SK</span>
              <span>Serhii Kharyponchuk</span>
            </a>
            <div className="nav-links">
              {navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
            </div>
            <div className="nav-actions">
              <span className="availability"><i /> Available for select work</span>
              <button className="icon-button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button className="icon-button mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label="Toggle menu">
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </nav>
          <AnimatePresence>
            {menuOpen && (
              <motion.div id="mobile-menu" className="mobile-menu glass" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                {navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowRight size={15} /></a>)}
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <main id="top">
          <section className="hero section-pad" aria-labelledby="hero-title">
            <motion.div className="hero-copy" initial={{ opacity: 0, y: 30 }} animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 30 }} transition={{ duration: 0.8, delay: 0.1 }}>
              <p className="eyebrow">Frontend & Full Stack JavaScript Developer · Netherlands</p>
              <h1 id="hero-title">I build complete web applications, <span className="gradient-text">front to back.</span></h1>
              <p className="hero-intro">Modern interfaces, practical backend systems, and clean JavaScript architecture—built to solve real problems with performance and detail in mind.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#work">View selected work <ArrowDownRight size={16} /></a>
                <a className="button button-secondary" href="#contact">Start a conversation</a>
              </div>
              <div className="proof" aria-label="Development focus">
                <div><strong>React + TypeScript</strong><span>Frontend</span></div>
                <div><strong>Node + Express</strong><span>Backend</span></div>
                <div><strong>Clean & responsive</strong><span>Approach</span></div>
              </div>
              <div className="social-links" aria-label="Social links">
                <a href={githubUrl} target="_blank" rel="noreferrer" aria-label="Serhii Kharyponchuk on GitHub"><GitBranch size={17} /></a>
                <a href={`mailto:${email}`} aria-label={`Email ${email}`}><Mail size={17} /></a>
              </div>
            </motion.div>
            <motion.div className="signal-stage" aria-label="Product performance visualization" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.96 }} transition={{ duration: 0.9, delay: 0.25 }}>
              <div className="signal-card glass">
                <div className="signal-head"><span>Development stack · Current</span><i>Learning</i></div>
                <div className="signal-grid">
                  <div className="bars" aria-hidden="true">
                    {[29, 42, 36, 53, 49, 68, 62, 78, 74, 92, 86, 98].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
                  </div>
                  <div className="signal-metric"><strong>Full stack</strong><span>From responsive interface to API and database.</span></div>
                </div>
              </div>
              <motion.div className="quality-card glass" animate={{ y: [0, -7, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                <span className="quality-orb" />
                <div><strong>Build quality</strong><small>Clean code · Real solutions</small></div>
                <div className="quality-line" />
              </motion.div>
            </motion.div>
          </section>

          <section id="about" className="section-pad about-section">
            <Reveal className="section-heading">
              <span className="section-index">01 — Profile</span>
              <h2>Thoughtful web development from interface to database.</h2>
            </Reveal>
            <div className="about-grid">
              <Reveal className="about-copy">
                <p className="lead">I’m Serhii, a JavaScript developer in the Netherlands who enjoys building complete web applications.</p>
                <p>My focus is modern frontend development, clean code, responsive interfaces, and full-stack JavaScript. I like taking a real problem from idea to working product—designing the UI, connecting APIs, structuring the backend, and making the final experience fast and reliable. I keep learning, refining my process, and paying attention to the details users actually feel.</p>
                <div className="language-list" aria-label="Languages">
                  <span>English</span><span>Ukrainian</span><span>Russian</span><span>Basic Dutch</span>
                </div>
              </Reveal>
              <Reveal className="principles">
                {["Solve the real problem first.", "Keep the code clear and maintainable.", "Make every screen responsive and fast."].map((item, index) => (
                  <div key={item}><span>0{index + 1}</span><p>{item}</p></div>
                ))}
              </Reveal>
            </div>
          </section>

          <section id="skills" className="section-pad">
            <Reveal className="section-heading compact">
              <span className="section-index">02 — Capabilities</span>
              <h2>A deliberately modern toolkit.</h2>
            </Reveal>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <motion.article className="skill-card glass" key={skill.title} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <span>{skill.number}</span>
                  <Code2 size={22} aria-hidden="true" />
                  <h3>{skill.title}</h3>
                  <p>{skill.text}</p>
                  <ul>{skill.items.map((item) => <li key={item}>{item}</li>)}</ul>
                </motion.article>
              ))}
            </div>
          </section>

          <section id="work" className="section-pad work-section">
            <Reveal className="section-heading">
              <span className="section-index">03 — Featured work</span>
              <h2>Projects built to turn ideas into useful experiences.</h2>
            </Reveal>
            <div className="project-list">
              {projects.map((project) => (
                <motion.article className={`project-card ${project.className} ${project.featured ? "project-featured" : ""}`} key={project.title} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-70px" }} variants={fade}>
                  <div className="project-copy">
                    <span className="project-kicker">{project.index} / {project.type}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    {(project.problem || project.challenge) && (
                      <div className="project-detail-grid">
                        {project.problem && <div><span>Purpose</span><p>{project.problem}</p></div>}
                        {project.challenge && <div><span>Technical challenge</span><p>{project.challenge}</p></div>}
                      </div>
                    )}
                    {project.features && (
                      <div className="project-features">
                        <span>Core functionality</span>
                        <ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                      </div>
                    )}
                    <strong className="impact">{project.label}</strong>
                    <ul className="tech-list">{project.stack.map((tech) => <li key={tech}>{tech}</li>)}</ul>
                    <div className="project-actions">
                      <a className="button button-secondary" href={project.sourceUrl} target="_blank" rel="noreferrer"><GitBranch size={15} /> {project.sourceLabel}</a>
                      {project.liveUrl && <a className="button button-primary" href={project.liveUrl} target="_blank" rel="noreferrer">Live project <ExternalLink size={14} /></a>}
                    </div>
                  </div>
                  <div className="project-preview" aria-label={`${project.title} interface preview`}>
                    <ProjectPreview images={project.images} label={project.title} />
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          <section id="certificates" className="section-pad">
            <Reveal className="section-heading compact">
              <span className="section-index">04 — Certificates</span>
              <h2>One verified achievement, presented internationally.</h2>
            </Reveal>
            <div className="certificates-list">
              {certificates.map((certificate) => (
                <Reveal className="certificate-showcase glass" key={certificate.id}>
                  <button
                    className="certificate-media"
                    onClick={() => setSelectedCertificate(certificate)}
                    aria-label={`Open ${certificate.title}, ${certificate.language} edition, fullscreen`}
                  >
                    <img
                      src={certificate.image}
                      alt={`${certificate.title}, ${certificate.language} edition, from ${certificate.organization}`}
                      width={certificate.imageWidth}
                      height={certificate.imageHeight}
                      sizes="(max-width: 900px) 92vw, 48vw"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="certificate-image-overlay"><Plus size={17} /> View fullscreen</span>
                  </button>
                  <div className="certificate-details">
                    <span className="credential-label"><i /> {certificate.editionLabel}</span>
                    <h3>{certificate.title}</h3>
                    <dl>
                      <div><dt>Organization</dt><dd>{certificate.organization}</dd></div>
                      <div><dt>Completed</dt><dd>{certificate.completed}</dd></div>
                      <div><dt>Language</dt><dd>{certificate.language}</dd></div>
                    </dl>
                    <p>{certificate.description}</p>
                    <span className="translation-note">{certificate.note}</span>
                    <ul className="certificate-skills" aria-label="Skills obtained">
                      {certificate.skills.map((skill) => <li key={skill}>{skill}</li>)}
                    </ul>
                    <button className="button button-primary certificate-open" onClick={() => setSelectedCertificate(certificate)}>
                      Open certificate <ExternalLink size={14} />
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="github" className="section-pad github-section">
            <Reveal className="github-panel glass">
              <div className="github-copy">
                <span className="section-index">05 — GitHub</span>
                <h2>Code, progress, and continuous learning.</h2>
                <p>My GitHub is the working record behind these projects: frontend experiments, backend architecture, steady iteration, and practical problem-solving.</p>
                <a className="text-link" href={githubUrl} target="_blank" rel="noreferrer">@SerhiiKharyponcuk <ExternalLink size={14} /></a>
              </div>
              <div className="github-stats">
                <div><strong>React</strong><span>Interfaces</span></div>
                <div><strong>TypeScript</strong><span>Clean code</span></div>
                <div><strong>Node.js</strong><span>Backends</span></div>
              </div>
              <div className="contribution-map" aria-label="GitHub contribution activity visualization">
                {Array.from({ length: 91 }, (_, index) => <i key={index} className={`level-${(index * 7 + index % 5) % 5}`} />)}
              </div>
            </Reveal>
          </section>

          <section id="contact" className="section-pad contact-section">
            <Reveal className="contact-copy">
              <span className="section-index">06 — Contact</span>
              <h2>Have a real problem worth building for?</h2>
              <p>I’m open to frontend and full-stack JavaScript opportunities, collaborations, and projects where clean implementation matters.</p>
              <a href={`mailto:${email}`}>{email} <ArrowDownRight size={18} /></a>
              <div className="contact-links" aria-label="Contact profiles">
                <a href={githubUrl} target="_blank" rel="noreferrer">GitHub · @SerhiiKharyponcuk</a>
                <a href="https://t.me/" target="_blank" rel="noreferrer">Telegram placeholder</a>
              </div>
            </Reveal>
            <Reveal>
              <form className="contact-form glass" onSubmit={submitContact}>
                <label>Name<input name="name" autoComplete="name" required placeholder="Your name" /></label>
                <label>Email<input name="email" type="email" autoComplete="email" required placeholder="you@company.com" /></label>
                <label>What are you building?<textarea name="message" required rows={4} placeholder="A short note about the product, team, or problem." /></label>
                <button className="button button-primary" type="submit">{sent ? <><Check size={16} /> Email prepared</> : <>Send inquiry <Send size={15} /></>}</button>
              </form>
            </Reveal>
          </section>
        </main>

        <footer className="footer">
          <a className="brand" href="#top"><span className="brand-mark">SK</span> Serhii Kharyponchuk</a>
          <p>Designed and engineered with intent. © 2026</p>
          <div><a href={githubUrl} target="_blank" rel="noreferrer" aria-label="Serhii Kharyponchuk on GitHub"><GitBranch size={16} /></a></div>
        </footer>
      </div>

      <AnimatePresence>
        {selectedCertificate && (
          <Suspense fallback={null}>
            <CertificateModal certificate={selectedCertificate} onClose={closeCertificate} />
          </Suspense>
        )}
      </AnimatePresence>
    </>
  );
}
