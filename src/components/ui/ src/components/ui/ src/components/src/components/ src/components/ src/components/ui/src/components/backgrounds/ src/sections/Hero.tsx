import { useAppStore } from '@/store/appStore';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react';
import { AnimatedBackground } from '@/components/backgrounds/AnimatedBackground';

export function Hero() {
  const { setCurrentView, currentUser, setSelectedCourse, courses } = useAppStore();

  const handleExploreCourses = () => {
    setCurrentView('courses');
  };

  const handleFeaturedCourse = () => {
    const featuredCourse = courses[0];
    if (featuredCourse) {
      setSelectedCourse(featuredCourse);
      setCurrentView('course-detail');
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              <TrendingUp className="w-4 h-4 mr-2" />
              #1 Trading Education Platform
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Master the Art of{' '}
              <span className="gradient-text">Stock Trading</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Learn professional trading strategies from industry experts. 
              From basics to advanced technical analysis, we guide you to 
              trading success with hands-on courses and real-world practice.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                onClick={handleExploreCourses}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white group"
              >
                Explore Courses
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                onClick={handleFeaturedCourse}
              >
                View Featured Course
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50">
              <div>
                <div className="text-2xl font-bold gradient-text">10K+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div>
                <div className="text-2xl font-bold gradient-text">50+</div>
                <div className="text-sm text-muted-foreground">Courses</div>
              </div>
              <div>
                <div className="text-2xl font-bold gradient-text">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Features */}
          <div className="relative lg:pl-12">
            <div className="grid gap-6">
              <div className="glass rounded-2xl p-6 float">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Expert-Led Courses</h3>
                <p className="text-sm text-muted-foreground">
                  Learn from professional traders with years of market experience
                </p>
              </div>
              
              <div className="glass rounded-2xl p-6 float" style={{ animationDelay: '1s' }}>
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Risk Management</h3>
                <p className="text-sm text-muted-foreground">
                  Master the art of protecting your capital while maximizing returns
                </p>
              </div>
              
              <div className="glass rounded-2xl p-6 float" style={{ animationDelay: '2s' }}>
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Live Market Practice</h3>
                <p className="text-sm text-muted-foreground">
                  Apply your knowledge with real-time market simulations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
