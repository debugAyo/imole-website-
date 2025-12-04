import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Sparkles, CheckCircle } from 'lucide-react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Helper function to save email to localStorage
const saveEmailToWaitlist = (email: string) => {
  const existingEmails = JSON.parse(localStorage.getItem('waitlist_emails') || '[]');
  
  // Check if email already exists
  if (existingEmails.some((entry: any) => entry.email === email)) {
    return { success: true, message: 'Already subscribed' };
  }
  
  // Add new email with timestamp
  existingEmails.push({
    email,
    date: new Date().toISOString(),
  });
  
  localStorage.setItem('waitlist_emails', JSON.stringify(existingEmails));
  return { success: true, message: 'Email saved' };
};

// Helper function to export emails to CSV (call from browser console: exportWaitlistToCSV())
(window as any).exportWaitlistToCSV = () => {
  const emails = JSON.parse(localStorage.getItem('waitlist_emails') || '[]');
  
  if (emails.length === 0) {
    console.log('No emails in waitlist yet.');
    return;
  }
  
  // Create CSV content
  const csvContent = 'Email,Date Signed Up\n' + 
    emails.map((entry: any) => `${entry.email},${entry.date}`).join('\n');
  
  // Download as CSV file
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `waitlist_emails_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
  
  console.log(`✅ Exported ${emails.length} emails to CSV!`);
};

// Helper to view emails in console
(window as any).viewWaitlistEmails = () => {
  const emails = JSON.parse(localStorage.getItem('waitlist_emails') || '[]');
  console.table(emails);
  return emails;
};

const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    
    // Small delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Save email to localStorage
    saveEmailToWaitlist(email);
    
    setIsLoading(false);
    setIsSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="p-8">
              {!isSubmitted ? (
                <>
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="text-slate-600" size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Be the First to Know
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Our browser extension is coming soon. Join the waitlist to get early access and be among the first to verify news in real-time.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading || !email.trim()}
                      className="w-full py-4 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Join Waitlist
                          <Sparkles size={16} />
                        </>
                      )}
                    </button>
                  </form>

                  <p className="text-center text-xs text-gray-400 mt-4">
                    No spam, ever. We'll only email you when we launch.
                  </p>
                </>
              ) : (
                /* Success State */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-green-600" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    You're on the list!
                  </h3>
                  <p className="text-gray-500">
                    We'll notify you as soon as the extension is ready.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WaitlistModal;
