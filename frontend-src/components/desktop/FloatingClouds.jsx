import { useEffect, useState } from 'react';
import PixelArt, { CLOUD } from './PixelArt';

const CLOUDS = [
    { top: '10%', px: 8, duration: 42, delay: -6, opacity: 0.85, depth: 1.2 },
    { top: '22%', px: 5, duration: 34, delay: -20, opacity: 0.7, depth: 0.7 },
    { top: '38%', px: 10, duration: 55, delay: -32, opacity: 0.9, depth: 1.6 },
    { top: '56%', px: 6, duration: 38, delay: -12, opacity: 0.65, depth: 0.9 },
    { top: '68%', px: 8, duration: 48, delay: -40, opacity: 0.8, depth: 1.3 },
];

export default function FloatingClouds() {
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handler = (e) => {
            setOffset({
                x: e.clientX / window.innerWidth - 0.5,
                y: e.clientY / window.innerHeight - 0.5,
            });
        };
        window.addEventListener('mousemove', handler);
        return () => window.removeEventListener('mousemove', handler);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {CLOUDS.map((c, i) => (
                <div
                    key={i}
                    className="absolute left-0"
                    style={{
                        top: c.top,
                        transform: `translate(${offset.x * c.depth * 24}px, ${offset.y * c.depth * 12}px)`,
                        transition: 'transform 0.6s ease-out',
                    }}
                >
                    <div
                        className="cloud-drift"
                        style={{ animationDuration: `${c.duration}s`, animationDelay: `${c.delay}s`, opacity: c.opacity }}
                    >
                        <PixelArt rows={CLOUD} px={c.px} />
                    </div>
                </div>
            ))}
        </div>
    );
}
