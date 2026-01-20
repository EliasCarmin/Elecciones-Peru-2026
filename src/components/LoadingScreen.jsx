import { motion } from 'framer-motion';

const LoadingScreen = ({ onLoadingComplete }) => {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center gradient-peru"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onAnimationComplete={() => {
                setTimeout(onLoadingComplete, 3000);
            }}
        >
            <motion.div
                className="flex flex-col items-center gap-6"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <img
                    src="/voting.gif"
                    alt="Votación"
                    className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64"
                />
                <motion.h1
                    className="text-white text-2xl md:text-4xl font-bold text-center"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    Elecciones Perú 2026
                </motion.h1>
                <motion.div
                    className="flex gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default LoadingScreen;
