import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

const CandidateDetail = ({ candidate, onClose }) => {
    const [imageError, setImageError] = useState(false);

    if (!candidate) return null;

    // Prepare data for economic profile chart
    const economicData = candidate.perfil_economico ? [
        {
            name: 'Ingresos Anuales',
            value: (candidate.perfil_economico.ingresos_anuales_soles || 0) / 1000000,
            label: 'Millones S/'
        },
        {
            name: 'Patrimonio',
            value: (candidate.perfil_economico.patrimonio_bienes_soles || 0) / 1000000,
            label: 'Millones S/'
        }
    ] : [];

    const assetsData = candidate.perfil_economico ? [
        { name: 'Inmuebles', value: candidate.perfil_economico.inmuebles || 0 },
        { name: 'Vehículos', value: candidate.perfil_economico.vehiculos || 0 }
    ] : [];

    return (
        <motion.div
            className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <div className="min-h-screen px-4 py-8 flex items-center justify-center">
                <motion.div
                    className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full overflow-hidden"
                    initial={{ scale: 0.9, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 50 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header with image */}
                    <div className="relative h-64 md:h-96 bg-gradient-to-br from-peru-red to-red-700">
                        {!imageError ? (
                            <img
                                src={candidate.image_url || candidate.img}
                                alt={candidate.nombre}
                                className="w-full h-full object-cover opacity-90"
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="text-9xl text-white/50">👤</div>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                                {candidate.nombre}
                            </h2>
                            <p className="text-xl md:text-2xl text-white/90">{candidate.partido}</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 lg:p-10 space-y-8">
                        {/* Basic Info */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="text-2xl">📊</span>
                                    Información General
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-600">Intentos Presidenciales</p>
                                        <p className="text-lg font-semibold text-peru-red">{candidate.intentos_presidenciales || 0}</p>
                                    </div>
                                    {candidate.origen && (
                                        <>
                                            <div>
                                                <p className="text-sm text-gray-600">Lugar de Nacimiento</p>
                                                <p className="text-lg font-semibold">{candidate.origen.lugar_nacimiento}</p>
                                            </div>
                                            {candidate.origen.barrio && (
                                                <div>
                                                    <p className="text-sm text-gray-600">Barrio</p>
                                                    <p className="text-lg font-semibold">{candidate.origen.barrio}</p>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="text-2xl">📋</span>
                                    Cargos Principales
                                </h3>
                                <ul className="space-y-2">
                                    {candidate.cargos_principales && candidate.cargos_principales.length > 0 ? (
                                        candidate.cargos_principales.map((cargo, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="text-peru-red mt-1">•</span>
                                                <span className="text-sm text-gray-700">{cargo}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-sm text-gray-500 italic">No se registran cargos principales</li>
                                    )}
                                </ul>
                            </div>
                        </div>

                        {/* Procesos Legales */}
                        {candidate.procesos && (
                            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="text-2xl">⚖️</span>
                                    Procesos Legales
                                </h3>
                                <div className="grid md:grid-cols-3 gap-4 mb-6">
                                    <div className="bg-white rounded-lg p-4 text-center">
                                        <p className="text-3xl font-bold text-peru-red">
                                            {candidate.procesos.denuncias_procesadas || 0}
                                        </p>
                                        <p className="text-sm text-gray-600 mt-1">Denuncias Procesadas</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 text-center">
                                        <p className="text-3xl font-bold text-peru-red">
                                            {candidate.procesos.denuncias_en_proceso || 0}
                                        </p>
                                        <p className="text-sm text-gray-600 mt-1">En Proceso</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 text-center">
                                        <p className="text-3xl font-bold text-peru-red">
                                            {candidate.procesos.acusaciones?.length || 0}
                                        </p>
                                        <p className="text-sm text-gray-600 mt-1">Acusaciones</p>
                                    </div>
                                </div>
                                {candidate.procesos.acusaciones && candidate.procesos.acusaciones.length > 0 && (
                                    <div>
                                        <p className="font-semibold text-gray-900 mb-3">Acusaciones:</p>
                                        <ul className="space-y-2">
                                            {candidate.procesos.acusaciones.map((acusacion, index) => (
                                                <li key={index} className="flex items-start gap-2 bg-white p-3 rounded-lg">
                                                    <span className="text-peru-red mt-1">⚠️</span>
                                                    <span className="text-sm text-gray-700">{acusacion}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Controversias */}
                        {candidate.controversias_relevantes && candidate.controversias_relevantes.length > 0 && (
                            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="text-2xl">⚠️</span>
                                    Controversias Relevantes
                                </h3>
                                <ul className="space-y-2">
                                    {candidate.controversias_relevantes.map((controversia, index) => (
                                        <li key={index} className="flex items-start gap-2 bg-white p-3 rounded-lg">
                                            <span className="text-yellow-600 mt-1">•</span>
                                            <span className="text-sm text-gray-700">{controversia}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Economic Profile Charts */}
                        {candidate.perfil_economico && (
                            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="text-2xl">💰</span>
                                    Perfil Económico
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-white rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-900 mb-4 text-center">Ingresos y Patrimonio</h4>
                                        <ResponsiveContainer width="100%" height={250}>
                                            <BarChart data={economicData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" fontSize={12} />
                                                <YAxis fontSize={12} />
                                                <Tooltip />
                                                <Bar dataKey="value" fill="#D91023" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                        <p className="text-xs text-center text-gray-500 mt-2">Valores en millones de soles</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-900 mb-4 text-center">Bienes</h4>
                                        <ResponsiveContainer width="100%" height={250}>
                                            <BarChart data={assetsData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" fontSize={12} />
                                                <YAxis fontSize={12} />
                                                <Tooltip />
                                                <Bar dataKey="value" fill="#FF4757" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                        <p className="text-xs text-center text-gray-500 mt-2">Cantidad de bienes</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Candidaturas Presidenciales */}
                        {candidate.candidaturas_presidenciales && candidate.candidaturas_presidenciales.length > 0 && (
                            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="text-2xl">🗳️</span>
                                    Candidaturas Presidenciales Anteriores
                                </h3>
                                <div className="space-y-3">
                                    {candidate.candidaturas_presidenciales.map((candidatura, index) => (
                                        <div key={index} className="bg-white p-4 rounded-lg">
                                            <p className="font-semibold text-peru-red">{candidatura.anio}</p>
                                            <p className="text-sm text-gray-700">{candidatura.resultado}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default CandidateDetail;
