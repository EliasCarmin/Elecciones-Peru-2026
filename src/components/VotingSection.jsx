import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const VotingSection = ({ candidates }) => {
    const [hasVoted, setHasVoted] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [votes, setVotes] = useState({});

    // Initialize votes and check if user already voted
    useEffect(() => {
        const savedVoted = localStorage.getItem('peru2026_voted');
        if (savedVoted) {
            setHasVoted(true);
        }

        // Initialize mock votes if not present in localStorage
        const savedVotes = localStorage.getItem('peru2026_mock_votes');
        if (savedVotes) {
            setVotes(JSON.parse(savedVotes));
        } else {
            const initialVotes = {};
            candidates.forEach(c => {
                // Random-ish distribution for realistic simulation
                initialVotes[c.id] = Math.floor(Math.random() * 500) + 100;
            });
            setVotes(initialVotes);
            localStorage.setItem('peru2026_mock_votes', JSON.stringify(initialVotes));
        }
    }, [candidates]);

    const filteredCandidates = useMemo(() => {
        if (!searchQuery) return [];
        return candidates.filter(c =>
            c.nombre.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [candidates, searchQuery]);

    const handleVote = () => {
        if (!selectedCandidate) return;

        const newVotes = {
            ...votes,
            [selectedCandidate.id]: (votes[selectedCandidate.id] || 0) + 1
        };

        setVotes(newVotes);
        setHasVoted(true);
        localStorage.setItem('peru2026_voted', 'true');
        localStorage.setItem('peru2026_mock_votes', JSON.stringify(newVotes));
    };

    const chartData = useMemo(() => {
        const total = Object.values(votes).reduce((a, b) => a + b, 0);
        return candidates
            .map(c => ({
                name: c.nombre.split(' ')[0],
                fullName: c.nombre,
                percentage: total > 0 ? ((votes[c.id] || 0) / total * 100).toFixed(1) : 0,
                votes: votes[c.id] || 0,
                color: c.id === selectedCandidate?.id ? '#D91023' : '#cbd5e1'
            }))
            .sort((a, b) => b.votes - a.votes)
            .slice(0, 10); // Show top 10 for cleaner UI
    }, [votes, candidates, selectedCandidate]);

    return (
        <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Simulacro de <span className="text-peru-red">Votación</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Participa en nuestro simulacro anónimo y conoce la tendencia actual de los candidatos.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                    <AnimatePresence mode="wait">
                        {!hasVoted ? (
                            <motion.div
                                key="voting-form"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="p-8 md:p-12"
                            >
                                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center italic">
                                    "Tu voto es anónimo y solo se puede emitir una vez"
                                </h3>

                                <div className="space-y-6 max-w-md mx-auto">
                                    <div className="relative">
                                        <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                                            Selecciona a tu candidato:
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Escribe el nombre del candidato..."
                                                value={selectedCandidate ? selectedCandidate.nombre : searchQuery}
                                                onChange={(e) => {
                                                    setSearchQuery(e.target.value);
                                                    setSelectedCandidate(null);
                                                    setIsDropdownOpen(true);
                                                }}
                                                onFocus={() => setIsDropdownOpen(true)}
                                                className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl px-6 py-4 outline-none focus:border-peru-red transition-all shadow-sm pr-12"
                                            />
                                            {selectedCandidate && (
                                                <button
                                                    onClick={() => setSelectedCandidate(null)}
                                                    className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-peru-red"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            )}
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Dropdown */}
                                        <AnimatePresence>
                                            {isDropdownOpen && searchQuery && !selectedCandidate && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-100 rounded-2xl shadow-xl overflow-hidden max-h-60 overflow-y-auto"
                                                >
                                                    {filteredCandidates.length > 0 ? (
                                                        filteredCandidates.map(c => (
                                                            <button
                                                                key={c.id}
                                                                onClick={() => {
                                                                    setSelectedCandidate(c);
                                                                    setIsDropdownOpen(false);
                                                                    setSearchQuery('');
                                                                }}
                                                                className="w-full text-left px-6 py-4 hover:bg-gray-50 flex items-center gap-4 transition-colors group"
                                                            >
                                                                <div className="w-10 h-10 rounded-full bg-peru-red/10 flex items-center justify-center font-bold text-peru-red">
                                                                    {c.nombre.charAt(0)}
                                                                </div>
                                                                <div>
                                                                    <p className="font-bold text-gray-900 group-hover:text-peru-red transition-colors">{c.nombre}</p>
                                                                    <p className="text-xs text-gray-500">{c.partido}</p>
                                                                </div>
                                                            </button>
                                                        ))
                                                    ) : (
                                                        <div className="px-6 py-8 text-center text-gray-400 italic">
                                                            No se encontraron coincidencias
                                                        </div>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Selected Candidate Card */}
                                    {selectedCandidate && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="bg-peru-red/5 border-2 border-peru-red/20 rounded-2xl p-6 flex items-center gap-6"
                                        >
                                            <div className="w-20 h-20 bg-white rounded-xl shadow-sm overflow-hidden flex-shrink-0 border-2 border-peru-red/10">
                                                <img
                                                    src={selectedCandidate.image_url}
                                                    alt={selectedCandidate.nombre}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-xs text-peru-red font-black uppercase tracking-widest mb-1">Candidato Seleccionado</p>
                                                <p className="text-xl font-bold text-gray-900 leading-tight">{selectedCandidate.nombre}</p>
                                                <p className="text-sm text-gray-500">{selectedCandidate.partido}</p>
                                            </div>
                                        </motion.div>
                                    )}

                                    <button
                                        onClick={handleVote}
                                        disabled={!selectedCandidate}
                                        className={`w-full py-5 rounded-2xl font-black text-xl shadow-xl transition-all flex items-center justify-center gap-3 ${selectedCandidate
                                                ? 'bg-peru-red text-white hover:bg-red-700 hover:-translate-y-1 shadow-peru-red/30'
                                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M11 15.5l-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7z" />
                                        </svg>
                                        EMITIR MI VOTO
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="voting-results"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-6 md:p-12 text-center"
                            >
                                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold text-sm mb-6">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                    </svg>
                                    Voto registrado correctamente
                                </div>

                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                                    Resultados del <span className="text-peru-red">Simulacro</span>
                                </h3>

                                <div className="h-[400px] w-full mb-8">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={chartData}
                                            layout="vertical"
                                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                            <XAxis type="number" hide />
                                            <YAxis
                                                dataKey="name"
                                                type="category"
                                                width={100}
                                                style={{ fontSize: '14px', fontWeight: 'bold' }}
                                            />
                                            <Tooltip
                                                cursor={{ fill: 'transparent' }}
                                                content={({ active, payload }) => {
                                                    if (active && payload && payload.length) {
                                                        const data = payload[0].payload;
                                                        return (
                                                            <div className="bg-white p-4 shadow-xl border border-gray-100 rounded-lg">
                                                                <p className="font-bold text-gray-900">{data.fullName}</p>
                                                                <p className="text-peru-red font-black text-xl">{data.percentage}%</p>
                                                                <p className="text-xs text-gray-500">{data.votes} votos simulados</p>
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                }}
                                            />
                                            <Bar dataKey="votes" radius={[0, 4, 4, 0]}>
                                                {chartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                <p className="text-gray-500 text-sm max-w-lg mx-auto italic">
                                    Disclaimer: Estos datos son generados por un sistema de simulación para fines de demostración y no representan datos reales de entes oficiales.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            {isDropdownOpen && !hasVoted && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsDropdownOpen(false)}
                ></div>
            )}
        </section>
    );
};

export default VotingSection;
