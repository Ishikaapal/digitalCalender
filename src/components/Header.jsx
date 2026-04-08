import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

// 1. Eagerly grab all jpgs in the directory
// This creates an object where keys are paths and values are the resolved image URLs
const images = import.meta.glob('../assets/weather/*.jpg', { eager: true, import: 'default' });

export default function Header({ currentDate }) {
  const monthName = format(currentDate, 'MMMM').toLowerCase();
  
  // 2. Match the month name to the file path in your assets folder
  // We look for a key that ends with "/april.jpg", for example.
  const imagePath = Object.keys(images).find((key) => key.endsWith(`/${monthName}.jpg`));
  const activeImage = images[imagePath];

  return (
    <div className="relative h-72 w-full overflow-hidden bg-stone-200">
      <AnimatePresence mode="wait">
        <motion.img
          key={monthName}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
          src={activeImage}
          alt={`${monthName} background`}
          className="w-full h-full object-cover"
          // Fallback if an image is missing
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000';
          }}
        />
      </AnimatePresence>

      {/* Modern Gradient & Diagonal Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-transparent"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 45% 100%, 0 75%)' }}
      />

      <div className="absolute bottom-8 right-10 text-right text-white drop-shadow-lg">
        <motion.p 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-xl font-light tracking-[0.4em] mb-1"
        >
          2026
        </motion.p>
        <motion.h2 
          key={monthName}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-5xl font-black uppercase tracking-tighter"
        >
          {format(currentDate, 'MMMM')}
        </motion.h2>
      </div>
    </div>
  );
}