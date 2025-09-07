import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Crown, Activity, LogOut, ArrowLeft } from 'lucide-react';
import { agents } from '@/data/agents';

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/signin');
    return null;
  }

  const usedAgents = agents.filter(agent => user.usedAgents.includes(agent.id));

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>

        {/* Profile Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Profile Information</span>
            </CardTitle>
            <CardDescription>
              Manage your account settings and view your activity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{user.name}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{user.email}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Plan</label>
                <div className="flex items-center space-x-2">
                  <Crown className="h-4 w-4 text-accent" />
                  <Badge variant="secondary">{user.plan}</Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Agents Used</label>
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{user.usedAgents.length} agents</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Recent Agent Activity</span>
            </CardTitle>
            <CardDescription>
              Agents you've used recently
            </CardDescription>
          </CardHeader>
          <CardContent>
            {usedAgents.length === 0 ? (
              <div className="text-center py-8">
                <Activity className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No agents used yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start exploring agents to see your activity here
                </p>
                <Button onClick={() => navigate('/')}>
                  Explore Agents
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {usedAgents.map((agent, index) => (
                  <div key={agent.id}>
                    <div className="flex items-start space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <agent.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h4 className="text-sm font-medium text-foreground">{agent.title}</h4>
                        <p className="text-sm text-muted-foreground">{agent.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {agent.features.map((feature, featureIndex) => (
                            <Badge key={featureIndex} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {agent.category}
                      </Badge>
                    </div>
                    {index < usedAgents.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;