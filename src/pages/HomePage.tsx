import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, Calendar, Briefcase, Heart, Award, ArrowRight, 
  GraduationCap, MapPin, Building2, Handshake
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

// Stats data
const stats = [
  { label: "Alumni Members", value: "5,000+", icon: Users },
  { label: "Years of Excellence", value: "45+", icon: Award },
  { label: "Countries", value: "30+", icon: MapPin },
  { label: "Success Stories", value: "1,000+", icon: Building2 },
];

// Featured alumni data
const featuredAlumni = [
  {
    name: "Dr. Amina Mohammed",
    class: "1995",
    role: "Deputy Secretary-General, UN",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Gen. Ibrahim Attahiru",
    class: "1988",
    role: "Former Chief of Army Staff",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Eng. Fatima Yusuf",
    class: "2005",
    role: "CEO, TechVentures Africa",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
  },
];

// Upcoming events
const upcomingEvents = [
  {
    title: "Annual Alumni Reunion 2025",
    date: "March 15, 2025",
    location: "AFCS Yola Campus",
    type: "Reunion",
  },
  {
    title: "Career Mentorship Workshop",
    date: "February 10, 2025",
    location: "Virtual Event",
    type: "Workshop",
  },
  {
    title: "Class of 2000 Silver Jubilee",
    date: "April 25, 2025",
    location: "Lagos, Nigeria",
    type: "Celebration",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroBg}
            alt="AFCS Yola Campus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <Badge variant="gold" className="mb-6 text-sm px-4 py-1.5">
              <GraduationCap className="w-4 h-4 mr-2" />
              Welcome to the Family
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              AFCS YOLA
              <span className="block text-gold mt-2">Alumni Network</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Reconnect with classmates, network with fellow graduates, and stay engaged 
              with the Air Force Comprehensive School Yola community.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/register" className="flex items-center gap-2">
                  Join the Network
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/directory">Explore Directory</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-20 -mt-16 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="bg-card rounded-2xl p-6 lg:p-8 shadow-card hover:shadow-card-hover transition-all duration-300 text-center animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-navy-deep mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
            <Badge variant="navy" className="mb-4">What We Offer</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-deep mb-4">
              Everything You Need to Stay Connected
            </h2>
            <p className="text-lg text-muted-foreground">
              Our platform provides comprehensive tools for alumni to reconnect, 
              grow professionally, and give back to the community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: "Alumni Directory",
                description: "Search and connect with over 5,000 alumni across the globe.",
                color: "bg-sky-bright",
              },
              {
                icon: Calendar,
                title: "Events & Reunions",
                description: "Stay updated on reunions, workshops, and networking events.",
                color: "bg-gold",
              },
              {
                icon: Briefcase,
                title: "Job Board",
                description: "Access exclusive job opportunities posted by fellow alumni.",
                color: "bg-success",
              },
              {
                icon: Handshake,
                title: "Mentorship",
                description: "Connect with mentors or become one for junior alumni.",
                color: "bg-primary",
              },
            ].map((feature, index) => (
              <div 
                key={feature.title}
                className="group bg-card rounded-2xl p-6 lg:p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-navy-deep mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Alumni Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
            <Badge variant="gold" className="mb-4">Featured Alumni</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-deep mb-4">
              Our Distinguished Graduates
            </h2>
            <p className="text-lg text-muted-foreground">
              AFCS Yola alumni have gone on to achieve remarkable success across various fields worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {featuredAlumni.map((alumni, index) => (
              <div 
                key={alumni.name}
                className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={alumni.image} 
                    alt={alumni.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <Badge variant="sky" className="mb-3">Class of {alumni.class}</Badge>
                  <h3 className="text-xl font-semibold text-navy-deep mb-1">{alumni.name}</h3>
                  <p className="text-muted-foreground">{alumni.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" size="lg" asChild>
              <Link to="/directory" className="flex items-center gap-2">
                View All Alumni
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 lg:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
            <Badge variant="gold" className="mb-4">Upcoming Events</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Don't Miss Out
            </h2>
            <p className="text-lg text-primary-foreground/80">
              Join us for exciting events, reunions, and networking opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div 
                key={event.title}
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-colors"
              >
                <Badge variant="gold" className="mb-4">{event.type}</Badge>
                <h3 className="text-xl font-semibold text-primary-foreground mb-3">{event.title}</h3>
                <div className="space-y-2 text-primary-foreground/70">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>
                <Button variant="heroOutline" size="sm" className="mt-5 w-full">
                  Learn More
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="hero" size="lg" asChild>
              <Link to="/events" className="flex items-center gap-2">
                View All Events
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Donation CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-card rounded-3xl p-8 lg:p-12 shadow-lg text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-br from-gold via-transparent to-primary" />
            </div>

            <div className="relative z-10">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gold/10 flex items-center justify-center">
                <Heart className="w-10 h-10 text-gold" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-navy-deep mb-4">
                Give Back to Your Alma Mater
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Your contributions help provide scholarships, improve facilities, 
                and support the next generation of AFCS Yola students.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero" size="lg">
                  <Heart className="w-5 h-5" />
                  Donate Now
                </Button>
                <Button variant="outline" size="lg">
                  Learn About Our Programs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
