import { useState } from 'react';
import PixelArt, { ICONS } from './PixelArt';
import { PROJECTS, SKILLS, EXPERIENCE, EDUCATION, CERTS, ABOUT, CONTACT, TRASH_ITEMS, PROJECT_GITHUB, ACHIEVEMENTS, STUTIOS_INFO } from '../../data';
import { sounds } from '../../sound';

const ink = '#2D2638';
const muted = '#6E6A78';

const SectionLabel = ({ children }) => (
    <p className="font-pixel text-[9px] mb-2" style={{ color: '#FF6B8B' }}>{children}</p>
);

const Chip = ({ children }) => (
    <span className="chip inline-block font-vt text-base px-2 py-0.5 mr-1.5 mb-1.5" style={{ background: '#F3EFF8', color: ink }}>
        {children}
    </span>
);

const ResumeButton = ({ testId }) => (
    <a
        data-testid={testId}
        href="/stuti_resume.pdf"
        download="Stuti_Handa_Resume.pdf"
        onClick={() => sounds.click()}
        className="pixel-btn inline-block font-pixel text-[9px] px-4 py-2 mt-4 no-underline"
        style={{ background: '#61D69F', color: ink }}
    >
        ↓ DOWNLOAD RESUME
    </a>
);

function ProjectBody({ project }) {
    return (
        <div data-testid={`project-content-${project.id}`}>
            <p className="font-vt text-lg" style={{ color: muted }}>{project.subtitle}</p>
            <div className="chip inline-block mt-3 px-3 py-1.5" style={{ background: '#FEF9C3' }}>
                <span className="font-pixel text-[8px]" style={{ color: ink }}>★ {project.metric}</span>
            </div>
            <p className="text-sm mt-4 leading-relaxed" style={{ color: ink }}>{project.description}</p>
            <div className="mt-4">
                <SectionLabel>HIGHLIGHTS</SectionLabel>
                <ul className="space-y-2">
                    {project.highlights.map((h, i) => (
                        <li key={i} className="flex gap-2 text-sm" style={{ color: ink }}>
                            <span className="font-pixel text-[8px] mt-1 shrink-0" style={{ color: '#FF6B8B' }}>▸</span>
                            <span>{h}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-4">
                <SectionLabel>STACK</SectionLabel>
                <div className="flex flex-wrap">{project.stack.map((s) => <Chip key={s}>{s}</Chip>)}</div>
            </div>
            <a
                data-testid={`project-github-${project.id}`}
                href={PROJECT_GITHUB[project.id]}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.click()}
                className="pixel-btn inline-block font-pixel text-[9px] px-4 py-2 mt-4 no-underline"
                style={{ background: '#2D2638', color: '#fff' }}
            >
                VIEW ON GITHUB →
            </a>
            <p className="font-vt text-base mt-3" style={{ color: muted }}>tag: {project.tag}</p>
        </div>
    );
}

function AboutBody() {
    return (
        <div data-testid="about-content" className="flex flex-col sm:flex-row gap-5">
            <div className="shrink-0 self-start flex flex-col items-start">
                <div className="pixel-frame p-3" style={{ background: '#F3EFF8' }}>
                    <PixelArt rows={ICONS.avatar} px={6} />
                </div>
                <ResumeButton testId="download-resume-button" />
            </div>
            <div>
                <h2 className="font-pixel text-sm sm:text-base" style={{ color: ink }}>{ABOUT.name}</h2>
                <p className="font-vt text-lg mt-1" style={{ color: '#FF6B8B' }}>{ABOUT.role}</p>
                <p className="text-sm mt-3 leading-relaxed" style={{ color: ink }}>{ABOUT.summary}</p>
                <div className="mt-4">
                    <SectionLabel>EDUCATION</SectionLabel>
                    <p className="text-sm font-semibold" style={{ color: ink }}>{EDUCATION.school}</p>
                    <p className="text-sm" style={{ color: ink }}>{EDUCATION.degree}</p>
                    <p className="font-vt text-base" style={{ color: muted }}>
                        {EDUCATION.period} • CGPA {EDUCATION.cgpa}
                    </p>
                </div>
                <div className="mt-4">
                    <SectionLabel>CERTIFICATIONS</SectionLabel>
                    <ul className="space-y-1">
                        {CERTS.map((c) => (
                            <li key={c} className="text-sm flex gap-2" style={{ color: ink }}>
                                <span style={{ color: '#61D69F' }}>✓</span> {c}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function SkillsBody() {
    return (
        <div data-testid="skills-content" className="space-y-4">
            {SKILLS.map((s) => (
                <div key={s.group}>
                    <SectionLabel>{s.group.toUpperCase()}</SectionLabel>
                    <div className="flex flex-wrap">{s.items.map((i) => <Chip key={i}>{i}</Chip>)}</div>
                </div>
            ))}
        </div>
    );
}

function ProjectsBody({ onOpenWindow }) {
    return (
        <div data-testid="projects-content" className="space-y-3">
            {PROJECTS.map((p) => (
                <button
                    key={p.id}
                    data-testid={`projects-list-${p.id}`}
                    onClick={() => { sounds.open(); onOpenWindow(p.id); }}
                    className="pixel-btn w-full text-left flex items-center gap-3 p-3 bg-white"
                >
                    <PixelArt rows={ICONS[p.icon]} px={3} />
                    <span className="min-w-0">
                        <span className="font-pixel text-[9px] block" style={{ color: ink }}>{p.title}</span>
                        <span className="font-vt text-base block truncate" style={{ color: muted }}>{p.subtitle}</span>
                    </span>
                    <span className="ml-auto font-pixel text-[10px]" style={{ color: '#FF6B8B' }}>→</span>
                </button>
            ))}
        </div>
    );
}

function ExperienceBody() {
    return (
        <div data-testid="experience-content" className="space-y-5">
            {EXPERIENCE.map((e) => (
                <div key={e.role} className="chip p-4" style={{ background: '#F3EFF8' }}>
                    <p className="font-pixel text-[10px]" style={{ color: ink }}>{e.role}</p>
                    <p className="font-vt text-lg" style={{ color: '#FF6B8B' }}>{e.org}</p>
                    <p className="font-vt text-base" style={{ color: muted }}>{e.period}</p>
                    <ul className="mt-2 space-y-1.5">
                        {e.bullets.map((b, i) => (
                            <li key={i} className="flex gap-2 text-sm" style={{ color: ink }}>
                                <span className="font-pixel text-[8px] mt-1 shrink-0" style={{ color: '#FF6B8B' }}>▸</span>
                                <span>{b}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <div className="chip p-4" style={{ background: '#FEF9C3' }}>
                <SectionLabel>EDUCATION</SectionLabel>
                <p className="text-sm font-semibold" style={{ color: ink }}>{EDUCATION.school}</p>
                <p className="text-sm" style={{ color: ink }}>{EDUCATION.degree}</p>
                <p className="font-vt text-base" style={{ color: muted }}>{EDUCATION.period} • CGPA {EDUCATION.cgpa}</p>
            </div>
        </div>
    );
}

function ContactBody() {
    const links = [
        { label: 'EMAIL', value: CONTACT.email, href: `mailto:${CONTACT.email}`, testId: 'contact-email-link' },
        { label: 'PHONE', value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, '')}`, testId: 'contact-phone-link' },
        { label: 'LINKEDIN', value: 'linkedin.com/in/stuti-handa', href: CONTACT.linkedin, testId: 'contact-linkedin-link' },
        { label: 'GITHUB', value: 'github.com/Stutihanda', href: CONTACT.github, testId: 'contact-github-link' },
    ];
    return (
        <div data-testid="contact-content" className="space-y-3">
            <p className="text-sm leading-relaxed" style={{ color: ink }}>
                Open to internships and collaborations in data science, ML, and GenAI. Based in {CONTACT.location}.
            </p>
            {links.map((l) => (
                <a
                    key={l.label}
                    data-testid={l.testId}
                    href={l.href}
                    target={l.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    onClick={() => sounds.click()}
                    className="pixel-btn flex items-center justify-between gap-3 p-3 bg-white no-underline"
                >
                    <span className="font-pixel text-[9px]" style={{ color: '#FF6B8B' }}>{l.label}</span>
                    <span className="font-vt text-base truncate" style={{ color: ink }}>{l.value}</span>
                </a>
            ))}
            <div>
                <ResumeButton testId="contact-resume-link" />
            </div>
        </div>
    );
}

function TrashBody({ onUnlock }) {
    const [items, setItems] = useState(TRASH_ITEMS);
    return (
        <div data-testid="trash-content">
            <p className="font-vt text-lg mb-3" style={{ color: muted }}>
                top-secret graveyard of ideas that didn't make the cut…
            </p>
            {items.length === 0 ? (
                <p className="font-pixel text-[10px] py-8 text-center" style={{ color: muted }}>
                    TRASH EMPTIED. REGRETS: 0.
                </p>
            ) : (
                <ul className="space-y-2">
                    {items.map((t) => (
                        <li key={t.name} className="chip p-3" style={{ background: '#FFF' }}>
                            <p className="font-pixel text-[9px]" style={{ color: ink }}>{t.name}</p>
                            <p className="font-vt text-base" style={{ color: muted }}>{t.reason}</p>
                        </li>
                    ))}
                </ul>
            )}
            {items.length > 0 && (
                <button
                    data-testid="empty-trash-button"
                    onClick={() => { sounds.trash(); setItems([]); onUnlock('trash'); }}
                    className="pixel-btn font-pixel text-[9px] px-4 py-2 mt-4"
                    style={{ background: '#FF6B8B', color: '#fff' }}
                >
                    EMPTY TRASH
                </button>
            )}
        </div>
    );
}

function TrophyBody({ unlocked }) {
    const list = Object.entries(ACHIEVEMENTS);
    return (
        <div data-testid="trophy-content">
            <p className="font-vt text-lg mb-3" style={{ color: muted }}>
                {unlocked.size} / {list.length} unlocked — keep exploring the desktop…
            </p>
            <ul className="space-y-2">
                {list.map(([tid, t]) => {
                    const has = unlocked.has(tid);
                    return (
                        <li
                            key={tid}
                            data-testid={`trophy-${tid}`}
                            className="chip p-3 flex items-center gap-3"
                            style={{ background: has ? '#FEF9C3' : '#F3EFF8', opacity: has ? 1 : 0.55 }}
                        >
                            <span style={{ filter: has ? 'none' : 'grayscale(1)' }}>
                                <PixelArt rows={ICONS.trophy} px={3} />
                            </span>
                            <div>
                                <p className="font-pixel text-[9px]" style={{ color: ink }}>
                                    {has ? t.title : '???'}
                                </p>
                                <p className="font-vt text-base" style={{ color: muted }}>
                                    {has ? 'Unlocked' : `Hint: ${t.desc}`}
                                </p>
                            </div>
                            {has && (
                                <span className="font-pixel text-[10px] ml-auto" style={{ color: '#61D69F' }}>✓</span>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

function StutiosBody({ visitors }) {
    return (
        <div data-testid="stutios-content" className="flex flex-col items-center text-center py-2">
            <div className="float-soft">
                <PixelArt rows={ICONS.heart} px={8} />
            </div>
            <h2 className="font-pixel text-sm mt-4" style={{ color: ink }}>
                Stuti<span style={{ color: '#FF6B8B' }}>OS</span>
            </h2>
            <p className="font-vt text-lg mt-1" style={{ color: muted }}>version {STUTIOS_INFO.version}</p>
            <p className="text-sm mt-3" style={{ color: ink }}>{STUTIOS_INFO.credit}</p>
            <div className="chip mt-4 px-4 py-2" style={{ background: '#F3EFF8' }}>
                <p className="font-pixel text-[8px]" style={{ color: '#FF6B8B' }}>SYSTEM SPECS</p>
                <ul className="mt-2 space-y-1">
                    {STUTIOS_INFO.specs.map((s) => (
                        <li key={s} className="font-vt text-base" style={{ color: muted }}>{s}</li>
                    ))}
                </ul>
            </div>
            {visitors !== null && visitors !== undefined && (
                <p className="font-vt text-base mt-3" style={{ color: muted }}>
                    You are visitor #{visitors} — thanks for booting up.
                </p>
            )}
        </div>
    );
}

export default function WindowContent({ id, onOpenWindow, onUnlock, unlocked, visitors }) {
    if (id === 'about') return <AboutBody />;
    if (id === 'skills') return <SkillsBody />;
    if (id === 'projects') return <ProjectsBody onOpenWindow={onOpenWindow} />;
    if (id === 'experience') return <ExperienceBody />;
    if (id === 'contact') return <ContactBody />;
    if (id === 'trophy') return <TrophyBody unlocked={unlocked} />;
    if (id === 'stutios') return <StutiosBody visitors={visitors} />;
    if (id === 'trash') return <TrashBody onUnlock={onUnlock} />;
    const project = PROJECTS.find((p) => p.id === id);
    if (project) return <ProjectBody project={project} />;
    return null;
}
