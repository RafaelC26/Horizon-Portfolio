'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  MapPin,
  Wifi,
  Coffee,
  Wind,
  ShieldCheck,
  ChevronRight,
  Heart,
  Share2,
  Calendar as CalendarIcon,
  Users,
  Search,
  Menu,
  X,
  Zap,
  Cpu,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Card } from './card';

// Asset Paths (Placeholders for generated images)
const HERO_IMAGE = "/luxury_villa_hero.png";
const INTERIOR_1 = "/villa_interior_living.png";
const INTERIOR_2 = "/villa_interior_bedroom.png";

export function PropertyDetail() {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#1A2B3C] font-['Plus_Jakarta_Sans'] pb-20">

      {/* 1. Header Navigation */}
      <header className="sticky top-0 z-[100] w-full bg-[#F5F5F0]/80 backdrop-blur-xl border-b border-[#1A2B3C]/5 px-6 sm:px-12 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h2 className="text-xl font-extrabold tracking-tighter text-[#1A2B3C]">H-STAYS</h2>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium hover:text-cyan-600 transition-colors">Destinations</a>
            <a href="#" className="text-sm font-medium hover:text-cyan-600 transition-colors">Experiences</a>
            <a href="#" className="text-sm font-medium hover:text-cyan-600 transition-colors">Support</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-[#1A2B3C]">Sign In</Button>
          <Button className="bg-[#1A2B3C] text-white rounded-full px-8 hover:bg-[#2A3B4C]">Book Now</Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 sm:px-12 pt-8">

        {/* 2. Top Bar (Title & Actions) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#1A2B3C]/50 uppercase mb-2">
              <span className="hover:underline cursor-pointer">Spain</span>
              <ChevronRight className="w-3 h-3 child" />
              <span className="hover:underline cursor-pointer">Costa del Sol</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Villa Horizon: Minimalism at Sea</h1>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1 bg-[#1A2B3C] text-white px-2 py-0.5 rounded text-xs font-bold">
                <Star className="w-3 h-3 fill-white" />
                4.98
              </div>
              <span className="text-sm font-medium underline decoration-1 underline-offset-4 cursor-pointer">124 Reviews</span>
              <span className="text-[#1A2B3C]/20">•</span>
              <div className="flex items-center gap-1 text-sm font-medium text-[#1A2B3C]/70">
                <MapPin className="w-4 h-4" />
                Marbella, Spain
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="rounded-full border-[#1A2B3C]/10 hover:bg-[#1A2B3C]/5 flex gap-2"
              onClick={() => { }}
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            <Button
              variant="outline"
              className={cn("rounded-full border-[#1A2B3C]/10 hover:bg-[#1A2B3C]/5 flex gap-2", isLiked && "text-red-500 border-red-200")}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
              {isLiked ? 'Saved' : 'Save'}
            </Button>
          </div>
        </div>

        {/* 3. Photo Gallery (Dynamic Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[400px] md:h-[600px] mb-12">
          {/* Main Hero */}
          <div className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-3xl group cursor-pointer">
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500 z-10" />
            <img src={HERO_IMAGE} alt="Villa Horizon Exterior" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute bottom-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-xl">View exterior</div>
            </div>
          </div>
          {/* Interior 1 */}
          <div className="md:col-span-2 relative overflow-hidden rounded-3xl group cursor-pointer">
            <img src={INTERIOR_1} alt="Villa Horizon Living" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
          {/* Interior 2 */}
          <div className="md:col-span-2 relative overflow-hidden rounded-3xl group cursor-pointer">
            <img src={INTERIOR_2} alt="Villa Horizon Bedroom" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <Button className="bg-white text-[#1A2B3C] rounded-full px-6 font-bold shadow-2xl hover:bg-gray-100">Show all photos</Button>
            </div>
          </div>
        </div>

        {/* 4. Content Content & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left Column: Info & Amenities */}
          <div className="lg:col-span-8">
            <div className="flex justify-between items-start pb-8 border-b border-[#1A2B3C]/5 mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Hosted by Elena Horizon</h2>
                <div className="flex gap-4 text-sm text-[#1A2B3C]/70 font-medium">
                  <span>6 guests</span>
                  <span>•</span>
                  <span>3 bedrooms</span>
                  <span>•</span>
                  <span>4 beds</span>
                  <span>•</span>
                  <span>3.5 baths</span>
                </div>
              </div>
              <div className="relative">
                <img src="https://ui-avatars.com/api/?name=Elena+H&background=1A2B3C&color=fff" className="w-14 h-14 rounded-full border-2 border-white shadow-lg" alt="Host Avatar" />
                <div className="absolute -bottom-1 -right-1 bg-cyan-400 p-1 rounded-full shadow-md">
                  <ShieldCheck className="w-4 h-4 text-[#1A2B3C]" />
                </div>
              </div>
            </div>

            <div className="space-y-12">
              {/* Description Snippet */}
              <section>
                <div className="flex items-start gap-6 mb-8">
                  <div className="bg-cyan-100/50 p-4 rounded-2xl">
                    <Zap className="w-6 h-6 text-cyan-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">High-Speed Connectivity</h3>
                    <p className="text-[#1A2B3C]/60 leading-relaxed">Equipped with Starlink mesh network, perfect for digital nomads and intense creative work.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="bg-amber-100/50 p-4 rounded-2xl">
                    <User className="w-6 h-6 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Elite Concierge</h3>
                    <p className="text-[#1A2B3C]/60 leading-relaxed">Elena provides personalized city tours and private chef booking services.</p>
                  </div>
                </div>
              </section>

              {/* Amenities Grid */}
              <section>
                <h3 className="text-xl font-bold mb-6">World-Class Amenities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6">
                  {[
                    { label: 'High-speed Wifi', icon: Wifi },
                    { label: 'Premium Coffee', icon: Coffee },
                    { label: 'Ocean breeze ventilation', icon: Wind },
                    { label: 'Dedicated Workspace', icon: Cpu },
                    { label: 'Pool Access', icon: Zap },
                    { label: 'Full Privacy', icon: ShieldCheck },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <item.icon className="w-5 h-5 text-[#1A2B3C]/40" />
                      <span className="text-sm font-medium text-[#1A2B3C]/80">{item.label}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="mt-8 rounded-xl border-[#1A2B3C]/10 px-8 py-6 font-bold hover:bg-[#1A2B3C]/5">Show all 45 amenities</Button>
              </section>

              {/* Reviews Preview */}
              <section className="pt-12 border-t border-[#1A2B3C]/5">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-extrabold tracking-tight">4.98</div>
                    <div className="h-8 w-[2px] bg-[#1A2B3C]/10" />
                    <div className="flex flex-col">
                      <div className="flex text-amber-500">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1A2B3C]/40 mt-1">Global Rating</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    { user: 'Marcus Thorne', date: 'August 2025', comment: 'The lighting in this villa is transformative. The minimalist architecture really allows the coastline to be the art.' },
                    { user: 'Sarah Chen', date: 'October 2025', comment: 'Perfect for our executive retreat. The dedicated workspaces and high-speed internet made it a seamless transition.' },
                  ].map((rev, i) => (
                    <div key={i} className="space-y-4">
                      <div className="flex items-center gap-3">
                        <img src={`https://ui-avatars.com/api/?name=${rev.user}&background=random`} className="w-10 h-10 rounded-full" />
                        <div>
                          <div className="font-bold text-sm">{rev.user}</div>
                          <div className="text-xs text-[#1A2B3C]/40">{rev.date}</div>
                        </div>
                      </div>
                      <p className="text-sm text-[#1A2B3C]/70 leading-relaxed italic">"{rev.comment}"</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Right Column: Sticky Booking Sidebar */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-32">
              <Card className="p-8 rounded-[32px] border border-[#1A2B3C]/5 bg-white shadow-2xl overflow-hidden relative group">
                <div className="flex justify-between items-baseline mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold">$850</span>
                    <span className="text-[#1A2B3C]/40 text-sm font-medium">/ night</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-bold">
                    <Star className="w-3 h-3 fill-current" />
                    4.98
                    <span className="text-[#1A2B3C]/40 font-medium underline decoration-1">(124)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 border border-[#1A2B3C]/10 rounded-2xl overflow-hidden mb-6">
                  <div className="p-4 border-r border-[#1A2B3C]/10 flex flex-col gap-1 cursor-pointer hover:bg-gray-50 transition-colors">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A2B3C]">Check-in</span>
                    <span className="text-sm font-medium">May 12, 2026</span>
                  </div>
                  <div className="p-4 flex flex-col gap-1 cursor-pointer hover:bg-gray-50 transition-colors">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A2B3C]">Check-out</span>
                    <span className="text-sm font-medium">May 18, 2026</span>
                  </div>
                  <div className="col-span-2 p-4 border-t border-[#1A2B3C]/10 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A2B3C]">Guests</span>
                      <span className="text-sm font-medium">4 Guests</span>
                    </div>
                    < ChevronRight className="w-4 h-4 text-[#1A2B3C]/40" />
                  </div>
                </div>

                <Button className="w-full bg-[#1A2B3C] text-white py-8 rounded-2xl text-lg font-bold shadow-xl hover:bg-[#2A3B4C] transition-all mb-4">
                  Reserve Now
                </Button>

                <p className="text-center text-sm text-[#1A2B3C]/40 font-medium mb-6">You won't be charged yet</p>

                <div className="space-y-4 pt-4 border-t border-[#1A2B3C]/5">
                  <div className="flex justify-between text-[#1A2B3C]/70">
                    <span className="underline decoration-1 underline-offset-4 cursor-pointer">$850 x 6 nights</span>
                    <span className="font-medium">$5,100</span>
                  </div>
                  <div className="flex justify-between text-[#1A2B3C]/70">
                    <span className="underline decoration-1 underline-offset-4 cursor-pointer">Service fee</span>
                    <span className="font-medium">$120</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-[#1A2B3C]/10 text-lg font-extrabold">
                    <span>Total before taxes</span>
                    <span>$5,220</span>
                  </div>
                </div>
              </Card>

              <div className="mt-8 flex justify-center gap-8 text-[#1A2B3C]/30 text-xs font-bold uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  H-Stays Secure
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
