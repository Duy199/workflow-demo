import { useCallback, useState, DragEvent } from 'react'
import ReactFlow, {
  Node,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  ConnectionMode,
  MiniMap,
  NodeTypes,
  Handle,
  Position,
} from 'reactflow'
import 'reactflow/dist/style.css'
import {
  ArrowLeft,
  Play,
  Settings,
  Download,
  Upload,
  Trash2,
  Plus,
  X,
  Database,
  Zap,
  Filter,
  Mail,
  Code,
  FileText,
  GitBranch,
  Clock,
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'

// Node type definitions
interface NodeData {
  label: string
  type: string
  icon: string
  config: Record<string, any>
  inlineExpanded?: boolean
}

// Available piece types
const availablePieces = [
  { type: 'http', label: 'HTTP Request', icon: Mail, color: 'bg-blue-100', description: 'Make HTTP API calls' },
  { type: 'database', label: 'Database Query', icon: Database, color: 'bg-purple-100', description: 'Query databases' },
  { type: 'transform', label: 'Data Transform', icon: Zap, color: 'bg-yellow-100', description: 'Transform data format' },
  { type: 'filter', label: 'Filter', icon: Filter, color: 'bg-green-100', description: 'Filter data by conditions' },
  { type: 'script', label: 'Python Script', icon: Code, color: 'bg-red-100', description: 'Run custom Python code' },
  { type: 'file', label: 'File Operation', icon: FileText, color: 'bg-orange-100', description: 'Read/write files' },
  { type: 'branch', label: 'Conditional Branch', icon: GitBranch, color: 'bg-indigo-100', description: 'Branch workflow logic' },
  { type: 'delay', label: 'Delay/Wait', icon: Clock, color: 'bg-pink-100', description: 'Add delay between steps' },
]

// Custom Node Component
function WorkflowNode({ data, selected, id }: { data: NodeData; selected: boolean; id: string }) {
  const piece = availablePieces.find(p => p.type === data.type) || availablePieces[0]
  const Icon = piece.icon
  
  // Check if this node should show inline form (placeholder for inline mode detection)
  const showInlineForm = selected && data.inlineExpanded

  return (
    <div
      className={`bg-white rounded-lg shadow-lg border-2 transition-all relative ${
        selected ? 'border-[#39FF14] shadow-2xl' : 'border-[#020429]'
      } ${showInlineForm ? 'min-w-[400px]' : 'min-w-[180px]'}`}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-[#39FF14] !border-2 !border-[#020429]"
      />
      
      <div className="bg-gradient-to-r from-[#020429] to-[#1a1d4a] px-3 py-2 rounded-t-lg">
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 ${piece.color} rounded flex items-center justify-center`}>
            <Icon className="w-4 h-4 text-[#020429]" />
          </div>
          <span className="font-semibold text-sm text-white truncate">{data.label}</span>
        </div>
      </div>
      
      {/* Collapsed View */}
      {!showInlineForm && (
        <div className="p-3">
          <p className="text-xs text-[#666] mb-2">{piece.description}</p>
          {selected && (
            <div className="text-xs text-[#39FF14] font-semibold">
              Click to configure →
            </div>
          )}
        </div>
      )}

      {/* Inline Expanded Form */}
      {showInlineForm && (
        <div className="p-3 space-y-3 max-h-[400px] overflow-y-auto">
          <div className="text-xs font-semibold text-[#39FF14] mb-2">
            ▼ Inline Edit Mode
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-[#020429] mb-1">Node Name</label>
            <input
              type="text"
              defaultValue={data.label}
              className="w-full px-2 py-1.5 text-xs border border-[#E2E0F1] rounded focus:outline-none focus:ring-1 focus:ring-[#39FF14]"
            />
          </div>

          {data.type === 'http' && (
            <>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-[#020429] mb-1">Method</label>
                  <select className="w-full px-2 py-1.5 text-xs border border-[#E2E0F1] rounded focus:outline-none focus:ring-1 focus:ring-[#39FF14]">
                    <option>GET</option>
                    <option>POST</option>
                    <option>PUT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#020429] mb-1">Timeout</label>
                  <input
                    type="number"
                    defaultValue="30"
                    className="w-full px-2 py-1.5 text-xs border border-[#E2E0F1] rounded focus:outline-none focus:ring-1 focus:ring-[#39FF14]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#020429] mb-1">URL</label>
                <input
                  type="text"
                  placeholder="https://api.example.com"
                  className="w-full px-2 py-1.5 text-xs border border-[#E2E0F1] rounded focus:outline-none focus:ring-1 focus:ring-[#39FF14]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#020429] mb-1">Auth Token</label>
                <input
                  type="text"
                  placeholder="Bearer token..."
                  className="w-full px-2 py-1.5 text-xs border border-[#E2E0F1] rounded focus:outline-none focus:ring-1 focus:ring-[#39FF14] font-mono"
                />
              </div>
            </>
          )}

          {data.type === 'database' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#020429] mb-1">Database</label>
                <select className="w-full px-2 py-1.5 text-xs border border-[#E2E0F1] rounded focus:outline-none focus:ring-1 focus:ring-[#39FF14]">
                  <option>PostgreSQL</option>
                  <option>MySQL</option>
                  <option>MongoDB</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#020429] mb-1">Query</label>
                <textarea
                  placeholder="SELECT * FROM..."
                  rows={2}
                  className="w-full px-2 py-1.5 text-xs border border-[#E2E0F1] rounded focus:outline-none focus:ring-1 focus:ring-[#39FF14] font-mono"
                />
              </div>
            </>
          )}

          <div className="flex gap-2 pt-2 border-t border-[#E2E0F1]">
            <button className="flex-1 px-3 py-1.5 bg-[#39FF14] text-[#020429] rounded text-xs font-semibold hover:bg-[#39FF14]/80 transition-colors">
              Save
            </button>
            <button className="px-3 py-1.5 bg-[#F2F2F2] text-[#666] rounded text-xs font-semibold hover:bg-[#E2E0F1] transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}
      
      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-[#39FF14] !border-2 !border-[#020429]"
      />
    </div>
  )
}

const nodeTypes: NodeTypes = {
  workflow: WorkflowNode,
}

type VariantMode = 'side-panel' | 'inline' | 'modal'

export default function WorkflowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [nodeIdCounter, setNodeIdCounter] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [variantMode, setVariantMode] = useState<VariantMode>('side-panel')

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ 
      ...params, 
      animated: true, 
      style: { stroke: '#020429', strokeWidth: 2.5 },
      type: 'smoothstep',
    }, eds)),
    [setEdges]
  )

  const onNodeClick = useCallback((_: any, node: Node) => {
    if (variantMode === 'inline') {
      // Toggle inline edit mode
      const isCurrentlySelected = selectedNode?.id === node.id
      setSelectedNode(isCurrentlySelected ? null : node)
      
      // Toggle inline expansion in node data
      setNodes((nds: any) =>
        nds.map((n: any) => {
          if (n.id === node.id) {
            return {
              ...n,
              data: {
                ...n.data,
                inlineExpanded: !isCurrentlySelected,
              },
            }
          }
          // Collapse other nodes in inline mode
          return {
            ...n,
            data: {
              ...n.data,
              inlineExpanded: false,
            },
          }
        })
      )
    } else if (variantMode === 'modal') {
      // Open modal
      setSelectedNode(node)
    } else {
      // Side panel mode
      setSelectedNode(node)
    }
  }, [variantMode, selectedNode, setNodes])

  // Drag and drop handler
  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault()

      const type = event.dataTransfer.getData('application/reactflow')
      if (!type) return

      const piece = availablePieces.find(p => p.type === type)
      if (!piece) return

      const position = {
        x: event.clientX - 250,
        y: event.clientY - 100,
      }

      const newNode: Node = {
        id: `node-${nodeIdCounter}`,
        type: 'workflow',
        position,
        data: {
          label: piece.label,
          type: piece.type,
          icon: piece.type,
          config: {},
        },
      }

      setNodes((nds) => [...nds, newNode])
      setNodeIdCounter((prev) => prev + 1)
    },
    [nodeIdCounter, setNodes]
  )

  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  const deleteNode = () => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id))
      setEdges((eds) => eds.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id))
      setSelectedNode(null)
    }
  }

  const clearCanvas = () => {
    if (window.confirm('Clear all nodes and connections?')) {
      setNodes([])
      setEdges([])
      setSelectedNode(null)
    }
  }

  const updateNodeConfig = (key: string, value: any) => {
    if (!selectedNode) return
    
    setNodes((nds: any) =>
      nds.map((node: any) => {
        if (node.id === selectedNode.id) {
          return {
            ...node,
            data: {
              ...node.data,
              config: {
                ...node.data.config,
                [key]: value,
              },
            },
          }
        }
        return node
      })
    )
    
    // Update selectedNode state
    setSelectedNode((prev: any) => {
      if (!prev || prev.id !== selectedNode.id) return prev
      return {
        ...prev,
        data: {
          ...prev.data,
          config: {
            ...prev.data.config,
            [key]: value,
          },
        },
      }
    })
  }

  return (
    <div className="h-screen flex flex-col bg-[#F2F2F2]">
      {/* Header */}
      <header className="bg-white border-b border-[#E2E0F1] px-6 py-3 flex items-center justify-between shadow-sm z-20">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-[#020429] hover:text-[#39FF14] transition-colors">
            <ArrowLeft size={18} />
            <span className="font-semibold">Home</span>
          </Link>
          <div className="w-px h-6 bg-[#E2E0F1]" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#020429] to-[#39FF14] flex items-center justify-center">
              <span className="text-white font-bold text-lg">TCG</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#020429]">Workflow Builder</h1>
              <p className="text-xs text-[#666]">Domino-inspired workflow designer</p>
            </div>
          </div>
          <div className="w-px h-6 bg-[#E2E0F1]" />
          {/* Variant Mode Toggle */}
          <div className="flex items-center gap-2 bg-[#F2F2F2] p-1 rounded-lg">
            <button
              onClick={() => setVariantMode('side-panel')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-all ${
                variantMode === 'side-panel'
                  ? 'bg-white text-[#020429] shadow-sm'
                  : 'text-[#666] hover:text-[#020429]'
              }`}
            >
              Side Panel
            </button>
            <button
              onClick={() => setVariantMode('inline')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-all ${
                variantMode === 'inline'
                  ? 'bg-white text-[#020429] shadow-sm'
                  : 'text-[#666] hover:text-[#020429]'
              }`}
            >
              Inline Edit
            </button>
            <button
              onClick={() => setVariantMode('modal')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-all ${
                variantMode === 'modal'
                  ? 'bg-white text-[#020429] shadow-sm'
                  : 'text-[#666] hover:text-[#020429]'
              }`}
            >
              Modal
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 bg-[#F2F2F2] text-[#020429] rounded hover:bg-[#E2E0F1] transition-colors text-sm font-semibold flex items-center gap-2">
            <Upload size={14} />
            Import
          </button>
          <button className="px-3 py-2 bg-[#F2F2F2] text-[#020429] rounded hover:bg-[#E2E0F1] transition-colors text-sm font-semibold flex items-center gap-2">
            <Download size={14} />
            Export
          </button>
          <button
            onClick={clearCanvas}
            className="px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors text-sm font-semibold flex items-center gap-2"
          >
            <Trash2 size={14} />
            Clear
          </button>
          <button className="px-4 py-2 bg-[#39FF14] text-[#020429] rounded hover:bg-[#39FF14]/80 transition-colors text-sm font-semibold flex items-center gap-2">
            <Play size={14} />
            Run Workflow
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Pieces Library */}
        <div 
          className={`bg-white border-r border-[#E2E0F1] overflow-y-auto transition-all duration-300 ${
            sidebarOpen ? 'w-72' : 'w-0'
          }`}
        >
          {sidebarOpen && (
            <div className="p-4 w-72">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-[#020429]">Pieces</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-[#666] hover:text-[#020429] transition-colors"
                  title="Collapse sidebar"
                >
                  <ChevronLeft size={18} />
                </button>
              </div>

              {/* Search Bar */}
              <div className="mb-4 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666] w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search pieces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-[#E2E0F1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39FF14] focus:border-[#39FF14]"
                />
              </div>

              {/* Pieces Count */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[#666]">Available pieces</span>
                <span className="px-2 py-0.5 bg-[#39FF14]/20 text-[#020429] text-xs font-semibold rounded">
                  {availablePieces.filter(p => 
                    p.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.description.toLowerCase().includes(searchQuery.toLowerCase())
                  ).length}
                </span>
              </div>

              {/* Pieces List */}
              <div className="space-y-2">
                {availablePieces
                  .filter(p => 
                    p.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.description.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((piece) => {
                    const Icon = piece.icon
                    return (
                      <div
                        key={piece.type}
                        draggable
                        onDragStart={(e) => onDragStart(e, piece.type)}
                        className="p-3 bg-[#F2F2F2] border-2 border-[#E2E0F1] rounded-lg cursor-move hover:border-[#39FF14] hover:shadow-md transition-all group"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 ${piece.color} rounded-lg flex items-center justify-center group-hover:bg-[#39FF14] transition-colors flex-shrink-0`}>
                            <Icon className="w-5 h-5 text-[#020429]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-[#020429] truncate">{piece.label}</h3>
                            <p className="text-xs text-[#666] mt-0.5">{piece.description}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>

              {/* Help Section */}
              <div className="mt-6 p-4 bg-[#39FF14]/10 border border-[#39FF14]/30 rounded-lg">
                <p className="text-xs font-semibold text-[#020429] mb-2">💡 How to use</p>
                <ul className="text-xs text-[#020429] space-y-1">
                  <li>• Drag pieces to canvas</li>
                  <li>• Connect nodes by dragging</li>
                  <li>• Click node to configure</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Toggle Button (when collapsed) */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white border border-[#E2E0F1] rounded-r-lg p-2 shadow-lg hover:bg-[#F2F2F2] transition-colors"
            title="Open sidebar"
          >
            <ChevronRight size={18} className="text-[#020429]" />
          </button>
        )}

        {/* Center Canvas */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            connectionMode={ConnectionMode.Loose}
            fitView
            className="bg-[#fafafa]"
          >
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#E2E0F1" />
            <Controls className="bg-white border border-[#E2E0F1] rounded-lg shadow-lg" />
            <MiniMap
              nodeColor={() => '#020429'}
              maskColor="rgba(2, 4, 41, 0.1)"
              className="bg-white border border-[#E2E0F1] rounded-lg"
            />
          </ReactFlow>

          {/* Empty State */}
          {nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <Plus className="w-16 h-16 text-[#E2E0F1] mx-auto mb-4" />
                <p className="text-xl font-semibold text-[#020429] mb-2">Start Building Your Workflow</p>
                <p className="text-[#666]">Drag pieces from the left sidebar to get started</p>
              </div>
            </div>
          )}

          {/* Workflow Stats */}
          {nodes.length > 0 && (
            <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg border border-[#E2E0F1] p-3">
              <div className="flex items-center gap-4 text-xs">
                <div>
                  <span className="text-[#666]">Nodes:</span>
                  <span className="ml-1 font-semibold text-[#020429]">{nodes.length}</span>
                </div>
                <div className="w-px h-4 bg-[#E2E0F1]" />
                <div>
                  <span className="text-[#666]">Connections:</span>
                  <span className="ml-1 font-semibold text-[#020429]">{edges.length}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Properties Panel (Side Panel Mode Only) */}
        {selectedNode && variantMode === 'side-panel' && (
          <div className="w-80 bg-white border-l border-[#E2E0F1] overflow-y-auto">
            <div className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-[#020429]">Node Configuration</h2>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="text-[#666] hover:text-[#020429] transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Node Info */}
              <div className="mb-4 p-3 bg-[#F2F2F2] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  {(() => {
                    const piece = availablePieces.find(p => p.type === selectedNode.data.type)
                    const Icon = piece?.icon || Database
                    return (
                      <div className={`w-8 h-8 ${piece?.color || 'bg-gray-100'} rounded flex items-center justify-center`}>
                        <Icon className="w-4 h-4 text-[#020429]" />
                      </div>
                    )
                  })()}
                  <span className="font-semibold text-sm text-[#020429]">{selectedNode.data.label}</span>
                </div>
                <p className="text-xs text-[#666]">ID: {selectedNode.id}</p>
              </div>

              {/* Configuration Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#020429] mb-2">Node Name</label>
                  <input
                    type="text"
                    defaultValue={selectedNode.data.label}
                    onChange={(e) => {
                      setNodes((nds) =>
                        nds.map((node) =>
                          node.id === selectedNode.id
                            ? { ...node, data: { ...node.data, label: e.target.value } }
                            : node
                        )
                      )
                    }}
                    className="w-full px-3 py-2 text-sm border border-[#E2E0F1] rounded focus:outline-none focus:ring-2 focus:ring-[#39FF14] focus:border-[#39FF14]"
                  />
                </div>

                {/* Dynamic configuration based on node type */}
                {selectedNode.data.type === 'http' && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-[#020429] mb-2">HTTP Method</label>
                      <select
                        onChange={(e) => updateNodeConfig('method', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-[#E2E0F1] rounded focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
                      >
                        <option>GET</option>
                        <option>POST</option>
                        <option>PUT</option>
                        <option>PATCH</option>
                        <option>DELETE</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#020429] mb-2">URL</label>
                      <input
                        type="text"
                        placeholder="https://api.example.com/endpoint"
                        onChange={(e) => updateNodeConfig('url', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-[#E2E0F1] rounded focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
                      />
                    </div>
                    
                    {/* Authentication */}
                    <div>
                      <label className="block text-xs font-semibold text-[#020429] mb-2">Authentication</label>
                      <select
                        onChange={(e) => updateNodeConfig('authType', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-[#E2E0F1] rounded focus:outline-none focus:ring-2 focus:ring-[#39FF14] mb-2"
                      >
                        <option value="">None</option>
                        <option value="bearer">Bearer Token</option>
                        <option value="apikey">API Key</option>
                        <option value="basic">Basic Auth</option>
                      </select>
                      
                      <input
                        type="text"
                        placeholder="Token / API Key"
                        onChange={(e) => updateNodeConfig('authToken', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-[#E2E0F1] rounded focus:outline-none focus:ring-2 focus:ring-[#39FF14] font-mono"
                      />
                    </div>

                    {/* Headers */}
                    <div>
                      <label className="block text-xs font-semibold text-[#020429] mb-2">Headers (JSON)</label>
                      <textarea
                        placeholder='{"Content-Type": "application/json"}'
                        onChange={(e) => updateNodeConfig('headers', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 text-sm border border-[#E2E0F1] rounded focus:outline-none focus:ring-2 focus:ring-[#39FF14] font-mono"
                      />
                    </div>

                    {/* Query Parameters */}
                    <div>
                      <label className="block text-xs font-semibold text-[#020429] mb-2">Query Params (JSON)</label>
                      <textarea
                        placeholder='{"page": 1, "limit": 10}'
                        onChange={(e) => updateNodeConfig('queryParams', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 text-sm border border-[#E2E0F1] rounded focus:outline-none focus:ring-2 focus:ring-[#39FF14] font-mono"
                      />
                    </div>

                    {/* Body (for POST/PUT/PATCH) */}
                    <div>
                      <label className="block text-xs font-semibold text-[#020429] mb-2">Body (Raw JSON)</label>
                      <textarea
                        placeholder='{\n  "name": "John Doe",\n  "email": "john@example.com"\n}'
                        onChange={(e) => updateNodeConfig('body', e.target.value)}
                        rows={6}
                        className="w-full px-3 py-2 text-xs border border-[#E2E0F1] rounded focus:outline-none focus:ring-2 focus:ring-[#39FF14] font-mono"
                      />
                      <p className="text-xs text-[#666] mt-1">💡 For POST, PUT, PATCH methods</p>
                    </div>

                    {/* Response Handling */}
                    <div>
                      <label className="block text-xs font-semibold text-[#020429] mb-2">Timeout (seconds)</label>
                      <input
                        type="number"
                        placeholder="30"
                        defaultValue="30"
                        onChange={(e) => updateNodeConfig('timeout', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-[#E2E0F1] rounded focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
                      />
                    </div>
                  </>
                )}

                {selectedNode.data.type === 'database' && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-[#020429] mb-2">Database Type</label>
                      <select
                        onChange={(e) => updateNodeConfig('dbType', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-[#E2E0F1] rounded focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
                      >
                        <option>PostgreSQL</option>
                        <option>MySQL</option>
                        <option>MongoDB</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#020429] mb-2">Query</label>
                      <textarea
                        placeholder="SELECT * FROM table"
                        onChange={(e) => updateNodeConfig('query', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 text-sm border border-[#E2E0F1] rounded focus:outline-none focus:ring-2 focus:ring-[#39FF14] font-mono"
                      />
                    </div>
                  </>
                )}

                {selectedNode.data.type === 'transform' && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-[#020429] mb-2">Input Format</label>
                      <select
                        onChange={(e) => updateNodeConfig('inputFormat', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-[#E2E0F1] rounded focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
                      >
                        <option>JSON</option>
                        <option>XML</option>
                        <option>CSV</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#020429] mb-2">Output Format</label>
                      <select
                        onChange={(e) => updateNodeConfig('outputFormat', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-[#E2E0F1] rounded focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
                      >
                        <option>JSON</option>
                        <option>XML</option>
                        <option>CSV</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Generic text input for other types */}
                <div>
                  <label className="block text-xs font-semibold text-[#020429] mb-2">Description</label>
                  <textarea
                    placeholder="Add notes about this node..."
                    onChange={(e) => updateNodeConfig('description', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 text-sm border border-[#E2E0F1] rounded focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 space-y-2">
                <button className="w-full px-4 py-2 bg-[#020429] text-white rounded hover:bg-[#39FF14] hover:text-[#020429] transition-colors text-sm font-semibold flex items-center justify-center gap-2">
                  <Settings size={14} />
                  Advanced Settings
                </button>
                <button
                  onClick={deleteNode}
                  className="w-full px-4 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <Trash2 size={14} />
                  Delete Node
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal Overlay (Modal Mode Only) */}
      {selectedNode && variantMode === 'modal' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-8">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#020429] to-[#1a1d4a] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {(() => {
                  const piece = availablePieces.find(p => p.type === selectedNode.data.type)
                  const Icon = piece?.icon || Database
                  return (
                    <div className={`w-10 h-10 ${piece?.color || 'bg-gray-100'} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-[#020429]" />
                    </div>
                  )
                })()}
                <div>
                  <h2 className="text-lg font-bold text-white">{selectedNode.data.label}</h2>
                  <p className="text-xs text-[#E2E0F1]">ID: {selectedNode.id}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-white hover:text-[#39FF14] transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="border-b border-[#E2E0F1] bg-[#F2F2F2]">
              <div className="flex gap-1 px-6">
                <button className="px-4 py-3 text-sm font-semibold text-[#020429] bg-white border-b-2 border-[#39FF14]">
                  ⚙️ Settings
                </button>
                <button className="px-4 py-3 text-sm font-semibold text-[#666] hover:text-[#020429] transition-colors">
                  🔧 Advanced
                </button>
                <button className="px-4 py-3 text-sm font-semibold text-[#666] hover:text-[#020429] transition-colors">
                  🔀 Data Mapping
                </button>
                <button className="px-4 py-3 text-sm font-semibold text-[#666] hover:text-[#020429] transition-colors">
                  📊 Testing
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#020429] mb-2">Node Name</label>
                    <input
                      type="text"
                      defaultValue={selectedNode.data.label}
                      className="w-full px-3 py-2 text-sm border border-[#E2E0F1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
                    />
                  </div>

                  {selectedNode.data.type === 'http' && (
                    <>
                      <div>
                        <label className="block text-xs font-semibold text-[#020429] mb-2">HTTP Method</label>
                        <select className="w-full px-3 py-2 text-sm border border-[#E2E0F1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39FF14]">
                          <option>GET</option>
                          <option>POST</option>
                          <option>PUT</option>
                          <option>PATCH</option>
                          <option>DELETE</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#020429] mb-2">URL</label>
                        <input
                          type="text"
                          placeholder="https://api.example.com/endpoint"
                          className="w-full px-3 py-2 text-sm border border-[#E2E0F1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#020429] mb-2">Authentication</label>
                        <select className="w-full px-3 py-2 text-sm border border-[#E2E0F1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39FF14] mb-2">
                          <option value="">None</option>
                          <option value="bearer">Bearer Token</option>
                          <option value="apikey">API Key</option>
                          <option value="basic">Basic Auth</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Token / API Key"
                          className="w-full px-3 py-2 text-sm border border-[#E2E0F1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39FF14] font-mono"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-[#020429] mb-2">Description</label>
                    <textarea
                      placeholder="Add notes about this node..."
                      rows={3}
                      className="w-full px-3 py-2 text-sm border border-[#E2E0F1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {selectedNode.data.type === 'http' && (
                    <>
                      <div>
                        <label className="block text-xs font-semibold text-[#020429] mb-2">Headers (JSON)</label>
                        <textarea
                          placeholder='{"Content-Type": "application/json"}'
                          rows={4}
                          className="w-full px-3 py-2 text-sm border border-[#E2E0F1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39FF14] font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#020429] mb-2">Body (Raw JSON)</label>
                        <textarea
                          placeholder='{\n  "name": "John Doe",\n  "email": "john@example.com"\n}'
                          rows={8}
                          className="w-full px-3 py-2 text-xs border border-[#E2E0F1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39FF14] font-mono"
                        />
                      </div>
                    </>
                  )}
                  <div className="p-4 bg-[#39FF14]/10 border border-[#39FF14]/30 rounded-lg">
                    <p className="text-xs font-semibold text-[#020429] mb-2">💡 Modal Mode</p>
                    <p className="text-xs text-[#666]">
                      Full-screen configuration with tabs for complex workflows. Best for detailed setup and testing.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-[#E2E0F1] px-6 py-4 bg-[#F2F2F2] flex items-center justify-between">
              <button
                onClick={deleteNode}
                className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-semibold flex items-center gap-2"
              >
                <Trash2 size={14} />
                Delete Node
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedNode(null)}
                  className="px-4 py-2 bg-white text-[#666] rounded-lg hover:bg-[#E2E0F1] transition-colors text-sm font-semibold"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-[#39FF14] text-[#020429] rounded-lg hover:bg-[#39FF14]/80 transition-colors text-sm font-semibold">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
