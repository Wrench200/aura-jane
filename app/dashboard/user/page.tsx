"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const myEvents = [
    {
      id: 1,
      eventType: "Wedding",
      date: "2024-06-15",
      status: "Planning",
      planner: "Sarah Johnson",
      actions: ["View Details", "Message Planner"],
    },
    {
      id: 2,
      eventType: "Birthday Party",
      date: "2024-07-20",
      status: "Confirmed",
      planner: "Mike Chen",
      actions: ["View Details", "Update Event"],
    },
    {
      id: 3,
      eventType: "Corporate Event",
      date: "2024-08-10",
      status: "Completed",
      planner: "Emily Rodriguez",
      actions: ["View Details", "Leave Review"],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Planning":
        return "bg-blue-100 text-blue-800";
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-6 py-4 border-b border-primary/20">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">LOOO</div>
          <nav className="flex space-x-8">
            <Link
              href="/dashboard/user"
              className="hover:text-accent transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/user/events"
              className="hover:text-accent transition-colors"
            >
              My Events
            </Link>
            <Link
              href="/dashboard/user/planners"
              className="hover:text-accent transition-colors"
            >
              Find Planners
            </Link>
            <Link
              href="/dashboard/user/messages"
              className="hover:text-accent transition-colors"
            >
              Messages
            </Link>
          </nav>
          <Button
            variant="outline"
            className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
          >
            My Profile
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r border-border min-h-screen">
          <nav className="p-6">
            <ul className="space-y-2">
              {[
                { id: "dashboard", label: "Dashboard", icon: "📊" },
                { id: "events", label: "My Events", icon: "🎉" },
                { id: "planners", label: "Find Planners", icon: "👥" },
                { id: "messages", label: "Messages", icon: "💬" },
                { id: "reviews", label: "Reviews", icon: "⭐" },
                { id: "settings", label: "Settings", icon: "⚙️" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Welcome Message and Quick Actions */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, John!
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your events and find the perfect planners
              </p>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline">Request New Event</Button>
              <Button>Find Planners</Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-muted-foreground">
                  Active Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">2</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Currently planning
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-muted-foreground">
                  Completed Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">5</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Successfully held
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-muted-foreground">
                  Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">8</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Unread messages
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-muted-foreground">
                  Saved Planners
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">12</div>
                <p className="text-sm text-muted-foreground mt-1">Favorites</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Search */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Find Event Planners</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input
                  placeholder="Search by event type, location, or planner name..."
                  className="flex-1"
                />
                <Button>Search</Button>
              </div>
            </CardContent>
          </Card>

          {/* My Events Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">My Events</h2>
              <Button variant="outline">View All Events</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {myEvents.map((event) => (
                <Card
                  key={event.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {event.eventType}
                        </CardTitle>
                        <p className="text-muted-foreground">
                          Planner: {event.planner}
                        </p>
                      </div>
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Date: {new Date(event.date).toLocaleDateString()}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {event.actions.map((action, index) => (
                        <Button key={index} variant="outline" size="sm">
                          {action}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Recent Activity
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Wedding planning started
                      </p>
                      <p className="text-xs text-muted-foreground">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Message received from Sarah Johnson
                      </p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Birthday party confirmed
                      </p>
                      <p className="text-xs text-muted-foreground">
                        3 days ago
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
