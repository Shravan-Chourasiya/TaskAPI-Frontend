import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-8">
      <div className="text-center">
        <h1 className="text-h1 font-bold text-primary">404</h1>
        <p className="mt-2 text-h4 text-on-surface">Page not found</p>
        <p className="mt-2 text-secondary">The page you're looking for doesn't exist.</p>
        <Link to="/" className="mt-6 inline-block">
          <Button>Go home</Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound