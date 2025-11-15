import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ShoppingCart, Package, CheckCircle, IndianRupee } from "lucide-react";
import { mockCropBatches, mockFarmers } from "@/data/mockData";
import { toast } from "sonner";

const BuyerDashboard = () => {
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);

  const handleApprovePayment = (cropId: string) => {
    toast.success("Advance payment approved!");
    setSelectedCrop(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planted": return "bg-blue-500/10 text-blue-700 border-blue-300";
      case "growing": return "bg-primary/10 text-primary border-primary/30";
      case "harvested": return "bg-accent/10 text-accent border-accent/30";
      case "delivered": return "bg-green-500/10 text-green-700 border-green-300";
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

  const cropDetails = selectedCrop ? mockCropBatches.find(c => c.id === selectedCrop) : null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary/10 p-3 rounded-lg">
              <ShoppingCart className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Buyer Dashboard</h1>
              <p className="text-muted-foreground">Manage crop purchases and payments</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Available Batches</p>
                  <p className="text-3xl font-bold text-foreground">{mockCropBatches.length}</p>
                </div>
                <Package className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Payments</p>
                  <p className="text-3xl font-bold text-foreground">
                    {mockCropBatches.filter(c => c.paymentStatus === "pending").length}
                  </p>
                </div>
                <IndianRupee className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed Orders</p>
                  <p className="text-3xl font-bold text-foreground">
                    {mockCropBatches.filter(c => c.paymentStatus === "completed").length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Crop Batches List */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Browse Crop Batches</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCropBatches.map((crop) => (
              <Card key={crop.id} className="border-border hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedCrop(crop.id)}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{crop.cropName}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        by {crop.farmerName}
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
                      <span className="text-muted-foreground">Progress</span>
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
                    <Badge className={getPaymentColor(crop.paymentStatus)}>
                      {crop.paymentStatus.replace("_", " ")}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Farmer Profiles */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Farmer Profiles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {mockFarmers.map((farmer) => (
              <Card key={farmer.id} className="border-border">
                <CardContent className="pt-6">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">
                        {farmer.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{farmer.name}</h3>
                      <p className="text-sm text-muted-foreground">{farmer.location}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border">
                      <div>
                        <p className="text-sm text-muted-foreground">Crops</p>
                        <p className="font-bold text-foreground">{farmer.totalCrops}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Rating</p>
                        <p className="font-bold text-foreground">⭐ {farmer.rating}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Crop Details Modal */}
        {cropDetails && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedCrop(null)}>
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{cropDetails.cropName}</CardTitle>
                    <p className="text-muted-foreground mt-1">Batch ID: {cropDetails.id}</p>
                  </div>
                  <Badge className={getStatusColor(cropDetails.status)}>
                    {cropDetails.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Farmer Details</h4>
                    <p className="text-sm text-muted-foreground">Name: {cropDetails.farmerName}</p>
                    <p className="text-sm text-muted-foreground">Location: {cropDetails.location}</p>
                    <p className="text-sm text-muted-foreground">Farmer ID: {cropDetails.farmerId}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Crop Information</h4>
                    <p className="text-sm text-muted-foreground">Planting Date: {cropDetails.plantingDate}</p>
                    {cropDetails.harvestDate && (
                      <p className="text-sm text-muted-foreground">Harvest Date: {cropDetails.harvestDate}</p>
                    )}
                    <p className="text-sm text-muted-foreground">Progress: {cropDetails.progress}%</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Growth Progress</h4>
                  <Progress value={cropDetails.progress} className="h-3" />
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Payment Status</h4>
                  <Badge className={getPaymentColor(cropDetails.paymentStatus)}>
                    {cropDetails.paymentStatus.replace("_", " ")}
                  </Badge>
                </div>

                <div className="flex gap-3 pt-4 border-t border-border">
                  {cropDetails.paymentStatus === "pending" && (
                    <Button onClick={() => handleApprovePayment(cropDetails.id)} className="bg-primary hover:bg-primary/90">
                      Approve Advance Payment
                    </Button>
                  )}
                  <Button variant="outline" onClick={() => setSelectedCrop(null)}>
                    Close
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

export default BuyerDashboard;
