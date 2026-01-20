import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative py-12 md:py-20 lg:py-28 overflow-hidden">
            <div className="absolute inset-0 gradient-peru opacity-5"></div>
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="text-center max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <motion.h2
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Candidatos Presidenciales{' '}
                        <span className="text-peru-red">Perú 2026</span>
                    </motion.h2>
                    <motion.p
                        className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        Información detallada sobre los candidatos a la presidencia del Perú.
                        Conoce sus trayectorias, propuestas y controversias.
                    </motion.p>
                    <motion.div
                        className="flex flex-wrap justify-center gap-4 md:gap-8 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                    >
                        <div className="bg-white rounded-lg shadow-peru p-4 md:p-6 min-w-[120px]">
                            <div className="text-3xl md:text-4xl font-bold text-peru-red">3</div>
                            <div className="text-sm md:text-base text-gray-600 mt-1">Candidatos</div>
                        </div>
                        <div className="bg-white rounded-lg shadow-peru p-4 md:p-6 min-w-[120px]">
                            <div className="text-3xl md:text-4xl font-bold text-peru-red">2026</div>
                            <div className="text-sm md:text-base text-gray-600 mt-1">Elecciones</div>
                        </div>
                        <div className="bg-white rounded-lg shadow-peru p-4 md:p-6 min-w-[120px]">
                            <div className="text-3xl md:text-4xl font-bold text-peru-red">100%</div>
                            <div className="text-sm md:text-base text-gray-600 mt-1">Transparencia</div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
