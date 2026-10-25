import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PixelArt, { GIRL, GIRL_WAVE, ICONS } from './PixelArt';
import { sounds } from '../../sound';

const LINES = [
    'Hi! Welcome to my desktop — click an icon to explore.',
    'Psst… the trash can hides my rejected concepts.',
    'Every window is draggable. Go on, make a mess.',
    '94.4% accuracy. The other 5.6% is personality.',
];

const WAVE_LINE = 'Still there? *waves* — the icons are waiting!';

export default function PixelGirl({ booted, onUnlock }) {
    const [bubble, setBubble] = useState(false);
    const [line, setLine] = useState(0);
    const [pos, setPos] = useState(58);
    const [facing, setFacing] = useState(1);
    const [waving, setWaving] = useState(false);
    const lastActive = useRef(Date.now());
    const posRef = useRef(58);

    useEffect(() => {
        if (!booted) return;
        const show = setTimeout(() => setBubble(true), 1400);
        const hide = setTimeout(() => setBubble(false), 8000);
        return () => { clearTimeout(show); clearTimeout(hide); };
    }, [booted]);

    useEffect(() => {
        const ping = () => {
            lastActive.current = Date.now();
            setWaving(false);
        };
        window.addEventListener('mousemove', ping);
        window.addEventListener('pointerdown', ping);
        window.addEventListener('keydown', ping);
        return () => {
            window.removeEventListener('mousemove', ping);
            window.removeEventListener('pointerdown', ping);
            window.removeEventListener('keydown', ping);
        };
    }, []);

    useEffect(() => {
        const iv = setInterval(() => {
            if (Date.now() - lastActive.current > 20000) {
                setWaving(true);
                setBubble(true);
                return;
            }
            const next = 25 + Math.random() * 45;
            setFacing(next < posRef.current ? -1 : 1);
            posRef.current = next;
            setPos(next);
        }, 7000);
        return () => clearInterval(iv);
    }, []);

    const handleClick = () => {
        sounds.click();
        onUnlock('girl');
        setWaving(false);
        setLine((l) => (l + 1) % LINES.length);
        setBubble(true);
    };

    return (
        <>
            <motion.button
                data-testid="pixel-cat"
                aria-label="Pixel cat"
                onClick={() => { sounds.meow(); onUnlock('cat'); }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, left: `calc(${pos}vw - 88px)` }}
                transition={{
                    opacity: { delay: 1.4, duration: 0.4 },
                    y: { delay: 1.4, type: 'spring', stiffness: 160, damping: 16 },
                    left: { duration: 8.5, ease: 'easeInOut' },
                }}
                className="absolute z-[19] border-0 bg-transparent p-0 float-soft"
                style={{ bottom: 100, left: 'calc(58vw - 88px)' }}
            >
                <span className="block" style={{ transform: `scaleX(${facing})` }}>
                    <PixelArt rows={ICONS.cat} px={5} />
                </span>
            </motion.button>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0, left: `${pos}vw` }}
                transition={{
                    opacity: { delay: 0.9, duration: 0.4 },
                    y: { delay: 0.9, type: 'spring', stiffness: 160, damping: 16 },
                    left: { duration: 6, ease: 'easeInOut' },
                }}
                className="absolute z-20 flex flex-col items-center"
                style={{ bottom: 108, left: '58vw' }}
            >
                <AnimatePresence>
                    {bubble && (
                        <motion.div
                            data-testid="girl-speech-bubble"
                            initial={{ opacity: 0, scale: 0.8, y: 8 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.85 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                            className="speech-bubble relative mb-3 w-48 p-3"
                        >
                            <p className="font-vt text-base leading-tight" style={{ color: '#2D2638' }}>
                                {waving ? WAVE_LINE : LINES[line]}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
                <button
                    data-testid="pixel-girl"
                    aria-label="Pixel girl — Stuti's avatar"
                    onClick={handleClick}
                    className="girl-bob border-0 bg-transparent p-0"
                >
                    <span className="block" style={{ transform: `scaleX(${facing})` }}>
                        <PixelArt rows={waving ? GIRL_WAVE : GIRL} px={6} />
                    </span>
                </button>
            </motion.div>
        </>
    );
}
