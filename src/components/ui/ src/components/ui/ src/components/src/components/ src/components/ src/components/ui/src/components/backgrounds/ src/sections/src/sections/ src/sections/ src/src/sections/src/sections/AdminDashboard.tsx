import { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  Plus, 
  Trash2, 
  Edit,
  ArrowLeft
} from 'lucide-react';

export function AdminDashboard() {
  const { 
    courses, 
    users, 
    enrollments, 
    upiDetails, 
    addCourse, 
    deleteCourse, 
    setCurrentView,
    showToast 
  } = useAppStore();

  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    price: '',
    originalPrice: '',
    password: '',
    duration: '',
    level: 'beginner',
    category: '',
    thumbnail: '',
  });

  const handleAddCourse = () => {
    if (!newCourse.title || !newCourse.price || !newCourse.password) {
      showToast('Please fill required fields', 'error');
      return;
    }

    const course = {
      id: Date.now().toString(),
      title: newCourse.title,
      description: newCourse.description,
      price: parseInt(newCourse.price),
      originalPrice: parseInt(newCourse.originalPrice) || parseInt(newCourse.price) * 2,
      password: newCourse.password,
      duration: newCourse.duration || '10 hours',
      level: newCourse.level as 'beginner' | 'intermediate' | 'advanced',
      category: newCourse.category || 'General',
      thumbnail: newCourse.thumbnail || 'https://images.unsplash.com/photo-1611974765270-ca1258634369?w=800&q=80',
      modules: [],
      instructor: 'Admin',
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addCourse(course);
    showToast('Course added successfully!', 'success');
    setIsAddingCourse(false);
    setNewCourse({
      title: '',
      description: '',
      price: '',
      originalPrice: '',
      password: '',
      duration: '',
      level: 'beginner',
      category: '',
      thumbnail: '',
    });
  };

  const handleDeleteCourse = (courseId: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      deleteCourse(courseId);
      showToast('Course deleted', 'info');
    }
  };

  const totalRevenue = enrollments.filter(e => e.paymentStatus === 'completed').length * 1000; // Approximate

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage courses, users, and payments</p>
          </div>
          <Button variant="outline" onClick={() => setCurrentView('home')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Courses</p>
                  <p className="text-3xl font-bold">{courses.length}</p>
                </div>
                <BookOpen className="w-8 h-8 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-3xl font-bold">{users.filter(u => u.role === 'student').length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Enrollments</p>
                  <p className="text-3xl font-bold">{enrollments.length}</p>
                </div>
                <BookOpen className="w-8 h-8 text-purple-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Est. Revenue</p>
                  <p className="text-3xl font-bold">₹{totalRevenue}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Courses Management */}
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Courses Management</CardTitle>
            <Button onClick={() => setIsAddingCourse(!isAddingCourse)} className="bg-gradient-to-r from-green-500 to-emerald-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Course
            </Button>
          </CardHeader>
          <CardContent>
            {isAddingCourse && (
              <div className="mb-6 p-4 rounded-lg bg-muted/50 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input 
                    placeholder="Course Title *" 
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                  />
                  <Input 
                    placeholder="Price (₹) *" 
                    type="number"
                    value={newCourse.price}
                    onChange={(e) => setNewCourse({...newCourse, price: e.target.value})}
                  />
                  <Input 
                    placeholder="Original Price (₹)" 
                    type="number"
                    value={newCourse.originalPrice}
                    onChange={(e) => setNewCourse({...newCourse, originalPrice: e.target.value})}
                  />
                  <Input 
                    placeholder="Course Password *" 
                    value={newCourse.password}
                    onChange={(e) => setNewCourse({...newCourse, password: e.target.value})}
                  />
                  <Input 
                    placeholder="Duration (e.g., 10 hours)" 
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                  />
                  <Input 
                    placeholder="Category" 
                    value={newCourse.category}
                    onChange={(e) => setNewCourse({...newCourse, category: e.target.value})}
                  />
                </div>
                <Input 
                  placeholder="Thumbnail URL" 
                  value={newCourse.thumbnail}
                  onChange={(e) => setNewCourse({...newCourse, thumbnail: e.target.value})}
                />
                <Input 
                  placeholder="Description" 
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                />
                <div className="flex gap-2">
                  <Button onClick={handleAddCourse} className="bg-gradient-to-r from-green-500 to-emerald-600">Save Course</Button>
                  <Button variant="outline" onClick={() => setIsAddingCourse(false)}>Cancel</Button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {courses.map((course) => (
                <div 
                  key={course.id} 
                  className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="font-semibold">{course.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>₹{course.price}</span>
                        <span>•</span>
                        <Badge variant="outline" className="text-xs">{course.level}</Badge>
                        <span>•</span>
                        <span className="font-mono text-xs">Pass: {course.password}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteCourse(course.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* UPI Settings */}
        <Card className="glass mt-6">
          <CardHeader>
            <CardTitle>Payment Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">UPI ID</label>
                <Input value={upiDetails.vpa} readOnly />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Business Name</label>
                <Input value={upiDetails.name} readOnly />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Edit these in src/store/appStore.ts file
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
