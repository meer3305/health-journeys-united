import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { Routes, Route } from "react-router-dom";
import { OverviewView } from "@/components/dashboard/views/OverviewView";
import { ProfileView } from "@/components/dashboard/views/ProfileView";
import { RecommendationsView } from "@/components/dashboard/views/RecommendationsView";
import { SavedView } from "@/components/dashboard/views/SavedView";
import { BookingsView } from "@/components/dashboard/views/BookingsView";
import { CareCardView } from "@/components/dashboard/views/CareCardView";
import { MessagesView } from "@/components/dashboard/views/MessagesView";
import { SettingsView } from "@/components/dashboard/views/SettingsView";

const Dashboard = () => {
  return (
    <CurrencyProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col min-w-0">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto bg-muted/20 p-4 sm:p-6 lg:p-8">
            <Routes>
              <Route index element={<OverviewView />} />
              <Route path="profile" element={<ProfileView />} />
              <Route path="recommendations" element={<RecommendationsView />} />
              <Route path="saved" element={<SavedView />} />
              <Route path="bookings" element={<BookingsView />} />
              <Route path="care-card" element={<CareCardView />} />
              <Route path="messages" element={<MessagesView />} />
              <Route path="settings" element={<SettingsView />} />
            </Routes>
          </main>
        </div>
      </div>
    </CurrencyProvider>
  );
};

export default Dashboard;
