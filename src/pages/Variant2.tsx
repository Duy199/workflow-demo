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
import { Settings, Eye, Edit3, X, ArrowLeft, Save, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

// Detailed Node Component
function DetailedNode({ data, selected }: { data: any; selected: boolean }) {
  return (
    <div 
      className={`bg-white rounded-lg shadow-lg min-w-[240px] transition-all ${
        selected ? 'ring-2 ring-[#39FF14] shadow-2xl' : 'border border-[#E2E0F1]'
      }`}
    >
      {/* Node Header */}
      <div className="bg-gradient-to-r from-[#020429] to-[#0a0d4a] text-white px-4 py-3 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${selected ? 'bg-[#39FF14] animate-pulse' : 'bg-[#39FF14]'}`} />
            <span className="font-semibold text-sm">{data.label}</span>
          </div>
          <Settings className="w-4 h-4 text-[#39FF14]" />
        </div>
      </div>

      {/* Node Body - Summary View */}
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#666]">Type:</span>
          <span className="font-semibold text-[#020429]">{data.type}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#666]">Status:</span>
          <span className="px-2 py-0.5 bg-[#39FF14]/20 text-[#020429] rounded text-xs font-semibold">
            {data.status}
          </span>
        </div>
        {selected && (
          <div className="mt-2 pt-2 border-t border-[#E2E0F1] text-xs text-[#666]">
            Click to view details →
          </div>
        )}
      </div>
    </div>
  )
}

const nodeTypes = {
  detailedNode: DetailedNode,
}

export default function Variant2() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [editMode, setEditMode] = useState(false)

  const initialNodes: Node[] = [
    {
      id: '1',
      type: 'detailedNode',
      position: { x: 250, y: 100 },
      data: { 
        label: 'Batch Node',
        type: 'Processing',
        status: 'Active',
        description: 'Batches incoming items based on specified criteria and size.',
        settings: {
          batchSize: 10,
          batchType: 'Roll',
          timeout: 30,
          autoRetry: true,
          maxRetries: 3,
          errorHandling: 'Continue',
          logLevel: 'Info'
        }
      },
    },
    {
      id: '2',
      type: 'detailedNode',
      position: { x: 550, y: 100 },
      data: { 
        label: 'Transform Node',
        type: 'Transformation',
        status: 'Active',
        description: 'Transforms data from one format to another with validation.',
        settings: {
          inputFormat: 'JSON',
          outputFormat: 'XML',
          validateInput: true,
          validateOutput: true,
          charset: 'UTF-8',
          prettyPrint: true
        }
      },
    },
    {
      id: '3',
      type: 'detailedNode',
      position: { x: 400, y: 280 },
      data: { 
        label: 'API Call Node',
        type: 'Integration',
        status: 'Paused',
        description: 'Makes HTTP requests to external APIs with retry logic.',
        settings: {
          method: 'POST',
          endpoint: '/api/process',
          timeout: 5000,
          retries: 3,
          headers: { 'Content-Type': 'application/json' }
        }
      },
    },
  ]

  const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: true },
  ]

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node)
    setEditMode(false)
  }, [])

  return (
    <div className="h-screen flex">
      {/* Main Canvas */}
      <div className="flex-1 flex flex-col">
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
            <h1 className="text-xl font-bold">Variant 2: Detailed Node Editor</h1>
          </div>
          <div className="text-sm text-[#E2E0F1]">
            Side panel • Edit/View modes
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
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            connectionMode={ConnectionMode.Loose}
            fitView
            className="bg-[#F2F2F2]"
          >
            <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#E2E0F1" />
            <Controls />
          </ReactFlow>
        </div>
      </div>

      {/* Side Panel */}
      <div 
        className={`bg-white border-l border-[#E2E0F1] shadow-2xl transition-all duration-300 overflow-y-auto ${
          selectedNode ? 'w-96' : 'w-0'
        }`}
      >
        {selectedNode && (
          <div className="p-6">
            {/* Panel Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#020429]">Node Details</h2>
              <button 
                onClick={() => setSelectedNode(null)}
                className="text-[#666] hover:text-[#020429] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mode Toggle */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setEditMode(false)}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                  !editMode 
                    ? 'bg-[#020429] text-white' 
                    : 'bg-[#F2F2F2] text-[#666] hover:bg-[#E2E0F1]'
                }`}
              >
                <Eye className="w-4 h-4 inline mr-2" />
                View
              </button>
              <button
                onClick={() => setEditMode(true)}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                  editMode 
                    ? 'bg-[#39FF14] text-[#020429]' 
                    : 'bg-[#F2F2F2] text-[#666] hover:bg-[#E2E0F1]'
                }`}
              >
                <Edit3 className="w-4 h-4 inline mr-2" />
                Edit
              </button>
            </div>

            {/* Node Information */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-sm font-bold text-[#020429] mb-3 flex items-center gap-2">
                  <ChevronRight size={16} className="text-[#39FF14]" />
                  Basic Information
                </h3>
                <div className="space-y-3 ml-6">
                  <div>
                    <label className="text-xs font-semibold text-[#666] block mb-1">Node Name</label>
                    {editMode ? (
                      <input
                        type="text"
                        defaultValue={selectedNode.data.label}
                        className="w-full px-3 py-2 border border-[#E2E0F1] rounded focus:outline-none focus:ring-2 focus:ring-[#39FF14] text-sm"
                      />
                    ) : (
                      <div className="text-sm font-semibold text-[#020429]">{selectedNode.data.label}</div>
                    )}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#666] block mb-1">Type</label>
                    <div className="text-sm text-[#020429]">{selectedNode.data.type}</div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#666] block mb-1">Status</label>
                    {editMode ? (
                      <select className="w-full px-3 py-2 border border-[#E2E0F1] rounded focus:outline-none focus:ring-2 focus:ring-[#39FF14] text-sm">
                        <option>Active</option>
                        <option>Paused</option>
                        <option>Disabled</option>
                      </select>
                    ) : (
                      <span className="px-2 py-1 bg-[#39FF14]/20 text-[#020429] rounded text-xs font-semibold">
                        {selectedNode.data.status}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#666] block mb-1">Description</label>
                    {editMode ? (
                      <textarea
                        defaultValue={selectedNode.data.description}
                        rows={3}
                        className="w-full px-3 py-2 border border-[#E2E0F1] rounded focus:outline-none focus:ring-2 focus:ring-[#39FF14] text-sm"
                      />
                    ) : (
                      <div className="text-sm text-[#666]">{selectedNode.data.description}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div>
                <h3 className="text-sm font-bold text-[#020429] mb-3 flex items-center gap-2">
                  <ChevronRight size={16} className="text-[#39FF14]" />
                  Configuration
                </h3>
                <div className="space-y-3 ml-6">
                  {selectedNode.data.settings && Object.entries(selectedNode.data.settings).map(([key, value]) => (
                    <div key={key}>
                      <label className="text-xs font-semibold text-[#666] block mb-1 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      {editMode ? (
                        typeof value === 'boolean' ? (
                          <button className={`relative inline-flex h-6 w-11 items-center rounded-full ${value ? 'bg-[#39FF14]' : 'bg-[#E2E0F1]'}`}>
                            <span className={`${value ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
                          </button>
                        ) : typeof value === 'object' ? (
                          <textarea
                            defaultValue={JSON.stringify(value, null, 2)}
                            rows={3}
                            className="w-full px-3 py-2 border border-[#E2E0F1] rounded focus:outline-none focus:ring-2 focus:ring-[#39FF14] text-xs font-mono"
                          />
                        ) : (
                          <input
                            type="text"
                            defaultValue={value.toString()}
                            className="w-full px-3 py-2 border border-[#E2E0F1] rounded focus:outline-none focus:ring-2 focus:ring-[#39FF14] text-sm"
                          />
                        )
                      ) : (
                        <div className="text-sm text-[#020429] font-mono">
                          {typeof value === 'object' ? JSON.stringify(value) : value.toString()}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              {editMode && (
                <div className="flex gap-2 pt-4">
                  <button className="flex-1 px-4 py-3 bg-[#020429] text-white rounded-lg hover:bg-[#39FF14] hover:text-[#020429] transition-all font-semibold">
                    <Save className="w-4 h-4 inline mr-2" />
                    Save Changes
                  </button>
                  <button 
                    onClick={() => setEditMode(false)}
                    className="px-4 py-3 bg-[#F2F2F2] text-[#020429] rounded-lg hover:bg-[#E2E0F1] transition-all font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
