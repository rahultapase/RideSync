"use client";

import { useState } from "react";
import { Share2, Users } from "lucide-react";
import { motion } from "framer-motion";

interface RideSharingProps {
  isSharedRide: boolean;
  setIsSharedRide: (value: boolean) => void;
  passengers: number;
  setPassengers: (value: number) => void;
}

export default function RideSharing({ 
  isSharedRide, 
  setIsSharedRide, 
  passengers, 
  setPassengers 
}: RideSharingProps) {
  return (
    <div className="border border-border rounded-lg p-4 space-y-4 bg-background">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Share2 className="h-5 w-5 text-primary" />
          <span className="font-medium text-[14px] text-foreground">Share Ride & Save Money</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setIsSharedRide(false);
              setPassengers(1);
            }}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              !isSharedRide 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-accent text-accent-foreground hover:bg-accent/80'
            }`}
          >
            Private
          </button>
          <button
            onClick={() => setIsSharedRide(true)}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              isSharedRide 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-accent text-accent-foreground hover:bg-accent/80'
            }`}
          >
            Shared
          </button>
        </div>
      </div>

      {isSharedRide && (
        <div className="flex items-center justify-between bg-accent p-2 rounded">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-accent-foreground" />
            <span className="text-sm text-accent-foreground">Passengers (Including you)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPassengers(Math.max(1, passengers - 1))}
              className="w-6 h-6 rounded bg-background border border-border flex items-center justify-center text-sm hover:border-primary transition-colors text-foreground"
            >-</button>
            <span className="w-6 text-center text-sm text-foreground">{passengers}</span>
            <button
              onClick={() => setPassengers(Math.min(4, passengers + 1))}
              className="w-6 h-6 rounded bg-background border border-border flex items-center justify-center text-sm hover:border-primary transition-colors text-foreground"
            >+</button>
          </div>
        </div>
      )}
    </div>
  );
} 