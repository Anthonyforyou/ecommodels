import React from 'react';
import { User, PlanType } from '../types';
import { Button } from '../components/Button';
import { Wand2, CreditCard, ExternalLink, AlertCircle, Plus } from 'lucide-react';

interface DashboardProps {
  user: User;
  onNavigate: (page: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate }) => {
  const handleLaunchTool = () => {
    // Redirect to the actual tool
    alert("Redirecting to AcomModels Studio Engine (External)...");
  };

  const isLowCredits = user.credits < 5;

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Studio Overview</h1>
            <p className="text-slate-500 mt-2">Welcome back, {user.name || user.email}</p>
          </div>
          <Button onClick={handleLaunchTool} className="bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-500/30 rounded-full px-6">
            <Wand2 className="mr-2 h-5 w-5" />
            Launch AI Studio
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Credit Balance */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs font-bold uppercase text-slate-400 tracking-wider">Available Credits</p>
                <h3 className="text-5xl font-bold text-slate-900 mt-3">{user.credits}</h3>
              </div>
              <div className="p-4 bg-brand-50 text-brand-600 rounded-2xl">
                <Wand2 size={24} />
              </div>
            </div>
            {isLowCredits && (
               <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-lg text-sm mb-6">
                 <AlertCircle size={16} />
                 <span>Running low on credits</span>
               </div>
            )}
            <Button variant="outline" size="sm" fullWidth onClick={() => onNavigate('pricing')} className="rounded-xl border-slate-200">
              Top Up
            </Button>
          </div>

          {/* Current Plan */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs font-bold uppercase text-slate-400 tracking-wider">Current Plan</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-3">{user.plan}</h3>
                {user.plan === PlanType.FREE && (
                   <p className="text-xs text-slate-400 mt-2">Limited to standard resolution</p>
                )}
              </div>
              <div className="p-4 bg-slate-50 text-slate-900 rounded-2xl">
                <CreditCard size={24} />
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-brand-600 hover:text-brand-700 pl-0 font-medium" onClick={() => onNavigate('pricing')}>
              Manage Subscription <ExternalLink size={14} className="ml-1" />
            </Button>
          </div>

           {/* Quick Tips */}
           <div className="bg-black p-8 rounded-3xl border border-slate-800 shadow-sm text-white">
            <div className="flex items-center gap-2 mb-4">
               <span className="bg-brand-500 text-[10px] font-bold px-2 py-0.5 rounded text-white uppercase">New</span>
               <h3 className="font-bold">Model V3.1 Released</h3>
            </div>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Our latest engine update improves fabric texture rendering on silk and denim materials by 40%.
            </p>
            <div className="flex items-center gap-3">
               <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                  <span className="text-xs font-bold">3.1</span>
               </div>
               <div className="text-xs text-slate-500">
                  Updated automatically
               </div>
            </div>
          </div>
        </div>

        {/* Recent Projects Placeholder */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden min-h-[400px]">
          <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-900">Recent Generations</h3>
            <Button variant="ghost" size="sm" className="text-slate-500">View All</Button>
          </div>
          
          {/* Empty State / Gallery */}
          <div className="p-8">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               {/* Placeholders */}
               {[1,2,3,4].map((i) => (
                 <div key={i} className="group relative aspect-[3/4] bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                    <img src={`https://picsum.photos/300/400?random=${i+30}`} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0" alt="" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button variant="secondary" size="sm">Download 4K</Button>
                    </div>
                 </div>
               ))}
               
               <div className="aspect-[3/4] rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:text-brand-600 hover:border-brand-200 hover:bg-brand-50/50 transition-all cursor-pointer" onClick={handleLaunchTool}>
                  <Plus className="w-8 h-8 mb-2" />
                  <span className="text-sm font-medium">New Project</span>
               </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};