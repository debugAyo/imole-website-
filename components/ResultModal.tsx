import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle, Loader2, X } from 'lucide-react';
import { VerificationResult } from '../types';

interface ResultModalProps {
  isOpen: boolean;
  isLoading: boolean;
  result: VerificationResult | null;
  onClose: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ isOpen, isLoading, result, onClose }) => {
  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'True': return 'text-green-600 bg-green-50 border-green-200';
      case 'Fake': return 'text-red-600 bg-red-50 border-red-200';
      case 'Satire': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'True': return <CheckCircle className="w-12 h-12 text-green-600" />;
      case 'Fake': return <XCircle className="w-12 h-12 text-red-600" />;
      case 'Satire': return <AlertTriangle className="w-12 h-12 text-orange-600" />;
      default: return <AlertTriangle className="w-12 h-12 text-gray-400" />;
    }
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
            onClick={isLoading ? undefined : onClose}
            className="absolute inset-0 bg-white/60 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            {/* Close Button */}
            {!isLoading && (
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
              >
                <X size={20} />
              </button>
            )}

            <div className="p-8 flex flex-col items-center text-center min-h-[320px] justify-center">
              {isLoading ? (
                <div className="flex flex-col items-center space-y-6">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-slate-200 border-t-slate-700 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-2 h-2 bg-slate-700 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-gray-900">Analyzing Content</h3>
                    <p className="text-sm text-gray-500">Cross-referencing global sources...</p>
                  </div>
                </div>
              ) : result ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="w-full"
                >
                  <div className="flex justify-center mb-6">
                    {getVerdictIcon(result.verdict)}
                  </div>
                  
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{result.score}% Credible</h2>
                  
                  <div className={`inline-flex items-center px-4 py-1.5 rounded-full border text-sm font-semibold mb-6 ${getVerdictColor(result.verdict)}`}>
                    {result.verdict.toUpperCase()}
                  </div>

                  {/* Meter Visual */}
                  <div className="w-full bg-gray-100 h-3 rounded-full mb-6 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${result.score}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full ${
                        result.score > 70 ? 'bg-green-500' : result.score > 40 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                    />
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {result.summary}
                  </p>
                </motion.div>
              ) : null}
            </div>
            
            {!isLoading && result && (
               <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                  <button onClick={onClose} className="text-sm font-medium text-slate-600 hover:text-slate-800">
                    Analyze another article
                  </button>
               </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ResultModal;