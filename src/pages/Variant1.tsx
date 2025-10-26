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
} from 'reactflow'
import 'reactflow/dist/style.css'
import { ChevronDown, ChevronUp, Settings, Play, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

// Compact Node Component with integrated forms
function CompactNode({ data }: { data: any }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-xl border-2 border-[#020429] min-w-[280px]">
      {/* Node Header */}
      <div className="bg-[#020429] text-white px-4 py-3 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#39FF14]" />
          <span className="font-semibold">{data.label}</span>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[#39FF14] hover:text-white transition-colors"
        >
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* Compact View - Core Settings */}
      <div className="p-4 space-y-3">
        {/* Quick Status */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#666]">Status:</span>
          <span className="font-semibold text-[#020429]">{data.status || 'Active'}</span>
        </div>

        {/* Primary Setting */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#020429]">
            {data.primarySetting || 'Batch Size'}
          </label>
          <input
            type="text"
            defaultValue={data.primaryValue || '10'}
            className="w-full px-3 py-2 border border-[#E2E0F1] rounded focus:outline-none focus:ring-2 focus:ring-[#39FF14] focus:border-transparent text-sm"
          />
        </div>

        {/* Expandable Advanced Settings */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-[#E2E0F1] space-y-3 animate-in fade-in duration-200">
            {/* Batch Type */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#020429]">Batch Type</label>
              <select className="w-full px-3 py-2 border border-[#E2E0F1] rounded focus:outline-none focus:ring-2 focus:ring-[#39FF14] text-sm">
                <option>Roll</option>
                <option>Stretching Bundle</option>
                <option>Fixed Size</option>
              </select>
            </div>

            {/* Timeout Setting */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#020429]">Timeout (seconds)</label>
              <input
                type="number"
                defaultValue="30"
                className="w-full px-3 py-2 border border-[#E2E0F1] rounded focus:outline-none focus:ring-2 focus:ring-[#39FF14] text-sm"
              />
            </div>

            {/* Toggle Setting */}
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#020429]">Auto Retry</label>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#39FF14]">
                <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <button className="flex-1 px-3 py-2 bg-[#020429] text-white rounded hover:bg-[#39FF14] hover:text-[#020429] transition-colors text-sm font-semibold">
                <Settings className="w-3 h-3 inline mr-1" />
                Advanced
              </button>
              <button className="flex-1 px-3 py-2 bg-[#F2F2F2] text-[#020429] rounded hover:bg-[#39FF14] transition-colors text-sm font-semibold">
                <Play className="w-3 h-3 inline mr-1" />
                Test
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Node Description */}
      {isExpanded && (
        <div className="px-4 pb-4">
          <p className="text-xs text-[#666] italic">
            {data.description || 'Batches incoming items based on specified criteria and size.'}
          </p>
        </div>
      )}
    </div>
  )
}

const nodeTypes = {
  compactNode: CompactNode,
}

export default function Variant1() {
  const initialNodes: Node[] = [
    {
      id: '1',
      type: 'compactNode',
      position: { x: 250, y: 100 },
      data: { 
        label: 'Batch Node',
        status: 'Active',
        primarySetting: 'Batch Size',
        primaryValue: '10',
        description: 'Batches incoming items based on specified criteria and size.'
      },
    },
    {
      id: '2',
      type: 'compactNode',
      position: { x: 250, y: 350 },
      data: { 
        label: 'Transform Node',
        status: 'Active',
        primarySetting: 'Transform Type',
        primaryValue: 'JSON to XML',
        description: 'Transforms data from one format to another with validation.'
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
  ]

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#020429] text-white px-6 py-4 flex items-center justify-between shadow-lg z-10">
        <div className="flex items-center gap-4">
          <Link 
            to="/"
            className="flex items-center gap-2 hover:text-[#39FF14] transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </Link>
          <div className="w-px h-6 bg-[#E2E0F1]/30" />
          <h1 className="text-xl font-bold">Variant 1: Compact Node View</h1>
        </div>
        <div className="text-sm text-[#E2E0F1]">
          Integrated forms • Collapsible sections
        </div>
      </header>

      {/* Canvas */}
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
          className="bg-[#F2F2F2]"
        >
          <Background 
            variant={BackgroundVariant.Dots} 
            gap={16} 
            size={1} 
            color="#E2E0F1"
          />
          <Controls className="bg-white border border-[#E2E0F1] rounded-lg shadow-lg" />
        </ReactFlow>
      </div>

      {/* Info Panel */}
      <div className="bg-white border-t border-[#E2E0F1] px-6 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#39FF14]" />
              <span className="text-sm text-[#666]">Click chevron to expand/collapse</span>
            </div>
            <div className="flex items-center gap-2">
              <ChevronDown className="w-4 h-4 text-[#020429]" />
              <span className="text-sm text-[#666]">Settings integrated in node</span>
            </div>
          </div>
          <span className="text-xs text-[#666]">
            <strong>Concept:</strong> Minimal, inline editing for quick workflow adjustments
          </span>
        </div>
      </div>
    </div>
  )
}
