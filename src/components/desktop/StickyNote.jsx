import { motion } from 'framer-motion';
import { TAGLINE } from '../../data';

export default function StickyNote() {
    return (
        <motion.div
            data-testid="sticky-note"
            initial={{ opacity: 0, y: -16, rotate: -6 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 18 }}
            className="sticky-note absolute hidden md:block w-56 p-4 pt-6 z-10"
            style={{ top: 64, right: 32 }}
        >
            <div className="sticky-tape absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-5 rotate-[-4deg]" />
            <p className="font-pixel text-[9px] mb-2" style={{ color: '#A16207' }}>
                NOTE.TXT
            </p>
            <p className="font-vt text-lg leading-tight" style={{ color: '#2D2638' }}>
                {TAGLINE}
            </p>
            <p className="font-vt text-sm mt-2" style={{ color: '#A16207' }}>
                — stuti ♥
            </p>
        </motion.div>
    );
}
