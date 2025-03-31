import { useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./pages/Admin/Sidebar";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import Listings from "./redux/listings/Listings";
import AddListing from "./redux/listings/add/AddListing";
import ListingPage from "./redux/listings/ListingPage";
import Dashboard from "./pages/Admin/Dashboard";
import { getCategoryWiseCount, getListings } from "./redux/listings/listingService";
import { getEnums } from "./redux/enum/enumService";
import NotFound from "./pages/NotFound";
import PersistedLogin from "./components/PersistedLogin";
import ForgotPassword from "./pages/ForgotPassword";
import UpdateListing from "./redux/listings/add/UpdateListing";
import Start from "./pages/Start";
import Projects from "./pages/Admin/Projects";  // Update path based on your project structure
import PricingPlans from "./pages/PricingPlans";
import LeadPage from "./pages/Admin/LeadPage";
import AppointmentPage from "./pages/Admin/AppointmentPage";
import AgentPage from "./pages/Admin/AgentPage";
import SettingsPage from "./pages/Admin/SettingsPage";
import BrokerPlansPage from "./pages/Home/BrokerPlanPage";
import BuyersPlanPage from "./pages/Home/BuyersPlanPage";
import BuildersPage from "./pages/Home/BuildersPage";
import MonetizationPage from "./pages/Home/MonetizationPage";
import Support from "./pages/Admin/Support";
export default function App() {
  const callRef = useRef(false);
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth); // Ensure auth state is available
  const user = authState?.user || null; // Prevent destructuring errors

  useEffect(() => {
    if (!callRef.current) {
      dispatch(getCategoryWiseCount()).unwrap();
      dispatch(getListings()).unwrap();
      dispatch(getEnums()).unwrap();
      callRef.current = true;
    }
  }, [dispatch]);

  console.log(import.meta.env.VITE_BASE_URL);

  return (
    <div className="flex min-h-screen">
      {/* Show Sidebar only if user is logged in */}
      {user && (
        <div className="w-64 bg-gray-900 text-white min-h-screen">
          <Sidebar />
        </div>
      )}
      
      <div className="flex-grow p-6 text-black">
        <Routes>
          {/* Admin Routes (Protected) */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/appointment" element={<AppointmentPage />} />
            <Route path="/leads" element={<LeadPage />} />
            <Route path="/agents" element={<AgentPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/start" element={<Start />} />
            <Route path="/pricingplans" element={<PricingPlans />} />
            <Route path="/brokerplans" element={<BrokerPlansPage />} />
            <Route path="/buyerplans" element={<BuyersPlanPage />} />
            <Route path="/builderplans" element={<BuildersPage/>} />
            <Route path="/MonetizationPage" element={<MonetizationPage/>} />
            <Route path="/support" element={<Support/>} />



            <Route element={<PersistedLogin />}>
              <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<Profile />} />

                <Route path="/listings">
                  <Route index element={<Listings />} />
                  <Route path="add" element={<AddListing />} />
                  <Route path="update/:id" element={<UpdateListing />} />
                  <Route path=":id" element={<ListingPage />} />
                </Route>
              </Route>
            </Route>
          </Route>

          {/* Not Found Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}