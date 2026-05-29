import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, PartyPopper } from 'lucide-react';

interface PostDownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
    downloadCount: number;
}

export const PostDownloadModal: React.FC<PostDownloadModalProps> = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: 60, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden"
                    >
                        {/* Close */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors z-10"
                        >
                            <X size={14} className="text-white/50" />
                        </button>

                        <div className="p-8 text-center space-y-5">
                            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto border border-primary/30">
                                <PartyPopper size={28} className="text-primary" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-black text-white">¡Descarga Iniciada!</h3>
                                <p className="text-sm text-white/50 leading-relaxed">
                                    Gracias por usar Konvierte. La descarga de la APK debería comenzar automáticamente.
                                </p>
                            </div>
                            <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Estado</p>
                                <div className="flex items-center justify-center gap-2">
                                    <CheckCircle size={14} className="text-primary" />
                                    <span className="text-sm font-black text-white">Descargando...</span>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-full py-4 bg-primary rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-primary/90 transition-all active:scale-95"
                            >
                                Entendido 🎉
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
