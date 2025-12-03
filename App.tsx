import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Pricing } from './pages/Pricing';
import { Dashboard } from './pages/Dashboard';
import { Auth } from './pages/Auth';
import { Contact } from './pages/Contact';
import { User, Plan, PlanType } from './types';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { initializeRevenueCat, checkSubscriptionStatus } from './revenuecat';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize RevenueCat and listen for Firebase Auth changes
  useEffect(() => {
    // 1. Init RevenueCat
    initializeRevenueCat();

    // 2. Auth Listener
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Check if user has paid subscription via RevenueCat
        const isPro = await checkSubscriptionStatus();
        
        // Define credits/plan based on RC entitlement status
        // If Pro, give Premium benefits, else Free benefits
        const planType = isPro ? PlanType.PREMIUM : PlanType.FREE;
        const credits = isPro ? 300 : 10;

        setUser({
          id: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          plan: planType, 
          credits: credits, 
        });

        if (currentPage === 'login' || currentPage === 'register') {
            setCurrentPage('dashboard');
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentPage]);

  const navigate = (page: string) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  const handleLogout = async () => {
    try {
        await signOut(auth);
        navigate('home');
    } catch (error) {
        console.error("Logout failed", error);
    }
  };

  // Handle Plan Selection from Pricing Page
  const handleSelectPlan = async (plan: Plan) => {
    if (user) {
      // If user is logged in, just update state (real implementation happens in Pricing.tsx via RC)
       const updatedUser = { ...user, plan: plan.name, credits: plan.creditsIncluded };
       setUser(updatedUser);
       navigate('dashboard');
    } else {
      navigate('register');
    }
  };

  if (loading) {
      return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={navigate} />;
      case 'pricing':
        return <Pricing onSelectPlan={handleSelectPlan} user={user} />;
      case 'contact':
        return <Contact onNavigate={navigate} />;
      case 'login':
        return <Auth mode="login" onNavigate={navigate} />;
      case 'register':
        return <Auth mode="register" onNavigate={navigate} />;
      case 'dashboard':
        if (!user) return <Auth mode="login" onNavigate={navigate} />;
        return <Dashboard user={user} onNavigate={navigate} />;
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-slate-900">
      <Navbar user={user} onNavigate={navigate} onLogout={handleLogout} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;