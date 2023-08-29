import { BrowserRouter } from 'react-router-dom'
import AnimatedRoutes from '../src/components/AnimatedRoutes'

function App() {

  return (
    <div className="overflow-hidden h-screen bg-gradient-to-r from-slate-950 to-indigo-950">
      <BrowserRouter>
        <div>
          <AnimatedRoutes/>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
