import { useAppStore } from '@/store/appStore';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, BookOpen, Lock, ArrowRight } from 'lucide-react';

export function Courses() {
  const { courses, setSelectedCourse, setCurrentView, currentUser } = useAppStore();

  const handleViewCourse = (course: typeof courses[0]) => {
    setSelectedCourse(course);
    setCurrentView('course-detail');
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-500/20 text-green-600 border-green-500/30';
      case 'intermediate': return 'bg-blue-500/20 text-blue-600 border-blue-500/30';
      case 'advanced': return 'bg-purple-500/20 text-purple-600 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-600';
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Our <span className="gradient-text">Trading Courses</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose from our comprehensive selection of trading courses designed 
            to take you from beginner to professional trader.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="group glass overflow-hidden hover:border-primary/50 transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className={getLevelColor(course.level)}>
                    {course.level}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <CardHeader className="pb-2">
                <div className="text-xs text-muted-foreground mb-1">{course.category}</div>
                <h3 className="text-xl font-semibold leading-tight">{course.title}</h3>
              </CardHeader>
              
              <CardContent className="pb-4">
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {course.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    {course.modules.length} modules
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex items-center justify-between pt-4 border-t border-border/50">
                <div>
                  <div className="text-2xl font-bold text-primary">₹{course.price}</div>
                  <div className="text-sm text-muted-foreground line-through">₹{course.originalPrice}</div>
                </div>
                
                <Button 
                  onClick={() => handleViewCourse(course)}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 group/btn"
                >
                  {currentUser?.enrolledCourses.includes(course.id) ? (
                    <>
                      Continue
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </>
                  ) : (
                    <>
                      View Details
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
