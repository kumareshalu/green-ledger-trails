import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

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
  },
  {
    id: 4,
    name: "Modified Pradhan Mantri Fasal Bima Yojana",
    crop: "All notified crops",
    premium: "Government subsidized",
    coverage: "Comprehensive crop cover",
    season: "Year-round"
  },
];

const Insurance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredInsurance = mockInsurance.filter(ins =>
    ins.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ins.crop.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApply = (ins: any) => {
    alert(`Insurance application submitted for ${ins.name}!\nPremium: ${ins.premium}\nAn agent will contact you within 24 hours.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Crop Insurance</h1>
          <p className="text-gray-600 mb-6">Government-backed insurance schemes to protect your crops against natural calamities.</p>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search insurance products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {filteredInsurance.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredInsurance.map(ins => (
              <Card key={ins.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-lg">{ins.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="font-semibold text-gray-900">Crops Covered</div>
                      <p className="text-gray-600">{ins.crop}</p>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Premium</div>
                      <p className="text-gray-600">{ins.premium}</p>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Coverage</div>
                      <p className="text-gray-600">{ins.coverage}</p>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Season</div>
                      <p className="text-gray-600">{ins.season}</p>
                    </div>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleApply(ins)}>
                    Apply for Insurance
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No insurance products found matching "{searchTerm}"</p>
          </div>
        )}

        {/* Info Section */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <h3 className="font-bold text-lg text-gray-900">ℹ️ About Crop Insurance</h3>
              <p className="text-gray-700 text-sm">
                Crop insurance protects farmers from financial losses due to natural calamities like drought, flood, pest attacks, and diseases.
              </p>
              <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
                <li>Government provides subsidy on premium (up to 50%)</li>
                <li>Claims are processed automatically based on crop cutting experiments</li>
                <li>Coverage includes loss of yield due to weather conditions</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Insurance;
