import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, Target, Users, Award, 
  Heart, MapPin, Mail, Phone, Calendar
} from "lucide-react";

const milestones = [
  { year: "1979", event: "School Founded", description: "AFCS Yola established as a premier military secondary school." },
  { year: "1984", event: "First Graduation", description: "First set of students graduate with distinction." },
  { year: "2000", event: "Alumni Association", description: "Official alumni association established." },
  { year: "2010", event: "Digital Era", description: "Launch of alumni online platform." },
  { year: "2024", event: "New Campus", description: "Expansion with modern facilities." },
];

const leadership = [
  {
    name: "Gen. Abubakar Sani (Rtd)",
    role: "President",
    class: "1985",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Barr. Halima Dangote",
    role: "Vice President",
    class: "1992",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Dr. Emmanuel Obi",
    role: "Secretary General",
    class: "1998",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Mrs. Zainab Musa",
    role: "Treasurer",
    class: "2000",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
  },
];

export default function AboutPage() {
  return (
    <Layout>
      <div className="min-h-screen">
        {/* Header Section */}
        <section className="bg-gradient-hero py-16 lg:py-24">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="gold" className="mb-4">About Us</Badge>
            <h1 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-4">
              Our Story & Mission
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Building a strong community of AFCS Yola graduates united by 
              shared values, memories, and a commitment to excellence.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-card rounded-2xl p-8 shadow-card">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-navy-deep mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To foster a vibrant community of AFCS Yola alumni that supports 
                  professional growth, maintains lasting friendships, and contributes 
                  positively to our alma mater and society at large.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 shadow-card">
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
                  <GraduationCap className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-2xl font-bold text-navy-deep mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be the most connected and impactful alumni network in Nigeria, 
                  creating opportunities, inspiring excellence, and giving back to 
                  future generations of AFCS Yola students.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="navy" className="mb-4">What We Stand For</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-navy-deep mb-4">
                Our Core Values
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Award, title: "Excellence", description: "Striving for the highest standards in all we do." },
                { icon: Users, title: "Unity", description: "Standing together as one family across generations." },
                { icon: Heart, title: "Service", description: "Giving back to our school and community." },
                { icon: GraduationCap, title: "Growth", description: "Continuous learning and professional development." },
              ].map((value) => (
                <div key={value.title} className="bg-card rounded-2xl p-6 shadow-card text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-navy-deep mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="gold" className="mb-4">Our Journey</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-navy-deep mb-4">
                Key Milestones
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-border lg:-translate-x-0.5" />

                {milestones.map((milestone, index) => (
                  <div 
                    key={milestone.year}
                    className={`relative flex items-center gap-8 mb-8 ${
                      index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-4 lg:left-1/2 w-4 h-4 rounded-full bg-gold border-4 border-background lg:-translate-x-1/2 z-10" />
                    
                    {/* Content */}
                    <div className={`ml-12 lg:ml-0 lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12'}`}>
                      <Badge variant="sky" className="mb-2">{milestone.year}</Badge>
                      <h3 className="text-xl font-semibold text-navy-deep mb-2">{milestone.event}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="navy" className="mb-4">Leadership</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-navy-deep mb-4">
                Executive Committee
              </h2>
              <p className="text-lg text-muted-foreground">
                Meet the dedicated alumni leading our association.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {leadership.map((leader) => (
                <div key={leader.name} className="bg-card rounded-2xl overflow-hidden shadow-card text-center">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-navy-deep">{leader.name}</h3>
                    <p className="text-gold font-medium text-sm">{leader.role}</p>
                    <p className="text-muted-foreground text-sm">Class of {leader.class}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 lg:py-24 bg-gradient-hero">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="gold" className="mb-4">Get In Touch</Badge>
                <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
                  Contact Us
                </h2>
                <p className="text-lg text-primary-foreground/80">
                  Have questions? We'd love to hear from you.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <MapPin className="w-8 h-8 mx-auto mb-4 text-gold" />
                  <h3 className="text-lg font-semibold text-primary-foreground mb-2">Address</h3>
                  <p className="text-primary-foreground/70 text-sm">
                    Air Force Comprehensive School,<br />
                    Yola, Adamawa State, Nigeria
                  </p>
                </div>

                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <Mail className="w-8 h-8 mx-auto mb-4 text-gold" />
                  <h3 className="text-lg font-semibold text-primary-foreground mb-2">Email</h3>
                  <a href="mailto:alumni@afcsyola.edu.ng" className="text-primary-foreground/70 text-sm hover:text-gold transition-colors">
                    alumni@afcsyola.edu.ng
                  </a>
                </div>

                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <Phone className="w-8 h-8 mx-auto mb-4 text-gold" />
                  <h3 className="text-lg font-semibold text-primary-foreground mb-2">Phone</h3>
                  <a href="tel:+2348012345678" className="text-primary-foreground/70 text-sm hover:text-gold transition-colors">
                    +234 801 234 5678
                  </a>
                </div>
              </div>

              <div className="text-center mt-10">
                <Button variant="hero" size="lg">
                  Send Us a Message
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
