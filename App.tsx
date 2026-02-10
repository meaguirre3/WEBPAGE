
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroDataCloud, NeuralFlowScene } from './components/DataVisuals';
import { ETLPipelineDiagram, BIDashboardDiagram, MethodologyGraph } from './components/Diagrams';
import { ArrowRight, Menu, X, Database, BarChart3, Brain, Zap, CheckCircle2, Globe } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: string }) => (
  <div 
    className="group p-8 bg-white border border-stone-200 rounded-2xl hover:border-emerald-500/50 hover:shadow-xl transition-all duration-500 animate-fade-in-up"
    style={{ animationDelay: delay }}
  >
    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform duration-300">
      <Icon size={24} />
    </div>
    <h3 className="font-serif text-2xl text-stone-900 mb-4">{title}</h3>
    <p className="text-stone-600 leading-relaxed mb-6">{description}</p>
    <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm group-hover:gap-4 transition-all cursor-pointer">
      EXPLORAR CAPACIDADES <ArrowRight size={16} />
    </div>
  </div>
);

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-stone-800 selection:bg-emerald-500 selection:text-white">
      
      {/* Navegación */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-200">S</div>
            <span className="font-serif font-bold text-xl tracking-tight text-stone-900">
              SYNTHETIX <span className="text-emerald-600 font-sans text-xs tracking-widest font-black uppercase ml-1">AI</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-stone-600">
            <a href="#servicios" onClick={scrollToSection('services')} className="hover:text-emerald-600 transition-colors uppercase">Servicios</a>
            <a href="#soluciones" onClick={scrollToSection('solutions')} className="hover:text-emerald-600 transition-colors uppercase">Soluciones</a>
            <a href="#metodologia" onClick={scrollToSection('methodology')} className="hover:text-emerald-600 transition-colors uppercase">Metodología</a>
            <a 
              href="#contacto" 
              onClick={scrollToSection('contact')}
              className="px-6 py-2.5 bg-stone-900 text-white rounded-full hover:bg-emerald-600 transition-all shadow-md active:scale-95"
            >
              Hablar con un Experto
            </a>
          </div>

          <button className="md:hidden text-stone-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
        <HeroDataCloud />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-white/40 to-white" />

        <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs tracking-widest uppercase font-bold rounded-full">
            <Zap size={12} className="animate-pulse" /> Ingeniería de Datos para Decisiones Críticas
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-tight mb-8 text-stone-900">
            Transformamos Datos <br/><span className="italic font-normal text-emerald-600">en Decisiones.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl md:text-2xl text-stone-600 font-light leading-relaxed mb-12">
            Diseñamos pipelines ETL escalables, dashboards ejecutivos y soluciones de inteligencia artificial que resuelven problemas reales de negocio.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={scrollToSection('contact')} className="px-8 py-4 bg-emerald-600 text-white rounded-full font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all">
              Solicitar Diagnóstico
            </button>
            <button className="px-8 py-4 bg-white border border-stone-200 text-stone-900 rounded-full font-bold hover:border-emerald-500 transition-all">
              Ver Casos de Éxito
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Servicios */}
        <section id="services" className="py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
              <div className="lg:col-span-6">
                <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">Capacidades Core de Datos</h2>
                <div className="w-20 h-1 bg-emerald-500 mb-8"></div>
                <p className="text-xl text-stone-600 leading-relaxed">
                  No solo entregamos código; construimos la infraestructura que asegura precisión, los modelos que otorgan predictibilidad y las estrategias que generan rentabilidad.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ServiceCard 
                icon={Database} 
                title="Ingeniería de Datos & ETL" 
                description="Diseño de pipelines batch y streaming, arquitecturas Lakehouse y optimización de costos en la nube (AWS/GCP/Azure)." 
                delay="0.1s"
              />
              <ServiceCard 
                icon={BarChart3} 
                title="Data Analytics & BI" 
                description="Dashboards ejecutivos con KPIs en tiempo real, analítica descriptiva y sistemas de reporting automatizado." 
                delay="0.2s"
              />
              <ServiceCard 
                icon={Brain} 
                title="IA & Machine Learning" 
                description="Modelos predictivos, implementación de LLMs y automatización analítica integrada en procesos de producción (MLOps)." 
                delay="0.3s"
              />
            </div>
          </div>
        </section>

        {/* Technical Deep Dive: ETL */}
        <section id="solutions" className="py-32 bg-stone-900 text-white overflow-hidden relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-emerald-500/20">
                  ARQUITECTURA ROBUSTA
                </div>
                <h2 className="font-serif text-4xl md:text-6xl mb-8 leading-tight">Infraestructura <br/><span className="text-stone-400">de Datos Escalable</span></h2>
                <p className="text-lg text-stone-400 mb-10 leading-relaxed">
                  La calidad del dato es el cimiento de la IA. Construimos tuberías auto-recuperables que ingieren datos de ERPs, CRMs y APIs, garantizando disponibilidad del 99.9%.
                </p>
                
                <ul className="space-y-4">
                  {['Gobierno de Datos Automatizado', 'Streaming en Tiempo Real (Kafka/Flink)', 'Capa de Ingesta Sin Pérdida', 'Optimización de Snowflake/BigQuery'].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-stone-200">
                      <CheckCircle2 className="text-emerald-500" size={20} /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <ETLPipelineDiagram />
              </div>
            </div>
          </div>
        </section>

        {/* Metodología con Efecto de Grafo */}
        <section id="methodology" className="py-32 bg-[#F9F9F9]">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold tracking-widest uppercase rounded-full mb-6">
                  NUESTRO PROCESO
                </div>
                <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">Metodología <br/><span className="italic text-emerald-600">Conectada</span></h2>
                <p className="text-lg text-stone-600 mb-10 leading-relaxed">
                  Utilizamos un enfoque de red donde cada fase alimenta a la siguiente mediante retroalimentación constante. Nuestro grafo metodológico asegura que el valor del negocio se mantenga en el centro de cada nodo de decisión.
                </p>
                <div className="space-y-6">
                  {[
                    { t: "Diagnóstico", d: "Auditoría de silos y deuda técnica." },
                    { t: "Arquitectura", d: "Diseño de la estructura cloud óptima." },
                    { t: "Implementación", d: "Desarrollo ágil de pipelines y modelos." },
                    { t: "Optimización", d: "Mejora continua basada en KPIs." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start group">
                      <div className="w-8 h-8 rounded-full bg-white border border-emerald-200 flex items-center justify-center text-emerald-600 font-bold text-xs group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                        0{i+1}
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-900">{item.t}</h4>
                        <p className="text-sm text-stone-500">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-7">
                <MethodologyGraph />
              </div>
            </div>
          </div>
        </section>

        {/* Impact Visualizer */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div className="order-2 lg:order-1">
                  <BIDashboardDiagram />
               </div>
               <div className="order-1 lg:order-2">
                  <h2 className="font-serif text-4xl md:text-5xl mb-8">Decisiones Guiadas por <span className="italic text-emerald-600">Evidencia</span></h2>
                  <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                    Elimine la incertidumbre. Nuestras soluciones de BI ofrecen una "Versión Única de la Verdad" en toda su organización, desde la dirección hasta la operación.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 bg-emerald-50 rounded-xl">
                      <div className="text-3xl font-bold text-emerald-600 mb-1">45%</div>
                      <div className="text-xs font-bold text-stone-500 uppercase">Reporting más Veloz</div>
                    </div>
                    <div className="p-6 bg-emerald-50 rounded-xl">
                      <div className="text-3xl font-bold text-emerald-600 mb-1">30%</div>
                      <div className="text-xs font-bold text-stone-500 uppercase">Aumento en Eficiencia</div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section id="contact" className="py-32 bg-stone-900 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
            <NeuralFlowScene />
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-2xl">
              <h2 className="font-serif text-5xl md:text-7xl text-white mb-8">¿Listo para unificar sus datos?</h2>
              <p className="text-xl text-stone-400 mb-12">
                Cuéntanos tu problema de datos, nosotros te ayudamos a resolverlo mediante ingeniería y estrategia avanzada.
              </p>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Nombre Completo" className="p-4 rounded-xl bg-stone-800 border-none text-white focus:ring-2 focus:ring-emerald-500 outline-none" />
                <input type="email" placeholder="Correo Corporativo" className="p-4 rounded-xl bg-stone-800 border-none text-white focus:ring-2 focus:ring-emerald-500 outline-none" />
                <textarea placeholder="Cuéntenos sobre su proyecto o desafío de datos..." className="p-4 rounded-xl bg-stone-800 border-none text-white focus:ring-2 focus:ring-emerald-500 outline-none md:col-span-2 h-32"></textarea>
                <button className="md:col-span-2 py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/20">
                  Solicitar Auditoría de Estrategia
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white py-20 border-t border-stone-100">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
              <span className="font-serif font-bold text-xl">SYNTHETIX</span>
            </div>
            <p className="text-stone-500 max-w-xs text-sm leading-relaxed">
              Líderes en Ingeniería de Datos, Orquestación ETL y Soluciones de IA Empresarial.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-sm">
            <div className="flex flex-col gap-4">
              <span className="font-bold text-stone-900 uppercase tracking-widest text-xs">Expertise</span>
              <a href="#" className="text-stone-500 hover:text-emerald-600">Pipelines ETL</a>
              <a href="#" className="text-stone-500 hover:text-emerald-600">Data Lakes</a>
              <a href="#" className="text-stone-500 hover:text-emerald-600">MLOps</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-bold text-stone-900 uppercase tracking-widest text-xs">Empresa</span>
              <a href="#" className="text-stone-500 hover:text-emerald-600">Nosotros</a>
              <a href="#" className="text-stone-500 hover:text-emerald-600">Carreras</a>
              <a href="#" className="text-stone-500 hover:text-emerald-600">Contacto</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-bold text-stone-900 uppercase tracking-widest text-xs">Social</span>
              <a href="#" className="text-stone-500 hover:text-emerald-600">LinkedIn</a>
              <a href="#" className="text-stone-500 hover:text-emerald-600">Twitter</a>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-20 pt-8 border-t border-stone-50 text-center text-xs text-stone-400">
          © {new Date().getFullYear()} Synthetix AI Engineering. Todos los derechos reservados. Impulsado por Gemini 2.0.
        </div>
      </footer>
    </div>
  );
};

export default App;
