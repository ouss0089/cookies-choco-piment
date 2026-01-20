
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppState, Recipe } from './types';
import { generateRecipeImage } from './services/geminiService';
import { signatureRecipes } from './data/recipes';
import RecipeCard from './components/RecipeCard';

const Navbar: React.FC = () => {
  const location = useLocation();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDFCFA]/90 backdrop-blur-md shadow-sm border-b border-[#C5A059]/10">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <div className="flex flex-col items-center">
             <span className="text-[10px] tracking-[0.6em] font-bold text-[#C5A059] uppercase -mb-1">Atelier</span>
             <span className="font-serif text-2xl font-bold text-[#111111] italic">Noir & Feu</span>
          </div>
        </Link>
        <div className="hidden md:flex space-x-12">
          <Link to="/" className={`nav-link text-[10px] font-bold uppercase tracking-[0.3em] ${location.pathname === '/' ? 'text-[#C5A059]' : 'text-[#111111]/40'}`}>Galerie</Link>
          <Link to="/recettes" className={`nav-link text-[10px] font-bold uppercase tracking-[0.3em] ${location.pathname === '/recettes' ? 'text-[#C5A059]' : 'text-[#111111]/40'}`}>Créations</Link>
          <Link to="/apropos" className={`nav-link text-[10px] font-bold uppercase tracking-[0.3em] ${location.pathname === '/apropos' ? 'text-[#C5A059]' : 'text-[#111111]/40'}`}>L'Esprit</Link>
        </div>
      </div>
    </nav>
  );
};

const HomePage: React.FC = () => (
  <div className="pt-24 min-h-[95vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden bg-[#FDFCFA]">
    <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40rem] font-serif italic">N&F</div>
    </div>
    
    <div className="z-10 max-w-3xl">
      <span className="text-[#C5A059] font-bold tracking-[0.4em] uppercase text-[10px] mb-8 block">Collection Signature</span>
      <h1 className="text-7xl md:text-9xl font-serif italic text-[#111111] mb-8 leading-[0.85] tracking-tighter">
        L'élégance <br/> 
        <span className="text-[#C5A059]">incandescente</span>
      </h1>
      <p className="text-lg text-[#111111]/60 max-w-lg mx-auto mb-12 font-light leading-relaxed">
        Découvrez l'harmonie parfaite entre l'amertume du cacao pur et le souffle sacré du piment. Une expérience sensorielle conçue par l'intelligence au service du goût.
      </p>
      <Link to="/recettes" className="btn-elegant px-14 py-5 rounded-none text-[10px] font-bold uppercase tracking-[0.3em] mx-auto w-fit block">
        Initier le Voyage
      </Link>
    </div>
  </div>
);

const RecipeGenerator: React.FC = () => {
  const [state, setState] = useState<AppState>({ recipe: null, imageUrl: null, loading: false, error: null });

  const cultures = [
    { id: 'kyoto', name: 'Kyoto', desc: 'Matcha & Éclat de Wasabi', icon: '🍃' },
    { id: 'oaxaca', name: 'Oaxaca', desc: 'Chocolat Noir & Chipotle', icon: '🏺' },
    { id: 'mumbai', name: 'Mumbai', desc: 'Cardamome & Safran d\'Or', icon: '✨' },
    { id: 'paris', name: 'Paris', desc: 'Fleur de Sel & Espelette', icon: '🥂' },
    { id: 'marrakech', name: 'Marrakech', desc: 'Dattes & Harissa Douce', icon: '🕯️' },
    { id: 'venise', name: 'Venise', desc: 'Espresso & Peperoncino', icon: '🎭' },
    { id: 'bangkok', name: 'Bangkok', desc: 'Citronnelle & Piment Oiseau', icon: '🏝️' },
    { id: 'rio', name: 'Rio', desc: 'Fève Tonka & Malagueta', icon: '🦜' },
    { id: 'budapest', name: 'Budapest', desc: 'Paprika Fumé & Cacao', icon: '🎻' },
    { id: 'stockholm', name: 'Stockholm', desc: 'Réglisse Salée & Avoine', icon: '❄️' }
  ];

  const handleSelectCulture = async (cultureId: string) => {
    setState(prev => ({ ...prev, loading: true, error: null, recipe: null }));
    try {
      const recipe = signatureRecipes[cultureId];
      // On génère une image unique pour la recette fixe
      const imageUrl = await generateRecipeImage(recipe.name, recipe.description);
      setState({ recipe, imageUrl, loading: false, error: null });
      setTimeout(() => {
        document.getElementById('recipe-display')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      setState(prev => ({ ...prev, loading: false, error: "L'alchimie visuelle a échoué. Veuillez retenter l'expérience." }));
    }
  };

  const handleRandom = async () => {
    const keys = Object.keys(signatureRecipes);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    handleSelectCulture(randomKey);
  };

  return (
    <div className="pt-32 pb-20 px-6 bg-[#FDFCFA]">
      <div className="max-w-6xl mx-auto mb-24">
        <div className="text-center mb-16">
          <span className="text-[#C5A059] font-bold tracking-[0.4em] uppercase text-[9px] mb-4 block">Manifeste du Goût</span>
          <h2 className="text-5xl font-serif italic text-[#111111]">La Collection Signature</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-20">
          {cultures.map((c) => (
            <button
              key={c.id}
              onClick={() => handleSelectCulture(c.id)}
              disabled={state.loading}
              className={`group p-8 bg-white border border-[#C5A059]/10 hover:border-[#C5A059] transition-all duration-700 text-center flex flex-col items-center justify-center space-y-4 shadow-sm hover:shadow-xl`}
            >
              <span className="text-2xl grayscale group-hover:grayscale-0 transition-all duration-700 opacity-40 group-hover:opacity-100">{c.icon}</span>
              <div className="pt-2">
                <h4 className="font-serif italic text-[#111111] text-lg mb-1">{c.name}</h4>
                <p className="text-[7px] text-[#C5A059] font-bold uppercase tracking-[0.2em]">{c.desc}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleRandom}
            disabled={state.loading}
            className="group flex flex-col items-center space-y-4"
          >
            <div className="w-16 h-16 border border-[#C5A059]/30 rounded-full flex items-center justify-center group-hover:bg-[#C5A059] group-hover:border-[#C5A059] transition-all duration-500">
              {state.loading ? <i className="fas fa-circle-notch animate-spin text-[#C5A059] group-hover:text-white"></i> : <i className="fas fa-random text-[#C5A059] group-hover:text-white"></i>}
            </div>
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#111111]/40 group-hover:text-[#C5A059] transition-all">Inspiration au hasard</span>
          </button>
        </div>
      </div>

      <div id="recipe-display" className="max-w-6xl mx-auto scroll-mt-32">
        {state.error && <div className="text-[#5E0D0D] p-12 text-center font-serif italic text-xl border border-[#5E0D0D]/10 bg-[#5E0D0D]/05 mb-12">{state.error}</div>}
        {state.loading && (
          <div className="flex flex-col items-center justify-center py-40 space-y-12">
            <div className="w-px h-24 bg-gradient-to-b from-transparent via-[#C5A059] to-transparent animate-pulse"></div>
            <div className="text-center">
              <p className="text-2xl font-serif italic text-[#111111] mb-2">L'Esprit s'éveille</p>
              <p className="text-[#C5A059] font-bold uppercase tracking-[0.3em] text-[8px]">Mise en scène visuelle en cours...</p>
            </div>
          </div>
        )}
        {!state.loading && state.recipe && <RecipeCard recipe={state.recipe} imageUrl={state.imageUrl} />}
      </div>
    </div>
  );
};

const AboutPage: React.FC = () => (
  <div className="pt-40 pb-40 px-6 max-w-6xl mx-auto bg-[#FDFCFA]">
    <div className="grid md:grid-cols-2 gap-24 items-start mb-40">
      <div>
         <span className="text-[#C5A059] font-bold tracking-[0.4em] uppercase text-[9px] mb-6 block">Notre Essence</span>
         <h2 className="text-7xl font-serif italic text-[#111111] leading-[0.9] mb-12">Le Noir, <br/> le Feu, <br/> l'Éternel.</h2>
         <div className="w-20 h-px bg-[#C5A059] mb-12"></div>
         <p className="text-xl text-[#111111]/80 leading-relaxed font-light mb-8 italic font-serif">
           « Nous ne cuisons pas des cookies. Nous capturons des instants de tension entre l'ombre et la lumière. »
         </p>
         <p className="text-[#111111]/50 leading-relaxed text-sm mb-8">
           Noir & Feu est né du désir de transcender la pâtisserie conventionnelle. Dans un monde de douceur prévisible, nous avons choisi l'audace du contraste. Nos créations signatures sont le fruit d'une quête de perfection où chaque ingrédient est sélectionné pour sa force de caractère.
         </p>
      </div>
      <div className="relative pt-20">
         <div className="absolute top-0 right-0 w-64 h-96 border border-[#C5A059]/20 -z-10 translate-x-10 translate-y-10"></div>
         <div className="bg-[#111111] p-16 text-white aspect-[3/4] flex flex-col justify-between shadow-2xl">
            <i className="fas fa-fingerprint text-5xl text-[#C5A059]/30"></i>
            <div>
              <h3 className="text-3xl font-serif italic mb-6 text-[#C5A059]">L'Alchimie Stable</h3>
              <p className="text-xs opacity-60 leading-relaxed tracking-wide">
                Chaque recette de notre collection est immuable, telle une partition classique. L'IA n'intervient ici que pour magnifier l'expérience par le rendu visuel et la pédagogie vidéo, respectant l'intégrité de nos Créations Signatures.
              </p>
            </div>
         </div>
      </div>
    </div>

    <div className="text-center max-w-2xl mx-auto border-y border-[#C5A059]/10 py-20">
       <div className="text-[#C5A059] mb-10 text-4xl font-serif">✧</div>
       <p className="text-3xl font-serif italic text-[#111111] leading-snug mb-8">"L'audace est la seule épice dont on ne se lasse jamais."</p>
       <p className="text-[#C5A059] font-bold uppercase tracking-[0.4em] text-[8px]">La Maison Noir & Feu</p>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-[#FDFCFA]">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recettes" element={<RecipeGenerator />} />
          <Route path="/apropos" element={<AboutPage />} />
        </Routes>
        <footer className="bg-[#111111] text-white py-24 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-24">
            <div className="space-y-8">
              <div className="flex flex-col">
                <span className="text-[9px] tracking-[0.6em] font-bold text-[#C5A059] uppercase -mb-1">Atelier</span>
                <span className="font-serif text-2xl font-bold text-white italic">Noir & Feu</span>
              </div>
              <p className="text-[10px] uppercase tracking-widest leading-loose opacity-40 max-w-xs">Le mariage sacré du cacao noir et du piment royal. Une quête de l'excellence gustative.</p>
            </div>
            <div className="flex flex-col space-y-4">
              <span className="text-[#C5A059] text-[9px] font-bold uppercase tracking-[0.4em] mb-4">Exploration</span>
              <Link to="/" className="text-[10px] uppercase tracking-widest hover:text-[#C5A059] transition-colors">La Galerie</Link>
              <Link to="/recettes" className="text-[10px] uppercase tracking-widest hover:text-[#C5A059] transition-colors">Les Créations</Link>
              <Link to="/apropos" className="text-[10px] uppercase tracking-widest hover:text-[#C5A059] transition-colors">Notre Esprit</Link>
            </div>
            <div className="flex flex-col space-y-6">
              <span className="text-[#C5A059] text-[9px] font-bold uppercase tracking-[0.4em] mb-4">Cercle Privé</span>
              <div className="flex space-x-8">
                 <a href="#" className="hover:text-[#C5A059] transition-colors opacity-50 hover:opacity-100"><i className="fab fa-instagram text-xl"></i></a>
                 <a href="#" className="hover:text-[#C5A059] transition-colors opacity-50 hover:opacity-100"><i className="fab fa-pinterest-p text-xl"></i></a>
              </div>
              <p className="text-[9px] opacity-20 uppercase tracking-[0.3em] pt-8 border-t border-white/5">© 2024 Maison Noir & Feu. Tous droits réservés.</p>
            </div>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
