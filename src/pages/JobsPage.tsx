import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search, Briefcase, MapPin, Clock, Building2,
  DollarSign, ExternalLink, Plus, Filter, Bookmark
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock jobs data
const jobsData = [];

const jobTypes = ["All Types", "Full-time", "Part-time", "Contract", "Remote", "Internship"];
const industries = ["All Industries", "Technology", "Finance", "Healthcare", "Legal", "Aviation", "Education"];

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Header Section */}
        <section className="bg-gradient-hero py-16 lg:py-24">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="gold" className="mb-4">Career Opportunities</Badge>
            <h1 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-4">
              Alumni Job Board
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Exclusive job opportunities posted by and for AFCS Yola alumni.
              Find your next career move within our trusted network.
            </p>
            <Button variant="hero" size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Post a Job
            </Button>
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
                  placeholder="Search jobs by title, company, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-[160px] h-12">
                    <Briefcase className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                  <SelectTrigger className="w-[160px] h-12">
                    <Building2 className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Jobs List */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">{jobsData.length}</span> jobs available
              </p>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>

            <div className="space-y-4">
              {jobsData.length > 0 ? (
                jobsData.map((job) => (
                  <div
                    key={job.id}
                    className="group bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-transparent hover:border-primary/20"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      {/* Company Logo */}
                      <img
                        src={job.logo}
                        alt={job.company}
                        className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                      />

                      {/* Job Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-semibold text-navy-deep group-hover:text-primary transition-colors">
                              {job.title}
                            </h3>
                            <p className="text-muted-foreground">{job.company}</p>
                          </div>
                          <Button variant="ghost" size="icon" className="flex-shrink-0">
                            <Bookmark className="w-5 h-5" />
                          </Button>
                        </div>

                        <p className="text-sm text-muted-foreground mt-2 line-clamp-1">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            <span>{job.salary}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{job.posted}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mt-4">
                          {job.skills.map((skill) => (
                            <Badge key={skill} variant="secondary">{skill}</Badge>
                          ))}
                          <span className="text-xs text-muted-foreground ml-2">
                            Posted by {job.postedBy} (Class of {job.postedByClass})
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex lg:flex-col gap-2 lg:ml-4">
                        <Button variant="navy" className="flex-1 lg:flex-none">
                          Apply Now
                        </Button>
                        <Button variant="outline" size="icon">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No job postings available at the moment.</p>
                </div>
              )}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                View More Jobs
              </Button>
            </div>
          </div>
        </section>

        {/* Post Job CTA */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="gold" className="mb-4">For Employers</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-navy-deep mb-4">
                Hire From Our Network
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Looking for talented professionals? Post your job openings and connect
                with qualified AFCS Yola alumni from around the world.
              </p>
              <Button variant="hero" size="lg">
                <Plus className="w-5 h-5 mr-2" />
                Post a Job Opening
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
