import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  category: string;
  features: string[];
  isPopular?: boolean;
  onClick?: () => void;
}

const AgentCard = ({ 
  title, 
  description, 
  icon: Icon, 
  category, 
  features,
  isPopular = false,
  onClick 
}: AgentCardProps) => {
  return (
    <Card className={cn(
      "group relative h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/10",
      "hover:border-primary/20 hover:-translate-y-1 cursor-pointer bg-card",
      isPopular && "ring-1 ring-accent/30"
    )}
    onClick={onClick}>
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
            className="w-full bg-primary hover:bg-primary-light transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
          >
            Try Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentCard;