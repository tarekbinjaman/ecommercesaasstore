'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { FaCheck, FaChevronDown, FaSearch } from 'react-icons/fa';
import { DISTRICTS } from '@/lib/Checkout/constants';
import { cardCls, inputCls, labelCls } from './classes';

interface BillingFormProps {
  district: number;
  onDistrictChange: (id: number) => void;
}

/** Customer fields. Lives inside the checkout <form>, so the browser validates required fields. */
export default function BillingForm({ district, onDistrictChange }: BillingFormProps) {
  return (
    <section className={cardCls}>
      <h2 className="mb-5 border-b border-gray-100 pb-4 text-lg font-bold text-gray-900">
        Billing &amp; Shipping
      </h2>

      <div className="space-y-5">
        <Field label="আপনার নাম" htmlFor="checkout-name">
          <input
            id="checkout-name"
            type="text"
            name="name"
            autoComplete="name"
            required
            className={inputCls}
          />
        </Field>

        <Field label="মোবাইল নম্বর" htmlFor="checkout-phone">
          <input
            id="checkout-phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            inputMode="numeric"
            pattern="01[3-9][0-9]{8}"
            title="১১ সংখ্যার মোবাইল নম্বর দিন, যেমন 017XXXXXXXX"
            placeholder="017XXXXXXXX"
            required
            className={inputCls}
          />
        </Field>

        <Field label="সম্পূর্ণ ঠিকানা" htmlFor="checkout-address">
          <textarea
            id="checkout-address"
            name="address"
            rows={3}
            autoComplete="street-address"
            required
            className={`${inputCls} resize-none`}
          />
        </Field>

        <Field label="District">
          <DistrictCombobox value={district} onChange={onDistrictChange} />
        </Field>

        <Field label="Order note" htmlFor="checkout-note" optional>
          <textarea
            id="checkout-note"
            name="note"
            rows={2}
            placeholder="Size, colour or delivery instructions"
            className={`${inputCls} resize-none`}
          />
        </Field>
      </div>
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

  const close = () => {
    setOpen(false);
    setQuery('');
  };

  // close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) close();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    searchRef.current?.focus();
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      {/* keeps FormData working */}
      <input type="hidden" name="district" value={value} />

      <button
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`${inputCls} flex items-center justify-between text-left`}
      >
        <span className={selected ? 'text-gray-900' : 'text-gray-400'}>
          {selected ? selected.name : 'Select a district'}
        </span>
        <FaChevronDown
          className={`h-3 w-3 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          <div className="border-b border-gray-100 p-2">
            <div className="relative">
              <FaSearch className="pointer-events-none absolute left-3 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400" />
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search district..."
                aria-label="Search district"
                className="w-full rounded-md border border-gray-200 py-2 pl-8 pr-3 text-sm text-black outline-none focus:border-black"
              />
            </div>
          </div>

          <ul role="listbox" className="max-h-64 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-gray-400">No district found</li>
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
                        close();
                      }}
                      className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition ${
                        isSelected
                          ? 'bg-black font-semibold text-white'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {d.name}
                      {isSelected && <FaCheck className="h-3 w-3" />}
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
function Field({
  label,
  htmlFor,
  optional = false,
  children,
}: {
  label: string;
  htmlFor?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelCls}>
        {label}{' '}
        {optional ? (
          <span className="font-normal text-gray-400">(optional)</span>
        ) : (
          <span className="text-red-500">*</span>
        )}
      </label>
      {children}
    </div>
  );
}
