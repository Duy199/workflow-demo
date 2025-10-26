import { Link } from 'react-router-dom'
import { Workflow, Github, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020429] via-[#1a1d4a] to-[#020429] flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-[#39FF14]/10 rounded-2xl mb-4">
            <Workflow className="w-16 h-16 text-[#39FF14]" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            TCG Workflow Builder
          </h1>
          <p className="text-xl text-[#E2E0F1] mb-2">
            Domino-Inspired Visual Workflow Designer
          </p>
          <p className="text-[#E2E0F1]/70">
            Build complex data workflows with drag-and-drop simplicity
          </p>
        </div>

        <Link to="/builder" className="block group">
          <div className="bg-white rounded-2xl p-8 shadow-2xl hover:shadow-[0_0_40px_rgba(57,255,20,0.3)] transition-all duration-300 border-2 border-transparent hover:border-[#39FF14]">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-gradient-to-br from-[#020429] to-[#39FF14] rounded-xl group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[#020429] mb-3 group-hover:text-[#39FF14] transition-colors">
                  Open Workflow Builder
                </h2>
                <p className="text-[#666] mb-4">
                  Create powerful workflows with our Domino-inspired visual interface.
                  Drag pieces from the library, connect nodes, and configure your workflow in real-time.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-[#F2F2F2] text-[#020429] rounded-full text-sm font-semibold">
                    🎯 Drag & Drop
                  </span>
                  <span className="px-3 py-1 bg-[#F2F2F2] text-[#020429] rounded-full text-sm font-semibold">
                    ⚡ Real-time Configuration
                  </span>
                  <span className="px-3 py-1 bg-[#F2F2F2] text-[#020429] rounded-full text-sm font-semibold">
                    🔗 Visual Connections
                  </span>
                  <span className="px-3 py-1 bg-[#F2F2F2] text-[#020429] rounded-full text-sm font-semibold">
                    📦 8+ Node Types
                  </span>
                </div>
              </div>
              <div className="text-[#39FF14] text-4xl group-hover:translate-x-2 transition-transform">
                →
              </div>
            </div>
          </div>
        </Link>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="text-white font-semibold mb-2">TCG Branded</h3>
            <p className="text-[#E2E0F1]/70 text-sm">
              Beautiful UI with TCG's Royal Blue and Neon Green colors
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-3xl mb-3">⚙️</div>
            <h3 className="text-white font-semibold mb-2">Fully Functional</h3>
            <p className="text-[#E2E0F1]/70 text-sm">
              Not just a mockup - create, configure, and connect real workflow nodes
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="text-white font-semibold mb-2">Domino-Inspired</h3>
            <p className="text-[#E2E0F1]/70 text-sm">
              3-panel layout with pieces library, canvas, and live properties
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[#E2E0F1]/50 text-sm mb-4">
            Inspired by{' '}
            <a
              href="https://github.com/Tauffer-Consulting/domino"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#39FF14] hover:underline inline-flex items-center gap-1"
            >
              Domino (Activepieces)
              <Github className="w-3 h-3" />
            </a>
            {' '}• Built with React Flow & Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  )
}
