import { useEffect, useState } from 'react';
import PixelArt, { HEART, ICONS, MOON, SUN, STAR, NOTE } from './PixelArt';
import { sounds, setMuted } from '../../sound';

function useClock() {
    const [now, setNow] = useState(new Date());
    useEffect(() => {
        const iv = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(iv);
    }, []);
    return now;
}

const pad = (n) => String(n).padStart(2, '0');

const THEME_ICONS = { pastel: SUN, night: MOON, mint: ICONS.terminal, vaporwave: STAR };
const THEME_LABELS = { pastel: 'Pastel', night: 'Night', mint: 'Mint Terminal', vaporwave: 'Vaporwave' };

export default function TopMenuBar({ onOpenWindow, muted, onToggleMute, theme, onCycleTheme, musicOn, onToggleMusic, visitors }) {
    const now = useClock();
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const clock = `${days[now.getDay()]} ${pad(now.getDate())} ${months[now.getMonth()]}  ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

    return (
        <header
            data-testid="top-menu-bar"
            className="menu-bar fixed top-0 left-0 right-0 z-[60] h-9 flex items-center justify-between px-2 sm:px-4"
        >
            <div className="flex items-center gap-1 sm:gap-2">
                <button
                    data-testid="menu-logo-button"
                    aria-label="About StutiOS"
                    onClick={() => { sounds.open(); onOpenWindow('stutios'); }}
                    className="menu-item flex items-center gap-2 pr-2 pl-1 py-0.5"
                >
                    <PixelArt rows={HEART} px={2} />
                    <span className="font-pixel text-[10px] hidden sm:inline" style={{ color: '#2D2638' }}>
                        StutiOS
                    </span>
                </button>
                <button
                    data-testid="menu-file-button"
                    onClick={() => { sounds.click(); onOpenWindow('about'); }}
                    className="menu-item font-pixel text-[9px] px-2 py-1 hidden sm:block"
                >
                    File
                </button>
                <button
                    data-testid="menu-projects-button"
                    onClick={() => { sounds.click(); onOpenWindow('projects'); }}
                    className="menu-item font-pixel text-[9px] px-2 py-1"
                >
                    Projects
                </button>
                <button
                    data-testid="menu-help-button"
                    onClick={() => { sounds.click(); onOpenWindow('contact'); }}
                    className="menu-item font-pixel text-[9px] px-2 py-1 hidden sm:block"
                >
                    Help
                </button>
                <span className="font-vt text-base ml-2 hidden lg:inline" style={{ color: '#6E6A78' }}>
                    Stuti Handa — Data Scientist
                </span>
                {visitors !== null && (
                    <span
                        data-testid="visitor-counter"
                        className="hidden md:flex items-center gap-1.5 px-2 py-0.5 ml-1"
                        style={{ background: '#2D2638', border: '2px solid #2D2638' }}
                    >
                        <span className="font-pixel text-[7px]" style={{ color: '#FF6B8B' }}>VISITORS</span>
                        <span className="font-vt text-base tabular-nums leading-none" style={{ color: '#61D69F' }}>
                            {String(visitors).padStart(5, '0')}
                        </span>
                    </span>
                )}
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
                <button
                    data-testid="music-toggle-button"
                    aria-label="Toggle chiptune music"
                    title={musicOn ? 'Music: on' : 'Music: off'}
                    onClick={() => { sounds.click(); onToggleMusic(!musicOn); }}
                    className="flex items-center justify-center w-7 h-7 menu-item"
                    style={{ opacity: musicOn ? 1 : 0.45 }}
                >
                    <PixelArt rows={NOTE} px={2} />
                </button>
                <button
                    data-testid="theme-toggle-button"
                    aria-label={`Theme: ${THEME_LABELS[theme]} — click to cycle`}
                    title={`Theme: ${THEME_LABELS[theme]}`}
                    onClick={() => { sounds.click(); onCycleTheme(); }}
                    className="flex items-center justify-center w-7 h-7 menu-item"
                >
                    <PixelArt rows={THEME_ICONS[theme]} px={2} />
                </button>
                <button
                    data-testid="sound-toggle-button"
                    aria-label="Toggle sound"
                    onClick={() => { const next = !muted; setMuted(next); onToggleMute(next); if (!next) sounds.blip(); }}
                    className="flex items-center justify-center w-7 h-7 menu-item"
                >
                    <PixelArt rows={muted ? ICONS.speakerOff : ICONS.speaker} px={2} />
                </button>
                <span className="hidden sm:flex items-center" aria-label="wifi">
                    <PixelArt rows={ICONS.wifi} px={2} />
                </span>
                <span className="hidden sm:flex items-center gap-1" aria-label="battery">
                    <PixelArt rows={ICONS.battery} px={2} />
                    <span className="font-vt text-sm" style={{ color: '#2D2638' }}>100%</span>
                </span>
                <span data-testid="menu-bar-clock" className="font-vt text-base tabular-nums" style={{ color: '#2D2638' }}>
                    {clock}
                </span>
            </div>
        </header>
    );
}
