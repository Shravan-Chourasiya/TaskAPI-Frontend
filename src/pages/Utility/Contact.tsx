import React, { useState } from 'react';
import { 
  Send, 
  MessageCircle, 
  Hash, 
  Mail,
  CheckCircle2,
  Loader2
} from 'lucide-react';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate real API workflow
    // To implement "Actually send mail", you can use Formspree or EmailJS
    // Example: await fetch('https://formspree.io/f/your-id', { method: 'POST', body: JSON.stringify(formData) })
    
    setTimeout(() => {
      setStatus('success');
      // Reset form
      setFormData({ name: '', email: '', message: '' });
      
      // Auto-reset status after 5 seconds to allow another message
      setTimeout(() => setStatus('idle'), 5000);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="pb-24 px-6 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto py-20 px-6 sm:px-12 lg:px-24 bg-primary rounded-[3rem] shadow-ambient overflow-hidden relative">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-container/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-black text-on-primary leading-tight -tracking-widest">
                Let's Build the <br/>Future of Identity.
              </h1>
              <p className="text-on-primary/80 text-xl font-medium max-w-md">
                Have questions about custom implementation or high-volume usage? Our engineering team is ready to assist.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-6 p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/5">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-xl">
                  <Mail className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-on-primary">Email Support</h3>
                  <p className="text-on-primary/60 font-medium">engineering@taskapi.com</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <a className="flex items-center justify-center gap-2 border border-on-primary/30 text-on-primary p-4 rounded-2xl font-bold text-sm hover:bg-white/10 transition-colors" href="#">
                  <MessageCircle className="w-5 h-5" />
                  Discord
                </a>
                <a className="flex items-center justify-center gap-2 border border-on-primary/30 text-on-primary p-4 rounded-2xl font-bold text-sm hover:bg-white/10 transition-colors" href="#">
                  <Hash className="w-5 h-5" />
                  Slack
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            {status === 'success' ? (
              <div className="py-20 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-on-surface tracking-tighter">Transmission Received</h2>
                  <p className="text-secondary font-medium mt-2">A lead engineer will contact you shortly.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <h2 className="text-3xl font-black text-on-surface tracking-tighter">Send a Request</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-secondary uppercase tracking-widest pl-1">Full Name</label>
                    <input 
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-surface-container-low border-none rounded-2xl p-4 font-bold text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-[box-shadow] outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-secondary uppercase tracking-widest pl-1">Work Email</label>
                    <input 
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email" 
                      placeholder="john@company.com"
                      className="w-full bg-surface-container-low border-none rounded-2xl p-4 font-bold text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-[box-shadow] outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-secondary uppercase tracking-widest pl-1">Project Details</label>
                    <textarea 
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us what you're building..."
                      className="w-full bg-surface-container-low border-none rounded-2xl p-4 font-bold text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-[box-shadow] outline-none resize-none"
                    ></textarea>
                  </div>
                  <button 
                    disabled={status === 'sending'}
                    className="w-full bg-primary text-on-primary p-5 rounded-2xl font-black text-lg hover:bg-primary-container transition-[background-color,box-shadow,transform] hover:scale-[1.01] active:scale-[0.99] shadow-xl flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
