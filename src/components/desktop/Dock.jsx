import { motion } from 'framer-motion';
import PixelArt, { ICONS } from './PixelArt';
import { DOCK_ITEMS } from '../../data';
import { sounds } from '../../sound';

export default function Dock({ onOpenWindow, openIds, minimizedIds }) {
    return (
        <motion.nav
            data-testid="dock"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, type: 'spring', stiffness: 180, damping: 18 }}
            className="dock-wrap"
        >
            <div className="dock-bar flex items-end gap-1 sm:gap-2 px-2 sm:px-4 py-2">
            {DOCK_ITEMS.map((item) => {
                const isOpen = openIds.includes(item.id);
                const isMin = minimizedIds.includes(item.id);
                return (
                    <motion.button
                        key={item.id}
                        data-testid={`dock-app-${item.id}`}
                        whileHover={{ scale: 1.25, y: -10 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        onClick={() => { sounds.click(); onOpenWindow(item.id); }}
                        className="dock-item relative flex flex-col items-center bg-transparent border-0 p-1"
                        aria-label={item.label}
                    >
                        <span className="dock-tooltip font-pixel">{item.label}</span>
                        <PixelArt rows={ICONS[item.icon]} px={4} />
                        <span
                            className="mt-1 h-1.5 w-1.5"
                            style={{
                                background: isOpen ? '#2D2638' : 'transparent',
                                opacity: isMin ? 0.4 : 1,
                            }}
                        />
                    </motion.button>
                );
            })}
            </div>
        </motion.nav>
    );
}
