import React, { useState } from 'react';
import { mockDatabase } from '../data/mockDatabase';

export default function TeacherLogin({ onLogin, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("⚠️ Please fill in both fields!");
      return;
    }

    setIsLoading(true);
    
    // Simulate loading for professional feel
    setTimeout(() => {
      const teacher = mockDatabase.teachers.find(t => t.email === email && t.password === password);
      if (teacher) {
        onLogin(teacher);
      } else {
        alert("❌ Invalid credentials! Try: mathur@college.edu / teacher123");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-black flex items-center justify-center p-8 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gold-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md fade-in">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-8 flex items-center text-gray-400 hover:text-gold-500 transition-colors group"
        >
          <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Role Selection
        </button>

        {/* Login Form */}
        <div className="professional-container p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">👩‍🏫</div>
            <h1 className="text-3xl font-bold gold-gradient mb-2">Faculty Login</h1>
            <p className="text-gray-400">Access your teaching portal</p>
          </div>
          
          {/* Form */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter your faculty email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="professional-input"
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="professional-input"
                disabled={isLoading}
              />
            </div>
            
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className={`w-full btn-professional btn-gold ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                  Signing In...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2h-6m6 0v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2h2M7 7a2 2 0 012-2h6a2 2 0 012 2v2a2 2 0 01-2 2H9a2 2 0 01-2-2V7z" />
                  </svg>
                  Sign In
                </>
              )}
            </button>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-black bg-opacity-60 rounded-lg border border-gold-500 border-opacity-20">
            <div className="flex items-center mb-2">
              <svg className="w-4 h-4 text-gold-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gold-400 font-medium text-sm">Demo Credentials</span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">📧 Email:</span>
                <span className="text-white font-mono">mathur@college.edu</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">🔒 Password:</span>
                <span className="text-white font-mono">teacher123</span>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-gray-700">
              <p className="text-xs text-gray-500">
                <strong className="text-gray-400">Other faculty:</strong> singh@college.edu, verma@college.edu
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}