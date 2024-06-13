import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { AppRouter } from '../router/AppRouter';




function App() {
  return (
    <div className="App">
      <Router>
        <AppRouter />
      </Router>

    </div>
  );
}

export default App;
 