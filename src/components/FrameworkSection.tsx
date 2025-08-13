const FrameworkSection = () => {
  return (
    <section id="framework" className="py-16 sm:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-foreground">
            Introducing the <span className="text-primary">AIVSS-Agentic Framework</span>
          </h2>
          
          <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-12 leading-relaxed px-4">
            The Agentic AI Vulnerability Scoring System (AIVSS) is a specialized framework created by OWASP projects 
            to extend the familiar CVSS model. It introduces the <span className="text-primary font-semibold">Agentic AI Risk Score (AARS)</span> to 
            quantify risks from an agent's intrinsic capabilities.
          </p>
          
          <div className="bg-gradient-card rounded-2xl p-4 sm:p-8 border border-border shadow-elevated mx-4">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-foreground">Formula Visualization</h3>
            
            <div className="code-block text-center">
              <div className="font-mono text-sm sm:text-lg md:text-xl text-primary break-all">
                AIVSS Score = ((CVSS Base Score + AARS) / 2) × Threat Multiplier
              </div>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
              <div className="text-center">
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-chart-1/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-6 sm:w-8 h-6 sm:h-8 bg-chart-1 rounded-full"></div>
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-foreground mb-2">CVSS Base Score</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">Traditional vulnerability metrics</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-chart-2/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-6 sm:w-8 h-6 sm:h-8 bg-chart-2 rounded-full"></div>
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-foreground mb-2">AARS</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">Agentic capabilities assessment</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-chart-3/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-6 sm:w-8 h-6 sm:h-8 bg-chart-3 rounded-full"></div>
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-foreground mb-2">Threat Multiplier</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">Environmental context factor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrameworkSection;