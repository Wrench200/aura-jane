"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Star, Menu, X } from "lucide-react";

interface EventPlanner {
  id: string;
  name: string;
  location: string;
  eventType: string[];
  priceRange: string;
  rating: number;
  avatar?: string;
}

// Sample data for demonstration
const samplePlanners: EventPlanner[] = [
  {
    id: "1",
    name: "Planner Name",
    location: "New Location",
    eventType: ["Conference"],
    priceRange: "$$",
    rating: 5,
  },
  {
    id: "2",
    name: "Planner Name",
    location: "Lypad Location",
    eventType: ["Wedding"],
    priceRange: "$$$",
    rating: 4,
  },
  {
    id: "3",
    name: "Planner Name",
    location: "Kypadification",
    eventType: ["Party"],
    priceRange: "$",
    rating: 5,
  },
  {
    id: "4",
    name: "Planner Name",
    location: "New Location",
    eventType: ["Conference", "Corporate"],
    priceRange: "$$",
    rating: 4,
  },
  {
    id: "5",
    name: "Planner Name",
    location: "Lypad Location",
    eventType: ["Wedding", "Party"],
    priceRange: "$$$",
    rating: 5,
  },
  {
    id: "6",
    name: "Planner Name",
    location: "Wypsd/Lunotion",
    eventType: ["Other"],
    priceRange: "$$",
    rating: 4,
  },
  {
    id: "7",
    name: "Planner Name",
    location: "New Location",
    eventType: ["Conference"],
    priceRange: "$",
    rating: 5,
  },
  {
    id: "8",
    name: "Planner Name",
    location: "Lypad Location",
    eventType: ["Wedding"],
    priceRange: "$$$",
    rating: 4,
  },
  {
    id: "9",
    name: "Planner Name",
    location: "Wypsd/Lunotion",
    eventType: ["Party", "Other"],
    priceRange: "$$",
    rating: 5,
  },
];

const EventPlannersPage = () => {
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedRating, setSelectedRating] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [priceRangeSlider, setPriceRangeSlider] = useState([0, 100]);

  const eventTypes = ["Conference", "Wedding", "Party", "Other"];
  const locations = [
    "New Location",
    "Lypad Location",
    "Kypadification",
    "Wypsd/Lunotion",
  ];
  const ratings = ["5", "4", "3", "2", "1"];

  const handleEventTypeChange = (eventType: string, checked: boolean) => {
    if (checked) {
      setSelectedEventTypes([...selectedEventTypes, eventType]);
    } else {
      setSelectedEventTypes(
        selectedEventTypes.filter((type) => type !== eventType)
      );
    }
  };

  const filteredPlanners = samplePlanners.filter((planner) => {
    const matchesEventType =
      selectedEventTypes.length === 0 ||
      selectedEventTypes.some((type) => planner.eventType.includes(type));
    const matchesLocation =
      !selectedLocation || planner.location === selectedLocation;
    const matchesRating =
      !selectedRating || planner.rating >= parseInt(selectedRating);
    const matchesSearch =
      !searchQuery ||
      planner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      planner.location.toLowerCase().includes(searchQuery.toLowerCase());

    return (
      matchesEventType && matchesLocation && matchesRating && matchesSearch
    );
  });

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const FilterSidebar = ({ className = "" }) => (
    <div className={`bg-background border-r p-6 space-y-6 ${className}`}>
      <div>
        <h2 className="text-lg font-semibold mb-4">Filter options</h2>

        {/* Event Type Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Event Type</Label>
          <div className="space-y-2">
            {eventTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={selectedEventTypes.includes(type)}
                  onCheckedChange={(checked) =>
                    handleEventTypeChange(type, checked as boolean)
                  }
                />
                <label htmlFor={type} className="text-sm">
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Price Range</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-full h-2 bg-gray-200 rounded-full relative">
                <div
                  className="h-2 bg-primary rounded-full"
                  style={{ width: `${priceRangeSlider[1]}%` }}
                />
                <div
                  className="absolute top-0 w-4 h-4 bg-primary rounded-full transform -translate-y-1 cursor-pointer"
                  style={{ left: `${priceRangeSlider[0]}%` }}
                />
                <div
                  className="absolute top-0 w-4 h-4 bg-primary rounded-full transform -translate-y-1 cursor-pointer"
                  style={{ left: `${priceRangeSlider[1]}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Location Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Location</Label>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Locations">All Locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Rating Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Rating</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="4star"
                checked={selectedRating === "4"}
                onCheckedChange={(checked) =>
                  setSelectedRating(checked ? "4" : "")
                }
              />
              <label htmlFor="4star" className="text-sm">
                4+ stars & up
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">LOGO</div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <Link
              href="/planners"
              className="hover:text-accent transition-colors"
            >
              Event Planners
            </Link>
            <Link
              href="/create"
              className="hover:text-accent transition-colors"
            >
              Create Event
            </Link>
          </nav>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          >
            {isMobileFilterOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Filter Sidebar */}
        <FilterSidebar className="hidden lg:block w-80 h-screen sticky top-0" />

        {/* Mobile Filter Overlay */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-black/20"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <div className="fixed left-0 top-0 h-full w-80 bg-background shadow-lg">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <FilterSidebar />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-center mb-8">
              Event Planners
            </h1>

            {/* Search and Filter Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <Select
                value={selectedEventTypes[0] || ""}
                onValueChange={(value) =>
                  setSelectedEventTypes(value ? [value] : [])
                }
              >
                <SelectTrigger className="md:w-48">
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Event Types">All Event Types</SelectItem>
                  {eventTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedLocation}
                onValueChange={setSelectedLocation}
              >
                <SelectTrigger className="md:w-48">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Locations">All Locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedPriceRange}
                onValueChange={setSelectedPriceRange}
              >
                <SelectTrigger className="md:w-48">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Price Ranges">All Price Ranges</SelectItem>
                  <SelectItem value="$">$ (Budget)</SelectItem>
                  <SelectItem value="$$">$$ (Standard)</SelectItem>
                  <SelectItem value="$$$">$$$ (Premium)</SelectItem>
                </SelectContent>
              </Select>

              <Button
                className="md:w-32"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedEventTypes([]);
                  setSelectedLocation("");
                  setSelectedPriceRange("");
                  setSelectedRating("");
                }}
              >
                Search
              </Button>
            </div>
          </div>

          {/* Planners Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlanners.map((planner) => (
              <Card
                key={planner.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                  </div>
                  <CardTitle className="text-lg">{planner.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {planner.location}
                  </p>
                  {renderStars(planner.rating)}
                </CardHeader>
                <CardContent className="text-center">
                  <Button variant="outline" className="w-full">
                    View Portfolio
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results Message */}
          {filteredPlanners.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No event planners found matching your criteria.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSelectedEventTypes([]);
                  setSelectedLocation("");
                  setSelectedPriceRange("");
                  setSelectedRating("");
                  setSearchQuery("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventPlannersPage;
