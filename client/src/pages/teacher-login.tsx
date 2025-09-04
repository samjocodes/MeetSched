import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, LogIn, Loader2 } from "lucide-react";

interface TeacherLoginProps {
  onLogin: (teacher: any) => void;
}

export default function TeacherLogin({ onLogin }: TeacherLoginProps) {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await apiRequest("POST", "/api/teacher/login", credentials);
      return response.json();
    },
    onSuccess: (data) => {
      onLogin(data.teacher);
      toast({
        title: "Login successful",
        description: `Welcome back, ${data.teacher.name}!`,
      });
    },
    onError: () => {
      toast({
        title: "Login failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleLogin = () => {
    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please fill in both email and password.",
        variant: "destructive",
      });
      return;
    }
    loginMutation.mutate({ email, password });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md fade-in">
        {/* Back Button */}
        <button
          onClick={() => setLocation("/")}
          className="mb-6 flex items-center text-gray-400 hover:text-yellow-500 transition-colors group"
          data-testid="button-back"
        >
          <ArrowLeft className="icon-sm mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Role Selection
        </button>

        {/* Login Form */}
        <div className="professional-container">
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">👩‍🏫</div>
            <h1 className="text-2xl font-bold gold-gradient mb-1" data-testid="title-faculty-login">Faculty Login</h1>
            <p className="text-gray-400 text-sm">Access your teaching portal</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter your faculty email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="professional-input"
                disabled={loginMutation.isPending}
                data-testid="input-email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="professional-input"
                disabled={loginMutation.isPending}
                data-testid="input-password"
              />
            </div>
            
            <button
              onClick={handleLogin}
              disabled={loginMutation.isPending}
              className={`w-full btn-professional btn-gold ${loginMutation.isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
              data-testid="button-sign-in"
            >
              {loginMutation.isPending ? (
                <>
                  <Loader2 className="icon-sm animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn className="icon-sm" />
                  Sign In
                </>
              )}
            </button>
          </div>

          {/* Demo Credentials */}
          <div className="mt-4 p-3 bg-black bg-opacity-60 rounded-lg border border-yellow-500 border-opacity-20">
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 text-yellow-500 mr-2 flex items-center justify-center">ⓘ</div>
              <span className="text-yellow-400 font-medium text-sm">Demo Credentials</span>
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
          </div>
        </div>
      </div>
    </div>
  );
}
