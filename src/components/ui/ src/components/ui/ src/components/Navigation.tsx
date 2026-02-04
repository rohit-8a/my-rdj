import { useAppStore } from '@/store/appStore';
import { Button } from '@/components/ui/button';
import { Menu, X, User, BookOpen, LayoutDashboard, LogOut } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  onAuthClick: () => void;
}

export function Navigation({ onAuthClick }: NavigationProps) {
  const { currentUser, setCurrentView, setCurrentUser } = useAppStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  const navLinks = [
    { label: 'Home', view: 'home' as const, icon: null },
    { label: 'Courses', view: 'courses' as const, icon: BookOpen },
    ...(currentUser?.role === 'admin' ? [{ label: 'Admin', view: 'admin-dashboard' as const, icon: LayoutDashboard }] : []),
    ...(currentUser?.role === 'student' ? [{ label: 'My Learning', view: 'student-dashboard' as const, icon: BookOpen }] : []),
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => setCurrentView('home')}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center mr-2">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="font-bold text-xl gradient-text hidden sm:block">
              TradeMaster
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => setCurrentView(link.view)}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                {link.icon && <link.icon className="w-4 h-4 mr-1" />}
                {link.label}
              </button>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="w-4 h-4 mr-1" />
                  {currentUser.name}
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={onAuthClick} className="bg-gradient-to-r from-green-500 to-emerald-600">
                Login / Register
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => {
                    setCurrentView(link.view);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                  {link.icon && <link.icon className="w-4 h-4 mr-2" />}
                  {link.label}
                </button>
              ))}
              
              <div className="pt-4 border-t border-border/50">
                {currentUser ? (
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center px-3 py-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4 mr-2" />
                      {currentUser.name}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-md"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <Button onClick={onAuthClick} className="w-full bg-gradient-to-r from-green-500 to-emerald-600">
                    Login / Register
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
