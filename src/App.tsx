import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Home, BookOpen, Sigma, Bot, FileEdit, Loader2 } from 'lucide-react';
import HomeScreen from './screens/HomeScreen';
import LearnScreen from './screens/LearnScreen';
import AIScreen from './screens/AIScreen';
import PaperScreen from './screens/PaperScreen';
import ModelsScreen from './screens/ModelsScreen';
import ProfileScreen from './screens/ProfileScreen';
import CasesScreen from './screens/CasesScreen';
import CodeTemplatesScreen from './screens/CodeTemplatesScreen';
import CodePlaygroundScreen from './screens/CodePlaygroundScreen';
import PromptsScreen from './screens/PromptsScreen';
import MathFoundationScreen from './screens/MathFoundationScreen';
import ModelLessonScreen from './screens/ModelLessonScreen';
import PythonCourseScreen from './screens/PythonCourseScreen';
import MatlabCourseScreen from './screens/MatlabCourseScreen';
import BookMathModelScreen from './screens/BookMathModelScreen';
import BookAlgorithmScreen from './screens/BookAlgorithmScreen';
import BookORScreen from './screens/BookORScreen';
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import ForgotPasswordScreen from './screens/auth/ForgotPasswordScreen';
import WorkbenchHome from './screens/app/WorkbenchHome';
import ProjectDetailScreen from './screens/app/ProjectDetailScreen';
import ProjectChatScreen from './screens/app/ProjectChatScreen';
import AppProfileScreen from './screens/app/ProfileScreen';
import { ProtectedRoute, PublicRoute } from './components/AuthRoutes';
import { useAuth } from './contexts/AuthContext';

export default function App() {
  const { loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.startsWith('/learn')) return 'learn';
    if (path.startsWith('/models')) return 'models';
    if (path.startsWith('/ai')) return 'ai';
    if (path.startsWith('/paper')) return 'paper';
    return 'home';
  };

  const activeTab = getActiveTab();

  const legacyNavigate = (name: string, params: any = {}) => {
    switch (name) {
      case 'home': navigate('/'); break;
      case 'learn': navigate('/learn'); break;
      case 'models': navigate('/models'); break;
      case 'ai': navigate('/ai', { state: params }); break;
      case 'paper': navigate('/paper'); break;
      case 'profile': navigate('/profile'); break;
      case 'cases': navigate('/cases'); break;
      case 'code': navigate('/code'); break;
      case 'playground': navigate('/playground', { state: params }); break;
      case 'prompts': navigate('/prompts', { state: params }); break;
      case 'math_foundation': navigate('/math-foundation'); break;
      case 'model_lesson': navigate('/model-lesson', { state: params }); break;
      case 'python_course': navigate('/python-course'); break;
      case 'matlab_course': navigate('/matlab-course'); break;
      case 'book_math': navigate('/book-math', { state: params }); break;
      case 'book_algorithm': navigate('/book-algorithm'); break;
      case 'book_or': navigate('/book-or'); break;
      case '/login': navigate('/login'); break;
      case '/register': navigate('/register'); break;
      case '/app': navigate('/app'); break;
      default: navigate('/');
    }
  };

  const showNav = !['/login', '/register', '/forgot-password'].includes(location.pathname) && !location.pathname.includes('/chat');

  return (
    <div className="w-full max-w-md mx-auto bg-background min-h-screen relative shadow-2xl overflow-hidden font-sans text-on-surface selection:bg-primary/20">
      <main className="w-full h-full relative z-0 pb-20">
        <Routes>
          <Route path="/" element={loading ? <PageLoader /> : <HomeScreen navigate={legacyNavigate} />} />
          <Route path="/login" element={<PublicRoute><LoginScreen /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><RegisterScreen /></PublicRoute>} />
          <Route path="/forgot-password" element={<PublicRoute><ForgotPasswordScreen /></PublicRoute>} />

          <Route path="/learn" element={<LearnScreen navigate={legacyNavigate} />} />
          <Route path="/models" element={<ModelsScreen navigate={legacyNavigate} />} />
          <Route path="/ai" element={<ProtectedRoute><AIScreen navigate={legacyNavigate} /></ProtectedRoute>} />
          <Route path="/paper" element={<PaperScreen navigate={legacyNavigate} />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/cases" element={<CasesScreen navigate={legacyNavigate} />} />
          <Route path="/code" element={<CodeTemplatesScreen navigate={legacyNavigate} />} />
          <Route path="/playground" element={<CodePlaygroundScreen navigate={legacyNavigate} />} />
          <Route path="/prompts" element={<PromptsScreen navigate={legacyNavigate} />} />
          <Route path="/math-foundation" element={<MathFoundationScreen navigate={legacyNavigate} />} />
          <Route path="/model-lesson" element={<ModelLessonScreen navigate={legacyNavigate} />} />
          <Route path="/python-course" element={<PythonCourseScreen navigate={legacyNavigate} />} />
          <Route path="/matlab-course" element={<MatlabCourseScreen navigate={legacyNavigate} />} />
          <Route path="/book-math" element={<BookMathModelScreen navigate={legacyNavigate} />} />
          <Route path="/book-algorithm" element={<BookAlgorithmScreen navigate={legacyNavigate} />} />
          <Route path="/book-or" element={<BookORScreen navigate={legacyNavigate} />} />

          <Route path="/app" element={<ProtectedRoute><WorkbenchHome /></ProtectedRoute>} />
          <Route path="/app/profile" element={<ProtectedRoute><AppProfileScreen /></ProtectedRoute>} />
          <Route path="/app/projects/:id" element={<ProtectedRoute><ProjectDetailScreen /></ProtectedRoute>} />
          <Route path="/app/projects/:id/chat" element={<ProtectedRoute><ProjectChatScreen /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {showNav && (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-surface/90 backdrop-blur-lg border-t border-surface-dim/40 px-4 py-2 flex justify-between items-center z-50 rounded-t-2xl">
          <NavItem icon={<Home />} label="首页" isActive={activeTab === 'home'} onClick={() => navigate('/')} />
          <NavItem icon={<BookOpen />} label="学习" isActive={activeTab === 'learn'} onClick={() => navigate('/learn')} />
          <NavItem icon={<Sigma />} label="模型" isActive={activeTab === 'models'} onClick={() => navigate('/models')} />
          <NavItem icon={<Bot />} label="AI" isActive={activeTab === 'ai'} onClick={() => navigate('/ai')} />
          <NavItem icon={<FileEdit />} label="论文" isActive={activeTab === 'paper'} onClick={() => navigate('/paper')} />
        </nav>
      )}
    </div>
  );
}

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }: any) {
  return (
    <button onClick={onClick} className="flex flex-col items-center justify-center p-1 w-14 group">
      <div className={`p-1.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-secondary/15 text-secondary scale-110' : 'text-on-surface-variant group-hover:text-primary/70'}`}>
        {icon}
      </div>
      <span className={`text-[10px] mt-1 font-bold transition-colors ${isActive ? 'text-secondary' : 'text-on-surface-variant font-medium'}`}>{label}</span>
    </button>
  );
}
