import React, { useState } from 'react';
import { PLANS } from '../constants';
import { Button } from '../components/Button';
import { Check, Info, Loader2 } from 'lucide-react';
import { Plan, User } from '../types';
import { purchaseSubscription } from '../revenuecat';

interface PricingProps {
  onSelectPlan: (plan: Plan) => void;
  user?: User | null;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan, user }) => {
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);

  const handlePlanClick = async (plan: Plan) => {
    if (plan.price === 0) {
      // Free plan logic
      onSelectPlan(plan);
    } else {
      // RevenueCat Purchase Logic for Paid Plans
      try {
        setLoadingPlanId(plan.id);
        
        // Call the Web SDK purchase logic
        const success = await purchaseSubscription(plan.id);
        
        if (success) {
          onSelectPlan(plan); // Update app state if purchase successful
        } else {
            // Optional: Handle failure (e.g. user cancelled)
            console.log("Purchase failed or cancelled");
        }
      } catch (error) {
        console.error("Purchase flow error:", error);
      } finally {
        setLoadingPlanId(null);
      }
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-brand-600 font-bold tracking-widest uppercase text-xs mb-4">Membership</h2>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Flexible plans for every stage.</h1>
          <p className="text-xl text-slate-500 font-light">
            No hidden fees. Upgrade or cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PLANS.map((plan) => (
            <div 
              key={plan.id} 
              className={`relative flex flex-col p-8 rounded-3xl transition-all duration-300 ${
                plan.recommended 
                  ? 'bg-slate-900 text-white shadow-2xl scale-105 z-10' 
                  : 'bg-white text-slate-900 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-lg'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-500 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-lg">
                  Best Value
                </div>
              )}

              <div className="mb-8 text-center">
                <h3 className={`text-lg font-bold uppercase tracking-wide ${plan.recommended ? 'text-slate-300' : 'text-slate-500'}`}>{plan.name}</h3>
                <div className="mt-4 flex items-baseline justify-center">
                  <span className="text-5xl font-bold tracking-tight">€{plan.price}</span>
                  <span className={`ml-2 text-sm ${plan.recommended ? 'text-slate-400' : 'text-slate-500'}`}>/mo</span>
                </div>
                <div className={`mt-4 text-sm font-medium ${plan.recommended ? 'text-brand-300' : 'text-brand-600'}`}>
                  {plan.creditsIncluded} credits included
                </div>
                {plan.price > 0 && (
                  <div className={`mt-2 text-xs flex items-center justify-center gap-1 opacity-80 ${plan.recommended ? 'text-slate-400' : 'text-slate-500'}`}>
                    <Info size={12} />
                    Extra credits: €{plan.costPerExtraCredit.toFixed(2)}
                  </div>
                )}
              </div>

              <div className={`h-px w-full mb-8 ${plan.recommended ? 'bg-slate-800' : 'bg-slate-100'}`}></div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className={`h-5 w-5 shrink-0 mr-3 ${plan.recommended ? 'text-green-400' : 'text-green-600'}`} />
                    <span className={`text-sm ${plan.recommended ? 'text-slate-300' : 'text-slate-600'}`}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={plan.recommended ? 'primary' : 'outline'} 
                fullWidth 
                className={plan.recommended ? 'bg-white text-black hover:bg-slate-200 border-none' : ''}
                onClick={() => handlePlanClick(plan)}
                disabled={loadingPlanId === plan.id}
              >
                {loadingPlanId === plan.id ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin h-4 w-4" /> Processing...
                  </span>
                ) : (
                  plan.price === 0 ? 'Start For Free' : `Select ${plan.name}`
                )}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-slate-400 text-sm">
            Secured by RevenueCat & Stripe. Enterprise billing available.
          </p>
        </div>
      </div>
    </div>
  );
};