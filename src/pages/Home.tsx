import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Sprout, ShoppingCart, User, QrCode, Shield, TrendingUp } from "lucide-react";
import farmHero from "@/assets/farm-hero.jpg";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Crop-Chain Smart Ledger
              </h1>
              <p className="text-xl text-muted-foreground">
                A Transparent Farm-to-Table Traceability Platform
              </p>
              <p className="text-lg text-foreground/80">
                Connecting farmers, buyers, and consumers through digital transparency.
                Track your food from seed to plate.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/farmer">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Sprout className="mr-2 h-5 w-5" />
                    Farmer Portal
                  </Button>
                </Link>
                <Link to="/buyer">
                  <Button size="lg" variant="secondary">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Buyer Portal
                  </Button>
                </Link>
                <Link to="/consumer">
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    <User className="mr-2 h-5 w-5" />
                    Consumer Portal
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src={farmHero}
                alt="Sustainable farming"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-lg border border-border">
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
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Platform Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Empowering the agricultural supply chain with transparency and trust
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Sprout className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Crop Tracking</h3>
                <p className="text-muted-foreground">
                  Register and monitor crop batches from planting to harvest. Track growth stages and receive updates in real-time.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <QrCode className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">QR Traceability</h3>
                <p className="text-muted-foreground">
                  Generate unique QR codes for each batch. Consumers can scan to see complete farm-to-table journey.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Payment Tracking</h3>
                <p className="text-muted-foreground">
                  Monitor advance payments and final settlements. Transparent financial flow between farmers and buyers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl font-bold text-foreground">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground">
              Join the transparent agriculture revolution. Choose your role and experience the future of farm-to-table tracking.
            </p>
            <Link to="/about">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
