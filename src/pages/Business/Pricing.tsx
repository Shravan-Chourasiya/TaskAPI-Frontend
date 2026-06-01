import { useNavigate } from 'react-router-dom';
import { Check, Key, RefreshCw, Zap } from 'lucide-react';
import React from 'react';
import { usePlanStore } from '@/lib/planStore';
import { PRICING_PLANS } from '@/constants';



type PricingCardType = {
  title: string,
  price: string,
  features: string[],
  icon: React.ElementType,
  isFeatured?: boolean,
  buttonText?: string
}

const iconMap = {
  Key,
  RefreshCw,
  Zap
};


const PricingCard = ({ 
  title, 
  price, 
  features, 
  icon: Icon, 
  isFeatured = false,
  buttonText = 'Get Started'
}:PricingCardType) => {
  const navigate = useNavigate();
  const setSelectedPlan = usePlanStore((state) => state.setSelectedPlan);

  const handleSelectPlan = () => {
    setSelectedPlan({ name: title, price: parseFloat(price.replace('$', '')), features });
    navigate('/checkout');
  };

  return (
  <div className={`bg-surface shadow-lg rounded-md p-8 flex flex-col items-start transition-transform hover:-translate-y-1 duration-300 relative overflow-hidden`}>
    <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
    {isFeatured && (
      <div className="absolute top-4 -right-12 bg-primary text-on-primary text-xs font-bold px-9 py-2 rotate-45 shadow-md">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MOST POPULAR
      </div>
    )}
    <div className="flex items-center justify-between w-full mb-8">
      <div className="flex items-center gap-4">
        <div className="text-primary">
          <Icon className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      <div className={`text-[32px] font-mono text-on-surface leading-none ${isFeatured ? 'mr-8' : ''}`}>
        {price}<span className="text-base font-normal text-on-surface-variant">/mo</span>
      </div>
    </div>
    
    <ul className="space-y-4 mb-10 w-full">
      {features.map((feature, i) => (
        <li key={i} className="flex items-center gap-3 text-sm text-on-surface-variant">
          <Check className="w-5 h-5 text-primary shrink-0" />
          {feature}
        </li>
      ))}
    </ul>
    
    <button onClick={handleSelectPlan} className="mt-auto w-full bg-primary text-on-primary px-6 py-3 rounded-md text-sm font-bold hover:opacity-90 active:scale-95 transition-all">
      {buttonText}
    </button>
  </div>
  );
};

const Pricing: React.FC = () => {
  return (
    <div>
      <section className="py-12 px-6 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-primary text-xs font-bold tracking-widest uppercase">
          Subscription Clusters
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-on-surface -tracking-[0.03em]">
          Scalable Infrastructure. <br/> Transparent Pricing.
        </h1>
        <p className="text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
          From solo founders to global enterprises, TaskAPI scales with your user base. No hidden tokens, just pure performance.
        </p>
      </section>

      <section className="pb-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING_PLANS.map((plan) => (
            <PricingCard
              key={plan.title}
              title={plan.title}
              price={plan.price}
              icon={iconMap[plan.icon as keyof typeof iconMap]}
              buttonText={plan.buttonText}
              isFeatured={plan.isFeatured}
              features={plan.features}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Pricing;
