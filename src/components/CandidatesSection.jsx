import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CandidateCard from './CandidateCard';
import CandidateDetail from './CandidateDetail';

const CandidatesSection = ({ candidates }) => {
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    return (
        <section className="py-12 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Los <span className="text-peru-red">Candidatos</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Conoce en detalle a cada uno de los candidatos presidenciales
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8 justify-center">
                    {candidates.map((candidate, index) => (
                        <motion.div
                            key={candidate.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <CandidateCard
                                candidate={candidate}
                                onClick={() => setSelectedCandidate(candidate)}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedCandidate && (
                    <CandidateDetail
                        candidate={selectedCandidate}
                        onClose={() => setSelectedCandidate(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default CandidatesSection;
