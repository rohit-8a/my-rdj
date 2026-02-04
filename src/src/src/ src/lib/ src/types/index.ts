export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'student';
  enrolledCourses: string[];
  createdAt: Date;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  content: string;
  duration: string;
  order: number;
  isLocked: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  thumbnail: string;
  modules: CourseModule[];
  instructor: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  password: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UPIDetails {
  vpa: string;
  name: string;
}

export interface Enrollment {
  userId: string;
  courseId: string;
  enrolledAt: Date;
  paymentStatus: 'pending' | 'completed';
  transactionId?: string;
}

export type ViewType = 'home' | 'courses' | 'course-detail' | 'payment' | 'admin-dashboard' | 'student-dashboard';

export interface Toast {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}
