import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Sprout, Plus, QrCode, IndianRupee, TrendingUp, Filter, Search, 
  Download, Bell, Calendar, MapPin, Droplets, Sun, AlertCircle,
  CheckCircle, Clock, BarChart3, Eye, Edit, Trash2, X, Menu,
  ChevronDown, Upload, FileText, ArrowUpRight, DollarSign
} from "lucide-react";

const EnhancedFarmerDashboard = () => {
  const [showNewCropForm, setShowNewCropForm] = useState(false);
  const [selectedQR, setSelectedQR] = useState<string | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [showFilters, setShowFilters] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const [formData, setFormData] = useState({
    cropName: "",
    plantingDate: "",
    location: "",
    area: "",
    variety: "",
    expectedYield: "",
    irrigationType: "drip"
  });

  // Mock data with enhanced details
  const [cropBatches, setCropBatches] = useState([
    {
      id: "CB001",
      cropName: "Wheat",
      plantingDate: "2024-11-01",
      location: "Punjab, Ludhiana",
      status: "growing",
      progress: 65,
      paymentStatus: "advance_paid",
      area: "5 acres",
      variety: "PBW-343",
      expectedYield: "25 quintals/acre",
      expectedHarvest: "2025-03-15",
      irrigationType: "drip",
      weather: { temp: "22°C", humidity: "65%", rainfall: "Low" },
      activities: [
        { date: "2024-11-01", activity: "Planting completed", type: "planting" },
        { date: "2024-11-15", activity: "First irrigation", type: "irrigation" },
        { date: "2024-12-01", activity: "Fertilizer applied", type: "fertilizer" }
      ],
      buyer: "AgriCorp Ltd",
      advanceAmount: 50000,
      totalAmount: 125000
    },
    {
      id: "CB002",
      cropName: "Rice",
      plantingDate: "2024-10-15",
      location: "Punjab, Amritsar",
      status: "harvested",
      progress: 100,
      paymentStatus: "completed",
      area: "8 acres",
      variety: "Basmati 1121",
      expectedYield: "30 quintals/acre",
      expectedHarvest: "2025-01-20",
      irrigationType: "flood",
      weather: { temp: "25°C", humidity: "70%", rainfall: "Medium" },
      activities: [
        { date: "2024-10-15", activity: "Planting completed", type: "planting" },
        { date: "2025-01-20", activity: "Harvested", type: "harvest" }
      ],
      buyer: "Export Foods Inc",
      advanceAmount: 80000,
      totalAmount: 240000
    },
    {
      id: "CB003",
      cropName: "Cotton",
      plantingDate: "2024-11-20",
      location: "Punjab, Bathinda",
      status: "planted",
      progress: 25,
      paymentStatus: "pending",
      area: "6 acres",
      variety: "Bt Cotton",
      expectedYield: "20 quintals/acre",
      expectedHarvest: "2025-05-10",
      irrigationType: "sprinkler",
      weather: { temp: "20°C", humidity: "60%", rainfall: "Low" },
      activities: [
        { date: "2024-11-20", activity: "Planting completed", type: "planting" }
      ],
      buyer: "Textile Mills Ltd",
      advanceAmount: 0,
      totalAmount: 120000
    }
  ]);

  const [insights, setInsights] = useState({
    totalRevenue: 0,
    pendingPayments: 0,
    activeWarnings: 2,
    upcomingHarvests: 1
  });

  // Calculate insights
  useEffect(() => {
    const totalRev = cropBatches.reduce((sum, crop) => 
      crop.paymentStatus === "completed" ? sum + crop.totalAmount : sum, 0
    );
    const pending = cropBatches.reduce((sum, crop) => 
      crop.paymentStatus === "pending" ? sum + crop.totalAmount : sum, 0
    );
    
    setInsights({
      totalRevenue: totalRev,
      pendingPayments: pending,
      activeWarnings: 2,
      upcomingHarvests: cropBatches.filter(c => c.status === "growing").length
    });
  }, [cropBatches]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCrop = {
      id: `CB${String(cropBatches.length + 1).padStart(3, '0')}`,
      ...formData,
      status: "planted",
      progress: 0,
      paymentStatus: "pending",
      activities: [
        { date: formData.plantingDate, activity: "Planting completed", type: "planting" }
      ],
      weather: { temp: "22°C", humidity: "65%", rainfall: "Low" },
      buyer: "",
      advanceAmount: 0,
      totalAmount: 0,
      expectedHarvest: new Date(new Date(formData.plantingDate).setMonth(new Date(formData.plantingDate).getMonth() + 4)).toISOString().split('T')[0]
    };
    
    setCropBatches([newCrop, ...cropBatches]);
    setShowNewCropForm(false);
    setFormData({ 
      cropName: "", 
      plantingDate: "", 
      location: "", 
      area: "", 
      variety: "", 
      expectedYield: "",
      irrigationType: "drip"
    });
  };

  const handleGenerateQR = (cropId: string) => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${cropId}`;
    setSelectedQR(qrUrl);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planted": return "bg-blue-500/10 text-blue-700 border-blue-300";
      case "growing": return "bg-green-500/10 text-green-700 border-green-300";
      case "harvested": return "bg-purple-500/10 text-purple-700 border-purple-300";
      default: return "bg-gray-500/10 text-gray-700 border-gray-300";
    }
  };

  const getPaymentColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500/10 text-yellow-700 border-yellow-300";
      case "advance_paid": return "bg-blue-500/10 text-blue-700 border-blue-300";
      case "completed": return "bg-green-500/10 text-green-700 border-green-300";
      default: return "bg-gray-500/10 text-gray-700 border-gray-300";
    }
  };

  // Filter and sort crops
  const filteredCrops = cropBatches
    .filter(crop => {
      const matchesStatus = filterStatus === "all" || crop.status === filterStatus;
      const matchesSearch = crop.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           crop.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "recent") return new Date(b.plantingDate).getTime() - new Date(a.plantingDate).getTime();
      if (sortBy === "progress") return b.progress - a.progress;
      if (sortBy === "name") return a.cropName.localeCompare(b.cropName);
      return 0;
    });

  const updateCropActivity = (cropId: string, activity: string) => {
    setCropBatches(crops => crops.map(crop => 
      crop.id === cropId 
        ? { 
            ...crop, 
            activities: [...crop.activities, { 
              date: new Date().toISOString().split('T')[0], 
              activity, 
              type: 'update' 
            }]
          }
        : crop
    ));
  };

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
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Sprout className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium">Raj Kumar</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header with Analytics */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground">Farmer Dashboard</h1>
              <p className="text-muted-foreground">Manage your crops and track payments</p>
            </div>
            <Button onClick={() => setShowNewCropForm(!showNewCropForm)} className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Register New Crop
            </Button>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="border-l-4 border-l-primary">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold text-foreground">₹{(insights.totalRevenue / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <ArrowUpRight className="h-3 w-3" />
                      +12% from last season
                    </p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Crops</p>
                    <p className="text-2xl font-bold text-foreground">{cropBatches.filter(c => c.status !== "harvested").length}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {cropBatches.filter(c => c.status === "growing").length} growing
                    </p>
                  </div>
                  <div className="bg-green-500/10 p-3 rounded-lg">
                    <Sprout className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Payments</p>
                    <p className="text-2xl font-bold text-foreground">₹{(insights.pendingPayments / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {cropBatches.filter(c => c.paymentStatus === "pending").length} batches
                    </p>
                  </div>
                  <div className="bg-yellow-500/10 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Upcoming Harvests</p>
                    <p className="text-2xl font-bold text-foreground">{insights.upcomingHarvests}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Next in 15 days
                    </p>
                  </div>
                  <div className="bg-blue-500/10 p-3 rounded-lg">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start gap-3">
                <Droplets className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Irrigation Alert</p>
                  <p className="text-xs text-muted-foreground">CB001 requires irrigation in 2 days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start gap-3">
                <Sun className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Weather Update</p>
                  <p className="text-xs text-muted-foreground">High temperature expected next week</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Payment Received</p>
                  <p className="text-xs text-muted-foreground">₹240,000 from Export Foods Inc</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced New Crop Form */}
        {showNewCropForm && (
          <Card className="mb-8 border-primary/20 shadow-lg">
            <CardHeader className="bg-primary/5">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Register New Crop Batch
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowNewCropForm(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="cropName">Crop Name *</Label>
                    <Input
                      id="cropName"
                      placeholder="e.g., Wheat, Rice, Cotton"
                      value={formData.cropName}
                      onChange={(e) => setFormData({...formData, cropName: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="variety">Variety</Label>
                    <Input
                      id="variety"
                      placeholder="e.g., Basmati, PBW-343"
                      value={formData.variety}
                      onChange={(e) => setFormData({...formData, variety: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="plantingDate">Planting Date *</Label>
                    <Input
                      id="plantingDate"
                      type="date"
                      value={formData.plantingDate}
                      onChange={(e) => setFormData({...formData, plantingDate: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Punjab, Village Name"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="area">Area</Label>
                    <Input
                      id="area"
                      placeholder="e.g., 5 acres"
                      value={formData.area}
                      onChange={(e) => setFormData({...formData, area: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="expectedYield">Expected Yield</Label>
                    <Input
                      id="expectedYield"
                      placeholder="e.g., 25 quintals/acre"
                      value={formData.expectedYield}
                      onChange={(e) => setFormData({...formData, expectedYield: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="irrigationType">Irrigation Type</Label>
                    <select
                      id="irrigationType"
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                      value={formData.irrigationType}
                      onChange={(e) => setFormData({...formData, irrigationType: e.target.value})}
                    >
                      <option value="drip">Drip Irrigation</option>
                      <option value="sprinkler">Sprinkler</option>
                      <option value="flood">Flood Irrigation</option>
                      <option value="rainfed">Rainfed</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    <Upload className="mr-2 h-4 w-4" />
                    Register Crop Batch
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowNewCropForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Filters and Search */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1 min-w-[250px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search crops..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
                <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>
            </div>

            <div className="flex gap-2">
              <select
                className="h-10 px-3 rounded-md border border-input bg-background text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recent">Most Recent</option>
                <option value="progress">By Progress</option>
                <option value="name">By Name</option>
              </select>
              
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 bg-secondary/30 rounded-lg">
              <div className="flex flex-wrap gap-2">
                <Badge
                  className={`cursor-pointer ${filterStatus === "all" ? "bg-primary" : "bg-secondary"}`}
                  onClick={() => setFilterStatus("all")}
                >
                  All ({cropBatches.length})
                </Badge>
                <Badge
                  className={`cursor-pointer ${filterStatus === "planted" ? "bg-blue-500" : "bg-secondary"}`}
                  onClick={() => setFilterStatus("planted")}
                >
                  Planted ({cropBatches.filter(c => c.status === "planted").length})
                </Badge>
                <Badge
                  className={`cursor-pointer ${filterStatus === "growing" ? "bg-green-500" : "bg-secondary"}`}
                  onClick={() => setFilterStatus("growing")}
                >
                  Growing ({cropBatches.filter(c => c.status === "growing").length})
                </Badge>
                <Badge
                  className={`cursor-pointer ${filterStatus === "harvested" ? "bg-purple-500" : "bg-secondary"}`}
                  onClick={() => setFilterStatus("harvested")}
                >
                  Harvested ({cropBatches.filter(c => c.status === "harvested").length})
                </Badge>
              </div>
            </div>
          )}
        </div>

        {/* Crop Batches */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground">
              My Crop Batches ({filteredCrops.length})
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {filteredCrops.map((crop) => (
              <Card key={crop.id} className="border-border hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-xl">{crop.cropName}</CardTitle>
                        <Badge className={getStatusColor(crop.status)}>
                          {crop.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Batch ID: {crop.id} • {crop.variety}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedCrop(selectedCrop?.id === crop.id ? null : crop)}
                      className="p-2 hover:bg-secondary rounded-lg transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Growth Progress</span>
                      <span className="font-medium text-foreground">{crop.progress}%</span>
                    </div>
                    <Progress value={crop.progress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground">Planted</p>
                        <p className="font-medium text-foreground">{crop.plantingDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground">Location</p>
                        <p className="font-medium text-foreground">{crop.area}</p>
                      </div>
                    </div>
                  </div>

                  {selectedCrop?.id === crop.id && (
                    <div className="pt-3 border-t border-border space-y-3 animate-in fade-in slide-in-from-top-2">
                      <div className="bg-secondary/30 p-3 rounded-lg">
                        <p className="text-sm font-semibold mb-2">Weather Conditions</p>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <p className="text-muted-foreground">Temp</p>
                            <p className="font-medium">{crop.weather.temp}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Humidity</p>
                            <p className="font-medium">{crop.weather.humidity}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Rainfall</p>
                            <p className="font-medium">{crop.weather.rainfall}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold mb-2">Recent Activities</p>
                        <div className="space-y-1">
                          {crop.activities.slice(-3).reverse().map((activity, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs">
                              <div className="w-2 h-2 rounded-full bg-primary"></div>
                              <span className="text-muted-foreground">{activity.date}</span>
                              <span>•</span>
                              <span>{activity.activity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-3 border-t border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-sm text-muted-foreground">Payment Status</span>
                        {crop.buyer && (
                          <p className="text-xs text-muted-foreground">Buyer: {crop.buyer}</p>
                        )}
                      </div>
                      <Badge className={getPaymentColor(crop.paymentStatus)}>
                        {crop.paymentStatus.replace("_", " ")}
                      </Badge>
                    </div>
                    {crop.advanceAmount > 0 && (
                      <div className="text-xs text-muted-foreground mb-3">
                        Advance: ₹{crop.advanceAmount.toLocaleString()} / Total: ₹{crop.totalAmount.toLocaleString()}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleGenerateQR(crop.id)}
                      variant="outline"
                      className="flex-1 border-primary text-primary hover:bg-primary/10"
                      size="sm"
                    >
                      <QrCode className="mr-2 h-4 w-4" />
                      QR Code
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateCropActivity(crop.id, "Manual update")}
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCrops.length === 0 && (
            <Card className="border-dashed">
              <CardContent className="py-12 text-center">
                <Sprout className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-semibold text-foreground mb-2">No crops found</p>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || filterStatus !== "all" 
                    ? "Try adjusting your filters or search query" 
                    : "Start by registering your first crop batch"}
                </p>
                {!searchQuery && filterStatus === "all" && (
                  <Button onClick={() => setShowNewCropForm(true)} className="bg-primary hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Register New Crop
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* QR Code Modal */}
        {selectedQR && (
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in" 
            onClick={() => setSelectedQR(null)}
          >
            <Card className="max-w-sm w-full animate-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="h-5 w-5" />
                    Crop QR Code
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedQR(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4 pt-6">
                <div className="bg-white p-4 rounded-lg border-2 border-border">
                  <img 
                    src={selectedQR} 
                    alt="QR Code" 
                    className="w-64 h-64"
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Share this QR code with buyers and consumers for complete traceability
                </p>
                <div className="flex gap-2 w-full">
                  <Button 
                    className="flex-1" 
                    variant="outline"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = selectedQR;
                      link.download = 'crop-qr-code.png';
                      link.click();
                    }}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button 
                    className="flex-1 bg-primary hover:bg-primary/90"
                    onClick={() => setSelectedQR(null)}
                  >
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analytics Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Analytics & Insights</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Crop Status Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["planted", "growing", "harvested"].map(status => {
                    const count = cropBatches.filter(c => c.status === status).length;
                    const percentage = (count / cropBatches.length) * 100;
                    return (
                      <div key={status}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="capitalize">{status}</span>
                          <span className="font-medium">{count} ({percentage.toFixed(0)}%)</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IndianRupee className="h-5 w-5" />
                  Payment Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["pending", "advance_paid", "completed"].map(status => {
                    const count = cropBatches.filter(c => c.paymentStatus === status).length;
                    const percentage = (count / cropBatches.length) * 100;
                    return (
                      <div key={status}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="capitalize">{status.replace("_", " ")}</span>
                          <span className="font-medium">{count} ({percentage.toFixed(0)}%)</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Upcoming Tasks & Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Droplets className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Irrigation Due - CB001</p>
                    <p className="text-xs text-muted-foreground">Wheat crop requires irrigation in 2 days</p>
                  </div>
                  <Button size="sm" variant="outline">Mark Done</Button>
                </div>

                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <Calendar className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Harvest Approaching - CB001</p>
                    <p className="text-xs text-muted-foreground">Expected harvest date: March 15, 2025 (15 days)</p>
                  </div>
                  <Button size="sm" variant="outline">View Details</Button>
                </div>

                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Payment Follow-up - CB003</p>
                    <p className="text-xs text-muted-foreground">Follow up with Textile Mills Ltd for advance payment</p>
                  </div>
                  <Button size="sm" variant="outline">Contact Buyer</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnhancedFarmerDashboard;
