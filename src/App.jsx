// src/App.jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import store from "./store";

// Layouts
import AuthLayout from "./components/layout/AuthLayout";
import PublicLayout from "./components/layout/PublicLayout";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Public Pages
import Home from "./pages/Home";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { VerificationCode } from "./pages/auth/VerificationCode";
import ResetPassword from "./pages/auth/ResetPassword";

// Onboarding
import { OnboardingLayout } from "./components/layout/OnboardingLayout";
import { StepPhotos } from "./pages/onboarding/steps/StepPhotos";
import { StepAbout } from "./pages/onboarding/steps/StepAbout";
import { StepInterests } from "./pages/onboarding/steps/StepInterests";
import { StepQuiz } from "./pages/onboarding/steps/StepQuiz";

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
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
            </Route>

            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verification-code" element={<VerificationCode />} />
              <Route path="/reset-password" element={<ResetPassword/>} />
            </Route>

            {/* Onboarding Routes */}
            <Route path="/onboarding" element={<OnboardingLayout />}>
              <Route index element={<Navigate to="photos" replace />} />
              <Route path="photos" element={<StepPhotos />} />
              <Route path="about" element={<StepAbout />} />
              <Route path="interests" element={<StepInterests />} />
              <Route path="quiz" element={<StepQuiz />} />
            </Route>

            {/* 404 Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
