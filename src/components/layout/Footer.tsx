import { Link } from "react-router-dom";
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function Footer() {
  const { user } = useAuth();

  // If user is authenticated, we might want to show a simplified footer or just generic info
  // The user requested removing mock data from footer after auth. 
  // Maybe hiding the "Quick Links" and "Resources" which are mostly placeholders is what's needed.

  return (
    <footer className="bg-navy-deep text-primary-foreground">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-gold" />
              </div>
              <div>
                <h3 className="text-lg font-bold">AFCS YOLA</h3>
                <p className="text-sm text-primary-foreground/70">Alumni Network</p>
              </div>
            </Link>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Connecting graduates and former students of Air Force Comprehensive School Yola.
              Building a strong community of excellence.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-gold hover:text-navy-deep transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-gold hover:text-navy-deep transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-gold hover:text-navy-deep transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-gold hover:text-navy-deep transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {!user ? (
                <>
                  <li><Link to="/about" className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">About Us</Link></li>
                  <li><Link to="/events" className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">Events</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/directory" className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">Directory</Link></li>
                  <li><Link to="/jobs" className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">Jobs</Link></li>
                  <li><Link to="/chat" className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">Chat</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">News & Updates</a></li>
              <li><a href="#" className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">Photo Gallery</a></li>
              <li><a href="#" className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-0.5" />
                <span className="text-sm text-primary-foreground/70">
                  Air Force Comprehensive School,<br />Yola, Adamawa State, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold" />
                <a href="mailto:alumni@afcsyola.edu.ng" className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">
                  alumni@afcsyola.edu.ng
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold" />
                <a href="tel:+2348012345678" className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">
                  +234 801 234 5678
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} AFCS YOLA Alumni Network. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-primary-foreground/60 hover:text-gold transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-primary-foreground/60 hover:text-gold transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
