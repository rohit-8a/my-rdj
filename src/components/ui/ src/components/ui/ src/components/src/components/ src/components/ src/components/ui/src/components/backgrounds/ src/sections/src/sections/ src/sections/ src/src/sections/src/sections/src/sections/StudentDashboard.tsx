import { useAppStore } from '@/store/appStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, PlayCircle, ArrowLeft, Award } from 'lucide-react';

export function StudentDashboard() {
  const { currentUser, courses, setSelectedCourse, setCurrentView } = useAppStore();

  if (!currentUser) return null;

  const enrolledCourses = courses.filter(c => currentUser.enrolledCourses.includes(c.id));
  const availableCourses = courses.filter(c => !currentUser.enrolledCourses.includes(c.id));

  const handleContinueLearning = (course: typeof courses[0]) => {
    setSelectedCourse(course);
    setCurrentView('course-detail');
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Learning</h1>
            <p className="text-muted-foreground">Welcome back, {currentUser.name}</p>
          </div>
          <Button variant="outline" onClick={() => setCurrentView('courses')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Browse Courses
          </Button>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{enrolledCourses.length}</p>
                  <p className="text-sm text-muted-foreground">Enrolled Courses</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <PlayCircle className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Certificates</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enrolled Courses */}
        <h2 className="text-xl font-semibold mb-4">Continue Learning</h2>
        {enrolledCourses.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {enrolledCourses.map((course) => (
              <Card key={course.id} className="glass overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-semibold">{course.title}</h3>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">0%</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600"
                    onClick={() => handleContinueLearning(course)}
                  >
                    Continue Learning
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="glass p-8 text-center mb-8">
            <p className="text-muted-foreground mb-4">You haven't enrolled in any courses yet</p>
            <Button 
              className="bg-gradient-to-r from-green-500 to-emerald-600"
              onClick={() => setCurrentView('courses')}
            >
              Browse Courses
            </Button>
          </Card>
        )}

        {/* Available Courses */}
        {availableCourses.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {availableCourses.slice(0, 2).map((course) => (
                <Card key={course.id} className="glass overflow-hidden opacity-75">
                  <div className="relative h-48">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-white font-medium">Locked</span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{course.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">₹{course.price}</span>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setSelectedCourse(course);
                          setCurrentView('course-detail');
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
