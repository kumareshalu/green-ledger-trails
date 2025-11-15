import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  QrCode, Leaf, Package, Truck, CheckCircle, Sprout, MapPin, 
  Calendar, Award, Thermometer, Droplets, Sun, Wind, Star,
  Share2, Download, Camera, X, ChevronRight, Clock, User,
  ShieldCheck, TrendingUp, Heart, MessageCircle, AlertCircle,
  Filter, Search, History, Map as MapIcon, BarChart3, Info
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const EnhancedConsumerDashboard = () => {
  const [scannedCrop, setScannedCrop] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [scanHistory, setScanHistory] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"journey" | "details" | "sustainability">("journey");
  const [rating, setRating] = useState(0);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock enhanced crop data
  const mockCrops = [
    {
      id: "CB001",
      cropName: "Organic Wheat",
      farmerName: "Raj Kumar Singh",
      location: "Punjab, Ludhiana",
      plantingDate: "2024-11-01",
      harvestDate: "2025-03-15",
      status: "delivered",
      progress: 100,
      certifications: ["Organic", "Fair Trade", "Non-GMO"],
      farmImage: "🌾",
      quality: {
        grade: "A+",
        pesticidesUsed: "None",
        fertilizerType: "Organic Compost",
        waterSource: "Drip Irrigation"
      },
      sustainability: {
        carbonFootprint: "Low",
        waterUsage: "Optimized",
        soilHealth: "Excellent",
        biodiversity: "Protected"
      },
      journey: [
        { date: "2024-11-01", stage: "Planted", location: "Punjab Farm", details: "Seeds planted in prepared soil", icon: Sprout },
        { date: "2024-12-15", stage: "Growing", location: "Punjab Farm", details: "Regular monitoring and organic care", icon: Leaf },
        { date: "2025-03-15", stage: "Harvested", location: "Punjab Farm", details: "Manual harvesting completed", icon: Package },
        { date: "2025-03-18", stage: "Quality Check", location: "Processing Unit", details: "Passed all quality standards", icon: ShieldCheck },
        { date: "2025-03-20", stage: "Packaged", location: "Distribution Center", details: "Food-grade packaging applied", icon: Package },
        { date: "2025-03-22", stage: "In Transit", location: "En Route", details: "Temperature-controlled transport", icon: Truck },
        { date: "2025-03-25", stage: "Delivered", location: "Retail Store", details: "Available for purchase", icon: CheckCircle }
      ],
      farmer: {
        experience: "15 years",
        farmSize: "5 acres",
        practices: ["Organic Farming", "Crop Rotation", "Natural Pest Control"],
        rating: 4.8,
        totalCrops: 45
      },
      nutrition: {
        protein: "12g per 100g",
        fiber: "11g per 100g",
        calories: "340 kcal per 100g",
        vitamins: "B-complex, E"
      },
      reviews: [
        { user: "Priya S.", rating: 5, comment: "Best quality wheat I've bought!", date: "2025-03-20" },
        { user: "Amit K.", rating: 5, comment: "Love the transparency. Great taste!", date: "2025-03-22" }
      ]
    },
    {
      id: "CB002",
      cropName: "Basmati Rice",
      farmerName: "Gurpreet Kaur",
      location: "Punjab, Amritsar",
      plantingDate: "2024-10-15",
      harvestDate: "2025-01-20",
      status: "delivered",
      progress: 100,
      certifications: ["Premium", "Export Quality"],
      farmImage: "🌾",
      quality: {
        grade: "A",
        pesticidesUsed: "Minimal (Approved)",
        fertilizerType: "Balanced NPK",
        waterSource: "Canal Irrigation"
      },
      sustainability: {
        carbonFootprint: "Medium",
        waterUsage: "Moderate",
        soilHealth: "Good",
        biodiversity: "Maintained"
      },
      journey: [
        { date: "2024-10-15", stage: "Planted", location: "Punjab Farm", details: "Premium Basmati seeds", icon: Sprout },
        { date: "2024-11-30", stage: "Growing", location: "Punjab Farm", details: "Optimal growth conditions", icon: Leaf },
        { date: "2025-01-20", stage: "Harvested", location: "Punjab Farm", details: "Peak maturity harvest", icon: Package },
        { date: "2025-01-25", stage: "Delivered", location: "Market", details: "Ready for consumers", icon: CheckCircle }
      ],
      farmer: {
        experience: "12 years",
        farmSize: "8 acres",
        practices: ["Traditional Methods", "Water Conservation"],
        rating: 4.6,
        totalCrops: 38
      },
      nutrition: {
        protein: "7g per 100g",
        fiber: "2g per 100g",
        calories: "350 kcal per 100g",
        vitamins: "B-vitamins"
      },
      reviews: [
        { user: "Rahul M.", rating: 4, comment: "Excellent aroma and texture", date: "2025-01-28" }
      ]
    }
  ];

  const handleScanQR = () => {
    const randomCrop = mockCrops[Math.floor(Math.random() * mockCrops.length)];
    setScannedCrop(randomCrop.id);
    setScanHistory(prev => [randomCrop.id, ...prev.filter(id => id !== randomCrop.id)].slice(0, 5));
    setShowCamera(false);
    setActiveTab("journey");
  };

  const handleManualSearch = () => {
    if (searchQuery) {
      const crop = mockCrops.find(c => c.id.toLowerCase() === searchQuery.toLowerCase());
      if (crop) {
        setScannedCrop(crop.id);
        setScanHistory(prev => [crop.id, ...prev.filter(id => id !== crop.id)].slice(0, 5));
        setActiveTab("journey");
      }
    }
  };

  const cropDetails = scannedCrop ? mockCrops.find(c => c.id === scannedCrop) : null;

  const getSustainabilityColor = (level: string) => {
    if (level === "Low" || level === "Excellent" || level === "Optimized" || level === "Protected") return "text-green-600";
    if (level === "Medium" || level === "Good" || level === "Moderate" || level === "Maintained") return "text-yellow-600";
    return "text-red-600";
  };

  const shareProduct = () => {
    if (navigator.share && cropDetails) {
      navigator.share({
        title: `${cropDetails.cropName} - Crop Chain`,
        text: `Check out this ${cropDetails.cropName} from ${cropDetails.farmerName}`,
        url: window.location.href
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 font-bold text-xl text-foreground">
              <QrCode className="h-6 w-6 text-primary" />
              Crop-Chain Consumer
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
                onClick={() => setScanHistory([])}
              >
                <History className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-foreground mb-2">Know Your Food</h1>
            <p className="text-muted-foreground text-lg">Scan to discover the complete journey from farm to table</p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-6">
            <Card>
              <CardContent className="pt-4 pb-4 text-center">
                <p className="text-2xl font-bold text-primary">1000+</p>
                <p className="text-xs text-muted-foreground">Verified Farms</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 pb-4 text-center">
                <p className="text-2xl font-bold text-primary">5000+</p>
                <p className="text-xs text-muted-foreground">Products Traced</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 pb-4 text-center">
                <p className="text-2xl font-bold text-primary">98%</p>
                <p className="text-xs text-muted-foreground">Trust Rating</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Scan Section */}
        {!scannedCrop && (
          <div className="max-w-2xl mx-auto space-y-6">
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="pt-8 pb-8">
                <div className="text-center space-y-6">
                  <div className="w-32 h-32 bg-primary/10 rounded-full mx-auto flex items-center justify-center animate-pulse">
                    <QrCode className="h-16 w-16 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Scan Product QR Code</h2>
                    <p className="text-muted-foreground max-w-lg mx-auto">
                      Point your camera at the QR code on your product packaging to view its complete farm-to-table journey
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button 
                      onClick={() => setShowCamera(true)} 
                      size="lg" 
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Camera className="mr-2 h-5 w-5" />
                      Open Camera
                    </Button>
                    <Button 
                      onClick={handleScanQR} 
                      size="lg" 
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary/10"
                    >
                      <QrCode className="mr-2 h-5 w-5" />
                      Try Demo Scan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Manual Search */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Search className="h-5 w-5" />
                  Search by Batch ID
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter Batch ID (e.g., CB001)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleManualSearch()}
                  />
                  <Button onClick={handleManualSearch} className="bg-primary hover:bg-primary/90">
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Scans */}
            {scanHistory.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <History className="h-5 w-5" />
                    Recent Scans
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {scanHistory.map((id) => {
                      const crop = mockCrops.find(c => c.id === id);
                      return crop ? (
                        <button
                          key={id}
                          onClick={() => setScannedCrop(id)}
                          className="w-full flex items-center justify-between p-3 hover:bg-secondary rounded-lg transition-colors text-left"
                        >
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{crop.farmImage}</div>
                            <div>
                              <p className="font-semibold text-foreground">{crop.cropName}</p>
                              <p className="text-sm text-muted-foreground">{crop.id}</p>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </button>
                      ) : null;
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* How It Works */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Info className="h-5 w-5" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
                      <span className="text-xl font-bold text-primary">1</span>
                    </div>
                    <p className="text-sm font-semibold">Scan QR Code</p>
                    <p className="text-xs text-muted-foreground">On product packaging</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
                      <span className="text-xl font-bold text-primary">2</span>
                    </div>
                    <p className="text-sm font-semibold">View Journey</p>
                    <p className="text-xs text-muted-foreground">Complete traceability</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
                      <span className="text-xl font-bold text-primary">3</span>
                    </div>
                    <p className="text-sm font-semibold">Trust & Buy</p>
                    <p className="text-xs text-muted-foreground">With confidence</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Camera Modal */}
        {showCamera && (
          <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCamera(false)}
          >
            <Card className="max-w-md w-full" onClick={(e) => e.stopPropagation()}>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Scan QR Code
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowCamera(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="aspect-square bg-secondary rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <QrCode className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Camera view would appear here</p>
                  </div>
                </div>
                <Button onClick={handleScanQR} className="w-full bg-primary hover:bg-primary/90">
                  Simulate Scan (Demo)
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Scanned Crop Details */}
        {cropDetails && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
            {/* Header Card */}
            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">{cropDetails.farmImage}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-2xl">{cropDetails.cropName}</CardTitle>
                        <button
                          onClick={() => setIsFavorite(!isFavorite)}
                          className="p-1 hover:bg-secondary rounded transition-colors"
                        >
                          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
                        </button>
                      </div>
                      <p className="text-muted-foreground mb-3">Batch ID: {cropDetails.id}</p>
                      <div className="flex flex-wrap gap-2">
                        {cropDetails.certifications.map((cert, idx) => (
                          <Badge key={idx} className="bg-green-500/10 text-green-700 border-green-300">
                            <Award className="h-3 w-3 mr-1" />
                            {cert}
                          </Badge>
                        ))}
                        <Badge className="bg-primary/10 text-primary border-primary/30">
                          <ShieldCheck className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={shareProduct}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setScannedCrop(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              {/* Quality Score */}
              <CardContent>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Quality Grade</span>
                    <span className="text-2xl font-bold text-green-600">{cropDetails.quality.grade}</span>
                  </div>
                  <Progress value={95} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground">Meets all quality and safety standards</p>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto">
              <Button
                variant={activeTab === "journey" ? "default" : "outline"}
                onClick={() => setActiveTab("journey")}
                className={activeTab === "journey" ? "bg-primary" : ""}
              >
                <MapIcon className="h-4 w-4 mr-2" />
                Journey
              </Button>
              <Button
                variant={activeTab === "details" ? "default" : "outline"}
                onClick={() => setActiveTab("details")}
                className={activeTab === "details" ? "bg-primary" : ""}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Details
              </Button>
              <Button
                variant={activeTab === "sustainability" ? "default" : "outline"}
                onClick={() => setActiveTab("sustainability")}
                className={activeTab === "sustainability" ? "bg-primary" : ""}
              >
                <Leaf className="h-4 w-4 mr-2" />
                Sustainability
              </Button>
            </div>

            {/* Journey Tab */}
            {activeTab === "journey" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapIcon className="h-5 w-5" />
                    Product Journey Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary to-transparent" />
                    
                    <div className="space-y-6">
                      {cropDetails.journey.map((step, index) => {
                        const Icon = step.icon;
                        const isLast = index === cropDetails.journey.length - 1;
                        return (
                          <div key={index} className="relative flex items-start gap-4 animate-in fade-in slide-in-from-left" style={{ animationDelay: `${index * 100}ms` }}>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 shadow-lg ${
                              isLast
                                ? "bg-primary text-primary-foreground animate-pulse" 
                                : "bg-primary text-primary-foreground"
                            }`}>
                              <Icon className="h-6 w-6" />
                            </div>
                            <div className="flex-1 pt-2">
                              <div className="bg-secondary/50 p-4 rounded-lg">
                                <div className="flex items-start justify-between mb-2">
                                  <h4 className="font-semibold text-foreground">{step.stage}</h4>
                                  <Badge variant="outline" className="text-xs">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {step.date}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground flex items-center gap-1 mb-1">
                                  <MapPin className="h-3 w-3" />
                                  {step.location}
                                </p>
                                <p className="text-sm text-foreground">{step.details}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Details Tab */}
            {activeTab === "details" && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Farmer Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Farmer Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{cropDetails.farmerName}</p>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-3 w-3 ${i < Math.floor(cropDetails.farmer.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">({cropDetails.farmer.rating})</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Experience</p>
                        <p className="font-medium text-foreground">{cropDetails.farmer.experience}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Farm Size</p>
                        <p className="font-medium text-foreground">{cropDetails.farmer.farmSize}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Location</p>
                        <p className="font-medium text-foreground">{cropDetails.location}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Total Crops</p>
                        <p className="font-medium text-foreground">{cropDetails.farmer.totalCrops}+</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-semibold mb-2">Farming Practices</p>
                      <div className="flex flex-wrap gap-2">
                        {cropDetails.farmer.practices.map((practice, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {practice}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quality & Nutrition */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Quality & Nutrition
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold mb-3">Quality Details</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Grade</span>
                          <span className="font-medium text-green-600">{cropDetails.quality.grade}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Pesticides</span>
                          <span className="font-medium">{cropDetails.quality.pesticidesUsed}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Fertilizer</span>
                          <span className="font-medium">{cropDetails.quality.fertilizerType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Water Source</span>
                          <span className="font-medium">{cropDetails.quality.waterSource}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t">
                      <p className="text-sm font-semibold mb-3">Nutritional Info (per 100g)</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-secondary/50 p-2 rounded">
                          <p className="text-xs text-muted-foreground">Protein</p>
                          <p className="font-medium">{cropDetails.nutrition.protein}</p>
                        </div>
                        <div className="bg-secondary/50 p-2 rounded">
                          <p className="text-xs text-muted-foreground">Fiber</p>
                          <p className="font-medium">{cropDetails.nutrition.fiber}</p>
                        </div>
                        <div className="bg-secondary/50 p-2 rounded">
                          <p className="text-xs text-muted-foreground">Calories</p>
                          <p className="font-medium">{cropDetails.nutrition.calories}</p>
                        </div>
                        <div className="bg-secondary/50 p-2 rounded">
                          <p className="text-xs text-muted-foreground">Vitamins</p>
                          <p className="font-medium text-xs">{cropDetails.nutrition.vitamins}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Reviews */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <MessageCircle className="h-5 w-5" />
                        Consumer Reviews
                      </CardTitle>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setShowRatingModal(true)}
                      >
                        Write Review
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {cropDetails.reviews.map((review, idx) => (
                        <div key={idx} className="bg-secondary/30 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="font-semibold text-sm">{review.user}</p>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <span className="text-xs text-muted-foreground">{review.date}</span>
                          </div>
                          <p className="text-sm text-foreground">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Sustainability Tab */}
            {activeTab === "sustainability" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Leaf className="h-5 w-5" />
                      Environmental Impact
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Wind className="h-8 w-8 text-green-600" />
                            <div>
                              <p className="text-sm text-muted-foreground">Carbon Footprint</p>
                              <p className={`font-semibold ${getSustainabilityColor(cropDetails.sustainability.carbonFootprint)}`}>
                                {cropDetails.sustainability.carbonFootprint}
                              </p>
                            </div>
                          </div>
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Droplets className="h-8 w-8 text-blue-600" />
                            <div>
                              <p className="text-sm text-muted-foreground">Water Usage</p>
                              <p className={`font-semibold ${getSustainabilityColor(cropDetails.sustainability.waterUsage)}`}>
                                {cropDetails.sustainability.waterUsage}
                              </p>
                            </div>
                          </div>
                          <CheckCircle className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Sprout className="h-8 w-8 text-green-600" />
                            <div>
                              <p className="text-sm text-muted-foreground">Soil Health</p>
                              <p className={`font-semibold ${getSustainabilityColor(cropDetails.sustainability.soilHealth)}`}>
                                {cropDetails.sustainability.soilHealth}
                              </p>
                            </div>
                          </div>
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Leaf className="h-8 w-8 text-green-600" />
                            <div>
                              <p className="text-sm text-muted-foreground">Biodiversity</p>
                              <p className={`font-semibold ${getSustainabilityColor(cropDetails.sustainability.biodiversity)}`}>
                                {cropDetails.sustainability.biodiversity}
                              </p>
                            </div>
                          </div>
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Sustainability Score */}
                <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 bg-green-500 rounded-full mx-auto flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">A+</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">Excellent Sustainability Score</h3>
                        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                          This product meets the highest environmental standards with minimal ecological impact. 
                          By choosing this product, you're supporting sustainable farming practices.
                        </p>
                      </div>
                      <div className="flex justify-center gap-4 pt-2">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">85%</p>
                          <p className="text-xs text-muted-foreground">Less Water</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">70%</p>
                          <p className="text-xs text-muted-foreground">Lower CO₂</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">100%</p>
                          <p className="text-xs text-muted-foreground">Organic</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SDG Goals */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      UN Sustainable Development Goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      This product contributes to the following UN SDG goals:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { num: 2, title: "Zero Hunger", color: "bg-yellow-500" },
                        { num: 12, title: "Responsible Consumption", color: "bg-orange-500" },
                        { num: 13, title: "Climate Action", color: "bg-green-600" },
                        { num: 15, title: "Life on Land", color: "bg-green-500" }
                      ].map((goal) => (
                        <div key={goal.num} className="text-center p-3 bg-secondary/30 rounded-lg">
                          <div className={`w-12 h-12 ${goal.color} rounded-full mx-auto flex items-center justify-center text-white font-bold text-lg mb-2`}>
                            {goal.num}
                          </div>
                          <p className="text-xs font-medium">{goal.title}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Trust Indicators */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6 text-center">
                  <div className="bg-green-500/20 w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-3">
                    <ShieldCheck className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">100% Authentic</h4>
                  <p className="text-xs text-muted-foreground">
                    Blockchain-verified supply chain records
                  </p>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-6 text-center">
                  <div className="bg-blue-500/20 w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-3">
                    <Leaf className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">Eco-Friendly</h4>
                  <p className="text-xs text-muted-foreground">
                    Sustainable farming practices certified
                  </p>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-purple-50">
                <CardContent className="pt-6 text-center">
                  <div className="bg-purple-500/20 w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-3">
                    <Award className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">Premium Quality</h4>
                  <p className="text-xs text-muted-foreground">
                    Rigorous quality control at every stage
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setScannedCrop(null)}
              >
                <QrCode className="mr-2 h-4 w-4" />
                Scan Another Product
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  const dataStr = JSON.stringify(cropDetails, null, 2);
                  const blob = new Blob([dataStr], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `${cropDetails.id}-details.json`;
                  link.click();
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
              <Button 
                variant="outline"
                onClick={shareProduct}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        )}

        {/* Rating Modal */}
        {showRatingModal && (
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowRatingModal(false)}
          >
            <Card className="max-w-md w-full" onClick={(e) => e.stopPropagation()}>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Rate This Product
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowRatingModal(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-3">How would you rate this product?</p>
                  <div className="flex justify-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star 
                          className={`h-8 w-8 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label>Your Review (Optional)</Label>
                  <textarea 
                    className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background mt-2"
                    placeholder="Share your experience with this product..."
                  />
                </div>

                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-primary hover:bg-primary/90"
                    onClick={() => {
                      setShowRatingModal(false);
                      setRating(0);
                    }}
                  >
                    Submit Review
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setShowRatingModal(false);
                      setRating(0);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedConsumerDashboard;
