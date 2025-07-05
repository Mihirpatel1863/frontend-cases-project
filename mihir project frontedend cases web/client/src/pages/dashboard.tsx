import { useState } from "react";
import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/sidebar";
import MetricsCards from "@/components/metrics-cards";
import WorkspacesTable from "@/components/workspaces-table";
import CaseDetailsModal from "@/components/case-details-modal";

export default function Dashboard() {
  const [isCaseDetailsModalOpen, setIsCaseDetailsModalOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [workspaces, setWorkspaces] = useState([
    {
      id: 1,
      name: "Johnson & Partners Merger",
      client: "Law Firm: Big Easy",
      organizer: "By: michael.johnson",
      caseInfo: "45 witnesses | 12 were ..",
      levelOfCare: "18 documents processing",
      status: "In Progress",
      createdAt: "May 3, 2024",
    }
  ]);

  const handleCreateWorkspace = () => {
    setIsCaseDetailsModalOpen(true);
  };

  const handleViewDetails = (workspace: any) => {
    setSelectedWorkspace(workspace);
    setIsCaseDetailsModalOpen(true);
  };

  const handleSaveDetails = (newWorkspace: any) => {
    setWorkspaces(prev => [...prev, newWorkspace]);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-teal-50 relative overflow-hidden">
      
      {/* Premium Background Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-br from-teal-300 to-blue-300 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-72 sm:h-72 bg-gradient-to-br from-emerald-300 to-teal-300 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: "4s" }}></div>
      </div>
      
      <div className="relative z-10 flex flex-1 flex-col md:flex-row w-full h-full">
        
        {/* Sidebar */}
        <div className="w-full md:w-[18rem] border-r border-gray-200">
          <Sidebar />
        </div>

        {/* Main Area */}
        <main className="flex-1 overflow-hidden flex flex-col">
          {/* Header */}
          <header className="bg-white/90 backdrop-blur-xl shadow-xl border-b border-gray-200/50 px-4 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="animate-fade-in">
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent float-animation">
                  Dashboard Overview
                </h2>
                <p className="text-sm text-gray-600 mt-1">Manage your legal cases and workspaces</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Button variant="ghost" size="sm" className="group hover:bg-gray-100 transition rounded-xl p-3 glow-effect">
                  <Bell className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                </Button>
                <Button variant="ghost" size="sm" className="group hover:bg-gray-100 transition rounded-xl p-3">
                  <Search className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
                </Button>
                <div className="flex items-center gap-2 bg-gray-100/80 backdrop-blur-md rounded-xl px-3 py-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-md">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Admin</span>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 animate-fade-in">
            <MetricsCards />
            <div className="mt-6">
              <WorkspacesTable
                workspaces={workspaces}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                onCreateWorkspace={handleCreateWorkspace}
                onViewDetails={handleViewDetails}
              />
            </div>
          </div>
        </main>

        {/* Modal */}
        <CaseDetailsModal
          isOpen={isCaseDetailsModalOpen}
          onClose={() => setIsCaseDetailsModalOpen(false)}
          onSaveDetails={handleSaveDetails}
          workspace={selectedWorkspace}
        />
      </div>
    </div>
  );
}
