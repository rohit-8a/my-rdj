import { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus, LogIn } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { login, register, showToast } = useAppStore();
  const [activeTab, setActiveTab] = useState('login');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = login(loginEmail, loginPassword);
    if (user) {
      showToast('Welcome back!', 'success');
      onClose();
    } else {
      showToast('Invalid credentials. Try admin@trademaster.com / admin', 'error');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerName || !registerEmail || !registerPassword) {
      showToast('Please fill all fields', 'error');
      return;
    }
    const user = register(registerEmail, registerPassword, registerName);
    showToast('Registration successful!', 'success');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold gradient-text">
            TradeMaster Pro
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" className="flex items-center">
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="flex items-center">
              <UserPlus className="w-4 h-4 mr-2" />
              Register
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Email</label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Password</label>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-green-500 to-emerald-600">
                Login
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Admin: admin@trademaster.com (any password)
              </p>
            </form>
          </TabsContent>

          <TabsContent value="register" className="mt-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Full Name</label>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Email</label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Password</label>
                <Input
                  type="password"
                  placeholder="Create password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-green-500 to-emerald-600">
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
