import { Link } from 'react-router-dom';
import { Check, Zap, Shield, Crown, Building2, ArrowRight } from 'lucide-react';
import React from 'react';



type PricingCardType = {
  title: string,
  price: string,
  features: string[],
  icon: React.ElementType,
  isFeatured?: boolean
}


const PricingCard = ({ 
  title, 
  price, 
  features, 
  icon: Icon, 
  isFeatured = false 
}:PricingCardType) => (
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
    
    <Link to="/checkout" state={{ plan: { name: title, price: parseFloat(price.replace('$', '')), features } }} className={`w-full py-4 rounded-2xl font-black transition-[background-color,color,transform] text-center block ${
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
            title="Free "
            price="$0"
            icon={Zap}
            features={[
              "Up to 1,000 MAU",
              "Basic Authentication",
              "Email/Password Login",
              "Community Support",
              "Shared Infrastructure"
            ]}
          />
          <PricingCard 
            title="Basic"
            price="$5"
            isFeatured={true}
            icon={Shield}
            features={[
              "Up to 10,000 MAU",
              "Passkey Support",
              "OAuth Providers",
              "Email Support",
              "Standard Infrastructure",
              "Basic Analytics"
            ]}
          />
          <PricingCard 
            title="Pro"
            price="$15"
            icon={Crown}
            features={[
              "Up to 100,000 MAU",
              "Advanced Multi-tenant",
              "Priority 24/7 Support",
              "Dedicated Cluster",
              "Custom JWT Claims",
              "Advanced Analytics",
              "SLA Protection",
              "Webhook Events"
            ]}
          />
        </div>
      </section>

      <section className="pb-24 px-6 max-w-5xl mx-auto">
        <div className="bg-linear-to-br from-primary/5 via-surface-container-low to-primary/10 rounded-[2.5rem] p-12 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto">
              <Building2 className="w-10 h-10 text-primary" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-on-surface -tracking-[0.02em]">
              Enterprise Solutions
            </h2>
            
            <p className="text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
              Need unlimited MAU, dedicated infrastructure, custom SLAs, or white-label solutions? 
              Let's build a plan tailored to your organization's needs.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <div className="flex items-center gap-2 text-sm font-bold text-on-surface">
                <Check className="w-5 h-5 text-primary" />
                Unlimited MAU
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-on-surface">
                <Check className="w-5 h-5 text-primary" />
                Custom SLA
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-on-surface">
                <Check className="w-5 h-5 text-primary" />
                White-label
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-on-surface">
                <Check className="w-5 h-5 text-primary" />
                Dedicated Support
              </div>
            </div>
            
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-2xl font-black text-lg shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
            >
              Contact Sales
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
