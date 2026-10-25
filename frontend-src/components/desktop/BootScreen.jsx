import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PixelArt, { HEART } from './PixelArt';

export default function BootScreen({ onStart }) {
    const [progress, setProgress] = useState(0);
    const done = progress >= 100;

    useEffect(() => {
        const iv = setInterval(() => {
            setProgress((p) => Math.min(100, p + Math.floor(Math.random() * 9) + 3));
        }, 90);
        return () => clearInterval(iv);
    }, []);

    return (
        <motion.div
            data-testid="boot-screen"
            className="boot-bg crt-flicker fixed inset-0 z-[100] flex flex-col items-center justify-center"
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            onClick={done ? onStart : undefined}
            data-clickable={done ? true : undefined}
        >
            <div className="scanlines" />
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center gap-6 px-6 text-center"
            >
                <PixelArt rows={HEART} px={10} />
                <div>
                    <h1 className="font-pixel text-2xl sm:text-4xl text-white tracking-wider">
                        STUTI<span style={{ color: '#FF6B8B' }}>OS</span>
                    </h1>
                    <p className="font-vt text-lg sm:text-xl mt-3" style={{ color: '#C7CEEA' }}>
                        version 2.4 — pastel edition
                    </p>
                </div>

                <div className="w-64 sm:w-80">
                    <div className="boot-progress-track h-5 p-[3px]">
                        <div className="boot-progress-fill h-full" style={{ width: `${progress}%` }} />
                    </div>
                    <p className="font-vt text-base mt-2" style={{ color: '#6E6A78' }}>
                        {done ? 'memory check ok • 640k ram • vibes loaded' : `loading system… ${progress}%`}
                    </p>
                </div>

                {done && (
                    <button
                        data-testid="boot-start-button"
                        onClick={onStart}
                        className="font-pixel text-[10px] sm:text-xs text-white blink-step mt-2 border-0 bg-transparent"
                    >
                        ▶ CLICK TO START SYSTEM
                    </button>
                )}
            </motion.div>
        </motion.div>
    );
}
