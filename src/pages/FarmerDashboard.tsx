import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Sprout, Plus, QrCode, IndianRupee, TrendingUp } from "lucide-react";
import { mockCropBatches, generateQRCode } from "@/data/mockData";
import { toast } from "sonner";

const FarmerDashboard = () => {
  const [showNewCropForm, setShowNewCropForm] = useState(false);
  const [selectedQR, setSelectedQR] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    cropName: "",
    plantingDate: "",
    location: "",
  });

  const farmerCrops = mockCropBatches.filter(crop => crop.farmerId === "F001");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("New crop batch registered successfully!");
    setShowNewCropForm(false);
    setFormData({ cropName: "", plantingDate: "", location: "" });
  };

  const handleGenerateQR = (cropId: string) => {
    const qrUrl = generateQRCode(cropId);
    setSelectedQR(qrUrl);
    toast.success("QR Code generated!");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planted": return "bg-blue-500/10 text-blue-700 border-blue-300";
      case "growing": return "bg-primary/10 text-primary border-primary/30";
      case "harvested": return "bg-accent/10 text-accent border-accent/30";
      default: return "bg-muted";
    }
  };

  const getPaymentColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500/10 text-yellow-700 border-yellow-300";
      case "advance_paid": return "bg-blue-500/10 text-blue-700 border-blue-300";
      case "completed": return "bg-primary/10 text-primary border-primary/30";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Sprout className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Farmer Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, Raj Kumar</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Crops</p>
                  <p className="text-3xl font-bold text-foreground">{farmerCrops.length}</p>
                </div>
                <Sprout className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Batches</p>
                  <p className="text-3xl font-bold text-foreground">
                    {farmerCrops.filter(c => c.status === "growing").length}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Payments Received</p>
                  <p className="text-3xl font-bold text-foreground">
                    {farmerCrops.filter(c => c.paymentStatus !== "pending").length}
                  </p>
                </div>
                <IndianRupee className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button onClick={() => setShowNewCropForm(!showNewCropForm)} className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Register New Crop Batch
          </Button>
        </div>

        {/* New Crop Form */}
        {showNewCropForm && (
          <Card className="mb-8 border-primary/20">
            <CardHeader>
              <CardTitle>Register New Crop Batch</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cropName">Crop Name</Label>
                    <Input
                      id="cropName"
                      placeholder="e.g., Wheat, Rice, Cotton"
                      value={formData.cropName}
                      onChange={(e) => setFormData({...formData, cropName: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="plantingDate">Planting Date</Label>
                    <Input
                      id="plantingDate"
                      type="date"
                      value={formData.plantingDate}
                      onChange={(e) => setFormData({...formData, plantingDate: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Punjab, Village Name"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
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

        {/* Crop Batches List */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">My Crop Batches</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {farmerCrops.map((crop) => (
              <Card key={crop.id} className="border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{crop.cropName}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Batch ID: {crop.id}
                      </p>
                    </div>
                    <Badge className={getStatusColor(crop.status)}>
                      {crop.status}
                    </Badge>
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
                    <div>
                      <p className="text-muted-foreground">Planted</p>
                      <p className="font-medium text-foreground">{crop.plantingDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Location</p>
                      <p className="font-medium text-foreground">{crop.location}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Payment Status</span>
                      <Badge className={getPaymentColor(crop.paymentStatus)}>
                        {crop.paymentStatus.replace("_", " ")}
                      </Badge>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleGenerateQR(crop.id)}
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary/10"
                  >
                    <QrCode className="mr-2 h-4 w-4" />
                    Generate QR Code
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* QR Code Modal */}
        {selectedQR && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedQR(null)}>
            <Card className="max-w-sm" onClick={(e) => e.stopPropagation()}>
              <CardHeader>
                <CardTitle>Crop QR Code</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <img src={selectedQR} alt="QR Code" className="w-64 h-64 border border-border rounded-lg" />
                <p className="text-sm text-muted-foreground text-center">
                  Share this QR code with buyers and consumers for traceability
                </p>
                <Button onClick={() => setSelectedQR(null)}>Close</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerDashboard;
