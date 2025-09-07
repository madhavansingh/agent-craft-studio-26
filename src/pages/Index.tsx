import { useState } from "react";
import { toast } from "sonner";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import AgentCard from "@/components/AgentCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { agents, agentCategories } from "@/data/agents";
import { Search, Filter, Sparkles } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch = agent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory || agent.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });


  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <main className="space-y-16">
        <HeroSection />
        
        {/* Search and Filter Section */}
        <section className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8">
            {/* Category Filter Pills */}
            
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
                size="sm"
              >
                All Categories
              </Button>
              {agentCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.title ? "default" : "outline"}
                  onClick={() => setSelectedCategory(
                    selectedCategory === category.title ? null : category.title
                  )}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  {category.title}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          {(searchQuery || selectedCategory) && (
            <div className="mb-6">
              <Badge variant="secondary" className="text-sm">
                {filteredAgents.length} agent{filteredAgents.length !== 1 ? 's' : ''} found
              </Badge>
            </div>
          )}
        </section>

        {/* Agent Categories */}
        <div className="container mx-auto px-4 lg:px-8 space-y-16">
          {/* Show "More agents coming soon" caption */}
          {!selectedCategory && !searchQuery && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">More agents coming soon</p>
            </div>
          )}
          {!selectedCategory ? (
            // Show all categories
            agentCategories.map((category) => {
              const categoryAgents = filteredAgents.filter(agent => agent.category === category.title);
              
              if (categoryAgents.length === 0 && searchQuery) return null;
              
              return (
                <CategorySection
                  key={category.id}
                  title={category.title}
                  description={category.description}
                  icon={category.icon}
                >
                  {categoryAgents.map((agent) => (
                    <AgentCard
                      key={agent.id}
                      id={agent.id}
                      title={agent.title}
                      description={agent.description}
                      icon={agent.icon}
                      category={agent.category}
                      features={agent.features}
                      isPopular={agent.isPopular}
                    />
                  ))}
                </CategorySection>
              );
            })
          ) : (
            // Show selected category only
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  id={agent.id}
                  title={agent.title}
                  description={agent.description}
                  icon={agent.icon}
                  category={agent.category}
                  features={agent.features}
                  isPopular={agent.isPopular}
                />
              ))}
            </div>
          )}
          
          {filteredAgents.length === 0 && (
            <div className="text-center py-16">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Search className="h-16 w-16 text-muted-foreground/50" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">No agents found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or browse all categories
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory(null);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <section className="bg-gradient-to-r from-primary/5 to-accent/5 py-16">
          <div className="container mx-auto px-4 lg:px-8 text-center space-y-6">
            <div className="flex justify-center">
              <Sparkles className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Ready to Build Custom Workflows?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Chain multiple agents together to create powerful automated workflows 
              that handle complex multi-step tasks.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary-light">
              Create Workflow
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
