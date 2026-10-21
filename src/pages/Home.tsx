import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/ui/Reveal"
import { KeyRound, Shield, Zap, Code2 } from "lucide-react"

const Home = () => {
  return (
    <div className="min-h-screen bg-surface">
      {/* Hero */}
      <header className="border-b border-outline-variant">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-h4 font-bold text-primary">Authrix</span>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm text-on-surface hover:text-primary">Sign in</Link>
            <Link to="/signup"><Button>Create account</Button></Link>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6">
        <section className="py-20 text-center">
          <Reveal>
            <span className="inline-block rounded-full bg-surface-container px-3 py-1 text-xs font-medium text-primary">
              The API layer for modern authentication
            </span>
            <h1 className="mt-6 text-h1 font-bold text-on-surface">
              Authentication that developers actually want
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-body-lg text-secondary">
              Issue API keys, verify identities, and enforce access — all from a clean API built for speed and reliability.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link to="/signup"><Button size="lg">Start building</Button></Link>
              <Link to="/login"><Button size="lg" variant="outline">View dashboard</Button></Link>
            </div>
          </Reveal>
        </section>

        <section className="grid gap-6 pb-20 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: KeyRound, title: "API keys", desc: "Issue and rotate keys in seconds." },
            { icon: Shield, title: "Secure by default", desc: "Scoped access and revocation built in." },
            { icon: Zap, title: "Fast", desc: "Edge-verified tokens with low latency." },
            { icon: Code2, title: "Developer-first", desc: "Clean SDKs and predictable responses." },
          ].map((f) => {
            const Icon = f.icon
            return (
              <Reveal key={f.title} className="delay-100">
                <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-6">
                  <Icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-3 text-h5 font-semibold text-on-surface">{f.title}</h3>
                  <p className="mt-1 text-sm text-secondary">{f.desc}</p>
                </div>
              </Reveal>
            )
          })}
        </section>
      </main>
    </div>
  )
}

export default Home