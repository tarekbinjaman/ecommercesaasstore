/* ============================================================
   DIVISIONS
============================================================ */
export type DivisionId =
  | 'dhaka'
  | 'chattogram'
  | 'sylhet'
  | 'rajshahi'
  | 'khulna'
  | 'barishal'
  | 'rangpur'
  | 'mymensingh';

export const DIVISIONS: { id: DivisionId; name: string }[] = [
  { id: 'dhaka', name: 'ঢাকা' },
  { id: 'chattogram', name: 'চট্টগ্রাম' },
  { id: 'sylhet', name: 'সিলেট' },
  { id: 'rajshahi', name: 'রাজশাহী' },
  { id: 'khulna', name: 'খুলনা' },
  { id: 'barishal', name: 'বরিশাল' },
  { id: 'rangpur', name: 'রংপুর' },
  { id: 'mymensingh', name: 'ময়মনসিংহ' },
];

/* ============================================================
   DISTRICTS (64) — tagged with their division
   value sent to backend = `id` (number)
============================================================ */
export interface District {
  id: number;
  name: string;
  division: DivisionId;
}

export const DISTRICTS: District[] = [
  // ---- Dhaka Division (13) ----
  { id: 1, name: 'ঢাকা', division: 'dhaka' },
  { id: 2, name: 'গাজীপুর', division: 'dhaka' },
  { id: 3, name: 'নারায়ণগঞ্জ', division: 'dhaka' },
  { id: 4, name: 'নরসিংদী', division: 'dhaka' },
  { id: 5, name: 'মানিকগঞ্জ', division: 'dhaka' },
  { id: 6, name: 'মুন্সিগঞ্জ', division: 'dhaka' },
  { id: 7, name: 'টাঙ্গাইল', division: 'dhaka' },
  { id: 8, name: 'কিশোরগঞ্জ', division: 'dhaka' },
  { id: 9, name: 'ফরিদপুর', division: 'dhaka' },
  { id: 10, name: 'গোপালগঞ্জ', division: 'dhaka' },
  { id: 11, name: 'মাদারীপুর', division: 'dhaka' },
  { id: 12, name: 'শরীয়তপুর', division: 'dhaka' },
  { id: 13, name: 'রাজবাড়ী', division: 'dhaka' },

  // ---- Chattogram Division (11) ----
  { id: 14, name: 'চট্টগ্রাম', division: 'chattogram' },
  { id: 15, name: 'কক্সবাজার', division: 'chattogram' },
  { id: 16, name: 'বান্দরবান', division: 'chattogram' },
  { id: 17, name: 'রাঙ্গামাটি', division: 'chattogram' },
  { id: 18, name: 'খাগড়াছড়ি', division: 'chattogram' },
  { id: 19, name: 'নোয়াখালী', division: 'chattogram' },
  { id: 20, name: 'ফেনী', division: 'chattogram' },
  { id: 21, name: 'লক্ষ্মীপুর', division: 'chattogram' },
  { id: 22, name: 'কুমিল্লা', division: 'chattogram' },
  { id: 23, name: 'ব্রাহ্মণবাড়িয়া', division: 'chattogram' },
  { id: 24, name: 'চাঁদপুর', division: 'chattogram' },

  // ---- Sylhet Division (4) ----
  { id: 25, name: 'সিলেট', division: 'sylhet' },
  { id: 26, name: 'মৌলভীবাজার', division: 'sylhet' },
  { id: 27, name: 'হবিগঞ্জ', division: 'sylhet' },
  { id: 28, name: 'সুনামগঞ্জ', division: 'sylhet' },

  // ---- Rajshahi Division (8) ----
  { id: 29, name: 'রাজশাহী', division: 'rajshahi' },
  { id: 30, name: 'চাঁপাইনবাবগঞ্জ', division: 'rajshahi' },
  { id: 31, name: 'নওগাঁ', division: 'rajshahi' },
  { id: 32, name: 'নাটোর', division: 'rajshahi' },
  { id: 33, name: 'পাবনা', division: 'rajshahi' },
  { id: 34, name: 'সিরাজগঞ্জ', division: 'rajshahi' },
  { id: 35, name: 'বগুড়া', division: 'rajshahi' },
  { id: 36, name: 'জয়পুরহাট', division: 'rajshahi' },

  // ---- Khulna Division (10) ----
  { id: 37, name: 'খুলনা', division: 'khulna' },
  { id: 38, name: 'বাগেরহাট', division: 'khulna' },
  { id: 39, name: 'সাতক্ষীরা', division: 'khulna' },
  { id: 40, name: 'যশোর', division: 'khulna' },
  { id: 41, name: 'ঝিনাইদহ', division: 'khulna' },
  { id: 42, name: 'মাগুরা', division: 'khulna' },
  { id: 43, name: 'নড়াইল', division: 'khulna' },
  { id: 44, name: 'কুষ্টিয়া', division: 'khulna' },
  { id: 45, name: 'চুয়াডাঙ্গা', division: 'khulna' },
  { id: 46, name: 'মেহেরপুর', division: 'khulna' },

  // ---- Barishal Division (6) ----
  { id: 47, name: 'বরিশাল', division: 'barishal' },
  { id: 48, name: 'বরগুনা', division: 'barishal' },
  { id: 49, name: 'ভোলা', division: 'barishal' },
  { id: 50, name: 'ঝালকাঠি', division: 'barishal' },
  { id: 51, name: 'পটুয়াখালী', division: 'barishal' },
  { id: 52, name: 'পিরোজপুর', division: 'barishal' },

  // ---- Rangpur Division (8) ----
  { id: 53, name: 'রংপুর', division: 'rangpur' },
  { id: 54, name: 'দিনাজপুর', division: 'rangpur' },
  { id: 55, name: 'গাইবান্ধা', division: 'rangpur' },
  { id: 56, name: 'কুড়িগ্রাম', division: 'rangpur' },
  { id: 57, name: 'লালমনিরহাট', division: 'rangpur' },
  { id: 58, name: 'নীলফামারী', division: 'rangpur' },
  { id: 59, name: 'পঞ্চগড়', division: 'rangpur' },
  { id: 60, name: 'ঠাকুরগাঁও', division: 'rangpur' },

  // ---- Mymensingh Division (4) ----
  { id: 61, name: 'ময়মনসিংহ', division: 'mymensingh' },
  { id: 62, name: 'জামালপুর', division: 'mymensingh' },
  { id: 63, name: 'নেত্রকোণা', division: 'mymensingh' },
  { id: 64, name: 'শেরপুর', division: 'mymensingh' },
];

/* ============================================================
   SHIPPING COST — derived from DIVISION, not district
   Dhaka Division → 60৳ | Every other division → 120৳
============================================================ */
export const SHIPPING_INSIDE_DHAKA = 60;
export const SHIPPING_OUTSIDE_DHAKA = 120;

export const getShippingCost = (districtId: number): number => {
  const district = DISTRICTS.find((d) => d.id === districtId);
  if (!district) return SHIPPING_OUTSIDE_DHAKA;
  return district.division === 'dhaka'
    ? SHIPPING_INSIDE_DHAKA
    : SHIPPING_OUTSIDE_DHAKA;
};


/* ============================================================
   PAYMENT
============================================================ */
export type PaymentId = 'cod' | 'bkash' | 'rocket' | 'nagad';

export const PAYMENTS: {
  id: PaymentId;
  label: string;
  logo?: string;
}[] = [
  { id: 'cod', label: 'ক্যাশ অন ডেলিভারি' },
  {
    id: 'bkash',
    label: 'bKash',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Bkash_Logo.svg/1200px-Bkash_Logo.svg.png',
  },
  {
    id: 'rocket',
    label: 'Rocket',
    logo: 'https://seeklogo.com/images/D/dutch-bangla-rocket-logo-B4D104E752-seeklogo.com.png',
  },
  {
    id: 'nagad',
    label: 'Nagad',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Nagad-Logo.svg/1200px-Nagad-Logo.svg.png',
  },
];

/* ============================================================
   SHIPPING
============================================================ */
export const SHIPPING_OPTIONS = [
  { value: 60, text: 'ঢাকার ভিতরে' },
  { value: 120, text: 'ঢাকার বাইরে' },
];

/* ============================================================
   PRODUCT
============================================================ */
export const PRODUCT = {
  name: 'Bangladeshi Sweet Yogu 1kg',
  price: 230,
  image: 'https://picsum.photos/seed/sweet-yogu/100/100',
};

/* ============================================================
   MOBILE BANKING
============================================================ */
export const MOBILE_BANK_NUMBER = '017XXXXXXXX';

/* ============================================================
   SHARED TAILWIND CLASSES
============================================================ */
export const CONTAINER = 'mx-auto w-full max-w-[1240px] px-4';

export const inputCls =
  'w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600';

export const labelCls = 'mb-2 block text-sm font-medium text-gray-700';