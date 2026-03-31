import React from 'react';
import type { Quote } from '../types';

interface QuoteCardProps {
  quote: Quote;
  tradespersonName: string;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, tradespersonName }) => {
  const formatCurrency = (cents: number) => {
    return 'R' + (cents / 100).toLocaleString('en-ZA', { minimumFractionDigits: 2 });
  };

  return (
    <div className="bg-white border border-gray-100 rounded-card p-4 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-text-primary font-bold text-sm">{tradespersonName}</h4>
        <div className="text-primary font-bold text-lg leading-tight">{formatCurrency(quote.priceZAR)}</div>
      </div>
      <div className="text-text-secondary text-xs mb-3">
        Estimated: {quote.estimatedDays} days
      </div>
      <p className="text-text-secondary text-xs line-clamp-2 italic">
        "{quote.message}"
      </p>
    </div>
  );
};

export default QuoteCard;
