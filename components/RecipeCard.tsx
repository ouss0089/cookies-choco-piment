
import React, { useState, useEffect } from 'react';
import { Recipe, Ingredient } from '../types';
import { generateStepVideo } from '../services/geminiService';

interface RecipeCardProps {
  recipe: Recipe;
  imageUrl: string | null;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, imageUrl }) => {
  const [targetServings, setTargetServings] = useState(1);
  const [activeStepVideo, setActiveStepVideo] = useState<{index: number, url: string | null, loading: boolean, loadingMsg: string} | null>(null);

  const scaleFactor = targetServings / recipe.servings;

  const scaleAmount = (amount: string, factor: number): string => {
    const numberRegex = /(\d+(?:\.\d+)?)/g;
    return amount.replace(numberRegex, (match) => {
      const num = parseFloat(match);
      const scaled = num * factor;
      return scaled % 1 === 0 ? scaled.toString() : scaled.toFixed(1);
    });
  };

  const displayedIngredients = recipe.ingredients.map(ing => ({
    ...ing,
    amount: scaleAmount(ing.amount, scaleFactor)
  }));

  const handleIncrement = () => setTargetServings(prev => prev + 1);
  const handleDecrement = () => setTargetServings(prev => Math.max(1, prev - 1));

  const loadingMessages = [
    "Inspiration divine...",
    "Capture de l'éclat...",
    "Cristallisation du cacao...",
    "Harmonie des épices...",
    "Éveil des sens..."
  ];

  const handleStepClick = async (step: string, index: number) => {
    // Check for user-selected API key before accessing Veo video generation features
    if (!(window as any).aistudio?.hasSelectedApiKey || !await (window as any).aistudio.hasSelectedApiKey()) {
      alert("L'expérience vidéo nécessite une configuration de clé API avec facturation activée.");
      if ((window as any).aistudio?.openSelectKey) {
        await (window as any).aistudio.openSelectKey();
        // Proceeding immediately after openSelectKey to avoid race condition delays
      } else {
        return;
      }
    }

    setActiveStepVideo({ index, url: null, loading: true, loadingMsg: loadingMessages[0] });
    let msgIdx = 0;
    const msgInterval = setInterval(() => {
      msgIdx = (msgIdx + 1) % loadingMessages.length;
      setActiveStepVideo(prev => prev ? { ...prev, loadingMsg: loadingMessages[msgIdx] } : null);
    }, 5000);

    try {
      const videoUrl = await generateStepVideo(step, recipe.name);
      clearInterval(msgInterval);
      setActiveStepVideo({ index, url: videoUrl, loading: false, loadingMsg: "" });
    } catch (err: any) {
      console.error(err);
      clearInterval(msgInterval);
      
      // Handle the specific error indicating an invalid or missing paid project API key
      if (err.message?.includes("Requested entity was not found")) {
        alert("La clé API n'a pas pu être validée. Veuillez sélectionner un projet GCP avec facturation.");
        if ((window as any).aistudio?.openSelectKey) await (window as any).aistudio.openSelectKey();
      } else {
        alert("Le rendu vidéo a rencontré un obstacle technique.");
      }
      setActiveStepVideo(null);
    }
  };

  return (
    <div className="bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] overflow-hidden max-w-6xl mx-auto mb-32 animate-fade-in border border-[#C5A059]/10">
      {imageUrl && (
        <div className="relative h-[40rem] w-full overflow-hidden">
          <img src={imageUrl} alt={recipe.name} className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80"></div>
          <div className="absolute inset-0 flex flex-col justify-end p-16 md:p-24">
            <div className="flex items-center space-x-4 mb-8">
              <span className="border border-[#C5A059] text-[#C5A059] px-6 py-2 text-[8px] font-bold uppercase tracking-[0.4em] backdrop-blur-sm">
                Intensité : {recipe.spicinessLevel}
              </span>
              <span className="text-white/40 text-[8px] font-bold uppercase tracking-[0.4em]">Collection Limitée</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-serif italic text-white leading-[0.8] mb-4 tracking-tighter">
               {recipe.name.split(' ').map((word, i) => (
                 <span key={i} className={i % 2 !== 0 ? 'text-[#C5A059]' : ''}>{word} </span>
               ))}
            </h2>
          </div>
        </div>
      )}

      <div className="p-12 md:p-24 bg-[#FDFCFA]">
        <p className="text-3xl md:text-4xl text-[#111111] font-serif italic mb-24 leading-snug text-center max-w-4xl mx-auto">
          « {recipe.description} »
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-32 border-y border-[#C5A059]/10 py-16">
          <div className="text-center">
            <p className="text-[8px] uppercase tracking-[0.4em] text-[#C5A059] font-bold mb-4">Préparation</p>
            <p className="text-2xl font-serif italic text-[#111111]">{recipe.prepTime}</p>
          </div>
          <div className="text-center">
            <p className="text-[8px] uppercase tracking-[0.4em] text-[#C5A059] font-bold mb-4">Cuisson</p>
            <p className="text-2xl font-serif italic text-[#111111]">{recipe.cookTime}</p>
          </div>
          <div className="text-center group">
            <p className="text-[8px] uppercase tracking-[0.4em] text-[#C5A059] font-bold mb-4">Pour</p>
            <div className="flex items-center justify-center space-x-6">
               <button onClick={handleDecrement} className="text-[#111111]/20 hover:text-[#C5A059] transition-colors"><i className="fas fa-minus text-xs"></i></button>
               <p className="text-3xl font-serif italic text-[#111111]">{targetServings}</p>
               <button onClick={handleIncrement} className="text-[#111111]/20 hover:text-[#C5A059] transition-colors"><i className="fas fa-plus text-xs"></i></button>
            </div>
          </div>
          <div className="text-center">
            <p className="text-[8px] uppercase tracking-[0.4em] text-[#C5A059] font-bold mb-4">Degré</p>
            <p className="text-2xl font-serif italic text-[#111111]">Exception</p>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-24">
          <div className="md:col-span-4 space-y-16">
            <div>
              <h3 className="text-2xl font-serif italic text-[#111111] mb-12 flex items-center">
                <span className="text-[#C5A059] mr-4 text-xs">✦</span> Ingrédients
              </h3>
              <ul className="space-y-8">
                {displayedIngredients.map((ing, idx) => (
                  <li key={idx} className="flex flex-col space-y-1 pb-4 border-b border-[#C5A059]/05 group">
                    <span className="text-[9px] text-[#C5A059] font-bold uppercase tracking-[0.2em]">{ing.amount}</span>
                    <span className="text-sm text-[#111111]/80 font-light group-hover:text-[#111111] transition-colors">{ing.item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-[#111111] p-10 text-white space-y-8">
              <h4 className="text-xl font-serif italic text-[#C5A059]">Notes du Chef</h4>
              <div className="space-y-6">
                {recipe.chefTips.map((tip, idx) => (
                  <p key={idx} className="text-[10px] leading-relaxed opacity-60 font-light italic">
                    {tip}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-8">
            <h3 className="text-2xl font-serif italic text-[#111111] mb-12 flex items-center">
              <span className="text-[#C5A059] mr-4 text-xs">✦</span> Le Protocole
            </h3>
            
            <div className="space-y-16">
              {recipe.instructions.map((step, idx) => (
                <div key={idx} className="group">
                  <div 
                    onClick={() => handleStepClick(step, idx)}
                    className={`flex cursor-pointer transition-all duration-700 pb-8 border-b border-[#C5A059]/10 ${activeStepVideo?.index === idx ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                  >
                    <div className="mr-12 flex-shrink-0">
                      <span className="text-4xl font-serif italic text-[#C5A059]/30">0{idx + 1}</span>
                    </div>
                    <div className="flex-1 pt-2">
                      <p className="text-lg text-[#111111] leading-relaxed font-light mb-4">{step}</p>
                      <button className="text-[8px] font-bold text-[#C5A059] uppercase tracking-[0.3em] flex items-center space-x-2">
                         <span className="w-4 h-px bg-[#C5A059]"></span>
                         <span>Rendu Visuel IA</span>
                      </button>
                    </div>
                  </div>

                  {activeStepVideo?.index === idx && (
                    <div className="mt-12 bg-[#111111] aspect-video relative overflow-hidden ring-1 ring-[#C5A059]/20 shadow-2xl">
                      {activeStepVideo.loading ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12 text-center">
                          <div className="w-12 h-px bg-white/20 relative overflow-hidden mb-8">
                             <div className="absolute inset-0 bg-[#C5A059] translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
                          </div>
                          <p className="text-xl font-serif italic mb-2 tracking-widest opacity-80 uppercase text-[10px]">« {activeStepVideo.loadingMsg} »</p>
                        </div>
                      ) : activeStepVideo.url ? (
                        <video src={activeStepVideo.url} controls autoPlay className="w-full h-full object-cover" />
                      ) : null}
                      {!activeStepVideo.loading && (
                        <button onClick={(e) => { e.stopPropagation(); setActiveStepVideo(null); }} className="absolute top-6 right-6 text-white/40 hover:text-[#C5A059] transition-all">
                          <i className="fas fa-times text-xl"></i>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
