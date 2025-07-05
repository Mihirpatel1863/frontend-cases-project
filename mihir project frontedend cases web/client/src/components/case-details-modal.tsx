import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X, Upload } from "lucide-react";

interface CaseDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveDetails: (workspaceData: any) => void;
  workspace?: {
    id: number;
    name: string;
    client: string;
  };
}

export default function CaseDetailsModal({ isOpen, onClose, onSaveDetails, workspace }: CaseDetailsModalProps) {
  const [showSimpleForm, setShowSimpleForm] = useState(true);
  const [caseDescription, setCaseDescription] = useState("");
  const [formData, setFormData] = useState({
    caseType: "criminal",
    companies: "Johnson Bros, Standard Format",
    summary: "Initial consultation with client regarding merger proposal...",
    accused: "Amy Johnson, Big Easy",
    victims: "None Reported",
    allegations: "Client representatives, reference, and document to outside Official case SOI",
    facts: "None known beyond bringing from calling first, with evidence suggesting previous law joint down there's inconsistent allegations",
    incidentDate: "16-03-2022",
    representedBy: "Amy Johnson, Big Easy"
  });

  const handleRunAISummariser = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Running AI Summariser with:", caseDescription);
    setShowSimpleForm(false);
  };

  const handleSaveDetails = (e: React.FormEvent) => {
    e.preventDefault();
    const newWorkspace = {
      id: Date.now(),
      name: "Johnson & Partners Merger",
      client: "Law Firm: Big Easy",
      organizer: "By: michael.johnson",
      caseInfo: "45 witnesses | 12 were...",
      levelOfCare: "18 documents processing",
      status: "In Progress",
      createdAt: "May 3, 2024",
    };
    onSaveDetails(newWorkspace);
    onClose();
    setShowSimpleForm(true);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("File uploaded:", file.name);
    }
  };

  if (showSimpleForm) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-lg bg-white/95 backdrop-blur-md border-0 shadow-2xl rounded-2xl animate-bounce-in">
          <DialogHeader>
            <div className="flex items-center justify-between mb-2">
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Case Details
              </DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 rounded-full transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-sm text-gray-600">Upload case files or add details manually</p>
          </DialogHeader>
          
          <form onSubmit={handleRunAISummariser} className="space-y-6">
            <div className="animate-slide-up">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Upload the case files
              </label>
              
              {/* Enhanced File Upload Area */}
              <div className="group border-2 border-dashed border-teal-300 rounded-xl p-8 text-center hover:border-teal-500 hover:bg-teal-50/30 transition-all duration-300 bg-gradient-to-br from-gray-50/50 to-white/50">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Drag and drop your document
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    Or PDF, DOC, XL etc (Max 10MB)
                  </p>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-6 py-3 rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      Browse Files
                    </span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept=".pdf,.doc,.docx,.xls,.xlsx"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Add case facts manually
              </label>
              <Textarea
                value={caseDescription}
                onChange={(e) => setCaseDescription(e.target.value)}
                placeholder="Enter case description, key facts, and relevant details..."
                rows={4}
                className="w-full rounded-xl border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 resize-none"
              />
            </div>
            
            <div className="flex justify-end pt-2">
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Run AI Summariser
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-md border-0 shadow-2xl rounded-2xl animate-bounce-in">
        <DialogHeader>
          <div className="flex items-center justify-between mb-4">
            <div>
              <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Case Details
              </DialogTitle>
              <p className="text-sm text-gray-600 mt-1">Complete your case information</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 rounded-full transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>
        
        <form onSubmit={handleSaveDetails} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="animate-slide-up">
              <Label htmlFor="caseType" className="text-sm font-semibold text-gray-700 mb-2 block">Case Type</Label>
              <Select value={formData.caseType} onValueChange={(value) => handleChange("caseType", value)}>
                <SelectTrigger className="rounded-xl border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300">
                  <SelectValue placeholder="Select case type..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="criminal">Criminal Law</SelectItem>
                  <SelectItem value="civil">Civil Litigation</SelectItem>
                  <SelectItem value="corporate">Corporate Law</SelectItem>
                  <SelectItem value="intellectual">Intellectual Property</SelectItem>
                  <SelectItem value="employment">Employment Law</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="animate-slide-up" style={{ animationDelay: '0.05s' }}>
              <Label htmlFor="companies" className="text-sm font-semibold text-gray-700 mb-2 block">Companies Involved</Label>
              <Input
                id="companies"
                value={formData.companies}
                onChange={(e) => handleChange("companies", e.target.value)}
                placeholder="Enter company names..."
                className="rounded-xl border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300"
              />
            </div>
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <Label htmlFor="summary" className="text-sm font-semibold text-gray-700 mb-2 block">Summary</Label>
            <Textarea
              id="summary"
              value={formData.summary}
              onChange={(e) => handleChange("summary", e.target.value)}
              rows={3}
              placeholder="Brief case summary..."
              className="rounded-xl border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 resize-none"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="animate-slide-up" style={{ animationDelay: '0.15s' }}>
              <Label htmlFor="accused" className="text-sm font-semibold text-gray-700 mb-2 block">Accused</Label>
              <Input
                id="accused"
                value={formData.accused}
                onChange={(e) => handleChange("accused", e.target.value)}
                placeholder="Name of accused..."
                className="rounded-xl border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300"
              />
            </div>
            
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Label htmlFor="victims" className="text-sm font-semibold text-gray-700 mb-2 block">Victims</Label>
              <Input
                id="victims"
                value={formData.victims}
                onChange={(e) => handleChange("victims", e.target.value)}
                placeholder="Name of victims..."
                className="rounded-xl border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300"
              />
            </div>
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.25s' }}>
            <Label htmlFor="allegations" className="text-sm font-semibold text-gray-700 mb-2 block">Allegations</Label>
            <Textarea
              id="allegations"
              value={formData.allegations}
              onChange={(e) => handleChange("allegations", e.target.value)}
              rows={3}
              placeholder="List key allegations..."
              className="rounded-xl border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 resize-none"
            />
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Label htmlFor="facts" className="text-sm font-semibold text-gray-700 mb-2 block">Facts Summary</Label>
            <Textarea
              id="facts"
              value={formData.facts}
              onChange={(e) => handleChange("facts", e.target.value)}
              rows={3}
              placeholder="Summarize key facts..."
              className="rounded-xl border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 resize-none"
            />
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.35s' }}>
            <Label htmlFor="incidentDate" className="text-sm font-semibold text-gray-700 mb-2 block">Date of Incident</Label>
            <Input
              id="incidentDate"
              type="date"
              value={formData.incidentDate}
              onChange={(e) => handleChange("incidentDate", e.target.value)}
              className="rounded-xl border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300"
            />
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Label htmlFor="representedBy" className="text-sm font-semibold text-gray-700 mb-2 block">Represented by (External Attach)</Label>
            <div className="flex items-center space-x-3">
              <Button 
                type="button" 
                variant="outline" 
                className="bg-gradient-to-r from-slate-800 to-slate-900 text-white hover:from-slate-900 hover:to-black border-0 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 rounded-xl px-4 py-2"
              >
                More Details
              </Button>
              <Input
                id="representedBy"
                value={formData.representedBy}
                onChange={(e) => handleChange("representedBy", e.target.value)}
                placeholder="External representation details..."
                className="flex-1 rounded-xl border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4 pt-6 animate-slide-up" style={{ animationDelay: '0.45s' }}>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setShowSimpleForm(true)} 
              className="flex-1 rounded-xl border-gray-300 hover:bg-gray-50 transition-all duration-300 py-3 font-medium"
            >
              Go Back
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl py-3 font-medium"
            >
              Save Details
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
