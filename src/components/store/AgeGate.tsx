'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

type Props = {
  storeName: string;
  storeColor: string;
  minAge: number;
  onVerified: () => void;
  onDenied: () => void;
};

export function AgeGate({ storeName, storeColor, minAge, onVerified, onDenied }: Props) {
  const [checking, setChecking] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden">
        {/* Color header */}
        <div className="py-8 px-8 text-center text-white" style={{ background: storeColor }}>
          <div className="text-5xl mb-3">🔞</div>
          <h2 className="text-2xl font-black">{storeName}</h2>
          <p className="text-white/80 text-sm mt-1">Age Verification Required</p>
        </div>

        <div className="p-8 text-center">
          <div className="inline-block bg-red-100 text-red-700 text-sm font-black px-4 py-1.5 rounded-full mb-4 border border-red-200">
            {minAge}+ ONLY
          </div>
          <p className="text-gray-600 mb-2 leading-relaxed">
            This section contains content strictly intended for adults aged <strong>{minAge} and over</strong>.
          </p>
          <p className="text-gray-500 text-sm mb-6">
            By entering you confirm that you are of legal age and consent to viewing this content.
          </p>
          <p className="font-black text-gray-900 text-lg mb-6">Are you {minAge} years or older?</p>

          <div className="flex gap-3">
            <Button
              variant="primary"
              size="lg"
              className="flex-1 text-white"
              style={{ background: storeColor }}
              loading={checking}
              onClick={() => { setChecking(true); onVerified(); }}
            >
              Yes, I am {minAge}+
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={onDenied}
            >
              No, go back
            </Button>
          </div>

          <p className="text-xs text-gray-400 mt-4 leading-relaxed">
            This is a legal requirement. Misrepresentation of age is a criminal offence.
          </p>
        </div>
      </div>
    </div>
  );
}
