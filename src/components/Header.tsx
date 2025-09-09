import React from 'react';
import { Plane, User, Bell, Menu } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Header({ currentPage, onPageChange }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-2 rounded-lg">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Travel Hub
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {[
              { key: 'plan', label: 'Plan Trip' },
              { key: 'transport', label: 'Find Transport' },
              { key: 'manage', label: 'Manage' },
              { key: 'explore', label: 'Explore' },
              { key: 'community', label: 'Community' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => onPageChange(key)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === key
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <User className="h-5 w-5" />
            </button>
            <button className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}