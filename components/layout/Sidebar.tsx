'use client';
import React, { useState } from 'react';
import { industries } from '@/data/industries';
import { ChevronDown, ChevronRight, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Sidebar({ onSelectSubCategory }: { onSelectSubCategory: (sub: any) => void }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <aside className="w-72 h-screen bg-[#060B13] border-r border-teal-900/30 overflow-y-auto custom-scrollbar shrink-0">
      <div className="p-6 border-b border-teal-900/20 sticky top-0 bg-[#060B13] z-10">
        <h2 className="text-teal-400 font-ibm-sans font-bold flex items-center gap-2 uppercase tracking-widest text-sm">
          <Activity size={18} />
          Industry Matrix
        </h2>
      </div>

      <nav className="p-4 space-y-1">
        {industries.map((industry) => (
          <div key={industry.id} className="group">
            <button
              onClick={() => setExpandedId(expandedId === industry.id ? null : industry.id)}
              className="w-full flex items-center justify-between p-3 rounded-md transition-colors hover:bg-teal-950/20 text-slate-300 hover:text-teal-400"
            >
              <span className="font-ibm-sans text-sm font-medium">{industry.name}</span>
              {expandedId === industry.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>

            {expandedId === industry.id && (
              <div className="ml-4 mt-1 border-l border-teal-900/30 space-y-1 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                {industry.subCategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => onSelectSubCategory(sub)}
                    className="w-full text-left p-2 pl-4 text-xs font-ibm-sans text-slate-500 hover:text-cyan-400 hover:bg-cyan-950/10 transition-all border-l-2 border-transparent hover:border-cyan-500"
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}