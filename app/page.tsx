import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">
             <Image
                  src="/logo.png"
                  alt="Events illustration"
                  width={70}
                  height={70}
                  className="object-cover"
                  priority
                />
          </div>
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
              Customize
            </Link>
            <div className="flex space-x-4">
              <Link
                href="/auth/login"
                className="hover:text-accent transition-colors"
              >
                Sign In
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Your Event, Your Way.
              </h1>
              <p className="text-xl text-accent">
                We blend creativity, expertise, and technology to turn your vision into a flawless, unforgettable event.
              </p>
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Get Started
                </Button>
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="w-[40rem] h-[40rem] rounded-lg flex items-center justify-center">
                <Image
                  src="/Events-bro.svg"
                  alt="Events illustration"
                  width={512}
                  height={448}
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-card-foreground text-center mb-16">
            Platform Features
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <Card
                key={item}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-xl">
                      ★
                    </span>
                  </div>
                  <CardTitle className="text-xl font-semibold text-card-foreground">
                    Feature {item}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Event Types Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-secondary-foreground text-center mb-16">
            Event Types
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["Weddings", "Corporate Events", "Birthday Parties"].map(
              (eventType, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="w-20 h-20 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-2xl">
                        {eventType === "Weddings"
                          ? "💒"
                          : eventType === "Corporate Events"
                          ? "🏢"
                          : "🎉"}
                      </span>
                    </div>
                    <CardTitle className="text-xl font-semibold text-card-foreground">
                      {eventType}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Professional planning services for your special{" "}
                      {eventType.toLowerCase()}.
                    </p>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-card-foreground text-center mb-16">
            Testimonials
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Bride",
                content:
                  "Amazing experience! Our wedding was perfect thanks to the incredible planning team.",
              },
              {
                name: "Michael Chen",
                role: "CEO",
                content:
                  "The corporate event exceeded all expectations. Professional and seamless execution.",
              },
              {
                name: "Emily Rodriguez",
                role: "Event Host",
                content:
                  "Found the perfect planner for my daughter's sweet 16. Everything was magical!",
              },
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                      <span className="text-primary-foreground font-bold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground">
                        {testimonial.name}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-accent">© Zaplt Company</div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-accent hover:text-primary-foreground transition-colors"
            >
              Projety Policy
            </a>
            <a
              href="#"
              className="text-accent hover:text-primary-foreground transition-colors"
            >
              Terms of Servics
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
