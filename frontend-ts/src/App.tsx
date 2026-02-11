import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/ui/layout";
import { DashboardPage, DeployAgent, Landing, PublicPage, ViewAgent } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/deploy-agent" element={<DeployAgent />} />
          <Route path="/view-agent" element={<ViewAgent />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/public-page" element={<PublicPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;