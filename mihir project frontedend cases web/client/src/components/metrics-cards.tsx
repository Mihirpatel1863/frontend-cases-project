import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, 
  Folder, 
  UserPlus, 
  UserCheck, 
  ClipboardCheck, 
  Mic 
} from "lucide-react";

const metrics = [
  {
    title: "New Documents",
    value: "4",
    change: "+2.5% from last month",
    icon: FileText,
    color: "bg-blue-100 text-blue-600",
    changeColor: "text-emerald-600",
  },
  {
    title: "Total Legal Documents",
    value: "51",
    change: "+5.2% from last month",
    icon: Folder,
    color: "bg-green-100 text-green-600",
    changeColor: "text-emerald-600",
  },
  {
    title: "Witnesses Added",
    value: "4",
    change: "No change",
    icon: UserPlus,
    color: "bg-purple-100 text-purple-600",
    changeColor: "text-slate-500",
  },
  {
    title: "Witnesses Reviewed",
    value: "18",
    change: "+12% from last month",
    icon: UserCheck,
    color: "bg-orange-100 text-orange-600",
    changeColor: "text-emerald-600",
  },
  {
    title: "Witnesses Processed",
    value: "8",
    change: "+8% from last month",
    icon: ClipboardCheck,
    color: "bg-teal-100 text-teal-600",
    changeColor: "text-emerald-600",
  },
  {
    title: "Witnesses Transcribed",
    value: "9",
    change: "+15% from last month",
    icon: Mic,
    color: "bg-indigo-100 text-indigo-600",
    changeColor: "text-emerald-600",
  },
];

export default function MetricsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card 
            key={metric.title} 
            className="group relative p-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 rounded-xl overflow-hidden"
            style={{ 
              animationDelay: `${index * 100}ms`,
              animation: 'fadeInUp 0.6s ease-out forwards'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none"></div>
            <CardContent className="relative p-0">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-600 mb-2">
                    {metric.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mb-1 transition-all duration-300 group-hover:scale-110">
                    {metric.value}
                  </p>
                  <p className={`text-sm font-medium ${metric.changeColor}`}>
                    {metric.change}
                  </p>
                </div>
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-md transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 ${metric.color}`}>
                  <Icon className="w-7 h-7" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
