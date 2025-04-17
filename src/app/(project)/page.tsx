import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Menu } from "lucide-react";

import { Button } from "@/_components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col w-full items-center justify-center">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-evenly">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-semibold text-xl">
              Minimal<span className="text-primary">SaaS</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hidden md:block"
            >
              Login
            </Link>
            <Button asChild>
              <Link href="/auth/login">Get Started</Link>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-24 md:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Simplify your workflow with our minimal solution
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Focus on what matters. Our intuitive platform helps teams
              collaborate efficiently with less complexity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/auth/login">
                  Start for free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#demo">View demo</Link>
              </Button>
            </div>
          </div>
          <div className="mx-auto mt-16 flex justify-center">
            <div className="relative h-[350px] w-full max-w-[48rem] rounded-lg border bg-background p-2 shadow-md">
              <Image
                src="/placeholder.svg?height=350&width=768"
                width={768}
                height={350}
                alt="Product screenshot"
                className="rounded-md object-cover"
                priority
              />
            </div>
          </div>
        </section>

        <section id="features" className="container py-20">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Everything you need, nothing you don't
            </h2>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Our platform focuses on essential features that drive productivity
              without the bloat.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-8 sm:grid-cols-2 md:grid-cols-3 lg:max-w-5xl mt-16">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="relative p-6 border rounded-lg"
              >
                <div className="space-y-2">
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="bg-muted/50 py-20">
          <div className="container">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Simple, transparent pricing
              </h2>
              <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                No hidden fees or complicated tiers. Choose the plan that works
                for you.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 mt-16">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className="flex flex-col p-6 bg-background rounded-lg border"
                >
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </div>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="mt-6 space-y-2 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="mt-8"
                    variant={plan.name === "Pro" ? "default" : "outline"}
                  >
                    Get started
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-20">
          <div className="container">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Frequently asked questions
              </h2>
              <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Answers to common questions about our platform.
              </p>
            </div>
            <div className="mx-auto grid max-w-3xl gap-4 mt-16">
              {faqs.map((faq) => (
                <div key={faq.question} className="p-6 border rounded-lg">
                  <h3 className="font-semibold">{faq.question}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Ready to get started?
              </h2>
              <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Join thousands of teams already using our platform to simplify
                their workflow.
              </p>
              <Button size="lg" asChild>
                <Link href="/signup">
                  Start your free trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-12">
        <div className="container">
          <div className="mx-auto max-w-7xl grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <Link href="/" className="font-semibold text-xl">
                Minimal<span className="text-primary">SaaS</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Simplifying workflows since 2024.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mx-auto max-w-7xl mt-8 border-t pt-8">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} MinimalSaaS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    title: "Streamlined Collaboration",
    description:
      "Work together seamlessly with intuitive tools designed for team productivity.",
  },
  {
    title: "Powerful Analytics",
    description:
      "Gain insights with simple yet powerful analytics that help you make better decisions.",
  },
  {
    title: "Automated Workflows",
    description:
      "Save time with automation that handles repetitive tasks so you can focus on what matters.",
  },
  {
    title: "Secure by Design",
    description:
      "Enterprise-grade security without the complexity, keeping your data safe at all times.",
  },
  {
    title: "Intuitive Interface",
    description:
      "A clean, minimal interface that's easy to navigate and reduces the learning curve.",
  },
  {
    title: "Seamless Integrations",
    description:
      "Connect with your favorite tools without complicated setup or maintenance.",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for individuals and small teams getting started.",
    price: 29,
    features: [
      "Up to 5 team members",
      "10GB storage",
      "Basic analytics",
      "24/7 support",
      "API access",
    ],
  },
  {
    name: "Pro",
    description:
      "Ideal for growing teams that need more power and flexibility.",
    price: 79,
    features: [
      "Unlimited team members",
      "100GB storage",
      "Advanced analytics",
      "Priority support",
      "API access",
      "Custom integrations",
      "Advanced security",
    ],
  },
];

const faqs = [
  {
    question: "How does the free trial work?",
    answer:
      "Our free trial gives you full access to all features for 14 days with no credit card required. At the end of the trial, you can choose the plan that works best for you.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate your billing accordingly.",
  },
  {
    question: "Is there a discount for annual billing?",
    answer:
      "Yes, we offer a 20% discount when you choose annual billing on any of our plans.",
  },
  {
    question: "Do you offer a discount for startups or non-profits?",
    answer:
      "Yes, we have special pricing for eligible startups, non-profits, and educational institutions. Please contact our sales team for more information.",
  },
];
