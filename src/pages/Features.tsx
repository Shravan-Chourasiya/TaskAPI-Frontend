import React from 'react';
import { Zap, Shield, Globe, Cpu, Lock, Terminal, Layers } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="p-8 rounded-[2rem] bg-surface-container-low hover:bg-surface-container-lowest hover:shadow-ambient transition-[background-color,box-shadow] duration-300 group">
    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold text-on-surface mb-3">{title}</h3>
    <p className="text-secondary leading-relaxed">{description}</p>
  </div>
);

const Features: React.FC = () => {
  return (
    <div>
      <section className="py-12 px-6 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-primary text-xs font-bold tracking-widest uppercase">
          Capabilities Matrix
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-on-surface -tracking-[0.03em]">
          Engineered for <br/> Absolute Control.
        </h1>
        <p className="text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
          TaskAPI provides a headless authentication layer that fits into any architecture without forcing you into proprietary widgets.
        </p>
      </section>

      <section className="pb-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Zap}
            title="Passkey Native"
            description="Built-in support for biometric and hardware-based passkeys out of the box. No extra plugins needed."
          />
          <FeatureCard 
            icon={Shield}
            title="Zero-Knowledge"
            description="We never store plain-text secrets. Your user data is protected by industry-leading salt/hash standards."
          />
          <FeatureCard 
            icon={Layers}
            title="Multi-Tenant"
            description="Native support for complex organization structures, project isolation, and tenant-specific policies."
          />
          <FeatureCard 
            icon={Terminal}
            title="CLI-First"
            description="Manage your entire environment, rotate keys, and debug sessions directly from your terminal."
          />
          <FeatureCard 
            icon={Lock}
            title="MFA Anywhere"
            description="Implement TOTP, SMS, or Email OTP with single REST calls. We handle the session state for you."
          />
          <FeatureCard 
            icon={Globe}
            title="Global Edge"
            description="Sub-50ms authentication response times with our globally distributed edge infrastructure."
          />
        </div>
      </section>

      {/* Interactive Detail Section */}
      <section className="bg-surface-container-low py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-black text-on-surface leading-tight tracking-tighter">
              A Headless Core for <br/>Your Entire Stack.
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Any Frontend', desc: 'React, Next.js, Vue, Svelte, or Vanilla JS. We don\'t care. We provide the data, you build the UI.' },
                { title: 'Any Backend', desc: 'SDKs for Node, Go, Python, Rust, and Ruby. Or use the REST API directly.' },
                { title: 'SOC2 Ready', desc: 'Audit logs, automated rotation, and granular permissions out of the box.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface">{item.title}</h4>
                    <p className="text-secondary">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-4 rounded-[2.5rem] shadow-ambient">
            <div className="bg-[#293040] rounded-[2rem] p-8 aspect-square flex flex-col justify-center items-center text-center space-y-6 overflow-hidden relative">
               <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_70%)]"></div>
               <Cpu className="w-20 h-20 text-primary-fixed mb-4 animate-pulse" />
               <div className="font-mono text-primary-fixed text-lg">SYSTEMS_ACTIVE_100%</div>
               <div className="space-y-2">
                 <div className="h-2 w-48 bg-white/10 rounded-full overflow-hidden">
                   <div className="h-full bg-primary w-3/4"></div>
                 </div>
                 <div className="h-2 w-32 bg-white/10 rounded-full mx-auto"></div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
