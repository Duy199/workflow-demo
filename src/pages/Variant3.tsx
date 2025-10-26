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
  MiniMap,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Plus, ArrowLeft, Play, Pause, Trash2, Copy, Database, Zap, Filter, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

// Canvas Node Component
function CanvasNode({ data }: { data: any }) {
  const icons: any = {
    batch: Database,
    transform: Zap,
    filter: Filter,
    api: Mail,
  }
  const Icon = icons[data.icon] || Database

  return (
    <div className="bg-white rounded-lg shadow-lg border-2 border-[#020429] min-w-[200px]">
      <div className="bg-gradient-to-r from-[#020429] to-[#0a0d4a] text-white px-4 py-2 rounded-t-lg flex items-center gap-2">
        <Icon className="w-4 h-4 text-[#39FF14]" />
        <span className="font-semibold text-sm">{data.label}</span>
      </div>
      <div className="p-3">
        <div className="text-xs text-[#666] mb-2">{data.description}</div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#666]">Status:</span>
          <span className="px-2 py-0.5 bg-[#39FF14]/20 text-[#020429] rounded text-xs font-semibold">
            {data.status}
          </span>
        </div>
      </div>
    </div>
  )
}

const nodeTypes = {
  canvasNode: CanvasNode,
}

export default function Variant3() {
  const [showNodePalette, setShowNodePalette] = useState(true)

  const initialNodes: Node[] = [
    {
      id: '1',
      type: 'canvasNode',
      position: { x: 100, y: 100 },
      data: { 
        label: 'Start',
        icon: 'database',
        description: 'Workflow entry point',
        status: 'Active'
      },
    },
    {
      id: '2',
      type: 'canvasNode',
      position: { x: 400, y: 100 },
      data: { 
        label: 'Batch Items',
        icon: 'batch',
        description: 'Group items by size',
        status: 'Active'
      },
    },
    {
      id: '3',
      type: 'canvasNode',
      position: { x: 700, y: 100 },
      data: { 
        label: 'Transform',
        icon: 'transform',
        description: 'Convert data format',
        status: 'Active'
      },
    },
    {
      id: '4',
      type: 'canvasNode',
      position: { x: 400, y: 280 },
      data: { 
        label: 'Filter',
        icon: 'filter',
        description: 'Apply business rules',
        status: 'Active'
      },
    },
    {
      id: '5',
      type: 'canvasNode',
      position: { x: 700, y: 280 },
      data: { 
        label: 'Send API',
        icon: 'api',
        description: 'External API call',
        status: 'Active'
      },
    },
    {
      id: '6',
      type: 'canvasNode',
      position: { x: 1000, y: 190 },
      data: { 
        label: 'Complete',
        icon: 'database',
        description: 'Workflow end',
        status: 'Active'
      },
    },
  ]

  const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#020429', strokeWidth: 2 } },
    { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#020429', strokeWidth: 2 } },
    { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: '#020429', strokeWidth: 2 } },
    { id: 'e3-6', source: '3', target: '6', animated: true, style: { stroke: '#020429', strokeWidth: 2 } },
    { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: '#020429', strokeWidth: 2 } },
    { id: 'e5-6', source: '5', target: '6', animated: true, style: { stroke: '#020429', strokeWidth: 2 } },
  ]

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const nodeTemplates = [
    { type: 'batch', label: 'Batch Node', icon: 'batch', description: 'Group items together' },
    { type: 'transform', label: 'Transform Node', icon: 'transform', description: 'Convert data format' },
    { type: 'filter', label: 'Filter Node', icon: 'filter', description: 'Apply conditions' },
    { type: 'api', label: 'API Node', icon: 'api', description: 'External integration' },
  ]

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string, template: any) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.setData('nodeTemplate', JSON.stringify(template))
    event.dataTransfer.effectAllowed = 'move'
  }

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
          <h1 className="text-xl font-bold">Variant 3: Canvas Flow View</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-[#39FF14] text-[#020429] rounded-lg hover:bg-[#39FF14]/80 transition-colors font-semibold flex items-center gap-2">
            <Play size={16} />
            Run Workflow
          </button>
          <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors font-semibold flex items-center gap-2">
            <Pause size={16} />
            Pause
          </button>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Node Palette */}
        {showNodePalette && (
          <div className="w-64 bg-white border-r border-[#E2E0F1] p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#020429]">Node Palette</h2>
              <button 
                onClick={() => setShowNodePalette(false)}
                className="text-[#666] hover:text-[#020429]"
              >
                ×
              </button>
            </div>

            <div className="space-y-2">
              {nodeTemplates.map((template, idx) => {
                const icons: any = {
                  batch: Database,
                  transform: Zap,
                  filter: Filter,
                  api: Mail,
                }
                const Icon = icons[template.icon] || Database

                return (
                  <div
                    key={idx}
                    draggable
                    onDragStart={(e) => onDragStart(e, 'canvasNode', template)}
                    className="bg-[#F2F2F2] border-2 border-[#E2E0F1] rounded-lg p-3 cursor-move hover:border-[#39FF14] hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4 text-[#020429]" />
                      <span className="font-semibold text-sm text-[#020429]">{template.label}</span>
                    </div>
                    <p className="text-xs text-[#666]">{template.description}</p>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-[#E2E0F1]">
              <h3 className="text-sm font-bold text-[#020429] mb-2">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full px-3 py-2 bg-[#020429] text-white rounded hover:bg-[#39FF14] hover:text-[#020429] transition-colors text-sm font-semibold flex items-center gap-2">
                  <Copy size={14} />
                  Duplicate Selected
                </button>
                <button className="w-full px-3 py-2 bg-[#F2F2F2] text-[#020429] rounded hover:bg-[#E2E0F1] transition-colors text-sm font-semibold flex items-center gap-2">
                  <Trash2 size={14} />
                  Delete Selected
                </button>
              </div>
            </div>

            <div className="mt-6 p-3 bg-[#39FF14]/10 rounded-lg border border-[#39FF14]/30">
              <p className="text-xs text-[#020429] font-semibold mb-1">💡 Tip</p>
              <p className="text-xs text-[#666]">
                Drag nodes from the palette onto the canvas to build your workflow
              </p>
            </div>
          </div>
        )}

        {/* Canvas */}
        <div className="flex-1 relative">
          {!showNodePalette && (
            <button
              onClick={() => setShowNodePalette(true)}
              className="absolute top-4 left-4 z-10 px-4 py-2 bg-white border border-[#E2E0F1] rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-[#020429] font-semibold"
            >
              <Plus size={16} />
              Show Palette
            </button>
          )}

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
            <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#E2E0F1" />
            <Controls />
            <MiniMap 
              nodeColor={() => '#020429'}
              maskColor="rgba(2, 4, 41, 0.1)"
              className="bg-white border border-[#E2E0F1] rounded-lg"
            />
          </ReactFlow>

          {/* Workflow Info */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg border border-[#E2E0F1] p-4 max-w-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
              <span className="font-semibold text-sm text-[#020429]">Workflow Active</span>
            </div>
            <div className="space-y-1 text-xs text-[#666]">
              <div className="flex justify-between">
                <span>Total Nodes:</span>
                <span className="font-semibold text-[#020429]">{nodes.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Connections:</span>
                <span className="font-semibold text-[#020429]">{edges.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-[#39FF14] font-semibold">Running</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
