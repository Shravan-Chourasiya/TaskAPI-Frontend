import React from 'react';
import { 
  CheckCircle2, 
  Terminal, 
  Info, 
  Copy, 
  ChevronRight, 
  Code2,
} from 'lucide-react';

const Docs: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto flex">
      {/* Sidebar Navigation */}
      <aside className="hidden lg:block w-64 h-[calc(100vh-80px)] sticky top-20 overflow-y-auto py-8 pr-6">
        <nav className="space-y-8">
          <section>
            <h5 className="text-[11px] font-bold uppercase tracking-widest text-secondary mb-4 opacity-70">Getting Started</h5>
            <ul className="space-y-2">
              <li><a className="flex items-center gap-2 text-primary font-semibold text-sm py-1.5" href="#"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Introduction</a></li>
              <li><a className="text-on-surface-variant hover:text-primary transition-colors text-sm py-1.5 block" href="#">Quickstart Guide</a></li>
              <li><a className="text-on-surface-variant hover:text-primary transition-colors text-sm py-1.5 block" href="#">Architecture</a></li>
            </ul>
          </section>
          <section>
            <h5 className="text-[11px] font-bold uppercase tracking-widest text-secondary mb-4 opacity-70">Core Concepts</h5>
            <ul className="space-y-2">
              <li><a className="text-on-surface-variant hover:text-primary transition-colors text-sm py-1.5 block" href="#">Authentication</a></li>
              <li><a className="text-on-surface-variant hover:text-primary transition-colors text-sm py-1.5 block" href="#">Rate Limiting</a></li>
              <li><a className="text-on-surface-variant hover:text-primary transition-colors text-sm py-1.5 block" href="#">Pagination</a></li>
              <li><a className="text-on-surface-variant hover:text-primary transition-colors text-sm py-1.5 block" href="#">Error Codes</a></li>
            </ul>
          </section>
          <section>
            <h5 className="text-[11px] font-bold uppercase tracking-widest text-secondary mb-4 opacity-70">Endpoints</h5>
            <ul className="space-y-2">
              <li><a className="text-on-surface-variant hover:text-primary transition-colors text-sm py-1.5 block" href="#">Tasks API</a></li>
              <li><a className="text-on-surface-variant hover:text-primary transition-colors text-sm py-1.5 block" href="#">Users API</a></li>
              <li><a className="text-on-surface-variant hover:text-primary transition-colors text-sm py-1.5 block" href="#">Webhooks</a></li>
            </ul>
          </section>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 py-12 px-6 lg:px-12">
        <header className="mb-16">
          <div className="flex items-center gap-2 text-primary mb-4">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-mono text-xs font-bold tracking-tighter uppercase">TaskAPI v1.4.0</span>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tighter text-on-surface mb-6 font-headline">Introduction</h1>
          <p className="text-lg text-secondary leading-relaxed max-w-3xl">
            TaskAPI is a high-performance, developer-first orchestration engine. It allows you to programmatically manage complex workflows, assign distributed tasks, and monitor execution state with microsecond precision.
          </p>
        </header>

        {/* Feature Highlight Bento */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-[0_16px_32px_rgba(7,26,67,0.04)] border border-outline-variant/10">
            <h3 className="text-xl font-bold mb-3 font-headline">Instant Scalability</h3>
            <p className="text-secondary body-md">Deploy endpoints that handle millions of concurrent requests without manual provisioning. Our edge network routes traffic with minimal latency.</p>
          </div>
          <div className="bg-primary p-8 rounded-2xl flex flex-col justify-end shadow-xl shadow-primary/20 group relative overflow-hidden">
            <div className="absolute top-4 right-4 text-on-primary opacity-20 group-hover:opacity-40 transition-opacity">
                <Code2 className="w-24 h-24 rotate-12" />
            </div>
            <Terminal className="text-on-primary w-10 h-10 mb-4" />
            <h3 className="text-xl font-bold text-on-primary font-headline relative z-10">CLI First</h3>
          </div>
        </section>

        {/* Documentation Section: Authentication */}
        <article className="mb-24 scroll-mt-24" id="authentication">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6 font-headline">Authentication</h2>
              <p className="text-secondary body-lg mb-6 leading-relaxed">
                TaskAPI uses Bearer Token authentication. All API requests must be made over HTTPS. Calls made over plain HTTP will fail. API requests without authentication will also fail.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-surface-container-low rounded-xl border border-outline-variant/10">
                  <Info className="w-5 h-5 text-primary mt-0.5" />
                  <p className="text-sm text-on-surface-variant leading-snug">Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas.</p>
                </div>
              </div>
            </div>
            <div>
              <div className="rounded-xl overflow-hidden bg-inverse-surface shadow-2xl">
                <div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/5">
                  <span className="text-[10px] font-mono text-outline-variant font-bold uppercase tracking-widest">Request Header</span>
                  <Copy className="w-3.5 h-3.5 text-outline-variant cursor-pointer hover:text-white transition-colors" />
                </div>
                <div className="p-6">
                  <pre className="text-sm text-primary-fixed leading-relaxed font-mono">
                    <code className="block text-white">
                      <span className="text-outline"># Example request with Curl</span>{"\n"}
                      curl -X GET https://api.taskapi.com/v1/tasks \{ "\n"}
                      {"  "}-H "Authorization: Bearer <span className="text-tertiary-fixed">YOUR_API_KEY</span>" \{ "\n"}
                      {"  "}-H "Content-Type: application/json"
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Documentation Section: Get Tasks */}
        <article className="mb-24 border-t border-outline-variant/10 py-16 scroll-mt-24" id="get-tasks">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-primary/10 text-primary px-2 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-tight">GET</span>
                <span className="font-mono text-sm text-secondary">/v1/tasks</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-6 font-headline">List all tasks</h2>
              <p className="text-secondary body-lg mb-8 leading-relaxed">
                Returns a list of tasks. The tasks are returned sorted by creation date, with the most recent tasks appearing first.
              </p>
              <h4 className="text-xs font-bold uppercase tracking-widest text-outline mb-4">Query Parameters</h4>
              <div className="space-y-6">
                {[
                  { name: 'limit', type: 'integer', desc: 'A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.' },
                  { name: 'status', type: 'string', desc: 'Filter tasks by their current execution status (pending, active, completed, failed).' }
                ].map((param) => (
                  <div key={param.name} className="flex flex-col gap-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-sm font-bold text-on-surface">{param.name}</span>
                      <span className="text-[11px] text-outline font-medium">{param.type}</span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-surface-container text-secondary rounded font-bold uppercase">Optional</span>
                    </div>
                    <p className="text-sm text-secondary">{param.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-xl overflow-hidden bg-inverse-surface shadow-2xl">
                <div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/5">
                  <span className="text-[10px] font-mono text-outline-variant font-bold uppercase tracking-widest">Definition</span>
                </div>
                <div className="p-6">
                  <pre className="text-sm text-primary-fixed leading-relaxed font-mono text-white"><code>GET https://api.taskapi.com/v1/tasks</code></pre>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden bg-inverse-surface shadow-2xl">
                <div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/5">
                  <span className="text-[10px] font-mono text-outline-variant font-bold uppercase tracking-widest">Response Body</span>
                </div>
                <div className="p-6">
                  <pre className="text-sm text-primary-fixed leading-relaxed font-mono text-white">
                    <code className="block">
                      {"{"}{"\n"}
                      {"  "}<span className="text-tertiary-fixed">"object"</span>: "list",{"\n"}
                      {"  "}<span className="text-tertiary-fixed">"data"</span>: [{"\n"}
                      {"    "}{"{"}{"\n"}
                      {"      "}<span className="text-tertiary-fixed">"id"</span>: "task_01H2J3K4L5",{"\n"}
                      {"      "}<span className="text-tertiary-fixed">"status"</span>: "completed",{"\n"}
                      {"      "}<span className="text-tertiary-fixed">"priority"</span>: 1,{"\n"}
                      {"      "}<span className="text-tertiary-fixed">"created_at"</span>: 1686823400{"\n"}
                      {"    "}{"}"}{"\n"}
                      {"  "}],{"\n"}
                      {"  "}<span className="text-tertiary-fixed">"has_more"</span>: false{"\n"}
                      {"}"}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Visual Content Card */}
        <section className="mt-12 rounded-3xl overflow-hidden relative group">
          <img className="w-full h-100 object-cover transition-transform duration-700 group-hover:scale-105" alt="Terminal code" src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070" />
          <div className="absolute inset-0 bg-linear-to-t from-on-background/90 via-on-background/40 to-transparent p-12 flex flex-col justify-end">
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tighter font-headline text-tight">Ready to Build?</h2>
            <p className="text-slate-300 max-w-xl body-lg mb-8 leading-relaxed">Join over 10,000 teams using TaskAPI to automate their infrastructure with unparalleled reliability.</p>
            <div className="flex gap-4">
              <button className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-xl shadow-primary/20 flex items-center gap-2">
                  Create API Key
                  <ChevronRight className="w-4 h-4" />
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white px-8 py-3 rounded-xl font-bold border border-white/20 hover:bg-white/20 transition-all">Join Discord</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Docs;
