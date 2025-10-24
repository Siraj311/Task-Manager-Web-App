import React, { useEffect, useState } from "react";
import axiosPrivate from "../api/axios";
import "../styles/DashboardCards.css";

const DashboardCards = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTasks: 0,
    inProgress: 0,
    completed: 0,
  });

  // useEffect(() => {
  //   const fetchStats = async () => {
  //     try {
  //       const [usersRes, tasksRes] = await Promise.all([
  //         axiosPrivate.get("/users/count"),
  //         axiosPrivate.get("/tasks/counts"),
  //       ]);

  //       setStats({
  //         totalUsers: usersRes.data.count,
  //         totalTasks: tasksRes.data.total,
  //         inProgress: tasksRes.data.inProgress,
  //         completed: tasksRes.data.completed,
  //       });
  //     } catch (err) {
  //       console.error("Failed to fetch stats", err);
  //     }
  //   };

  //   fetchStats();
  // }, []);

  return (
    <div className="dashboard-cards">
      <div className="card total-users">
        <h3>Total Users</h3>
        <p>{stats.totalUsers}</p>
      </div>

      <div className="card total-tasks">
        <h3>Total Tasks</h3>
        <p>{stats.totalTasks}</p>
      </div>

      <div className="card in-progress-tasks">
        <h3>In Progress</h3>
        <p>{stats.inProgress}</p>
      </div>

      <div className="card completed-tasks">
        <h3>Completed</h3>
        <p>{stats.completed}</p>
      </div>
    </div>
  );
};

export default DashboardCards;