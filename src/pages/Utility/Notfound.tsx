
const Notfound = () => {
    return (
        <div className="pt-48 pb-32 text-center px-8">
            <h1 className="text-9xl font-black font-headline text-slate-200 mb-8">404</h1>
            <h2 className="text-4xl font-black font-headline mb-8 text-on-surface">System Malfunction.</h2>
            <p className="text-secondary mb-12 text-lg">The coordinate you're looking for does not exist in our cluster.</p>
            <a href="/" className="px-10 py-4 bg-primary text-on-primary font-bold rounded-2xl shadow-xl shadow-primary/20 inline-block hover:scale-105 active:scale-95 transition-transform">Return to Origin</a>
        </div>
    )
}

export default Notfound
