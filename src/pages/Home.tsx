import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, ShoppingCart, Award, Shield, TrendingUp, FileText, IndianRupee, Leaf, Menu, X, Search, Filter, CheckCircle, Clock, MapPin, Phone, Mail, Calendar, Package, AlertCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { farmerImages } from "@/assets/farmerImages";


// Mock Data
const mockSchemes = [
  {
    id: 1,
    name: "PM-KISAN",
    description: "Direct income support of ₹6000 per year to all farmer families",
    eligibility: "All landholding farmers",
    amount: "₹6,000/year",
    status: "Active",
    deadline: "2024-12-31"
  },
  {
    id: 2,
    name: "Kisan Credit Card",
    description: "Short term credit support for crop cultivation",
    eligibility: "Farmers with cultivable land",
    amount: "Up to ₹3 Lakhs",
    status: "Active",
    deadline: "2024-11-30"
  },
  {
    id: 3,
    name: "PM Fasal Bima Yojana",
    description: "Crop insurance scheme for farmers",
    eligibility: "All farmers growing notified crops",
    amount: "Premium subsidy",
    status: "Active",
    deadline: "2024-12-15"
  },
  {
    id: 4,
    name: "Soil Health Card Scheme",
    description: "Free soil testing and health card",
    eligibility: "All farmers",
    amount: "Free",
    status: "Active",
    deadline: "Ongoing"
  }
];

const mockInsurance = [
  {
    id: 1,
    name: "PMFBY - Kharif Season",
    crop: "Paddy, Cotton, Soybean",
    premium: "2% of sum insured",
    coverage: "Up to ₹50,000/hectare",
    season: "Kharif 2024"
  },
  {
    id: 2,
    name: "PMFBY - Rabi Season",
    crop: "Wheat, Mustard, Chickpea",
    premium: "1.5% of sum insured",
    coverage: "Up to ₹40,000/hectare",
    season: "Rabi 2024-25"
  },
  {
    id: 3,
    name: "Weather Based Insurance",
    crop: "All crops",
    premium: "3% of sum insured",
    coverage: "Based on weather parameters",
    season: "Year-round"
  }
];

const mockMarketplace = [
  {
    id: 1,
    crop: "Wheat",
    quantity: "50 Quintals",
    price: "₹2,200/quintal",
    location: "Meerut, UP",
    farmer: "Ramesh Kumar",
    phone: "+91 98765 43210",
    posted: "2 days ago"
  },
  {
    id: 2,
    crop: "Rice (Basmati)",
    quantity: "100 Quintals",
    price: "₹4,500/quintal",
    location: "Karnal, Haryana",
    farmer: "Suresh Singh",
    phone: "+91 98765 43211",
    posted: "1 day ago"
  },
  {
    id: 3,
    crop: "Cotton",
    quantity: "30 Quintals",
    price: "₹6,800/quintal",
    location: "Guntur, AP",
    farmer: "Venkat Rao",
    phone: "+91 98765 43212",
    posted: "3 hours ago"
  },
  {
    id: 4,
    crop: "Sugarcane",
    quantity: "200 Quintals",
    price: "₹350/quintal",
    location: "Muzaffarnagar, UP",
    farmer: "Ajay Sharma",
    phone: "+91 98765 43213",
    posted: "5 hours ago"
  }
];

const mockMSP = [
  { crop: "Paddy (Common)", msp: "₹2,183/quintal", change: "+7.4%" },
  { crop: "Paddy (Grade A)", msp: "₹2,203/quintal", change: "+7.3%" },
  { crop: "Wheat", msp: "₹2,275/quintal", change: "+6.6%" },
  { crop: "Cotton", msp: "₹6,620/quintal", change: "+5.7%" },
  { crop: "Sugarcane", msp: "₹340/quintal", change: "+4.4%" },
  { crop: "Mustard", msp: "₹5,650/quintal", change: "+8.2%" }
];

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [farmerListings, setFarmerListings] = useState([]);
  const [newListing, setNewListing] = useState({
    crop: '',
    quantity: '',
    price: '',
    location: ''
  });

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleApplyScheme = (scheme) => {
    setSelectedScheme(scheme);
    alert(`Application submitted for ${scheme.name}!\n\nYou will receive a confirmation email shortly with next steps.`);
  };

  const handleApplyInsurance = (insurance) => {
    alert(`Insurance application submitted for ${insurance.name}!\n\nPremium: ${insurance.premium}\nCoverage: ${insurance.coverage}\n\nAn agent will contact you within 24 hours.`);
  };

  const handleContactSeller = (listing) => {
    alert(`Contact Details:\n\nFarmer: ${listing.farmer}\nPhone: ${listing.phone}\nCrop: ${listing.crop}\nQuantity: ${listing.quantity}\nPrice: ${listing.price}\nLocation: ${listing.location}`);
  };

  const handleAddListing = (e) => {
    e.preventDefault();
    if (newListing.crop && newListing.quantity && newListing.price && newListing.location) {
      const listing = {
        id: Date.now(),
        crop: newListing.crop,
        quantity: newListing.quantity,
        price: newListing.price,
        location: newListing.location,
        farmer: "Your Name",
        phone: "+91 XXXXX XXXXX",
        posted: "Just now"
      };
      setFarmerListings([listing, ...farmerListings]);
      setNewListing({ crop: '', quantity: '', price: '', location: '' });
      alert('Your listing has been posted successfully!');
    }
  };

  // Navigation Component
  const Navigation = () => (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigation('home')}>
            <Sprout className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-900">Kisan Seva Portal</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => handleNavigation('home')} className="text-gray-700 hover:text-green-600 transition-colors">Home</button>
            <button onClick={() => handleNavigation('schemes')} className="text-gray-700 hover:text-green-600 transition-colors">Schemes</button>
            <button onClick={() => handleNavigation('insurance')} className="text-gray-700 hover:text-green-600 transition-colors">Insurance</button>
            <button onClick={() => handleNavigation('marketplace')} className="text-gray-700 hover:text-green-600 transition-colors">Marketplace</button>
            <button onClick={() => handleNavigation('msp')} className="text-gray-700 hover:text-green-600 transition-colors">MSP</button>
            <Button size="sm" onClick={() => handleNavigation('login')}>Login</Button>
          </div>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t">
            <button onClick={() => handleNavigation('home')} className="block w-full text-left px-4 py-2 hover:bg-gray-50">Home</button>
            <button onClick={() => handleNavigation('schemes')} className="block w-full text-left px-4 py-2 hover:bg-gray-50">Schemes</button>
            <button onClick={() => handleNavigation('insurance')} className="block w-full text-left px-4 py-2 hover:bg-gray-50">Insurance</button>
            <button onClick={() => handleNavigation('marketplace')} className="block w-full text-left px-4 py-2 hover:bg-gray-50">Marketplace</button>
            <button onClick={() => handleNavigation('msp')} className="block w-full text-left px-4 py-2 hover:bg-gray-50">MSP</button>
            <button onClick={() => handleNavigation('login')} className="block w-full text-left px-4 py-2 hover:bg-gray-50">Login</button>
          </div>
        )}
      </div>
    </nav>
  );

  // Home Page
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-green-100 to-amber-200">
      {/* Helpline Banner */}
      <div className="w-full bg-gradient-to-r from-yellow-400 via-green-300 to-amber-400 border-b-4 border-green-700 py-4 flex items-center justify-center gap-4 text-xl font-bold text-brown-900 shadow-lg">
        <span role="img" aria-label="phone">📞</span> किसान हेल्पलाइन: <span className="text-green-900">1800-XXX-XXXX</span>
        <Button size="lg" className="bg-green-800 text-white px-6 py-2 rounded-xl shadow-md border-2 border-green-900" onClick={() => window.open('https://wa.me/919876543210')}>WhatsApp सहायता</Button>
      </div>
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-green-50 to-amber-100 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-6xl md:text-7xl font-extrabold text-green-900 leading-tight drop-shadow-lg">
                किसान सेवा पोर्टल <span className="block text-4xl text-amber-900 mt-2">Kisan Seva Portal</span>
              </h1>
              <p className="text-3xl text-green-800 font-bold drop-shadow">
                आपकी खेती, आपकी तरक्की!
                <span className="block text-xl text-gray-800 mt-2">Your Complete Agricultural Solution Platform</span>
              </p>
              <p className="text-xl text-amber-900 font-semibold">
                सरकारी योजनाएँ, बीमा, मंडी भाव, और सीधा बाजार – सब एक जगह!
              </p>
              <div className="flex flex-wrap gap-6 pt-4">
                <Button size="lg" className="bg-green-800 hover:bg-green-900 text-2xl font-bold rounded-xl shadow-md px-8 py-3" onClick={() => handleNavigation('schemes')}>
                  <Award className="mr-3 h-7 w-7" />
                  सरकारी योजनाएँ / Schemes
                </Button>
                <Button size="lg" variant="outline" className="border-green-800 text-green-800 hover:bg-green-50 text-2xl font-bold rounded-xl shadow-md px-8 py-3" onClick={() => handleNavigation('insurance')}>
                  <Shield className="mr-3 h-7 w-7" />
                  फसल बीमा / Insurance
                </Button>
              </div>
              <div className="flex flex-wrap gap-6 pt-2">
                <Button size="lg" className="bg-amber-700 hover:bg-amber-800 text-2xl font-bold rounded-xl shadow-md px-8 py-3" onClick={() => handleNavigation('farmer')}>
                  <Sprout className="mr-3 h-7 w-7" />
                  किसान पोर्टल / Farmer
                </Button>
                <Button size="lg" variant="secondary" className="text-2xl font-bold rounded-xl shadow-md px-8 py-3 bg-white border-2 border-amber-700 text-amber-900" onClick={() => handleNavigation('marketplace')}>
                  <ShoppingCart className="mr-3 h-7 w-7" />
                  मंडी / Marketplace
                </Button>
              </div>
              <div className="pt-4">
                <span className="text-lg text-green-900 font-bold">🌾 खेती में मदद चाहिए? कॉल करें या WhatsApp करें!</span>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-yellow-300 via-green-200 to-amber-300 rounded-3xl shadow-2xl w-full h-[420px] flex items-center justify-center border-4 border-green-700">
                <div className="text-center p-10">
                  <Sprout className="h-36 w-36 text-green-800 mx-auto mb-6 drop-shadow-lg" />
                  <p className="text-4xl font-extrabold text-green-900 drop-shadow">Empowering Indian Farmers</p>
                  <p className="text-2xl text-amber-900 mt-4 font-bold">भारत के किसानों के लिए</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Platform Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything a farmer needs in one comprehensive platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigation('schemes')}>
              <CardContent className="pt-6">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Government Schemes</h3>
                <p className="text-gray-600">
                  Browse and apply for PM-KISAN, subsidies, and various government schemes.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigation('insurance')}>
              <CardContent className="pt-6">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Crop Insurance</h3>
                <p className="text-gray-600">
                  Access PMFBY and protect your crops against natural calamities.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigation('marketplace')}>
              <CardContent className="pt-6">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <ShoppingCart className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Direct Marketplace</h3>
                <p className="text-gray-600">
                  List your crops and connect directly with buyers.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigation('msp')}>
              <CardContent className="pt-6">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <IndianRupee className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">MSP Information</h3>
                <p className="text-gray-600">
                  Stay updated with latest Minimum Support Prices.
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
                  Easy access to application forms and guidelines.
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
                  Get real-time market prices and demand trends.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );

  // Schemes Page
  const SchemesPage = () => (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Government Schemes</h1>
          <p className="text-xl text-gray-600">Browse and apply for various agricultural schemes and subsidies</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {mockSchemes.map(scheme => (
            <Card key={scheme.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{scheme.name}</span>
                  <span className="text-sm font-normal bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    {scheme.status}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{scheme.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-semibold">Eligibility:</span>
                    <span className="text-gray-600">{scheme.eligibility}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <IndianRupee className="h-4 w-4 text-green-600" />
                    <span className="font-semibold">Amount:</span>
                    <span className="text-gray-600">{scheme.amount}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-green-600" />
                    <span className="font-semibold">Deadline:</span>
                    <span className="text-gray-600">{scheme.deadline}</span>
                  </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleApplyScheme(scheme)}>
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  // Insurance Page
  const InsurancePage = () => (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Crop Insurance (Bima)</h1>
          <p className="text-xl text-gray-600">Protect your crops with government-backed insurance schemes</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockInsurance.map(insurance => (
            <Card key={insurance.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  {insurance.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-semibold">Crops:</span>
                    <p className="text-gray-600">{insurance.crop}</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Premium:</span>
                    <p className="text-gray-600">{insurance.premium}</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Coverage:</span>
                    <p className="text-gray-600">{insurance.coverage}</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Season:</span>
                    <p className="text-gray-600">{insurance.season}</p>
                  </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleApplyInsurance(insurance)}>
                  Apply for Insurance
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <AlertCircle className="h-6 w-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Important Information</h3>
                <p className="text-gray-700 text-sm">
                  Crop insurance must be purchased before sowing season. Government provides subsidy on premium. 
                  Claims are processed automatically based on crop cutting experiments and weather data.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Marketplace Page
  const MarketplacePage = () => (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Direct Marketplace</h1>
          <p className="text-xl text-gray-600">Connect directly with buyers and get fair prices for your produce</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {[...mockMarketplace, ...farmerListings].map(listing => (
            <Card key={listing.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-green-600" />
                  {listing.crop}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-semibold">{listing.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-semibold text-green-600">{listing.price}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                    <span className="text-gray-600">{listing.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{listing.posted}</span>
                  </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleContactSeller(listing)}>
                  <Phone className="mr-2 h-4 w-4" />
                  Contact Seller
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  // Farmer Portal Page
  const FarmerPortalPage = () => (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Farmer Portal</h1>
          <p className="text-xl text-gray-600">List your produce for sale</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create New Listing</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddListing} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Crop Name</label>
                <input
                  type="text"
                  value={newListing.crop}
                  onChange={(e) => setNewListing({...newListing, crop: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., Wheat, Rice, Cotton"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                <input
                  type="text"
                  value={newListing.quantity}
                  onChange={(e) => setNewListing({...newListing, quantity: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., 50 Quintals"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price per Quintal</label>
                <input
                  type="text"
                  value={newListing.price}
                  onChange={(e) => setNewListing({...newListing, price: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., ₹2,200/quintal"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={newListing.location}
                  onChange={(e) => setNewListing({...newListing, location: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., Meerut, UP"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Post Listing
              </Button>
            </form>
          </CardContent>
        </Card>

        {farmerListings.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Listings</h2>
            <div className="space-y-4">
              {farmerListings.map(listing => (
                <Card key={listing.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{listing.crop}</h3>
                        <p className="text-gray-600">{listing.quantity} • {listing.price}</p>
                        <p className="text-sm text-gray-500">{listing.location}</p>
                      </div>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        Active
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // MSP Page
  const MSPPage = () => (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Minimum Support Price (MSP)</h1>
          <p className="text-xl text-gray-600">Latest MSP rates for various crops</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Current MSP Rates 2024-25</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockMSP.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.crop}</h3>
                    <p className="text-2xl font-bold text-green-600 mt-1">{item.msp}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-600">Change</span>
                    <p className="text-lg font-semibold text-green-600">{item.change}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <AlertCircle className="h-6 w-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">About MSP</h3>
                <p className="text-gray-700 text-sm">
                  Minimum Support Price (MSP) is the guaranteed price set by the government to protect farmers from 
                  price fluctuations. The government purchases crops at MSP through procurement agencies like FCI.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Login Page
  const LoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">Login to Kisan Seva Portal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
              <input
                type="tel"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter 10-digit mobile number"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter password"
              />
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Login
            </Button>
            <div className="text-center">
              <button className="text-green-600 hover:underline text-sm">Forgot Password?</button>
            </div>
            <div className="text-center pt-4 border-t">
              <p className="text-sm text-gray-600 mb-3">Don't have an account?</p>
              <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50" onClick={() => handleNavigation('register')}>
                Register as Farmer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Register Page
  const RegisterPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">Register as Farmer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="10-digit mobile"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email (Optional)</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter email"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option>Select State</option>
                  <option>Uttar Pradesh</option>
                  <option>Punjab</option>
                  <option>Haryana</option>
                  <option>Madhya Pradesh</option>
                  <option>Rajasthan</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">District</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter district"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Land Area (in acres)</label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter land area"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Aadhar Number</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="12-digit Aadhar number"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Create Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter password"
              />
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => {
              alert('Registration successful! You can now login to access all features.');
              handleNavigation('login');
            }}>
              Register
            </Button>
            <div className="text-center">
              <button onClick={() => handleNavigation('login')} className="text-green-600 hover:underline text-sm">
                Already have an account? Login
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Footer Component
  const Footer = () => (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sprout className="h-6 w-6 text-green-500" />
              <span className="text-lg font-bold text-white">Kisan Seva Portal</span>
            </div>
            <p className="text-sm text-gray-400">
              Empowering Indian farmers with technology and direct market access.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <button onClick={() => handleNavigation('home')} className="block hover:text-green-500">Home</button>
              <button onClick={() => handleNavigation('schemes')} className="block hover:text-green-500">Schemes</button>
              <button onClick={() => handleNavigation('insurance')} className="block hover:text-green-500">Insurance</button>
              <button onClick={() => handleNavigation('marketplace')} className="block hover:text-green-500">Marketplace</button>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Support</h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                1800-XXX-XXXX (Toll Free)
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                support@kisanseva.gov.in
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Connect</h3>
            <p className="text-sm text-gray-400">
              Follow us for updates on schemes, market prices, and agricultural news.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-sm">
          <p>&copy; 2024 Kisan Seva Portal. Empowering Indian Agriculture.</p>
        </div>
      </div>
    </footer>
  );

  // Main Render
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'schemes' && <SchemesPage />}
      {currentPage === 'insurance' && <InsurancePage />}
      {currentPage === 'marketplace' && <MarketplacePage />}
      {currentPage === 'farmer' && <FarmerPortalPage />}
      {currentPage === 'msp' && <MSPPage />}
      {currentPage === 'login' && <LoginPage />}
      {currentPage === 'register' && <RegisterPage />}
      <Footer />
    </div>
  );
};

export default App;
