import { AuthProvider } from '../contexts/AuthContext';
import './App.css';
import MenuAppBar from './NavBar';
import Signup from './Signup';

function App() {
  return (
    <AuthProvider>
    <div className="App">
      <header className="App-header">
        {MenuAppBar()}
      </header>
      <main className="App-main">
        <Signup/>
      </main>
    </div>
    </AuthProvider>
  );
}

export default App;
