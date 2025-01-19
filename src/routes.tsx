import { BrowserRouter, Route, Routes } from "react-router-dom";

import PublicPage from "./pages/PublicPage";
// import LoginPage from './pages/LoginPage';
// import AdminPage from './pages/AdminHomePage';
// import MemberPage from './pages/MemberHomePage';

// import { AuthenticationTitle } from "../pages/login";
// import { SignUpForm } from "../pages/signup";
// import ContactsPage from "../pages/contacts";
// import Dashboard from "../pages/dashboard";
// import Scheduler from "../pages/schedule";
// import SettingsPage from "../pages/settings";
// import ApiPage from "../pages/apiPage";
// import NotificationPage from "../pages/notifications";
// import { ForgotPassword } from "../pages/resetPassword";
// import Website from "../pages/website";
import { NothingFoundBackground } from "./pages/NothingFound";
import { AuthProvider } from "./utils/auth";
import { AuthenticationForm } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { Coordinator } from "./pages/Coordinator";
import { ClassView } from "./pages/ClassView";
import { UserProfile } from "./pages/UserProfile";
export default function AllRoutes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicPage />} />
          <Route path="*" element={<NothingFoundBackground />} />
          <Route path="/login" element={<AuthenticationForm />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/coordinator" element={<Coordinator />} />
          <Route path="/classview/:id" element={<ClassView />} />
          <Route path="/userprofile" element={<UserProfile />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
