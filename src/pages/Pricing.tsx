import { Link } from 'react-router-dom';
import { Check, Zap, Shield, Crown } from 'lucide-react';
import React from 'react';

const PricingCard = ({ 
  title, 
  price, 
  features, 
  icon: Icon, 
  isFeatured = false 
}: { 
  title: string, 
  price: string, 
  features: string[], 
  icon: React.ElementType,
  isFeatured?: boolean 
}) => (
  <div className={`p-10 rounded-[2.5rem] flex flex-col h-full transition-[background-color,box-shadow,transform] duration-300 ${
    isFeatured 
      ? 'bg-surface-container-lowest shadow-ambient-hover ring-2 ring-primary relative z-10 scale-105' 
      : 'bg-surface-container-low hover:bg-surface-container-lowest hover:shadow-ambient group'
  }`}>
    {isFeatured && (
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-on-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
        Most Advanced
      </div>
    )}
    <div className="mb-8">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
        isFeatured ? 'bg-primary text-on-primary' : 'bg-white text-primary group-hover:bg-primary group-hover:text-white'
      }`}>
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-2xl font-black text-on-surface mb-2">{title}</h3>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-black text-on-surface">{price}</span>
        <span className="text-secondary font-bold text-sm">/month</span>
      </div>
    </div>
    
    <ul className="space-y-4 mb-10 grow">
      {features.map((feature, i) => (
        <li key={i} className="flex items-center gap-3 text-secondary font-medium">
          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 text-primary stroke-4" />
          </div>
          {feature}
        </li>
      ))}
    </ul>
    
    <Link to="/contact" className={`w-full py-4 rounded-2xl font-black transition-[background-color,color,transform] text-center block ${
      isFeatured 
        ? 'bg-primary text-on-primary shadow-lg shadow-primary/20 hover:scale-[1.02]' 
        : 'bg-surface-container-high text-on-surface hover:bg-primary hover:text-on-primary hover:scale-[1.02]'
    }`}>
      Choose {title}
    </Link>
  </div>
);

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 items-center">
          <PricingCard 
            title="Standard"
            price="$0"
            icon={Zap}
            features={[
              "Up to 10,000 MAU",
              "Standard Passkey Support",
              "Community Support",
              "Shared Infrastructure"
            ]}
          />
          <PricingCard 
            title="Premium"
            price="$99"
            isFeatured={true}
            icon={Shield}
            features={[
              "Up to 100,000 MAU",
              "Advanced Multi-tenant",
              "Priority 24/7 Support",
              "Dedicated Cluster",
              "Custom JWT Claims",
              "SLA Protection"
            ]}
          />
          <PricingCard 
            title="Enterprise"
            price="Custom"
            icon={Crown}
            features={[
              "Unlimited MAU",
              "White-label Proxy",
              "On-premise Deployment",
              "Custom Contracts",
              "Dedicated Engineer"
            ]}
          />
        </div>
      </section>
    </div>
  );
};

export default Pricing;
