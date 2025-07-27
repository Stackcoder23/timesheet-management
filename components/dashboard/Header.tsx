'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Header() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const session = document.cookie
      .split('; ')
      .find((c) => c.startsWith('session='));
    if (session) {
      try {
        const value = decodeURIComponent(session.split('=')[1]);
        const parsed = JSON.parse(value);
        setUserName(parsed.name || parsed.email || '');
      } catch {
        setUserName('');
      }
    }
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="bg-white border-b w-full">
      <div className="flex items-center justify-between w-full px-4 py-3">
        <div className="text-black font-bold text-3xl">
          ticktock
        </div>

        <div className="flex-1 text-left ml-4">
          <span className="text-md ml-5 font-semibold text-gray-700">Timesheets</span>
        </div>

        <div className="relative text-right">
          <button
            className="text-gray-600 font-semibold text-md"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {userName} ▼
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow text-sm">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-black"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
