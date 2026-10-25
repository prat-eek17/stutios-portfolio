import { useState } from 'react';
import { motion, useDragControls, useMotionValue, animate } from 'framer-motion';
import PixelArt, { ICONS } from './PixelArt';
import { sounds } from '../../sound';

const snap = (v) => Math.round(v / 16) * 16;

export default function MacOSWindow({ id, title, icon, zIndex, isTop, pos, onClose, onMinimize, onFocus, children }) {
    const controls = useDragControls();
    const [maximized, setMaximized] = useState(false);
    const [minimizing, setMinimizing] = useState(false);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

    const style = maximized
        ? { zIndex, left: 8, right: 8, top: 44, bottom: 96, width: 'auto' }
        : {
              zIndex,
              left: isMobile ? '4vw' : pos.x,
              top: isMobile ? 56 : pos.y,
              width: 'min(620px, 92vw)',
          };

    const handleDragEnd = () => {
        animate(x, snap(x.get()), { type: 'spring', stiffness: 500, damping: 32 });
        animate(y, snap(y.get()), { type: 'spring', stiffness: 500, damping: 32 });
    };

    return (
        <motion.div
            data-testid={`window-${id}`}
            drag={!maximized && !minimizing}
            dragControls={controls}
            dragListener={false}
            dragMomentum={false}
            dragElastic={0.08}
            onDragEnd={handleDragEnd}
            onPointerDown={onFocus}
            className="window-frame absolute"
            style={{ ...style, x, y }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 24 }}
                animate={
                    minimizing
                        ? { opacity: 0, scale: 0.12, y: window.innerHeight }
                        : { opacity: 1, scale: 1, y: 0 }
                }
                exit={{ opacity: 0, scale: 0.9, y: 12 }}
                transition={
                    minimizing
                        ? { duration: 0.45, ease: 'easeIn' }
                        : { type: 'spring', stiffness: 300, damping: 25 }
                }
                onAnimationComplete={() => {
                    if (minimizing) onMinimize();
                }}
                className="flex flex-col"
                style={{ maxHeight: maximized ? '100%' : 'min(70vh, 560px)', height: maximized ? '100%' : undefined }}
            >
                <div
                    className="win-titlebar flex items-center gap-2 px-3 py-2 select-none"
                    onPointerDown={(e) => {
                        onFocus();
                        if (!maximized) controls.start(e);
                    }}
                    onDoubleClick={() => setMaximized((m) => !m)}
                >
                    <div className="flex items-center gap-1.5">
                        <button
                            data-testid={`window-close-${id}`}
                            aria-label="Close window"
                            onClick={() => { sounds.close(); onClose(); }}
                            className="traffic-btn"
                            style={{ background: '#FF5F56' }}
                        />
                        <button
                            data-testid={`window-minimize-${id}`}
                            aria-label="Minimize window"
                            onClick={() => {
                                sounds.click();
                                setMinimizing(true);
                                setTimeout(onMinimize, 500);
                            }}
                            className="traffic-btn"
                            style={{ background: '#FFBD2E' }}
                        />
                        <button
                            data-testid={`window-maximize-${id}`}
                            aria-label="Maximize window"
                            onClick={() => { sounds.click(); setMaximized((m) => !m); }}
                            className="traffic-btn"
                            style={{ background: '#27C93F' }}
                        />
                    </div>
                    <div className="flex-1 flex items-center justify-center gap-2 min-w-0">
                        <PixelArt rows={ICONS[icon]} px={2} />
                        <span
                            className="font-pixel text-[9px] sm:text-[10px] truncate"
                            style={{ color: isTop ? '#2D2638' : '#6E6A78' }}
                        >
                            {title}
                        </span>
                    </div>
                    <div className="w-[52px]" />
                </div>
                <div className="win-scroll overflow-y-auto p-4 sm:p-6 flex-1">{children}</div>
            </motion.div>
        </motion.div>
    );
}
