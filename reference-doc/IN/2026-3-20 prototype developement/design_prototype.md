import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  AlertTriangle, 
  CheckCircle2, 
  DollarSign, 
  Activity, 
  Layers, 
  Maximize2, 
  FileText, 
  TrendingDown,
  TrendingUp,
  Search,
  ChevronRight,
  Split,
  Zap,
  ShieldAlert,
  BarChart2,
  PieChart
} from 'lucide-react';

// --- Shared UI Components ---
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl border border-gray-100 shadow-sm transition-all ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, variant = "default" }) => {
  const styles = {
    default: "bg-gray-100 text-gray-700",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-100",
    warning: "bg-amber-50 text-amber-700 border border-amber-100",
    danger: "bg-rose-50 text-rose-700 border border-rose-100",
    info: "bg-blue-50 text-blue-700 border border-blue-100",
    purple: "bg-purple-50 text-purple-700 border border-purple-100",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[variant] || styles.default}`}>
      {children}
    </span>
  );
};

// --- ECharts Dynamic Wrapper ---
const EChartsWrapper = ({ option, style, className }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = null;

    const initChart = () => {
      if (window.echarts && chartRef.current) {
        chartInstance = window.echarts.init(chartRef.current);
        chartInstance.setOption(option);
      }
    };

    if (!window.echarts) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js';
      script.async = true;
      script.onload = initChart;
      document.head.appendChild(script);
    } else {
      initChart();
    }

    const handleResize = () => chartInstance?.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance?.dispose();
    };
  }, [option]);

  return <div ref={chartRef} style={style} className={className} />;
};

// --- Mock Data ---
const KPIS = [
  { label: "Model Packages Synced", val: "8/9", status: "Healthy", color: "emerald", icon: Box },
  { label: "Open Issues (Clash/Spec)", val: "24", status: "-12 this week", color: "rose", icon: AlertTriangle },
  { label: "Forecast Cost Delta", val: "+1.2%", status: "Under Control", color: "amber", icon: DollarSign },
  { label: "Pending VE Suggestions", val: "3", status: "$450k Savings", color: "blue", icon: Zap },
];

const PACKAGES = [
  { id: "pkg-podium", name: "Podium & Retail Zone", status: "warning", sync: "98%" },
  { id: "pkg-towerA", name: "Tower A (L1-L20)", status: "danger", sync: "85%" },
  { id: "pkg-towerB", name: "Tower B (L1-L20)", status: "success", sync: "100%" },
  { id: "pkg-basement", name: "Basement Carpark", status: "success", sync: "100%" },
];

const ISSUES_DATA = {
  "pkg-towerA": [
    { id: "ISS-4092", type: "Clash", severity: "High", trade: "MEP vs Structural", area: "Tower A - L12 Shaft", desc: "HVAC Main Duct intersects with Shear Wall SW-04.", specRef: "N/A", status: "Open" },
    { id: "ISS-4093", type: "Spec Mismatch", severity: "Medium", trade: "Architecture", area: "Tower A - L15 Lobby", desc: "Floor finish specified as Marble in Doc, but BIM model shows Ceramic Tile.", specRef: "SPEC-FIN-02", status: "Review" },
    { id: "ISS-4095", type: "Missing Info", severity: "High", trade: "Facade", area: "Tower A - South Elev", desc: "Curtain wall bracket details missing, preventing accurate steel quantity extraction.", specRef: "LOD 400 Req", status: "Open" },
    { id: "ISS-4098", type: "Clash", severity: "Low", trade: "Plumbing vs Elec", area: "Tower A - L08 Ceiling", desc: "Cable tray clearance < 100mm from sprinkler pipe.", specRef: "MEP-COORD-01", status: "Resolved" },
  ],
  "pkg-podium": [
    { id: "ISS-3101", type: "Error", severity: "High", trade: "Structural", area: "Podium - Transfer Plate", desc: "Rebar density exceeds constructability limits (MiC constraint).", specRef: "STR-MIC-05", status: "Open" },
  ]
};

const TRADE_COSTS = [
  { trade: "Structural Steel", budget: 45.0, extracted: 46.2, unit: "M", status: "over" },
  { trade: "MEP Systems", budget: 32.5, extracted: 31.8, unit: "M", status: "under" },
  { trade: "Facade & Glazing", budget: 28.0, extracted: 28.0, unit: "M", status: "on-track" },
];

const AGENT_SUGGESTIONS = [
  { id: "VE-01", type: "Value Engineering", desc: "Replace specified generic fire doors on L1-L5 with pre-certified sizes to reduce unit cost.", savings: "$120,000", status: "Pending PMO" },
  { id: "VE-02", type: "Constructability", desc: "Optimize MEP routing in Basement to allow standard 3m modular pipe racks.", savings: "$330,000", status: "In Review" },
];

// Optimized ECharts Options for Light Theme & Compact Layout
const issueDistributionOption = {
  tooltip: { trigger: 'item', backgroundColor: '#ffffff', textStyle: { color: '#1f2937', fontSize: 10 }, borderColor: '#f3f4f6', padding: 6 },
  series: [
    {
      type: 'pie',
      radius: ['55%', '90%'], // Thinner, more elegant ring
      avoidLabelOverlap: false,
      itemStyle: { borderColor: '#fff', borderWidth: 1.5 },
      label: { show: false },
      data: [
        { value: 12, name: 'Clashes', itemStyle: { color: '#f43f5e' } },
        { value: 8, name: 'Spec Mismatch', itemStyle: { color: '#fbbf24' } },
        { value: 4, name: 'Missing Info', itemStyle: { color: '#a855f7' } }
      ]
    }
  ]
};

const costTrendOption = {
  tooltip: { 
    trigger: 'axis', 
    backgroundColor: '#ffffff', 
    textStyle: { color: '#1f2937', fontSize: 11 }, 
    borderColor: '#e5e7eb',
    padding: 8,
    formatter: '{b} <br/>Actual: <span style="font-weight:bold">${c}M</span> <br/><span style="color:#6b7280">Budget: $100M</span>'
  },
  grid: { top: 10, right: 10, bottom: 20, left: 30 },
  xAxis: { 
    type: 'category', 
    data: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'], 
    axisLine: { show: false }, 
    axisTick: { show: false }, 
    axisLabel: { color: '#6b7280', fontSize: 9, margin: 8 } 
  },
  yAxis: { 
    type: 'value', 
    min: 90, 
    max: 110,
    splitLine: { lineStyle: { color: '#f3f4f6', type: 'dashed' } }, 
    axisLabel: { color: '#9ca3af', fontSize: 9 } 
  },
  series: [
    {
      data: [102, 105, 103, 106, 101, 101.2],
      type: 'bar',
      barWidth: '40%',
      itemStyle: {
        color: (params) => params.value > 100 ? '#f43f5e' : '#10b981',
        borderRadius: [2, 2, 0, 0]
      },
      markLine: {
        data: [{ yAxis: 100, name: 'Budget' }],
        lineStyle: { color: '#d1d5db', type: 'dashed', width: 1.5 },
        symbol: 'none',
        label: { show: false }
      }
    }
  ]
};

export default function DesignPage() {
  const [activePackage, setActivePackage] = useState(PACKAGES[1].id);
  const [selectedIssue, setSelectedIssue] = useState(ISSUES_DATA["pkg-towerA"][0]);

  const currentIssues = ISSUES_DATA[activePackage] || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* 1. Module Header & Summary Row */}
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h2 className="text-2xl font-bold text-gray-900">Project Design Management</h2>
            <Badge variant="info">BIM-Cost Sync</Badge>
          </div>
          <p className="text-gray-400 text-sm">Real-time Model Health, Spec Consistency & Quantity-driven Cost</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors flex items-center shadow-sm">
            <FileText className="w-4 h-4 mr-2" /> AUDIT LOGS
          </button>
          <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-bold hover:bg-gray-800 shadow-lg shadow-gray-200 transition-all flex items-center">
            <Activity className="w-4 h-4 mr-2" /> INITIATE AGENT
          </button>
        </div>
      </div>

      {/* 2. KPI Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPIS.map((kpi, i) => (
          <Card key={i} className="p-5 flex flex-col justify-between hover:border-gray-200">
            <div className="flex justify-between items-start">
              <div className={`p-2 bg-${kpi.color}-50 text-${kpi.color}-600 rounded-lg`}>
                <kpi.icon className="w-5 h-5" />
              </div>
              <Badge variant={kpi.color === 'rose' ? 'danger' : kpi.color === 'amber' ? 'warning' : kpi.color === 'emerald' ? 'success' : 'info'}>
                {kpi.status}
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">{kpi.label}</p>
              <p className="text-2xl font-black text-gray-900 mt-2">{kpi.val}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* 3. Main Coordination Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT/CENTER: Primary Working Panel (Workbench) */}
        <div className="lg:col-span-2 space-y-6">
          
          <Card className="flex flex-col overflow-hidden">
            {/* Package Selector Header */}
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <Layers className="w-5 h-5 text-gray-400" />
                <h3 className="font-bold text-gray-900 text-sm">BIM Coordination Workbench</h3>
              </div>
              <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                {PACKAGES.map(pkg => (
                  <button
                    key={pkg.id}
                    onClick={() => {
                      setActivePackage(pkg.id);
                      setSelectedIssue(ISSUES_DATA[pkg.id]?.[0] || null);
                    }}
                    className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase whitespace-nowrap transition-colors ${
                      activePackage === pkg.id 
                        ? 'bg-blue-50 text-blue-600 ring-1 ring-blue-200 shadow-sm' 
                        : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    {pkg.name}
                    {pkg.status === 'danger' && <span className="ml-1.5 inline-block w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Mock BIM Viewer Canvas */}
            <div className="h-[360px] bg-[#f8fafc] relative border-b border-gray-100 overflow-hidden flex items-center justify-center group">
              <div className="absolute inset-0 opacity-30 pointer-events-none" style={{backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', backgroundSize: '24px 24px'}} />
              
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-gradient-to-b from-transparent via-blue-500 to-transparent h-10 animate-[pulse_3s_ease-in-out_infinite] translate-y-full" style={{ animation: 'scan 4s linear infinite' }} />
              <style dangerouslySetInnerHTML={{__html: `@keyframes scan { 0% { top: -10%; } 100% { top: 110%; } }`}} />

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-0 pointer-events-none opacity-20 text-center">
                <p className="text-[12px] font-black tracking-[0.3em] uppercase text-gray-400">WEBGL BIM VIEWER PLACEHOLDER</p>
              </div>

              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                <div className="bg-white/95 backdrop-blur px-2.5 py-1.5 rounded-md shadow-sm border border-emerald-100 flex items-center">
                  <Activity className="w-3.5 h-3.5 text-emerald-500 mr-2" />
                  <span className="text-[9px] font-black text-emerald-700 uppercase tracking-widest">Design Agent Active</span>
                </div>
                <div className="bg-white/95 backdrop-blur px-2.5 py-1.5 rounded-md shadow-sm border border-gray-100">
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">LOD 400 Extracted</span>
                </div>
              </div>

              <div className="absolute top-4 right-4 z-10">
                <button className="p-2 bg-white/90 backdrop-blur shadow-sm border border-gray-100 rounded-lg text-gray-500 hover:text-blue-600 transition-colors">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* BIM Abstract Object */}
              <div className="relative w-72 h-72 scale-110 group-hover:scale-110 transition-transform duration-1000">
                <div className="absolute inset-0 border-[3px] border-blue-200 rounded-xl bg-blue-50/40 rotate-12 transform origin-center transition-all duration-700 shadow-inner" />
                <div className="absolute inset-6 border-[3px] border-slate-300 rounded-xl bg-white/60 -rotate-3 transform origin-center transition-all duration-700 shadow-sm" />
                
                {activePackage === 'pkg-towerA' && (
                  <>
                    <div className="absolute top-1/4 left-1/3 w-10 h-10 border-2 border-rose-500 bg-rose-500/10 rounded-full animate-ping opacity-75" />
                    <div className="absolute top-1/4 left-1/3 w-10 h-10 border-2 border-rose-500 bg-rose-50/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg shadow-rose-500/20 cursor-pointer hover:bg-rose-100 transition-colors">
                      <ShieldAlert className="w-5 h-5 text-rose-600" />
                    </div>
                    <div className="absolute bottom-1/3 right-1/4 w-14 h-14 border-2 border-amber-500 bg-amber-50/90 backdrop-blur-sm rounded-lg border-dashed flex items-center justify-center shadow-lg shadow-amber-500/20 cursor-pointer hover:bg-amber-100 transition-colors">
                      <span className="text-[9px] font-black text-amber-700 uppercase tracking-wider">SPEC</span>
                    </div>
                  </>
                )}
                {activePackage === 'pkg-podium' && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-rose-500 bg-rose-50/90 backdrop-blur-sm rounded-xl border-dashed flex items-center justify-center shadow-lg shadow-rose-500/20 cursor-pointer hover:bg-rose-100 transition-colors">
                     <span className="text-[10px] font-black text-rose-700 uppercase tracking-widest text-center px-2">Construct<br/>ability</span>
                  </div>
                )}
              </div>
            </div>

            {/* OPTIMIZED: Compact Issue Distribution Toolbar */}
            <div className="px-6 py-3 border-b border-gray-100 bg-gray-50/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 text-gray-400" />
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-widest">Active Issue Matrix</h4>
              </div>
              
              <div className="flex items-center bg-white p-1.5 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex space-x-4 mx-3">
                  <div className="flex items-center text-[10px] font-bold text-rose-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5"/> Clashes (12)
                  </div>
                  <div className="flex items-center text-[10px] font-bold text-amber-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-1.5"/> Spec Mismatch (8)
                  </div>
                  <div className="flex items-center text-[10px] font-bold text-purple-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-1.5"/> Missing Info (4)
                  </div>
                </div>
                <div className="pl-3 border-l border-gray-100 h-8 flex items-center">
                  <EChartsWrapper option={issueDistributionOption} style={{ width: '40px', height: '40px' }} />
                </div>
              </div>
            </div>

            {/* Issue Matrix Table */}
            <div className="p-0 overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">Issue ID</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Trade & Location</th>
                    <th className="px-6 py-4">Severity</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 bg-white">
                  {currentIssues.length > 0 ? currentIssues.map((issue) => (
                    <tr 
                      key={issue.id} 
                      onClick={() => setSelectedIssue(issue)}
                      className={`cursor-pointer transition-colors ${selectedIssue?.id === issue.id ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
                    >
                      <td className="px-6 py-3.5 text-xs font-bold text-gray-900">{issue.id}</td>
                      <td className="px-6 py-3.5">
                        <Badge variant={issue.type === 'Clash' ? 'danger' : issue.type === 'Spec Mismatch' ? 'warning' : issue.type === 'Missing Info' ? 'purple' : 'default'}>
                          {issue.type}
                        </Badge>
                      </td>
                      <td className="px-6 py-3.5">
                        <p className="text-xs font-medium text-gray-900">{issue.trade}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{issue.area}</p>
                      </td>
                      <td className="px-6 py-3.5">
                        <span className={`text-[10px] font-black uppercase ${issue.severity === 'High' ? 'text-rose-600' : issue.severity === 'Medium' ? 'text-amber-600' : 'text-emerald-600'}`}>
                          {issue.severity}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-right">
                        <span className="text-[10px] font-bold text-gray-500">{issue.status}</span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-400">
                        No active issues detected in this package.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* RIGHT: Secondary Insight & Log Panels */}
        <div className="space-y-6">
          
          {/* Panel 1: Selected Issue Detail */}
          <Card className="p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center text-sm">
              <Split className="w-4 h-4 mr-2 text-blue-500" /> Issue Deep Dive
            </h3>
            {selectedIssue ? (
              <div className="space-y-4 animate-in slide-in-from-right-2">
                <div className="flex justify-between items-start border-b border-gray-50 pb-3">
                  <div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{selectedIssue.id}</span>
                    <h4 className="text-sm font-bold text-gray-900 mt-1">{selectedIssue.type} Exception</h4>
                  </div>
                  <Badge variant={selectedIssue.severity === 'High' ? 'danger' : 'warning'}>{selectedIssue.severity}</Badge>
                </div>
                
                <p className="text-xs text-gray-700 leading-relaxed font-medium">
                  {selectedIssue.desc}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Location</p>
                    <p className="text-[11px] font-bold text-gray-900 mt-0.5 truncate">{selectedIssue.area}</p>
                  </div>
                  <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Spec Ref</p>
                    <p className="text-[11px] font-bold text-gray-900 mt-0.5 truncate">{selectedIssue.specRef}</p>
                  </div>
                </div>

                <div className="pt-4 flex space-x-2">
                  <button className="flex-1 py-2.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-100 transition-colors">
                    Assign RFI
                  </button>
                  <button className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-colors">
                    View in 3D
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center">
                 <CheckCircle2 className="w-8 h-8 text-emerald-100 mx-auto mb-2" />
                 <p className="text-xs text-gray-400">Select an issue from the matrix to view details.</p>
              </div>
            )}
          </Card>

          {/* Panel 2: Trade Cost Extractor (OPTIMIZED: Light Theme to match screenshot) */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900 flex items-center text-sm">
                <DollarSign className="w-4 h-4 mr-2 text-emerald-500" /> Trade Cost Extractor
              </h3>
              <Badge variant="info">LIVE SYNC</Badge>
            </div>
            
            {/* ECharts Cost Trend Chart */}
            <div className="mb-6 pb-6 border-b border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold flex items-center">
                  <BarChart2 className="w-3 h-3 mr-1.5 text-gray-400" /> 6-Month Cost Deviation Trend
                </span>
              </div>
              {/* ECharts Wrapper for Bar Chart */}
              <EChartsWrapper option={costTrendOption} style={{ width: '100%', height: '140px' }} />
            </div>

            <div className="space-y-5">
              {TRADE_COSTS.map((trade, i) => {
                const percent = Math.min((trade.extracted / trade.budget) * 100, 100);
                return (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <p className="text-xs font-bold text-gray-800">{trade.trade}</p>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Extracted</p>
                        <p className={`text-sm font-black ${trade.status === 'over' ? 'text-rose-500' : 'text-emerald-500'}`}>
                          ${trade.extracted}{trade.unit}
                        </p>
                      </div>
                    </div>
                    
                    {/* Clean Light Theme Progress Bar */}
                    <div className="relative h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`absolute top-0 left-0 h-full ${trade.status === 'over' ? 'bg-rose-500' : 'bg-emerald-500'} transition-all`} 
                        style={{ width: `${percent}%` }} 
                      />
                    </div>
                    
                    <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest">
                      <span className="text-gray-400">Budget: ${trade.budget}{trade.unit}</span>
                      {trade.status === 'over' && <span className="text-rose-500 flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" /> +{((trade.extracted-trade.budget)/trade.budget*100).toFixed(1)}%</span>}
                      {trade.status === 'under' && <span className="text-emerald-500 flex items-center"><TrendingDown className="w-3 h-3 mr-0.5" /> -{((trade.budget-trade.extracted)/trade.budget*100).toFixed(1)}%</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Panel 3: Design Agent Suggestions */}
          <Card className="p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center text-sm">
              <Zap className="w-4 h-4 mr-2 text-amber-500" /> AI Design Suggestions
            </h3>
            <div className="space-y-4">
              {AGENT_SUGGESTIONS.map((sugg, i) => (
                <div key={i} className="p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors group">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[9px] font-black text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded uppercase tracking-widest">
                      {sugg.type}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400">{sugg.status}</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-snug font-medium mb-3">
                    {sugg.desc}
                  </p>
                  <div className="flex items-center justify-between border-t border-gray-50 pt-2">
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Est. Savings</span>
                    <span className="text-xs font-black text-emerald-600">{sugg.savings}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}