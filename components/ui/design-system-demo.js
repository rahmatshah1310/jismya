import React from "react";
import { Button } from "./button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./card";
import { Input } from "./input";
import { Badge } from "./badge";

export function DesignSystemDemo() {
  return (
    <div className="min-h-screen bg-cream dark:bg-d-bg p-8 animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold text-ink dark:text-d-ink mb-4">
            Etsy-Inspired Design System
          </h1>
          <p className="text-lg text-ink/70 dark:text-d-ink/70 font-sans">
            A warm, artisan design system built with Tailwind CSS
          </p>
        </div>

        {/* Color Palette */}
        <section className="space-y-6">
          <h2 className="text-2xl font-serif font-semibold text-ink dark:text-d-ink">
            Color Palette
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="w-full h-20 bg-brand rounded-2xl shadow-card"></div>
              <p className="text-sm font-medium text-ink dark:text-d-ink">Brand</p>
              <p className="text-xs text-ink/60 dark:text-d-ink/60">#F1641E</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-20 bg-cream rounded-2xl shadow-card border border-border dark:border-d-border"></div>
              <p className="text-sm font-medium text-ink dark:text-d-ink">Cream</p>
              <p className="text-xs text-ink/60 dark:text-d-ink/60">#FAF3EF</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-20 bg-sand rounded-2xl shadow-card border border-border dark:border-d-border"></div>
              <p className="text-sm font-medium text-ink dark:text-d-ink">Sand</p>
              <p className="text-xs text-ink/60 dark:text-d-ink/60">#EDE5DF</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-20 bg-moss rounded-2xl shadow-card"></div>
              <p className="text-sm font-medium text-white">Moss</p>
              <p className="text-xs text-white/80">#3F7A5E</p>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-6">
          <h2 className="text-2xl font-serif font-semibold text-ink dark:text-d-ink">
            Typography
          </h2>
          <div className="space-y-4">
            <div>
              <h1 className="text-4xl font-serif font-bold text-ink dark:text-d-ink">
                Heading 1 - Serif Bold
              </h1>
              <p className="text-sm text-ink/60 dark:text-d-ink/60 mt-1">Inter font family</p>
            </div>
            <div>
              <h2 className="text-2xl font-serif font-semibold text-ink dark:text-d-ink">
                Heading 2 - Serif Semibold
              </h2>
              <p className="text-sm text-ink/60 dark:text-d-ink/60 mt-1">Merriweather font family</p>
            </div>
            <div>
              <p className="text-lg font-sans text-ink dark:text-d-ink">
                Body text - Sans Regular
              </p>
              <p className="text-sm text-ink/60 dark:text-d-ink/60 mt-1">Inter font family</p>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-6">
          <h2 className="text-2xl font-serif font-semibold text-ink dark:text-d-ink">
            Buttons
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button>Primary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="link">Link Button</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </section>

        {/* Cards */}
        <section className="space-y-6">
          <h2 className="text-2xl font-serif font-semibold text-ink dark:text-d-ink">
            Cards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-ink/70 dark:text-d-ink/70">
                  This is a basic card with header, content, and footer sections.
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm">Action</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-ink/70 dark:text-d-ink/70">
                  This card demonstrates hover effects and animations.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">Cancel</Button>
                <Button size="sm">Confirm</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Form Elements */}
        <section className="space-y-6">
          <h2 className="text-2xl font-serif font-semibold text-ink dark:text-d-ink">
            Form Elements
          </h2>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-ink dark:text-d-ink mb-2">
                Input Label
              </label>
              <Input placeholder="Enter text here..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink dark:text-d-ink mb-2">
                Disabled Input
              </label>
              <Input placeholder="Disabled input" disabled />
            </div>
          </div>
        </section>

        {/* Badges */}
        <section className="space-y-6">
          <h2 className="text-2xl font-serif font-semibold text-ink dark:text-d-ink">
            Badges
          </h2>
          <div className="flex flex-wrap gap-4">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </section>

        {/* Animations */}
        <section className="space-y-6">
          <h2 className="text-2xl font-serif font-semibold text-ink dark:text-d-ink">
            Animations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-brand rounded-2xl mx-auto mb-4 animate-fade-in"></div>
              <p className="text-sm font-medium text-ink dark:text-d-ink">Fade In</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-moss rounded-2xl mx-auto mb-4 animate-slide-up"></div>
              <p className="text-sm font-medium text-ink dark:text-d-ink">Slide Up</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-rose rounded-2xl mx-auto mb-4 animate-scale-in"></div>
              <p className="text-sm font-medium text-ink dark:text-d-ink">Scale In</p>
            </div>
          </div>
        </section>

        {/* Dark Mode Notice */}
        <div className="text-center p-6 bg-sand/40 dark:bg-white/10 rounded-2xl border border-border dark:border-d-border">
          <p className="text-ink dark:text-d-ink font-medium">
            💡 Toggle dark mode using the theme toggle in the header to see the full design system in action!
          </p>
        </div>
      </div>
    </div>
  );
}
