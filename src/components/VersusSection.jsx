import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const VersusSection = ({ candidates }) => {
    if (!candidates || candidates.length === 0) return null;

    // Prepare comparison data for controversial metrics
    const comparisonData = [
        {
            metric: 'Denuncias Procesadas',
            ...candidates.reduce((acc, candidate) => {
                const name = candidate.nombre ? candidate.nombre.split(' ')[0] : `Candidato ${candidate.id}`;
                acc[name] = candidate.procesos?.denuncias_procesadas || 0;
                return acc;
            }, {})
        },
        {
            metric: 'Denuncias en Proceso',
            ...candidates.reduce((acc, candidate) => {
                const name = candidate.nombre ? candidate.nombre.split(' ')[0] : `Candidato ${candidate.id}`;
                acc[name] = candidate.procesos?.denuncias_en_proceso || 0;
                return acc;
            }, {})
        },
        {
            metric: 'Total Acusaciones',
            ...candidates.reduce((acc, candidate) => {
                const name = candidate.nombre ? candidate.nombre.split(' ')[0] : `Candidato ${candidate.id}`;
                acc[name] = candidate.procesos?.acusaciones?.length || 0;
                return acc;
            }, {})
        }
    ];

    const colors = ['#D91023', '#FF4757', '#FF6B81'];

    return (
        <section className="py-12 md:py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        Comparación de <span className="text-peru-red">Controversias</span>
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Análisis comparativo de procesos legales y acusaciones entre candidatos
                    </p>
                </motion.div>

                {/* Main Comparison Chart */}
                <motion.div
                    className="bg-white rounded-2xl p-6 md:p-8 mb-8 shadow-2xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        Procesos Legales por Candidato
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
                                {candidates.map((candidate, index) => {
                                    const name = candidate.nombre ? candidate.nombre.split(' ')[0] : `Candidato ${candidate.id}`;
                                    return (
                                        <Bar
                                            key={candidate.id || index}
                                            dataKey={name}
                                            fill={colors[index % colors.length]}
                                            radius={[8, 8, 0, 0]}
                                        />
                                    );
                                })}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Individual Candidate Comparison Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    {candidates.map((candidate, index) => {
                        const name = candidate.nombre ? candidate.nombre.split(' ')[0] : `Candidato ${candidate.id}`;
                        return (
                            <motion.div
                                key={candidate.id || index}
                                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border-2 border-white/20"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 * index }}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div
                                        className="w-4 h-4 rounded-full"
                                        style={{ backgroundColor: colors[index % colors.length] }}
                                    ></div>
                                    <h3 className="text-xl font-bold">{name}</h3>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-white/10 rounded-lg p-4">
                                        <p className="text-sm text-gray-300 mb-1">Denuncias Procesadas</p>
                                        <p className="text-3xl font-bold text-peru-red">
                                            {candidate.procesos?.denuncias_procesadas || 0}
                                        </p>
                                    </div>

                                    <div className="bg-white/10 rounded-lg p-4">
                                        <p className="text-sm text-gray-300 mb-1">En Proceso</p>
                                        <p className="text-3xl font-bold text-peru-red">
                                            {candidate.procesos?.denuncias_en_proceso || 0}
                                        </p>
                                    </div>

                                    <div className="bg-white/10 rounded-lg p-4">
                                        <p className="text-sm text-gray-300 mb-1">Acusaciones</p>
                                        <p className="text-3xl font-bold text-peru-red">
                                            {candidate.procesos?.acusaciones?.length || 0}
                                        </p>
                                    </div>

                                    {candidate.procesos?.acusaciones && candidate.procesos.acusaciones.length > 0 && (
                                        <div className="mt-4">
                                            <p className="text-sm font-semibold mb-2">Principales acusaciones:</p>
                                            <ul className="space-y-1">
                                                {candidate.procesos.acusaciones.slice(0, 2).map((acusacion, idx) => (
                                                    <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                                                        <span className="text-peru-red">•</span>
                                                        <span className="line-clamp-2">{acusacion}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Summary Stats */}
                <motion.div
                    className="mt-12 bg-peru-red/20 backdrop-blur-md rounded-xl p-6 md:p-8 border-2 border-peru-red/30"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h3 className="text-2xl font-bold mb-6 text-center">Resumen Total</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <p className="text-4xl md:text-5xl font-bold text-peru-red">
                                {candidates.reduce((sum, c) => sum + (c.procesos?.denuncias_procesadas || 0), 0)}
                            </p>
                            <p className="text-sm mt-2">Total Denuncias Procesadas</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl md:text-5xl font-bold text-peru-red">
                                {candidates.reduce((sum, c) => sum + (c.procesos?.denuncias_en_proceso || 0), 0)}
                            </p>
                            <p className="text-sm mt-2">Total En Proceso</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl md:text-5xl font-bold text-peru-red">
                                {candidates.reduce((sum, c) => sum + (c.procesos?.acusaciones?.length || 0), 0)}
                            </p>
                            <p className="text-sm mt-2">Total Acusaciones</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl md:text-5xl font-bold text-peru-red">
                                {candidates.length}
                            </p>
                            <p className="text-sm mt-2">Candidatos Analizados</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default VersusSection;
