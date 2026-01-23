import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const VersusSection = ({ candidates }) => {
    // State for selected candidates (default to first 3)
    const [selectedIds, setSelectedIds] = useState(candidates.slice(0, 3).map(c => c.id));

    if (!candidates || candidates.length === 0) return null;

    const selectedCandidates = useMemo(() =>
        candidates.filter(c => selectedIds.includes(c.id)),
        [selectedIds, candidates]);

    // Toggle selection
    const toggleCandidate = (id) => {
        setSelectedIds(prev => {
            if (prev.includes(id)) {
                if (prev.length <= 1) return prev; // Keep at least 1
                return prev.filter(item => item !== id);
            }
            if (prev.length >= 3) return prev; // Max 3 for visual clarity
            return [...prev, id];
        });
    };

    // Prepare comparison data for controversial metrics
    const comparisonData = [
        {
            metric: 'Denuncias Procesadas',
            ...selectedCandidates.reduce((acc, candidate) => {
                const name = candidate.nombre ? candidate.nombre.split(' ')[0] : `Candidato ${candidate.id}`;
                acc[name] = candidate.procesos?.denuncias_procesadas || 0;
                return acc;
            }, {})
        },
        {
            metric: 'Denuncias en Proceso',
            ...selectedCandidates.reduce((acc, candidate) => {
                const name = candidate.nombre ? candidate.nombre.split(' ')[0] : `Candidato ${candidate.id}`;
                acc[name] = candidate.procesos?.denuncias_en_proceso || 0;
                return acc;
            }, {})
        },
        {
            metric: 'Total Acusaciones',
            ...selectedCandidates.reduce((acc, candidate) => {
                const name = candidate.nombre ? candidate.nombre.split(' ')[0] : `Candidato ${candidate.id}`;
                acc[name] = candidate.procesos?.acusaciones?.length || 0;
                return acc;
            }, {})
        }
    ];

    const colors = ['#D91023', '#FF4757', '#FF6B81'];

    return (
        <section className="py-12 md:py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        Comparación de <span className="text-peru-red">Candidatos</span>
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Selecciona hasta 3 candidatos para comparar sus métricas y trayectoria
                    </p>
                </motion.div>

                {/* Candidate Selector */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {candidates.map((candidate) => (
                        <button
                            key={candidate.id}
                            onClick={() => toggleCandidate(candidate.id)}
                            className={`flex items-center gap-3 px-6 py-3 rounded-full border-2 transition-all ${selectedIds.includes(candidate.id)
                                ? 'bg-peru-red border-peru-red text-white'
                                : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20'
                                }`}
                        >
                            <div className={`w-3 h-3 rounded-full ${selectedIds.includes(candidate.id) ? 'bg-white' : 'bg-gray-500'}`}></div>
                            <span className="font-bold">{candidate.nombre.split(' ')[0]}</span>
                        </button>
                    ))}
                </div>

                {/* Comparison UI */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedIds.join(',')}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Main Comparison Chart */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 mb-8 shadow-2xl">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                Análisis Comparativo de Procesos Legales
                            </h3>
                            <div className="h-[400px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={comparisonData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="metric" stroke="#374151" />
                                        <YAxis stroke="#374151" />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#fff', border: '2px solid #D91023', color: '#000' }}
                                            itemStyle={{ color: '#000' }}
                                        />
                                        <Legend />
                                        {selectedCandidates.map((candidate, index) => {
                                            const name = candidate.nombre ? candidate.nombre.split(' ')[0] : `Candidato ${candidate.id}`;
                                            return (
                                                <Bar
                                                    key={candidate.id}
                                                    dataKey={name}
                                                    fill={colors[index % colors.length]}
                                                    radius={[8, 8, 0, 0]}
                                                />
                                            );
                                        })}
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Individual Comparison Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {selectedCandidates.map((candidate, index) => {
                                const name = candidate.nombre ? candidate.nombre.split(' ')[0] : `Candidato ${candidate.id}`;
                                return (
                                    <motion.div
                                        key={candidate.id}
                                        className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border-2 border-white/10 relative overflow-hidden group"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div
                                            className="absolute top-0 right-0 w-32 h-32 bg-peru-red opacity-10 blur-3xl -mr-16 -mt-16 group-hover:opacity-20 transition-opacity"
                                        ></div>

                                        <div className="flex items-center gap-3 mb-6 relative z-10">
                                            <div
                                                className="w-4 h-4 rounded-full"
                                                style={{ backgroundColor: colors[index % colors.length] }}
                                            ></div>
                                            <h3 className="text-2xl font-bold">{name}</h3>
                                        </div>

                                        <div className="space-y-4 relative z-10">
                                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                                <p className="text-sm text-gray-400 mb-1">Denuncias Procesadas</p>
                                                <p className="text-4xl font-black text-peru-red">
                                                    {candidate.procesos?.denuncias_procesadas || 0}
                                                </p>
                                            </div>

                                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                                <p className="text-sm text-gray-400 mb-1">En Proceso</p>
                                                <p className="text-4xl font-black text-peru-red">
                                                    {candidate.procesos?.denuncias_en_proceso || 0}
                                                </p>
                                            </div>

                                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                                <p className="text-sm text-gray-400 mb-1">Acusaciones</p>
                                                <p className="text-4xl font-black text-peru-red">
                                                    {candidate.procesos?.acusaciones?.length || 0}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Global Summary */}
                <motion.div
                    className="mt-16 bg-gradient-to-r from-peru-red/10 to-transparent backdrop-blur-md rounded-2xl p-8 border border-peru-red/20"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <p className="text-5xl font-black text-peru-red">
                                {candidates.reduce((sum, c) => sum + (c.procesos?.denuncias_procesadas || 0), 0)}
                            </p>
                            <p className="text-sm text-gray-400 mt-2 uppercase tracking-widest font-bold">Total Denuncias</p>
                        </div>
                        <div className="text-center">
                            <p className="text-5xl font-black text-peru-red">
                                {candidates.reduce((sum, c) => sum + (c.procesos?.denuncias_en_proceso || 0), 0)}
                            </p>
                            <p className="text-sm text-gray-400 mt-2 uppercase tracking-widest font-bold">En Proceso</p>
                        </div>
                        <div className="text-center">
                            <p className="text-5xl font-black text-peru-red">
                                {candidates.reduce((sum, c) => sum + (c.procesos?.acusaciones?.length || 0), 0)}
                            </p>
                            <p className="text-sm text-gray-400 mt-2 uppercase tracking-widest font-bold">Acusaciones</p>
                        </div>
                        <div className="text-center">
                            <p className="text-5xl font-black text-white">
                                {candidates.length}
                            </p>
                            <p className="text-sm text-gray-400 mt-2 uppercase tracking-widest font-bold">Candidatos</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default VersusSection;
