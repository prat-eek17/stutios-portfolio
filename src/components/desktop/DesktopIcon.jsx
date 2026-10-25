import { motion } from 'framer-motion';
import PixelArt, { ICONS } from './PixelArt';
import { sounds } from '../../sound';

export default function DesktopIcon({ icon, title, x, y, onOpen, testId, index }) {
    return (
        <motion.button
            data-testid={testId}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.12, type: 'spring', stiffness: 220, damping: 18 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => { sounds.open(); onOpen(); }}
            className="desktop-icon absolute z-10 flex flex-col items-center gap-2 w-24 bg-transparent border-0 p-0"
            style={{ left: x, top: y }}
        >
            <span className="pixel-frame flex items-center justify-center w-16 h-16">
                <PixelArt rows={ICONS[icon]} px={4} />
            </span>
            <span className="desktop-icon-label font-pixel text-[8px] leading-relaxed px-2 py-1 text-center">
                {title}
            </span>
        </motion.button>
    );
}
