import { FlashcardDeck, Quiz, Badge, Achievement, Notification } from "@/types";

// ─── Navigation ────────────────────────────────────────────────
export const NAV_ITEMS = [
  { label: "Home",       href: "/home",         icon: "Home" },
  { label: "AI Tutor",  href: "/ai-tutor",      icon: "Bot" },
  { label: "Flashcards",href: "/flashcards",     icon: "BookOpen" },
  { label: "Quiz",      href: "/quiz",           icon: "BrainCircuit" },
  { label: "Focus",     href: "/focus",          icon: "Timer" },
] as const;

export const SIDEBAR_ITEMS = [
  { label: "Home",         href: "/home",          icon: "Home" },
  { label: "AI Tutor",     href: "/ai-tutor",       icon: "Bot" },
  { label: "Flashcards",   href: "/flashcards",      icon: "BookOpen" },
  { label: "Quiz",         href: "/quiz",            icon: "BrainCircuit" },
  { label: "Focus Timer",  href: "/focus",           icon: "Timer" },
  { label: "Study Planner",href: "/study-planner",   icon: "CalendarCheck" },
  { label: "Progress",     href: "/progress",        icon: "TrendingUp" },
  { label: "Notifications",href: "/notifications",   icon: "Bell" },
] as const;

// ─── Subjects ──────────────────────────────────────────────────
export const SUBJECTS = [
  { id: "math",       label: "Mathematics",  icon: "Calculator",   color: "#818cf8" },
  { id: "science",    label: "Science",      icon: "FlaskConical", color: "#34d399" },
  { id: "history",    label: "History",      icon: "Landmark",     color: "#f59e0b" },
  { id: "english",    label: "English",      icon: "BookOpen",     color: "#60a5fa" },
  { id: "coding",     label: "Coding",       icon: "Code2",        color: "#a78bfa" },
  { id: "physics",    label: "Physics",      icon: "Atom",         color: "#f472b6" },
  { id: "chemistry",  label: "Chemistry",    icon: "TestTube",     color: "#fb923c" },
  { id: "biology",    label: "Biology",      icon: "Leaf",         color: "#4ade80" },
  { id: "geography",  label: "Geography",    icon: "Globe",        color: "#22d3ee" },
  { id: "economics",  label: "Economics",   icon: "BarChart3",    color: "#e879f9" },
] as const;

// ─── Pomodoro Defaults ─────────────────────────────────────────
export const POMODORO_SETTINGS = {
  focusDuration:       25,
  shortBreakDuration:   5,
  longBreakDuration:   15,
  sessionsUntilLong:    4,
} as const;

// ─── Suggested AI Questions ────────────────────────────────────
export const SUGGESTED_QUESTIONS = [
  "Explain photosynthesis in simple terms",
  "How does the Pythagorean theorem work?",
  "What caused World War I?",
  "Help me understand Newton's laws",
  "Explain recursion in programming",
  "What is the water cycle?",
] as const;

// ─── Study Goals ────────────────────────────────────────────────
export const STUDY_GOALS = [
  { value: 15,  label: "15 min/day",  description: "Casual learner" },
  { value: 30,  label: "30 min/day",  description: "Regular learner" },
  { value: 60,  label: "1 hr/day",    description: "Dedicated learner" },
  { value: 120, label: "2 hrs/day",   description: "Intensive learner" },
] as const;

// ─── Study Styles ──────────────────────────────────────────────
export const STUDY_STYLES = [
  { id: "visual",   label: "Visual",   icon: "👁️",  description: "Diagrams & charts" },
  { id: "reading",  label: "Reading",  icon: "📖",  description: "Text & notes" },
  { id: "practice", label: "Practice", icon: "✏️",  description: "Quizzes & exercises" },
  { id: "mixed",    label: "Mixed",    icon: "🎯",  description: "All styles combined" },
] as const;

// ─── Mock Flashcard Decks ──────────────────────────────────────
export const MOCK_DECKS: FlashcardDeck[] = [
  {
    id: "1",
    title: "Algebra Fundamentals",
    subject: "Mathematics",
    cardCount: 24,
    masteredCount: 18,
    color: "#818cf8",
    icon: "Calculator",
    flashcards: [],
    lastStudied: "2 hours ago",
  },
  {
    id: "2",
    title: "Cell Biology",
    subject: "Biology",
    cardCount: 32,
    masteredCount: 10,
    color: "#4ade80",
    icon: "Leaf",
    flashcards: [],
    lastStudied: "Yesterday",
  },
  {
    id: "3",
    title: "World War History",
    subject: "History",
    cardCount: 18,
    masteredCount: 18,
    color: "#f59e0b",
    icon: "Landmark",
    flashcards: [],
    lastStudied: "3 days ago",
  },
  {
    id: "4",
    title: "Python Basics",
    subject: "Coding",
    cardCount: 40,
    masteredCount: 22,
    color: "#a78bfa",
    icon: "Code2",
    flashcards: [],
    lastStudied: "Today",
  },
];

// ─── Mock Quizzes ──────────────────────────────────────────────
export const MOCK_QUIZZES: Quiz[] = [
  {
    id: "1",
    title: "Algebra Challenge",
    subject: "Mathematics",
    description: "Test your algebra skills with equations and inequalities",
    questionCount: 10,
    durationMinutes: 15,
    difficulty: "medium",
    icon: "Calculator",
    color: "#818cf8",
    questions: [],
    bestScore: 85,
  },
  {
    id: "2",
    title: "Cell Biology Quiz",
    subject: "Biology",
    description: "Explore cellular structures and functions",
    questionCount: 15,
    durationMinutes: 20,
    difficulty: "hard",
    icon: "Leaf",
    color: "#4ade80",
    questions: [],
  },
  {
    id: "3",
    title: "Python Fundamentals",
    subject: "Coding",
    description: "Variables, loops, functions, and OOP basics",
    questionCount: 12,
    durationMinutes: 18,
    difficulty: "easy",
    icon: "Code2",
    color: "#a78bfa",
    questions: [],
    bestScore: 92,
  },
  {
    id: "4",
    title: "World War I & II",
    subject: "History",
    description: "Causes, key events, and outcomes of world wars",
    questionCount: 20,
    durationMinutes: 25,
    difficulty: "medium",
    icon: "Landmark",
    color: "#f59e0b",
    questions: [],
  },
];

// ─── Mock Badges ───────────────────────────────────────────────
export const MOCK_BADGES: Badge[] = [
  { id: "1", name: "First Step",    description: "Completed first lesson",      icon: "🎯", color: "#818cf8", isEarned: true,  earnedAt: "2024-01-10" },
  { id: "2", name: "Streak Master", description: "7-day study streak",          icon: "🔥", color: "#f59e0b", isEarned: true,  earnedAt: "2024-01-17" },
  { id: "3", name: "Quiz Champion", description: "Scored 100% on a quiz",       icon: "🏆", color: "#fbbf24", isEarned: true,  earnedAt: "2024-01-20" },
  { id: "4", name: "Flash Master",  description: "Mastered 100 flashcards",     icon: "⚡", color: "#60a5fa", isEarned: true,  earnedAt: "2024-01-25" },
  { id: "5", name: "Night Owl",     description: "Study past midnight 5 times", icon: "🦉", color: "#8b5cf6", isEarned: false },
  { id: "6", name: "Scholar",       description: "Study 50 hours total",        icon: "📚", color: "#34d399", isEarned: false },
  { id: "7", name: "Perfectionist", description: "100% on 5 quizzes in a row",  icon: "💎", color: "#f472b6", isEarned: false },
  { id: "8", name: "Polymath",      description: "Study 5 different subjects",  icon: "🧠", color: "#fb923c", isEarned: true,  earnedAt: "2024-02-01" },
];

// ─── Mock Achievements ─────────────────────────────────────────
export const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: "1", title: "Study Streak",    description: "Maintain a 7-day streak",      icon: "🔥", xpReward: 100, condition: "streak_7",     isCompleted: true,  completedAt: "2024-01-17" },
  { id: "2", title: "Flashcard Fanatic",description: "Review 200 flashcards",      icon: "⚡", xpReward: 150, condition: "flash_200",    isCompleted: true,  completedAt: "2024-01-25" },
  { id: "3", title: "Quiz Whiz",        description: "Complete 20 quizzes",         icon: "🧩", xpReward: 200, condition: "quiz_20",      isCompleted: false, progress: 13, total: 20 },
  { id: "4", title: "Focus Champion",   description: "Complete 50 focus sessions",  icon: "🎯", xpReward: 250, condition: "focus_50",     isCompleted: false, progress: 32, total: 50 },
  { id: "5", title: "Subject Explorer", description: "Study 5 different subjects",  icon: "🗺️", xpReward: 100, condition: "subjects_5",   isCompleted: true,  completedAt: "2024-02-01" },
  { id: "6", title: "Speed Learner",    description: "Finish a quiz in under 5min", icon: "⚡", xpReward: 75,  condition: "quiz_fast",    isCompleted: false, progress: 0, total: 1 },
];

// ─── Mock Notifications ────────────────────────────────────────
export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "1", type: "streak",      title: "🔥 Streak Alert!",          message: "You're on a 14-day streak! Keep it up!", timestamp: "5 min ago",   isRead: false },
  { id: "2", type: "achievement", title: "🏆 Achievement Unlocked",   message: 'You earned "Flash Master" badge!',       timestamp: "1 hour ago",  isRead: false },
  { id: "3", type: "reminder",    title: "📚 Study Time!",            message: "You haven't studied today yet.",         timestamp: "3 hours ago", isRead: false },
  { id: "4", type: "quiz",        title: "🧩 New Quiz Available",     message: "Algebra Challenge quiz is ready.",       timestamp: "Yesterday",   isRead: true  },
  { id: "5", type: "tip",         title: "💡 Learning Tip",           message: "Try the Pomodoro technique for focus.",  timestamp: "2 days ago",  isRead: true  },
  { id: "6", type: "system",      title: "🎉 Welcome Back!",          message: "Your AI Tutor has new features.",        timestamp: "3 days ago",  isRead: true  },
];

// ─── Quick Actions ─────────────────────────────────────────────
export const QUICK_ACTIONS = [
  { label: "AI Tutor",   href: "/ai-tutor",   icon: "Bot",          color: "from-violet-600 to-purple-700",   description: "Chat with AI" },
  { label: "Flashcards", href: "/flashcards",  icon: "BookOpen",     color: "from-blue-600 to-cyan-600",       description: "Review cards" },
  { label: "AI Quiz",    href: "/quiz",        icon: "BrainCircuit", color: "from-emerald-600 to-teal-600",    description: "Test knowledge" },
  { label: "Focus",      href: "/focus",       icon: "Timer",        color: "from-orange-500 to-red-500",      description: "Pomodoro timer" },
] as const;

// ─── Colors ────────────────────────────────────────────────────
export const DIFFICULTY_COLORS: Record<string, string> = {
  easy:   "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  medium: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  hard:   "text-red-400 bg-red-400/10 border-red-400/20",
};

export const PRIORITY_COLORS: Record<string, string> = {
  low:    "text-blue-400 bg-blue-400/10",
  medium: "text-amber-400 bg-amber-400/10",
  high:   "text-red-400 bg-red-400/10",
};
