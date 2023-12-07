import "./App.css";
import { AuthForm } from "./component/component/AuthForm";
import { LoginForm } from "./component/component/LoginForm";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/auth" />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}
export default App;
