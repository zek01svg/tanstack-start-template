import { ArrowRight, ShieldCheck, Mail, Database, Activity, Combine, KeyRound } from "lucide-react";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20 overflow-x-hidden">
      <div className="absolute inset-0 stark-gradient pointer-events-none opacity-50" />

      <main className="relative z-10 w-full max-w-5xl mx-auto py-24 md:py-26 px-6 flex flex-col items-center">
        <div className="text-center space-y-8 mb-20 md:mb-24">
          <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight gradient-text leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200 ">
            Build Less.
            <br />
            Ship Faster.
          </h1>

          <p className="max-w-xl mx-auto text-base md:text-lg text-muted-foreground font-light leading-relaxed opacity-0 animate-fade-up [animation-delay:400ms]">
            A production-grade TanStack Start foundation designed for builders. Zero-API logic,
            integrated auth, and high-fidelity observability pre-baked.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-4 opacity-0 animate-fade-up [animation-delay:600ms]">
            <a
              href="https://tanstack.com/start/latest/docs/framework/react/overview"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-foreground font-medium text-sm border-b border-foreground/30 py-3 hover:border-foreground transition-all"
            >
              Get Started
              <ArrowRight className="size-3.5 opacity-40 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://github.com/zek01svg/tanstack-start-template"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-muted-foreground font-medium text-sm border-b border-transparent py-3 hover:text-foreground hover:border-foreground/30 transition-all"
            >
              View on GitHub
              <ArrowRight className="size-3.5 opacity-40 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        <div className="w-full max-w-4xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-8 rounded-3xl space-y-4 group opacity-0 animate-fade-up [animation-delay:800ms]">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-foreground/5 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                  <Combine className="size-6 text-foreground/40" />
                </div>
                <h3 className="text-xl font-medium tracking-tight">Fullstack Harmony</h3>
              </div>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Bridge the gap between frontend and backend. TanStack Router meets{" "}
                <code>createServerFn</code> for absolute end-to-end consistency from your database
                to the UI.
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl space-y-4 group opacity-0 animate-fade-up [animation-delay:900ms]">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-foreground/5 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                  <KeyRound className="size-6 text-foreground/40" />
                </div>
                <h3 className="text-xl font-medium tracking-tight">Auth on Day One</h3>
              </div>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Login, signup, password reset, and session management — all pre-wired with
                Better-Auth. Skip the most time-consuming part of every new project.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-tile p-6 rounded-2xl space-y-3 group hover:border-foreground/10 opacity-0 animate-fade-up [animation-delay:1000ms]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-3.5 text-foreground/20" />
                <div className="text-[10px] font-bold tracking-widest text-foreground/40 uppercase">
                  Production Ready
                </div>
              </div>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">
                Better-Auth, Sentry, and optimized security headers pre-configured.
              </p>
            </div>

            <div className="glass-tile p-6 rounded-2xl space-y-3 group hover:border-foreground/10 opacity-0 animate-fade-up [animation-delay:1100ms]">
              <div className="flex items-center gap-2">
                <Mail className="size-3.5 text-foreground/20" />
                <div className="text-[10px] font-bold tracking-widest text-foreground/40 uppercase">
                  Email Ready
                </div>
              </div>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">
                Transactional email with Resend and React Email. Verification and password reset
                templates included.
              </p>
            </div>

            <div className="glass-tile p-6 rounded-2xl space-y-3 group hover:border-foreground/10 opacity-0 animate-fade-up [animation-delay:1200ms]">
              <div className="flex items-center gap-2">
                <Database className="size-3.5 text-foreground/20" />
                <div className="text-[10px] font-bold tracking-widest text-foreground/40 uppercase">
                  Type-Safe SQL
                </div>
              </div>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">
                Drizzle ORM for the absolute best developer experience with Postgres.
              </p>
            </div>

            <div className="glass-tile p-6 rounded-2xl space-y-3 group hover:border-foreground/10 opacity-0 animate-fade-up [animation-delay:1300ms]">
              <div className="flex items-center gap-2">
                <Activity className="size-3.5 text-foreground/20" />
                <div className="text-[10px] font-bold tracking-widest text-foreground/40 uppercase">
                  High-Fidelity QA
                </div>
              </div>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">
                Production-mirror testing with Vitest, Playwright, and Testcontainers.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
