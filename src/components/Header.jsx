import { motion } from 'framer-motion';

const Header = () => {
    return (
        <motion.header
            className="sticky top-0 z-40 bg-white shadow-peru"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <div className="container mx-auto px-4 py-4 md:py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-12 md:h-16 gradient-peru rounded-full"></div>
                        <div>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                                Elecciones Perú <span className="text-peru-red">2026</span>
                            </h1>
                            <p className="text-xs md:text-sm text-gray-600">Conoce a los candidatos</p>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                        <div className="w-12 h-8 bg-peru-red"></div>
                        <div className="w-12 h-8 bg-white border-2 border-gray-200"></div>
                    </div>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
