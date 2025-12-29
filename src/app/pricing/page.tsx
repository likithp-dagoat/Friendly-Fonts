"use client";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";
import { Check } from "lucide-react";

export default function PricingPage() {
  return (
    <div>
      <Navbar />
      
      <main className="container py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Pricing Plans
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Choose the plan that's right for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="border rounded-lg p-8 flex flex-col">
            <h2 className="text-2xl font-bold">Free</h2>
            <p className="text-4xl font-bold my-4">$0</p>
            <p className="text-muted-foreground mb-6">For personal use and exploration</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                3 free fonts
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Standard character set
              </li>
            </ul>
            <Button variant="outline" className="mt-auto">
              Get Started
            </Button>
          </div>

          {/* Premium Plan */}
          <div className="border rounded-lg p-8 flex flex-col">
            <h2 className="text-2xl font-bold">Premium</h2>
            <p className="text-4xl font-bold my-4">$49</p>
            <p className="text-muted-foreground mb-6">For professionals and enthusiasts</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Unlimited fonts
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Full character set
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Commercial use license
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Priority support
              </li>
            </ul>
            <Button className="mt-auto">
              Go Premium
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}