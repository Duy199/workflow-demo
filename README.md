# TCG Workflow Designer - UX Concept Variants

**Prepared by:** Duy (Frontend React Developer)  
**Date:** October 26, 2025  
**Purpose:** Monday Presentation - Workflow Node Interaction Design Concepts

---

## 🎯 Project Overview

This project presents **3 interactive UX variants** for The Customization Group's workflow node designer. Each variant explores different approaches to node interaction, settings management, and workflow visualization.

Built with:
- **Vite** - Lightning fast build tool
- **React 18** + TypeScript
- **React Router** for navigation
- **React Flow** for node/edge management
- **Tailwind CSS** for styling
- **TCG Brand Guidelines** compliance

---

## 🎨 Brand Compliance

All variants strictly follow the **TCG Brand Book 2025** guidelines:

### Colors
- **Primary:** Royal Blue (`#020429`) - Headers, primary elements
- **Accent:** Neon Green (`#39FF14`) - CTAs, highlights, active states
- **Secondary:** Mercury (`#E2E0F1`) - Borders, subtle elements
- **Surface:** Pearl (`#F2F2F2`) - Backgrounds, canvas
- **Additional:** Black, White, Gray (`#A6A6A6`), Dark Green (`#00CA00`)

### Typography
- **Font Family:** Open Sans (Google Fonts)
- **Weights:** 400 (Regular), 600 (Semibold), 700 (Bold)

---

## 📋 Variant Comparisons

| Feature | Variant 1: Compact | Variant 2: Detailed | Variant 3: Canvas |
|---------|-------------------|---------------------|-------------------|
| **Editing Style** | Inline forms | Side panel | Click to configure |
| **Space Usage** | Minimal footprint | Split view | Full canvas |
| **Settings Visibility** | Collapsible | Always accessible | On-demand |
| **Best For** | Quick edits | Power users | Visual planning |
| **Complexity** | Low | Medium | High |
| **Learning Curve** | Fast | Moderate | Steeper |

---

## 🔵 Variant 1: Compact Node View

### Concept
**"Inline Editing with Collapsible Sections"**

Settings are integrated directly into each node with expandable/collapsible sections for advanced options.

### Key Features
- ✅ **Inline Form Fields** - Edit settings directly in the node
- ✅ **Collapsible Sections** - Expand/collapse for more settings
- ✅ **Minimal Footprint** - Compact design saves canvas space
- ✅ **Quick Access** - No need to open separate panels
- ✅ **Visual Status** - Color-coded headers and status badges

### UX Rationale
- **Speed:** Immediate access to most common settings
- **Context:** Settings remain visually connected to the node
- **Flexibility:** Can show/hide advanced options as needed
- **Simplicity:** Reduces cognitive load with progressive disclosure

### Interactions
1. Click **chevron** icon to expand/collapse advanced settings
2. Edit fields **directly** in the node
3. **Toggle switches** for boolean settings
4. **Action buttons** for advanced config and testing

### Use Cases
- Quick workflow adjustments
- Simple node configurations
- Users who prefer minimal UI
- Mobile/tablet interfaces (future consideration)

### Limitations
- Limited space for complex settings
- May feel cramped with many fields
- Less suitable for power users who need constant access to all settings

---

## 🟢 Variant 2: Detailed Node Editor

### Concept
**"Side Panel with Edit/View Modes"**

Nodes display summary information, with a detailed side panel that opens when clicked. Toggle between View and Edit modes.

### Key Features
- ✅ **Side Panel Editor** - Dedicated space for comprehensive settings
- ✅ **Edit/View Modes** - Toggle between reading and editing
- ✅ **Full Settings Access** - All configuration options visible
- ✅ **Clean Canvas** - Nodes show only essential info
- ✅ **Organized Sections** - Settings grouped logically

### UX Rationale
- **Separation:** Canvas remains uncluttered while editing
- **Power:** Full access to all settings without compromising node size
- **Safety:** View mode prevents accidental edits
- **Professional:** Familiar pattern from many enterprise tools

### Interactions
1. **Click node** to open side panel
2. **View Mode** (default) - Read-only settings display
3. **Edit Mode** - Click "Edit" to enable field editing
4. **Save/Cancel** - Explicit actions for changes
5. **Close** (X button) to return to canvas

### Use Cases
- Complex node configurations
- Power users who need all settings
- Workflows with many configuration options
- Enterprise/professional tools
- When detailed documentation is needed per setting

### Limitations
- Requires clicking to access settings
- Side panel reduces canvas viewing area
- More clicks to perform edits
- May feel slower for quick adjustments

---

## 🔴 Variant 3: Canvas Flow View

### Concept
**"Full Workflow Canvas with Node Palette"**

Complete workflow visualization with multiple connected nodes. Drag-and-drop nodes from a palette to build workflows visually.

### Key Features
- ✅ **Node Palette** - Drag nodes onto canvas
- ✅ **Multiple Nodes** - Full workflow visualization
- ✅ **Drag & Drop** - Intuitive node placement
- ✅ **Live Connections** - Animated edge connections
- ✅ **MiniMap** - Overview of large workflows
- ✅ **Workflow Controls** - Run, pause, stop actions
- ✅ **Quick Actions** - Duplicate, delete nodes

### UX Rationale
- **Visual:** See entire workflow at once
- **Intuitive:** Drag-and-drop is familiar and natural
- **Powerful:** Build complex workflows easily
- **Scalable:** Handles many nodes and connections
- **Professional:** Industry-standard pattern (like Node-RED, n8n)

### Interactions
1. **Drag nodes** from palette to canvas
2. **Connect nodes** by dragging from output to input
3. **Click node** to configure (could open modal or side panel)
4. **Pan/Zoom** canvas for navigation
5. **MiniMap** for quick navigation in large workflows
6. **Workflow controls** to run/pause/stop

### Use Cases
- Building new workflows from scratch
- Visualizing complex process flows
- Multi-step workflows with branching
- Team collaboration and workflow documentation
- Training and onboarding

### Limitations
- More overwhelming for beginners
- Requires more screen real estate
- May be overkill for simple single-node edits
- Performance considerations with many nodes

---

## 💡 Design Decisions & Rationale

### Why Three Variants?

Each variant serves different user needs and use cases:

1. **Variant 1** optimizes for **speed and simplicity**
2. **Variant 2** optimizes for **power and precision**
3. **Variant 3** optimizes for **visualization and workflow building**

### Common Design Patterns

All variants share:
- **Consistent branding** (Royal Blue + Neon Green)
- **Clear visual hierarchy** (headers, sections, actions)
- **Status indicators** (colored badges, dots, animations)
- **Responsive feedback** (hover states, transitions)
- **Accessible typography** (Open Sans, appropriate sizes)

### Interaction Principles

1. **Progressive Disclosure** - Show essential info first, details on demand
2. **Visual Feedback** - Clear hover states, active states, animations
3. **Consistency** - Similar actions work the same across variants
4. **Safety** - Confirm destructive actions, clear cancel options
5. **Efficiency** - Minimize clicks for common tasks

---

## 🎯 Node Types & Settings Examples

### Example Node: Batch Node
**Purpose:** Groups incoming items based on criteria

**Settings:**
- `batchSize` (number) - How many items per batch
- `batchType` (select) - Roll, Stretching Bundle, Fixed Size
- `timeout` (number) - Max wait time in seconds
- `autoRetry` (boolean) - Retry on failure
- `maxRetries` (number) - Maximum retry attempts
- `errorHandling` (select) - Continue, Stop, Alert
- `logLevel` (select) - Debug, Info, Warning, Error

### Example Node: Transform Node
**Purpose:** Converts data between formats

**Settings:**
- `inputFormat` (select) - JSON, XML, CSV, etc.
- `outputFormat` (select) - JSON, XML, CSV, etc.
- `validateInput` (boolean) - Validate before transform
- `validateOutput` (boolean) - Validate after transform
- `charset` (select) - UTF-8, ASCII, etc.
- `prettyPrint` (boolean) - Format output for readability

### Example Node: API Call Node
**Purpose:** Makes HTTP requests to external APIs

**Settings:**
- `method` (select) - GET, POST, PUT, DELETE, PATCH
- `endpoint` (text) - API URL
- `timeout` (number) - Request timeout in ms
- `retries` (number) - Retry attempts
- `headers` (object) - HTTP headers
- `authentication` (select) - None, Basic, Bearer, OAuth
- `responseMapping` (object) - Map API response to workflow data

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### View the Demo

Open [http://localhost:3000](http://localhost:3000) to see the home page with navigation to all 3 variants.

---

## 📁 Project Structure

```
workflow-demo/
├── src/
│   ├── pages/
│   │   ├── Home.tsx             # Home page with variant navigation
│   │   ├── Variant1.tsx         # Compact Node View
│   │   ├── Variant2.tsx         # Detailed Node Editor
│   │   └── Variant3.tsx         # Canvas Flow View
│   ├── App.tsx                  # React Router setup
│   ├── main.tsx                 # App entry point
│   └── index.css                # TCG brand colors and styles
├── index.html                   # HTML template
├── public/                      # Static assets
├── tcg-brandbook-2025.pdf      # Brand guidelines reference
├── vite.config.ts              # Vite configuration
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md                   # This file
```

---

## 🎨 UI Components Breakdown

### Node Components
- **Node Header** - Brand color, icon, title
- **Node Body** - Settings, forms, status
- **Node Footer** - Actions, description (variant 1)
- **Expand/Collapse** - Toggle advanced settings (variant 1)
- **Status Badges** - Visual indicators for node state

### Canvas Elements
- **Background Grid** - Dots pattern for spatial awareness
- **Edges/Connections** - Animated lines showing flow
- **Controls** - Zoom in/out, fit view, reset
- **MiniMap** - Canvas overview (variant 3)

### Panels & Toolbars
- **Side Panel** - Detailed editor (variant 2)
- **Node Palette** - Draggable node templates (variant 3)
- **Action Toolbar** - Workflow controls (variant 3)

---

## 🔄 Future Enhancements

### Potential Features
- [ ] **Hybrid Approach** - Combine best features from all variants
- [ ] **User Preferences** - Let users choose their preferred variant
- [ ] **Advanced Validation** - Real-time form validation
- [ ] **Undo/Redo** - History of changes
- [ ] **Templates** - Pre-built workflow templates
- [ ] **Collaboration** - Multi-user editing
- [ ] **Export/Import** - Save and load workflows
- [ ] **Testing Mode** - Run individual nodes
- [ ] **Performance Monitoring** - Real-time execution stats
- [ ] **Dark Mode** - Alternative color scheme

### Mobile Considerations
- Responsive layouts for tablet/mobile
- Touch-optimized interactions
- Simplified mobile variant (probably Variant 1 style)

---

## 📊 Recommendation

**For Monday Presentation:**

My recommendation is to pursue a **hybrid approach** based on context:

1. **Default View:** Variant 3 (Canvas) for workflow building
2. **Node Editing:** Variant 2 (Side Panel) for detailed configuration
3. **Quick Edits:** Variant 1 (Inline) for simple field changes

This gives users the best of all worlds:
- ✅ Visual workflow building
- ✅ Detailed editing when needed
- ✅ Quick inline edits for speed

We could implement a **context menu** on nodes:
- "Quick Edit" → Opens inline compact form
- "Edit Details" → Opens side panel
- "Duplicate", "Delete", etc.

---

## 🙏 Acknowledgments

- **TCG Brand Book 2025** - Color palette and typography guidelines
- **React Flow** - Powerful node-based UI library
- **Next.js** - React framework for production
- **Lucide Icons** - Beautiful icon library

---

## 📞 Contact

**Duy** - Frontend React Developer  
Ready to discuss and iterate on these concepts Monday!

---

## 📄 License

This is a proprietary project for The Customization Group.

---

**Note:** All three variants are functional prototypes demonstrating UX concepts. The actual implementation would include:
- Backend integration
- Real node configuration logic
- Workflow execution engine
- Error handling and validation
- State persistence
- User authentication
- And more...
