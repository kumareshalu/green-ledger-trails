import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sprout, ShoppingCart, User, QrCode, Shield, TrendingUp, ChevronDown, CheckCircle, BarChart3, Lock, Zap, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const EnhancedHome = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({
    farmers: 0,
    crops: 0,
    consumers: 0
  });

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animated statistics counter
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;
    
    const targets = { farmers: 1250, crops: 8500, consumers: 15000 };
    let current = { farmers: 0, crops: 0, consumers: 0 };
    
    const timer = setInterval(() => {
      current = {
        farmers: Math.min(current.farmers + targets.farmers / steps, targets.farmers),
        crops: Math.min(current.crops + targets.crops / steps, targets.crops),
        consumers: Math.min(current.consumers + targets.consumers / steps, targets.consumers)
      };
      
      setStats({
        farmers: Math.floor(current.farmers),
        crops: Math.floor(current.crops),
        consumers: Math.floor(current.consumers)
      });
      
      if (current.farmers >= targets.farmers) clearInterval(timer);
    }, increment);
    
    return () => clearInterval(timer);
  }, []);

  // Auto-rotate features
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      icon: Sprout,
      title: "Crop Tracking",
      description: "Register and monitor crop batches from planting to harvest. Track growth stages and receive updates in real-time.",
      benefits: ["Real-time monitoring", "Growth stage tracking", "Harvest predictions"]
    },
    {
      icon: QrCode,
      title: "QR Traceability",
      description: "Generate unique QR codes for each batch. Consumers can scan to see complete farm-to-table journey.",
      benefits: ["Instant verification", "Complete transparency", "Consumer trust"]
    },
    {
      icon: TrendingUp,
      title: "Payment Tracking",
      description: "Monitor advance payments and final settlements. Transparent financial flow between farmers and buyers.",
      benefits: ["Secure transactions", "Payment visibility", "Financial analytics"]
    }
  ];

  const benefits = [
    { icon: Shield, title: "Blockchain Security", desc: "Immutable records" },
    { icon: CheckCircle, title: "Verified Quality", desc: "Certified products" },
    { icon: BarChart3, title: "Data Analytics", desc: "Insightful reports" },
    { icon: Lock, title: "Privacy Protected", desc: "Your data is safe" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 font-bold text-xl text-foreground">
              <Sprout className="h-6 w-6 text-primary" />
              Crop-Chain
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-foreground hover:text-primary transition-colors">Features</a>
              <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">How It Works</a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
              <Button size="sm" className="bg-primary hover:bg-primary/90">Get Started</Button>
            </div>
            
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col gap-4">
                <a href="#features" className="text-foreground hover:text-primary transition-colors">Features</a>
                <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">How It Works</a>
                <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
                <Button size="sm" className="bg-primary hover:bg-primary/90 w-full">Get Started</Button>
              </div>
            </div>
          )}
        </div>
      </nav>
      
      {/* Hero Section with Parallax */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 z-0"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                  🌱 Trusted by 1000+ Farmers
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Crop-Chain Smart Ledger
              </h1>
              <p className="text-xl text-muted-foreground">
                A Transparent Farm-to-Table Traceability Platform
              </p>
              <p className="text-lg text-foreground/80">
                Connecting farmers, buyers, and consumers through digital transparency.
                Track your food from seed to plate with blockchain-powered security.
              </p>
              
              {/* Statistics */}
              <div className="grid grid-cols-3 gap-4 pt-4 pb-2">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{stats.farmers}+</div>
                  <div className="text-sm text-muted-foreground">Farmers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{stats.crops}+</div>
                  <div className="text-sm text-muted-foreground">Crops Tracked</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{stats.consumers}+</div>
                  <div className="text-sm text-muted-foreground">Consumers</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all">
                  <Sprout className="mr-2 h-5 w-5" />
                  Farmer Portal
                </Button>
                <Button size="lg" variant="secondary" className="shadow-lg hover:shadow-xl transition-all">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Buyer Portal
                </Button>
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 transition-all">
                  <User className="mr-2 h-5 w-5" />
                  Consumer Portal
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="rounded-2xl shadow-2xl w-full h-[400px] bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center hover:scale-105 transition-transform duration-500">
                <div className="text-center text-green-800">
                  <Sprout className="h-32 w-32 mx-auto mb-4" />
                  <p className="text-xl font-semibold">Sustainable Farming</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-lg border border-border backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground">100% Traceable</div>
                    <div className="text-sm text-muted-foreground">Farm to Table</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <button 
          onClick={scrollToFeatures}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors"
          aria-label="Scroll to features"
        >
          <ChevronDown className="h-6 w-6 text-primary" />
        </button>
      </section>

      {/* Benefits Bar */}
      <section className="py-8 bg-primary/5 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-3 justify-center">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <benefit.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-foreground">{benefit.title}</div>
                  <div className="text-xs text-muted-foreground">{benefit.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Interactive Cards */}
      <section id="features" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Platform Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Empowering the agricultural supply chain with transparency and trust
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Card 
                key={idx}
                className={`border-border hover:shadow-lg transition-all duration-300 cursor-pointer ${
                  activeFeature === idx ? 'ring-2 ring-primary shadow-xl scale-105' : ''
                }`}
                onMouseEnter={() => setActiveFeature(idx)}
              >
                <CardContent className="pt-6">
                  <div className={`bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform ${
                    activeFeature === idx ? 'scale-110' : ''
                  }`}>
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, bidx) => (
                      <div key={bidx} className="flex items-center gap-2 text-sm text-foreground/70">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Feature Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {features.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFeature(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeFeature === idx ? 'bg-primary w-8' : 'bg-primary/30'
                }`}
                aria-label={`View feature ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple steps to transparent agriculture
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Register", desc: "Farmers register their crops on the platform" },
              { step: "2", title: "Track", desc: "Monitor growth and supply chain updates" },
              { step: "3", title: "Verify", desc: "Buyers verify quality and make purchases" },
              { step: "4", title: "Scan", desc: "Consumers scan QR codes for full transparency" }
            ].map((item, idx) => (
              <div key={idx} className="text-center relative">
                <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-primary/20" 
                       style={{ transform: 'translateX(-50%)' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Enhanced Design */}
      <section id="about" className="py-20 bg-gradient-to-br from-primary/10 to-accent/5">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Zap className="inline h-4 w-4 mr-1" />
              Join the Revolution
            </div>
            <h2 className="text-4xl font-bold text-foreground">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground">
              Join the transparent agriculture revolution. Choose your role and experience the future of farm-to-table tracking.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Learn More About Us
              </Button>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Get Started Today
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 bg-secondary/50 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Crop-Chain Smart Ledger. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default EnhancedHome;
