import { useLocation, Link } from "react-router-dom";
import { ChartArea, Clipboard, FileText, Home, Layers, LineChart, MapPin, Package, Ship, User, Users } from "lucide-react";
import logo from '/logo.svg'; // Assurez-vous d'avoir un fichier logo



interface NavLink {
  href: string;
  label: string;
  icon: React.ElementType; // Utilise React.ElementType pour les composants d'icône
}

// Définir les liens du haut du menu
const NavLinkUp: NavLink[] = [
  {
    href: "/",
    label: "Tableau de bord",
    icon:ChartArea,
  },
  {
    href: "/groupements",
    label: "Groupements",
    icon: Package,
  },
  {
    href: "/pecheurs",
    label: "Pêcheurs",
    icon: User,
  },
  {
    href: "/zones",
    label: "Zones",
    icon: MapPin,
  },
  {
    href: "/attributions",
    label: "Attributions",
    icon: Clipboard,
  },
  {
    href: "/pirogues",
    label: "Pirogues",
    icon: Ship,
  },
  {
    href: "/filets",
    label: "Filets",
    icon: Layers,
  },
  {
    href: "/factures",
    label: "Factures",
    icon: FileText,
  },
];


// Définir les liens du bas du menu
const NavLinkDown = [
  {
    href: "/settings",
    label: "Paramètres",
    icon: Users,
  },
];

const SidebarNav = () => {
  const location = useLocation(); // Obtenir le chemin actuel

  // Vérifier si le lien est actif
  const isActive = (href) => location.pathname === href;

  return (
    <div className="hidden border-r bg-white md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        {/* Logo */}
        <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
          <Link to="/">
            <img src={logo} alt="Logo" width={120} height={120} />
          </Link>
        </div>

        <div className="flex-1">
          <nav className="grid items-start px-4 text-sm lg:px-4">
            {NavLinkUp.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 transition-all hover:bg-muted/70 ${
                  isActive(link.href) ? "bg-muted/70" : ""
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="pb-4">
          <nav className="grid items-start px-4 text-sm lg:px-4">
            {NavLinkDown.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 transition-all hover:bg-muted/70 ${
                  isActive(link.href) ? "bg-muted/70" : ""
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SidebarNav;

