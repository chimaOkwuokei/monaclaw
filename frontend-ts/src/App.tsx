import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/ui/layout";
import { OperatorDashboard, DeployAgent, Landing, PublicPage, ViewAgent, AgentPage, XLogin } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/deploy-agent" element={<DeployAgent />} />
          <Route path="/view-agent" element={<ViewAgent />} />
          <Route path="/dashboard" element={<OperatorDashboard />} />
           <Route path="/manage-agent" element={<AgentPage />} />
          <Route path="/public-page" element={<PublicPage />} />
          <Route path="/x-login" element={<XLogin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;