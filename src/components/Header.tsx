import React from 'react';
import { Link } from 'react-router-dom';

export function Header() {
    return (
        <header className="bg-white border-b">
            <div className="container mx-auto px-4">
                <div className="h-16 flex items-center justify-between">
                    <Link to="/" className="text-xl font-semibold text-gray-900">
                        Bettermode Blog
                    </Link>
                    <nav className="flex items-center space-x-4">
                        <Link
                            to="/"
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Home
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
} 
