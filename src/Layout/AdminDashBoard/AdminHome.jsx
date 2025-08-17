import React, { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import { Loader2 } from "lucide-react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
 // adjust if your path differs

// Define a color palette for the charts
const COLORS = ["#16A34A", "#FBBF24", "#EF4444", "#3B82F6", "#8B5CF6", "#EC4899"];

// Utility: format a date string (ISO) into YYYY-MM for grouping
const toYearMonth = (d) => {
  try {
    const dt = new Date(d);
    if (isNaN(dt.getTime())) return "Unknown";
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, "0");
    return `${y}-${m}`;
  } catch {
    return "Unknown";
  }
};

const StatCard = ({ label, value, sub }) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="mt-1 text-2xl font-semibold text-gray-900">{value}</div>
    {sub ? <div className="mt-1 text-xs text-gray-500">{sub}</div> : null}
  </div>
);

const Panel = ({ title, children, right }) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {right}
    </div>
    <div className="h-72 w-full">{children}</div>
  </div>
);

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [metrics, setMetrics] = useState({
    totalCourts: 0,
    totalUsers: 0,
    totalMembers: 0,
    totalAdmins: 0,
  });
  const [payments, setPayments] = useState([]);
  const [bookings, setBookings] = useState([]);

  // Fetch all data concurrently
  useEffect(() => {
    let mounted = true;
    const fetchAllData = async () => {
      setLoading(true);
      setError("");
      try {
        const [metricsRes, payRes, bookingsRes] = await Promise.all([
          axiosSecure.get("/admin/metrics"),
          axiosSecure.get("/payments"),
          axiosSecure.get("/bookings"),
        ]);

        if (!mounted) return;
        setMetrics({
          totalCourts: metricsRes.data.totalCourts ?? 0,
          totalUsers: metricsRes.data.totalUsers ?? 0,
          totalMembers: metricsRes.data.totalMembers ?? 0,
          totalAdmins: metricsRes.data.totalAdmins ?? 0,
        });
        setPayments(payRes.data || []);
        setBookings(bookingsRes.data || bookingsRes || []);
      } catch (e) {
        console.error("Dashboard data fetch error:", e);
        setError(
          e?.response?.data?.message || e?.message || "Failed to load dashboard data"
        );
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchAllData();

    return () => {
      mounted = false;
    };
  }, [axiosSecure]);

  // Derived data for cards
  const totalRevenue = useMemo(
    () => payments.reduce((sum, p) => sum + (Number(p.price) || 0), 0),
    [payments]
  );
  const totalBookings = bookings.length;
  const approvedCount = useMemo(
    () => bookings.filter((b) => b.status === "approved" || b.status === "confirmed").length,
    [bookings]
  );
  const approvalRate = totalBookings ? Math.round((approvedCount / totalBookings) * 100) : 0;

  // Chart data: Revenue by Month
  const revenueByMonth = useMemo(() => {
    const map = new Map();
    payments.forEach((p) => {
      const key = toYearMonth(p.createdAt || p.date || p.paymentDate);
      const val = Number(p.price) || 0;
      map.set(key, (map.get(key) || 0) + val);
    });
    return Array.from(map.entries())
      .sort((a, b) => (a[0] > b[0] ? 1 : -1))
      .map(([month, revenue]) => ({ month, revenue }));
  }, [payments]);

  // Chart data: Bookings by Status
  const bookingsByStatus = useMemo(() => {
    const map = new Map();
    bookings.forEach((b) => map.set(b.status, (map.get(b.status) || 0) + 1));
    return Array.from(map.entries()).map(([status, count]) => ({ status, count }));
  }, [bookings]);

  // Chart data: Users composition
  const usersPieData = useMemo(() => {
    const members = metrics.totalMembers || 0;
    const admins = metrics.totalAdmins || 0;
    const others = Math.max((metrics.totalUsers || 0) - members - admins, 0);
    return [
      { name: "Members", value: members },
      { name: "Admins", value: admins },
      { name: "General Users", value: others },
    ];
  }, [metrics]);

  if (loading) {
    return (
      <div className="flex h-80 items-center justify-center">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        <span className="text-sm text-gray-600">Loading overview…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Brand Overview</h2>
        <p className="text-sm text-gray-500">
          Key stats, revenue, and engagement at a glance.
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          sub="All-time payments"
        />
        <StatCard
          label="Total Bookings"
          value={totalBookings}
          sub={`${approvalRate}% approval / confirmed`}
        />
        <StatCard label="Courts" value={metrics.totalCourts} sub="Active courts in system" />
        <StatCard
          label="Users"
          value={metrics.totalUsers}
          sub={`${metrics.totalMembers} members • ${metrics.totalAdmins} admins`}
        />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Panel title="Revenue by Month">
          <ResponsiveContainer>
            <AreaChart data={revenueByMonth} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="url(#rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Bookings by Status">
          <ResponsiveContainer>
            <BarChart data={bookingsByStatus} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Bookings" radius={[6, 6, 0, 0]}>
                {bookingsByStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Users Composition">
          <ResponsiveContainer>
            <PieChart>
              <Tooltip formatter={(value) => `${value}`} />
              <Legend />
              <Pie
                data={usersPieData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {usersPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      {/* Recent payments table */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent Payments</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Transaction</th>
                <th className="py-2 pr-4">User</th>
                <th className="py-2 pr-4">Amount</th>
                <th className="py-2 pr-4">Method</th>
                <th className="py-2 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.slice(0, 8).map((p) => (
                <tr key={p._id || p.transactionId} className="border-b last:border-0">
                  <td className="py-2 pr-4">
                    {new Date(p.createdAt || p.date || Date.now()).toLocaleString()}
                  </td>
                  <td className="py-2 pr-4">{p.transactionId || "—"}</td>
                  <td className="py-2 pr-4">{p.userEmail || "—"}</td>
                  <td className="py-2 pr-4">${Number(p.price || 0).toLocaleString()}</td>
                  <td className="py-2 pr-4">{p.method || "card"}</td>
                  <td className="py-2 pr-4 capitalize">{p.status || "paid"}</td>
                </tr>
              ))}
              {!payments.length && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-gray-500">
                    No payments yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;