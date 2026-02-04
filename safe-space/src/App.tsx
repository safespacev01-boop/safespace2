import { useState } from "react";

export default function App() {
  const [mode, setMode] = useState<"register" | "join">("register");

  const [schoolName, setSchoolName] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [buildings, setBuildings] = useState("");

  const [joinCode, setJoinCode] = useState("");

  function createSchool() {
    if (!schoolName || !studentCode || !adminCode) {
      alert("Please fill out all fields");
      return;
    }

    alert("School Registered!");
  }

  function joinSchool() {
    if (!joinCode) {
      alert("Enter join code");
      return;
    }

    alert("Joined School!");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="w-full max-w-md p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-xl">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6">
          SafeSpace
        </h1>

        {/* Tabs */}
        <div className="flex mb-6 rounded-lg overflow-hidden border border-white/10">
          <button
            onClick={() => setMode("register")}
            className={`flex-1 py-2 ${
              mode === "register"
                ? "bg-white text-black"
                : "bg-transparent text-white"
            }`}
          >
            Register School
          </button>

          <button
            onClick={() => setMode("join")}
            className={`flex-1 py-2 ${
              mode === "join"
                ? "bg-white text-black"
                : "bg-transparent text-white"
            }`}
          >
            Join School
          </button>
        </div>

        {/* Register */}
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
              className="input"
              placeholder="Admin Access Code"
              type="password"
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
              onClick={createSchool}
              className="primary-btn"
            >
              Create School
            </button>
          </div>
        )}

        {/* Join */}
        {mode === "join" && (
          <div className="space-y-4">
            <input
              className="input"
              placeholder="Enter Join Code"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
            />

            <button
              onClick={joinSchool}
              className="primary-btn"
            >
              Join School
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
