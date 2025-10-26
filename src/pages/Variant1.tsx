import { useCallback, useState } from 'react'
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  ConnectionMode,
  Panel,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { ChevronDown, ChevronUp, Settings, Play, ArrowLeft, Package, Zap, Database, Filter } from 'lucide-react'
import { Link } from 'react-router-dom'

// Domino-style Node Component - Compact with integrated settings
function DominoNodeCompact({ data }: { data: any }) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const iconMap: any = {
    batch: Database,
    transform: Zap,
    filter: Filter,
    default: Package,
  }
  
  const Icon = iconMap[data.icon] || iconMap.default

  return (
    <div className="bg-white rounded-lg shadow-lg border-2 border-[#020429] min-w-[240px] transition-all hover:shadow-xl">
      {/* Node Header - Domino style */}
      <div className="bg-gradient-to-r from-[#020429] to-[#1a1d4a] px-3 py-2 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#39FF14] flex items-center justify-center">
            <Icon className="w-4 h-4 text-[#020429]" />
          </div>
          <span className="font-semibold text-sm text-white">{data.label}</span>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[#39FF14] hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
        >
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Node Body - Quick view */}
      <div className="p-3">
        <div className="text-xs text-[#666] mb-2">{data.description}</div>
        
        {/* Status badge */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[#666]">Status</span>
          <span className="px-2 py-0.5 bg-[#39FF14]/20 text-[#020429] rounded text-xs font-semibold">
            {data.status || 'Ready'}
          </span>
        </div>

        {/* Expandable settings */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-[#E2E0F1] space-y-2 animate-in fade-in duration-200">
            {/* Input field */}
            <div>
              <label className="text-xs font-semibold text-[#020429] block mb-1">
                {data.primarySetting || 'Configuration'}
              </label>
              <input
                type="text"
                defaultValue={data.primaryValue || ''}
                placeholder="Enter value..."
                className="w-full px-2 py-1.5 text-xs border border-[#E2E0F1] rounded focus:outline-none focus:ring-1 focus:ring-[#39FF14] focus:border-[#39FF14]"
              />
            </div>
            
            {/* Action button */}
            <button className="w-full px-3 py-1.5 bg-[#020429] text-white rounded hover:bg-[#39FF14] hover:text-[#020429] transition-colors text-xs font-semibold flex items-center justify-center gap-1.5">
              <Settings className="w-3 h-3" />
              Configure
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const nodeTypes = {
  dominoNode: DominoNodeCompact,
}

export default function Variant1() {
  const initialNodes: Node[] = [
    {
      id: '1',
      type: 'dominoNode',
      position: { x: 150, y: 100 },
      data: { 
        label: 'Batch Processor',
        icon: 'batch',
        description: 'Groups items by configured batch size',
        status: 'Ready',
        primarySetting: 'Batch Size',
        primaryValue: '10',
      },
    },
    {
      id: '2',
      type: 'dominoNode',
      position: { x: 500, y: 100 },
      data: { 
        label: 'Data Transform',
        icon: 'transform',
        description: 'Transform data format and structure',
        status: 'Ready',
        primarySetting: 'Output Format',
        primaryValue: 'JSON',
      },
    },
    {
      id: '3',
      type: 'dominoNode',
      position: { x: 325, y: 280 },
      data: { 
        label: 'Filter',
        icon: 'filter',
        description: 'Apply business rules and filters',
        status: 'Ready',
        primarySetting: 'Filter Type',
        primaryValue: 'Include',
      },
    },
  ]

  const initialEdges: Edge[] = [
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      animated: true,
      style: { stroke: '#020429', strokeWidth: 2 },
    },
    {
      id: 'e1-3',
      source: '1',
      target: '3',
      animated: true,
      style: { stroke: '#020429', strokeWidth: 2 },
    },
  ]

  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  return (
    <div className="h-screen flex flex-col bg-[#F2F2F2]">
      {/* Top Header - Domino style */}
      <header className="bg-white border-b border-[#E2E0F1] px-6 py-3 flex items-center justify-between shadow-sm z-20">
        <div className="flex items-center gap-4">
          <Link 
            to="/"
            className="flex items-center gap-2 text-[#020429] hover:text-[#39FF14] transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="font-semibold">Back</span>
          </Link>
          <div className="w-px h-6 bg-[#E2E0F1]" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#39FF14] flex items-center justify-center">
              <span className="text-[#020429] font-bold text-sm">1</span>
            </div>
            <div>
              <h1 className="text-base font-bold text-[#020429]">Variant 1: Domino-Style Compact</h1>
              <p className="text-xs text-[#666]">Inline editing • Expandable nodes</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-[#F2F2F2] text-[#020429] rounded hover:bg-[#E2E0F1] transition-colors text-sm font-semibold flex items-center gap-1.5">
            <Settings size={14} />
            Settings
          </button>
          <button className="px-3 py-1.5 bg-[#39FF14] text-[#020429] rounded hover:bg-[#39FF14]/80 transition-colors text-sm font-semibold flex items-center gap-1.5">
            <Play size={14} />
            Run
          </button>
        </div>
      </header>

      {/* Main Content - 3 Panel Layout like Domino */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Pieces Library (Domino style) */}
        <div className="w-64 bg-white border-r border-[#E2E0F1] overflow-y-auto">
          <div className="p-4">
            <h2 className="text-sm font-bold text-[#020429] mb-3 flex items-center gap-2">
              <Package size={16} className="text-[#39FF14]" />
              Available Pieces
            </h2>
            <div className="space-y-2">
              {[
                { name: 'Batch Processor', icon: Database, color: 'bg-blue-100' },
                { name: 'Data Transform', icon: Zap, color: 'bg-purple-100' },
                { name: 'Filter', icon: Filter, color: 'bg-green-100' },
              ].map((piece, idx) => {
                const Icon = piece.icon
                return (
                  <div
                    key={idx}
                    draggable
                    className="p-2.5 bg-[#F2F2F2] border border-[#E2E0F1] rounded cursor-move hover:border-[#39FF14] hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 ${piece.color} rounded flex items-center justify-center group-hover:bg-[#39FF14] transition-colors`}>
                        <Icon className="w-4 h-4 text-[#020429]" />
                      </div>
                      <span className="text-xs font-semibold text-[#020429]">{piece.name}</span>
                    </div>
                  </div>
                )
              })}
            </div>
            
            <div className="mt-6 p-3 bg-[#39FF14]/10 border border-[#39FF14]/30 rounded text-xs text-[#020429]">
              <p className="font-semibold mb-1">💡 Domino-Inspired</p>
              <p>Click nodes to expand settings inline</p>
            </div>
          </div>
        </div>

        {/* Center Canvas */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            connectionMode={ConnectionMode.Loose}
            fitView
            className="bg-[#fafafa]"
          >
            <Background 
              variant={BackgroundVariant.Dots} 
              gap={20} 
              size={1} 
              color="#E2E0F1"
            />
            <Controls className="bg-white border border-[#E2E0F1] rounded-lg shadow-lg" />
          </ReactFlow>
        </div>
      </div>
    </div>
  )
}
