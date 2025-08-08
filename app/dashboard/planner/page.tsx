"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const EventPlannerDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const assignedEvents = [
    {
      id: 1,
      clientName: "John & Sarah Smith",
      eventType: "Wedding",
      date: "2024-06-15",
      status: "Upcoming",
      actions: ["View Details", "Message Client"],
    },
    {
      id: 2,
      clientName: "TechCorp Inc.",
      eventType: "Corporate Conference",
      date: "2024-05-20",
      status: "In Progress",
      actions: ["Message Client", "Update Status"],
    },
    {
      id: 3,
      clientName: "Emily Rodriguez",
      eventType: "Birthday Party",
      date: "2024-05-10",
      status: "Planning",
      actions: ["Update Status", "Update Status"],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Planning":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-6 py-4 border-b border-primary/20">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">LOGO</div>
          <nav className="flex space-x-8">
            <Link
              href="/dashboard/planner"
              className="hover:text-accent transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/planner/events"
              className="hover:text-accent transition-colors"
            >
              Events
            </Link>
            <Link
              href="/dashboard/planner/messages"
              className="hover:text-accent transition-colors"
            >
              Messages
            </Link>
            <Link
              href="/dashboard/planner/calendar"
              className="hover:text-accent transition-colors"
            >
              Calendar
            </Link>
          </nav>
          <Button
            variant="outline"
            className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
          >
            Planner Profile
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
                { id: "events", label: "Events", icon: "🎉" },
                { id: "messages", label: "Messages", icon: "💬" },
                { id: "calendar", label: "Calendar", icon: "📅" },
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
          {/* Welcome Message and Top Actions */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome, Sarah
              </h1>
              <p className="text-muted-foreground mt-1">
                Here's what's happening with your events today
              </p>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline">Add Portfolio Item</Button>
              <Button>Update Exsiqiality</Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-muted-foreground">
                  Active Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">5</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Currently managing
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
                <div className="text-3xl font-bold text-green-600">12</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Successfully delivered
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
                <div className="text-3xl font-bold text-blue-600">3</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Unread messages
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Assigned Events Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Assigned Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {assignedEvents.map((event) => (
                <Card
                  key={event.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {event.clientName}
                        </CardTitle>
                        <p className="text-muted-foreground">
                          {event.eventType}
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

          {/* Portfolio Management Section */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Portfolio Management
              </h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="aspect-square bg-muted rounded-lg border-2 border-dashed border-border flex items-center justify-center hover:border-primary transition-colors cursor-pointer"
                >
                  <span className="text-muted-foreground text-sm">
                    Portfolio Item {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EventPlannerDashboard;
