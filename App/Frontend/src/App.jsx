import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import SearchExplore from './pages/SearchExplore';
import Collections from './pages/Collections';
import GraphView from './pages/GraphView';
import { useStore } from './utils/store.js';
import { useAuthStore } from './store/auth.store.js';
import { useEffect } from 'react';
import AuthModal from './components/auth/AuthModal';

function App() {

  const fetchItems = useStore(state=>state.fetchItems)

  const initializeAuth = useAuthStore(state => state.initializeAuth)
  const isAuthenticated = useAuthStore(state=> state.isAuthenticated)
  const checkingAuth = useAuthStore(state => state.checkingAuth)

  useEffect(()=>{
    initializeAuth()
  }, [])

  useEffect(()=>{
    if(isAuthenticated){
      fetchItems()
    }
  }, [isAuthenticated])

  if (checkingAuth) {
  return (
    <div className="h-screen flex items-center justify-center">
      Loading...
    </div>
  );
}

  // 🔐 show login first
  if(!isAuthenticated){
    return (
      <AuthModal 
        isOpen={true}
        onClose={()=>{}}
      />
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="explore" element={<SearchExplore />} />
          <Route path="collections" element={<Collections />} />
          <Route path="graph" element={<GraphView />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

