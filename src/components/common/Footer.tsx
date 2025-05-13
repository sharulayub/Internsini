import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">InternMalaysia</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Find the perfect internship opportunity in Malaysia with ease.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-400">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-400">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">For Students</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Browse Internships</Link></li>
              <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Resume Tips</Link></li>
              <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Interview Preparation</Link></li>
              <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Career Advice</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">For Employers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Post an Internship</Link></li>
              <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Browse Candidates</Link></li>
              <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Pricing Plans</Link></li>
              <li><Link to="/admin" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Admin Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Contact Us</h3>
            <address className="not-italic text-gray-600 dark:text-gray-400 text-sm mb-4">
              123 Innovation Street<br />
              Kuala Lumpur, 50250<br />
              Malaysia
            </address>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 text-sm">
              <Mail size={16} />
              <a href="mailto:info@internmalaysia.com" className="hover:text-blue-600 dark:hover:text-blue-400">info@internmalaysia.com</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} InternMalaysia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};