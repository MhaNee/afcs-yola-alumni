import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, Filter, MapPin, Briefcase, GraduationCap, 
  Linkedin, Mail, ChevronDown 
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock alumni data
const alumniData = [
  {
    id: 1,
    name: "Aisha Bello",
    class: "2010",
    location: "Abuja, Nigeria",
    industry: "Technology",
    role: "Software Engineer at Google",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop&crop=face",
    linkedin: "#",
  },
  {
    id: 2,
    name: "Mohammed Yusuf",
    class: "2005",
    location: "Lagos, Nigeria",
    industry: "Finance",
    role: "Managing Director, GTBank",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
    linkedin: "#",
  },
  {
    id: 3,
    name: "Fatima Abdullahi",
    class: "2015",
    location: "London, UK",
    industry: "Healthcare",
    role: "Medical Doctor, NHS",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face",
    linkedin: "#",
  },
  {
    id: 4,
    name: "Ibrahim Hassan",
    class: "1998",
    location: "Dubai, UAE",
    industry: "Aviation",
    role: "Pilot, Emirates Airlines",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    linkedin: "#",
  },
  {
    id: 5,
    name: "Grace Okonkwo",
    class: "2012",
    location: "New York, USA",
    industry: "Law",
    role: "Partner, Baker McKenzie",
    image: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=400&h=400&fit=crop&crop=face",
    linkedin: "#",
  },
  {
    id: 6,
    name: "Usman Danfodiyo",
    class: "2000",
    location: "Yola, Nigeria",
    industry: "Education",
    role: "Principal, AFCS Yola",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    linkedin: "#",
  },
];

const years = ["All Years", "2020-2025", "2015-2019", "2010-2014", "2005-2009", "2000-2004", "Before 2000"];
const industries = ["All Industries", "Technology", "Finance", "Healthcare", "Aviation", "Law", "Education", "Military", "Engineering"];
const locations = ["All Locations", "Nigeria", "United Kingdom", "United States", "UAE", "Canada", "Germany"];

export default function DirectoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("All Years");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Header Section */}
        <section className="bg-gradient-hero py-16 lg:py-24">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="gold" className="mb-4">Find Your Classmates</Badge>
            <h1 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-4">
              Alumni Directory
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Search and connect with over 5,000 AFCS Yola alumni across the globe. 
              Build your professional network and reconnect with old friends.
            </p>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="py-8 bg-card border-b border-border sticky top-16 lg:top-20 z-40">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by name, company, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-[160px] h-12">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                  <SelectTrigger className="w-[160px] h-12">
                    <Briefcase className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-[160px] h-12">
                    <MapPin className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Alumni Grid */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{alumniData.length}</span> alumni
              </p>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {alumniData.map((alumni) => (
                <div 
                  key={alumni.id}
                  className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <img 
                        src={alumni.image}
                        alt={alumni.name}
                        className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-navy-deep truncate">
                          {alumni.name}
                        </h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {alumni.role}
                        </p>
                        <Badge variant="sky" className="mt-2">
                          Class of {alumni.class}
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{alumni.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Briefcase className="w-4 h-4" />
                        <span>{alumni.industry}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button variant="default" size="sm" className="flex-1">
                        <Mail className="w-4 h-4 mr-1" />
                        Connect
                      </Button>
                      <Button variant="outline" size="sm">
                        <Linkedin className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Alumni
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
