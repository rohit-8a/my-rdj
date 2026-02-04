import { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  Clock, 
  BookOpen, 
  User, 
  Lock, 
  Play, 
  CheckCircle,
  Shield
} from 'lucide-react';

export function CourseDetail() {
  const { selectedCourse, currentUser, setCurrentView, setCurrentView: setView, unlockCourse, showToast } = useAppStore();
  const [password, setPassword] = useState('');
  const [activeModule, setActiveModule] = useState(0);

  if (!selectedCourse) return null;

  const isEnrolled = currentUser?.enrolledCourses.includes(selectedCourse.id);
  const isAdmin = currentUser?.role === 'admin';

  const handleUnlock = () => {
    const success = unlockCourse(selectedCourse.id, password);
    if (success) {
      showToast('Course unlocked successfully!', 'success');
    } else {
      showToast('Incorrect password. Contact admin for access.', 'error');
    }
  };

  const handleBuyNow = () => {
    setView('payment');
  };

  const handleBack = () => {
    setCurrentView('courses');
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Button variant="ghost" onClick={handleBack} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </Button>

        {/* Course Header */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Badge className="mb-4">{selectedCourse.category}</Badge>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{selectedCourse.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">{selectedCourse.description}</p>
            
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-6">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                Instructor: {selectedCourse.instructor}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Duration: {selectedCourse.duration}
              </div>
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                {selectedCourse.modules.length} Modules
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-4xl font-bold text-primary">₹{selectedCourse.price}</span>
              <span className="text-xl text-muted-foreground line-through">₹{selectedCourse.originalPrice}</span>
              <Badge variant="outline" className="text-green-600 border-green-600">
                {Math.round(((selectedCourse.originalPrice - selectedCourse.price) / selectedCourse.originalPrice) * 100)}% OFF
              </Badge>
            </div>

            {/* Action Buttons */}
            {!isEnrolled && !isAdmin ? (
              <div className="space-y-4">
                <div className="glass rounded-lg p-4">
                  <label className="text-sm font-medium mb-2 block">Enter Course Password to Unlock</label>
                  <div className="flex gap-2">
                    <Input 
                      type="password" 
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button onClick={handleUnlock} className="bg-gradient-to-r from-green-500 to-emerald-600">
                      <Lock className="w-4 h-4 mr-2" />
                      Unlock
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Password provided after payment. <button onClick={handleBuyNow} className="text-primary hover:underline">Buy Now</button>
                  </p>
                </div>
                <Button size="lg" className="w-full bg-gradient-to-r from-blue-500 to-blue-600" onClick={handleBuyNow}>
                  Buy Now - ₹{selectedCourse.price}
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">You have access to this course</span>
              </div>
            )}
          </div>

          {/* Thumbnail */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={selectedCourse.thumbnail} 
                alt={selectedCourse.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6">Course Content</h2>
          
          <div className="space-y-4">
            {selectedCourse.modules.map((module, index) => {
              const isLocked = !isEnrolled && !isAdmin && index > 0;
              
              return (
                <Card 
                  key={module.id} 
                  className={`overflow-hidden transition-all ${isLocked ? 'opacity-60' : 'hover:border-primary/50'}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isLocked ? 'bg-muted' : 'bg-primary/20'}`}>
                          {isLocked ? (
                            <Lock className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <Play className="w-5 h-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold">Module {index + 1}: {module.title}</h3>
                          <p className="text-sm text-muted-foreground">{module.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{module.duration}</span>
                        {!isLocked && (
                          <Button size="sm" variant="outline">Start</Button>
                        )}
                      </div>
                    </div>
                    
                    {!isLocked && (
                      <div className="mt-4 pt-4 border-t border-border/50 text-sm text-muted-foreground">
                        {module.content.substring(0, 100)}...
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
