import { useState } from "react";
import {
  School,
  Search,
  Lock,
  KeyRound,
  User,
  Shield,
  LogOut
} from "lucide-react";

/* ---------------- TYPES ---------------- */

type View = "search" | "join" | "role" | "dashboard";

interface SchoolData {
  id: string;
  name: string;
  district: string;
  joinCode: string;
}

/* ---------------- DATA ---------------- */

const SCHOOLS: SchoolData[] = [
  {
    id: "1",
    name: "Cesar Chavez Middle School",
    district: "Unified School District",
    joinCode: "CHAVEZ2026"
  }
];

/* ---------------- APP ---------------- */

export default function App() {
  const [view, setView] = useState<View>("search");
  const [schools] = useState<SchoolData[]>(SCHOOLS);
  const [selectedSchool, setSelectedSchool] = useState<SchoolData | null>(null);
  const [search, setSearch] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [alertActive, setAlertActive] = useState(false);

  /* ---------------- LOGIC ---------------- */

  function selectSchool(school: SchoolData) {
    setSelectedSchool(school);
    setView("join");
  }

  function verifyJoin() {
    if (joinCode === selectedSchool?.joinCode) {
      setView("role");
      setJoinCode("");
    } else {
      alert("Wrong join code");
    }
  }

  function logout() {
    setView("search");
    setSelectedSchool(null);
    setAlertActive(false);
  }

  /* ---------------- SCREENS ---------------- */

  // SEARCH
  if (view === "search") {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/5 p-8 rounded-3xl border border-white/10">

          <School className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
          <h1 className="text-2xl font-black text-center mb-6">
            Safe Space Registry
          </h1>

          <div className="relative mb-6">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search school..."
              className="w-full bg-black/40 border border-white/10 py-4 pl-12 pr-4 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            {schools
              .filter(s =>
                s.name.toLowerCase().includes(search.toLowerCase())
              )
              .map(s => (
                <button
                  key={s.id}
                  onClick={() => selectSchool(s)}
                  className="w-full bg-white/5 p-4 rounded-xl flex justify-between items-center"
                >
                  <div className="text-left">
                    <div className="font-bold">{s.name}</div>
                    <div className="text-xs text-indigo-400">
                      {s.district}
                    </div>
                  </div>
                  <Lock size={16} />
                </button>
              ))}
          </div>

        </div>
      </div>
    );
  }

  // JOIN
  if (view === "join") {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white/5 p-8 rounded-3xl border border-white/10 text-center">

          <KeyRound className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-4">
            Join {selectedSchool?.name}
          </h2>

          <input
            type="password"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            className="w-full bg-black/40 border border-white/10 py-4 px-4 rounded-xl mb-4 text-center"
          />

          <button
            onClick={verifyJoin}
            className="w-full py-4 bg-indigo-600 rounded-xl font-bold"
          >
            VERIFY
          </button>

        </div>
      </div>
    );
  }

  // ROLE
  if (view === "role") {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white/5 p-8 rounded-3xl border border-white/10 text-center">

          <h2 className="text-2xl font-bold mb-6">
            {selectedSchool?.name}
          </h2>

          <div className="space-y-3">
            <button
              onClick={() => setView("dashboard")}
              className="w-full py-5 bg-indigo-600 rounded-xl font-bold flex justify-center gap-3"
            >
              <User /> Student
            </button>

            <button
              onClick={() => setView("dashboard")}
              className="w-full py-5 bg-white/5 border border-white/10 rounded-xl font-bold flex justify-center gap-3"
            >
              <Shield /> Admin
            </button>
          </div>

        </div>
      </div>
    );
  }

  // DASHBOARD
  return (
    <div
      className={`min-h-screen flex items-center justify-center text-white
      ${alertActive ? "bg-red-950" : "bg-slate-950"}`}
    >

      <button
        onClick={logout}
        className="absolute top-6 right-6"
      >
        <LogOut />
      </button>

      <button
        onClick={() => setAlertActive(a => !a)}
        className="px-12 py-6 bg-indigo-600 rounded-xl font-black text-lg"
      >
        {alertActive ? "CANCEL ALERT" : "SEND ALERT"}
      </button>

    </div>
  );
}
