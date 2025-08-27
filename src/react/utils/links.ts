import type { NavLink } from "@interfaces/general";

export const NavLinks: NavLink[] = [
  {
    to: "/",
    label: "Home",
    icon: 'Home'
  },
  {
    to: "/general",
    label: "General",
    icon: 'Book'
  },
  {
    to: "/inventory",
    label: "Inventory",
    icon: 'Package'
  },
  {
    to: "/calculators",
    label: "Calculators",
    icon: 'Layers'
  },
  {
    to: "/services",
    label: "Services",
    icon: 'Settings'
  },
  {
    to: "/macros",
    label: "Macros",
    icon: 'FileText'
  },
  {
    to: "/thank-you",
    label: "Thank You",
    icon: 'CheckCircle'
  }
]
