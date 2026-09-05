import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  LayoutDashboard,
  Plus,
  Car,
  PoundSterling,
  CalendarDays,
  Users,
  Receipt,
  Menu,
  X
} from "lucide-react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [summary, setSummary] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  async function loadSummary() {
    const { data, error } = await supabase
      .from("revenue_summary")
      .select("*")
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setSummary(data);
  }

  useEffect(() => {
    loadSummary();
  }, []);

  const money = (value) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP"
    }).format(value || 0);

  return (
    <div className="app">

      <header className="topbar">
        <div>
          <h1>Drive Victoria's</h1>
          <span>Business Manager</span>
        </div>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {menuOpen && (
        <nav className="mobile-menu">
          <button>
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button>
            <Users size={18} />
            Students
          </button>

          <button>
            <CalendarDays size={18} />
            Calendar
          </button>

          <button>
            <Receipt size={18} />
            Expenses
          </button>
        </nav>
      )}

      <main>

        <section className="welcome">
          <div>
            <p className="eyebrow">BUSINESS OVERVIEW</p>
            <h2>Welcome back 👋</h2>
            <p>Here's how your driving school is doing.</p>
          </div>

          <button className="add-button">
            <Plus size={20} />
            Add Lesson
          </button>
        </section>

        <section className="stats">

          <div className="stat-card today">
            <div className="icon">
              <PoundSterling size={22} />
            </div>

            <span>Today's Revenue</span>

            <strong>
              {summary ? money(summary.today_revenue) : "£0.00"}
            </strong>

            <small>
              {summary?.today_lessons || 0} lessons
            </small>
          </div>

          <div className="stat-card">
            <div className="icon">
              <CalendarDays size={22} />
            </div>

            <span>This Week</span>

            <strong>
              {summary ? money(summary.weekly_revenue) : "£0.00"}
            </strong>

            <small>
              {summary?.weekly_lessons || 0} lessons
            </small>
          </div>

          <div className="stat-card">
            <div className="icon">
              <Receipt size={22} />
            </div>

            <span>This Month</span>

            <strong>
              {summary ? money(summary.monthly_revenue) : "£0.00"}
            </strong>

            <small>
              {summary?.monthly_lessons || 0} lessons
            </small>
          </div>

          <div className="stat-card">
            <div className="icon">
              <Car size={22} />
            </div>

            <span>This Year</span>

            <strong>
              {summary ? money(summary.yearly_revenue) : "£0.00"}
            </strong>

            <small>
              {summary?.yearly_lessons || 0} lessons
            </small>
          </div>

        </section>

        <section className="quick-actions">

          <h3>Quick Actions</h3>

          <div className="action-grid">

            <button>
              <Plus size={24} />
              <span>Add Lesson</span>
              <small>Record income</small>
            </button>

            <button>
              <Users size={24} />
              <span>Add Student</span>
              <small>Create student profile</small>
            </button>

            <button>
              <Receipt size={24} />
              <span>Add Expense</span>
              <small>Record business cost</small>
            </button>

            <button>
              <CalendarDays size={24} />
              <span>Calendar</span>
              <small>View your lessons</small>
            </button>

          </div>

        </section>

      </main>

      <footer>
        Drive Victoria's Business Manager
      </footer>

    </div>
  );
}

export default App;

