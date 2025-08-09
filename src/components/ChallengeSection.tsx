const ChallengeSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              The New Frontier of Risk: 
              <span className="text-primary block mt-2">Securing Agentic AI</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Agentic AI systems introduce unprecedented capabilities and, with them, novel security vulnerabilities. 
              Traditional scoring systems fall short in capturing the unique risks posed by agent autonomy, tool use, 
              and goal-driven behavior. <span className="text-foreground font-semibold">Understanding and quantifying these risks 
              is the first step to securing them.</span>
            </p>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-card rounded-2xl p-8 border border-border shadow-card">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-chart-1 rounded-full"></div>
                  <span className="text-foreground">Agent Autonomy Risks</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-chart-2 rounded-full"></div>
                  <span className="text-foreground">Tool Access Vulnerabilities</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-chart-3 rounded-full"></div>
                  <span className="text-foreground">Goal Manipulation Threats</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-chart-4 rounded-full"></div>
                  <span className="text-foreground">Context Injection Attacks</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-chart-5 rounded-full"></div>
                  <span className="text-foreground">Multi-Agent Coordination Risks</span>
                </div>
              </div>
            </div>
            
            {/* Floating elements for visual interest */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-chart-2/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengeSection;