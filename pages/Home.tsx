import React from 'react';
import { Button } from '../components/Button';
import { TESTIMONIALS } from '../constants';
import { ArrowRight, Upload, Layers, Zap } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* Centered Hero Section */}
      <section className="relative pt-44 pb-24 lg:pt-56 lg:pb-32 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-800 text-[10px] font-bold uppercase tracking-widest mb-8 mx-auto hover:bg-slate-100 transition-colors cursor-default">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-600"></span>
            New Generation Engine Live
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-900 leading-[1.05] tracking-tight mb-8">
            Fashion models,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900">digitally perfected.</span>
          </h1>
          
          <p className="text-xl text-slate-500 mb-12 leading-relaxed font-normal max-w-2xl mx-auto">
            EcomModels AI transforms ghost mannequins into high-converting, photorealistic on-model imagery. Studio quality, minus the studio.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" onClick={() => onNavigate('register')} className="bg-black text-white hover:bg-slate-800 rounded-full px-12 h-14 text-base font-medium shadow-2xl shadow-slate-200 hover:scale-105 transition-transform duration-200">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => onNavigate('how-it-works')} className="rounded-full px-12 h-14 text-base font-medium border-slate-200 hover:bg-slate-50 text-slate-900">
              View Examples
            </Button>
          </div>
          
          <p className="mt-6 text-sm text-slate-400 font-medium">10 free credits included • No credit card required</p>

          {/* Hero Visual - Centered */}
          <div className="mt-24 relative max-w-5xl mx-auto">
             <div className="absolute -inset-20 bg-gradient-to-tr from-brand-100/40 via-purple-50/40 to-transparent rounded-[100%] blur-3xl -z-10"></div>
             <div className="relative rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-200 bg-white grid md:grid-cols-2">
                 <div className="relative h-[450px] md:h-[600px] border-b md:border-b-0 md:border-r border-slate-100">
                    <img src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Clothing Input" className="w-full h-full object-cover" />
                    <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm border border-white/50">Input</div>
                 </div>
                 <div className="relative h-[450px] md:h-[600px]">
                    <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="AI Generated Model" className="w-full h-full object-cover" />
                    <div className="absolute bottom-6 left-6 bg-black text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg">Generated Result</div>
                 </div>
             </div>
          </div>
        </div>
      </section>

      {/* Tech Spec Section */}
      <section className="py-32 bg-slate-50 overflow-hidden" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Streamlined for Speed</h2>
            <p className="text-slate-500 text-xl max-w-2xl mx-auto font-light">
              From upload to 4K export in seconds.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-10 rounded-[2rem] bg-white border border-slate-100 shadow-sm text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-8 text-black">
                <Upload className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">1. Upload Product</h3>
              <p className="text-slate-500 leading-relaxed">
                Upload your ghost mannequin or flat lay shots. We automagically remove backgrounds.
              </p>
            </div>
            <div className="p-10 rounded-[2rem] bg-white border border-slate-100 shadow-sm text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-8 text-black">
                <Layers className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">2. Select Model</h3>
              <p className="text-slate-500 leading-relaxed">
                Choose from our diverse library of photorealistic digital models to match your brand.
              </p>
            </div>
            <div className="p-10 rounded-[2rem] bg-white border border-slate-100 shadow-sm text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-8 text-black">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">3. Generate</h3>
              <p className="text-slate-500 leading-relaxed">
                Receive high-resolution images instantly. Ready for your Shopify or Magento store.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-32 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-xs font-bold text-slate-400 text-center uppercase tracking-[0.2em] mb-16">Trusted by Forward-Thinking Brands</h2>
           <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
             {TESTIMONIALS.map((t, i) => (
               <div key={i} className="bg-slate-50 p-10 rounded-3xl flex items-start gap-5 hover:bg-slate-100 transition-colors">
                 <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full object-cover grayscale opacity-90" />
                 <div>
                   <p className="text-lg text-slate-800 font-medium italic mb-4 leading-relaxed tracking-tight">"{t.text}"</p>
                   <div>
                     <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                     <div className="text-xs text-slate-500 uppercase tracking-wide mt-1 font-semibold">{t.role} • {t.company}</div>
                   </div>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#111_25%,transparent_25%,transparent_75%,#111_75%,#111),linear-gradient(45deg,#111_25%,transparent_25%,transparent_75%,#111_75%,#111)] bg-[length:60px_60px] opacity-[0.03]"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">Ready to upgrade?</h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">Join the hundreds of brands using EcomModels AI to create stunning imagery faster.</p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Button size="lg" variant="primary" onClick={() => onNavigate('register')} className="bg-white text-black hover:bg-slate-200 rounded-full px-12 py-5 text-lg font-bold border-none h-auto">
                Get Started Free
            </Button>
            <Button size="lg" variant="outline" onClick={() => onNavigate('contact')} className="border-slate-800 text-white hover:bg-slate-900 rounded-full px-12 py-5 text-lg font-bold h-auto">
                Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};