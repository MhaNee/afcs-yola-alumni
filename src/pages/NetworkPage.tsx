import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, Handshake, MessageSquare, UserPlus, 
  Search, Filter, ArrowRight, CheckCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock mentors data
const mentorsData = [
  {
    id: 1,
    name: "Dr. Amina Mohammed",
    class: "1995",
    role: "Deputy Secretary-General, UN",
    expertise: ["International Relations", "Leadership", "Policy"],
    available: true,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Ibrahim Hassan",
    class: "1998",
    role: "Pilot, Emirates Airlines",
    expertise: ["Aviation", "Career Transition", "Discipline"],
    available: true,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Grace Okonkwo",
    class: "2012",
    role: "Partner, Baker McKenzie",
    expertise: ["Corporate Law", "Negotiation", "Career Growth"],
    available: false,
    image: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=400&h=400&fit=crop&crop=face",
  },
];

const networkStats = [
  { icon: Users, label: "Active Members", value: "3,500+" },
  { icon: Handshake, label: "Connections Made", value: "15,000+" },
  { icon: MessageSquare, label: "Messages Exchanged", value: "50,000+" },
];

export default function NetworkPage() {
  return (
    <Layout>
      <div className="min-h-screen">
        {/* Header Section */}
        <section className="bg-gradient-hero py-16 lg:py-24">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="gold" className="mb-4">Build Your Network</Badge>
            <h1 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-4">
              Connect & Mentor
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Build meaningful connections with fellow alumni. Find mentors, 
              offer guidance, and grow together as a community.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="lg">
                <UserPlus className="w-5 h-5 mr-2" />
                Find Connections
              </Button>
              <Button variant="heroOutline" size="lg">
                Become a Mentor
              </Button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 -mt-8 relative z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
              {networkStats.map((stat) => (
                <div 
                  key={stat.label}
                  className="bg-card rounded-2xl p-6 shadow-card text-center"
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <div className="text-2xl lg:text-3xl font-bold text-navy-deep">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="navy" className="mb-4">How It Works</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-navy-deep mb-4">
                Simple Steps to Connect
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Create Your Profile",
                  description: "Complete your alumni profile with your background, expertise, and interests.",
                },
                {
                  step: "02",
                  title: "Find & Connect",
                  description: "Search the directory and send connection requests to fellow alumni.",
                },
                {
                  step: "03",
                  title: "Engage & Grow",
                  description: "Message, mentor, and collaborate with your network.",
                },
              ].map((item, index) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-hero flex items-center justify-center text-2xl font-bold text-gold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-navy-deep mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mentorship Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-12">
              <div>
                <Badge variant="gold" className="mb-4">Mentorship Program</Badge>
                <h2 className="text-3xl lg:text-4xl font-bold text-navy-deep mb-4">
                  Learn From the Best
                </h2>
                <p className="text-lg text-muted-foreground max-w-xl">
                  Connect with experienced alumni mentors who can guide your 
                  career and personal growth journey.
                </p>
              </div>

              <div className="relative w-full lg:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search mentors by expertise..."
                  className="pl-10 w-full lg:w-[300px] h-12"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {mentorsData.map((mentor) => (
                <div 
                  key={mentor.id}
                  className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="sky">Class of {mentor.class}</Badge>
                      {mentor.available ? (
                        <span className="flex items-center gap-1 text-xs text-success">
                          <CheckCircle className="w-3 h-3" />
                          Available
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Unavailable</span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-navy-deep mb-1">{mentor.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{mentor.role}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {mentor.expertise.map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>

                    <Button 
                      variant={mentor.available ? "navy" : "outline"} 
                      className="w-full"
                      disabled={!mentor.available}
                    >
                      {mentor.available ? "Request Mentorship" : "Currently Unavailable"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button variant="outline" size="lg">
                View All Mentors
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Become a Mentor CTA */}
        <section className="py-16 lg:py-24 bg-gradient-hero">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="gold" className="mb-4">Give Back</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
                Share Your Experience
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8">
                Your knowledge and experience can make a significant impact on 
                junior alumni and current students. Join our mentorship program.
              </p>
              <Button variant="hero" size="lg">
                <Handshake className="w-5 h-5 mr-2" />
                Apply as a Mentor
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
