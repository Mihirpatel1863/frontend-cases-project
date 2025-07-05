import { Link, useLocation } from "wouter";
import {
  BarChart3,
  Users,
  CreditCard,
  Settings,
  Mail,
  LogOut,
  Layout,
  Building2,
  FileText,
  DollarSign
} from "lucide-react";

const navigation = [
  { name: "Workspaces", href: "/", icon: Layout },
  { name: "Team Management", href: "/team", icon: Users },
  { name: "Billing & Plans", href: "/billing", icon: CreditCard },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Contact Admin", href: "/contact", icon: Mail },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-64 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white flex flex-col h-screen shadow-2xl border-r border-slate-700/40 relative overflow-hidden">
      {/* Background Gradient Blurs */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-teal-500 to-blue-500 rounded-full filter blur-2xl"></div>
        <div className="absolute bottom-1/3 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full filter blur-2xl"></div>
        <div className="absolute top-1/2 right-0 w-16 h-16 bg-gradient-to-bl from-emerald-500 to-cyan-500 rounded-full filter blur-xl"></div>
      </div>

      <div className="relative z-10 flex flex-col flex-grow">
        {/* Header */}
        <div className="p-6 border-b border-slate-700/60">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-teal-200 to-blue-200 bg-clip-text text-transparent float-animation">
            LexiAI
          </h1>
          <div className="text-xs text-slate-300 mt-1">Legal AI Assistant</div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item, index) => {
            const Icon = item.icon;
            const isActive = location === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 transform relative overflow-hidden backdrop-blur-md ${
                  isActive
                    ? "bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-500 text-white shadow-xl border border-teal-400/60 glow-effect"
                    : "bg-gradient-to-br from-slate-800/60 via-slate-700/60 to-slate-600/60 text-slate-300 hover:from-slate-700 hover:via-slate-600 hover:to-slate-500 hover:text-white hover:shadow-md"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="absolute inset-0 bg-gradient-to-br from-teal-400/10 via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-10 transition duration-300 pointer-events-none" />
                <Icon
                  className={`w-5 h-5 mr-3 transition-all duration-300 ${
                    isActive
                      ? "scale-110 text-white"
                      : "group-hover:scale-110 group-hover:text-white text-slate-300"
                  }`}
                />
                <span className="relative z-10">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer - sticks to bottom */}
        <div className="p-4 border-t border-slate-700/60">
          {/* Sign Out Button */}
          <button className="group flex items-center w-full px-4 py-3 text-sm text-slate-300 hover:text-white rounded-xl bg-gradient-to-br from-red-700 via-red-600 to-red-500 hover:from-red-600 hover:to-red-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 relative overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent opacity-0 group-hover:opacity-10 transition duration-300 pointer-events-none" />
            <LogOut className="w-4 h-4 mr-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
            <span className="relative z-10">Sign Out</span>
          </button>

          {/* LexiAI Pro Box */}
          <div className="mt-4 p-3 bg-gradient-to-br from-slate-800/50 via-slate-700/50 to-slate-600/50 rounded-xl backdrop-blur-md border border-slate-600/30 shadow-inner hover:shadow-md transition-all duration-300">
            <div className="text-xs text-slate-300 text-center">
              <div className="font-medium bg-gradient-to-r from-teal-300 to-blue-300 bg-clip-text text-transparent">
                LexiAI Pro
              </div>
              <div className="text-slate-400 mt-1">Premium Legal Assistant</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
