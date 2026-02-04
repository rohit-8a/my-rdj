import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { AuthModal } from '@/components/AuthModal';
import { Toast } from '@/components/Toast';
import { Hero } from '@/sections/Hero';
import { Courses } from '@/sections/Courses';
import { CourseDetail } from '@/sections/CourseDetail';
import { Payment } from '@/sections/Payment';
import { AdminDashboard } from '@/sections/AdminDashboard';
import { StudentDashboard } from '@/sections/StudentDashboard';
import { useAppStore } from '@/store/appStore';

function App() {
  const { currentUser, currentView, selectedCourse, toast, hideToast } = useAppStore();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Register service worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered:', registration);
        })
        .catch((error) => {
          console.log('SW registration failed:', error);
        });
    }
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <>
            <Hero />
            <Courses />
          </>
        );
      case 'courses':
        return <Courses />;
      case 'course-detail':
        return selectedCourse ? <CourseDetail /> : <Courses />;
      case 'payment':
        return selectedCourse ? <Payment /> : <Courses />;
      case 'admin-dashboard':
        return currentUser?.role === 'admin' ? <AdminDashboard /> : <Hero />;
      case 'student-dashboard':
        return currentUser?.role === 'student' ? <StudentDashboard /> : <Hero />;
      default:
        return (
          <>
            <Hero />
            <Courses />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation onAuthClick={() => setIsAuthModalOpen(true)} />
      <main className="pt-16">
        {renderContent()}
      </main>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
      
      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={hideToast} 
        />
      )}
    </div>
  );
}

export default App;
