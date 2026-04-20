import { Link } from "react-router-dom"
const Footer = () => {
  return (
      <footer className="bg-white border-t border-gray-200 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="text-xl font-semibold text-gray-900 mb-3">
              TaskAPI
            </div>
            <p className="text-sm text-gray-600 max-w-md mb-4">
              Serverless Auth for the Digital Elites. The backbone for modern API identity.
            </p>
            <p className="text-xs text-gray-500">
              © 2024 TaskAPI. Precision for the Digital Elites.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              PLATFORM
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/docs" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/api" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  API Tutorial
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              LEGAL
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
