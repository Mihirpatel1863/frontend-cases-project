import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreVertical, FileText, Users, BarChart3, Bell, Search, User } from "lucide-react";

interface WorkflowPreviewProps {
  step: number;
  onStepClick: (step: number) => void;
}

export default function WorkflowPreview({ step, onStepClick }: WorkflowPreviewProps) {
  const renderDashboardPreview = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold">Dashboard Overview</h3>
            <p className="text-xs text-gray-500">Manage your legal cases</p>
          </div>
          <div className="flex items-center space-x-2">
            <Bell className="w-3 h-3 text-gray-400" />
            <Search className="w-3 h-3 text-gray-400" />
            <User className="w-3 h-3 text-gray-400" />
          </div>
        </div>
      </div>
      
      {/* Metrics Cards */}
      <div className="p-3 bg-gray-50">
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded p-2 text-center">
              <div className="text-xs font-bold text-blue-600">{i}</div>
              <div className="text-xs text-gray-500">Metric</div>
            </div>
          ))}
        </div>
        
        {/* Workspaces Table */}
        <div className="bg-white rounded border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-semibold">Workspaces</h4>
            <Button 
              size="sm" 
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1"
              onClick={() => onStepClick(1)}
            >
              <Plus className="w-3 h-3 mr-1" />
              Create New Workspace
            </Button>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded text-xs">
              <span>Johnson & Partners Merger</span>
              <span className="text-blue-600">View Details</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCreateModalPreview = () => (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Modal Header */}
      <div className="bg-white border-b border-gray-200 p-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Create New Workspace</h3>
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
      
      {/* Modal Content */}
      <div className="p-3 space-y-3">
        <div>
          <label className="text-xs text-gray-600">Workspace Name</label>
          <div className="w-full h-6 bg-gray-100 rounded mt-1"></div>
        </div>
        <div>
          <label className="text-xs text-gray-600">Client</label>
          <div className="w-full h-6 bg-gray-100 rounded mt-1"></div>
        </div>
        <div>
          <label className="text-xs text-gray-600">Case Type</label>
          <div className="w-full h-6 bg-gray-100 rounded mt-1"></div>
        </div>
        <div>
          <label className="text-xs text-gray-600">Description</label>
          <div className="w-full h-12 bg-gray-100 rounded mt-1"></div>
        </div>
        
        <div className="flex space-x-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1 text-xs">
            Cancel
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs"
            onClick={() => onStepClick(2)}
          >
            Create Workspace
          </Button>
        </div>
      </div>
    </div>
  );

  const renderCaseDetailsPreview = () => (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Modal Header */}
      <div className="bg-white border-b border-gray-200 p-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Case Details</h3>
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
      
      {/* Modal Content */}
      <div className="p-3 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-600">Case Type</label>
            <div className="w-full h-6 bg-gray-100 rounded mt-1"></div>
          </div>
          <div>
            <label className="text-xs text-gray-600">Companies</label>
            <div className="w-full h-6 bg-gray-100 rounded mt-1"></div>
          </div>
        </div>
        
        <div>
          <label className="text-xs text-gray-600">Summary</label>
          <div className="w-full h-12 bg-gray-100 rounded mt-1"></div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-600">Accused</label>
            <div className="w-full h-6 bg-gray-100 rounded mt-1"></div>
          </div>
          <div>
            <label className="text-xs text-gray-600">Victims</label>
            <div className="w-full h-6 bg-gray-100 rounded mt-1"></div>
          </div>
        </div>
        
        <div>
          <label className="text-xs text-gray-600">Upload Files</label>
          <div className="w-full h-16 bg-gray-100 rounded mt-1 flex items-center justify-center">
            <FileText className="w-6 h-6 text-gray-400" />
          </div>
        </div>
        
        <div className="flex space-x-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1 text-xs">
            Go Back
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-slate-800 hover:bg-slate-900 text-white text-xs"
            onClick={() => onStepClick(3)}
          >
            Save & Continue
          </Button>
        </div>
      </div>
    </div>
  );

  const renderWorkspaceCardPreview = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold">Dashboard Overview</h3>
            <p className="text-xs text-gray-500">Manage your legal cases</p>
          </div>
          <div className="flex items-center space-x-2">
            <Bell className="w-3 h-3 text-gray-400" />
            <Search className="w-3 h-3 text-gray-400" />
            <User className="w-3 h-3 text-gray-400" />
          </div>
        </div>
      </div>
      
      {/* Workspaces Grid */}
      <div className="p-3 bg-gray-50">
        <div className="grid grid-cols-2 gap-2">
          {/* Workspace Card */}
          <div className="bg-white rounded border border-gray-200 p-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold">Johnson & Partners Merger</h4>
              <MoreVertical className="w-3 h-3 text-gray-400" />
            </div>
            
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Client:</span>
                <span>Law Firm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status:</span>
                <Badge className="bg-amber-100 text-amber-800 text-xs">In Progress</Badge>
              </div>
            </div>
            
            <Button variant="link" className="text-blue-600 text-xs p-0 mt-2">
              View Details
            </Button>
          </div>
          
          {/* Add New Card */}
          <div className="bg-white rounded border border-gray-200 p-3 flex flex-col items-center justify-center text-center">
            <FileText className="w-6 h-6 text-gray-400 mb-2" />
            <p className="text-xs text-gray-500 mb-2">Add more cases</p>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
              <Plus className="w-3 h-3 mr-1" />
              Add Case
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const previews = [
    renderDashboardPreview(),
    renderCreateModalPreview(),
    renderCaseDetailsPreview(),
    renderWorkspaceCardPreview()
  ];

  return (
    <div className="w-80 h-60">
      {previews[step] || renderDashboardPreview()}
    </div>
  );
}