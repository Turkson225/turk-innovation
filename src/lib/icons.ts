import { Brain, Plane, Truck, HeartPulse, Building, Shield, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  brain: Brain,
  plane: Plane,
  truck: Truck,
  "heart-pulse": HeartPulse,
  building: Building,
  shield: Shield,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || Brain;
}
