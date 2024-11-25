import React, { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Button } from './ui/button';
import { Share2 } from 'lucide-react';
import { Input } from './ui/input';

const CollaborationPanel = () => {
  const [collaborators, setCollaborators] = useState([
    { id: 1, name: "Alice", active: true },
    { id: 2, name: "Bob", active: false },
    { id: 3, name: "Charlie", active: true },
  ]);

  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const handleInvite = () => {
    // Simulating invitation process
    console.log(`Invited ${inviteEmail} to collaborate`);
    setShowInviteDialog(false);
    setInviteEmail('');
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Real-time Collaboration</h3>
      <div className="flex space-x-2">
        {collaborators.map((collaborator) => (
          <TooltipProvider key={collaborator.id}>
            <Tooltip>
              <TooltipTrigger>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                    collaborator.active ? "bg-green-500" : "bg-gray-500"
                  }`}
                >
                  {collaborator.name[0]}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{collaborator.name}</p>
                <p>{collaborator.active ? "Active" : "Inactive"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogTrigger asChild>
          <Button>
            <Share2 className="mr-2 h-4 w-4" />
            Invite Collaborators
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Collaborators</DialogTitle>
            <DialogDescription>
              Enter the email address of the person you want to invite to collaborate on this design.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="collaborator@example.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
            <Button onClick={handleInvite}>Send Invitation</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CollaborationPanel;
