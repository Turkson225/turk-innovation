import { Brain, Plane, Truck, HeartPulse, Building, Shield, Cpu, Leaf, Bot, Zap, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  brain: Brain,
  plane: Plane,
  truck: Truck,
  "heart-pulse": HeartPulse,
  building: Building,
  shield: Shield,
  cpu: Cpu,
  leaf: Leaf,
  bot: Bot,
  zap: Zap,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || Brain;
}
