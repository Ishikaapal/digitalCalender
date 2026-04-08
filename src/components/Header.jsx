import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

const images = import.meta.glob('../assets/weather/*.jpg', { eager: true, import: 'default' });

// Animation Variants for the Book Flip
const pageFlipVariants = {
  initial: (direction) => ({
    rotateX: direction > 0 ? 90 : -90,
    opacity: 0,
    transformOrigin: "top", 
  }),
  animate: {
    rotateX: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.645, 0.045, 0.355, 1], 
    },
  },
  exit: (direction) => ({
    rotateX: direction > 0 ? -90 : 90,
    opacity: 0,
    transition: {
      duration: 0.6,
    },
  }),
};

export default function Header({ currentDate, direction }) {
  const monthName = format(currentDate, 'MMMM').toLowerCase();
  const imagePath = Object.keys(images).find((key) => key.endsWith(`/${monthName}.jpg`));
  const activeImage = images[imagePath];

  return (
    <div className="perspective-container relative h-72 w-full overflow-hidden bg-white">
   
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="wavy-path" clipPathUnits="objectBoundingBox">
             <path d="M0,0 H1 V0.63 C 0.82 0.51, 0.7 0.61, 0.52 0.63 C 0.35 0.65, 0.24 0.57, 0 0.63 Z" />
          </clipPath>
        </defs>
      </svg>

      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div
          key={monthName}
          custom={direction}
          variants={pageFlipVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={activeImage}
            alt={`${monthName} background`}
            className="w-full h-full object-cover customShape "
            
          />
          
          <div className="absolute bottom-0 right-10 text-right">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl font-black uppercase tracking-tighter text-black" 
            >
              {format(currentDate, 'MMMM')}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl tracking-[0.4em] text-black font-bold"
            >
              {format(currentDate, 'yyyy')}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}