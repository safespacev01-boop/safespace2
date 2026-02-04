import { useState } from "react";
import {
  Shield,
  User,
  LogOut,
  School,
  Search,
  Lock,
  KeyRound
} from "lucide-react";

/* ---------------- TYPES ---------------- */
type Role = "student" | "admin" | null;
type View = "search" | "register" | "join" | "role" | "dashboard";

interface SchoolData {
  id: string;
  name: string;
  district: string;
  joinCode: string;       // student code
  adminCode: string;      // admin code
  buildings: string[];
}

interface AlertLog {
  time: string;
  building: string;
  room: string;
}

/* ---------------- APP ---------------- */
export default function App() {
  const [view, setView] = useState<View>("search");
  const [schools, setSchools] = useState<SchoolData[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<SchoolData | null>(null);

  const [search, setSearch] = useState("");
  const [joinInput, setJoinInput] = useState("");
  const [adminInput, setAdminInput] = useState("");
  const [role, setRole] = useState<Role>(null);

  const [alertActive, setAlertActive] = useState(false);
  const [history, setHistory] = useState<AlertLog[]>([]);

  const [building, setBuilding] = useState("");
  const [room, setRoom] = useState("");

  // Register School
  const [schoolName, setSchoolName] = useState("");
  const [district, setDistrict] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [adminCode, setAdminCode] = useState("");

  /* ---------------- LOGIC ---------------- */

  function registerSchool() {
    if (!schoolName || !studentCode || !adminCode)
      return window.alert("Fill all fields");

    const newSchool: SchoolData = {
      id: Date.now().toString(),
      name: schoolName,
      district,
      joinCode: studentCode,
      adminCode,
      buildings: ["Main"]
    };

    setSchools(prev => [...prev, newSchool]);
    setSelectedSchool(newSchool);
    setView("role");
  }

  function selectSchool(s: SchoolData) {
    setSelectedSchool(s);
    setView("join");
  }

  function verifyStudent() {
    if (joinInput === selectedSchool?.joinCode) {
      setRole("student");
      setView("dashboard");
    } else {
      window.alert("Wrong student code");
    }
  }

  function verifyAdmin() {
    if (adminInput === selectedSchool?.adminCode) {
      setRole("admin");
      setView("dashboard");
    } else {
      window.alert("Wrong admin code");
    }
  }

  function sendAlert() {
    const active = !alertActive;
    setAlertActive(active);

    if (active) {
      const time = new Date().toLocaleTimeString();
      setHistory(prev => [
        { time, building, room },
        ...prev
      ]);
    }
  }

  function logout() {
    setView("search");
    setRole(null);
    setAlertActive(false);
  }

  /* ---------------- GLASS STYLE ---------------- */
  const glass = "bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl";

  /* ---------------- SEARCH ---------------- */
  if (view === "search") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-black flex items-center justify-center text-white p-6">
        <div className={`${glass} w-full max-w-md p-8`}>
          <School className="mx-auto mb-4 text-indigo-400" size={48} />
          <h1 className="text-3xl font-bold text-center mb-6">SafeSpace</h1>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-3" size={18} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search school"
              className="w-full pl-10 p-3 bg-black/40 rounded-xl"
            />
          </div>

          {schools.length === 0 && (
            <p className="text-center text-sm opacity-70 mb-4">
              No schools registered yet
            </p>
          )}

          {schools
            .filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
            .map(s => (
              <button
                key={s.id}
                onClick={() => selectSchool(s)}
                className="w-full p-4 bg-white/10 rounded-xl mb-2 flex justify-between"
              >
                <span>{s.name}</span>
                <Lock />
              </button>
            ))}

          <button
            onClick={() => setView("register")}
            className="w-full mt-4 p-4 border border-dashed rounded-xl"
          >
            ➕ Register School
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- REGISTER ---------------- */
  if (view === "register") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white p-6">
        <div className={`${glass} w-full max-w-md p-8`}>
          <h2 className="text-2xl font-bold mb-4">Register School</h2>

          <input placeholder="School Name" className="input" value={schoolName} onChange={e=>setSchoolName(e.target.value)} />
          <input placeholder="District" className="input" value={district} onChange={e=>setDistrict(e.target.value)} />
          <input placeholder="Student Join Code" className="input" value={studentCode} onChange={e=>setStudentCode(e.target.value)} />
          <input placeholder="Admin Access Code" className="input" value={adminCode} onChange={e=>setAdminCode(e.target.value)} />

          <button onClick={registerSchool} className="w-full mt-4 bg-indigo-600 p-3 rounded-xl">
            Register
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- JOIN ---------------- */
  if (view === "join") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white p-6">
        <div className={`${glass} w-full max-w-sm p-8`}>
          <h2 className="text-xl font-bold mb-4">{selectedSchool?.name}</h2>

          <input
            placeholder="Student Join Code"
            value={joinInput}
            onChange={e=>setJoinInput(e.target.value)}
            className="input"
          />

          <button onClick={verifyStudent} className="w-full bg-indigo-600 p-3 rounded-xl mt-2">
            Enter as Student
          </button>

          <div className="mt-4">
            <input
              placeholder="Admin Code"
              value={adminInput}
              onChange={e=>setAdminInput(e.target.value)}
              className="input"
            />

            <button onClick={verifyAdmin} className="w-full bg-red-600 p-3 rounded-xl mt-2 flex justify-center gap-2">
              <KeyRound /> Admin Access
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- DASHBOARD ---------------- */
  return (
    <div className={`min-h-screen ${alertActive ? "bg-red-950" : "bg-slate-950"} text-white flex flex-col items-center justify-center p-6`}>

      <button onClick={logout} className="absolute top-6 right-6">
        <LogOut />
      </button>

      <h1 className="text-xl mb-2">{selectedSchool?.name}</h1>
      <p className="opacity-70 mb-4">Role: {role}</p>

      <input placeholder="Building" value={building} onChange={e=>setBuilding(e.target.value)} className="input" />
      <input placeholder="Room" value={room} onChange={e=>setRoom(e.target.value)} className="input mb-4" />

      <button
        onClick={sendAlert}
        className={`px-10 py-6 rounded-2xl text-xl font-bold ${alertActive ? "bg-red-600" : "bg-indigo-600"}`}
      >
        {alertActive ? "Cancel Alert" : "Send Alert"}
      </button>

      <div className={`${glass} w-full max-w-sm mt-6 p-4`}>
        <h3 className="font-bold mb-2">History</h3>
        {history.map((h,i)=>(
          <div key={i} className="text-sm bg-white/10 p-2 rounded mb-1">
            {h.time} — {h.building} {h.room}
          </div>
        ))}
      </div>

    </div>
  );
}

/* Tailwind helper */
// Add this to your index.css
// .input { @apply w-full p-3 mb-2 bg-black/40 rounded-xl outline-none; }
