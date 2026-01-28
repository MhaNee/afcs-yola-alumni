import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, MapPin, Clock, Users, Filter, 
  ChevronRight, ExternalLink, CalendarPlus
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock events data
const eventsData = [
  {
    id: 1,
    title: "Annual Alumni Reunion 2025",
    date: "March 15, 2025",
    time: "10:00 AM - 6:00 PM",
    location: "AFCS Yola Campus",
    type: "Reunion",
    attendees: 250,
    description: "Join us for the biggest alumni gathering of the year. Reconnect with old friends, meet new alumni, and celebrate our school's legacy.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
    featured: true,
  },
  {
    id: 2,
    title: "Career Mentorship Workshop",
    date: "February 10, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Virtual Event",
    type: "Workshop",
    attendees: 120,
    description: "Learn from successful alumni about career growth, networking, and professional development.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    featured: false,
  },
  {
    id: 3,
    title: "Class of 2000 Silver Jubilee",
    date: "April 25, 2025",
    time: "6:00 PM - 11:00 PM",
    location: "Eko Hotels, Lagos",
    type: "Celebration",
    attendees: 85,
    description: "Celebrating 25 years since graduation. An evening of memories, music, and reconnection.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=400&fit=crop",
    featured: false,
  },
  {
    id: 4,
    title: "AFCS Yola Foundation Gala",
    date: "May 20, 2025",
    time: "7:00 PM - 11:00 PM",
    location: "Transcorp Hilton, Abuja",
    type: "Fundraiser",
    attendees: 200,
    description: "Annual fundraising gala to support scholarships and school development projects.",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&h=400&fit=crop",
    featured: true,
  },
];

const eventTypes = ["All", "Reunion", "Workshop", "Celebration", "Fundraiser", "Networking"];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedType, setSelectedType] = useState("All");

  const featuredEvent = eventsData.find(event => event.featured);

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Header Section */}
        <section className="bg-gradient-hero py-16 lg:py-24">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="gold" className="mb-4">Stay Connected</Badge>
            <h1 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-4">
              Events & Reunions
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Join exciting events, reunions, and networking opportunities. 
              Connect with fellow alumni and celebrate our shared heritage.
            </p>
          </div>
        </section>

        {/* Featured Event */}
        {featuredEvent && (
          <section className="py-12 lg:py-16">
            <div className="container mx-auto px-4">
              <div className="relative rounded-3xl overflow-hidden shadow-lg">
                <img 
                  src={featuredEvent.image}
                  alt={featuredEvent.title}
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/50 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
                  <div className="max-w-2xl">
                    <Badge variant="gold" className="mb-4">Featured Event</Badge>
                    <h2 className="text-2xl lg:text-4xl font-bold text-primary-foreground mb-4">
                      {featuredEvent.title}
                    </h2>
                    <p className="text-primary-foreground/80 mb-6 hidden sm:block">
                      {featuredEvent.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-primary-foreground/70 text-sm mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{featuredEvent.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{featuredEvent.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{featuredEvent.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{featuredEvent.attendees} attending</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="hero" size="lg">
                        <CalendarPlus className="w-5 h-5 mr-2" />
                        RSVP Now
                      </Button>
                      <Button variant="heroOutline" size="lg">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Events List */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="upcoming" className="w-full">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <TabsList className="bg-card shadow-card">
                  <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                  <TabsTrigger value="past">Past Events</TabsTrigger>
                </TabsList>

                <div className="flex gap-2 flex-wrap">
                  {eventTypes.map((type) => (
                    <Button
                      key={type}
                      variant={selectedType === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedType(type)}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>

              <TabsContent value="upcoming" className="mt-0">
                <div className="grid md:grid-cols-2 gap-6">
                  {eventsData.map((event) => (
                    <div 
                      key={event.id}
                      className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <Badge variant="navy">{event.type}</Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Users className="w-4 h-4" />
                            <span>{event.attendees}</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold text-navy-deep mb-3">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {event.description}
                        </p>
                        <div className="space-y-2 text-sm text-muted-foreground mb-5">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date} • {event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Button variant="default" className="flex-1">
                            RSVP
                          </Button>
                          <Button variant="outline" size="icon">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="past" className="mt-0">
                <div className="text-center py-12 text-muted-foreground">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Past events archive coming soon.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Host Event CTA */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-navy-deep mb-4">
                Want to Host an Event?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Organize a class reunion, professional workshop, or community event. 
                We'll help you connect with your fellow alumni.
              </p>
              <Button variant="navy" size="lg">
                Submit Event Proposal
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
