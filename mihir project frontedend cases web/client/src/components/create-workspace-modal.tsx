import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

interface CreateWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (workspace: {
    name: string;
    client: string;
    caseType: string;
    description: string;
  }) => void;
}

export default function CreateWorkspaceModal({ isOpen, onClose, onSubmit }: CreateWorkspaceModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    client: "",
    caseType: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", client: "", caseType: "", description: "" });
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-white/95 backdrop-blur-md border-0 shadow-2xl rounded-2xl animate-bounce-in">
        <DialogHeader>
          <div className="flex items-center justify-between mb-4">
            <div>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Create New Workspace
              </DialogTitle>
              <p className="text-sm text-gray-600 mt-1">Set up your legal case workspace</p>
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
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="animate-slide-up">
            <Label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-2 block">Workspace Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter workspace name..."
              required
              className="rounded-xl border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300"
            />
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <Label htmlFor="client" className="text-sm font-semibold text-gray-700 mb-2 block">Client</Label>
            <Input
              id="client"
              value={formData.client}
              onChange={(e) => handleChange("client", e.target.value)}
              placeholder="Enter client name..."
              required
              className="rounded-xl border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300"
            />
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Label htmlFor="caseType" className="text-sm font-semibold text-gray-700 mb-2 block">Case Type</Label>
            <Select value={formData.caseType} onValueChange={(value) => handleChange("caseType", value)}>
              <SelectTrigger className="rounded-xl border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300">
                <SelectValue placeholder="Select case type..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="merger">Merger & Acquisition</SelectItem>
                <SelectItem value="criminal">Criminal Defense</SelectItem>
                <SelectItem value="civil">Civil Litigation</SelectItem>
                <SelectItem value="corporate">Corporate Law</SelectItem>
                <SelectItem value="intellectual">Intellectual Property</SelectItem>
                <SelectItem value="employment">Employment Law</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Label htmlFor="description" className="text-sm font-semibold text-gray-700 mb-2 block">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter case description..."
              rows={3}
              className="rounded-xl border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 resize-none"
            />
          </div>
          
          <div className="flex items-center space-x-4 pt-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              className="flex-1 rounded-xl border-gray-300 hover:bg-gray-50 transition-all duration-300 py-3 font-medium"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl py-3 font-medium"
            >
              Create Workspace
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
