import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, Shield, Zap, Code2, Globe } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section - The Precision Luminary Layout */}
      <section className="pt-0 pb-16 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-primary text-xs font-bold tracking-widest uppercase">
              <Zap className="w-3 h-3" />
              API-First Infrastructure
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-on-surface leading-[1.1] -tracking-[0.03em]">
              Authentication Built for the <span className="text-primary">API-First Era</span>
            </h1>
            
            <p className="text-xl text-secondary max-w-xl leading-relaxed">
              Secure, scalable auth that developers actually want to use. Zero friction, maximum control. Built as a headless utility for your entire ecosystem.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/login" className="bg-primary text-on-primary px-8 py-4 rounded-md font-bold hover:bg-primary-container transition-[background-color,box-shadow,transform] hover:scale-[1.02] active:scale-[0.98] duration-200 flex items-center gap-2 shadow-ambient hover:shadow-ambient-hover">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/docs" className="px-8 py-4 rounded-md font-bold text-on-surface hover:bg-surface-container transition-colors duration-200 flex items-center gap-2 ghost-border">
                Read API Docs
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full">
            {/* Code Block Component */}
            <div className="bg-[#293040] rounded-xl overflow-hidden shadow-2xl scale-105 lg:scale-110">
              <div className="bg-[#3d4947]/30 px-6 py-3 flex items-center justify-between border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-outline uppercase tracking-widest font-bold">
                  <Terminal className="w-3 h-3" />
                  registration.js
                </div>
              </div>
              <div className="p-8 pb-10 overflow-x-auto">
                <pre className="font-mono text-sm leading-relaxed">
                  <code className="text-[#89f5e7]">{"// Initialize secure user registration"}</code>{"\n"}
                  <code className="text-white">fetch</code>
                  <code className="text-outline-variant">(</code>
                  <code className="text-[#ffdbce]">'https://api.taskapi.com/v1/auth'</code>
                  <code className="text-outline-variant">, {"{"}</code>{"\n"}
                  {"  "}
                  <code className="text-white">method</code>
                  <code className="text-outline-variant">: </code>
                  <code className="text-[#ffdbce]">'POST'</code>
                  <code className="text-outline-variant">,</code>{"\n"}
                  {"  "}
                  <code className="text-white">headers</code>
                  <code className="text-outline-variant">: {"{"}</code>{"\n"}
                  {"    "}
                  <code className="text-[#ffdbce]">'X-API-Key'</code>
                  <code className="text-outline-variant">: </code>
                  <code className="text-[#ffdbce]">'tk_live_492...x82'</code>
                  <code className="text-outline-variant">,</code>{"\n"}
                  {"    "}
                  <code className="text-[#ffdbce]">'Content-Type'</code>
                  <code className="text-outline-variant">: </code>
                  <code className="text-[#ffdbce]">'application/json'</code>{"\n"}
                  {"  "}
                  <code className="text-outline-variant">{"}"},</code>{"\n"}
                  {"  "}
                  <code className="text-white">body</code>
                  <code className="text-outline-variant">: </code>
                  <code className="text-white">JSON</code>
                  <code className="text-outline-variant">.</code>
                  <code className="text-white">stringify</code>
                  <code className="text-outline-variant">(</code>
                  <code className="text-outline-variant">{"{"}</code>{"\n"}
                  {"    "}
                  <code className="text-white">email</code>
                  <code className="text-outline-variant">: </code>
                  <code className="text-[#ffdbce]">"dev@example.com"</code>
                  <code className="text-outline-variant">,</code>{"\n"}
                  {"    "}
                  <code className="text-white">strategy</code>
                  <code className="text-outline-variant">: </code>
                  <code className="text-[#ffdbce]">"passkey"</code>
                  <code className="text-outline-variant">,</code>{"\n"}
                  {"    "}
                  <code className="text-white">tenant_id</code>
                  <code className="text-outline-variant">: </code>
                  <code className="text-[#ffdbce]">"org_992"</code>{"\n"}
                  {"  "}
                  <code className="text-outline-variant">{"}"}</code>
                  <code className="text-outline-variant">)</code>{"\n"}
                  <code className="text-outline-variant">{"}"})</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tonal Shift Separator (No-Line Rule) */}
      <section className="bg-surface-container-low py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white shadow-ambient flex items-center justify-center text-primary">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-on-surface">API-First Architecture</h3>
              <p className="text-secondary leading-relaxed">Headless auth for custom flows. No redirected pages or proprietary widgets—just clean REST endpoints for your ecosystem.</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white shadow-ambient flex items-center justify-center text-primary">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-on-surface">Security-First Design</h3>
              <p className="text-secondary leading-relaxed">Zero-trust principles with automated credential rotation and SOC2-ready infrastructure protecting every request.</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white shadow-ambient flex items-center justify-center text-primary">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-on-surface">Developer Experience</h3>
              <p className="text-secondary leading-relaxed">Production-ready SDKs for major languages and a CLI designed to minimize friction from setup to deployment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Card Module */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="bg-surface-container-lowest p-12 rounded-3xl shadow-ambient relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
          <div className="max-w-2xl space-y-6">
            <h2 className="text-4xl font-extrabold text-on-surface">Built for the future.</h2>
            <p className="text-lg text-secondary leading-relaxed">
              Granular control with global revocation, device limits, and dynamic JWT claims for complex organizational needs. Precision infrastructure for developers who build the future.
            </p>
            <Link to="/features" className="flex items-center gap-2 font-bold text-primary transition-all duration-300 group">
              Explore Enterprise Features
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
