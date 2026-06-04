import { useState } from "react";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceLine, PieChart, Pie, Cell, ComposedChart
} from "recharts";

const DAILY = [
  { date:"22-Apr", lat:"02 01.9N", lon:"104 49.7E", post:"At Port",  op:"Idle",           cond:"Ballast", stmHrs:0,    dist:0,      avgSpd:0,    cpSpd:12.5, rpm:0,  slip:0,   windDir:"—",  windSpd:7, bf:2, waveH:0.00, swlDir:"—", swlMtr:0, curDir:"—", curSpd:0.8, meLSFO:0,     aeLSFO:2.19, boilerLSFO:0.69, totalLSFO:2.880,  aeMGO:0,     mgo:3.970, rcvdLSFO:0, rcvdMGO:0, robLSFO:970.68, robMGO:242.98, fwCons:5,  fwRcvd:0, fwROB:218, remarks:"Anchored SGP-EOPL for bunker surveyor" },
  { date:"23-Apr", lat:"01 17.9N", lon:"103 19.9E", post:"At Sea",   op:"Manoeuvring",     cond:"Ballast", stmHrs:11.2, dist:127.02, avgSpd:11.3, cpSpd:12.5, rpm:80, slip:5.5, windDir:"SW", windSpd:5, bf:2, waveH:0.10, swlDir:"—", swlMtr:0, curDir:"—", curSpd:0.8, meLSFO:9.107, aeLSFO:3.71, boilerLSFO:0.83, totalLSFO:13.647, aeMGO:0,     mgo:0.000, rcvdLSFO:0, rcvdMGO:0, robLSFO:959.73, robMGO:246.54, fwCons:6,  fwRcvd:0, fwROB:212, remarks:"Proceeding Sungai Linggi — Malacca manouvering" },
  { date:"24-Apr", lat:"02 15.8N", lon:"101 59.9E", post:"At Port",  op:"Manoeuv/Anchor", cond:"Ballast", stmHrs:9.1,  dist:107.01, avgSpd:11.7, cpSpd:12.5, rpm:0,  slip:5.6, windDir:"SW", windSpd:5, bf:2, waveH:0.10, swlDir:"—", swlMtr:0, curDir:"—", curSpd:1.1, meLSFO:3.370, aeLSFO:3.20, boilerLSFO:0.87, totalLSFO:10.440, aeMGO:0.10,  mgo:0.100, rcvdLSFO:0, rcvdMGO:0, robLSFO:949.29, robMGO:246.44, fwCons:8,  fwRcvd:0, fwROB:204, remarks:"Anchored Sungai Linggi — Waiting load instructions" },
  { date:"25-Apr", lat:"02 15.8N", lon:"101 59.9E", post:"At Port",  op:"Idle",           cond:"Ballast", stmHrs:0,    dist:0,      avgSpd:0,    cpSpd:12.5, rpm:0,  slip:0,   windDir:"NE", windSpd:8, bf:3, waveH:0.15, swlDir:"—", swlMtr:0, curDir:"—", curSpd:0.4, meLSFO:0,     aeLSFO:2.70, boilerLSFO:1.17, totalLSFO:3.870,  aeMGO:0.004, mgo:0.004, rcvdLSFO:0, rcvdMGO:0, robLSFO:945.42, robMGO:246.44, fwCons:9,  fwRcvd:0, fwROB:195, remarks:"Anchored Sungai Linggi — Waiting load" },
  { date:"26-Apr", lat:"02 15.8N", lon:"101 59.9E", post:"At Port",  op:"Idle",           cond:"Ballast", stmHrs:0,    dist:0,      avgSpd:0,    cpSpd:12.5, rpm:0,  slip:0,   windDir:"NE", windSpd:4, bf:2, waveH:0.10, swlDir:"—", swlMtr:0, curDir:"—", curSpd:1.0, meLSFO:0,     aeLSFO:2.60, boilerLSFO:1.15, totalLSFO:3.750,  aeMGO:0,     mgo:0.000, rcvdLSFO:0, rcvdMGO:0, robLSFO:941.67, robMGO:246.44, fwCons:9,  fwRcvd:0, fwROB:186, remarks:"Anchored Sungai Linggi — Waiting load" },
  { date:"27-Apr", lat:"02 15.8N", lon:"101 59.9E", post:"At Port",  op:"Idle",           cond:"Ballast", stmHrs:0,    dist:0,      avgSpd:0,    cpSpd:12.5, rpm:0,  slip:0,   windDir:"NE", windSpd:4, bf:2, waveH:0.10, swlDir:"—", swlMtr:0, curDir:"—", curSpd:1.0, meLSFO:0,     aeLSFO:2.68, boilerLSFO:1.19, totalLSFO:3.870,  aeMGO:0,     mgo:0.000, rcvdLSFO:0, rcvdMGO:0, robLSFO:937.80, robMGO:246.44, fwCons:10, fwRcvd:0, fwROB:176, remarks:"Anchored Sungai Linggi — Waiting load" },
  { date:"28-Apr", lat:"02 15.8N", lon:"101 59.9E", post:"At Port",  op:"Idle",           cond:"Ballast", stmHrs:0,    dist:0,      avgSpd:0,    cpSpd:12.5, rpm:0,  slip:0,   windDir:"NE", windSpd:6, bf:2, waveH:0.15, swlDir:"—", swlMtr:0, curDir:"—", curSpd:1.0, meLSFO:0,     aeLSFO:2.67, boilerLSFO:1.21, totalLSFO:3.880,  aeMGO:0.10,  mgo:0.100, rcvdLSFO:0, rcvdMGO:0, robLSFO:933.92, robMGO:246.34, fwCons:8,  fwRcvd:0, fwROB:168, remarks:"Anchored Sungai Linggi — Waiting load" },
  { date:"29-Apr", lat:"02 15.9N", lon:"101 59.9E", post:"At Port",  op:"Idle",           cond:"Ballast", stmHrs:0,    dist:0,      avgSpd:0,    cpSpd:12.5, rpm:0,  slip:0,   windDir:"NE", windSpd:7, bf:3, waveH:0.20, swlDir:"—", swlMtr:0, curDir:"—", curSpd:1.0, meLSFO:0,     aeLSFO:2.68, boilerLSFO:1.21, totalLSFO:3.890,  aeMGO:0.10,  mgo:0.100, rcvdLSFO:0, rcvdMGO:0, robLSFO:930.03, robMGO:246.24, fwCons:8,  fwRcvd:0, fwROB:160, remarks:"Anchored Sungai Linggi — Waiting load" },
  { date:"30-Apr", lat:"02 15.9N", lon:"101 59.9E", post:"At Port",  op:"Idle",           cond:"Ballast", stmHrs:0,    dist:0,      avgSpd:0,    cpSpd:12.5, rpm:0,  slip:0,   windDir:"NE", windSpd:8, bf:3, waveH:0.20, swlDir:"—", swlMtr:0, curDir:"—", curSpd:1.0, meLSFO:0,     aeLSFO:2.62, boilerLSFO:1.14, totalLSFO:3.760,  aeMGO:0,     mgo:0.000, rcvdLSFO:0, rcvdMGO:0, robLSFO:926.27, robMGO:246.24, fwCons:9,  fwRcvd:0, fwROB:151, remarks:"Anchored Sungai Linggi — Waiting load" },
];

const WARRANTY = [
  { speed:12.5, label:"12.5 ECO ★", lRPM:"82-83", lME:26.5, lAE:3, lB:0, bRPM:"79-80", bME:23.5, bAE:3, bB:0 },
  { speed:12.0, label:"12.0",       lRPM:"80-81", lME:25.6, lAE:3, lB:0, bRPM:"78-79", bME:22.8, bAE:3, bB:0 },
  { speed:11.5, label:"11.5",       lRPM:"79-80", lME:24.7, lAE:3, lB:0, bRPM:"75-77", bME:22.2, bAE:3, bB:0 },
  { speed:11.0, label:"11.0",       lRPM:"78-79", lME:23.9, lAE:3, lB:0, bRPM:"74-75", bME:21.6, bAE:3, bB:0 },
  { speed:10.5, label:"10.5",       lRPM:"76-77", lME:23.1, lAE:3, lB:0, bRPM:"72-73", bME:21.1, bAE:3, bB:0 },
  { speed:10.0, label:"10.0",       lRPM:"75-76", lME:22.4, lAE:3, lB:0, bRPM:"71-72", bME:20.6, bAE:3, bB:0 },
];

const PORT_OPS = [
  { op:"Idle (Anchorage) ★",           t:5.5,  ae:3, b:2.5,  note:"★ THIS VOYAGE" },
  { op:"Loading (incl. deballasting)", t:7.8,  ae:3, b:4.8,  note:"" },
  { op:"Discharging (incl. IG)",       t:32.0, ae:3, b:29.0, note:"" },
  { op:"Inerting",                     t:19.0, ae:3, b:16.0, note:"" },
  { op:"Heating – to Maintain",        t:12.0, ae:3, b:9.0,  note:"" },
  { op:"Tank Cleaning (Cold)",         t:13.5, ae:3, b:10.5, note:"" },
  { op:"Tank Cleaning (Hot)",          t:21.5, ae:3, b:18.5, note:"" },
  { op:"Ballast Exchange",             t:6.5,  ae:3, b:3.5,  note:"" },
];

const NOON_FIELDS = [
  {cat:"GENERAL",label:"UTC Date"},{cat:"GENERAL",label:"Latitude"},{cat:"GENERAL",label:"Longitude"},{cat:"GENERAL",label:"Vessel Condition"},
  {cat:"VOYAGE",label:"Draught Fwd (m)"},{cat:"VOYAGE",label:"Draught Aft (m)"},{cat:"VOYAGE",label:"Last Port"},{cat:"VOYAGE",label:"Next Port"},
  {cat:"VOYAGE",label:"Distance Sailed (nm)"},{cat:"VOYAGE",label:"Engine Distance 24h (nm)"},{cat:"VOYAGE",label:"Steaming Time (h)"},
  {cat:"VOYAGE",label:"CP Speed (kts)"},{cat:"VOYAGE",label:"Speed Last 24h (kts)"},{cat:"VOYAGE",label:"Avg Speed (kts)"},
  {cat:"VOYAGE",label:"Main Engine RPM"},{cat:"VOYAGE",label:"Avg Slip (%)"},
  {cat:"WEATHER",label:"Wind Speed (kts)"},{cat:"WEATHER",label:"Wind Direction"},{cat:"WEATHER",label:"Beaufort Scale"},
  {cat:"WEATHER",label:"Wave Height (m)"},{cat:"WEATHER",label:"Swell Direction"},{cat:"WEATHER",label:"Swell Height (m)"},
  {cat:"WEATHER",label:"Current Direction"},{cat:"WEATHER",label:"Current Speed (kts)"},
  {cat:"BUNKERS",label:"ME LSFO (mt)"},{cat:"BUNKERS",label:"AE LSFO (mt)"},{cat:"BUNKERS",label:"Boiler LSFO (mt)"},
  {cat:"BUNKERS",label:"Total LSFO (mt)"},{cat:"BUNKERS",label:"ME MGO (mt)"},{cat:"BUNKERS",label:"AE MGO (mt)"},
  {cat:"BUNKERS",label:"Total MGO (mt)"},{cat:"BUNKERS",label:"LSFO Received (mt)"},{cat:"BUNKERS",label:"MGO Received (mt)"},
  {cat:"BUNKERS",label:"ROB LSFO (mt)"},{cat:"BUNKERS",label:"ROB MGO (mt)"},
  {cat:"FRESH WATER",label:"FW Generated (mt)"},{cat:"FRESH WATER",label:"FW Consumed (mt)"},
  {cat:"FRESH WATER",label:"FW Received (mt)"},{cat:"FRESH WATER",label:"FW ROB (mt)"},
];

const PIE_FUEL = [{name:"AE",value:25.05,color:"#00c9a7"},{name:"ME",value:12.477,color:"#f7c948"},{name:"Boiler",value:9.46,color:"#e05a5a"}];
const PIE_TIME = [{name:"Idle Sungai",value:67,color:"#00c9a7"},{name:"Manoeuvring",value:22,color:"#f7c948"},{name:"Idle SGP",value:11,color:"#4d9ef7"}];

const C0={vesselName:"M/V XYZ",imo:"—",voyageNo:"APR-2026-01",lastPort:"Singapore EOPL",nextPort:"Sungai Linggi",cospDate:"22/04/2026",cospTime:"00:01 LT",cospLat:"02 01.9 N",cospLon:"104 49.7 E",delayReason:"Waiting bunker surveyor",draftFwd:"5.00",draftAft:"8.00",draftMid:"—",displacement:"—",constant:"—",cargoDesc:"Ballast – No Cargo",cargoQty:"—",blQty:"—",cargoRemarks:"Vessel in full ballast",robVLSFO:"970.68",robLSMGO:"—",robLSFO:"—",robLubeOil:"—",robFW:"218",distNextPort:"220",avgSeaSpeed:"12.5",etaPilot:"23/04/2026 20:00 LT",remarks:"Vessel anchored SGP-EOPL. Ballast. CP ECO 12.5 kts. Proceeding Sungai Linggi for loading."};
const E0={vesselName:"M/V XYZ",imo:"—",voyageNo:"APR-2026-01",lastPort:"Singapore EOPL",nextPort:"Sungai Linggi",eospDate:"24/04/2026",eospTime:"~09:00 LT",eospLat:"02 15.8 N",eospLon:"101 59.9 E",delayReason:"Waiting load instructions",draftFwd:"5.50",draftAft:"8.50",draftMid:"—",displacement:"—",constant:"—",cargoDesc:"Ballast",cargoQty:"—",blQty:"—",cargoRemarks:"No cargo, awaiting load",robVLSFO:"949.29",robLSMGO:"—",robLSFO:"—",robLubeOil:"—",robFW:"204",distSailed:"234.03",avgSeaSpeed:"11.3",seaPassageTime:"0 Days 11.2 Hours",weather:"Moderate swell BF 2, no heavy weather",etaAta:"24/04/2026 ~09:00 LT",norTendered:"Yes",pilotOnBoard:"24/04/2026",anchoredAt:"Sungai Linggi Anchorage 02°15.8N 101°59.9E",remarks:"Vessel anchored Sungai Linggi. No heavy weather. Engine normal."};
const I0={vesselName:"M/V XYZ",imo:"—",voyageNo:"APR-2026-01",portName:"Sungai Linggi",terminal:"Anchorage",agentName:"—",charterer:"—",iprDate:"24/04/2026",iprTime:"~09:00 LT",status:"Anchored",anchorage:"02°15.8N 101°59.9E",eospTime:"24/04/2026 ~09:00 LT",pilotOnBoard:"24/04/2026",allFast:"—",norTendered:"24/04/2026 ~10:00 LT",norAccepted:"—",draftFwd:"5.50",draftAft:"8.50",draftMid:"—",airDraft:"—",ukc:"—",displacement:"—",constant:"—",cargoDesc:"Awaiting bulk cargo",cargoOp:"Loading",cargoOnBoard:"—",cargoToday:"—",cargoTotal:"—",cargoRate:"—",expectedCompletion:"—",cargoRemarks:"Loading pending shipper instructions",robVLSFO:"949.29",robLSMGO:"—",robLSFO:"—",robLubeOil:"—",robFW:"204",robBallast:"—",meConsumption:"0",aeConsumption:"3.0",boilerConsumption:"2.5",shorePower:"No",weather:"Clear/Overcast",windForce:"NE Force 2-3",seaSwell:"Moderate swell 0.1-0.2m",portRestrictions:"Waiting load instructions",remarks:"7 days anchor Sungai Linggi. No PSC. No equipment issues. Ballast exchange not required."};

const f2=(v,d=2)=>(v==null||v==="")?"—":isNaN(Number(v))?v:Number(v).toFixed(d);
const opC=op=>op.includes("Manoeuv")?"#f7c948":op==="Idle"?"#4d9ef7":"#00c9a7";

const Tip=({active,payload,label})=>{
  if(!active||!payload?.length)return null;
  return <div style={{background:"#0d1b2e",border:"1px solid #1e3a5a",borderRadius:8,padding:"10px 14px",fontSize:11}}>
    <p style={{color:"#94b8d4",marginBottom:5,fontWeight:600}}>{label}</p>
    {payload.map((p,i)=><p key={i} style={{color:p.color,margin:"2px 0"}}>{p.name}: <b>{f2(p.value)}</b></p>)}
  </div>;
};

const Kard=({label,value,sub,accent,warn,blue})=>(
  <div style={{background:"linear-gradient(135deg,#0d1f35,#0a1728)",border:`1px solid ${warn?"#e05a5a44":accent?"#00c9a744":blue?"#4d9ef744":"#1e3a5a"}`,borderRadius:12,padding:"14px 16px",position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:0,left:0,width:3,height:"100%",background:warn?"#e05a5a":accent?"#00c9a7":blue?"#4d9ef7":"#5a8aaa"}} />
    <p style={{color:"#5a8aaa",fontSize:9,textTransform:"uppercase",letterSpacing:1.2,marginBottom:4}}>{label}</p>
    <p style={{color:warn?"#f7a948":accent?"#00c9a7":blue?"#4d9ef7":"#e8f4ff",fontSize:20,fontWeight:700,fontFamily:"monospace",margin:0}}>{value}</p>
    {sub&&<p style={{color:"#3a6a8a",fontSize:9,marginTop:3}}>{sub}</p>}
  </div>
);

const Sec=({title,accent="#00c9a7",children})=>(
  <div style={{background:"#0a1728",border:`1px solid ${accent}33`,borderRadius:12,padding:"14px 18px",marginBottom:14}}>
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
      <div style={{width:3,height:14,borderRadius:2,background:accent}}/>
      <h3 style={{fontSize:10,color:accent,textTransform:"uppercase",letterSpacing:1.2,fontWeight:700}}>{title}</h3>
    </div>
    {children}
  </div>
);

const FG=({children})=><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(195px,1fr))",gap:10}}>{children}</div>;
const FF=({label,value,onChange,ph=""})=>(
  <div>
    <label style={{display:"block",fontSize:9,color:"#5a8aaa",marginBottom:3,textTransform:"uppercase",letterSpacing:.5}}>{label}</label>
    <input value={value||""} onChange={e=>onChange(e.target.value)} placeholder={ph} style={{width:"100%",height:32,background:"#091525",border:"1px solid #1e3a5a",borderRadius:6,color:"#cde4f5",padding:"6px 8px",fontSize:11,fontFamily:"inherit",outline:"none"}}/>
  </div>
);

const Chip=({label,color})=><span style={{display:"inline-block",padding:"1px 8px",borderRadius:20,fontSize:9,fontWeight:600,background:color+"22",color,letterSpacing:.5}}>{label}</span>;
const MB=({active,onClick,label})=><button onClick={onClick} style={{padding:"6px 13px",borderRadius:7,fontSize:10,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",border:active?"none":"1px solid #1e3a5a",background:active?"linear-gradient(135deg,#00c9a7,#0080ff)":"transparent",color:active?"#fff":"#5a8aaa"}}>{label}</button>;

const TH2=({children,s={}})=><th style={{padding:"7px 9px",textAlign:"left",color:"#3a6a8a",fontSize:9,textTransform:"uppercase",letterSpacing:.7,borderBottom:"1px solid #1e3a5a",whiteSpace:"nowrap",...s}}>{children}</th>;
const TD2=({children,s={}})=><td style={{padding:"7px 9px",fontSize:11,...s}}>{children}</td>;

const TABS=["Overview","Daily Log","Fuel Analysis","Weather","Noon Report","COSP/EOSP/IPR","Warranty Table","Voyage Map","Performance Claims"];

export default function App(){
  const [tab,setTab]=useState("Overview");
  const [dlv,setDlv]=useState("nav");
  const [selR,setSelR]=useState(null);
  const [noonDate,setNoonDate]=useState("22-Apr");
  const [noon,setNoon]=useState({});
  const [submittedNoons,setSubmittedNoons]=useState([]);
  const [noonView,setNoonView]=useState("form"); // "form" | "submitted"
  const [clearConfirm,setClearConfirm]=useState(false);
  const [rmode,setRmode]=useState("summary");

  // Sample noon data keyed by date for auto-populate
  const NOON_SAMPLES={
    "22-Apr":{"UTC Date":"22/04/2026","Latitude":"02 01.9N","Longitude":"104 49.7E","Vessel Condition":"IN BALLAST","Draught Fwd (m)":"5.0","Draught Aft (m)":"8.0","Last Port":"SINGAPORE","Next Port":"SUNGAI LINGGI","Distance Sailed (nm)":"0","Engine Distance 24h (nm)":"277.9","Steaming Time (h)":"0","CP Speed (kts)":"12.5","Speed Last 24h (kts)":"0.0","Avg Speed (kts)":"0.0","Main Engine RPM":"0","Avg Slip (%)":"0","Wind Speed (kts)":"7","Wind Direction":"—","Beaufort Scale":"2","Wave Height (m)":"0.00","Swell Direction":"—","Swell Height (m)":"0","Current Direction":"—","Current Speed (kts)":"0.8","ME LSFO (mt)":"0","AE LSFO (mt)":"2.19","Boiler LSFO (mt)":"0.69","Total LSFO (mt)":"2.880","ME MGO (mt)":"0","AE MGO (mt)":"0","Total MGO (mt)":"3.970","LSFO Received (mt)":"0","MGO Received (mt)":"0","ROB LSFO (mt)":"970.68","ROB MGO (mt)":"242.98","FW Generated (mt)":"0","FW Consumed (mt)":"5","FW Received (mt)":"0","FW ROB (mt)":"218"},
    "23-Apr":{"UTC Date":"23/04/2026","Latitude":"01 17.9N","Longitude":"103 19.9E","Vessel Condition":"BALLAST","Draught Fwd (m)":"5.5","Draught Aft (m)":"8.5","Last Port":"SGP EOPL","Next Port":"SUNGAI LINGGI","Distance Sailed (nm)":"127.02","Engine Distance 24h (nm)":"127.02","Steaming Time (h)":"11.2","CP Speed (kts)":"12.5","Speed Last 24h (kts)":"11.3","Avg Speed (kts)":"11.3","Main Engine RPM":"80","Avg Slip (%)":"5.5","Wind Speed (kts)":"5","Wind Direction":"SW","Beaufort Scale":"2","Wave Height (m)":"0.10","Swell Direction":"—","Swell Height (m)":"0","Current Direction":"—","Current Speed (kts)":"0.8","ME LSFO (mt)":"9.107","AE LSFO (mt)":"3.71","Boiler LSFO (mt)":"0.83","Total LSFO (mt)":"13.647","ME MGO (mt)":"0","AE MGO (mt)":"0","Total MGO (mt)":"0.000","LSFO Received (mt)":"0","MGO Received (mt)":"0","ROB LSFO (mt)":"959.73","ROB MGO (mt)":"246.54","FW Generated (mt)":"0","FW Consumed (mt)":"6","FW Received (mt)":"0","FW ROB (mt)":"212"},
    "24-Apr":{"UTC Date":"24/04/2026","Latitude":"02 15.8N","Longitude":"101 59.9E","Vessel Condition":"BALLAST","Draught Fwd (m)":"5.5","Draught Aft (m)":"8.5","Last Port":"SGP EOPL","Next Port":"SUNGAI LINGGI","Distance Sailed (nm)":"107.01","Engine Distance 24h (nm)":"107.01","Steaming Time (h)":"9.1","CP Speed (kts)":"12.5","Speed Last 24h (kts)":"12.2","Avg Speed (kts)":"11.7","Main Engine RPM":"0","Avg Slip (%)":"5.6","Wind Speed (kts)":"5","Wind Direction":"SW","Beaufort Scale":"2","Wave Height (m)":"0.10","Swell Direction":"—","Swell Height (m)":"0","Current Direction":"—","Current Speed (kts)":"1.1","ME LSFO (mt)":"3.370","AE LSFO (mt)":"3.20","Boiler LSFO (mt)":"0.87","Total LSFO (mt)":"10.440","ME MGO (mt)":"0","AE MGO (mt)":"0.100","Total MGO (mt)":"0.100","LSFO Received (mt)":"0","MGO Received (mt)":"0","ROB LSFO (mt)":"949.29","ROB MGO (mt)":"246.44","FW Generated (mt)":"0","FW Consumed (mt)":"8","FW Received (mt)":"0","FW ROB (mt)":"204"},
    "25-Apr":{"UTC Date":"25/04/2026","Latitude":"02 15.8N","Longitude":"101 59.9E","Vessel Condition":"BALLAST","Draught Fwd (m)":"5.5","Draught Aft (m)":"8.5","Last Port":"SGP EOPL","Next Port":"SUNGAI LINGGI","Distance Sailed (nm)":"0","Engine Distance 24h (nm)":"0","Steaming Time (h)":"0","CP Speed (kts)":"12.5","Speed Last 24h (kts)":"0","Avg Speed (kts)":"11.7","Main Engine RPM":"0","Avg Slip (%)":"0","Wind Speed (kts)":"8","Wind Direction":"NE","Beaufort Scale":"3","Wave Height (m)":"0.15","Swell Direction":"—","Swell Height (m)":"0","Current Direction":"—","Current Speed (kts)":"0.4","ME LSFO (mt)":"0","AE LSFO (mt)":"2.70","Boiler LSFO (mt)":"1.17","Total LSFO (mt)":"3.870","ME MGO (mt)":"0","AE MGO (mt)":"0.004","Total MGO (mt)":"0.004","LSFO Received (mt)":"0","MGO Received (mt)":"0","ROB LSFO (mt)":"945.42","ROB MGO (mt)":"246.44","FW Generated (mt)":"0","FW Consumed (mt)":"9","FW Received (mt)":"0","FW ROB (mt)":"195"},
    "26-Apr":{"UTC Date":"26/04/2026","Latitude":"02 15.8N","Longitude":"101 59.9E","Vessel Condition":"BALLAST","Draught Fwd (m)":"5.5","Draught Aft (m)":"8.5","Last Port":"SGP EOPL","Next Port":"SUNGAI LINGGI","Distance Sailed (nm)":"0","Engine Distance 24h (nm)":"0","Steaming Time (h)":"0","CP Speed (kts)":"12.5","Speed Last 24h (kts)":"0","Avg Speed (kts)":"11.7","Main Engine RPM":"0","Avg Slip (%)":"0","Wind Speed (kts)":"4","Wind Direction":"NE","Beaufort Scale":"2","Wave Height (m)":"0.10","Swell Direction":"—","Swell Height (m)":"0","Current Direction":"—","Current Speed (kts)":"1.0","ME LSFO (mt)":"0","AE LSFO (mt)":"2.60","Boiler LSFO (mt)":"1.15","Total LSFO (mt)":"3.750","ME MGO (mt)":"0","AE MGO (mt)":"0","Total MGO (mt)":"0.000","LSFO Received (mt)":"0","MGO Received (mt)":"0","ROB LSFO (mt)":"941.67","ROB MGO (mt)":"246.44","FW Generated (mt)":"0","FW Consumed (mt)":"9","FW Received (mt)":"0","FW ROB (mt)":"186"},
    "27-Apr":{"UTC Date":"27/04/2026","Latitude":"02 15.8N","Longitude":"101 59.9E","Vessel Condition":"BALLAST","Draught Fwd (m)":"5.5","Draught Aft (m)":"8.5","Last Port":"SGP EOPL","Next Port":"SUNGAI LINGGI","Distance Sailed (nm)":"0","Engine Distance 24h (nm)":"0","Steaming Time (h)":"0","CP Speed (kts)":"12.5","Speed Last 24h (kts)":"0","Avg Speed (kts)":"11.7","Main Engine RPM":"0","Avg Slip (%)":"0","Wind Speed (kts)":"4","Wind Direction":"NE","Beaufort Scale":"2","Wave Height (m)":"0.10","Swell Direction":"—","Swell Height (m)":"0","Current Direction":"—","Current Speed (kts)":"1.0","ME LSFO (mt)":"0","AE LSFO (mt)":"2.68","Boiler LSFO (mt)":"1.19","Total LSFO (mt)":"3.870","ME MGO (mt)":"0","AE MGO (mt)":"0","Total MGO (mt)":"0.000","LSFO Received (mt)":"0","MGO Received (mt)":"0","ROB LSFO (mt)":"937.80","ROB MGO (mt)":"246.44","FW Generated (mt)":"0","FW Consumed (mt)":"10","FW Received (mt)":"0","FW ROB (mt)":"176"},
    "28-Apr":{"UTC Date":"28/04/2026","Latitude":"02 15.8N","Longitude":"101 59.9E","Vessel Condition":"BALLAST","Draught Fwd (m)":"5.5","Draught Aft (m)":"8.5","Last Port":"SGP EOPL","Next Port":"SUNGAI LINGGI","Distance Sailed (nm)":"0","Engine Distance 24h (nm)":"0","Steaming Time (h)":"0","CP Speed (kts)":"12.5","Speed Last 24h (kts)":"0","Avg Speed (kts)":"11.7","Main Engine RPM":"0","Avg Slip (%)":"0","Wind Speed (kts)":"6","Wind Direction":"NE","Beaufort Scale":"2","Wave Height (m)":"0.15","Swell Direction":"—","Swell Height (m)":"0","Current Direction":"—","Current Speed (kts)":"1.0","ME LSFO (mt)":"0","AE LSFO (mt)":"2.67","Boiler LSFO (mt)":"1.21","Total LSFO (mt)":"3.880","ME MGO (mt)":"0","AE MGO (mt)":"0.100","Total MGO (mt)":"0.100","LSFO Received (mt)":"0","MGO Received (mt)":"0","ROB LSFO (mt)":"933.92","ROB MGO (mt)":"246.34","FW Generated (mt)":"0","FW Consumed (mt)":"8","FW Received (mt)":"0","FW ROB (mt)":"168"},
    "29-Apr":{"UTC Date":"29/04/2026","Latitude":"02 15.9N","Longitude":"101 59.9E","Vessel Condition":"BALLAST","Draught Fwd (m)":"5.5","Draught Aft (m)":"8.5","Last Port":"SGP EOPL","Next Port":"SUNGAI LINGGI","Distance Sailed (nm)":"0","Engine Distance 24h (nm)":"0","Steaming Time (h)":"0","CP Speed (kts)":"12.5","Speed Last 24h (kts)":"0","Avg Speed (kts)":"11.7","Main Engine RPM":"0","Avg Slip (%)":"0","Wind Speed (kts)":"7","Wind Direction":"NE","Beaufort Scale":"3","Wave Height (m)":"0.20","Swell Direction":"—","Swell Height (m)":"0","Current Direction":"—","Current Speed (kts)":"1.0","ME LSFO (mt)":"0","AE LSFO (mt)":"2.68","Boiler LSFO (mt)":"1.21","Total LSFO (mt)":"3.890","ME MGO (mt)":"0","AE MGO (mt)":"0.100","Total MGO (mt)":"0.100","LSFO Received (mt)":"0","MGO Received (mt)":"0","ROB LSFO (mt)":"930.03","ROB MGO (mt)":"246.24","FW Generated (mt)":"0","FW Consumed (mt)":"8","FW Received (mt)":"0","FW ROB (mt)":"160"},
    "30-Apr":{"UTC Date":"30/04/2026","Latitude":"02 15.9N","Longitude":"101 59.9E","Vessel Condition":"BALLAST","Draught Fwd (m)":"5.5","Draught Aft (m)":"8.5","Last Port":"SGP EOPL","Next Port":"SUNGAI LINGGI","Distance Sailed (nm)":"0","Engine Distance 24h (nm)":"0","Steaming Time (h)":"0","CP Speed (kts)":"12.5","Speed Last 24h (kts)":"0","Avg Speed (kts)":"11.7","Main Engine RPM":"0","Avg Slip (%)":"0","Wind Speed (kts)":"8","Wind Direction":"NE","Beaufort Scale":"3","Wave Height (m)":"0.20","Swell Direction":"—","Swell Height (m)":"0","Current Direction":"—","Current Speed (kts)":"1.0","ME LSFO (mt)":"0","AE LSFO (mt)":"2.62","Boiler LSFO (mt)":"1.14","Total LSFO (mt)":"3.760","ME MGO (mt)":"0","AE MGO (mt)":"0","Total MGO (mt)":"0.000","LSFO Received (mt)":"0","MGO Received (mt)":"0","ROB LSFO (mt)":"926.27","ROB MGO (mt)":"246.24","FW Generated (mt)":"0","FW Consumed (mt)":"9","FW Received (mt)":"0","FW ROB (mt)":"151"},
  };
  const [cF,setCF]=useState({...C0});
  const [eF,setEF]=useState({...E0});
  const [iF,setIF]=useState({...I0});
  const [cOk,setCOk]=useState(false);
  const [eOk,setEOk]=useState(false);
  const [iOk,setIOk]=useState(false);

  const cd=DAILY.map(d=>({date:d.date,lsfo:d.totalLSFO,spd:d.avgSpd,rob:d.robLSFO,robM:d.robMGO,bf:d.bf,wind:d.windSpd,wave:d.waveH,cur:d.curSpd,me:d.meLSFO,ae:d.aeLSFO,boil:d.boilerLSFO,fw:d.fwROB,fwc:d.fwCons}));

  const css=`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    ::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:#0a1525}::-webkit-scrollbar-thumb{background:#1e3a5a;border-radius:3px}
    .rh:hover{background:#0d2035!important;cursor:pointer}
    .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
    .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
    .g2{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
    @media(max-width:900px){.g4{grid-template-columns:repeat(2,1fr)}.g3{grid-template-columns:1fr 1fr}}
    @media(max-width:580px){.g4,.g3,.g2{grid-template-columns:1fr}}
    table{width:100%;border-collapse:collapse;font-size:11px}
    th{white-space:nowrap}
    textarea{background:#091525;border:1px solid #1e3a5a;border-radius:6px;color:#cde4f5;padding:8px;font-size:11px;font-family:inherit;outline:none;width:100%}
    textarea:focus{border-color:#00c9a7}
  `;

  const PanelBox=({children,mb=14})=><div style={{background:"#0a1728",border:"1px solid #1e3a5a",borderRadius:12,padding:"14px 18px",marginBottom:mb}}>{children}</div>;
  const PLabel=({children})=><p style={{fontSize:9,color:"#5a8aaa",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>{children}</p>;

  return(
    <div style={{minHeight:"100vh",background:"#060e1a",fontFamily:"'Syne',sans-serif",color:"#cde4f5"}}>
      <style>{css}</style>

      {/* HEADER */}
      <header style={{background:"linear-gradient(90deg,#060e1a,#0d1f35,#060e1a)",borderBottom:"1px solid #1e3a5a",padding:"12px 22px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
        <div style={{display:"flex",alignItems:"center",gap:11}}>
          <div style={{width:38,height:38,borderRadius:9,background:"linear-gradient(135deg,#00c9a7,#0080ff)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17}}>⚓</div>
          <div>
            <h1 style={{fontSize:17,fontWeight:800,color:"#e8f4ff"}}>M/V XYZ</h1>
            <p style={{fontSize:9,color:"#4d9ef7",letterSpacing:1.2}}>VESSEL PERFORMANCE REPORT</p>
          </div>
        </div>
        <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
          {[["Period","22 Apr – 30 Apr 2026"],["Route","SGP EOPL → Sungai Linggi"],["Condition","Ballast"],["CP Speed","12.5 Kts ECO"],["Delivery","22 Apr 2026 00:01 LT"]].map(([k,v])=>(
            <div key={k} style={{textAlign:"right"}}>
              <p style={{fontSize:8,color:"#3a6a8a",textTransform:"uppercase",letterSpacing:1}}>{k}</p>
              <p style={{fontSize:11,color:"#cde4f5",fontWeight:600}}>{v}</p>
            </div>
          ))}
        </div>
      </header>

      {/* TABS */}
      <nav style={{background:"#0a1525",borderBottom:"1px solid #1e3a5a",padding:"0 22px",display:"flex",gap:2,overflowX:"auto"}}>
        {TABS.map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{background:"none",border:"none",cursor:"pointer",padding:"11px 12px",fontSize:10,fontWeight:600,color:tab===t?"#00c9a7":"#5a8aaa",borderBottom:tab===t?"2px solid #00c9a7":"2px solid transparent",whiteSpace:"nowrap"}}>
            {t}
          </button>
        ))}
      </nav>

      <main style={{padding:"20px 22px",maxWidth:1440,margin:"0 auto"}}>

        {/* ===== OVERVIEW ===== */}
        {tab==="Overview"&&<>
          <div style={{background:"#0a1728",border:"1px solid #f7c94844",borderRadius:9,padding:"9px 16px",display:"flex",gap:18,flexWrap:"wrap",alignItems:"center",marginBottom:14}}>
            <span style={{fontSize:9,color:"#f7c948",fontWeight:700,textTransform:"uppercase",letterSpacing:1}}>⚓ Delivery ROB — 22 Apr 00:01 LT</span>
            {[["LSFO","973.56 MT"],["MGO","246.95 MT"],["FW","218 MT"]].map(([k,v])=>(
              <span key={k}><span style={{fontSize:9,color:"#3a6a8a",marginRight:3}}>{k}:</span><span style={{fontFamily:"monospace",color:"#f7c948",fontWeight:700,fontSize:12}}>{v}</span></span>
            ))}
            <span style={{fontSize:9,color:"#5a8aaa",marginLeft:"auto"}}>Post-surveyor noon: LSFO 970.68 · MGO 242.98</span>
          </div>
          <div className="g4" style={{marginBottom:12}}>
            <Kard label="Reporting Days" value="9" sub="22 Apr – 30 Apr 2026"/>
            <Kard label="Total Distance" value="234.03 nm" sub="Nautical Miles"/>
            <Kard label="Avg Speed (Stmg)" value="10.35 Kts" sub="CP Warranted: 12.5 Kts" warn/>
            <Kard label="Idle at Anchor" value="8 Days" sub="Sungai Linggi" warn/>
          </div>
          <div className="g4" style={{marginBottom:12}}>
            <Kard label="LSFO Consumed" value="46.987 MT" sub="Warranted: 49.5 MT" accent/>
            <Kard label="LSFO ROB (Close)" value="926.27 MT" sub="30 Apr 2026" blue/>
            <Kard label="MGO Consumed" value="4.274 MT" sub="Total"/>
            <Kard label="Avg Daily LSFO" value="5.5 MT/Day" sub="Matches CP warranted" accent/>
          </div>
          <div className="g4" style={{marginBottom:16}}>
            <Kard label="FW ROB Open" value="218 MT" sub="At delivery 22 Apr" blue/>
            <Kard label="FW Consumed" value="72 MT" sub="Over 9 days"/>
            <Kard label="FW ROB Close" value="151 MT" sub="30 Apr" blue/>
            <Kard label="Bunker Received" value="Nil" sub="No bunkering this voyage"/>
          </div>

          <PanelBox>
            <PLabel>Voyage Summary — Actuals vs CP Warranted</PLabel>
            <div className="g2">
              <div style={{overflowX:"auto"}}>
                <table><thead><tr>{["Leg","Distance","Operation","Avg Speed","Status"].map(h=><TH2 key={h}>{h}</TH2>)}</tr></thead>
                <tbody>
                  {[{l:"22-Apr",d:"0 nm",o:"Idle – SGP EOPL",s:"0.0 Kts",st:"Below Warranted",c:"#e05a5a"},
                    {l:"23-Apr",d:"127.02 nm",o:"Manoeuvring",s:"11.3 Kts",st:"Manoeuvring Only",c:"#f7c948"},
                    {l:"24-Apr",d:"107.01 nm",o:"Manoeuv/Anchor",s:"11.7 Kts",st:"Manoeuvring Only",c:"#f7c948"},
                    {l:"25-30 Apr",d:"0 nm",o:"Idle – Sungai Linggi",s:"—",st:"Below Warranted",c:"#e05a5a"},
                  ].map((r,i)=>(
                    <tr key={i} style={{borderBottom:"1px solid #0d1f35"}}>
                      <TD2 s={{fontWeight:700,color:"#e8f4ff"}}>{r.l}</TD2>
                      <TD2 s={{fontFamily:"monospace"}}>{r.d}</TD2>
                      <TD2 s={{color:"#94b8d4"}}>{r.o}</TD2>
                      <TD2 s={{fontFamily:"monospace"}}>{r.s}</TD2>
                      <TD2><Chip label={r.st} color={r.c}/></TD2>
                    </tr>
                  ))}
                  <tr style={{background:"#0d1f35",fontWeight:700}}>
                    <TD2 s={{color:"#f7c948"}}>TOTAL</TD2>
                    <TD2 s={{fontFamily:"monospace",color:"#f7c948"}}>234.03 nm</TD2>
                    <TD2>—</TD2>
                    <TD2 s={{fontFamily:"monospace",color:"#f7c948"}}>10.35 Kts</TD2>
                    <TD2/>
                  </tr>
                </tbody></table>
              </div>
              <div style={{overflowX:"auto"}}>
                <table><thead><tr>{["Parameter","CP Warranted","Actual"].map(h=><TH2 key={h}>{h}</TH2>)}</tr></thead>
                <tbody>
                  {[["Speed (Stmg Avg)","12.5 Kts (Eco)","10.35 Kts","#f7c948"],["Total LSFO","49.5 MT","46.987 MT","#00c9a7"],
                    ["Avg Daily LSFO","5.5 MT/Day","5.5 MT/Day","#00c9a7"],["MGO Consumed","—","4.274 MT","#4d9ef7"],
                    ["Idle Days Anchor","N/A","7 Days","#e05a5a"],["Total Distance","—","234.03 nm","#cde4f5"],
                    ["FW Consumed","—","72 MT","#cde4f5"],["Bunker Received","—","Nil","#5a8aaa"]].map(([p,w,a,c],i)=>(
                    <tr key={i} style={{borderBottom:"1px solid #0d1f35"}}>
                      <TD2 s={{color:"#94b8d4"}}>{p}</TD2>
                      <TD2 s={{fontFamily:"monospace",color:"#3a6a8a"}}>{w}</TD2>
                      <TD2 s={{fontFamily:"monospace",fontWeight:700,color:c}}>{a}</TD2>
                    </tr>
                  ))}
                </tbody></table>
              </div>
            </div>
          </PanelBox>

          <div className="g2" style={{marginBottom:12}}>
            <PanelBox mb={0}><PLabel>Daily LSFO vs CP Warranted</PLabel>
              <ResponsiveContainer width="100%" height={180}><BarChart data={cd}><CartesianGrid strokeDasharray="3 3" stroke="#1e3a5a"/><XAxis dataKey="date" tick={{fill:"#5a8aaa",fontSize:9}}/><YAxis tick={{fill:"#5a8aaa",fontSize:9}}/><Tooltip content={<Tip/>}/><ReferenceLine y={5.5} stroke="#f7c948" strokeDasharray="4 4" label={{value:"CP 5.5",fill:"#f7c948",fontSize:9}}/><Bar dataKey="lsfo" name="LSFO (MT)" fill="#00c9a7" radius={[3,3,0,0]}/></BarChart></ResponsiveContainer>
            </PanelBox>
            <PanelBox mb={0}><PLabel>Actual Speed vs CP Warranted (12.5 Kts)</PLabel>
              <ResponsiveContainer width="100%" height={180}><ComposedChart data={cd}><CartesianGrid strokeDasharray="3 3" stroke="#1e3a5a"/><XAxis dataKey="date" tick={{fill:"#5a8aaa",fontSize:9}}/><YAxis tick={{fill:"#5a8aaa",fontSize:9}} domain={[0,14]}/><Tooltip content={<Tip/>}/><ReferenceLine y={12.5} stroke="#f7c948" strokeDasharray="4 4" label={{value:"CP 12.5",fill:"#f7c948",fontSize:9}}/><Bar dataKey="spd" name="Speed (kts)" fill="#4d9ef7" radius={[3,3,0,0]}/></ComposedChart></ResponsiveContainer>
            </PanelBox>
          </div>
          <div className="g2" style={{marginBottom:12}}>
            <PanelBox mb={0}><PLabel>LSFO ROB Drawdown</PLabel>
              <ResponsiveContainer width="100%" height={160}><AreaChart data={cd}><defs><linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4d9ef7" stopOpacity={0.3}/><stop offset="95%" stopColor="#4d9ef7" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#1e3a5a"/><XAxis dataKey="date" tick={{fill:"#5a8aaa",fontSize:9}}/><YAxis tick={{fill:"#5a8aaa",fontSize:9}} domain={[900,980]}/><Tooltip content={<Tip/>}/><Area type="monotone" dataKey="rob" name="ROB LSFO" stroke="#4d9ef7" fill="url(#rg)" strokeWidth={2}/></AreaChart></ResponsiveContainer>
            </PanelBox>
            <PanelBox mb={0}><PLabel>Fresh Water ROB</PLabel>
              <ResponsiveContainer width="100%" height={160}><AreaChart data={cd}><defs><linearGradient id="fwg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#00c9a7" stopOpacity={0.2}/><stop offset="95%" stopColor="#00c9a7" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#1e3a5a"/><XAxis dataKey="date" tick={{fill:"#5a8aaa",fontSize:9}}/><YAxis tick={{fill:"#5a8aaa",fontSize:9}}/><Tooltip content={<Tip/>}/><Area type="monotone" dataKey="fw" name="FW ROB (MT)" stroke="#00c9a7" fill="url(#fwg)" strokeWidth={2}/></AreaChart></ResponsiveContainer>
            </PanelBox>
          </div>
          <div className="g2" style={{marginBottom:14}}>
            {[{data:PIE_FUEL,title:"LSFO by System (46.987 MT)",fmt:v=>`${v} MT`},{data:PIE_TIME,title:"Voyage Time (9 Days)",fmt:v=>`${v}%`}].map(({data,title,fmt:f})=>(
              <PanelBox key={title} mb={0}><PLabel>{title}</PLabel>
                <ResponsiveContainer width="100%" height={160}><PieChart><Pie data={data} cx="50%" cy="50%" innerRadius={42} outerRadius={68} paddingAngle={3} dataKey="value">{data.map((e,i)=><Cell key={i} fill={e.color}/>)}</Pie><Tooltip formatter={f} contentStyle={{background:"#0d1b2e",border:"1px solid #1e3a5a",borderRadius:8}}/><Legend iconType="circle" wrapperStyle={{fontSize:9,color:"#94b8d4"}}/></PieChart></ResponsiveContainer>
              </PanelBox>
            ))}
          </div>
          <PanelBox><PLabel>Voyage Narrative</PLabel>
            {[["22 Apr 00:01","Delivery SGP EOPL. ROB: LSFO 973.56 MT / MGO 246.95 MT. Post-surveyor noon: 970.68 / 242.98 MT."],
              ["23 Apr","Proceeded Sungai Linggi via Malacca — 127.02 nm · 11.3 kts · Manoeuvring only · RPM 80 · Slip 5.5%."],
              ["24 Apr","Arrived Sungai Linggi 02°15.8N 101°59.9E. NOR tendered. Anchored awaiting load instructions."],
              ["25–30 Apr","7 days at anchor Sungai Linggi. BF 2–3. No heavy weather. FW consumed ~8–10 MT/day."],
              ["Total","LSFO 46.987 MT (ME 12.477 + AE 25.05 + Boiler 9.46) | MGO 4.274 MT | FW 72 MT | No bunker received."]
            ].map(([d,t])=>(
              <div key={d} style={{display:"flex",gap:10,marginBottom:7}}>
                <span style={{minWidth:82,color:"#4d9ef7",fontSize:9,fontWeight:700,fontFamily:"monospace"}}>{d}</span>
                <span style={{color:"#94b8d4",fontSize:11,lineHeight:1.6}}>{t}</span>
              </div>
            ))}
          </PanelBox>
        </>}

        {/* ===== DAILY LOG ===== */}
        {tab==="Daily Log"&&<>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8,marginBottom:12}}>
            <h2 style={{fontSize:13,fontWeight:700,color:"#e8f4ff"}}>Master Noon Report · 1200 LT Daily</h2>
            <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
              {[["nav","🧭 Navigation"],["eng","⚙️ Engine & Bunkers"],["wx","🌊 Weather & FW"]].map(([m,l])=>(
                <MB key={m} active={dlv===m} onClick={()=>setDlv(m)} label={l}/>
              ))}
            </div>
          </div>

          {dlv==="nav"&&<div style={{overflowX:"auto",background:"#0a1728",border:"1px solid #1e3a5a",borderRadius:12}}>
            <table><thead><tr style={{background:"#0d1f35"}}>{["Date","Lat","Lon","Post.","Operation","Cond.","Stm Hrs","Dist nm","Avg Spd","CP Spd","RPM","Slip %","Remarks"].map(h=><TH2 key={h}>{h}</TH2>)}</tr></thead>
            <tbody>
              {DAILY.map((d,i)=>(
                <tr key={d.date} className="rh" onClick={()=>setSelR(selR===i?null:i)} style={{borderBottom:"1px solid #0d1f35",background:selR===i?"#0d2035":"transparent"}}>
                  <TD2 s={{fontWeight:700,color:"#e8f4ff"}}>{d.date}</TD2>
                  <TD2 s={{fontFamily:"monospace",color:"#5a8aaa",fontSize:9}}>{d.lat}</TD2>
                  <TD2 s={{fontFamily:"monospace",color:"#5a8aaa",fontSize:9}}>{d.lon}</TD2>
                  <TD2 s={{color:"#5a8aaa",fontSize:9}}>{d.post}</TD2>
                  <TD2><Chip label={d.op} color={opC(d.op)}/></TD2>
                  <TD2 s={{color:"#5a8aaa",fontSize:9}}>{d.cond}</TD2>
                  <TD2 s={{fontFamily:"monospace"}}>{d.stmHrs||"—"}</TD2>
                  <TD2 s={{fontFamily:"monospace"}}>{d.dist||"—"}</TD2>
                  <TD2 s={{fontFamily:"monospace",color:d.avgSpd>0&&d.avgSpd<12.5?"#f7c948":"#cde4f5"}}>{d.avgSpd>0?`${d.avgSpd} kts`:"—"}</TD2>
                  <TD2 s={{fontFamily:"monospace",color:"#3a6a8a"}}>{d.cpSpd}</TD2>
                  <TD2 s={{fontFamily:"monospace"}}>{d.rpm||"—"}</TD2>
                  <TD2 s={{fontFamily:"monospace"}}>{d.slip||"—"}</TD2>
                  <TD2 s={{color:"#5a8aaa",maxWidth:150,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d.remarks}</TD2>
                </tr>
              ))}
              <tr style={{background:"#0d1f35",fontWeight:700,borderTop:"2px solid #1e3a5a"}}>
                <TD2 s={{color:"#f7c948"}}>TOTAL</TD2><TD2/><TD2/><TD2/><TD2/><TD2/><TD2/>
                <TD2 s={{fontFamily:"monospace",color:"#f7c948"}}>234.03</TD2>
                <TD2 s={{fontFamily:"monospace",color:"#f7c948"}}>10.35 kts</TD2>
                <TD2 colSpan={4}/>
              </tr>
            </tbody></table>
          </div>}

          {dlv==="eng"&&<div style={{overflowX:"auto",background:"#0a1728",border:"1px solid #1e3a5a",borderRadius:12}}>
            <table><thead>
              <tr style={{background:"#0d1f35"}}>
                <TH2 s={{}} rowSpan={2}>Date</TH2>
                <TH2 rowSpan={2}>Operation</TH2>
                <TH2 rowSpan={2}>Stm Hrs</TH2>
                <TH2 rowSpan={2}>Dist</TH2>
                <TH2 s={{color:"#f7c948",textAlign:"center",borderBottom:"1px solid #1e3a5a"}} colSpan={4}>LSFO (MT)</TH2>
                <TH2 s={{color:"#e05a5a",textAlign:"center",borderBottom:"1px solid #1e3a5a"}} colSpan={2}>MGO (MT)</TH2>
                <TH2 s={{color:"#4d9ef7",textAlign:"center",borderBottom:"1px solid #1e3a5a"}} colSpan={2}>ROB</TH2>
                <TH2 s={{color:"#00c9a7",textAlign:"center",borderBottom:"1px solid #1e3a5a"}} colSpan={2}>Received</TH2>
              </tr>
              <tr style={{background:"#0d1f35"}}>{["ME","AE","Boiler","Total","AE","Total","LSFO","MGO","LSFO","MGO"].map((h,i)=><TH2 key={h+i}>{h}</TH2>)}</tr>
            </thead><tbody>
              <tr style={{background:"#0d2035",borderBottom:"1px solid #0d1f35"}}>
                <TD2 s={{fontWeight:700,color:"#f7c948",fontFamily:"monospace",fontSize:9}}>22-Apr 00:01</TD2>
                <TD2 s={{color:"#f7c948"}}>DELIVERY</TD2>
                <TD2/><TD2/>
                {["—","—","—","—","—","—"].map((v,i)=><TD2 key={i} s={{color:"#3a6a8a",fontFamily:"monospace"}}>{v}</TD2>)}
                <TD2 s={{fontFamily:"monospace",color:"#f7c948",fontWeight:700}}>973.56</TD2>
                <TD2 s={{fontFamily:"monospace",color:"#f7c948",fontWeight:700}}>246.95</TD2>
                <TD2 s={{color:"#3a6a8a"}}>—</TD2><TD2 s={{color:"#3a6a8a"}}>—</TD2>
              </tr>
              {DAILY.map((d,i)=>(
                <tr key={d.date} style={{borderBottom:"1px solid #0d1f35"}}>
                  <TD2 s={{fontWeight:700,color:"#e8f4ff"}}>{d.date}</TD2>
                  <TD2><Chip label={d.op} color={opC(d.op)}/></TD2>
                  <TD2 s={{fontFamily:"monospace"}}>{d.stmHrs||"—"}</TD2>
                  <TD2 s={{fontFamily:"monospace"}}>{d.dist||"—"}</TD2>
                  <TD2 s={{fontFamily:"monospace",color:"#f7c948"}}>{f2(d.meLSFO,3)}</TD2>
                  <TD2 s={{fontFamily:"monospace",color:"#00c9a7"}}>{f2(d.aeLSFO,2)}</TD2>
                  <TD2 s={{fontFamily:"monospace",color:"#e05a5a"}}>{f2(d.boilerLSFO,2)}</TD2>
                  <TD2 s={{fontFamily:"monospace",fontWeight:700}}>{f2(d.totalLSFO,3)}</TD2>
                  <TD2 s={{fontFamily:"monospace"}}>{f2(d.aeMGO,3)}</TD2>
                  <TD2 s={{fontFamily:"monospace",fontWeight:700}}>{f2(d.mgo,3)}</TD2>
                  <TD2 s={{fontFamily:"monospace",color:"#4d9ef7"}}>{f2(d.robLSFO)}</TD2>
                  <TD2 s={{fontFamily:"monospace"}}>{f2(d.robMGO)}</TD2>
                  <TD2 s={{fontFamily:"monospace",color:d.rcvdLSFO>0?"#00c9a7":"#3a6a8a"}}>{d.rcvdLSFO||"—"}</TD2>
                  <TD2 s={{fontFamily:"monospace",color:d.rcvdMGO>0?"#00c9a7":"#3a6a8a"}}>{d.rcvdMGO||"—"}</TD2>
                </tr>
              ))}
              <tr style={{background:"#0d1f35",fontWeight:700,borderTop:"2px solid #1e3a5a"}}>
                <TD2 s={{color:"#f7c948"}}>TOTAL</TD2><TD2/><TD2/><TD2/>
                <TD2 s={{fontFamily:"monospace",color:"#f7c948"}}>12.477</TD2>
                <TD2 s={{fontFamily:"monospace",color:"#f7c948"}}>25.050</TD2>
                <TD2 s={{fontFamily:"monospace",color:"#f7c948"}}>9.460</TD2>
                <TD2 s={{fontFamily:"monospace",color:"#f7c948"}}>46.987</TD2>
                <TD2 s={{fontFamily:"monospace",color:"#f7c948"}}>0.304</TD2>
                <TD2 s={{fontFamily:"monospace",color:"#f7c948"}}>4.274</TD2>
                <TD2 s={{fontFamily:"monospace",color:"#4d9ef7"}}>926.27</TD2>
                <TD2 s={{fontFamily:"monospace"}}>246.24</TD2>
                <TD2 s={{color:"#3a6a8a",fontSize:9}} colSpan={2}>No bunker received</TD2>
              </tr>
            </tbody></table>
          </div>}

          {dlv==="wx"&&<div style={{overflowX:"auto",background:"#0a1728",border:"1px solid #1e3a5a",borderRadius:12}}>
            <table><thead><tr style={{background:"#0d1f35"}}>{["Date","Wind Dir","Wind Spd","BF","Wave m","Swell Dir","Swell m","Cur Dir","Cur Spd","FW Cons","FW Rcvd","FW ROB","Remarks"].map(h=><TH2 key={h}>{h}</TH2>)}</tr></thead>
            <tbody>
              {DAILY.map((d,i)=>(
                <tr key={d.date} style={{borderBottom:"1px solid #0d1f35"}}>
                  <TD2 s={{fontWeight:700,color:"#e8f4ff"}}>{d.date}</TD2>
                  <TD2 s={{color:"#94b8d4"}}>{d.windDir}</TD2>
                  <TD2 s={{fontFamily:"monospace",color:d.windSpd>=6?"#f7c948":"#cde4f5"}}>{d.windSpd}</TD2>
                  <TD2 s={{fontFamily:"monospace",color:d.bf>=3?"#f7c948":"#00c9a7"}}>{d.bf}</TD2>
                  <TD2 s={{fontFamily:"monospace"}}>{d.waveH}</TD2>
                  <TD2 s={{color:"#5a8aaa"}}>{d.swlDir}</TD2>
                  <TD2 s={{fontFamily:"monospace"}}>{d.swlMtr||"—"}</TD2>
                  <TD2 s={{color:"#5a8aaa"}}>{d.curDir}</TD2>
                  <TD2 s={{fontFamily:"monospace",color:"#4d9ef7"}}>{d.curSpd}</TD2>
                  <TD2 s={{fontFamily:"monospace",color:"#e05a5a"}}>{d.fwCons}</TD2>
                  <TD2 s={{fontFamily:"monospace",color:"#3a6a8a"}}>{d.fwRcvd||"—"}</TD2>
                  <TD2 s={{fontFamily:"monospace",color:"#00c9a7"}}>{d.fwROB}</TD2>
                  <TD2 s={{color:"#5a8aaa",maxWidth:140,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d.remarks}</TD2>
                </tr>
              ))}
              <tr style={{background:"#0d1f35",fontWeight:700,borderTop:"2px solid #1e3a5a"}}>
                <TD2 s={{color:"#f7c948"}}>TOTAL</TD2><TD2 colSpan={8}/>
                <TD2 s={{fontFamily:"monospace",color:"#f7c948"}}>72</TD2>
                <TD2 s={{fontFamily:"monospace",color:"#3a6a8a"}}>0</TD2>
                <TD2 colSpan={2}/>
              </tr>
            </tbody></table>
          </div>}
        </>}

        {/* ===== FUEL ANALYSIS ===== */}
        {tab==="Fuel Analysis"&&<>
          <div className="g4" style={{marginBottom:12}}>
            <Kard label="Delivery LSFO ROB" value="973.56 MT" sub="22 Apr 00:01 — at delivery" blue/>
            <Kard label="Opening LSFO Noon" value="970.68 MT" sub="22 Apr 12:00 — post adjustment"/>
            <Kard label="Closing LSFO ROB" value="926.27 MT" sub="30 Apr" blue/>
            <Kard label="LSFO Saved vs CP" value="2.513 MT" sub="Under warranted 49.5 MT" accent/>
          </div>
          <div className="g4" style={{marginBottom:16}}>
            <Kard label="ME LSFO" value="12.477 MT" sub="26.6% of total"/>
            <Kard label="AE LSFO" value="25.050 MT" sub="53.3% — largest consumer" warn/>
            <Kard label="Boiler LSFO" value="9.460 MT" sub="20.1% of total"/>
            <Kard label="Total MGO" value="4.274 MT" sub="AE MGO 0.304 MT"/>
          </div>
          <div className="g2" style={{marginBottom:12}}>
            <PanelBox mb={0}><PLabel>ME / AE / Boiler Daily Breakdown</PLabel>
              <ResponsiveContainer width="100%" height={200}><BarChart data={cd}><CartesianGrid strokeDasharray="3 3" stroke="#1e3a5a"/><XAxis dataKey="date" tick={{fill:"#5a8aaa",fontSize:9}}/><YAxis tick={{fill:"#5a8aaa",fontSize:9}}/><Tooltip content={<Tip/>}/><Legend wrapperStyle={{fontSize:9}}/><Bar dataKey="me" name="ME" stackId="a" fill="#f7c948"/><Bar dataKey="ae" name="AE" stackId="a" fill="#00c9a7"/><Bar dataKey="boil" name="Boiler" stackId="a" fill="#e05a5a" radius={[3,3,0,0]}/></BarChart></ResponsiveContainer>
            </PanelBox>
            <PanelBox mb={0}><PLabel>MGO ROB Trend</PLabel>
              <ResponsiveContainer width="100%" height={200}><AreaChart data={cd}><defs><linearGradient id="mg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#e05a5a" stopOpacity={0.3}/><stop offset="95%" stopColor="#e05a5a" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#1e3a5a"/><XAxis dataKey="date" tick={{fill:"#5a8aaa",fontSize:9}}/><YAxis tick={{fill:"#5a8aaa",fontSize:9}} domain={[240,248]}/><Tooltip content={<Tip/>}/><Area type="monotone" dataKey="robM" name="ROB MGO (MT)" stroke="#e05a5a" fill="url(#mg)" strokeWidth={2}/></AreaChart></ResponsiveContainer>
            </PanelBox>
          </div>
          <PanelBox><PLabel>Bunker ROB Full Summary</PLabel>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:9}}>
              {[["Delivery LSFO ROB","973.56 MT","#f7c948"],["Opening LSFO Noon","970.68 MT","#4d9ef7"],["Closing LSFO ROB","926.27 MT","#4d9ef7"],["Total LSFO Consumed","46.987 MT","#f7c948"],["Warranted LSFO","49.5 MT","#3a6a8a"],["LSFO Saved","2.513 MT","#00c9a7"],["Delivery MGO ROB","246.95 MT","#f7c948"],["Opening MGO Noon","242.98 MT","#e05a5a"],["Closing MGO ROB","246.24 MT","#e05a5a"],["Total MGO Consumed","4.274 MT","#f7c948"],["Bunker Received","Nil","#3a6a8a"],["FW Consumed Total","72 MT","#00c9a7"]].map(([k,v,c])=>(
                <div key={k} style={{background:"#091525",borderRadius:8,padding:"8px 10px"}}>
                  <p style={{fontSize:8,color:"#3a6a8a",textTransform:"uppercase",letterSpacing:.7,marginBottom:2}}>{k}</p>
                  <p style={{fontSize:14,fontWeight:700,color:c,fontFamily:"monospace"}}>{v}</p>
                </div>
              ))}
            </div>
          </PanelBox>
          <PanelBox><PLabel>Port / Special Operation Consumption — CP Warranted</PLabel>
            <div style={{overflowX:"auto"}}>
              <table><thead><tr style={{background:"#0d1f35"}}>{["Operation","VLSFO Total (MT/D)","A/E (MT/D)","Boiler (MT/D)","Note"].map(h=><TH2 key={h}>{h}</TH2>)}</tr></thead>
              <tbody>{PORT_OPS.map((r,i)=>(
                <tr key={i} style={{background:r.note?"#0d1f35":"transparent",borderBottom:"1px solid #0d1f35"}}>
                  <TD2 s={{color:r.note?"#00c9a7":"#cde4f5",fontWeight:r.note?700:400}}>{r.op}</TD2>
                  <TD2 s={{fontFamily:"monospace",color:"#f7c948"}}>{r.t}</TD2>
                  <TD2 s={{fontFamily:"monospace"}}>{r.ae}</TD2>
                  <TD2 s={{fontFamily:"monospace"}}>{r.b}</TD2>
                  <TD2>{r.note?<Chip label={r.note} color="#00c9a7"/>:"—"}</TD2>
                </tr>
              ))}</tbody></table>
            </div>
          </PanelBox>
        </>}

        {/* ===== WEATHER ===== */}
        {tab==="Weather"&&<>
          <div className="g4" style={{marginBottom:16}}>
            <Kard label="Max Beaufort" value="BF 3" sub="25, 29–30 Apr"/>
            <Kard label="Max Wind Speed" value="8 kts" sub="22 & 30 Apr"/>
            <Kard label="Max Wave Height" value="0.20 m" sub="29–30 Apr"/>
            <Kard label="Heavy Weather" value="None" sub="No adverse conditions" accent/>
          </div>
          <div className="g2" style={{marginBottom:12}}>
            {[{k:"bf",label:"Beaufort Scale",color:"#f7c948",dom:[0,6],ref:{y:4,v:"BF 4",c:"#e05a5a"}},{k:"wind",label:"Wind Speed (kts)",color:"#4d9ef7",dom:[0,12]}].map(({k,label,color,dom,ref})=>(
              <PanelBox key={k} mb={0}><PLabel>{label}</PLabel>
                <ResponsiveContainer width="100%" height={170}><LineChart data={cd}><CartesianGrid strokeDasharray="3 3" stroke="#1e3a5a"/><XAxis dataKey="date" tick={{fill:"#5a8aaa",fontSize:9}}/><YAxis tick={{fill:"#5a8aaa",fontSize:9}} domain={dom}/><Tooltip content={<Tip/>}/>{ref&&<ReferenceLine y={ref.y} stroke={ref.c} strokeDasharray="4 4" label={{value:ref.v,fill:ref.c,fontSize:9}}/>}<Line type="monotone" dataKey={k} name={label} stroke={color} strokeWidth={2} dot={{fill:color,r:3}}/></LineChart></ResponsiveContainer>
              </PanelBox>
            ))}
          </div>
          <div className="g2" style={{marginBottom:12}}>
            {[{k:"wave",label:"Wave Height (m)",color:"#00c9a7",dom:[0,0.4]},{k:"cur",label:"Current Speed (kts)",color:"#f7c948",dom:[0,1.5]}].map(({k,label,color,dom})=>(
              <PanelBox key={k} mb={0}><PLabel>{label}</PLabel>
                <ResponsiveContainer width="100%" height={150}><AreaChart data={cd}><defs><linearGradient id={k} x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={color} stopOpacity={0.2}/><stop offset="95%" stopColor={color} stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#1e3a5a"/><XAxis dataKey="date" tick={{fill:"#5a8aaa",fontSize:9}}/><YAxis tick={{fill:"#5a8aaa",fontSize:9}} domain={dom}/><Tooltip content={<Tip/>}/><Area type="monotone" dataKey={k} name={label} stroke={color} fill={`url(#${k})`} strokeWidth={2}/></AreaChart></ResponsiveContainer>
              </PanelBox>
            ))}
          </div>
          <PanelBox><PLabel>Daily Weather Records — Full</PLabel>
            <div style={{overflowX:"auto"}}>
              <table><thead><tr style={{background:"#0d1f35"}}>{["Date","BF","Wind Dir","Wind Spd","Wave m","Swell Dir","Swell m","Cur Dir","Cur Spd","FW Cons","Remarks"].map(h=><TH2 key={h}>{h}</TH2>)}</tr></thead>
              <tbody>{DAILY.map((d,i)=>(
                <tr key={i} style={{borderBottom:"1px solid #0d1f35"}}>
                  <TD2 s={{fontWeight:700,color:"#cde4f5"}}>{d.date}</TD2>
                  <TD2 s={{fontFamily:"monospace",color:d.bf>=3?"#f7c948":"#00c9a7"}}>{d.bf}</TD2>
                  <TD2 s={{color:"#94b8d4"}}>{d.windDir}</TD2>
                  <TD2 s={{fontFamily:"monospace"}}>{d.windSpd}</TD2>
                  <TD2 s={{fontFamily:"monospace"}}>{d.waveH}</TD2>
                  <TD2 s={{color:"#5a8aaa"}}>{d.swlDir}</TD2>
                  <TD2 s={{fontFamily:"monospace"}}>{d.swlMtr||"—"}</TD2>
                  <TD2 s={{color:"#5a8aaa"}}>{d.curDir}</TD2>
                  <TD2 s={{fontFamily:"monospace",color:"#4d9ef7"}}>{d.curSpd}</TD2>
                  <TD2 s={{fontFamily:"monospace",color:"#e05a5a"}}>{d.fwCons}</TD2>
                  <TD2 s={{color:"#5a8aaa",fontSize:9}}>{d.remarks}</TD2>
                </tr>
              ))}</tbody></table>
            </div>
          </PanelBox>
        </>}

        {/* ===== NOON REPORT ===== */}
        {tab==="Noon Report"&&<>
          {/* Header bar */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10,marginBottom:14}}>
            <div>
              <h2 style={{fontSize:13,fontWeight:700,color:"#e8f4ff"}}>Noon Position Report</h2>
              <p style={{fontSize:9,color:"#3a6a8a",marginTop:2}}>REV 02-Jul-17 · 1200 HRS LT · Vessel: M/V XYZ · Tech Manager: Kirkward Holdings</p>
            </div>
            <div style={{display:"flex",gap:7}}>
              <MB active={noonView==="form"} onClick={()=>setNoonView("form")} label="📝 Entry Form"/>
              <MB active={noonView==="submitted"} onClick={()=>setNoonView("submitted")} label={`📋 Submitted (${submittedNoons.length})`}/>
            </div>
          </div>

          {noonView==="form"&&<>
            {/* Date selector + controls */}
            <div style={{background:"#0a1728",border:"1px solid #1e3a5a",borderRadius:10,padding:"12px 16px",marginBottom:14,display:"flex",gap:14,alignItems:"center",flexWrap:"wrap"}}>
              <div>
                <label style={{fontSize:9,color:"#5a8aaa",textTransform:"uppercase",letterSpacing:.7,display:"block",marginBottom:4}}>Report Date</label>
                <select value={noonDate} onChange={e=>{setNoonDate(e.target.value);setNoon({});}} style={{background:"#091525",border:"1px solid #1e3a5a",borderRadius:6,color:"#cde4f5",padding:"6px 10px",fontSize:12,fontFamily:"inherit",outline:"none",cursor:"pointer"}}>
                  {["22-Apr","23-Apr","24-Apr","25-Apr","26-Apr","27-Apr","28-Apr","29-Apr","30-Apr"].map(d=>(
                    <option key={d} value={d} style={{background:"#091525"}}>{d} {submittedNoons.find(n=>n.date===d)?"✓":""}</option>
                  ))}
                </select>
              </div>
              <div style={{display:"flex",gap:8,marginLeft:"auto",flexWrap:"wrap",alignItems:"center"}}>
                {submittedNoons.find(n=>n.date===noonDate)&&(
                  <span style={{fontSize:10,color:"#00c9a7",fontWeight:600}}>✓ Already submitted for {noonDate}</span>
                )}
                <button onClick={()=>setNoon({...NOON_SAMPLES[noonDate]})} style={{padding:"6px 14px",background:"#4d9ef722",border:"1px solid #4d9ef744",borderRadius:6,color:"#4d9ef7",fontSize:11,cursor:"pointer",fontWeight:600}}>
                  Load Sample Data ↓
                </button>
                {clearConfirm?(
                  <>
                    <span style={{fontSize:10,color:"#e05a5a"}}>Confirm clear?</span>
                    <button onClick={()=>{setNoon({});setClearConfirm(false);}} style={{padding:"6px 12px",background:"#e05a5a22",border:"1px solid #e05a5a44",borderRadius:6,color:"#e05a5a",fontSize:11,cursor:"pointer",fontWeight:600}}>Yes, Clear</button>
                    <button onClick={()=>setClearConfirm(false)} style={{padding:"6px 12px",background:"transparent",border:"1px solid #1e3a5a",borderRadius:6,color:"#5a8aaa",fontSize:11,cursor:"pointer"}}>Cancel</button>
                  </>
                ):(
                  <button onClick={()=>setClearConfirm(true)} style={{padding:"6px 14px",background:"transparent",border:"1px solid #1e3a5a",borderRadius:6,color:"#5a8aaa",fontSize:11,cursor:"pointer"}}>Clear Form</button>
                )}
              </div>
            </div>

            {/* Form sections */}
            {[{cat:"GENERAL",ac:"#5a8aaa"},{cat:"VOYAGE",ac:"#4d9ef7"},{cat:"WEATHER",ac:"#00c9a7"},{cat:"BUNKERS",ac:"#f7c948"},{cat:"FRESH WATER",ac:"#00c9a7"}].map(({cat,ac})=>(
              <Sec key={cat} title={cat} accent={ac}>
                <FG>{NOON_FIELDS.filter(f=>f.cat===cat).map(f=>(
                  <FF key={f.label} label={f.label} value={noon[f.label]||""} onChange={v=>setNoon(p=>({...p,[f.label]:v}))} ph={f.label.includes("(m")||f.label.includes("kts")||f.label.includes("(%)")?"0.000":f.label.includes("Date")?"DD/MM/YYYY":""}/>
                ))}</FG>
              </Sec>
            ))}

            {/* Submit bar */}
            <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginBottom:6,alignItems:"center"}}>
              <span style={{fontSize:10,color:"#3a6a8a",marginRight:"auto"}}>Reporting for: <strong style={{color:"#4d9ef7"}}>{noonDate} · 1200 LT</strong></span>
              <button
                onClick={()=>{
                  const entry={date:noonDate,submittedAt:new Date().toLocaleTimeString(),data:{...noon}};
                  setSubmittedNoons(p=>[...p.filter(n=>n.date!==noonDate),entry]);
                  setNoon({});
                  setNoonView("submitted");
                }}
                style={{padding:"8px 20px",background:"linear-gradient(135deg,#00c9a7,#0080ff)",border:"none",borderRadius:7,color:"#fff",cursor:"pointer",fontSize:11,fontWeight:700}}
              >
                Submit Noon Report ✓
              </button>
            </div>
          </>}

          {/* Submitted reports log */}
          {noonView==="submitted"&&<>
            {submittedNoons.length===0?(
              <div style={{background:"#0a1728",border:"1px solid #1e3a5a",borderRadius:10,padding:"32px",textAlign:"center"}}>
                <p style={{fontSize:14,color:"#3a6a8a"}}>No noon reports submitted yet</p>
                <p style={{fontSize:11,color:"#1e3a5a",marginTop:6}}>Use the Entry Form tab to fill and submit reports</p>
                <button onClick={()=>setNoonView("form")} style={{marginTop:14,padding:"7px 18px",background:"linear-gradient(135deg,#00c9a7,#0080ff)",border:"none",borderRadius:7,color:"#fff",cursor:"pointer",fontSize:11,fontWeight:700}}>Go to Entry Form →</button>
              </div>
            ):(
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                {/* Status grid — which dates done */}
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(100px,1fr))",gap:8}}>
                  {["22-Apr","23-Apr","24-Apr","25-Apr","26-Apr","27-Apr","28-Apr","29-Apr","30-Apr"].map(d=>{
                    const done=submittedNoons.find(n=>n.date===d);
                    return(
                      <div key={d} style={{background:done?"#00c9a722":"#091525",border:`1px solid ${done?"#00c9a744":"#1e3a5a"}`,borderRadius:8,padding:"8px 10px",textAlign:"center",cursor:done?"pointer":"default"}} onClick={()=>done&&setNoonDate(d)}>
                        <p style={{fontSize:10,color:done?"#00c9a7":"#3a6a8a",fontWeight:700}}>{d}</p>
                        <p style={{fontSize:9,color:done?"#00c9a7":"#1e3a5a",marginTop:2}}>{done?"✓ Submitted":"Pending"}</p>
                      </div>
                    );
                  })}
                </div>
                {/* Submitted entries detail */}
                {submittedNoons.sort((a,b)=>a.date.localeCompare(b.date)).map((entry,idx)=>(
                  <div key={idx} style={{background:"#0a1728",border:"1px solid #00c9a733",borderRadius:10,padding:"14px 16px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <span style={{fontSize:11,fontWeight:700,color:"#00c9a7"}}>📋 {entry.date} Noon Report</span>
                        <span style={{fontSize:9,color:"#3a6a8a"}}>Submitted at {entry.submittedAt}</span>
                      </div>
                      <div style={{display:"flex",gap:8}}>
                        <button onClick={()=>{setNoon({...entry.data});setNoonDate(entry.date);setNoonView("form");}} style={{padding:"4px 10px",background:"#4d9ef722",border:"1px solid #4d9ef744",borderRadius:5,color:"#4d9ef7",fontSize:9,cursor:"pointer",fontWeight:600}}>Edit</button>
                        <button onClick={()=>setSubmittedNoons(p=>p.filter((_,i)=>i!==idx))} style={{padding:"4px 10px",background:"#e05a5a22",border:"1px solid #e05a5a44",borderRadius:5,color:"#e05a5a",fontSize:9,cursor:"pointer",fontWeight:600}}>Delete</button>
                      </div>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:6}}>
                      {Object.entries(entry.data).filter(([,v])=>v&&v!=="").slice(0,16).map(([k,v])=>(
                        <div key={k} style={{background:"#091525",borderRadius:6,padding:"5px 8px"}}>
                          <p style={{fontSize:8,color:"#3a6a8a",textTransform:"uppercase",marginBottom:1}}>{k}</p>
                          <p style={{fontSize:10,color:"#cde4f5",fontFamily:"monospace"}}>{v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <button onClick={()=>setNoonView("form")} style={{alignSelf:"flex-start",padding:"7px 16px",background:"linear-gradient(135deg,#00c9a7,#0080ff)",border:"none",borderRadius:7,color:"#fff",cursor:"pointer",fontSize:11,fontWeight:700}}>+ New Noon Report →</button>
              </div>
            )}
          </>}
        </>}

        {/* ===== COSP / EOSP / IPR ===== */}
        {tab==="COSP/EOSP/IPR"&&<>
          <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:16}}>
            <h2 style={{fontSize:13,fontWeight:700,color:"#e8f4ff",flex:1}}>Sea Passage & Port Reports</h2>
            <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
              {[["summary","📋 Summary"],["cosp","⚓ COSP"],["eosp","🏁 EOSP"],["ipr","🏭 In Port Report"]].map(([m,l])=>(
                <MB key={m} active={rmode===m} onClick={()=>setRmode(m)} label={l}/>
              ))}
            </div>
          </div>

          {rmode==="summary"&&<>
            <div className="g4" style={{marginBottom:14}}>
              <Kard label="COSP Filed" value={cOk?"✓ Filed":"Pending"} sub="22 Apr 2026 00:01 LT" accent={cOk} warn={!cOk}/>
              <Kard label="EOSP Filed" value={eOk?"✓ Filed":"Pending"} sub="24 Apr 2026 ~09:00 LT" accent={eOk} warn={!eOk}/>
              <Kard label="In Port Report" value={iOk?"✓ Filed":"Pending"} sub="24–30 Apr 2026" accent={iOk} warn={!iOk}/>
              <Kard label="Sea Passage Time" value="~11.2 hrs" sub="23–24 Apr" blue/>
            </div>
            <PanelBox><PLabel>Voyage Timeline</PLabel>
              <div style={{position:"relative",paddingLeft:28}}>
                <div style={{position:"absolute",left:8,top:6,bottom:6,width:2,background:"linear-gradient(180deg,#f7c948,#00c9a7,#4d9ef7,#e05a5a)"}}/>
                {[
                  {c:"#f7c948",d:"22 Apr 00:01 LT", t:"DELIVERY",                    x:"ROB: LSFO 973.56 MT / MGO 246.95 MT at delivery"},
                  {c:"#00c9a7",d:"22 Apr 12:00 LT", t:"COSP — Singapore EOPL",       x:"Post-adjustment: LSFO 970.68 / MGO 242.98 · Bunker surveyor"},
                  {c:"#4d9ef7",d:"23 Apr",           t:"Departed → Sungai Linggi",    x:"127.02 nm · 11.3 kts · Malacca manouvering · RPM 80 · Slip 5.5%"},
                  {c:"#4d9ef7",d:"24 Apr ~09:00 LT", t:"EOSP — Arrived Sungai Linggi",x:"02°15.8N 101°59.9E · ROB 949.29 MT · NOR Tendered"},
                  {c:"#e05a5a",d:"24–30 Apr",        t:"IN PORT — Idle at Anchor",    x:"7 days waiting load instructions · BF 2–3 · FW ~8–10 MT/day"},
                ].map((e,i)=>(
                  <div key={i} style={{position:"relative",marginBottom:14,paddingLeft:4}}>
                    <div style={{position:"absolute",left:-23,top:3,width:10,height:10,borderRadius:"50%",background:e.c,boxShadow:`0 0 6px ${e.c}88`}}/>
                    <p style={{fontSize:8,color:e.c,fontFamily:"monospace",marginBottom:1}}>{e.d}</p>
                    <p style={{fontSize:12,fontWeight:600,color:"#e8f4ff",marginBottom:1}}>{e.t}</p>
                    <p style={{fontSize:10,color:"#5a8aaa"}}>{e.x}</p>
                  </div>
                ))}
              </div>
            </PanelBox>
            {[[cF,"⚓ COSP","#00c9a7","cosp"],[eF,"🏁 EOSP","#4d9ef7","eosp"],[iF,"🏭 In Port Report","#f7c948","ipr"]].map(([form,title,col,m])=>(
              <div key={title} style={{background:"#0a1728",border:`1px solid ${col}33`,borderRadius:12,padding:"14px 18px",marginBottom:12}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                  <h3 style={{fontSize:12,fontWeight:700,color:col}}>{title}</h3>
                  <button onClick={()=>setRmode(m)} style={{padding:"4px 10px",background:col+"22",border:`1px solid ${col}44`,borderRadius:5,color:col,fontSize:10,cursor:"pointer",fontWeight:600}}>Edit →</button>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:7}}>
                  {Object.entries(form).slice(0,9).map(([k,v])=>(
                    <div key={k} style={{background:"#091525",borderRadius:6,padding:"6px 9px"}}>
                      <p style={{fontSize:8,color:"#3a6a8a",textTransform:"uppercase",marginBottom:1}}>{k.replace(/([A-Z])/g," $1").trim()}</p>
                      <p style={{fontSize:10,color:"#cde4f5",wordBreak:"break-word"}}>{v||"—"}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>}

          {rmode==="cosp"&&<>
            {cOk&&<div style={{background:"#00c9a722",border:"1px solid #00c9a744",borderRadius:9,padding:"9px 14px",display:"flex",gap:8,alignItems:"center",marginBottom:12}}><span>✅</span><span style={{color:"#00c9a7",fontSize:11,fontWeight:600}}>COSP submitted · 22 Apr 2026</span></div>}
            <Sec title="1. Vessel Details & Voyage" accent="#00c9a7"><FG>{[["vesselName","Vessel Name"],["imo","IMO Number"],["voyageNo","Voyage Number"],["lastPort","Last Port of Call"],["nextPort","Next Port of Destination"]].map(([k,l])=><FF key={k} label={l} value={cF[k]} onChange={v=>setCF(p=>({...p,[k]:v}))}/>)}</FG></Sec>
            <Sec title="2. COSP Event" accent="#00c9a7"><FG>{[["cospDate","Date (DD/MM/YYYY)"],["cospTime","Time (HH:MM LT/UTC)"],["cospLat","Position Latitude"],["cospLon","Position Longitude"],["delayReason","Reason for Delay (if any)"]].map(([k,l])=><FF key={k} label={l} value={cF[k]} onChange={v=>setCF(p=>({...p,[k]:v}))}/>)}</FG></Sec>
            <Sec title="3. Draft & Displacement" accent="#4d9ef7"><FG>{[["draftFwd","Draft Fwd (m)"],["draftAft","Draft Aft (m)"],["draftMid","Draft Mid (m)"],["displacement","Displacement (MT)"],["constant","Constant (MT)"]].map(([k,l])=><FF key={k} label={l} value={cF[k]} onChange={v=>setCF(p=>({...p,[k]:v}))} ph="0.00"/>)}</FG></Sec>
            <Sec title="4. Cargo Status" accent="#f7c948"><FG>{[["cargoDesc","Cargo Description"],["cargoQty","Qty Loaded (MT)"],["blQty","B/L Qty (MT)"],["cargoRemarks","Remarks"]].map(([k,l])=><FF key={k} label={l} value={cF[k]} onChange={v=>setCF(p=>({...p,[k]:v}))}/>)}</FG></Sec>
            <Sec title="5. ROB on Departure" accent="#f7c948"><FG>{[["robVLSFO","VLSFO (MT)"],["robLSMGO","LSMGO (MT)"],["robLSFO","LSFO (MT)"],["robLubeOil","Lube Oil (MT)"],["robFW","Fresh Water (MT)"]].map(([k,l])=><FF key={k} label={l} value={cF[k]} onChange={v=>setCF(p=>({...p,[k]:v}))} ph="0.000"/>)}</FG></Sec>
            <Sec title="6. Voyage Estimates" accent="#4d9ef7"><FG>{[["distNextPort","Distance to Next Port (nm)"],["avgSeaSpeed","Avg Sea Speed (kts)"],["etaPilot","ETA Pilot Station / Anchor"]].map(([k,l])=><FF key={k} label={l} value={cF[k]} onChange={v=>setCF(p=>({...p,[k]:v}))}/>)}</FG></Sec>
            <Sec title="7. Remarks" accent="#5a8aaa"><textarea rows={3} value={cF.remarks||""} onChange={e=>setCF(p=>({...p,remarks:e.target.value}))} placeholder="Hull condition, heavy weather routing, ballast exchange plans..."/></Sec>
            <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginBottom:4}}>
              <button onClick={()=>setCF({...C0})} style={{padding:"7px 14px",background:"transparent",border:"1px solid #1e3a5a",borderRadius:7,color:"#5a8aaa",cursor:"pointer",fontSize:11}}>Reset</button>
              <button onClick={()=>{setCOk(true);setRmode("summary");}} style={{padding:"7px 18px",background:"linear-gradient(135deg,#00c9a7,#0080ff)",border:"none",borderRadius:7,color:"#fff",cursor:"pointer",fontSize:11,fontWeight:700}}>Submit COSP ⚓</button>
            </div>
          </>}

          {rmode==="eosp"&&<>
            {eOk&&<div style={{background:"#4d9ef722",border:"1px solid #4d9ef744",borderRadius:9,padding:"9px 14px",display:"flex",gap:8,alignItems:"center",marginBottom:12}}><span>✅</span><span style={{color:"#4d9ef7",fontSize:11,fontWeight:600}}>EOSP submitted · 24 Apr 2026</span></div>}
            <Sec title="1. Vessel Details & Voyage" accent="#4d9ef7"><FG>{[["vesselName","Vessel Name"],["imo","IMO Number"],["voyageNo","Voyage Number"],["lastPort","Last Port of Call"],["nextPort","Next Port of Destination"]].map(([k,l])=><FF key={k} label={l} value={eF[k]} onChange={v=>setEF(p=>({...p,[k]:v}))}/>)}</FG></Sec>
            <Sec title="2. EOSP Event" accent="#4d9ef7"><FG>{[["eospDate","Date (DD/MM/YYYY)"],["eospTime","Time (HH:MM LT/UTC)"],["eospLat","Position Latitude"],["eospLon","Position Longitude"],["delayReason","Reason for Delay (if any)"]].map(([k,l])=><FF key={k} label={l} value={eF[k]} onChange={v=>setEF(p=>({...p,[k]:v}))}/>)}</FG></Sec>
            <Sec title="3. Arrival Draft & Displacement" accent="#4d9ef7"><FG>{[["draftFwd","Arrival Draft Fwd (m)"],["draftAft","Arrival Draft Aft (m)"],["draftMid","Arrival Draft Mid (m)"],["displacement","Displacement (MT)"],["constant","Constant (MT)"]].map(([k,l])=><FF key={k} label={l} value={eF[k]} onChange={v=>setEF(p=>({...p,[k]:v}))} ph="0.00"/>)}</FG></Sec>
            <Sec title="4. Cargo Status" accent="#f7c948"><FG>{[["cargoDesc","Cargo Description"],["cargoQty","Qty on Board (MT)"],["blQty","B/L Qty (MT)"],["cargoRemarks","Remarks"]].map(([k,l])=><FF key={k} label={l} value={eF[k]} onChange={v=>setEF(p=>({...p,[k]:v}))}/>)}</FG></Sec>
            <Sec title="5. ROB at EOSP" accent="#f7c948"><FG>{[["robVLSFO","VLSFO (MT)"],["robLSMGO","LSMGO (MT)"],["robLSFO","LSFO (MT)"],["robLubeOil","Lube Oil (MT)"],["robFW","Fresh Water (MT)"]].map(([k,l])=><FF key={k} label={l} value={eF[k]} onChange={v=>setEF(p=>({...p,[k]:v}))} ph="0.000"/>)}</FG></Sec>
            <Sec title="6. Voyage Performance" accent="#00c9a7"><FG>{[["distSailed","Distance Sailed (nm)"],["avgSeaSpeed","Avg Sea Speed (kts)"],["seaPassageTime","Total Sea Passage Time"],["weather","Weather Encountered"]].map(([k,l])=><FF key={k} label={l} value={eF[k]} onChange={v=>setEF(p=>({...p,[k]:v}))}/>)}</FG></Sec>
            <Sec title="7. Arrival Status" accent="#00c9a7"><FG>{[["etaAta","ETA / ATA Pilot Station"],["norTendered","NOR Tendered (Yes/No)"],["pilotOnBoard","Pilot On Board (Date/Time)"],["anchoredAt","Anchored / Berthed At"]].map(([k,l])=><FF key={k} label={l} value={eF[k]} onChange={v=>setEF(p=>({...p,[k]:v}))}/>)}</FG></Sec>
            <Sec title="8. Remarks" accent="#5a8aaa"><textarea rows={3} value={eF.remarks||""} onChange={e=>setEF(p=>({...p,remarks:e.target.value}))} placeholder="Engine performance, weather impact, hull condition, arrival instructions..."/></Sec>
            <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginBottom:4}}>
              <button onClick={()=>setEF({...E0})} style={{padding:"7px 14px",background:"transparent",border:"1px solid #1e3a5a",borderRadius:7,color:"#5a8aaa",cursor:"pointer",fontSize:11}}>Reset</button>
              <button onClick={()=>{setEOk(true);setRmode("summary");}} style={{padding:"7px 18px",background:"linear-gradient(135deg,#4d9ef7,#0040aa)",border:"none",borderRadius:7,color:"#fff",cursor:"pointer",fontSize:11,fontWeight:700}}>Submit EOSP 🏁</button>
            </div>
          </>}

          {rmode==="ipr"&&<>
            {iOk&&<div style={{background:"#f7c94822",border:"1px solid #f7c94844",borderRadius:9,padding:"9px 14px",display:"flex",gap:8,alignItems:"center",marginBottom:12}}><span>✅</span><span style={{color:"#f7c948",fontSize:11,fontWeight:600}}>In Port Report submitted · 24 Apr 2026</span></div>}
            <Sec title="1. Vessel Details & Voyage" accent="#f7c948"><FG>{[["vesselName","Vessel Name"],["imo","IMO Number"],["voyageNo","Voyage Number"],["portName","Port Name"],["terminal","Terminal / Berth"],["agentName","Agent Name"],["charterer","Charterer"]].map(([k,l])=><FF key={k} label={l} value={iF[k]} onChange={v=>setIF(p=>({...p,[k]:v}))}/>)}</FG></Sec>
            <Sec title="2. Port Event Details" accent="#f7c948"><FG>{[["iprDate","Date (DD/MM/YYYY)"],["iprTime","Time (HH:MM LT/UTC)"],["status","Status (Anchored/Berthed/Shifting/Awaiting)"],["anchorage","Position / Anchorage"]].map(([k,l])=><FF key={k} label={l} value={iF[k]} onChange={v=>setIF(p=>({...p,[k]:v}))}/>)}</FG></Sec>
            <Sec title="3. Arrival Information" accent="#4d9ef7"><FG>{[["eospTime","EOSP Time"],["pilotOnBoard","Pilot On Board"],["allFast","All Fast"],["norTendered","NOR Tendered"],["norAccepted","NOR Accepted"]].map(([k,l])=><FF key={k} label={l} value={iF[k]} onChange={v=>setIF(p=>({...p,[k]:v}))}/>)}</FG></Sec>
            <Sec title="4. Draft & Displacement" accent="#4d9ef7"><FG>{[["draftFwd","Arrival Draft Fwd (m)"],["draftAft","Arrival Draft Aft (m)"],["draftMid","Arrival Draft Mid (m)"],["airDraft","Air Draft (m)"],["ukc","UKC (m)"],["displacement","Displacement (MT)"],["constant","Constant (MT)"]].map(([k,l])=><FF key={k} label={l} value={iF[k]} onChange={v=>setIF(p=>({...p,[k]:v}))} ph="0.00"/>)}</FG></Sec>
            <Sec title="5. Cargo Operations" accent="#00c9a7"><FG>{[["cargoDesc","Cargo Description"],["cargoOp","Operation (Loading/Discharging)"],["cargoOnBoard","Cargo on Board (MT)"],["cargoToday","Loaded/Discharged Today (MT)"],["cargoTotal","Total Loaded/Discharged (MT)"],["cargoRate","Cargo Rate (MT/Day)"],["expectedCompletion","Expected Completion"],["cargoRemarks","Cargo Remarks"]].map(([k,l])=><FF key={k} label={l} value={iF[k]} onChange={v=>setIF(p=>({...p,[k]:v}))}/>)}</FG></Sec>
            <Sec title="6. ROB (Remaining on Board)" accent="#f7c948"><FG>{[["robVLSFO","VLSFO (MT)"],["robLSMGO","LSMGO (MT)"],["robLSFO","LSFO (MT)"],["robLubeOil","Lube Oil (MT)"],["robFW","Fresh Water (MT)"],["robBallast","Ballast Water (MT)"]].map(([k,l])=><FF key={k} label={l} value={iF[k]} onChange={v=>setIF(p=>({...p,[k]:v}))} ph="0.000"/>)}</FG></Sec>
            <Sec title="7. Engine & Port Consumption" accent="#e05a5a"><FG>{[["meConsumption","Main Engine (MT)"],["aeConsumption","Auxiliary Engine (MT)"],["boilerConsumption","Boiler (MT)"],["shorePower","Shore Power Connected (Yes/No)"]].map(([k,l])=><FF key={k} label={l} value={iF[k]} onChange={v=>setIF(p=>({...p,[k]:v}))}/>)}</FG></Sec>
            <Sec title="8. Weather & Port Conditions" accent="#4d9ef7"><FG>{[["weather","Weather (Clear/Rainy/Foggy)"],["windForce","Wind Force / Direction"],["seaSwell","Sea / Swell Condition"],["portRestrictions","Port Restrictions / Delays"]].map(([k,l])=><FF key={k} label={l} value={iF[k]} onChange={v=>setIF(p=>({...p,[k]:v}))}/>)}</FG></Sec>
            <Sec title="9. Remarks" accent="#5a8aaa"><textarea rows={4} value={iF.remarks||""} onChange={e=>setIF(p=>({...p,remarks:e.target.value}))} placeholder="Notable observations, delays, equipment issues, cargo stoppages, PSC inspection, ballast exchange, safety concerns..."/></Sec>
            <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginBottom:4}}>
              <button onClick={()=>setIF({...I0})} style={{padding:"7px 14px",background:"transparent",border:"1px solid #1e3a5a",borderRadius:7,color:"#5a8aaa",cursor:"pointer",fontSize:11}}>Reset</button>
              <button onClick={()=>{setIOk(true);setRmode("summary");}} style={{padding:"7px 18px",background:"linear-gradient(135deg,#f7c948,#e08000)",border:"none",borderRadius:7,color:"#000",cursor:"pointer",fontSize:11,fontWeight:700}}>Submit In Port Report 🏭</button>
            </div>
          </>}
        </>}

        {/* ===== WARRANTY TABLE ===== */}
        {tab==="Warranty Table"&&<>
          <h2 style={{fontSize:13,fontWeight:700,color:"#e8f4ff",marginBottom:16}}>Warranted Speed & Consumption — Charter Party</h2>
          <PanelBox><PLabel>Speed Performance Matrix — Laden & Ballast</PLabel>
            <div style={{overflowX:"auto"}}>
              <table><thead>
                <tr style={{background:"#0d1f35"}}>
                  <TH2 s={{}} rowSpan={2}>Speed</TH2>
                  <TH2 s={{color:"#4d9ef7",textAlign:"center",borderBottom:"1px solid #1e3a5a"}} colSpan={4}>LADEN</TH2>
                  <TH2 s={{color:"#00c9a7",textAlign:"center",borderBottom:"1px solid #1e3a5a"}} colSpan={4}>BALLAST ← This Voyage</TH2>
                </tr>
                <tr style={{background:"#0d1f35"}}>{["RPM","ME MT/D","AE MT/D","Boiler","RPM","ME MT/D","AE MT/D","Boiler"].map((h,i)=><TH2 key={h+i}>{h}</TH2>)}</tr>
              </thead><tbody>
                {WARRANTY.map((r,i)=>(
                  <tr key={i} style={{background:r.speed===12.5?"#0d2035":"transparent",borderBottom:"1px solid #0d1f35"}}>
                    <TD2 s={{fontWeight:r.speed===12.5?800:500,color:r.speed===12.5?"#f7c948":"#cde4f5",fontFamily:"monospace"}}>
                      {r.label}{r.speed===12.5&&<Chip label="CP" color="#f7c948"/>}
                    </TD2>
                    <TD2 s={{fontFamily:"monospace",color:"#4d9ef7"}}>{r.lRPM}</TD2>
                    <TD2 s={{fontFamily:"monospace"}}>{r.lME}</TD2>
                    <TD2 s={{fontFamily:"monospace"}}>{r.lAE}</TD2>
                    <TD2 s={{fontFamily:"monospace"}}>{r.lB}</TD2>
                    <TD2 s={{fontFamily:"monospace",color:"#00c9a7"}}>{r.bRPM}</TD2>
                    <TD2 s={{fontFamily:"monospace"}}>{r.bME}</TD2>
                    <TD2 s={{fontFamily:"monospace"}}>{r.bAE}</TD2>
                    <TD2 s={{fontFamily:"monospace"}}>{r.bB}</TD2>
                  </tr>
                ))}
              </tbody></table>
            </div>
            <p style={{fontSize:9,color:"#3a6a8a",marginTop:8}}>★ ECO speed 12.5 knots is the GUARANTEED figure per Charter Party · Boiler = 0 for all sea passage speeds</p>
          </PanelBox>
          <PanelBox><PLabel>Speed vs ME Consumption — Ballast & Laden Curves</PLabel>
            <ResponsiveContainer width="100%" height={200}><LineChart data={WARRANTY.slice().reverse().map(r=>({speed:r.speed,meBallast:r.bME,meLaden:r.lME}))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5a"/><XAxis dataKey="speed" tick={{fill:"#5a8aaa",fontSize:9}}/><YAxis tick={{fill:"#5a8aaa",fontSize:9}}/><Tooltip content={<Tip/>}/><Legend wrapperStyle={{fontSize:10}}/>
              <Line type="monotone" dataKey="meBallast" name="ME Ballast" stroke="#00c9a7" strokeWidth={2.5} dot={{fill:"#00c9a7",r:4}}/>
              <Line type="monotone" dataKey="meLaden"   name="ME Laden"   stroke="#4d9ef7" strokeWidth={2} strokeDasharray="5 5" dot={{fill:"#4d9ef7",r:3}}/>
            </LineChart></ResponsiveContainer>
          </PanelBox>
          <PanelBox><PLabel>Port & Special Operation Consumption — CP Warranted</PLabel>
            <div style={{overflowX:"auto"}}>
              <table><thead><tr style={{background:"#0d1f35"}}>{["Operation","VLSFO Total MT/D","A/E MT/D","Boiler MT/D","Note"].map(h=><TH2 key={h}>{h}</TH2>)}</tr></thead>
              <tbody>{PORT_OPS.map((r,i)=>(
                <tr key={i} style={{background:r.note?"#0d1f35":"transparent",borderBottom:"1px solid #0d1f35"}}>
                  <TD2 s={{color:r.note?"#00c9a7":"#cde4f5",fontWeight:r.note?700:400}}>{r.op}</TD2>
                  <TD2 s={{fontFamily:"monospace",color:"#f7c948"}}>{r.t}</TD2>
                  <TD2 s={{fontFamily:"monospace"}}>{r.ae}</TD2>
                  <TD2 s={{fontFamily:"monospace"}}>{r.b}</TD2>
                  <TD2>{r.note?<Chip label={r.note} color="#00c9a7"/>:"—"}</TD2>
                </tr>
              ))}</tbody></table>
            </div>
          </PanelBox>
        </>}

        {/* ===== VOYAGE MAP ===== */}
        {tab==="Voyage Map"&&<>
          <div style={{marginBottom:14}}>
            <h2 style={{fontSize:13,fontWeight:700,color:"#e8f4ff"}}>Voyage Detail Map</h2>
            <p style={{fontSize:9,color:"#3a6a8a",marginTop:2}}>SGP EOPL → Phillip Channel → Sungai Linggi · 22–30 Apr 2026</p>
          </div>

          {/* SVG route map */}
          <PanelBox>
            <PLabel>Route: Singapore EOPL → Malacca Strait → Sungai Linggi Anchorage</PLabel>
            <div style={{overflowX:"auto"}}>
              <svg viewBox="0 0 820 420" style={{width:"100%",minWidth:600,background:"#060e1a",borderRadius:10,fontFamily:"monospace"}}>
                {/* Ocean background */}
                <rect width="820" height="420" fill="#060e1a" rx="10"/>
                {/* Grid lines */}
                {[0,1,2,3,4].map(i=><line key={i} x1={0} y1={i*100+10} x2={820} y2={i*100+10} stroke="#0d1f35" strokeWidth="0.5"/>)}
                {[0,1,2,3,4,5,6,7].map(i=><line key={i} x1={i*120+10} y1={0} x2={i*120+10} y2={420} stroke="#0d1f35" strokeWidth="0.5"/>)}

                {/* Land masses (simplified outlines) */}
                {/* Singapore / Johor */}
                <ellipse cx="620" cy="250" rx="30" ry="18" fill="#1a2a1a" stroke="#2a4a2a" strokeWidth="1"/>
                <text x="622" y="254" fill="#3a6a3a" fontSize="8" textAnchor="middle">SINGAPORE</text>
                {/* Batam */}
                <ellipse cx="650" cy="290" rx="22" ry="10" fill="#1a2a1a" stroke="#2a4a2a" strokeWidth="1"/>
                <text x="650" y="294" fill="#3a6a3a" fontSize="7" textAnchor="middle">BATAM</text>
                {/* Johor / Malaysia coast */}
                <path d="M 540,190 Q 600,180 650,200 Q 700,215 720,240" stroke="#2a4a2a" strokeWidth="2" fill="none"/>
                {/* Sumatra outline */}
                <path d="M 80,320 Q 200,280 350,260 Q 480,250 560,280 Q 600,300 620,320" stroke="#2a4a2a" strokeWidth="1.5" fill="#1a2a1a" fillOpacity="0.4"/>
                {/* Malaysia coast west */}
                <path d="M 100,120 Q 200,130 300,160 Q 380,185 440,210 Q 500,230 540,240" stroke="#2a4a2a" strokeWidth="1.5" fill="none"/>
                {/* Linggi area */}
                <ellipse cx="185" cy="220" rx="14" ry="8" fill="#1a4a2a" stroke="#00c9a744" strokeWidth="1.5"/>
                <text x="185" y="209" fill="#00c9a7" fontSize="8" textAnchor="middle">SUNGAI</text>
                <text x="185" y="218" fill="#00c9a7" fontSize="8" textAnchor="middle">LINGGI</text>

                {/* Route path: SGP EOPL → Phillip Channel → Sungai Linggi */}
                {/* Dashed = idle/anchor, solid teal = transit */}
                <polyline
                  points="610,240 580,248 540,258 480,262 420,255 360,245 290,235 230,228 185,222"
                  fill="none" stroke="#00c9a7" strokeWidth="2.5" strokeDasharray="8,4"
                />
                {/* Highlight the transit leg (23-24 Apr) */}
                <polyline
                  points="610,240 560,252 500,258 430,254 360,245 295,237 240,229 190,222"
                  fill="none" stroke="#00c9a7" strokeWidth="2" opacity="0.4"
                />

                {/* Position dots */}
                {/* 22-Apr SGP EOPL */}
                <circle cx="610" cy="240" r="7" fill="#f7c948" stroke="#f7c94866" strokeWidth="3"/>
                <text x="618" y="234" fill="#f7c948" fontSize="8">22-Apr</text>
                <text x="618" y="244" fill="#f7c94899" fontSize="7">SGP EOPL</text>
                <text x="618" y="253" fill="#5a8aaa" fontSize="7">2.032N 104.828E</text>

                {/* 23-Apr Phillip Channel */}
                <circle cx="500" cy="258" r="5" fill="#4d9ef7" stroke="#4d9ef766" strokeWidth="2"/>
                <text x="508" y="252" fill="#4d9ef7" fontSize="8">23-Apr</text>
                <text x="508" y="261" fill="#5a8aaa" fontSize="7">Phillip Channel</text>
                <text x="508" y="270" fill="#5a8aaa" fontSize="7">1.298N 103.332E</text>

                {/* 24-30 Apr Sungai Linggi */}
                <circle cx="185" cy="222" r="8" fill="#00c9a7" stroke="#00c9a766" strokeWidth="3"/>
                <text x="120" y="205" fill="#00c9a7" fontSize="8">24–30 Apr</text>
                <text x="120" y="215" fill="#00c9a7" fontSize="8">EOSP / Anchor</text>
                <text x="120" y="225" fill="#5a8aaa" fontSize="7">2.263N 101.998E</text>

                {/* Legend */}
                <rect x="20" y="20" width="160" height="70" fill="#0d1f35" rx="6" stroke="#1e3a5a" strokeWidth="1"/>
                <text x="30" y="36" fill="#5a8aaa" fontSize="8" fontWeight="bold">LEGEND</text>
                <line x1="30" y1="48" x2="60" y2="48" stroke="#00c9a7" strokeWidth="2" strokeDasharray="6,3"/>
                <text x="66" y="52" fill="#94b8d4" fontSize="8">Manouvering / Transit</text>
                <circle cx="44" cy="63" r="4" fill="#f7c948"/>
                <text x="54" y="67" fill="#94b8d4" fontSize="8">Idle / Anchor</text>
                <circle cx="44" cy="78" r="4" fill="#00c9a7"/>
                <text x="54" y="82" fill="#94b8d4" fontSize="8">EOSP Anchorage</text>

                {/* Distance label */}
                <text x="390" y="245" fill="#00c9a766" fontSize="8" textAnchor="middle">234.03 nm</text>

                {/* Compass */}
                <text x="770" y="50" fill="#3a6a8a" fontSize="14" textAnchor="middle">N</text>
                <line x1="770" y1="55" x2="770" y2="75" stroke="#3a6a8a" strokeWidth="1.5"/>
                <polygon points="770,55 766,70 770,67 774,70" fill="#3a6a8a"/>

                {/* Scale */}
                <line x1="680" y1="390" x2="780" y2="390" stroke="#3a6a8a" strokeWidth="1.5"/>
                <line x1="680" y1="385" x2="680" y2="395" stroke="#3a6a8a" strokeWidth="1.5"/>
                <line x1="780" y1="385" x2="780" y2="395" stroke="#3a6a8a" strokeWidth="1.5"/>
                <text x="730" y="408" fill="#3a6a8a" fontSize="8" textAnchor="middle">~100 nm</text>
              </svg>
            </div>
          </PanelBox>

          {/* Position table from PDF page 10 */}
          <PanelBox><PLabel>Daily Position Log — Lat / Lon (from PDF Voyage Detail Map)</PLabel>
            <div style={{overflowX:"auto"}}>
              <table><thead><tr style={{background:"#0d1f35"}}>
                {["Date","Latitude","Longitude","Status","Operation","Remarks"].map(h=><TH2 key={h}>{h}</TH2>)}
              </tr></thead><tbody>
                {[
                  {d:"22-Apr",lat:"2.032",lon:"104.828",st:"Idle/Anchor",op:"Anchored SGP EOPL",rem:"Delivery point · Bunker surveyor",c:"#f7c948"},
                  {d:"23-Apr",lat:"1.298",lon:"103.332",st:"Transit",    op:"Manouvering",      rem:"Phillip Channel — proceeding Sungai Linggi",c:"#4d9ef7"},
                  {d:"24-Apr",lat:"2.263",lon:"101.998",st:"Idle/Anchor",op:"EOSP · Anchored",  rem:"Arrived Sungai Linggi · NOR Tendered",c:"#00c9a7"},
                  {d:"25-Apr",lat:"2.263",lon:"101.998",st:"Idle/Anchor",op:"At Anchor",        rem:"Waiting load instructions",c:"#00c9a7"},
                  {d:"26-Apr",lat:"2.263",lon:"101.998",st:"Idle/Anchor",op:"At Anchor",        rem:"Waiting load instructions",c:"#00c9a7"},
                  {d:"27-Apr",lat:"2.263",lon:"101.998",st:"Idle/Anchor",op:"At Anchor",        rem:"Waiting load instructions",c:"#00c9a7"},
                  {d:"28-Apr",lat:"2.263",lon:"101.998",st:"Idle/Anchor",op:"At Anchor",        rem:"Waiting load instructions",c:"#00c9a7"},
                  {d:"29-Apr",lat:"2.265",lon:"101.998",st:"Idle/Anchor",op:"At Anchor",        rem:"Waiting load instructions",c:"#00c9a7"},
                  {d:"30-Apr",lat:"2.265",lon:"101.998",st:"Idle/Anchor",op:"At Anchor",        rem:"Waiting load instructions",c:"#00c9a7"},
                ].map((r,i)=>(
                  <tr key={i} style={{borderBottom:"1px solid #0d1f35"}}>
                    <TD2 s={{fontWeight:700,color:r.c}}>{r.d}</TD2>
                    <TD2 s={{fontFamily:"monospace",color:"#cde4f5"}}>{r.lat}</TD2>
                    <TD2 s={{fontFamily:"monospace",color:"#cde4f5"}}>{r.lon}</TD2>
                    <TD2><Chip label={r.st} color={r.c}/></TD2>
                    <TD2 s={{color:"#94b8d4"}}>{r.op}</TD2>
                    <TD2 s={{color:"#5a8aaa",fontSize:10}}>{r.rem}</TD2>
                  </tr>
                ))}
              </tbody></table>
            </div>
          </PanelBox>
        </>}

        {/* ===== PERFORMANCE CLAIMS ===== */}
        {tab==="Performance Claims"&&<>
          <div style={{marginBottom:14}}>
            <h2 style={{fontSize:13,fontWeight:700,color:"#e8f4ff"}}>Performance Claims Analysis</h2>
            <p style={{fontSize:9,color:"#3a6a8a",marginTop:2}}>Speed & consumption variance vs Charter Party warranted · Basis: Vessel_Performance.docx project spec</p>
          </div>

          {/* Claim status banner */}
          <div style={{background:"#e05a5a18",border:"1px solid #e05a5a55",borderRadius:10,padding:"12px 18px",marginBottom:14,display:"flex",gap:14,flexWrap:"wrap",alignItems:"center"}}>
            <span style={{fontSize:11,color:"#e05a5a",fontWeight:700}}>⚠ Speed Underperformance Detected</span>
            <span style={{fontSize:10,color:"#94b8d4"}}>Actual avg 10.35 kts vs CP warranted 12.5 kts on steaming legs</span>
            <span style={{fontSize:10,color:"#f7c948",marginLeft:"auto",fontWeight:600}}>Note: Vessel was manouvering only — not on full sea passage. Claim basis is disputed.</span>
          </div>

          {/* KPI claim cards */}
          <div className="g4" style={{marginBottom:14}}>
            <Kard label="CP Warranted Speed" value="12.5 Kts" sub="ECO — guaranteed per CP" blue/>
            <Kard label="Actual Avg Speed" value="10.35 Kts" sub="Steaming legs only" warn/>
            <Kard label="Speed Deficit" value="−2.15 Kts" sub="17.2% below warranted" warn/>
            <Kard label="Claim Status" value="Disputed" sub="Manouvering — not full passage" />
          </div>
          <div className="g4" style={{marginBottom:18}}>
            <Kard label="CP Warranted LSFO" value="49.5 MT" sub="Idle warranted 5.5 MT/Day" blue/>
            <Kard label="Actual LSFO" value="46.987 MT" sub="Total consumed" accent/>
            <Kard label="LSFO Under-consumed" value="2.513 MT" sub="Favourable — under CP" accent/>
            <Kard label="Idle Days Excess" value="7 Days" sub="vs N/A in CP — charterer issue" warn/>
          </div>

          {/* Speed performance claim table */}
          <PanelBox><PLabel>Speed Performance — Leg-by-Leg Analysis</PLabel>
            <div style={{overflowX:"auto"}}>
              <table><thead><tr style={{background:"#0d1f35"}}>
                {["Leg","Distance","Duration","Actual Speed","CP Speed","Deficit","Status","Claim Basis"].map(h=><TH2 key={h}>{h}</TH2>)}
              </tr></thead><tbody>
                {[
                  {leg:"22-Apr",dist:"0 nm",dur:"—",act:"0.0 kts",cp:"12.5 kts",def:"—",st:"Idle – At Anchor",basis:"No claim — idle at delivery",c:"#4d9ef7",sc:"#3a6a8a"},
                  {leg:"23-Apr",dist:"127.02 nm",dur:"11.2 hrs",act:"11.3 kts",cp:"12.5 kts",def:"−1.2 kts",st:"Manouvering",basis:"Manouvering only — no CP speed applicable",c:"#f7c948",sc:"#f7c948"},
                  {leg:"24-Apr",dist:"107.01 nm",dur:"9.1 hrs",act:"11.7 kts",cp:"12.5 kts",def:"−0.8 kts",st:"Manouvering / Anchor",basis:"Manouvering only — no CP speed applicable",c:"#f7c948",sc:"#f7c948"},
                  {leg:"25-30 Apr",dist:"0 nm",dur:"6 Days",act:"—",cp:"12.5 kts",def:"—",st:"Idle – Sungai Linggi",basis:"Waiting load instructions — charterer's account",c:"#e05a5a",sc:"#e05a5a"},
                ].map((r,i)=>(
                  <tr key={i} style={{borderBottom:"1px solid #0d1f35"}}>
                    <TD2 s={{fontWeight:700,color:"#e8f4ff"}}>{r.leg}</TD2>
                    <TD2 s={{fontFamily:"monospace"}}>{r.dist}</TD2>
                    <TD2 s={{fontFamily:"monospace"}}>{r.dur}</TD2>
                    <TD2 s={{fontFamily:"monospace",color:r.c}}>{r.act}</TD2>
                    <TD2 s={{fontFamily:"monospace",color:"#3a6a8a"}}>12.5 kts</TD2>
                    <TD2 s={{fontFamily:"monospace",color:r.sc,fontWeight:600}}>{r.def}</TD2>
                    <TD2><Chip label={r.st} color={r.c}/></TD2>
                    <TD2 s={{color:"#5a8aaa",fontSize:10}}>{r.basis}</TD2>
                  </tr>
                ))}
              </tbody></table>
            </div>
          </PanelBox>

          {/* Fuel consumption variance */}
          <PanelBox><PLabel>Fuel Consumption Variance — Actual vs CP Warranted</PLabel>
            <div style={{overflowX:"auto"}}>
              <table><thead><tr style={{background:"#0d1f35"}}>
                {["Item","CP Warranted","Actual","Variance","Status"].map(h=><TH2 key={h}>{h}</TH2>)}
              </tr></thead><tbody>
                {[
                  {item:"Total LSFO (Idle 9 days @ 5.5 MT/Day)",cp:"49.5 MT",act:"46.987 MT",var:"−2.513 MT",st:"Under — Favourable",c:"#00c9a7"},
                  {item:"Daily Idle LSFO (avg)",cp:"5.5 MT/Day",act:"5.21 MT/Day",var:"−0.29 MT/Day",st:"Under — Favourable",c:"#00c9a7"},
                  {item:"ME LSFO (manouvering)",cp:"23.5 MT/Day @ 12.5 kts",act:"12.477 MT total",var:"N/A — manouvering",st:"Manouvering only",c:"#f7c948"},
                  {item:"AE LSFO (largest consumer)",cp:"3.0 MT/Day",act:"2.78 MT/Day avg",var:"−0.22 MT/Day",st:"Under — Favourable",c:"#00c9a7"},
                  {item:"Boiler LSFO",cp:"2.5 MT/Day (idle)",act:"1.05 MT/Day avg",var:"−1.45 MT/Day",st:"Under — Favourable",c:"#00c9a7"},
                  {item:"MGO Total",cp:"—",act:"4.274 MT",var:"N/A",st:"Not warranted",c:"#5a8aaa"},
                  {item:"Idle Days at Anchor",cp:"N/A",act:"7 Days",var:"+7 Days",st:"Charterer's Account",c:"#e05a5a"},
                ].map((r,i)=>(
                  <tr key={i} style={{borderBottom:"1px solid #0d1f35"}}>
                    <TD2 s={{color:"#94b8d4"}}>{r.item}</TD2>
                    <TD2 s={{fontFamily:"monospace",color:"#3a6a8a"}}>{r.cp}</TD2>
                    <TD2 s={{fontFamily:"monospace",color:"#cde4f5"}}>{r.act}</TD2>
                    <TD2 s={{fontFamily:"monospace",color:r.c,fontWeight:600}}>{r.var}</TD2>
                    <TD2><Chip label={r.st} color={r.c}/></TD2>
                  </tr>
                ))}
              </tbody></table>
            </div>
          </PanelBox>

          {/* Off-hire analysis */}
          <PanelBox><PLabel>Off-Hire / Idle Time Analysis</PLabel>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:10,marginBottom:14}}>
              {[
                {k:"Idle Days at SGP EOPL",v:"1 Day",c:"#4d9ef7",note:"Delivery / Bunker surveyor"},
                {k:"Transit Days (Manouvering)",v:"~1 Day",c:"#f7c948",note:"23–24 Apr — 20.3 hrs"},
                {k:"Idle Days at Sungai Linggi",v:"7 Days",c:"#e05a5a",note:"24–30 Apr waiting load"},
                {k:"Total Reporting Period",v:"9 Days",c:"#cde4f5",note:"22 Apr – 30 Apr 2026"},
                {k:"Sea Passage Time",v:"~11.2 hrs",c:"#00c9a7",note:"Actual steaming — manouvering only"},
                {k:"Idle % of Voyage",v:"78%",c:"#e05a5a",note:"7 of 9 days idle at anchor"},
              ].map(({k,v,c,note})=>(
                <div key={k} style={{background:"#091525",borderRadius:8,padding:"10px 12px"}}>
                  <p style={{fontSize:9,color:"#3a6a8a",textTransform:"uppercase",marginBottom:3}}>{k}</p>
                  <p style={{fontSize:16,fontWeight:700,color:c,fontFamily:"monospace"}}>{v}</p>
                  <p style={{fontSize:9,color:"#5a8aaa",marginTop:2}}>{note}</p>
                </div>
              ))}
            </div>
            <div style={{background:"#0d1f35",borderRadius:8,padding:"12px 14px",borderLeft:"3px solid #f7c948"}}>
              <p style={{fontSize:10,color:"#f7c948",fontWeight:700,marginBottom:6}}>⚖ Claim Assessment</p>
              <p style={{fontSize:11,color:"#94b8d4",lineHeight:1.7}}>
                Speed was below CP warranted (10.35 kts vs 12.5 kts) but vessel was <strong style={{color:"#f7c948"}}>manouvering only</strong> — CP speed clause typically does not apply during port approaches and manouvering. The 7-day idle at Sungai Linggi awaiting load instructions is on <strong style={{color:"#e05a5a"}}>charterer's account</strong> and does not constitute an owner off-hire. No heavy weather was recorded, ruling out a weather claim. LSFO consumption was <strong style={{color:"#00c9a7"}}>2.513 MT under warranted</strong>, indicating vessel performed efficiently during idle. <strong style={{color:"#f7c948"}}>No valid performance claim exists for this voyage period.</strong>
              </p>
            </div>
          </PanelBox>
        </>}

      </main>

      <footer style={{borderTop:"1px solid #1e3a5a",padding:"10px 22px",display:"flex",justifyContent:"space-between",alignItems:"center",background:"#060e1a",flexWrap:"wrap",gap:8}}>
        <p style={{fontSize:9,color:"#3a6a8a"}}>Vessel Performance Report · M/V XYZ · Apr 2026 · <span style={{color:"#e05a5a"}}>CONFIDENTIAL</span></p>
        <p style={{fontSize:9,color:"#3a6a8a"}}>Prepared: 02 May 2026 · All 4 source documents fully integrated</p>
      </footer>
    </div>
  );
}
