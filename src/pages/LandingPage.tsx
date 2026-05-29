// Updated LandingPage sfd
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Smartphone, Zap, Shield, Sun, Moon, Users, Download, CheckCircle, Star, Lock, Clock, Award, ExternalLink, Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { getDownloadCount, registerDownload } from '../services/downloadService';
import { PostDownloadModal } from '../components/PostDownloadModal';

interface LandingPageProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ theme, setTheme }) => {
  const [downloadCount, setDownloadCount] = useState<number>(847);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadDone, setDownloadDone] = useState(false);
  const [isPostDownloadOpen, setIsPostDownloadOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const APK_URL = '/releases/Konvierte.apk';
  const APK_VERSION = '1.2.0';


  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const total = await registerDownload(APK_VERSION);
      setDownloadCount(total);
      // Iniciar descarga real
      const link = document.createElement('a');
      link.href = APK_URL;
      link.download = `Konvierte-v${APK_VERSION}.apk`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadDone(true);
      setTimeout(() => setDownloadDone(false), 4000);
      // Abrir modal post-descarga con un pequeño delay para que el usuario vea que inició
      setTimeout(() => setIsPostDownloadOpen(true), 1200);
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    const loadDownloads = async () => {
      const count = await getDownloadCount();
      setDownloadCount(count);
    };
    loadDownloads();
  }, []);



  return (
    <>
      <div className={`${theme} min-h-screen transition-colors duration-500`}>
        <div className="min-h-screen bg-background text-main selection:bg-primary/30 overflow-x-hidden relative">
          {/* Navigation */}
          <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-4xl z-50 bg-surface/90 backdrop-blur-3xl border border-border shadow-2xl shadow-black/5 dark:shadow-white/5 rounded-[2rem] h-16 flex items-center px-4 md:px-6">
            <div className="w-full flex items-center justify-between">
              <NavLink to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shadow-lg border border-primary/20 overflow-hidden transition-transform group-hover:scale-105">
                  <svg width="22" height="22" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M38 32V96M38 64 L74 32M56 64L88 96" stroke="#10B981" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="85" cy="64" r="18" fill="transparent" stroke="#10B981" strokeWidth="6" />
                    <path d="M78 58C80 54 83 53 85 53C88 53 91 54 93 58L97 54M92 70C90 74 87 75 85 75C82 75 79 74 77 70L73 74" stroke="#10B981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm font-black uppercase tracking-[0.2em] text-main">Konvierte</span>
              </NavLink>

              <div className="hidden md:flex items-center gap-6">
                <NavLink to="/features" className="text-[10px] font-black uppercase tracking-widest text-main/60 hover:text-main transition-colors">Características</NavLink>
                <NavLink to="/developers" className="text-[10px] font-black uppercase tracking-widest text-main/60 hover:text-main transition-colors">Desarrolladores</NavLink>
                <NavLink to="/docs" className="text-[10px] font-black uppercase tracking-widest text-main/60 hover:text-main transition-colors">API Docs</NavLink>
                <div className="w-px h-4 bg-border mx-2" />
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-main/60 hover:text-main hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  aria-label="Cambiar tema"
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button
                  onClick={handleDownload}
                  className="px-6 py-2.5 bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2"
                >
                  <Download size={14} /> Descargar
                </button>
              </div>

              <div className="md:hidden flex items-center gap-2">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-main hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute top-20 left-0 w-full bg-zinc-950/95 backdrop-blur-3xl border border-white/10 shadow-2xl rounded-3xl md:hidden overflow-hidden z-[60]"
                >
                  <div className="flex flex-col p-5 gap-4 text-white">
                    {/* Header del menú */}
                    <div className="flex items-center gap-3 pb-1">
                      <div className="w-8 h-8 bg-primary/20 rounded-xl flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 128 128" fill="none">
                          <path d="M38 32V96M38 64 L74 32M56 64L88 96" stroke="#10B981" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="85" cy="64" r="18" fill="transparent" stroke="#10B981" strokeWidth="6" />
                        </svg>
                      </div>
                      <span className="text-sm font-black uppercase tracking-[0.2em] text-white">Konvierte</span>
                    </div>
                    <div className="w-full h-px bg-white/10" />
                    <button
                      onClick={() => { setTheme(theme === 'dark' ? 'light' : 'dark'); setIsMobileMenuOpen(false); }}
                      className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-zinc-300 hover:text-white"
                    >
                      {theme === 'dark' ? <Sun size={14} className="text-primary" /> : <Moon size={14} className="text-primary" />} 
                      Tema: {theme === 'dark' ? 'Claro' : 'Oscuro'}
                    </button>
                    <div className="w-full h-px bg-white/10" />
                    <NavLink to="/features" onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-black uppercase tracking-widest text-zinc-300 hover:text-white flex items-center justify-between">
                      <span>Características</span>
                      <span className="text-[10px] text-primary font-bold">→</span>
                    </NavLink>
                    <NavLink to="/developers" onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-black uppercase tracking-widest text-zinc-300 hover:text-white flex items-center justify-between">
                      <span>Desarrolladores</span>
                      <span className="text-[10px] text-primary font-bold">→</span>
                    </NavLink>
                    <NavLink to="/docs" onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-black uppercase tracking-widest text-zinc-300 hover:text-white flex items-center justify-between">
                      <span>API Docs</span>
                      <span className="text-[10px] text-primary font-bold">→</span>
                    </NavLink>
                    <a href="#team" onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-black uppercase tracking-widest text-zinc-300 hover:text-white flex items-center justify-between">
                      <span>Equipo</span>
                      <span className="text-[10px] text-primary font-bold">→</span>
                    </a>
                    <button
                      onClick={() => { handleDownload(); setIsMobileMenuOpen(false); }}
                      className="w-full mt-2 py-3 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center justify-center gap-2 hover:bg-primary/90"
                    >
                      <Download size={14} /> Descargar App
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>

          {/* Hero Section */}
          <header className="relative pt-28 md:pt-40 pb-20 px-5 sm:px-6 overflow-hidden min-h-[90vh] flex items-center">

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-8 text-center lg:text-left"
              >
                <div className="flex flex-col md:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                  <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary/15 border border-primary/40 text-primary rounded-full">
                    <span className="w-2 h-2 bg-primary animate-pulse rounded-full" />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">Konvierte App · Android</span>
                  </div>
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-[8rem] font-black tracking-tighter leading-[0.85] text-main">
                  Controla tus <br />divisas <span className="text-main/30 italic">fácil.</span>
                </h1>

                <p className="text-base md:text-xl lg:text-2xl font-medium text-main/60 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  La herramienta definitiva para gestionar tus finanzas en Venezuela. Tasas en tiempo real, presupuestos y reportes profesionales.
                </p>

                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
                  <button
                    onClick={handleDownload}
                    className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-6 rounded-full text-sm sm:text-base font-black uppercase tracking-[0.15em] transition-all active:scale-95 flex items-center justify-center gap-3 relative overflow-hidden group/hero disabled:opacity-70 bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/25"
                  >
                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/hero:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                    {downloadDone ? <><CheckCircle size={20} /> ¡Descarga iniciada!</> : isDownloading ? <><Download size={20} className="animate-bounce" /> Preparando...</> : <><Download size={20} /> Descargar APK Gratis</>}
                  </button>
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-6 sm:gap-12 pt-6 sm:pt-8 text-main/50">
                  <div className="text-center">
                    <p className="text-3xl font-black text-main">{downloadCount.toLocaleString()}+</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest mt-1">Descargas</p>
                  </div>
                  <div className="w-px h-12 bg-border" />
                  <div className="text-center">
                    <p className="text-3xl font-black text-main">~38 MB</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest mt-1">Tamaño APK</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                className="relative flex justify-center lg:justify-end"
              >
                <div className="relative group">
                  <div className="relative z-10 w-[300px] md:w-[350px] rounded-[3rem] border-[12px] border-zinc-900 shadow-2xl overflow-hidden aspect-[9/19.5] bg-zinc-950">
                    <img
                      src="/screenshots/Calculadora Konvierte.jpeg"
                      alt="App Interface"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1000";
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </header>

          <section className="py-32 px-6 border-y border-border bg-main/[0.02]">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="space-y-6 max-w-xl text-center lg:text-left">
                <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-[0.9]">Mucho más que <br /><span className="text-main/30 italic">solo tasas.</span></h2>
                <p className="text-main/50 font-medium text-xl leading-relaxed">Descubre todas las herramientas que hemos construido para simplificar tu día a día financiero en un solo lugar.</p>
                <NavLink to="/features" className="inline-flex items-center justify-center lg:justify-start gap-3 text-main font-black uppercase text-sm tracking-widest hover:gap-4 transition-all">
                  Ver funciones <ArrowRight size={16} />
                </NavLink>
              </div>
              <div className="grid grid-cols-2 gap-6 flex-1 w-full">
                {[
                  { icon: Smartphone, label: 'Widget Nativo' },
                  { icon: Shield, label: '100% Privado' },
                  { icon: Zap, label: 'En Vivo' },
                  { icon: ExternalLink, label: 'PDFs Rápidos' },
                ].map((item, i) => (
                  <div key={i} className="p-8 bg-surface border border-border rounded-[2rem] flex flex-col items-center justify-center gap-4 text-center group hover:scale-[1.02] transition-transform shadow-sm hover:shadow-md">
                    <div className="w-14 h-14 bg-primary/10 text-primary border border-primary/20 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12 shadow-sm shadow-primary/5">
                      <item.icon size={24} />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-main">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Value Proposition Simplified */}
          <section className="py-24 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary border border-primary/20 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <Smartphone size={24} />
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-widest text-main">Mobile First</h3>
                  <p className="text-sm font-bold text-main/50 leading-relaxed">Optimizada para la mejor experiencia móvil nativa.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary border border-primary/20 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <Zap size={24} />
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-widest text-main">Real Time</h3>
                  <p className="text-sm font-bold text-main/50 leading-relaxed">Tasas actualizadas automáticamente desde fuentes oficiales.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary border border-primary/20 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <ExternalLink size={24} />
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-widest text-main">Multilink</h3>
                  <p className="text-sm font-bold text-main/50 leading-relaxed">Comparte reportes y tasas directamente a tus apps.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary border border-primary/20 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <Shield size={24} />
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-widest text-main">Sin Registro</h3>
                  <p className="text-sm font-bold text-main/50 leading-relaxed">Usa todas las funciones sin necesidad de dejar tus datos.</p>
                </div>
              </div>
            </div>
          </section>

          {/* APK Download Section */}
          <section id="download" className="py-24 px-6 relative overflow-hidden">
            <div className="max-w-5xl mx-auto">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-main/5 border border-border rounded-full mb-6">
                  <Smartphone size={14} className="text-main" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-main">App Nativa para Android</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-6">
                  Descarga la app,<br /><span className="text-main/30 italic">sin rodeos.</span>
                </h2>
                <p className="text-lg text-main/50 max-w-2xl mx-auto">
                  APK directa, sin Play Store, sin rastreos. Solo Konvierte funcionando en tu bolsillo.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Trust badges */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-5"
                >
                  {[
                    { icon: Shield, title: '100% Libre de virus', desc: 'Compilada directamente desde nuestro código fuente abierto. Sin modificaciones, sin malware.' },
                    { icon: Lock, title: 'Sin permisos invasivos', desc: 'No pedimos acceso a tu cámara, contactos ni ubicación. Solo lo que necesitas para calcular.' },
                    { icon: Clock, title: 'Funciona sin internet', desc: 'Las conversiones básicas funcionan offline. Las tasas se sincronizan cuando tienes conexión.' },
                    { icon: Award, title: 'Actualizaciones frecuentes', desc: 'El equipo lanza mejoras constantemente. Cada versión nueva está en esta misma página.' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-5 p-6 rounded-3xl border border-border bg-surface group hover:scale-[1.01] transition-transform shadow-sm"
                    >
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-primary/10 text-primary border border-primary/20">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <p className="text-base font-black text-main mb-1">{item.title}</p>
                        <p className="text-sm text-main/50 leading-relaxed font-medium">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Download Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="relative glass-card p-8 md:p-10 rounded-[2.5rem] border-border space-y-8 shadow-xl">

                    {/* App Info */}
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 bg-main rounded-2xl flex items-center justify-center flex-shrink-0">
                        <svg width="32" height="32" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M38 32V96M38 64 L74 32M56 64L88 96" stroke="var(--bg-color)" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="85" cy="64" r="18" fill="transparent" stroke="var(--bg-color)" strokeWidth="6" />
                          <path d="M78 58C80 54 83 53 85 53C88 53 91 54 93 58L97 54M92 70C90 74 87 75 85 75C82 75 79 74 77 70L73 74" stroke="var(--bg-color)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-black uppercase tracking-widest text-main">Konvierte</h3>
                        <p className="text-xs text-main/50 font-bold uppercase tracking-wider mt-1">v{APK_VERSION} · Android 6.0+</p>
                        <div className="flex items-center gap-1 mt-2">
                          {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} className="fill-main text-main" />)}
                          <span className="text-[10px] text-main/50 ml-1 font-bold">5.0</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: `${downloadCount.toLocaleString()}+`, label: 'Descargas' },
                        { value: '~38 MB', label: 'Tamaño' },
                        { value: 'Gratis', label: 'Precio' },
                      ].map((stat, i) => (
                        <div key={i} className="bg-main/[0.03] border border-border rounded-2xl p-2.5 sm:p-4 text-center">
                          <p className="text-base sm:text-xl font-black text-main leading-tight">{stat.value}</p>
                          <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-main/40 mt-1">{stat.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Checkmarks */}
                    <div className="space-y-3">
                      {['Sin cuenta requerida', 'Sin publicidad intrusiva', 'Datos 100% locales', 'Código abierto'].map((feat, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle size={16} className="text-main flex-shrink-0" />
                          <span className="text-sm font-bold text-main/70">{feat}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className="w-full py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-3 relative overflow-hidden group/dl bg-primary text-white"
                    >
                      <div className="absolute inset-0 bg-black/10 dark:bg-white/10 translate-x-[-100%] group-hover/dl:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                      <AnimatePresence mode="wait">
                        {downloadDone ? (
                          <motion.span key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                            <CheckCircle size={18} /> ¡Descarga iniciada!
                          </motion.span>
                        ) : isDownloading ? (
                          <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}>
                              <Download size={18} />
                            </motion.div>
                            Preparando...
                          </motion.span>
                        ) : (
                          <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                            <Download size={18} /> Descargar APK Gratis
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>

                    <p className="text-center text-xs text-main/40 font-medium leading-relaxed mt-4">
                      Al instalar, activa <span className="font-black text-main/60">"Fuentes desconocidas"</span> en Ajustes.<br />
                      Es normal para APKs externas al Play Store.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* FAQ mini */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {[
                  { q: '¿Por qué no está en Play Store?', a: 'Google cobra tarifas y restringe apps venezolanas. Distribuimos directamente para llegar a más usuarios.' },
                  { q: '¿Cómo sé que es segura?', a: 'Nuestro código es público en GitHub. Puedes verificar que la APK es idéntica a lo que compilamos.' },
                  { q: '¿Qué hago si Android la bloquea?', a: 'Ve a Ajustes → Seguridad → Fuentes desconocidas y actívala. Es un paso estándar para APKs externas.' },
                ].map((faq, i) => (
                  <div key={i} className="p-6 bg-surface border border-border rounded-3xl space-y-3 hover:border-main/20 transition-colors shadow-sm">
                    <p className="text-sm font-black text-main">{faq.q}</p>
                    <p className="text-xs text-main/50 leading-relaxed font-medium">{faq.a}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          <section className="py-20 md:py-40 px-5 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-6xl mx-auto glass-card p-8 sm:p-16 md:p-24 text-center relative overflow-hidden group border border-border shadow-2xl rounded-[2rem] md:rounded-[3rem]"
            >
              <h2 className="text-3xl sm:text-4xl md:text-7xl font-black tracking-tighter mb-6 md:mb-8 leading-[0.9]">
                ¿Listo para simplificar <br className="hidden md:block" /> tus cuentas?
              </h2>
              <p className="text-base md:text-xl font-medium text-main/50 max-w-3xl mx-auto mb-8 md:mb-16 leading-relaxed">
                Únete a los miles de venezolanos que ya usan Konvierte para gestionar sus pagos y consultar el dólar cada día.
              </p>
              <div className="flex justify-center items-center">
                <button
                  onClick={handleDownload}
                  className="w-full sm:w-auto px-8 sm:px-16 py-4 sm:py-6 rounded-full text-sm sm:text-base font-black uppercase tracking-[0.25em] hover:scale-105 transition-transform active:scale-95 flex items-center justify-center gap-3 bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/25"
                >
                  <Download size={20} /> Descargar App Gratis
                </button>
              </div>
            </motion.div>
          </section>

          {/* Team Section */}
          <section id="team" className="py-20 md:py-32 px-5 sm:px-6 relative overflow-hidden">
            <div className="max-w-5xl mx-auto">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12 md:mb-20"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-main/5 border border-border rounded-full mb-6">
                  <Users size={14} className="text-main" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-main">El Equipo</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-6 md:mb-8">
                  Quiénes somos<br />
                  <span className="text-main/30 italic">detrás de Konvierte</span>
                </h2>
                <p className="text-base md:text-xl text-main/50 max-w-2xl mx-auto leading-relaxed font-medium">
                  Dos estudiantes venezolanos de Ingeniería en Sistemas que construyeron la herramienta financiera que ellos mismos necesitaban.
                </p>
              </motion.div>

              {/* Team Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                {[
                  {
                    name: 'Rúbel Maneiro',
                    handle: 'rmaneiro28',
                    role: 'Full-Stack Developer',
                    bio: 'Estudiante de Ingeniería en Sistemas, 10mo semestre. Arquitecto principal de Konvierte: backend, API, sync de tasas y lógica financiera.',
                    avatar: 'https://avatars.githubusercontent.com/u/72143708?v=4',
                    blog: 'https://rmaneiro.vercel.app/',
                    github: 'https://github.com/rmaneiro28',
                    repos: 31,
                    location: 'Venezuela',
                    accent: 'primary',
                    accentColor: '#10B981',
                    tags: ['Flutter', 'React', 'TypeScript', 'Supabase'],
                  },
                  {
                    name: 'Sneider Araque',
                    handle: 'Sneider22',
                    role: 'Frontend & Mobile Developer',
                    bio: 'Estudiante de Ingeniería en Sistemas. Especialista en UI/UX y desarrollo mobile. Co-creador de la experiencia de usuario de Konvierte.',
                    avatar: 'https://avatars.githubusercontent.com/u/126375669?v=4',
                    blog: null,
                    github: 'https://github.com/sneider22',
                    repos: 18,
                    location: 'Venezuela',
                    accent: 'primary',
                    accentColor: '#10B981',
                    tags: ['Flutter', 'React', 'Dart', 'UI/UX'],
                  },
                ].map((member, i) => (
                  <motion.div
                    key={member.handle}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="relative group"
                  >
                    <div className="relative bg-surface p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-border hover:border-main/20 hover:shadow-xl transition-all duration-500 flex flex-col gap-6 md:gap-8 h-full">
                      {/* Avatar + Identity */}
                      <div className="flex items-start gap-6">
                        <div className="relative flex-shrink-0">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="relative w-20 h-20 rounded-3xl object-cover border-2 border-border shadow-sm"
                          />
                        </div>
                        <div className="flex-1 min-w-0 pt-2">
                          <h3 className="text-2xl font-black tracking-tight text-main">{member.name}</h3>
                          <p className="text-xs font-bold uppercase tracking-widest text-main/40 mt-1">@{member.handle}</p>
                          <span
                            className="inline-block mt-3 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary/10 text-primary border border-primary/20"
                          >
                            {member.role}
                          </span>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-base text-main/60 leading-relaxed font-medium flex-1">{member.bio}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {member.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-primary/5 border border-primary/10 text-primary/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Stats + Links */}
                      <div className="flex items-center justify-between pt-6 border-t border-border">
                        <div className="flex items-center gap-1 text-xs text-main/50 font-bold">
                          <span className="font-black text-main text-sm">{member.repos}</span>
                          &nbsp;repos públicos · 🇻🇪 {member.location}
                        </div>
                        <div className="flex items-center gap-3">
                          {member.blog && (
                            <a
                              href={member.blog}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-main/50 hover:text-main hover:bg-main/5 transition-all"
                              aria-label={`Portfolio de ${member.name}`}
                            >
                              <ExternalLink size={16} />
                            </a>
                          )}
                          <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-xl flex items-center justify-center bg-main text-background hover:scale-105 transition-transform shadow-md"
                            aria-label={`GitHub de ${member.name}`}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-center text-[11px] opacity-20 uppercase tracking-[0.3em] font-bold mt-16"
              >
                Construido con ❤️ en Venezuela · Open Source
              </motion.p>
            </div>
          </section>

          {/* Simplified Footer */}
          <footer className="py-20 px-6 border-t border-black/5 dark:border-white/5 text-center bg-surface backdrop-blur-md">
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
              <div className="flex items-center gap-3 opacity-60">
                <div className="w-8 h-8 bg-surface rounded-lg flex items-center justify-center shadow-lg border border-border overflow-hidden">
                  <svg width="20" height="20" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M38 32V96M38 64 L74 32M56 64L88 96" stroke="#10B981" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm font-black uppercase tracking-[0.2em]">Konvierte</span>
              </div>

              <p className="text-[10px] font-bold text-main/30 uppercase tracking-[0.5em] mt-8">
                &copy; {new Date().getFullYear()} Konvierte Digital - Todos los derechos reservados
              </p>
            </div>
          </footer>
        </div>
      </div>

      <PostDownloadModal
        isOpen={isPostDownloadOpen}
        onClose={() => setIsPostDownloadOpen(false)}
        downloadCount={downloadCount}
      />
    </>
  );
};

export default LandingPage;
