import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Modal } from "@/components/ui/modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EXTERNAL_AGENT_URLS } from "@/config/agents";

interface AgentCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: string;
  features: string[];
  isPopular?: boolean;
}

const AgentCard = ({ 
  id,
  title, 
  description, 
  icon: Icon, 
  category, 
  features,
  isPopular = false
}: AgentCardProps) => {
  const { isAuthenticated, addUsedAgent } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleTryNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      setShowModal(true);
      return;
    }

    // Add agent to used agents
    addUsedAgent(id);
    
    // Open external URL
    const externalUrl = EXTERNAL_AGENT_URLS[id as keyof typeof EXTERNAL_AGENT_URLS];
    if (externalUrl) {
      window.open(externalUrl, '_blank');
    }
  };

  return (
    <>
      <Card className={cn(
        "group relative h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/10",
        "hover:border-primary/20 hover:-translate-y-1 cursor-pointer bg-card",
        isPopular && "ring-1 ring-accent/30"
      )}>
        {isPopular && (
          <Badge className="absolute -top-2 right-4 bg-accent text-accent-foreground shadow-sm">
            Popular
          </Badge>
        )}
        
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className={cn(
              "flex h-12 w-12 items-center justify-center rounded-lg transition-colors",
              "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
            )}>
              <Icon className="h-6 w-6" />
            </div>
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
          </div>
          
          <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-1">
              {features.map((feature, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs bg-surface-secondary border-border/50"
                >
                  {feature}
                </Badge>
              ))}
            </div>
            
            <Button 
              className={cn(
                "w-full transition-all duration-200",
                isAuthenticated 
                  ? "bg-primary hover:bg-primary-light" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
              onClick={handleTryNow}
            >
              {!isAuthenticated && <Lock className="mr-2 h-4 w-4" />}
              Try Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Auth Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Sign in required"
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Please sign in to access this agent and unlock all features.
          </p>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => {
                setShowModal(false);
                navigate('/signin');
              }}
            >
              Sign In
            </Button>
            <Button 
              className="flex-1"
              onClick={() => {
                setShowModal(false);
                navigate('/signup');
              }}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AgentCard;