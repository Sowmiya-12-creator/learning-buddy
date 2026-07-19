// ─── User & Auth ───────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  joinedAt: string;
  subjects: string[];
  studyGoalMinutes: number;
  badges: Badge[];
  achievements: Achievement[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// ─── Messages & Chat ───────────────────────────────────────────
export type MessageRole = "user" | "assistant" | "system";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  isTyping?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  messageCount: number;
  subject?: string;
  messages: Message[];
}

// ─── Flashcards ────────────────────────────────────────────────
export type Difficulty = "easy" | "medium" | "hard";

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  subject: string;
  difficulty: Difficulty;
  nextReview?: string;
  reviewCount: number;
  correctCount: number;
  createdAt: string;
}

export interface FlashcardDeck {
  id: string;
  title: string;
  subject: string;
  cardCount: number;
  masteredCount: number;
  color: string;
  icon: string;
  flashcards: Flashcard[];
  lastStudied?: string;
}

// ─── Quiz ──────────────────────────────────────────────────────
export type QuestionType = "multiple-choice" | "true-false" | "short-answer";

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: QuestionType;
  options: QuizOption[];
  explanation?: string;
  subject: string;
  difficulty: Difficulty;
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  description: string;
  questionCount: number;
  durationMinutes: number;
  difficulty: Difficulty;
  icon: string;
  color: string;
  questions: QuizQuestion[];
  completedAt?: string;
  bestScore?: number;
}

export interface QuizResult {
  quizId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number;
  answers: Record<string, string>;
  completedAt: string;
}

// ─── Focus / Pomodoro ──────────────────────────────────────────
export type TimerMode = "focus" | "shortBreak" | "longBreak";

export interface PomodoroSession {
  id: string;
  mode: TimerMode;
  durationMinutes: number;
  completedAt: string;
  subject?: string;
}

export interface FocusStats {
  todaySessions: number;
  todayFocusMinutes: number;
  weeklyFocusMinutes: number;
  totalSessions: number;
  currentStreak: number;
}

// ─── Study Planner ─────────────────────────────────────────────
export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "todo" | "in-progress" | "done";

export interface StudyTask {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  estimatedMinutes: number;
  notes?: string;
  createdAt: string;
}

// ─── Progress & Stats ──────────────────────────────────────────
export interface StudySession {
  id: string;
  date: string;
  durationMinutes: number;
  subject: string;
  type: "quiz" | "flashcard" | "tutor" | "focus" | "reading";
  xpEarned: number;
}

export interface SubjectProgress {
  subject: string;
  color: string;
  icon: string;
  completionPercent: number;
  studyMinutes: number;
  quizzesCompleted: number;
  flashcardsReviewed: number;
}

export interface WeeklyActivity {
  day: string;
  minutes: number;
  date: string;
}

// ─── Achievements & Badges ─────────────────────────────────────
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earnedAt?: string;
  isEarned: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  condition: string;
  isCompleted: boolean;
  progress?: number;
  total?: number;
  completedAt?: string;
}

// ─── Notifications ─────────────────────────────────────────────
export type NotificationType =
  | "reminder"
  | "achievement"
  | "streak"
  | "quiz"
  | "system"
  | "tip";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

// ─── Onboarding ────────────────────────────────────────────────
export interface OnboardingData {
  selectedSubjects: string[];
  studyGoal: number;
  studyStyle: "visual" | "reading" | "practice" | "mixed";
  studyTime: "morning" | "afternoon" | "evening" | "night";
}

// ─── API Response ──────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
