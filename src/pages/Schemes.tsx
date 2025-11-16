import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Calendar, IndianRupee, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const mockSchemes = [
  {
    id: 1,
    name: "PM-KISAN",
    description: "Direct income support of ₹6,000 per year to eligible farmer families.",
    eligibility: "All landholding farmers",
    amount: "₹6,000/year",
    status: "Active",
    deadline: "2024-12-31"
  },
  {
    id: 2,
    name: "Kisan Credit Card",
    description: "Short term credit support for crop cultivation and allied activities.",
    eligibility: "Farmers with cultivable land",
    amount: "Up to ₹3 Lakhs",
    status: "Active",
    deadline: "2025-03-31"
  },
  {
    id: 3,
    name: "PM Fasal Bima Yojana",
    description: "Crop insurance scheme for farmers with government subsidy.",
    eligibility: "All farmers growing notified crops",
    amount: "Premium subsidy up to 50%",
    status: "Active",
    deadline: "2025-02-15"
  },
  {
    id: 4,
    name: "Soil Health Card Scheme",
    description: "Free soil testing and health card for farmers.",
    eligibility: "All farmers",
    amount: "Free",
    status: "Active",
    deadline: "Ongoing"
  },
];

const Schemes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredSchemes = mockSchemes.filter(scheme =>
    scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scheme.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApply = (scheme: any) => {
    alert(`Application submitted for ${scheme.name}!\nWe will contact you with next steps.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Government Schemes</h1>
          <p className="text-gray-600 mb-6">Browse and apply for agricultural support schemes and subsidies.</p>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search schemes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {filteredSchemes.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredSchemes.map((scheme) => (
              <Card key={scheme.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="font-semibold text-lg">{scheme.name}</span>
                    <span className="text-sm font-normal bg-green-100 text-green-700 px-3 py-1 rounded-full">{scheme.status}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{scheme.description}</p>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">Eligibility</div>
                        <div className="text-gray-600">{scheme.eligibility}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <IndianRupee className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">Amount</div>
                        <div className="text-gray-600">{scheme.amount}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">Deadline</div>
                        <div className="text-gray-600">{scheme.deadline}</div>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleApply(scheme)}>
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No schemes found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schemes;
