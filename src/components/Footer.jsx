import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12 md:py-16">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">
                            Elecciones <span className="text-peru-red">Perú 2026</span>
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Plataforma informativa sobre los candidatos presidenciales del Perú.
                            Información basada en fuentes públicas y registros oficiales.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Información</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>📊 Datos actualizados</li>
                            <li>⚖️ Procesos legales públicos</li>
                            <li>💰 Declaraciones patrimoniales</li>
                            <li>📋 Trayectorias políticas</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Importante</h4>
                        <div className="bg-peru-red/20 border-2 border-peru-red/30 rounded-lg p-4">
                            <p className="text-sm text-gray-300">
                                ⚠️ Esta es una plataforma informativa. Los datos presentados provienen
                                de fuentes públicas y tienen fines educativos.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-400">
                            © 2026 Elecciones Perú. Información con fines educativos.
                        </p>
                        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center text-xs text-gray-500 border-l-2 border-peru-red/30 pl-6">
                            <div>
                                <p className="font-bold text-gray-400 mb-1">Elías Jesús Carmín Leandro</p>
                                <p>eliasjesuscarmin@gmail.com</p>
                                <a href="https://www.linkedin.com/in/elias-carmin/" target="_blank" rel="noopener noreferrer" className="hover:text-peru-red transition-colors">LinkedIn</a>
                                <p>Analista de datos, desarrollador Python</p>
                            </div>
                            <div>
                                <p className="font-bold text-gray-400 mb-1">Brandon Jair D'Angelo Malpartida</p>
                                <p>jairdangelo67@gmail.com</p>
                                <p>Periodista</p>
                            </div>
                            <div>
                                <p className="font-bold text-gray-400 mb-1">Edgar Gabriel Laureano Damian</p>
                                <p>edgar.g.laureano@gmail.com</p>
                                <p>Desarrollador de Software</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-0">
                            <div className="w-4 h-6 bg-peru-red"></div>
                            <div className="w-4 h-6 bg-white"></div>
                            <div className="w-4 h-6 bg-peru-red"></div>
                            <span className="text-sm text-gray-400 ml-2">Hecho por y para el Perú</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
