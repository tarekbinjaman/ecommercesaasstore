'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { DISTRICTS, inputCls, labelCls } from '@/lib/Checkout/constants';

interface BillingFormProps {
  district: number;
  onDistrictChange: (id: number) => void;
}

export default function BillingForm({ district, onDistrictChange }: BillingFormProps) {
  return (
    <section className="rounded-lg bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.05)] md:p-8">
      <h2 className="mb-5 text-lg font-extrabold uppercase text-gray-900">
        Billing &amp; Shipping
      </h2>

      <form
        id="checkoutForm"
        onSubmit={(e) => e.preventDefault()}
        className="space-y-5"
      >
        <Field label="আপনার নাম">
          <input type="text" name="name" required className={inputCls} />
        </Field>

        <Field label="মোবাইল নম্বর">
          <input type="tel" name="phone" required className={inputCls} />
        </Field>

        <Field label="সম্পূর্ণ ঠিকানা">
          <textarea
            name="address"
            rows={3}
            required
            className={`${inputCls} resize-none`}
          />
        </Field>

        <Field label="District">
          <DistrictCombobox value={district} onChange={onDistrictChange} />
        </Field>
      </form>
    </section>
  );
}

/* ---------- Searchable district combobox ---------- */
function DistrictCombobox({
  value,
  onChange,
}: {
  value: number;
  onChange: (id: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = DISTRICTS.find((d) => d.id === value);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DISTRICTS;
    return DISTRICTS.filter((d) => d.name.toLowerCase().includes(q));
  }, [query]);

  // close on outside click
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  // close on Escape
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // focus search when opened
  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 0);
    else setQuery('');
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      {/* keeps FormData working — same as the old <select name="district"> */}
      <input type="hidden" name="district" value={value} />

      {/* trigger button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`${inputCls} flex items-center justify-between text-left`}
      >
        <span className={selected ? 'text-gray-900' : 'text-gray-400'}>
          {selected ? selected.name : 'Select a district'}
        </span>
        <i
          className={`fas fa-chevron-down text-xs text-gray-400 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* dropdown */}
      {open && (
        <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          {/* search box */}
          <div className="border-b border-gray-100 p-2">
            <div className="relative">
              <i className="fas fa-search pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-800" />
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search district..."
                className="w-full rounded-md border text-black border-gray-200 py-2 pl-8 pr-3 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* list */}
          <ul role="listbox" className="max-h-64 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-gray-400">
                No district found
              </li>
            ) : (
              filtered.map((d) => {
                const isSelected = d.id === value;
                return (
                  <li key={d.id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        onChange(d.id);
                        setOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition ${
                        isSelected
                          ? 'bg-primary/10 font-semibold text-white border border-green-500 bg-green-600 rounded-sm'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {d.name}
                      {isSelected && <i className="fas fa-check text-xs" />}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ---------- Field wrapper ---------- */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelCls}>
        {label} <span className="text-red-500">*</span>
      </label>
      {children}
    </div>
  );
}