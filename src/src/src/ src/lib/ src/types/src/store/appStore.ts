import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Course, UPIDetails, Enrollment, ViewType, Toast, CourseModule } from '@/types';

interface AppState {
  currentUser: User | null;
  currentView: ViewType;
  selectedCourse: Course | null;
  courses: Course[];
  users: User[];
  enrollments: Enrollment[];
  upiDetails: UPIDetails;
  toast: Toast;
  // Actions
  setCurrentUser: (user: User | null) => void;
  setCurrentView: (view: ViewType) => void;
  setSelectedCourse: (course: Course | null) => void;
  addCourse: (course: Course) => void;
  updateCourse: (course: Course) => void;
  deleteCourse: (courseId: string) => void;
  addUser: (user: User) => void;
  enrollStudent: (enrollment: Enrollment) => void;
  unlockCourse: (courseId: string, password: string) => boolean;
  showToast: (message: string, type: Toast['type']) => void;
  hideToast: () => void;
  login: (email: string, password: string) => User | null;
  register: (email: string, password: string, name: string) => User;
}

// Sample courses data
const sampleCourses: Course[] = [
  {
    id: '1',
    title: 'Stock Market Fundamentals',
    description: 'Learn the basics of stock market trading, including technical analysis, fundamental analysis, and risk management strategies.',
    price: 1999,
    originalPrice: 3999,
    thumbnail: 'https://images.unsplash.com/photo-1611974765270-ca1258634369?w=800&q=80',
    modules: [
      { id: 'm1', title: 'Introduction to Stock Market', description: 'Understanding basics', content: 'Stock market basics content here...', duration: '20 min', order: 1, isLocked: false },
      { id: 'm2', title: 'Technical Analysis Basics', description: 'Charts and patterns', content: 'Technical analysis content...', duration: '45 min', order: 2, isLocked: true },
      { id: 'm3', title: 'Fundamental Analysis', description: 'Company valuation', content: 'Fundamental analysis content...', duration: '35 min', order: 3, isLocked: true },
    ],
    instructor: 'Rajesh Sharma',
    duration: '12 hours',
    level: 'beginner',
    category: 'Equity',
    password: 'STOCK101',
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Advanced Options Trading',
    description: 'Master options trading strategies including spreads, straddles, and hedging techniques for consistent profits.',
    price: 4999,
    originalPrice: 9999,
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80',
    modules: [
      { id: 'm1', title: 'Options Basics', description: 'Calls and Puts', content: 'Options basics...', duration: '30 min', order: 1, isLocked: false },
      { id: 'm2', title: 'Option Strategies', description: 'Spreads and Combinations', content: 'Strategies content...', duration: '60 min', order: 2, isLocked: true },
      { id: 'm3', title: 'Greeks Explained', description: 'Delta, Gamma, Theta', content: 'Greeks content...', duration: '45 min', order: 3, isLocked: true },
    ],
    instructor: 'Priya Patel',
    duration: '20 hours',
    level: 'advanced',
    category: 'Derivatives',
    password: 'OPTIONS999',
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Forex Trading Mastery',
    description: 'Complete guide to currency trading with live market analysis and trading psychology.',
    price: 3499,
    originalPrice: 6999,
    thumbnail: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80',
    modules: [
      { id: 'm1', title: 'Forex Market Structure', description: 'Currency pairs', content: 'Forex structure...', duration: '25 min', order: 1, isLocked: false },
      { id: 'm2', title: 'Technical Analysis for Forex', description: 'Indicators', content: 'Forex technical analysis...', duration: '50 min', order: 2, isLocked: true },
    ],
    instructor: 'Amit Kumar',
    duration: '15 hours',
    level: 'intermediate',
    category: 'Forex',
    password: 'FOREX777',
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    title: 'Crypto Trading Pro',
    description: 'Learn to trade cryptocurrencies with blockchain fundamentals and DeFi strategies.',
    price: 2999,
    originalPrice: 5999,
    thumbnail: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80',
    modules: [
      { id: 'm1', title: 'Crypto Basics', description: 'Blockchain fundamentals', content: 'Crypto basics...', duration: '30 min', order: 1, isLocked: false },
      { id: 'm2', title: 'Trading Strategies', description: 'Day trading and HODL', content: 'Trading strategies...', duration: '55 min', order: 2, isLocked: true },
    ],
    instructor: 'Neha Gupta',
    duration: '10 hours',
    level: 'beginner',
    category: 'Crypto',
    password: 'CRYPTO888',
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      currentView: 'home',
      selectedCourse: null,
      courses: sampleCourses,
      users: [
        {
          id: 'admin1',
          email: 'admin@trademaster.com',
          name: 'Admin',
          role: 'admin',
          enrolledCourses: [],
          createdAt: new Date(),
        }
      ],
      enrollments: [],
      upiDetails: {
        vpa: 'yourupi@upi', // CHANGE THIS TO YOUR UPI ID
        name: 'TradeMaster Academy',
      },
      toast: {
        show: false,
        message: '',
        type: 'info',
      },

      setCurrentUser: (user) => set({ currentUser: user }),
      setCurrentView: (view) => set({ currentView: view }),
      setSelectedCourse: (course) => set({ selectedCourse: course }),

      addCourse: (course) => set((state) => ({
        courses: [...state.courses, course]
      })),

      updateCourse: (course) => set((state) => ({
        courses: state.courses.map((c) => c.id === course.id ? course : c)
      })),

      deleteCourse: (courseId) => set((state) => ({
        courses: state.courses.filter((c) => c.id !== courseId)
      })),

      addUser: (user) => set((state) => ({
        users: [...state.users, user]
      })),

      enrollStudent: (enrollment) => set((state) => ({
        enrollments: [...state.enrollments, enrollment]
      })),

      unlockCourse: (courseId, password) => {
        const course = get().courses.find((c) => c.id === courseId);
        if (course && course.password === password) {
          const currentUser = get().currentUser;
          if (currentUser) {
            set((state) => ({
              users: state.users.map((u) =>
                u.id === currentUser.id
                  ? { ...u, enrolledCourses: [...u.enrolledCourses, courseId] }
                  : u
              ),
              currentUser: {
                ...currentUser,
                enrolledCourses: [...currentUser.enrolledCourses, courseId]
              }
            }));
          }
          return true;
        }
        return false;
      },

      showToast: (message, type) => set({
        toast: { show: true, message, type }
      }),

      hideToast: () => set({
        toast: { show: false, message: '', type: 'info' }
      }),

      login: (email, password) => {
        const user = get().users.find((u) => u.email === email);
        if (user) {
          set({ currentUser: user });
          return user;
        }
        return null;
      },

      register: (email, password, name) => {
        const newUser: User = {
          id: Date.now().toString(),
          email,
          name,
          role: 'student',
          enrolledCourses: [],
          createdAt: new Date(),
        };
        set((state) => ({
          users: [...state.users, newUser],
          currentUser: newUser
        }));
        return newUser;
      },
    }),
    {
      name: 'trademaster-storage',
    }
  )
);
