"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, X } from "lucide-react";
import axios from "axios";
import Link from "next/link";

interface EventPlanner {
  id: string;
  name: string;
}

const SignupPage = () => {
  const [eventPlanners, setEventPlanners] = useState<EventPlanner[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [eventData, setEventData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    userNumber: "",
    theme: "",
    date: "",
    size: "",
    location: "",
    status: "",
    eventPlannerId: "",
  });

  // Fetch event planners
  useEffect(() => {
    const fetchEventPlanners = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/event-planners"
        );
        setEventPlanners(response.data);
      } catch (error) {
        console.error("Error fetching event planners", error);
      }
    };
    fetchEventPlanners();
  }, []);

  const handleChange = (name: string, value: string) => {
    setEventData({ ...eventData, [name]: value });
    // Clear success message when user starts editing
    if (successMessage) {
      setSuccessMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");
    
    try {
      const response = await axios.post(
        "http://localhost:3000/events/create",
        eventData
      );
      console.log("Event Customised", response.data);
      
      // Set success message
      setSuccessMessage("🎉 Event created successfully! Your event has been customized and saved.");
      
      // Optional: Clear form after successful submission
      setEventData({
        userName: "",
        userEmail: "",
        userPassword: "",
        userNumber: "",
        theme: "",
        date: "",
        size: "",
        location: "",
        status: "",
        eventPlannerId: "",
      });
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      
    } catch (error) {
      console.error("Error creating event", error);
      setSuccessMessage("❌ Failed to create event. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const dismissSuccessMessage = () => {
    setSuccessMessage("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">LOOO</div>
          <nav className="flex space-x-8">
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
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-card-foreground">
              Event Customization Form
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Create your perfect event with our professional planning platform
            </p>
          </CardHeader>
          <CardContent>
            {/* Success Message - Custom styled div instead of Alert component */}
            {successMessage && (
              <div className={`mb-6 p-4 rounded-lg border ${
                successMessage.includes('successfully') 
                  ? 'border-green-500 bg-green-50 text-green-800' 
                  : 'border-red-500 bg-red-50 text-red-800'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {successMessage.includes('successfully') ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    ) : (
                      <X className="h-5 w-5 text-red-600 mr-3" />
                    )}
                    <span className="font-medium">
                      {successMessage}
                    </span>
                  </div>
                  <button
                    onClick={dismissSuccessMessage}
                    className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="userName">Full Name</Label>
                  <Input
                    id="userName"
                    type="text"
                    value={eventData.userName}
                    onChange={(e) => handleChange("userName", e.target.value)}
                    required
                    placeholder="Enter your full name"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userEmail">Email Address</Label>
                  <Input
                    id="userEmail"
                    type="email"
                    value={eventData.userEmail}
                    onChange={(e) => handleChange("userEmail", e.target.value)}
                    required
                    placeholder="Enter your email"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password and Phone Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="userPassword">Password</Label>
                  <Input
                    id="userPassword"
                    type="password"
                    value={eventData.userPassword}
                    onChange={(e) =>
                      handleChange("userPassword", e.target.value)
                    }
                    required
                    placeholder="Create a password"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userNumber">Phone Number</Label>
                  <Input
                    id="userNumber"
                    type="tel"
                    value={eventData.userNumber}
                    onChange={(e) => handleChange("userNumber", e.target.value)}
                    required
                    placeholder="Enter your phone number"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-2">
                <Label htmlFor="theme">Event Theme</Label>
                <Input
                  id="theme"
                  type="text"
                  value={eventData.theme}
                  onChange={(e) => handleChange("theme", e.target.value)}
                  required
                  placeholder="e.g., Rustic Wedding, Corporate Conference"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Event Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={eventData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="size">Event Size</Label>
                <Select
                  value={eventData.size}
                  onValueChange={(value) => handleChange("size", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select event size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Small">Small (1-50 people)</SelectItem>
                    <SelectItem value="Medium">
                      Medium (51-100 people)
                    </SelectItem>
                    <SelectItem value="Large">
                      Large (101-200 people)
                    </SelectItem>
                    <SelectItem value="Over 100+">Over 200+ people</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Event Location</Label>
                <Input
                  id="location"
                  type="text"
                  value={eventData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  required
                  placeholder="Enter event location"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Event Status</Label>
                <Input
                  id="status"
                  type="text"
                  value={eventData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  required
                  placeholder="e.g., Planning, Confirmed, Completed"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventPlannerId">Event Planner</Label>
                <Select
                  value={eventData.eventPlannerId}
                  onValueChange={(value) =>
                    handleChange("eventPlannerId", value)
                  }
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an event planner" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventPlanners.map((planner) => (
                      <SelectItem key={planner.id} value={planner.id}>
                        {planner.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? "Creating Event..." : "Create Event"}
              </Button>

              {/* Sign In Link */}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
