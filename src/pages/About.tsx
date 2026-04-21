import { Link } from 'react-router-dom';
import { 
  Terminal, 
  Code, 
  CloudLightning,
  ArrowRight
} from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-0">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-surface">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold mb-4 block">Architecture & Vision</span>
            <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-on-surface tracking-tight leading-[1.1] mb-8">
              The API-first <span className="text-primary italic">Standard</span> for Secure Auth.
            </h1>
            <p className="text-lg md:text-xl text-secondary leading-relaxed max-w-2xl">
              At TaskAPI, we don't just build authentication; we engineer the invisible infrastructure that powers the modern web. We believe that security should be developer-centric, resilient, and beautifully precise.
            </p>
          </div>
        </div>
        {/* Asymmetric Background Accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-surface-container-low -skew-x-12 translate-x-1/4 z-0"></div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-surface border-y border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Our Mission
              </div>
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface mb-8 tracking-tight">Frictionless Security, <br/>Engineered for <span className="text-primary italic">Scale</span>.</h2>
              <p className="text-lg text-secondary leading-relaxed mb-8 max-w-lg">
                We are on a mission to eliminate the trade-off between complex security protocols and rapid product development. Our platform empowers engineering teams to ship secure-by-default applications at the speed of thought.
              </p>
              <Link to="/careers" className="inline-flex items-center gap-2 font-black text-primary uppercase tracking-widest text-xs mb-8 group">
                Join our mission <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="flex gap-12">
                <div>
                  <div className="text-3xl font-headline font-bold text-on-surface">99.99%</div>
                  <div className="text-xs font-mono uppercase text-secondary mt-1">SLA Guarantee</div>
                </div>
                <div>
                  <div className="text-3xl font-headline font-bold text-on-surface">&lt;15ms</div>
                  <div className="text-xs font-mono uppercase text-secondary mt-1">Average Latency</div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-secondary/20 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-inverse-surface rounded-xl overflow-hidden shadow-2xl border border-white/10">
                  <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
                    <div className="flex gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></div>
                    </div>
                    <div className="text-[10px] font-mono text-outline/50">auth_core.rs</div>
                  </div>
                  <div className="p-8">
                    <pre className="font-mono text-sm md:text-base leading-relaxed overflow-x-auto text-white">
                      <code dangerouslySetInnerHTML={{ __html: `
<span class="text-primary-fixed">pub async fn</span> <span class="text-secondary-fixed">init_secure_session</span>(ctx: Context) {
    <span class="text-outline-variant">// Initialize zero-knowledge handshake</span>
    <span class="text-primary-fixed">let</span> session = SecurityCore::<span class="text-tertiary-fixed-dim">new</span>()
        .<span class="text-tertiary-fixed-dim">protocol</span>(Protocol::OIDC)
        .<span class="text-tertiary-fixed-dim">encryption</span>(Cipher::AES_256_GCM)
        .<span class="text-tertiary-fixed-dim">execute</span>().<span class="text-primary-fixed">await</span>;

    <span class="text-primary-fixed">return</span> session;
}`.trim() }} />
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer-First Section */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img className="rounded-xl shadow-2xl border border-outline-variant/20 w-full" alt="Minimalist work environment" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072" />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-headline font-extrabold text-on-surface mb-6 tracking-tight">By Developers, <br/><span className="text-primary">For Developers.</span></h2>
              <p className="text-secondary leading-relaxed mb-6">
                We built TaskAPI because we were tired of legacy identity providers that treat developers as an afterthought. Our platform is designed from the CLI up to be the tool we always wanted.
              </p>
              <div className="space-y-4">
                {[
                  { icon: <Terminal className="w-5 h-5 text-primary" />, title: 'CLI-First Workflow', desc: 'Manage everything from your terminal without ever leaving your IDE.' },
                  { icon: <Code className="w-5 h-5 text-primary" />, title: 'Extensive SDKs', desc: 'Native support for Rust, Go, TypeScript, and Python with zero-overhead wrappers.' },
                  { icon: <CloudLightning className="w-5 h-5 text-primary" />, title: 'API-First Philosophy', desc: 'Our UI is just a consumer of our own public APIs. No hidden endpoints, ever.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="mt-1 shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface text-sm">{item.title}</h4>
                      <p className="text-xs text-secondary mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
