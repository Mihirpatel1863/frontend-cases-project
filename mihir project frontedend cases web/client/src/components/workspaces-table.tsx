import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MoreVertical, Briefcase, ChevronLeft, ChevronRight, FileText, Grid, List, Filter } from "lucide-react";

interface Workspace {
  id: number;
  name: string;
  client: string;
  organizer: string;
  caseInfo: string;
  levelOfCare: string;
  status: string;
  createdAt: string;
}

interface WorkspacesTableProps {
  workspaces: Workspace[];
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onCreateWorkspace: () => void;
  onViewDetails: (workspace: Workspace) => void;
}

export default function WorkspacesTable({ workspaces, viewMode, onViewModeChange, onCreateWorkspace, onViewDetails }: WorkspacesTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredWorkspaces = workspaces
    .filter(workspace => {
      const matchesSearch = workspace.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workspace.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workspace.organizer.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || workspace.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortBy as keyof Workspace];
      const bValue = b[sortBy as keyof Workspace];
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200";
      case "Completed":
        return "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200";
      case "Pending":
        return "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200";
      default:
        return "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200";
    }
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="pb-4 bg-gradient-to-r from-gray-50/50 to-white/50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Workspaces</h3>
            <p className="text-sm text-gray-600 mt-1">Manage and organize your legal cases</p>
          </div>
          <Button 
            onClick={onCreateWorkspace} 
            className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl px-6 py-3"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Workspace
          </Button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search workspaces, clients, or organizers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 rounded-xl border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300"
            />
          </div>
          
          {/* Filters and Controls */}
          <div className="flex items-center space-x-3">
            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 rounded-xl border-gray-200 focus:border-teal-500">
                <Filter className="w-4 h-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>

            {/* View Toggle */}
            <div className="flex items-center bg-gray-100 rounded-xl p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewModeChange('list')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-white shadow-md text-teal-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewModeChange('grid')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-white shadow-md text-teal-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid className="w-4 h-4" />
              </Button>
            </div>

            {/* Entries Per Page */}
            <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
              <SelectTrigger className="w-32 rounded-xl border-gray-200 focus:border-teal-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 Items</SelectItem>
                <SelectItem value="25">25 Items</SelectItem>
                <SelectItem value="50">50 Items</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {viewMode === 'grid' ? (
          // Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkspaces.map((workspace, index) => (
              <div
                key={workspace.id}
                className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-teal-300 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
                onClick={() => onViewDetails(workspace)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </Button>
                </div>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                  {workspace.name}
                </h4>
                
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Client:</span> {workspace.client}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Organizer:</span> {workspace.organizer}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Case:</span> {workspace.caseInfo}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge className={`${getStatusColor(workspace.status)} px-3 py-1 rounded-full text-xs font-medium`}>
                    {workspace.status}
                  </Badge>
                  <span className="text-xs text-gray-500">{workspace.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // List View
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Workspace Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Organizer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Case Info
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredWorkspaces.map((workspace, index) => (
                  <tr 
                    key={workspace.id} 
                    className="group hover:bg-gradient-to-r hover:from-teal-50 hover:to-white transition-all duration-300 cursor-pointer"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: 'fadeInLeft 0.5s ease-out forwards'
                    }}
                    onClick={() => onViewDetails(workspace)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 shadow-md">
                          <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">
                            {workspace.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            Created: {workspace.createdAt}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                      {workspace.client}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {workspace.organizer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {workspace.caseInfo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={`${getStatusColor(workspace.status)} px-3 py-1 rounded-full text-xs font-medium shadow-sm`}>
                        {workspace.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewDetails(workspace);
                        }}
                        className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 mr-2 px-3 py-1 rounded-lg transition-all duration-300"
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100 rounded-lg p-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {filteredWorkspaces.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">No workspaces found</h3>
            <p className="text-gray-400 mb-4">Try adjusting your search or filters</p>
            <Button onClick={onCreateWorkspace} className="bg-teal-600 hover:bg-teal-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create First Workspace
            </Button>
          </div>
        )}
        
        {/* Premium upgrade bar */}
        <div className="mt-6 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl p-4">
          <div className="flex items-center justify-center">
            <Plus className="w-5 h-5 mr-3 text-teal-400" />
            <span className="text-sm font-medium">Upgrade to Premium for unlimited litigation cases and advanced features</span>
          </div>
        </div>
        
        <div className="px-6 py-4 border-t border-border">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">97</span> results
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-blue-600 text-white">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
