import { useState } from "react";
import {
  Shield,
  User,
  LogOut,
  School,
  Search,
  Lock
} from "lucide-react";

/* ---------------- TYPES ---------------- */

type Role = "student" | "admin" | null;
type View = "search" | "join" | "role" | "dashboard";

interface SchoolData {
  id: string;
  name: string;
  district: string;
  joinCode: string;
  buildings: string[];
}

interface AlertLog {
  time: string;
  building: string;
  room: string;
}

/* ---------------- MOCK DB ---------------- */

const INITIAL_SCHOOLS: SchoolData[] = [
  {
    id: "1",
    name: "Cesar Chavez Middle School",
    district: "Unified School District",
    joinCode: "CHAVEZ2026",
    buildings: ["Main", "Gym", "Library"]
  }
];

/* ---------------- APP ---------------- */

export default function App() {
  const [view, setView] = useState<View>("search");
 const [schools] = useState<SchoolData[]>(INITIAL_SCHOOLS);
  const [selectedSchool, setSelectedSchool] =
    useState<SchoolData | null>(null);

  const [search, setSearch] = useState("");
  const [joinInput, setJoinInput] = useState("");
  const [role, setRole] = useState<Role>(null);

  const [alertActive, setAlertActive] = useState(false);
  const [history, setHistory] = useState<AlertLog[]>([]);

  const [building, setBuilding] = useState("");
  const [room, setRoom] = useState("");

  /* ---------------- LOGIC ---------------- */

  function selectSchool(s: SchoolData) {
    setSelectedSchool(s);
    setView("join");
  }

  function verifyJoin() {
    if (joinInput === selectedSchool?.joinCode) {
      setView("role");
      setJoinInput("");
    } else {
      window.alert("Wrong join code");
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

  /* ---------------- SCREENS ---------------- */

  if (view === "search") {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center text-white p-4">
        <div className="w-full max-w-md bg-white/5 p-8 rounded-2xl">
          <School className="mx-auto mb-4 text-indigo-400" size={40} />
          <h1 className="text-center text-2xl font-bold mb-6">
            Safe Space Registry
          </h1>

          <div className="relative mb-4">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2"
              size={18}
            />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search school..."
              className="w-full bg-black/40 pl-10 p-3 rounded-xl"
            />
          </div>

          {schools
            .filter(s =>
              s.name.toLowerCase().includes(search.toLowerCase())
            )
            .map(s => (
              <button
                key={s.id}
                onClick={() => selectSchool(s)}
                className="w-full bg-white/10 p-4 rounded-xl mb-2 flex justify-between"
              >
                <div>
                  <div className="font-bold">{s.name}</div>
                  <div className="text-xs text-indigo-400">
                    {s.district}
                  </div>
                </div>
                <Lock />
              </button>
            ))}
        </div>
      </div>
    );
  }

  if (view === "join") {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center text-white p-4">
        <div className="bg-white/5 p-8 rounded-xl w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4">
            Join {selectedSchool?.name}
          </h2>

          <input
            type="password"
            value={joinInput}
            onChange={e => setJoinInput(e.target.value)}
            className="w-full p-3 bg-black/40 rounded-xl mb-4"
            placeholder="Join Code"
          />

          <button
            onClick={verifyJoin}
            className="w-full bg-indigo-600 p-3 rounded-xl font-bold"
          >
            Verify
          </button>
        </div>
      </div>
    );
  }

  if (view === "role") {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center text-white p-4">
        <div className="bg-white/5 p-8 rounded-xl w-full max-w-sm">
          <h2 className="text-xl font-bold mb-6 text-center">
            Choose Role
          </h2>

          <button
            onClick={() => {
              setRole("student");
              setView("dashboard");
            }}
            className="w-full bg-indigo-600 p-4 rounded-xl mb-3 flex justify-center gap-2"
          >
            <User /> Student
          </button>

          <button
            onClick={() => {
              setRole("admin");
              setView("dashboard");
            }}
            className="w-full bg-white/10 p-4 rounded-xl flex justify-center gap-2"
          >
            <Shield /> Admin
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- DASHBOARD ---------------- */

  return (
    <div
      className={`min-h-screen ${
        alertActive ? "bg-red-950" : "bg-slate-950"
      } text-white flex flex-col items-center justify-center`}
    >
      <button
        onClick={logout}
        className="absolute top-6 right-6"
      >
        <LogOut />
      </button>

      <h1 className="mb-4">
        {selectedSchool?.name} ({role})
      </h1>

      <input
        placeholder="Building"
        value={building}
        onChange={e => setBuilding(e.target.value)}
        className="mb-2 p-2 bg-black/40 rounded"
      />

      <input
        placeholder="Room"
        value={room}
        onChange={e => setRoom(e.target.value)}
        className="mb-6 p-2 bg-black/40 rounded"
      />

      <button
        onClick={sendAlert}
        className={`px-10 py-5 rounded-xl font-bold ${
          alertActive
            ? "bg-red-600"
            : "bg-indigo-600"
        }`}
      >
        {alertActive ? "Cancel Alert" : "Send Alert"}
      </button>

      <div className="mt-6 w-full max-w-sm">
        <h2 className="font-bold mb-2">History</h2>

        {history.map((h, i) => (
          <div
            key={i}
            className="bg-white/10 p-2 rounded mb-1 text-sm"
          >
            {h.time} — {h.building} {h.room}
          </div>
        ))}
      </div>
    </div>
  );
}
