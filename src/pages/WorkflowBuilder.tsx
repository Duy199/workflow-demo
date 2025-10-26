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
} from 'lucide-react'
import { Link } from 'react-router-dom'

// Node type definitions
interface NodeData {
  label: string
  type: string
  icon: string
  config: Record<string, any>
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
function WorkflowNode({ data, selected }: { data: NodeData; selected: boolean }) {
  const piece = availablePieces.find(p => p.type === data.type) || availablePieces[0]
  const Icon = piece.icon

  return (
    <div
      className={`bg-white rounded-lg shadow-lg border-2 transition-all min-w-[180px] ${
        selected ? 'border-[#39FF14] shadow-2xl' : 'border-[#020429]'
      }`}
    >
      <div className="bg-gradient-to-r from-[#020429] to-[#1a1d4a] px-3 py-2 rounded-t-lg">
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 ${piece.color} rounded flex items-center justify-center`}>
            <Icon className="w-4 h-4 text-[#020429]" />
          </div>
          <span className="font-semibold text-sm text-white truncate">{data.label}</span>
        </div>
      </div>
      <div className="p-3">
        <p className="text-xs text-[#666] mb-2">{piece.description}</p>
        {selected && (
          <div className="text-xs text-[#39FF14] font-semibold">
            Click to configure →
          </div>
        )}
      </div>
    </div>
  )
}

const nodeTypes: NodeTypes = {
  workflow: WorkflowNode,
}

export default function WorkflowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [nodeIdCounter, setNodeIdCounter] = useState(1)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#020429', strokeWidth: 2 } }, eds)),
    [setEdges]
  )

  const onNodeClick = useCallback((_: any, node: Node) => {
    setSelectedNode(node)
  }, [])

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
        <div className="w-72 bg-white border-r border-[#E2E0F1] overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-[#020429]">Available Pieces</h2>
              <span className="px-2 py-1 bg-[#39FF14]/20 text-[#020429] text-xs font-semibold rounded">
                {availablePieces.length}
              </span>
            </div>

            <div className="space-y-2">
              {availablePieces.map((piece) => {
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

            <div className="mt-6 p-4 bg-[#39FF14]/10 border border-[#39FF14]/30 rounded-lg">
              <p className="text-xs font-semibold text-[#020429] mb-2">💡 How to use</p>
              <ul className="text-xs text-[#020429] space-y-1">
                <li>• Drag pieces to canvas</li>
                <li>• Connect nodes by dragging</li>
                <li>• Click node to configure</li>
              </ul>
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

        {/* Right Sidebar - Properties Panel */}
        {selectedNode && (
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
    </div>
  )
}
