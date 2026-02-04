import { useState } from 'react';
import { 
  Shield, Activity, X, User, LogOut, KeyRound, Trash2, Send, 
  MessageCircle, MapPin, Building2, School, Search, Plus, ArrowRight, Heart, Bell, Lock 
} from 'lucide-react';

// --- TYPES ---
type UserRole = 'student' | 'admin' | null;
type ViewState = 'search' | 'create' | 'join-auth' | 'role-auth' | 'dashboard';

interface SchoolData {
  id: string;
  name: string;
  district: string;
  buildings: string[];
  joinCode: string; // The "Special Password" to enter the school
}

interface Message { sender: 'student' | 'admin'; text: string; time: string; }
interface HistoryItem { time: string; type: 'Emergency' | 'Wellness'; building: string; room: string; }

// --- MOCK DATABASE ---
const INITIAL_DB: SchoolData[] = [
  { 
    id: '1', 
    name: 'Cesar Chavez Middle School', 
    district: 'Unified School District', 
    buildings: ['Main Bldg', 'Gymnasium', 'Library Wing'],
    joinCode: 'CHAVEZ2026' // Example password
  }
];

function App() {
  const [view, setView] = useState<ViewState>('search');
  const [db, setDb] = useState<SchoolData[]>(INITIAL_DB);
  const [selectedSchool, setSelectedSchool] = useState<SchoolData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Creation State
  const [newSchoolName, setNewSchoolName] = useState('');
  const [newDistrict, setNewDistrict] = useState('');
  const [newJoinCode, setNewJoinCode] = useState('');
  const [newBuildings, setNewBuildings] = useState<string[]>(['Main Hall']);
  const [tempBuilding, setTempBuilding] = useState('');

  // Authentication States
  const [inputJoinCode, setInputJoinCode] = useState('');
  const [adminPinInput, setAdminPinInput] = useState('');
  
  // App Logic States
  const [role, setRole] = useState<UserRole>(null);
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentBuilding, setCurrentBuilding] = useState('');
  const [roomNumber, setRoomNumber] = useState('');

  const ADMIN_MASTER_PIN = "1234";

  // --- LOGIC ---
  const handleSelectSchool = (school: SchoolData) => {
    setSelectedSchool(school);
    setView('join-auth');
  };

  const verifyJoinCode = () => {
    if (inputJoinCode === selectedSchool?.joinCode) {
      setView('role-auth');
      setInputJoinCode('');
    } else {
      alert("Invalid School Join Password");
    }
  };

  const handleCreate = () => {
    if(!newJoinCode) return alert("You must set a Join Password!");
    const freshSchool: SchoolData = {
      id: Date.now().toString(),
      name: newSchoolName,
      district: newDistrict,
      buildings: newBuildings,
      joinCode: newJoinCode
    };
    setDb([...db, freshSchool]);
    setSelectedSchool(freshSchool);
    setView('role-auth');
  };

  const triggerAlert = () => {
    const newStatus = !isAlertActive;
    setIsAlertActive(newStatus);
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (newStatus) {
      setHistory(prev => [{ time, type: 'Emergency', building: currentBuilding, room: roomNumber || 'N/A' }, ...prev]);
      setMessages(prev => [...prev, { sender: 'student', text: `🚨 EMERGENCY: ${currentBuilding}, Room ${roomNumber}`, time }]);
      setIsSidebarOpen(true);
    }
  };

  // --- VIEWS ---

  // 1. SEARCH VIEW
  if (view === 'search') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 p-4 text-white">
        <div className="glass-panel p-8 max-w-md w-full border border-white/10 rounded-[2rem] bg-white/5 backdrop-blur-2xl">
          <School className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
          <h1 className="text-2xl font-black text-center mb-6">Safe Space Registry</h1>
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input type="text" placeholder="Search school name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-black/40 border border-white/10 py-4 pl-12 pr-4 rounded-2xl text-sm" />
          </div>
          <div className="space-y-2 mb-6">
            {db.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())).map(s => (
              <button key={s.id} onClick={() => handleSelectSchool(s)} className="w-full p-4 bg-white/5 rounded-2xl flex justify-between items-center hover:bg-white/10 border border-white/5">
                <div className="text-left">
                  <div className="font-bold text-sm">{s.name}</div>
                  <div className="text-[10px] text-indigo-400 font-bold uppercase">{s.district}</div>
                </div>
                <Lock size={14} className="text-slate-500" />
              </button>
            ))}
          </div>
          <button onClick={() => setView('create')} className="w-full py-4 border border-dashed border-white/20 rounded-2xl text-[10px] font-black uppercase text-slate-400 hover:text-white transition-all">+ Register New School</button>
        </div>
      </div>
    );
  }

  // 2. JOIN PASSWORD VIEW (The Special Password Screen)
  if (view === 'join-auth') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 p-4 text-white">
        <div className="glass-panel p-8 max-w-sm w-full text-center border border-white/10 rounded-3xl bg-white/5">
          <KeyRound className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Join {selectedSchool?.name}</h2>
          <p className="text-xs text-slate-400 mb-6">Enter the special Join Password provided by your school administration.</p>
          <input 
            type="password" 
            placeholder="School Join Password" 
            value={inputJoinCode} 
            onChange={(e) => setInputJoinCode(e.target.value)} 
            className="w-full bg-black/40 border border-white/10 py-4 px-4 rounded-2xl text-center mb-4 focus:border-yellow-500 outline-none transition-all"
          />
          <button onClick={verifyJoinCode} className="w-full py-4 bg-indigo-600 rounded-2xl font-black mb-2">VERIFY & ENTER</button>
          <button onClick={() => setView('search')} className="text-xs text-slate-500">Go Back</button>
        </div>
      </div>
    );
  }

  // 3. CREATE SCHOOL VIEW
  if (view === 'create') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 p-4 text-white">
        <div className="glass-panel p-8 max-w-md w-full border border-white/10 rounded-[2rem] bg-white/5">
          <h1 className="text-xl font-black mb-6">New School Setup</h1>
          <div className="space-y-4">
            <input type="text" placeholder="School Name" value={newSchoolName} onChange={e => setNewSchoolName(e.target.value)} className="w-full bg-black/40 border border-white/10 py-3 px-4 rounded-xl text-sm" />
            <input type="text" placeholder="District Name" value={newDistrict} onChange={e => setNewDistrict(e.target.value)} className="w-full bg-black/40 border border-white/10 py-3 px-4 rounded-xl text-sm" />
            
            <div className="p-4 bg-indigo-600/10 rounded-xl border border-indigo-500/20">
              <label className="text-[10px] font-black text-indigo-400 uppercase">Set Join Password (Required)</label>
              <input type="text" placeholder="e.g. BRAVES2026" value={newJoinCode} onChange={e => setNewJoinCode(e.target.value)} className="w-full bg-black/40 border border-white/10 py-2 px-3 rounded-lg text-xs mt-2" />
              <p className="text-[8px] text-slate-500 mt-2">Students will need this exact password to join this school on the app.</p>
            </div>

            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <p className="text-[10px] font-black uppercase text-slate-500 mb-3">Campus Buildings</p>
              <div className="flex gap-2 mb-2">
                <input type="text" value={tempBuilding} onChange={e => setTempBuilding(e.target.value)} className="flex-1 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-xs" placeholder="Building Name" />
                <button onClick={() => {if(tempBuilding){setNewBuildings([...newBuildings, tempBuilding]); setTempBuilding('');}}} className="bg-white/10 px-3 rounded-lg"><Plus size={16}/></button>
              </div>
              <div className="flex flex-wrap gap-2">{newBuildings.map((b, i) => <span key={i} className="px-2 py-1 bg-white/10 rounded text-[9px] font-bold">{b}</span>)}</div>
            </div>

            <button onClick={handleCreate} className="w-full py-4 bg-indigo-600 rounded-2xl font-black">REGISTER SCHOOL</button>
            <button onClick={() => setView('search')} className="w-full text-[10px] text-slate-500 font-bold uppercase">Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  // 4. ROLE AUTH VIEW
  if (view === 'role-auth') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 p-4 text-white">
        <div className="glass-panel p-8 max-w-sm w-full text-center border border-white/10 rounded-3xl bg-white/5">
          <h1 className="text-2xl font-bold mb-8">{selectedSchool?.name}</h1>
          <div className="space-y-3">
            <button onClick={() => {setRole('student'); setView('dashboard');}} className="w-full py-5 bg-indigo-600 rounded-2xl font-bold flex items-center justify-center gap-3"><User size={20} /> Student Access</button>
            <button onClick={() => {setRole('admin'); setView('dashboard');}} className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl font-bold flex items-center justify-center gap-3"><Shield size={20} /> Admin Access</button>
          </div>
        </div>
      </div>
    );
  }

  // 5. DASHBOARD VIEW 
  return (
    <div className={`flex min-h-screen text-white transition-colors duration-1000 ${isAlertActive ? 'bg-red-950' : 'bg-slate-950'}`}>
      <div className={`flex-1 flex flex-col items-center justify-center p-4 transition-all ${isSidebarOpen ? 'mr-80' : 'mr-0'}`}>
        {/* Nav Bar */}
        <div className="absolute top-8 flex justify-between w-full max-w-md px-6">
          <div className="glass-panel px-4 py-2 rounded-2xl border border-white/10 bg-slate-900/50">
            <p className="text-[8px] font-black text-indigo-400 uppercase">{selectedSchool?.name}</p>
            <p className="text-[10px] font-bold opacity-60 uppercase">{currentBuilding || 'Select Zone'}</p>
          </div>
          <button onClick={logout} className="p-3 rounded-full bg-slate-900/50 border border-white/10"><LogOut size={20}/></button>
        </div>

        {role === 'student' ? (
          <div className="glass-panel p-10 max-w-sm w-full text-center rounded-[2.5rem] border border-white/10 bg-white/5">
            <Shield className={`w-16 h-16 mx-auto mb-6 ${isAlertActive ? 'text-red-500 animate-pulse' : 'text-indigo-500'}`} />
            {!isAlertActive && (
              <div className="space-y-4 mb-8">
                <div className="flex flex-wrap gap-2 justify-center p-2 bg-black/40 rounded-xl">
                  {selectedSchool?.buildings.map(b => (
                    <button key={b} onClick={() => setCurrentBuilding(b)} className={`px-2 py-1 text-[9px] font-bold rounded ${currentBuilding === b ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}>{b}</button>
                  ))}
                </div>
                <input type="text" value={roomNumber} onChange={e => setRoomNumber(e.target.value)} className="w-full bg-white/5 border border-white/10 py-3 rounded-xl text-center text-sm" placeholder="Room #" />
              </div>
            )}
            <button onClick={triggerAlert} className={`w-full py-5 rounded-2xl font-black text-lg ${isAlertActive ? 'bg-red-600' : 'bg-indigo-600'}`}>
              {isAlertActive ? 'CANCEL ALERT' : 'SEND ALERT'}
            </button>
          </div>
        ) : (
          <div className="glass-panel p-8 max-w-sm w-full rounded-[2.5rem] border border-white/10 bg-white/5">
            <h1 className="text-2xl font-black mb-6">Security Monitor</h1>
            <div className="space-y-2">
              {history.map((h, i) => (
                <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5 flex justify-between">
                  <div>
                    <p className="text-[9px] font-black text-red-400 uppercase">{h.type}</p>
                    <p className="text-xs font-bold">{h.building} | Rm {h.room}</p>
                  </div>
                  <span className="text-[10px] opacity-40">{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  function logout() {
    setView('search');
    setRole(null);
    setIsAlertActive(false);
  }
}

export default App;