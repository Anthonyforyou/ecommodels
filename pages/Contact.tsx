import React from 'react';
import { Button } from '../components/Button';
import { Mail, MessageSquare, MapPin } from 'lucide-react';

interface ContactProps {
    onNavigate: (page: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-brand-600 font-bold tracking-widest uppercase text-xs mb-4">Support</h2>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Get in touch</h1>
        <p className="text-xl text-slate-500 font-light mb-16 max-w-2xl mx-auto">
          Have questions about Enterprise plans or need technical support? We're here to help.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col items-center">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-slate-900">
                    <Mail />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Email Support</h3>
                <p className="text-slate-500 text-sm mb-6">For general inquiries and billing.</p>
                <a href="mailto:hello@ecommodels.ai" className="text-brand-600 font-medium hover:underline">hello@ecommodels.ai</a>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col items-center">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-slate-900">
                    <MessageSquare />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Live Chat</h3>
                <p className="text-slate-500 text-sm mb-6">Available Mon-Fri, 9am - 5pm CET.</p>
                <Button variant="outline" size="sm" onClick={() => alert("Chat widget opening...")}>Start Chat</Button>
            </div>
        </div>

        <div className="bg-slate-900 text-white p-12 rounded-3xl">
            <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
            <p className="text-slate-400 mb-8">Join the platform today and get 10 free credits.</p>
            <Button variant="primary" className="bg-white text-black hover:bg-slate-200 border-none px-8" onClick={() => onNavigate('register')}>
                Create Free Account
            </Button>
        </div>

      </div>
    </div>
  );
};