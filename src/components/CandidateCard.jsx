import { motion } from 'framer-motion';
import { useState } from 'react';

const CandidateCard = ({ candidate, onClick }) => {
    const [imageError, setImageError] = useState(false);

    return (
        <motion.div
            className="bg-white rounded-xl shadow-peru overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onClick={onClick}
            whileHover={{ y: -8 }}
        >
            <div className="relative h-64 md:h-80 overflow-hidden bg-gray-100">
                {!imageError ? (
                    <img
                        src={candidate.image_url || candidate.img}
                        alt={candidate.nombre}
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                        <div className="text-6xl text-gray-400">👤</div>
                    </div>
                )}
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-4">
                    <span className="inline-block bg-peru-red text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {candidate.intentos_presidenciales} {candidate.intentos_presidenciales === 1 ? 'intento' : 'intentos'} presidenciales
                    </span>
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    {candidate.nombre}
                </h3>
                <p className="text-peru-red font-semibold mb-4">{candidate.partido}</p>

                <div className="space-y-3">
                    {candidate.cargos_principales && candidate.cargos_principales.length > 0 && (
                        <div className="flex items-start gap-2">
                            <span className="text-2xl">📋</span>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-700">Cargos principales:</p>
                                <p className="text-sm text-gray-600 line-clamp-2">
                                    {candidate.cargos_principales[0]}
                                </p>
                            </div>
                        </div>
                    )}

                    {candidate.procesos && (
                        <div className="flex items-start gap-2">
                            <span className="text-2xl">⚖️</span>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-700">Procesos:</p>
                                <p className="text-sm text-gray-600">
                                    {candidate.procesos.denuncias_procesadas || 0} denuncias procesadas
                                    {candidate.procesos.denuncias_en_proceso > 0 ? `, ${candidate.procesos.denuncias_en_proceso} en proceso` : ''}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <button className="mt-6 w-full bg-peru-red text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                    Ver detalles completos
                </button>
            </div>
        </motion.div>
    );
};

export default CandidateCard;
