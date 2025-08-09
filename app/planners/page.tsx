"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface Planner {
  id: string;
  name: string;
  location: string;
  rating: number; // 0-5
  types: ("Conference" | "Wedding" | "Party" | "Other")[];
  priceTier: "Budget" | "Standard" | "Premium";
  verified?: boolean;
}

const PLANNERS: Planner[] = [
  {
    id: "1",
    name: "Aurora Events",
    location: "New York, NY",
    rating: 4.8,
    types: ["Wedding", "Conference"],
    priceTier: "Premium",
    verified: true,
  },
  {
    id: "2",
    name: "Summit Planners",
    location: "San Francisco, CA",
    rating: 4.5,
    types: ["Conference"],
    priceTier: "Premium",
  },
  {
    id: "3",
    name: "Festivo Studio",
    location: "Austin, TX",
    rating: 4.2,
    types: ["Party", "Other"],
    priceTier: "Standard",
  },
  {
    id: "4",
    name: "EverAfter Co.",
    location: "Chicago, IL",
    rating: 4.9,
    types: ["Wedding"],
    priceTier: "Premium",
    verified: true,
  },
  {
    id: "5",
    name: "Metro Events",
    location: "Seattle, WA",
    rating: 4.0,
    types: ["Conference", "Party"],
    priceTier: "Standard",
  },
  {
    id: "6",
    name: "Sunset Gatherings",
    location: "Miami, FL",
    rating: 3.8,
    types: ["Party"],
    priceTier: "Budget",
  },
  {
    id: "7",
    name: "Northstar Events",
    location: "Boston, MA",
    rating: 4.3,
    types: ["Conference", "Other"],
    priceTier: "Standard",
  },
  {
    id: "8",
    name: "Coastal Weddings",
    location: "San Diego, CA",
    rating: 4.7,
    types: ["Wedding"],
    priceTier: "Premium",
  },
  {
    id: "9",
    name: "City Lights Events",
    location: "Los Angeles, CA",
    rating: 4.1,
    types: ["Party", "Wedding"],
    priceTier: "Standard",
  },
];

const EVENT_TYPES = ["Conference", "Wedding", "Party", "Other"] as const;
const LOCATIONS = [
  "New York, NY",
  "San Francisco, CA",
  "Austin, TX",
  "Chicago, IL",
  "Seattle, WA",
  "Miami, FL",
  "Boston, MA",
  "San Diego, CA",
  "Los Angeles, CA",
];
const PRICE_OPTIONS = ["Any", "Budget", "Standard", "Premium"] as const;

export default function PlannersPage() {
  const [eventType, setEventType] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [priceTier, setPriceTier] = useState<(typeof PRICE_OPTIONS)[number]>("Any");
  const [search, setSearch] = useState("");

  // Sidebar filters
  const [checkedTypes, setCheckedTypes] = useState<Record<string, boolean>>({});
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(3); // 1=Budget 2=Standard 3=Premium

  const priceToTier = (value: number): Planner["priceTier"] => {
    if (value <= 1) return "Budget";
    if (value === 2) return "Standard";
    return "Premium";
  };

  const filtered = useMemo(() => {
    return PLANNERS.filter((p) => {
      if (eventType && !p.types.includes(eventType as Planner["types"][number])) {
        return false;
      }
      if (location && p.location !== location) {
        return false;
      }
      if (priceTier !== "Any" && p.priceTier !== priceTier) {
        return false;
      }

      // Sidebar: event type selection (multi)
      const selectedTypes = Object.entries(checkedTypes)
        .filter(([, v]) => v)
        .map(([k]) => k);
      if (selectedTypes.length > 0 && !selectedTypes.some((t) => p.types.includes(t as Planner["types"][number]))) {
        return false;
      }

      if (p.rating < minRating) {
        return false;
      }

      // Sidebar price slider acts as max allowed tier
      const tierOrder: Record<Planner["priceTier"], number> = {
        Budget: 1,
        Standard: 2,
        Premium: 3,
      };
      if (tierOrder[p.priceTier] > maxPrice) {
        return false;
      }

      if (search) {
        const q = search.toLowerCase();
        const hay = `${p.name} ${p.location} ${p.types.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }

      return true;
    });
  }, [eventType, location, priceTier, checkedTypes, minRating, maxPrice, search]);

  const clearAll = () => {
    setEventType("");
    setLocation("");
    setPriceTier("Any");
    setCheckedTypes({});
    setMinRating(0);
    setMaxPrice(3);
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">LOOO</div>
          <nav className="flex items-center gap-8">
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <a href="#" className="hover:text-accent transition-colors">
              About
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Services
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Contact
            </a>
            <div className="flex gap-4">
              <Link href="/auth/login" className="hover:text-accent transition-colors">
                Sign In
              </Link>
              <Link href="/auth/signup" className="hover:text-accent transition-colors">
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Title + Top Filters */}
      <section className="py-10 border-b">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Event Planners</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <Label className="mb-2 block">Event Type</Label>
              <Select value={eventType} onValueChange={setEventType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  {EVENT_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 block">Location</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {LOCATIONS.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 block">Price Range</Label>
              <Select
                value={priceTier}
                onValueChange={(v) => setPriceTier(v as typeof priceTier)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  {PRICE_OPTIONS.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Search name, type, location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1"
              />
              <Button className="whitespace-nowrap">Search</Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
        {/* Sidebar Filters */}
        <aside className="bg-card rounded-xl border p-6 h-fit">
          <h3 className="font-semibold text-lg mb-4">Filter options</h3>

          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium mb-3">Event Type</p>
              <div className="space-y-2">
                {EVENT_TYPES.map((t) => (
                  <label key={t} className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={!!checkedTypes[t]}
                      onCheckedChange={(v) =>
                        setCheckedTypes((prev) => ({ ...prev, [t]: Boolean(v) }))
                      }
                    />
                    {t}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">Price Range</p>
              <div className="px-1">
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={1}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Budget</span>
                  <span>Standard</span>
                  <span>Premium</span>
                </div>
                <p className="text-xs mt-1">
                  Up to: <span className="font-medium">{priceToTier(maxPrice)}</span>
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Location</Label>
              <Input
                placeholder="Type a city..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Minimum Rating</p>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={0}
                  max={5}
                  step={0.5}
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm w-10 text-right">{minRating.toFixed(1)}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="w-full" onClick={clearAll}>
                Clear All
              </Button>
            </div>
          </div>
        </aside>

        {/* Results Grid */}
        <main>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <Card key={p.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="size-16 rounded-lg bg-muted border flex items-center justify-center shrink-0">
                      <span className="text-2xl">👤</span>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{p.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{p.location}</p>
                      <div className="flex items-center gap-1 mt-1 text-yellow-600">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`size-4 ${i < Math.round(p.rating) ? "fill-yellow-500 stroke-yellow-500" : "stroke-yellow-500"}`}
                          />
                        ))}
                        <span className="ml-1 text-xs text-muted-foreground">{p.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    {p.verified ? <Badge className="shrink-0">Verified</Badge> : null}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.types.map((t) => (
                      <Badge key={t} variant="secondary">
                        {t}
                      </Badge>
                    ))}
                    <Badge variant="outline">{p.priceTier}</Badge>
                  </div>
                  <Button className="w-full">View Portfolio</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center text-muted-foreground py-10">
              No planners match your current filters.
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 mt-10">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-accent">© Zaplt Company</div>
          <div className="flex space-x-6">
            <a href="#" className="text-accent hover:text-primary-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-accent hover:text-primary-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}