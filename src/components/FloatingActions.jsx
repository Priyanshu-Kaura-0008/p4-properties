import { motion } from 'framer-motion';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';

const phoneNumber = '+918195002006';
const whatsappUrl = 'https://wa.me/918195002006';

export default function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-[90] flex flex-col gap-3 sm:bottom-6 sm:right-6">
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with P4 Properties on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white shadow-[0_18px_45px_rgba(0,0,0,0.28)] ring-4 ring-white/10"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.08, y: -4 }}
      >
        <FaWhatsapp aria-hidden="true" />
      </motion.a>
      <motion.a
        href={`tel:${phoneNumber}`}
        aria-label="Call P4 Properties now"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-night text-xl text-gold shadow-[0_18px_45px_rgba(0,0,0,0.28)] ring-4 ring-gold/15 transition-colors hover:bg-gold hover:text-night"
        whileHover={{ scale: 1.08, y: -4 }}
      >
        <FaPhoneAlt aria-hidden="true" />
      </motion.a>
    </div>
  );
}
