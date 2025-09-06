import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface CategorySectionProps {
  title: string;
  description: string;
  icon: LucideIcon;
  children: ReactNode;
}

const CategorySection = ({ title, description, icon: Icon, children }: CategorySectionProps) => {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </div>
    </section>
  );
};

export default CategorySection;