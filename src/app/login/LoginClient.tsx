'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/CardComponents';
import { useAuth } from '@/app/providers';
import { AlertCircle, Mail, Lock, ArrowRight, Wallet } from 'lucide-react';

const LoginClient = () => {
  const router = useRouter();
  const { login, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'wallet'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(true);

  useEffect(() => {
    // Show welcome animation only initially
    const timer = setTimeout(() => {
      setShowWelcomeAnimation(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loginMethod === 'email') {
      if (!email || !password) {
        setError('Please enter both email and password');
        return;
      }
      setIsLoading(true);
      setError('');
      try {
        await login(email, password);
        router.push('/dashboard');
      } catch (err: any) {
        setError(err?.message || 'Invalid email or password');
      } finally {
        setIsLoading(false);
      }
    } else {
      // Optionally handle wallet login here
      setError('Wallet login is not implemented.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-blue-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-full filter blur-3xl animate-pulse-slow animation-delay-1000"></div>
        <div className="absolute bottom-20 right-40 w-96 h-96 bg-gradient-to-tr from-indigo-500/10 to-pink-500/10 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
      </div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 w-full h-full bg-grid-pattern opacity-5"></div>
      
      <div className="relative w-full max-w-md z-10">
        <div className={`text-center mb-8 transition-all duration-700 ${showWelcomeAnimation ? 'transform translate-y-0 opacity-100' : 'transform -translate-y-4 opacity-100'}`}>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/30 animate-float">
              <span className="text-2xl font-bold text-white">NL</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent drop-shadow-sm">
            NounLogic LMS
          </h1>
          <p className="text-blue-100/80 mt-2 text-lg">
            Global Learning Management System
          </p>
        </div>
        
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl shadow-black/10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 z-0 opacity-50"></div>
          <CardHeader className="space-y-1 relative z-10">
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">Sign In</CardTitle>
            <CardDescription className="text-center text-blue-100/80">
              Choose your preferred login method
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="flex gap-2 mb-6 rounded-lg p-1 bg-white/5 backdrop-blur-sm border border-white/10">
              <button
                type="button"
                onClick={() => setLoginMethod('email')}
                className={`flex-1 py-2.5 rounded-md font-medium flex items-center justify-center gap-2 transition-all duration-200 ${
                  loginMethod === 'email'
                    ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-md'
                    : 'bg-transparent hover:bg-white/10 text-white'
                }`}
              >
                <Mail size={18} />
                Email
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('wallet')}
                className={`flex-1 py-2.5 rounded-md font-medium flex items-center justify-center gap-2 transition-all duration-200 ${
                  loginMethod === 'wallet'
                    ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-md'
                    : 'bg-transparent hover:bg-white/10 text-white'
                }`}
              >
                <Wallet size={18} />
                Web3 Wallet
              </button>
            </div>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-md p-3 mb-4 text-sm flex items-start gap-2 animate-fadeIn">
                <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {loginMethod === 'email' ? (
                <>
                  <div className="space-y-4">
                    <Input
                      label="Email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      leftIcon={<Mail className="text-muted-foreground" size={18} />}
                    />
                    <Input
                      label="Password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      leftIcon={<Lock className="text-muted-foreground" size={18} />}
                    />
                    <div className="flex justify-end">
                      <Link 
                        href="/forgot-password" 
                        className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full mt-6 group"
                    disabled={isLoading}
                    rightIcon={<ArrowRight size={18} className="ml-1 transition-transform group-hover:translate-x-1" />}
                  >
                    {isLoading ? 'Signing in...' : 'Sign in with Email'}
                  </Button>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-secondary/40 to-secondary/80 p-6 rounded-xl text-center transform transition-all hover:scale-[1.02] border border-secondary/20">
                    <div className="text-3xl mb-3">🦊</div>
                    <p className="text-muted-foreground text-sm">
                      Connect your wallet to sign in securely using your blockchain identity
                    </p>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full group"
                    disabled={isLoading}
                    rightIcon={<ArrowRight size={18} className="ml-1 transition-transform group-hover:translate-x-1" />}
                  >
                    {isLoading ? 'Connecting...' : 'Connect Wallet'}
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col">
            <div className="relative w-full my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-2 text-muted-foreground">
                  Don't have an account?
                </span>
              </div>
            </div>
            
            <Button
              type="button"
              variant="outline"
              className="w-full hover:bg-secondary/20 transition-colors"
              onClick={() => router.push('/register')}
            >
              Create Account
            </Button>
          </CardFooter>
        </Card>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} NounLogic. All rights reserved.</p>
        </div>
      </div>
      
      {/* Background decoration elements */}
      <div className="hidden md:block absolute top-20 right-20 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
      <div className="hidden md:block absolute bottom-20 left-20 w-72 h-72 bg-accent/20 rounded-full filter blur-3xl opacity-30 animate-pulse-slow animation-delay-2000"></div>
    </div>
  );
};

export default LoginClient;