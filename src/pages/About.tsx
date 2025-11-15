import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Zap, Users, Globe, TrendingUp } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold text-foreground">About Crop-Chain</h1>
            <p className="text-xl text-muted-foreground">
              Building transparency and trust in the agricultural supply chain
            </p>
          </div>

          {/* Problem Section */}
          <Card className="border-destructive/20 bg-destructive/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="bg-destructive/10 p-3 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-destructive" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-3">The Problem</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <span><strong>Lack of Transparency:</strong> Consumers have no visibility into where their food comes from or how it was grown</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <span><strong>Farmer Funding Issues:</strong> Farmers struggle to access advance payments and fair pricing for their produce</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <span><strong>Supply Chain Opacity:</strong> Multiple intermediaries make it difficult to track produce quality and authenticity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <span><strong>Trust Deficit:</strong> Buyers and consumers lack confidence in the authenticity of organic and sustainable claims</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Solution Section */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-3">Our Solution</h2>
                  <p className="text-muted-foreground mb-4">
                    Crop-Chain Smart Ledger is a <strong>digital traceability platform</strong> that creates transparency across the entire agricultural supply chain. By connecting farmers, buyers, and consumers through a unified system, we enable:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Complete Traceability:</strong> Track every crop batch from planting to consumer delivery</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Digital Records:</strong> Immutable records of farming practices, harvest dates, and quality checks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>QR Code Access:</strong> Instant consumer access to complete product journey via simple QR scan</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Payment Transparency:</strong> Track advance payments and settlements to build farmer trust</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground">Real-Time Tracking</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Monitor crop growth stages with live updates and progress indicators
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground">Multi-Role Access</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Dedicated portals for farmers, buyers, and consumers with role-specific features
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground">QR Code System</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Generate unique QR codes for each batch, enabling instant traceability
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground">Payment Management</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Track payment status from advance to final settlement transparently
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Impact Section */}
          <Card className="bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-foreground mb-4 text-center">Expected Impact</h2>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Supply Chain Visibility</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">Faster</div>
                  <div className="text-sm text-muted-foreground">Payment Processing</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">Higher</div>
                  <div className="text-sm text-muted-foreground">Consumer Trust</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
