import React from "react";
import { Outlet } from "react-router-dom";
import "./../App.css";
import Header from "../components/Header";

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
      <main className="min-h-screen container mx-auto">
        <Header/>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
// Prashant@supabase11