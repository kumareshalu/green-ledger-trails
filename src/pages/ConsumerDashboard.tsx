import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, Leaf, Package, Truck, CheckCircle } from "lucide-react";
import { mockCropBatches } from "@/data/mockData";
import { toast } from "sonner";

const ConsumerDashboard = () => {
  const [scannedCrop, setScannedCrop] = useState<string | null>(null);

  const handleScanQR = () => {
    // Simulate QR scan - pick a random crop
    const randomCrop = mockCropBatches[Math.floor(Math.random() * mockCropBatches.length)];
    setScannedCrop(randomCrop.id);
    toast.success("QR Code scanned successfully!");
  };

  const cropDetails = scannedCrop ? mockCropBatches.find(c => c.id === scannedCrop) : null;

  const getTimelineSteps = (status: string) => {
    const steps = [
      { label: "Planted", icon: Leaf, active: true },
      { label: "Growing", icon: Leaf, active: status === "growing" || status === "harvested" || status === "delivered" },
      { label: "Harvested", icon: Package, active: status === "harvested" || status === "delivered" },
      { label: "Delivered", icon: Truck, active: status === "delivered" },
    ];
    return steps;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary/10 p-3 rounded-lg">
              <QrCode className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Consumer Portal</h1>
              <p className="text-muted-foreground">Scan QR codes to trace your food's journey</p>
            </div>
          </div>
        </div>

        {/* Scan Section */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="pt-6">
            <div className="text-center space-y-6">
              <div className="w-32 h-32 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
                <QrCode className="h-16 w-16 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Scan Product QR Code</h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Point your camera at the QR code on your product to view its complete farm-to-table journey
                </p>
              </div>
              <Button onClick={handleScanQR} size="lg" className="bg-primary hover:bg-primary/90">
                <QrCode className="mr-2 h-5 w-5" />
                Simulate QR Scan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Scanned Crop Details */}
        {cropDetails && (
          <div className="space-y-6">
            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{cropDetails.cropName}</CardTitle>
                    <p className="text-muted-foreground mt-1">
                      Batch ID: {cropDetails.id}
                    </p>
                  </div>
                  <Badge className="bg-primary/10 text-primary border-primary/30">
                    Verified ✓
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Farmer Info */}
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-3">Farmer Information</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Farmer Name</p>
                      <p className="font-medium text-foreground">{cropDetails.farmerName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Farm Location</p>
                      <p className="font-medium text-foreground">{cropDetails.location}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Planting Date</p>
                      <p className="font-medium text-foreground">{cropDetails.plantingDate}</p>
                    </div>
                    {cropDetails.harvestDate && (
                      <div>
                        <p className="text-muted-foreground">Harvest Date</p>
                        <p className="font-medium text-foreground">{cropDetails.harvestDate}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Journey Timeline */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Product Journey</h3>
                  <div className="relative">
                    {/* Progress line */}
                    <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-border" />
                    
                    {/* Timeline steps */}
                    <div className="space-y-6">
                      {getTimelineSteps(cropDetails.status).map((step, index) => {
                        const Icon = step.icon;
                        return (
                          <div key={index} className="relative flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${
                              step.active 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-muted text-muted-foreground"
                            }`}>
                              {step.active ? (
                                <CheckCircle className="h-6 w-6" />
                              ) : (
                                <Icon className="h-6 w-6" />
                              )}
                            </div>
                            <div className="flex-1 pt-2">
                              <h4 className={`font-semibold ${
                                step.active ? "text-foreground" : "text-muted-foreground"
                              }`}>
                                {step.label}
                              </h4>
                              {step.active && (
                                <p className="text-sm text-muted-foreground mt-1">
                                  Stage completed ✓
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Verified & Traceable</h4>
                      <p className="text-sm text-muted-foreground">
                        This product has been verified through our transparent supply chain system. 
                        All information is authentic and traceable back to the source.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => setScannedCrop(null)}
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary/10"
                >
                  Scan Another Product
                </Button>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border-border">
                <CardContent className="pt-6 text-center">
                  <div className="bg-primary/10 w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-3">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">100% Traceable</h4>
                  <p className="text-xs text-muted-foreground">
                    Complete visibility from farm to your table
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="pt-6 text-center">
                  <div className="bg-primary/10 w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-3">
                    <Leaf className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">Sustainable</h4>
                  <p className="text-xs text-muted-foreground">
                    Supporting eco-friendly farming practices
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="pt-6 text-center">
                  <div className="bg-primary/10 w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-3">
                    <QrCode className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">Verified</h4>
                  <p className="text-xs text-muted-foreground">
                    Authentic data secured by digital records
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsumerDashboard;
