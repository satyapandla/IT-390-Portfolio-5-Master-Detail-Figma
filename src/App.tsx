import { useMemo, useState, type ReactNode } from "react";

type IconName =
  | "activity"
  | "alert"
  | "arrow"
  | "calendar"
  | "check"
  | "chevron"
  | "clock"
  | "close"
  | "headphones"
  | "message"
  | "more"
  | "search"
  | "send"
  | "settings"
  | "spark"
  | "target"
  | "users";

type User = {
  id: number;
  name: string;
  role: string;
  initials: string;
  color: string;
  status: "Focused" | "Away" | "Offline";
  score: number;
  sessions: number;
  focusTime: string;
  trend: number;
  email: string;
  location: string;
  joined: string;
  team: string;
};

const users: User[] = [
  {
    id: 1,
    name: "Maya Chen",
    role: "Product designer",
    initials: "MC",
    color: "bg-violet-100 text-violet-700",
    status: "Focused",
    score: 91,
    sessions: 12,
    focusTime: "18h 42m",
    trend: 8,
    email: "maya.chen@focusos.io",
    location: "San Francisco, CA",
    joined: "Mar 14, 2025",
    team: "Product",
  },
  {
    id: 2,
    name: "Noah Williams",
    role: "Frontend engineer",
    initials: "NW",
    color: "bg-sky-100 text-sky-700",
    status: "Away",
    score: 84,
    sessions: 9,
    focusTime: "14h 18m",
    trend: 4,
    email: "noah.williams@focusos.io",
    location: "Austin, TX",
    joined: "Feb 02, 2025",
    team: "Engineering",
  },
  {
    id: 3,
    name: "Priya Kapoor",
    role: "Data scientist",
    initials: "PK",
    color: "bg-amber-100 text-amber-700",
    status: "Focused",
    score: 88,
    sessions: 11,
    focusTime: "16h 05m",
    trend: 6,
    email: "priya.kapoor@focusos.io",
    location: "New York, NY",
    joined: "Jan 18, 2025",
    team: "Intelligence",
  },
  {
    id: 4,
    name: "Eli Thompson",
    role: "Growth lead",
    initials: "ET",
    color: "bg-emerald-100 text-emerald-700",
    status: "Offline",
    score: 76,
    sessions: 7,
    focusTime: "10h 51m",
    trend: -2,
    email: "eli.thompson@focusos.io",
    location: "Portland, OR",
    joined: "Apr 09, 2025",
    team: "Growth",
  },
  {
    id: 5,
    name: "Sofia Rossi",
    role: "UX researcher",
    initials: "SR",
    color: "bg-rose-100 text-rose-700",
    status: "Focused",
    score: 94,
    sessions: 14,
    focusTime: "21h 12m",
    trend: 11,
    email: "sofia.rossi@focusos.io",
    location: "Boston, MA",
    joined: "Dec 11, 2024",
    team: "Product",
  },
  {
    id: 6,
    name: "Liam Osei",
    role: "Product manager",
    initials: "LO",
    color: "bg-orange-100 text-orange-700",
    status: "Offline",
    score: 81,
    sessions: 8,
    focusTime: "12h 34m",
    trend: 3,
    email: "liam.osei@focusos.io",
    location: "Chicago, IL",
    joined: "May 22, 2025",
    team: "Product",
  },
];

const weeklyData = [76, 84, 71, 92, 86, 94, 89];
const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const incidents = [
  { type: "Phone distraction", time: "Today, 11:42 AM", duration: "18 sec", confidence: "94%", tone: "amber" },
  { type: "Posture drop", time: "Today, 10:18 AM", duration: "32 sec", confidence: "88%", tone: "violet" },
  { type: "Phone distraction", time: "Yesterday, 3:06 PM", duration: "12 sec", confidence: "91%", tone: "amber" },
];

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    activity: <><path d="M3 12h4l2-7 4 14 2-7h6" /></>,
    alert: <><path d="M10.3 2.9 1.8 17a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 2.9a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4M12 17h.01" /></>,
    arrow: <><path d="m5 12 14 0M13 6l6 6-6 6" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    chevron: <><path d="m9 18 6-6-6-6" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    headphones: <><path d="M4 14v-2a8 8 0 0 1 16 0v2M18 19h1a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2h-1ZM6 19H5a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h1Z" /></>,
    message: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" /><path d="M8 10h.01M12 10h.01M16 10h.01" /></>,
    more: <><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    send: <><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></>,
    spark: <><path d="m12 3 1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4L12 3Z" /><path d="m18.5 14 .7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3Z" /></>,
    target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" fill="currentColor" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M8.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM17 11a4 4 0 0 0 0-8M23 21v-2a4 4 0 0 0-3-3.9" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function Avatar({ user, large = false }: { user: User; large?: boolean }) {
  return (
    <div className={`${large ? "size-16 text-lg" : "size-10 text-sm"} ${user.color} grid shrink-0 place-items-center rounded-2xl font-semibold`}>
      {user.initials}
    </div>
  );
}

function StatusBadge({ status }: { status: User["status"] }) {
  const styles = status === "Focused" ? "bg-emerald-50 text-emerald-700" : status === "Away" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-500";
  return (
    <span className={`${styles} inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold`}>
      <span className={`size-1.5 rounded-full ${status === "Focused" ? "bg-emerald-500" : status === "Away" ? "bg-amber-500" : "bg-slate-400"}`} />
      {status}
    </span>
  );
}

function MetricCard({ icon, label, value, note, accent }: { icon: IconName; label: string; value: string; note: string; accent: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40">
      <div className="mb-5 flex items-center justify-between">
        <span className={`grid size-9 place-items-center rounded-xl ${accent}`}><Icon name={icon} /></span>
        <span className="text-xs font-semibold text-emerald-600">{note}</span>
      </div>
      <p className="text-2xl font-bold tracking-tight text-slate-900">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{label}</p>
    </div>
  );
}

function Overview({ user }: { user: User }) {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard icon="target" label="Focus score" value={`${user.score}%`} note={`+${Math.max(user.trend, 0)}%`} accent="bg-indigo-50 text-indigo-600" />
        <MetricCard icon="clock" label="Focus time" value={user.focusTime} note="+2h 14m" accent="bg-sky-50 text-sky-600" />
        <MetricCard icon="activity" label="Deep sessions" value={`${user.sessions}`} note="+3 this week" accent="bg-emerald-50 text-emerald-600" />
        <MetricCard icon="alert" label="Interventions" value="7" note="-18%" accent="bg-amber-50 text-amber-600" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">Focus rhythm</h2>
              <p className="mt-1 text-sm text-slate-500">Daily attention quality over the last 7 days</p>
            </div>
            <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-600">This week</span>
          </div>
          <div className="flex h-52 items-end gap-3 border-b border-slate-100">
            {weeklyData.map((value, index) => (
              <div key={weekdays[index]} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <span className="text-xs font-semibold text-slate-500">{value}%</span>
                <div className="group relative flex h-36 w-full max-w-10 items-end overflow-hidden rounded-t-lg bg-indigo-50">
                  <div className={`w-full rounded-t-lg transition-all ${index === 5 ? "bg-indigo-600" : "bg-indigo-200 group-hover:bg-indigo-300"}`} style={{ height: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-3">
            {weekdays.map((day) => <span key={day} className="flex-1 text-center text-xs font-medium text-slate-400">{day}</span>)}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">Recent incidents</h2>
              <p className="mt-1 text-sm text-slate-500">Computer vision detections</p>
            </div>
            <span className="text-xs font-semibold text-indigo-600">View all</span>
          </div>
          <div className="divide-y divide-slate-100">
            {incidents.map((incident) => (
              <div key={incident.time} className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0">
                <span className={`grid size-9 shrink-0 place-items-center rounded-xl ${incident.tone === "amber" ? "bg-amber-50 text-amber-600" : "bg-violet-50 text-violet-600"}`}>
                  <Icon name={incident.tone === "amber" ? "alert" : "activity"} size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">{incident.type}</p>
                  <p className="mt-0.5 text-xs text-slate-400">{incident.time}</p>
                </div>
                <span className="text-xs font-medium text-slate-500">{incident.duration}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600"><Icon name="spark" /></span>
            <div>
              <h2 className="font-semibold text-slate-900">FocusOS insight</h2>
              <p className="mt-0.5 text-sm text-slate-500">{user.name.split(" ")[0]} reaches peak focus between 9:30 AM and 11:45 AM.</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">View analysis <Icon name="arrow" size={15} /></span>
        </div>
      </section>
    </div>
  );
}

function Sessions() {
  const rows = [
    ["Today", "09:12 AM – 11:06 AM", "1h 54m", "94%", "1"],
    ["Yesterday", "02:04 PM – 03:31 PM", "1h 27m", "88%", "2"],
    ["Yesterday", "09:28 AM – 11:42 AM", "2h 14m", "91%", "1"],
    ["Jun 16", "03:15 PM – 04:02 PM", "47m", "82%", "3"],
  ];
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/40">
      <div className="border-b border-slate-100 p-5">
        <h2 className="font-semibold text-slate-900">Focus sessions</h2>
        <p className="mt-1 text-sm text-slate-500">Detailed session history and performance</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-2xl text-left">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-400">
            <tr>{["Date", "Time", "Duration", "Focus score", "Incidents"].map((label) => <th key={label} className="px-5 py-3">{label}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={`${row[0]}${row[1]}`} className="text-sm text-slate-600 hover:bg-slate-50/70">
                {row.map((cell, index) => <td key={cell} className={`px-5 py-4 ${index === 0 ? "font-semibold text-slate-800" : ""}`}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Incidents() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40">
      <h2 className="font-semibold text-slate-900">Intervention timeline</h2>
      <p className="mt-1 text-sm text-slate-500">Detected distractions and the coaching response delivered</p>
      <div className="mt-6 space-y-3">
        {incidents.map((incident, index) => (
          <div key={incident.time} className="flex flex-col gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-amber-600 shadow-sm"><Icon name="alert" /></span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold text-slate-800">{incident.type}</p>
                <span className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-slate-500">{incident.confidence} confidence</span>
              </div>
              <p className="mt-1 text-sm text-slate-500">{incident.time} · Detected for {incident.duration}</p>
              <p className="mt-2 text-sm text-slate-700">“{index === 1 ? "Posture check: let’s reset your alignment." : "Refocus: screen engagement dropped below threshold."}”</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600"><Icon name="check" size={14} /> Delivered</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function MessagePanel({ user, onClose }: { user: User; onClose: () => void }) {
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState<string[]>([]);
  const firstName = user.name.split(" ")[0];
  const suggestions = [
    `Hi ${firstName}, I noticed your focus time is below your usual rhythm. Is there anything I can help unblock?`,
    `Hi ${firstName}, would you like to move any meetings to protect a focus block today?`,
    "Just checking in—remember to take a short reset before your next focus session.",
  ];

  const sendMessage = () => {
    const trimmed = message.trim();
    if (!trimmed) return;
    setSentMessages((current) => [...current, trimmed]);
    setMessage("");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/30" role="dialog" aria-modal="true" aria-label={`Message ${user.name}`}>
      <button type="button" className="absolute inset-0 cursor-default" onClick={onClose} aria-label="Close message panel" />
      <section className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div className="flex items-center gap-3">
            <Avatar user={user} />
            <div>
              <h2 className="font-semibold text-slate-900">{user.name}</h2>
              <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                <span className={`size-1.5 rounded-full ${user.status === "Offline" ? "bg-slate-300" : "bg-emerald-500"}`} />
                {user.status === "Offline" ? "Will receive when online" : "Available now"}
              </div>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="grid size-9 place-items-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800">
            <Icon name="close" />
          </button>
        </div>

        <div className="border-b border-slate-100 bg-indigo-50 px-5 py-4">
          <div className="flex items-start gap-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white text-indigo-600 shadow-sm"><Icon name="spark" size={16} /></span>
            <div>
              <p className="text-sm font-semibold text-indigo-950">Focus context</p>
              <p className="mt-1 text-xs leading-relaxed text-indigo-700">
                {firstName} has logged {user.focusTime} of focus time with a {user.score}% score this week.
                {user.score < 85 ? " A supportive check-in is recommended." : " Their focus rhythm is currently healthy."}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-slate-100" />
            <span className="text-xs font-medium text-slate-400">Today</span>
            <span className="h-px flex-1 bg-slate-100" />
          </div>
          <div className="flex gap-2.5">
            <div className="grid size-7 shrink-0 place-items-center rounded-lg bg-slate-900 text-xs font-semibold text-white">AD</div>
            <div className="max-w-xs rounded-2xl rounded-tl-md bg-slate-100 px-4 py-3 text-sm leading-relaxed text-slate-700">
              Hi {firstName}, checking in on your focus plan for today. Let me know if you need help protecting some deep-work time.
              <span className="mt-1.5 block text-xs text-slate-400">9:14 AM · Delivered</span>
            </div>
          </div>
          {sentMessages.map((sent, index) => (
            <div key={`${sent}-${index}`} className="mt-3 flex justify-end">
              <div className="max-w-xs rounded-2xl rounded-tr-md bg-indigo-600 px-4 py-3 text-sm leading-relaxed text-white">
                {sent}
                <span className="mt-1.5 block text-xs text-indigo-200">Just now · Sent</span>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-200 bg-white p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Quick prompts</p>
          <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
            {suggestions.map((suggestion, index) => (
              <button key={suggestion} type="button" onClick={() => setMessage(suggestion)} className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700">
                {index === 0 ? "Supportive check-in" : index === 1 ? "Protect focus time" : "Suggest a reset"}
              </button>
            ))}
          </div>
          <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 focus-within:border-indigo-300 focus-within:bg-white">
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  sendMessage();
                }
              }}
              rows={2}
              className="min-h-12 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
              placeholder={`Message ${firstName}...`}
            />
            <button type="button" onClick={sendMessage} disabled={!message.trim()} aria-label="Send message" className="grid size-10 shrink-0 place-items-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400">
              <Icon name="send" size={17} />
            </button>
          </div>
          <p className="mt-2 text-center text-xs text-slate-400">Press Enter to send · Shift + Enter for a new line</p>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [selectedId, setSelectedId] = useState(1);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("Overview");
  const [listOpen, setListOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);

  const filteredUsers = useMemo(() => users.filter((user) => `${user.name} ${user.role}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const selected = users.find((user) => user.id === selectedId) ?? users[0];

  const selectUser = (id: number) => {
    setSelectedId(id);
    setListOpen(false);
    setMessageOpen(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-indigo-600 text-white"><Icon name="target" size={20} /></span>
            <span className="text-lg font-bold tracking-tight">FocusOS</span>
          </div>
          <span className="hidden items-center gap-2 text-sm font-semibold text-slate-600 sm:flex"><Icon name="users" size={17} /> People</span>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Settings" className="grid size-9 place-items-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"><Icon name="settings" /></button>
          <div className="ml-1 grid size-9 place-items-center rounded-xl bg-slate-900 text-xs font-semibold text-white">AD</div>
        </div>
      </header>

      <div className="mx-auto flex max-w-screen-2xl">
        <aside className={`${listOpen ? "flex" : "hidden"} fixed inset-x-0 bottom-0 top-16 z-20 w-full flex-col border-r border-slate-200 bg-white md:sticky md:top-16 md:flex md:h-[calc(100vh-4rem)] md:w-80 lg:w-96`}>
          <div className="border-b border-slate-100 p-5">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <h1 className="text-lg font-bold tracking-tight">Team members</h1>
                <p className="mt-1 text-sm text-slate-500">{users.length} active profiles</p>
              </div>
              <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600">Live</span>
            </div>
            <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-400 focus-within:border-indigo-300 focus-within:bg-white">
              <Icon name="search" size={17} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400" placeholder="Search people" />
            </label>
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            {filteredUsers.map((user) => (
              <button key={user.id} type="button" onClick={() => selectUser(user.id)} className={`mb-1 flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${user.id === selectedId ? "bg-indigo-50 ring-1 ring-indigo-100" : "hover:bg-slate-50"}`}>
                <Avatar user={user} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-slate-800">{user.name}</span>
                  <span className="mt-0.5 block truncate text-xs text-slate-500">{user.role}</span>
                </span>
                <span className="flex flex-col items-end gap-1.5">
                  <span className={`text-xs font-bold ${user.score >= 85 ? "text-emerald-600" : "text-slate-500"}`}>{user.score}%</span>
                  <span className={`size-2 rounded-full ${user.status === "Focused" ? "bg-emerald-500" : user.status === "Away" ? "bg-amber-400" : "bg-slate-300"}`} />
                </span>
              </button>
            ))}
            {filteredUsers.length === 0 && <p className="py-10 text-center text-sm text-slate-400">No team members found.</p>}
          </div>
          <div className="border-t border-slate-100 p-4">
            <div className="rounded-2xl bg-slate-900 p-4 text-white">
              <div className="flex items-center gap-2 text-sm font-semibold"><Icon name="headphones" size={17} /> Voice engine</div>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                <span>ElevenLabs connected</span>
                <span className="size-2 rounded-full bg-emerald-400" />
              </div>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="border-b border-slate-200 bg-white px-4 py-5 sm:px-6 lg:px-8">
            <button type="button" onClick={() => setListOpen(true)} className="mb-4 inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 md:hidden">
              <Icon name="users" size={16} /> All people
            </button>
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
              <div className="flex items-center gap-4">
                <Avatar user={selected} large />
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h1 className="text-2xl font-bold tracking-tight">{selected.name}</h1>
                    <StatusBadge status={selected.status} />
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{selected.role} · {selected.team}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button type="button" onClick={() => setMessageOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
                  <Icon name="message" size={16} /> Message
                </button>
                <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"><Icon name="calendar" size={16} /> Last 7 days</button>
                <button type="button" aria-label="More options" className="grid size-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm hover:bg-slate-50"><Icon name="more" /></button>
              </div>
            </div>
            <div className="mt-5 flex gap-1 overflow-x-auto">
              {["Overview", "Sessions", "Incidents"].map((item) => (
                <button key={item} type="button" onClick={() => setTab(item)} className={`relative rounded-lg px-4 py-2 text-sm font-semibold transition ${tab === item ? "bg-indigo-50 text-indigo-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}>
                  {item}{item === "Incidents" && <span className="ml-2 rounded-full bg-amber-100 px-1.5 py-0.5 text-xs text-amber-700">7</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-5 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm shadow-slate-200/40 sm:grid-cols-3">
              <div><span className="block text-xs font-medium text-slate-400">Email</span><span className="mt-1 block truncate font-medium text-slate-700">{selected.email}</span></div>
              <div><span className="block text-xs font-medium text-slate-400">Location</span><span className="mt-1 block font-medium text-slate-700">{selected.location}</span></div>
              <div><span className="block text-xs font-medium text-slate-400">Monitoring since</span><span className="mt-1 block font-medium text-slate-700">{selected.joined}</span></div>
            </div>
            {tab === "Overview" && <Overview user={selected} />}
            {tab === "Sessions" && <Sessions />}
            {tab === "Incidents" && <Incidents />}
          </div>
        </div>
      </div>
      {messageOpen && <MessagePanel key={selected.id} user={selected} onClose={() => setMessageOpen(false)} />}
    </main>
  );
}
