"use client";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Toggle } from "@/components/ui/toggle";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
export function EnergyCertificateMarketplaceComponent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBuyerView, setIsBuyerView] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [evaluation, setEvaluation] = useState<{ type: string, value: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [balance, setBalance] = useState(1000); // Initial balance
  const [certificates, setCertificates] = useState([
    { type: 'SREC', name: 'Solar Renewable Energy Certificate', color: 'yellow', count: 50, price: 10, toBuy: 0 },
    { type: 'LCF', name: 'Low Carbon Fuel Certificate', color: 'green', count: 30, price: 15, toBuy: 0 },
    { type: 'AEC', name: 'Alternative Energy Certificate', color: 'blue', count: 20, price: 20, toBuy: 0 },
  ]);
  const [purchasedCertificates, setPurchasedCertificates] = useState<Array<{ type: string, name: string, count: number }>>([]);
  const handleSignIn = () => {
    setIsAuthenticated(true);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }
    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append('document', file);
    try {
      const response = await fetch('/api/ocr', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      const result = await response.json();
      setEvaluation(result);
      setBalance(prevBalance => prevBalance + result.value); // Add value to balance
    } catch (error) {
      setError("An error occurred while uploading the document. Please try again.");
    } finally {
      setUploading(false);
    }
  };
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchQuery);
  };
  const handlePurchase = (certType: string) => {
    setCertificates(prevCerts => prevCerts.map(cert => {
      if (cert.type === certType) {
        const newCount = Math.max(0, cert.count - cert.toBuy);
        const cost = cert.toBuy * cert.price;
        setBalance(prevBalance => prevBalance - cost);
        // Update purchased certificates
        setPurchasedCertificates(prevPurchased => {
          const existingPurchase = prevPurchased.find(p => p.type === cert.type);
          if (existingPurchase) {
            return prevPurchased.map(p => 
              p.type === cert.type ? { ...p, count: p.count + cert.toBuy } : p
            );
          } else {
            return [...prevPurchased, { type: cert.type, name: cert.name, count: cert.toBuy }];
          }
        });
        return { ...cert, count: newCount, toBuy: 0 };
      }
      return cert;
    }));
  };
  const handleSliderChange = (certType: string, newValue: number[]) => {
    setCertificates(prevCerts => prevCerts.map(cert => {
      if (cert.type === certType) {
        return { ...cert, toBuy: newValue[0] };
      }
      return cert;
    }));
  };
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 flex items-center justify-center">
        <Card className="w-full max-w-md bg-white shadow-lg border-t-4 border-green-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-green-600">Welcome to the Energy Certificate Marketplace</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-gray-600">
              Our platform allows you to buy and sell renewable energy certificates with ease. 
              Join us in promoting sustainable energy practices and supporting green initiatives.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Buy renewable energy certificates from verified sources</li>
              <li>Sell your own renewable energy certificates</li>
              <li>Track your balance and transactions</li>
              <li>Contribute to a greener future</li>
            </ul>
            <Button 
              onClick={handleSignIn} 
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              Sign In to Get Started
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-green-600">Energy Certificate Marketplace</h1>
            <Toggle
              pressed={isBuyerView}
              onPressedChange={setIsBuyerView}
              aria-label="Toggle buyer/seller view"
              className="bg-blue-200 data-[state=on]:bg-purple-300"
            >
              {isBuyerView ? "Buyer View" : "Seller View"}
            </Toggle>
          </div>
          <Card className="mb-8 bg-white shadow-lg border-t-4 border-green-500">
            <CardHeader>
              <CardTitle className="flex items-center text-green-600">
                Your Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700">${balance.toFixed(2)}</div>
              <Progress value={(balance / 2000) * 100} className="mt-2 h-2 bg-green-200" />
            </CardContent>
          </Card>
          {isBuyerView ? (
            <>
              <Card className="mb-8 bg-white shadow-lg border-t-4 border-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-600">
                    Search Energy Certificates
                  </CardTitle>
                  <CardDescription>Find and purchase renewable energy certificates</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSearch} className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Input
                        type="text"
                        placeholder="Search certificates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-grow border-blue-300 focus:ring-blue-500"
                      />
                      <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                        Search
                      </Button>
                    </div>
                  </form>
                  <div className="mt-4 space-y-4">
                    {certificates.map((cert) => (
                      <div key={cert.type} className={`p-4 bg-${cert.color}-100 rounded border border-${cert.color}-300`}>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className={`font-semibold text-${cert.color}-700`}>{cert.name}</h3>
                          <p className={`text-sm text-${cert.color}-600`}>{cert.count} available</p>
                        </div>
                        <div className="mb-2">
                          <Label htmlFor={`${cert.type}-slider`}>Number of certificates to buy: {cert.toBuy}</Label>
                          <Slider
                            id={`${cert.type}-slider`}
                            min={0}
                            max={cert.count}
                            step={1}
                            value={[cert.toBuy]}
                            onValueChange={(value) => handleSliderChange(cert.type, value)}
                            className="mt-2"
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <p className={`text-sm text-${cert.color}-600`}>Total: ${(cert.price * cert.toBuy).toFixed(2)}</p>
                          <Button 
                            onClick={() => handlePurchase(cert.type)} 
                            className={`bg-${cert.color}-500 hover:bg-${cert.color}-600`}
                            disabled={cert.toBuy === 0 || balance < cert.price * cert.toBuy}
                          >
                            Purchase {cert.toBuy} for ${(cert.price * cert.toBuy).toFixed(2)}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg border-t-4 border-purple-500">
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-600">
                    Your Purchased Certificates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {purchasedCertificates.length > 0 ? (
                    <ul className="space-y-2">
                      {purchasedCertificates.map((cert, index) => (
                        <li key={index} className="flex justify-between items-center p-2 bg-purple-100 rounded">
                          <span>{cert.name}</span>
                          <span className="font-semibold">{cert.count}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">You haven't purchased any certificates yet.</p>
                  )}
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="bg-white shadow-lg border-t-4 border-purple-500">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-600">
                  Upload Renewable Energy Certificate
                </CardTitle>
                <CardDescription>Upload your document for evaluation and payout</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="document" className="text-purple-700">Document</Label>
                      <Input id="document" type="file" onChange={handleFileChange} className="border-purple-300 focus:ring-purple-500" />
                    </div>
                  </div>
                  <Button className="w-full bg-purple-500 hover:bg-purple-600" type="submit" disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Upload Document'}
                  </Button>
                </form>
                {error && (
                  <Alert variant="destructive" className="mt-4 bg-red-100 border-red-300 text-red-800">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                {evaluation && (
                  <Alert className="mt-4 bg-green-100 border-green-300 text-green-800">
                    <AlertTitle>Evaluation Result</AlertTitle>
                    <AlertDescription>
                      Document Type: {evaluation.type}<br />
                      Payout Amount: ${evaluation.value.toFixed(2)}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}