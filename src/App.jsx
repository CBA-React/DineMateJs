import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import store from "./store";

// Layouts
import AuthLayout from "./components/layout/AuthLayout";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Public Pages
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { VerificationCode } from "./pages/auth/VerificationCode";
import ResetPassword from "./pages/auth/ResetPassword";

// Onboarding
import { OnboardingLayout } from "./components/layout/OnboardingLayout";
import { StepPhotos } from "./pages/onboarding/steps/StepPhotos";
import { StepAbout } from "./pages/onboarding/steps/StepAbout";
import { StepInterests } from "./pages/onboarding/steps/StepInterests";
import { StepQuiz } from "./pages/onboarding/steps/StepQuiz";

import LayoutSwitch from "./components/layout/LayoutSwitch";
import HomeSwitch from "./pages/HomeSwitch";
import RequireAuth from "./router/RequireAuth";
import Discover from "./pages/Discover";
import Matches from "./pages/Matches";
import Profile from "./pages/Profile";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<LayoutSwitch />}>
              <Route index element={<HomeSwitch />} />

              <Route element={<RequireAuth />}>
                <Route index element={<Navigate to="discover" replace />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/matches" element={<Matches />} />
                <Route path="/profile/:profileId/*" element={<Profile />} />
                {/* <Route path="/dining" element={<Dining />} /> */}
                {/* <Route path="/events" element={<Events />} /> */}
                <Route path="*" element={<Navigate to="/discover" replace />} />
              </Route>

              {/* <Route path="/why-us" element={<WhyUs />} /> */}
              {/* <Route path="/how-it-works" element={<HowItWorks />} /> */}
              {/* <Route path="/restaurants" element={<Restaurants />} /> */}
              {/* <Route path="/stories" element={<Stories />} /> */}
            </Route>

            {/* Auth */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verification-code" element={<VerificationCode />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>

            {/* Onboarding */}
            <Route path="/onboarding" element={<OnboardingLayout />}>
              <Route index element={<Navigate to="photos" replace />} />
              <Route path="photos" element={<StepPhotos />} />
              <Route path="about" element={<StepAbout />} />
              <Route path="interests" element={<StepInterests />} />
              <Route path="quiz" element={<StepQuiz />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
