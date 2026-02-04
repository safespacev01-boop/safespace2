import { useState } from "react";

export default function App() {
  const [mode, setMode] = useState<"register" | "join">("register");

  const [schoolName, setSchoolName] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [buildings, setBuildings] = useState("");
  const [joinCode, setJoinCode] = useState("");

  function handleRegister() {
    if (!schoolName || !studentCode || !adminCode) {
      alert("Fill all required fields");
      return;
    }
    alert("School registered!");
  }

  function handleJoin() {
    if (!joinCode) {
      alert("Enter a join code");
      return;
    }
    alert("Joined school!");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8">

        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-6">
          SafeSpace
        </h1>

        {/* Tabs */}
        <div className="flex mb-6 rounded-lg overflow-hidden border border-white/10">
          <button
            className={`w-1/2 py-2 ${
              mode === "register"
                ? "bg-white text-black"
                : "bg-transparent text-white"
            }`}
            onClick={() => setMode("register")}
          >
            Register School
          </button>

          <button
            className={`w-1/2 py-2 ${
              mode === "join"
                ? "bg-white text-black"
                : "bg-transparent text-white"
            }`}
            onClick={() => setMode("join")}
          >
            Join School
          </button>
        </div>

        {/* Register Form */}
        {mode === "register" && (
          <div className="space-y-4">

            <input
              className="input"
              placeholder="School Name"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
            />

            <input
              className="input"
              placeholder="Student Join Code"
              value={studentCode}
              onChange={(e) => setStudentCode(e.target.value)}
            />

            <input
              type="password"
              className="input"
              placeholder="Admin Access Code"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
            />

            <input
              className="input"
              placeholder="Buildings (Main, Gym, Library)"
              value={buildings}
              onChange={(e) => setBuildings(e.target.value)}
            />

            <button
              onClick={handleRegister}
              className="primary-btn"
            >
              Create School
            </button>

          </div>
        )}

        {/* Join Form */}
        {mode === "join" && (
          <div className="space-y-4">

            <input
              className="input"
              placeholder="Enter Join Code"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
            />

            <button
              onClick={handleJoin}
              className="primary-btn"
            >
              Join
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
