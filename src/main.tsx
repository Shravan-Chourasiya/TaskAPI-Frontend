import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <>
      <App />
      <Toaster 
        position="top-right" 
        closeButton 
        duration={4000}
        toastOptions={{
          style: {
            background: 'white',
          },
          classNames: {
            success: '!bg-[#00685f] !text-white !border-[#00685f]',
            error: '!bg-[#D32F2F] !text-white !border-[#D32F2F]',
            warning: '!bg-[#555f70] !text-white !border-[#555f70]',
            info: '!bg-blue-600 !text-white !border-blue-600',
          },
        }}
      />
    </>
  // </StrictMode>
)
