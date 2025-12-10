
"use client";
import { getToken } from "@/lib/auth";
import { jwtDecode } from "jwt-decode";
import React from "react";

interface JwtPayload {
  sub: number;
  username: string;
  role: string;
  exp: number;
  iat: number;
}

export default function DashboardHome() {
  const token = getToken();
  let username = "Guest";

  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);

      if (decoded.username) {
        username = decoded.username;
      }
    } catch (e) {
      console.error("Token decoding failed:", e);
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Welcome, <span className="text-blue-600">{username}</span>
      </h2>

      {/* Simple UI SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        
        {/* Card 1 */}
        <div className="p-4 border rounded-xl shadow bg-white">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold">124</p>
        </div>

        {/* Card 2 */}
        <div className="p-4 border rounded-xl shadow bg-white">
          <h3 className="text-lg font-semibold mb-2">Active Sessions</h3>
          <p className="text-3xl font-bold">12</p>
        </div>

        {/* Card 3 */}
        <div className="p-4 border rounded-xl shadow bg-white">
          <h3 className="text-lg font-semibold mb-2">Server Status</h3>
          <p className="text-green-600 font-bold">Online</p>
        </div>
      </div>

      {/* Bearer Token Section */}
      {token && (
        <div className="mt-6">
          <p className="font-semibold">Your Bearer Token:</p>
          <pre className="p-2 bg-slate-100 text-xs mt-2 break-all rounded">
            {token}
          </pre>
        </div>
      )}

      {/* Example button */}
      <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
        Do Action
      </button>
    </div>
  );
}