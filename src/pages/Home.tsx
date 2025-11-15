import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sprout, ShoppingCart, Award, Shield, TrendingUp, FileText, IndianRupee, Leaf, Menu } from "lucide-react";

const Home = () => {
  const handleNavigation = (path) => {
    console.log(`Navigate to: ${path}`);
    // Router navigation would go here
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Sprout className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">Kisan Seva Portal</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <button className="text-foreground hover:text-primary transition-colors">Home</button>
              <button className="text-foreground hover:text-primary transition-colors">Schemes</button>
              <button className="text-foreground hover:text-primary transition-colors">Marketplace</button>
              <button className="text-foreground hover:text-primary transition-colors">Insurance</button>
              <button className="text-foreground hover:text-primary transition-colors">About</button>
              <Button size="sm">Login</Button>
            </div>
            <button className="md:hidden">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Kisan Seva Portal
              </h1>
              <p className="text-xl text-gray-600">
                Your Complete Agricultural Solution Platform
              </p>
              <p className="text-lg text-gray-700">
                Access government schemes, subsidies, crop insurance, and sell directly to buyers - all in one place.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700" onClick={() => handleNavigation('/schemes')}>
                  <Award className="mr-2 h-5 w-5" />
                  Government Schemes
                </Button>
                <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50" onClick={() => handleNavigation('/insurance')}>
                  <Shield className="mr-2 h-5 w-5" />
                  Crop Insurance
                </Button>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button size="lg" className="bg-green-600 hover:bg-green-700" onClick={() => handleNavigation('/farmer')}>
                  <Sprout className="mr-2 h-5 w-5" />
                  Farmer Portal
                </Button>
                <Button size="lg" variant="secondary" onClick={() => handleNavigation('/buyer')}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Buyer Portal
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-green-200 to-blue-200 rounded-2xl shadow-2xl w-full h-[400px] flex items-center justify-center">
                <div className="text-center p-8">
                  <Sprout className="h-32 w-32 text-green-700 mx-auto mb-4" />
                  <p className="text-2xl font-bold text-gray-800">Empowering Indian Farmers</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Leaf className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Empowering Farmers</div>
                    <div className="text-sm text-gray-600">One Stop Solution</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Platform Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything a farmer needs in one comprehensive platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Government Schemes & Subsidies</h3>
                <p className="text-gray-600">
                  Browse and apply for PM-KISAN, subsidies, and various government schemes. Get updates on eligibility and application status.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Crop Insurance (Bima)</h3>
                <p className="text-gray-600">
                  Access PMFBY (Pradhan Mantri Fasal Bima Yojana) and other insurance schemes. Protect your crops against natural calamities.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <ShoppingCart className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Direct Marketplace</h3>
                <p className="text-gray-600">
                  List your crops and connect directly with buyers. Get fair prices by eliminating middlemen from the supply chain.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <IndianRupee className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">MSP Information</h3>
                <p className="text-gray-600">
                  Stay updated with latest Minimum Support Prices (MSP) for various crops. Make informed decisions about your produce.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Documentation Support</h3>
                <p className="text-gray-600">
                  Easy access to application forms, guidelines, and documentation required for schemes and insurance claims.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Market Insights</h3>
                <p className="text-gray-600">
                  Get real-time market prices, demand trends, and agricultural news to help you make better business decisions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Why Choose Kisan Seva Portal?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sprout className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Farmer-Centric</h3>
                  <p className="text-gray-600">Designed specifically for Indian farmers with multilingual support and simple interface</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Secure & Trusted</h3>
                  <p className="text-gray-600">Your data is safe with us. Connected with government databases for authenticity</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <IndianRupee className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Better Income</h3>
                  <p className="text-gray-600">Maximize your earnings through direct sales and access to subsidies</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Easy Access</h3>
                  <p className="text-gray-600">All schemes, insurance, and marketplace in one convenient location</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-700">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl font-bold text-white">Ready to Get Started?</h2>
            <p className="text-xl text-green-50">
              Join thousands of farmers who are already benefiting from government schemes and selling directly to buyers.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100" onClick={() => handleNavigation('/register')}>
                Register as Farmer
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-green-800" onClick={() => handleNavigation('/about')}>
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Kisan Seva Portal. Empowering Indian Agriculture.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
