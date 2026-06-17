import { motion } from 'framer-motion';

export default function ConfirmModal({ open, title, message, confirmLabel = 'Confirm', onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[#1A1A1A] p-6 text-white shadow-premium"
      >
        <h2 className="font-display text-2xl font-bold">{title}</h2>
        <p className="mt-3 leading-7 text-white/60">{message}</p>
        <div className="mt-7 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="rounded-xl border border-white/10 px-5 py-3 text-sm font-bold text-white/70 hover:text-white">
            Cancel
          </button>
          <button type="button" onClick={onConfirm} className="rounded-xl bg-gold px-5 py-3 text-sm font-extrabold text-night hover:bg-white">
            {confirmLabel}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
