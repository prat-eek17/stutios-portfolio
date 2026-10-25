import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import '@/App.css';
import BootScreen from '@/components/desktop/BootScreen';
import TopMenuBar from '@/components/desktop/TopMenuBar';
import FloatingClouds from '@/components/desktop/FloatingClouds';
import StickyNote from '@/components/desktop/StickyNote';
import PixelGirl from '@/components/desktop/PixelGirl';
import DesktopIcon from '@/components/desktop/DesktopIcon';
import Dock from '@/components/desktop/Dock';
import MacOSWindow from '@/components/desktop/MacOSWindow';
import WindowContent from '@/components/desktop/WindowContent';
import PixelArt, { HEART, TOASTER, installCursors } from '@/components/desktop/PixelArt';
import { DESKTOP_ICONS, WINDOW_META, WINDOW_POS, TICKER_ITEMS, ACHIEVEMENTS } from '@/data';
import { initAudio, setMuted, sounds, music } from '@/sound';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
const THEMES = ['pastel', 'night', 'mint', 'vaporwave'];
const SAVER_IDLE_MS = 45000;

function Ticker() {
    const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
    return (
        <div
            data-testid="skills-ticker"
            className="fixed bottom-0 left-0 right-0 z-[40] overflow-hidden h-6 flex items-center"
            style={{ background: 'rgba(45,38,56,0.85)' }}
        >
            <div className="ticker-track">
                {items.map((t, i) => (
                    <span key={i} className="font-vt text-sm px-4 whitespace-nowrap" style={{ color: '#FFDAC1' }}>
                        {t} <span style={{ color: '#FF6B8B' }}>✦</span>
                    </span>
                ))}
            </div>
        </div>
    );
}

function Stars() {
    const stars = useMemo(
        () =>
            Array.from({ length: 32 }, (_, i) => ({
                id: i,
                left: `${Math.random() * 96 + 2}%`,
                top: `${Math.random() * 70 + 4}%`,
                delay: `${(Math.random() * 4).toFixed(2)}s`,
                duration: `${(2 + Math.random() * 3).toFixed(2)}s`,
            })),
        []
    );
    return (
        <div data-testid="night-stars" className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {stars.map((s) => (
                <span
                    key={s.id}
                    className="star"
                    style={{ left: s.left, top: s.top, animationDelay: s.delay, animationDuration: s.duration }}
                />
            ))}
        </div>
    );
}

function KonamiHearts() {
    const hearts = useMemo(
        () =>
            Array.from({ length: 18 }, (_, i) => ({
                id: i,
                left: `${(i * 97) % 100}%`,
                delay: `${(i % 6) * 0.25}s`,
                duration: `${2.4 + (i % 4) * 0.5}s`,
                px: 4 + (i % 3) * 2,
            })),
        []
    );
    return (
        <div data-testid="konami-hearts" className="fixed inset-0 z-[90] pointer-events-none overflow-hidden" aria-hidden="true">
            {hearts.map((h) => (
                <span
                    key={h.id}
                    className="konami-heart"
                    style={{ left: h.left, animationDelay: h.delay, animationDuration: h.duration }}
                >
                    <PixelArt rows={HEART} px={h.px} />
                </span>
            ))}
        </div>
    );
}

function ScreenSaver() {
    const toasters = useMemo(
        () =>
            Array.from({ length: 7 }, (_, i) => ({
                id: i,
                top: `${(i * 13) % 70}%`,
                delay: `${i * 3.2}s`,
                duration: `${17 + (i % 4) * 5}s`,
                px: 5 + (i % 3),
            })),
        []
    );
    return (
        <motion.div
            data-testid="screen-saver"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="screen-saver fixed inset-0 z-[95] overflow-hidden"
        >
            <div className="scanlines" />
            {toasters.map((t) => (
                <span
                    key={t.id}
                    className="toaster"
                    style={{ top: t.top, animationDelay: t.delay, animationDuration: t.duration }}
                >
                    <PixelArt rows={TOASTER} px={t.px} />
                </span>
            ))}
            <p
                className="font-pixel text-[9px] absolute bottom-8 left-1/2 -translate-x-1/2 blink-step"
                style={{ color: '#C7CEEA' }}
            >
                MOVE MOUSE TO WAKE
            </p>
        </motion.div>
    );
}

export default function App() {
    const [booted, setBooted] = useState(false);
    const [open, setOpen] = useState([]);
    const [minimized, setMinimized] = useState([]);
    const [muted, setMutedState] = useState(true);
    const [theme, setTheme] = useState(() => {
        try {
            const saved = localStorage.getItem('stutios-theme');
            if (saved && THEMES.includes(saved)) return saved;
            return localStorage.getItem('stutios-night') === '1' ? 'night' : 'pastel';
        } catch { return 'pastel'; }
    });
    const [musicOn, setMusicOn] = useState(false);
    const [saver, setSaver] = useState(false);
    const [toast, setToast] = useState(null);
    const [hearts, setHearts] = useState(false);
    const [visitors, setVisitors] = useState(null);
    const [unlocked, setUnlocked] = useState(() => {
        try { return new Set(JSON.parse(localStorage.getItem('stutios-achievements') || '[]')); } catch { return new Set(); }
    });
    const toastTimer = useRef(null);
    const konamiIdx = useRef(0);
    const lastActive = useRef(Date.now());

    useEffect(() => {
        installCursors();
    }, []);

    const unlock = useCallback((id) => {
        setUnlocked((prev) => {
            if (prev.has(id)) return prev;
            const next = new Set(prev);
            next.add(id);
            try { localStorage.setItem('stutios-achievements', JSON.stringify([...next])); } catch { /* ignore */ }
            sounds.achievement();
            setToast(ACHIEVEMENTS[id]);
            clearTimeout(toastTimer.current);
            toastTimer.current = setTimeout(() => setToast(null), 3500);
            return next;
        });
    }, []);

    const openWindow = useCallback((id) => {
        setMinimized((m) => m.filter((x) => x !== id));
        setOpen((prev) => {
            if (prev.length === 0) setTimeout(() => unlock('first-window'), 600);
            return prev.includes(id) ? [...prev.filter((x) => x !== id), id] : [...prev, id];
        });
    }, [unlock]);

    const closeWindow = useCallback((id) => {
        setOpen((prev) => prev.filter((x) => x !== id));
        setMinimized((m) => m.filter((x) => x !== id));
    }, []);

    const minimizeWindow = useCallback((id) => {
        setMinimized((m) => (m.includes(id) ? m : [...m, id]));
    }, []);

    const focusWindow = useCallback((id) => {
        setOpen((prev) => (prev[prev.length - 1] === id ? prev : [...prev.filter((x) => x !== id), id]));
    }, []);

    const cycleTheme = useCallback(() => {
        setTheme((t) => {
            const next = THEMES[(THEMES.indexOf(t) + 1) % THEMES.length];
            try { localStorage.setItem('stutios-theme', next); } catch { /* ignore */ }
            if (next === 'night') setTimeout(() => unlock('night'), 300);
            return next;
        });
    }, [unlock]);

    const toggleMusic = useCallback((on) => {
        if (on) music.start();
        else music.stop();
        setMusicOn(on);
    }, []);

    useEffect(() => {
        const ping = () => {
            lastActive.current = Date.now();
            setSaver(false);
        };
        window.addEventListener('mousemove', ping);
        window.addEventListener('pointerdown', ping);
        window.addEventListener('keydown', ping);
        const iv = setInterval(() => {
            if (Date.now() - lastActive.current > SAVER_IDLE_MS) {
                setSaver((s) => {
                    if (!s) unlock('saver');
                    return true;
                });
            }
        }, 5000);
        return () => {
            window.removeEventListener('mousemove', ping);
            window.removeEventListener('pointerdown', ping);
            window.removeEventListener('keydown', ping);
            clearInterval(iv);
        };
    }, [unlock]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') {
                setOpen((prev) => {
                    if (prev.length === 0) return prev;
                    sounds.close();
                    return prev.slice(0, -1);
                });
                return;
            }
            const expected = KONAMI[konamiIdx.current];
            if (e.key === expected || e.key.toLowerCase() === expected) {
                konamiIdx.current += 1;
                if (konamiIdx.current === KONAMI.length) {
                    konamiIdx.current = 0;
                    unlock('konami');
                    setHearts(true);
                    setTimeout(() => setHearts(false), 4200);
                }
            } else {
                konamiIdx.current = e.key === KONAMI[0] ? 1 : 0;
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [unlock]);

    const handleBoot = () => {
        initAudio();
        setMuted(false);
        setMutedState(false);
        sounds.boot();
        music.start();
        setMusicOn(true);
        setBooted(true);
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/visitors/hit`, { method: 'POST' })
            .then((r) => r.json())
            .then((d) => setVisitors(d.count))
            .catch(() => {});
    };

    const visibleWindows = open.filter((id) => !minimized.includes(id));
    const showStars = theme === 'night' || theme === 'vaporwave';

    return (
        <div
            data-testid="stutios-desktop"
            className={`desktop-bg fixed inset-0 overflow-hidden select-none ${theme !== 'pastel' ? theme : ''}`}
        >
            <AnimatePresence>{!booted && <BootScreen key="boot" onStart={handleBoot} />}</AnimatePresence>

            {booted && (
                <>
                    <div className="desktop-grain" />
                    {showStars && <Stars />}
                    <FloatingClouds />
                    <TopMenuBar
                        onOpenWindow={openWindow}
                        muted={muted}
                        onToggleMute={setMutedState}
                        theme={theme}
                        onCycleTheme={cycleTheme}
                        musicOn={musicOn}
                        onToggleMusic={toggleMusic}
                        visitors={visitors}
                    />
                    <StickyNote />

                    {DESKTOP_ICONS.map((icon, i) => (
                        <DesktopIcon
                            key={icon.id}
                            index={i}
                            icon={icon.icon}
                            title={icon.title}
                            x={icon.x}
                            y={icon.y}
                            testId={`desktop-icon-${icon.id}`}
                            onOpen={() => openWindow(icon.id)}
                        />
                    ))}

                    <AnimatePresence>
                        {visibleWindows.map((id) => (
                            <MacOSWindow
                                key={id}
                                id={id}
                                title={WINDOW_META[id].title}
                                icon={WINDOW_META[id].icon}
                                pos={WINDOW_POS[id]}
                                zIndex={30 + open.indexOf(id)}
                                isTop={open[open.length - 1] === id}
                                onClose={() => closeWindow(id)}
                                onMinimize={() => minimizeWindow(id)}
                                onFocus={() => focusWindow(id)}
                            >
                                <WindowContent id={id} onOpenWindow={openWindow} onUnlock={unlock} unlocked={unlocked} visitors={visitors} />
                            </MacOSWindow>
                        ))}
                    </AnimatePresence>

                    <PixelGirl booted={booted} onUnlock={unlock} />
                    <Ticker />
                    <Dock onOpenWindow={openWindow} openIds={open} minimizedIds={minimized} />

                    {hearts && <KonamiHearts />}

                    <AnimatePresence>{saver && <ScreenSaver key="saver" />}</AnimatePresence>

                    <AnimatePresence>
                        {toast && (
                            <motion.div
                                data-testid="achievement-toast"
                                initial={{ opacity: 0, x: 60 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 60 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                                className="achievement-toast fixed z-[96] p-3 flex items-center gap-3"
                                style={{ right: 16, bottom: 120 }}
                            >
                                <PixelArt rows={HEART} px={3} />
                                <div>
                                    <p className="font-pixel text-[8px]" style={{ color: '#A16207' }}>
                                        ACHIEVEMENT UNLOCKED
                                    </p>
                                    <p className="font-pixel text-[10px] mt-1" style={{ color: '#2D2638' }}>
                                        {toast.title}
                                    </p>
                                    <p className="font-vt text-base" style={{ color: '#6E6A78' }}>
                                        {toast.desc}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}
        </div>
    );
}
