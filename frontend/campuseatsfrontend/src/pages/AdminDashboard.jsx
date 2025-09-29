import React, { useEffect, useState } from "react";
import {
  getAdminDashboard,
  deleteUser,
  promoteToVendor,
  promoteToAdmin,
} from "../api/adminApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Users,
  Trash2,
  TrendingUp,
  Shield,
  Search,
  Filter,
  RefreshCw,
  Crown,
  Store,
  GraduationCap,
  ChevronDown,
} from "lucide-react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [stats, setStats] = useState({
    total: 0,
    students: 0,
    vendors: 0,
    admins: 0,
  });

  const token = localStorage.getItem("token");
  const superAdminEmail = "barathmahendrakumar@gmail.com";
  const currentUserEmail = localStorage.getItem("email");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAdminDashboard(token);
      setUsers(data.users);
      setFilteredUsers(data.users);

      // Calculate stats
      const statsData = {
        total: data.users.length,
        students: data.users.filter((u) => u.role === "student").length,
        vendors: data.users.filter((u) => u.role === "vendor").length,
        admins: data.users.filter((u) => u.role === "admin").length,
      };
      setStats(statsData);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("You must be logged in as admin");
      return;
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Role filter
    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    setFilteredUsers(filtered);
  }, [searchTerm, roleFilter, users]);

  const handleDelete = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to delete ${userName}?`)) return;

    try {
      await deleteUser(userId, token);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  const handlePromoteVendor = async (userId, userName) => {
    if (!window.confirm(`Promote ${userName} to Vendor?`)) return;

    try {
      await promoteToVendor(userId, token);
      toast.success("User promoted to vendor successfully");
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to promote user");
    }
  };

  const handlePromoteAdmin = async (userId, userName) => {
    if (currentUserEmail !== superAdminEmail) {
      toast.error("Only super admin can promote to admin");
      return;
    }

    if (
      !window.confirm(`Promote ${userName} to Admin? This grants full access.`)
    )
      return;

    try {
      await promoteToAdmin(userId, token);
      toast.success("User promoted to admin successfully");
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to promote user");
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "#ef4444";
      case "vendor":
        return "#f59e0b";
      case "student":
        return "#3b82f6";
      default:
        return "#6b7280";
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <Shield size={14} />;
      case "vendor":
        return <Store size={14} />;
      case "student":
        return <GraduationCap size={14} />;
      default:
        return <Users size={14} />;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        * {
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', sans-serif;
          background: #f8fafc;
        }

        .admin-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 20px;
        }

        .admin-wrapper {
          max-width: 1400px;
          margin: 0 auto;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 20px;
        }

        .admin-title {
          display: flex;
          align-items: center;
          gap: 12px;
          color: white;
          margin: 0;
          font-size: 32px;
          font-weight: 700;
        }

        .refresh-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .refresh-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .refresh-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .stat-label {
          font-size: 14px;
          color: #6b7280;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stat-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .stat-value {
          font-size: 36px;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
        }

        .main-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .card-header {
          padding: 30px;
          border-bottom: 1px solid #e5e7eb;
        }

        .controls-row {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .search-wrapper {
          flex: 1;
          min-width: 250px;
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }

        .search-input {
          width: 100%;
          padding: 14px 16px 14px 48px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 14px;
          transition: all 0.3s ease;
          outline: none;
        }

        .search-input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .filter-wrapper {
          position: relative;
        }

        .filter-select {
          padding: 14px 40px 14px 48px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          outline: none;
          background: white;
          appearance: none;
        }

        .filter-select:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .filter-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          pointer-events: none;
        }

        .chevron-icon {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          pointer-events: none;
        }

        .results-info {
          color: #6b7280;
          font-size: 14px;
          font-weight: 500;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        .users-table {
          width: 100%;
          border-collapse: collapse;
        }

        .users-table thead {
          background: #f9fafb;
          border-bottom: 2px solid #e5e7eb;
        }

        .users-table th {
          padding: 16px 20px;
          text-align: left;
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .users-table td {
          padding: 20px;
          border-bottom: 1px solid #f3f4f6;
          font-size: 14px;
        }

        .users-table tbody tr {
          transition: background-color 0.2s ease;
        }

        .users-table tbody tr:hover {
          background: #f9fafb;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #e5e7eb;
        }

        .user-details {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 2px;
        }

        .user-email {
          font-size: 13px;
          color: #6b7280;
        }

        .role-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          text-transform: capitalize;
          color: white;
        }

        .super-admin-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          border-radius: 6px;
          font-size: 10px;
          font-weight: 700;
          color: white;
          margin-left: 8px;
        }

        .actions-cell {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .action-btn:hover {
          transform: translateY(-2px);
        }

        .btn-delete {
          background: #fee2e2;
          color: #dc2626;
        }

        .btn-delete:hover {
          background: #fecaca;
        }

        .btn-vendor {
          background: #fef3c7;
          color: #d97706;
        }

        .btn-vendor:hover {
          background: #fde68a;
        }

        .btn-admin {
          background: #dbeafe;
          color: #2563eb;
        }

        .btn-admin:hover {
          background: #bfdbfe;
        }

        .btn-admin:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #e5e7eb;
          border-top: 4px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .loading-text {
          margin-top: 20px;
          color: #6b7280;
          font-size: 16px;
          font-weight: 500;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
        }

        .empty-icon {
          width: 80px;
          height: 80px;
          background: #f3f4f6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: #9ca3af;
        }

        .empty-title {
          font-size: 20px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 8px;
        }

        .empty-text {
          color: #6b7280;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .admin-container {
            padding: 20px 10px;
          }

          .admin-title {
            font-size: 24px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .controls-row {
            flex-direction: column;
          }

          .search-wrapper {
            min-width: 100%;
          }

          .users-table {
            font-size: 12px;
          }

          .users-table th,
          .users-table td {
            padding: 12px;
          }

          .actions-cell {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="admin-container">
        <div className="admin-wrapper">
          {/* Header */}
          <div className="admin-header">
            <h1 className="admin-title">
              <Shield size={36} />
              Admin Dashboard
            </h1>
            <button
              className="refresh-btn"
              onClick={fetchUsers}
              disabled={loading}
            >
              <RefreshCw size={18} />
              Refresh
            </button>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Total Users</span>
                <div
                  className="stat-icon"
                  style={{
                    background: "linear-gradient(135deg, #667eea, #764ba2)",
                  }}
                >
                  <Users size={20} />
                </div>
              </div>
              <h2 className="stat-value">{stats.total}</h2>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Students</span>
                <div
                  className="stat-icon"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                  }}
                >
                  <GraduationCap size={20} />
                </div>
              </div>
              <h2 className="stat-value">{stats.students}</h2>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Vendors</span>
                <div
                  className="stat-icon"
                  style={{
                    background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  }}
                >
                  <Store size={20} />
                </div>
              </div>
              <h2 className="stat-value">{stats.vendors}</h2>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Admins</span>
                <div
                  className="stat-icon"
                  style={{
                    background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  }}
                >
                  <Shield size={20} />
                </div>
              </div>
              <h2 className="stat-value">{stats.admins}</h2>
            </div>
          </div>

          {/* Main Table Card */}
          <div className="main-card">
            <div className="card-header">
              <div className="controls-row">
                <div className="search-wrapper">
                  <Search size={18} className="search-icon" />
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="filter-wrapper">
                  <Filter size={18} className="filter-icon" />
                  <select
                    className="filter-select"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                  >
                    <option value="all">All Roles</option>
                    <option value="student">Students</option>
                    <option value="vendor">Vendors</option>
                    <option value="admin">Admins</option>
                  </select>
                  <ChevronDown size={16} className="chevron-icon" />
                </div>
              </div>

              <div className="results-info">
                Showing {filteredUsers.length} of {users.length} users
              </div>
            </div>

            {loading ? (
              <div className="loading-container">
                <div className="spinner"></div>
                <p className="loading-text">Loading users...</p>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <Users size={40} />
                </div>
                <h3 className="empty-title">No users found</h3>
                <p className="empty-text">
                  {searchTerm || roleFilter !== "all"
                    ? "Try adjusting your search or filter"
                    : "No users available"}
                </p>
              </div>
            ) : (
              <div className="table-wrapper">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user._id}>
                        <td>
                          <div className="user-info">
                            <img
                              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                user.fullName
                              )}&background=random&size=40`}
                              alt={user.fullName}
                              className="user-avatar"
                            />
                            <div className="user-details">
                              <div className="user-name">
                                {user.fullName}
                                {user.email === superAdminEmail && (
                                  <span className="super-admin-badge">
                                    <Crown size={12} />
                                    SUPER
                                  </span>
                                )}
                              </div>
                              <div className="user-email">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span
                            className="role-badge"
                            style={{ background: getRoleBadgeColor(user.role) }}
                          >
                            {getRoleIcon(user.role)}
                            {user.role}
                          </span>
                        </td>
                        <td>
                          <div className="actions-cell">
                            <button
                              className="action-btn btn-delete"
                              onClick={() =>
                                handleDelete(user._id, user.fullName)
                              }
                              disabled={user.email === superAdminEmail}
                              title="Delete User"
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>

                            {user.role === "student" && (
                              <button
                                className="action-btn btn-vendor"
                                onClick={() =>
                                  handlePromoteVendor(user._id, user.fullName)
                                }
                                title="Promote to Vendor"
                              >
                                <TrendingUp size={14} />
                                Vendor
                              </button>
                            )}

                            {user.role !== "admin" && (
                              <button
                                className="action-btn btn-admin"
                                onClick={() =>
                                  handlePromoteAdmin(user._id, user.fullName)
                                }
                                disabled={currentUserEmail !== superAdminEmail}
                                title={
                                  currentUserEmail !== superAdminEmail
                                    ? "Only Super Admin can promote"
                                    : "Promote to Admin"
                                }
                              >
                                <Shield size={14} />
                                Admin
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
};

export default AdminDashboard;
