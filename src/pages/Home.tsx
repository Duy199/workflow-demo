import { Link } from 'react-router-dom'
import { ArrowRight, Workflow, Layout, Layers } from 'lucide-react'

export default function HomePage() {
  const variants = [
    {
      id: 1,
      title: 'Variant 1: Compact Node View',
      description: 'Integrated forms directly in nodes with collapse/expand functionality. Clean, compact interface for quick editing.',
      href: '/variant-1',
      icon: Layout,
      features: ['Inline editing', 'Collapsible sections', 'Minimal footprint']
    },
    {
      id: 2,
      title: 'Variant 2: Detailed Node Editor',
      description: 'Side panel editor with edit/view mode toggle. Comprehensive settings with advanced configuration options.',
      href: '/variant-2',
      icon: Layers,
      features: ['Side panel editor', 'Edit/View modes', 'Extended settings']
    },
    {
      id: 3,
      title: 'Variant 3: Canvas Flow View',
      description: 'Full workflow canvas with multiple connected nodes. Drag-and-drop interactions with node palette.',
      href: '/variant-3',
      icon: Workflow,
      features: ['Full canvas', 'Drag & drop', 'Node connections']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020429] via-[#020429] to-[#0a0d4a]">
      {/* Header */}
      <header className="border-b border-[#E2E0F1]/20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#39FF14] flex items-center justify-center">
              <span className="text-[#020429] font-bold text-xl">TCG</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Workflow Designer</h1>
              <p className="text-[#E2E0F1] text-sm">UX Concept Variants</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Introduction */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Node Interaction Concepts
          </h2>
          <p className="text-[#E2E0F1] text-lg leading-relaxed">
            Three different approaches to workflow node design and interaction. Each variant explores 
            different UX patterns for viewing and editing node settings, managing workflow complexity, 
            and providing an intuitive interface for end users.
          </p>
        </div>

        {/* Variants Grid */}
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {variants.map((variant) => {
            const Icon = variant.icon
            return (
              <Link 
                key={variant.id}
                to={variant.href}
                className="group"
              >
                <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#39FF14] h-full flex flex-col">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-lg bg-[#020429] flex items-center justify-center mb-4 group-hover:bg-[#39FF14] transition-colors">
                    <Icon className="w-7 h-7 text-[#39FF14] group-hover:text-[#020429] transition-colors" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-[#020429] mb-2 group-hover:text-[#39FF14] transition-colors">
                    {variant.title}
                  </h3>
                  <p className="text-[#666] mb-4 flex-grow">
                    {variant.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-4">
                    {variant.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-[#666]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-[#020429] font-semibold group-hover:text-[#39FF14] transition-colors">
                    <span>View Demo</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Notes Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-[#E2E0F1]/20">
          <h3 className="text-xl font-bold text-white mb-4">Design Notes</h3>
          <div className="grid md:grid-cols-2 gap-6 text-[#E2E0F1]">
            <div>
              <h4 className="font-semibold text-[#39FF14] mb-2">Brand Compliance</h4>
              <p className="text-sm">All variants follow TCG brand guidelines with Royal Blue (#020429) and Neon Green (#39FF14) color scheme, using Open Sans typography.</p>
            </div>
            <div>
              <h4 className="font-semibold text-[#39FF14] mb-2">Interactive Prototypes</h4>
              <p className="text-sm">Each variant is a functional prototype built with React Flow, demonstrating different approaches to node interaction and workflow management.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E2E0F1]/20 mt-12 py-6">
        <div className="container mx-auto px-6 text-center text-[#E2E0F1] text-sm">
          <p>The Customization Group - Workflow Designer Concepts</p>
          <p className="mt-1">Prepared for presentation - {new Date().toLocaleDateString()}</p>
        </div>
      </footer>
    </div>
  )
}
