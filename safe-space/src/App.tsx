import { useState } from "react";

/* ---------------- TYPES ---------------- */

type School = {
  name: string;
  joinCode: string;
  adminCode: string;
  buildings: string[];
};

type Message = {
  sender: "user" | "admin";
  text: string;
};

/* ---------------- APP ---------------- */

export default function App() {
  const [school, setSchool] = useState<School | null>(null);

  const [schoolName, setSchoolName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [buildingsText, setBuildingsText] = useState("");

  const [joinInput, setJoinInput] = useState("");
  const [adminInput, setAdminInput] = useState("");

  const [isJoined, setIsJoined] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [selectedBuilding, setSelectedBuilding] = useState("");

  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState("");

  const [helpSent, setHelpSent] = useState(false);

  /* ---------------- LOGIC ---------------- */

  function registerSchool() {
    if (!schoolName || !joinCode || !adminCode) return;

    setSchool({
      name: schoolName,
      joinCode,
      adminCode,
      buildings: buildingsText.split(",").map(b => b.trim())
    });
  }

  function joinSchool() {
    if (!school) return;
    if (joinInput === school.joinCode) {
      setIsJoined(true);
    } else {
      window.alert("Wrong join code");
    }
  }

  function adminLogin() {
    if (!school) return;
    if (adminInput === school.adminCode) {
      setIsAdmin(true);
    } else {
      window.alert("Wrong admin code");
    }
  }

  function sendMessage() {
    if (!chatInput) return;
    setMessages([...messages, { sender: "user", text: chatInput }]);
    setChatInput("");
  }

  function sendHelp() {
    setHelpSent(true);
    window.alert("Help request sent!");
  }

  /* ---------------- UI ---------------- */

  const glass =
    "bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl";

  /* -------- REGISTER SCHOOL -------- */

  if (!school) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className={`${glass} p-8 w-80`}>
          <h1 className="text-2xl font-bold mb-6 text-center">
            Register School
          </h1>

          <input
            className="input"
            placeholder="School Name"
            value={schoolName}
            onChange={e => setSchoolName(e.target.value)}
          />

          <input
            className="input"
            placeholder="Student Join Code"
            value={joinCode}
            onChange={e => setJoinCode(e.target.value)}
          />

          <input
            className="input"
            placeholder="Admin Access Code"
            value={adminCode}
            onChange={e => setAdminCode(e.target.value)}
          />

          <input
            className="input"
            placeholder="Buildings (Main, Gym, Library)"
            value={buildingsText}
            onChange={e => setBuildingsText(e.target.value)}
          />

          <button
            className="w-full mt-3 py-3 bg-blue-600 rounded-xl font-bold"
            onClick={registerSchool}
          >
            Create School
          </button>
        </div>
      </div>
    );
  }

  /* -------- JOIN SCREEN -------- */

  if (!isJoined && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className={`${glass} p-8 w-80`}>
          <h1 className="text-xl font-bold mb-4 text-center">
            {school.name}
          </h1>

          <input
            className="input"
            placeholder="Enter Join Code"
            value={joinInput}
            onChange={e => setJoinInput(e.target.value)}
          />

          <button
            className="w-full bg-green-600 py-3 rounded-xl mb-4"
            onClick={joinSchool}
          >
            Join School
          </button>

          <input
            className="input"
            placeholder="Admin Code"
            value={adminInput}
            onChange={e => setAdminInput(e.target.value)}
          />

          <button
            className="w-full bg-purple-600 py-3 rounded-xl"
            onClick={adminLogin}
          >
            Admin Login
          </button>
        </div>
      </div>
    );
  }

  /* -------- DASHBOARD -------- */

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className={`${glass} p-6 max-w-md mx-auto`}>

        <h1 className="text-xl font-bold mb-4 text-center">
          {school.name}
        </h1>

        {/* Building Select */}
        <select
          className="input"
          value={selectedBuilding}
          onChange={e => setSelectedBuilding(e.target.value)}
        >
          <option value="">Select Building</option>
          {school.buildings.map((b, i) => (
            <option key={i} value={b}>{b}</option>
          ))}
        </select>

        {/* Help Button */}
        <button
          onClick={sendHelp}
          className={`w-full py-4 rounded-xl font-bold mt-4 ${
            helpSent ? "bg-red-900" : "bg-red-600"
          }`}
        >
          {helpSent ? "HELP SENT" : "SEND HELP"}
        </button>

        {/* Chat */}
        <div className="mt-6">
          <h2 className="font-bold mb-2">Live Chat</h2>

          <div className="h-40 overflow-y-auto bg-black/40 rounded-xl p-3 mb-2">
            {messages.map((m, i) => (
              <div key={i} className="mb-1">
                {m.sender === "user" ? "You: " : "Admin: "}
                {m.text}
              </div>
            ))}
          </div>

          <input
            className="input"
            placeholder="Type message..."
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
          />

          <button
            className="w-full bg-blue-600 py-3 rounded-xl"
            onClick={sendMessage}
          >
            Send Message
          </button>
        </div>

      </div>
    </div>
  );
}
