import React, { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import axios from "axios";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const AlertBell = () => {
  const [alerts, setAlerts] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);

  const stompClientRef = useRef(null);


  const fetchUnreadCount = async () => {
    const res = await axios.get(
      "http://localhost:9090/api/fraud/alerts/unread-count"
    );
    setUnreadCount(res.data || 0);
  };


  useEffect(() => {
    fetchUnreadCount();

    const client = new Client({
      webSocketFactory: () =>
        new SockJS("http://localhost:9090/ws"),
      reconnectDelay: 5000,

      onConnect: () => {
        client.subscribe("/topic/fraud-alerts", message => {
          const alert = JSON.parse(message.body);

          // increment unread count
          setUnreadCount(prev => prev + 1);

          // add alert to dropdown list
          setAlerts(prev => [alert, ...prev]);
        });
      },
    });

    client.activate();
    stompClientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, []);


  const openBell = async () => {
    const res = await axios.get(
      "http://localhost:9090/api/fraud/alerts/unread"
    );
    setAlerts(res.data || []);

    // 👁 mark as read immediately
    if (unreadCount > 0) {
      await axios.put(
        "http://localhost:9090/api/fraud/alerts/mark-read"
      );
      setUnreadCount(0);
    }

    setOpen(true);
  };


  const handleBellClick = () => {
    if (!open) {
      openBell();
    } else {
      setOpen(false);
      setAlerts([]);
    }
  };

  return (
    <div className="relative">
      {/* Bell */}
      <div
        onClick={handleBellClick}
        className="cursor-pointer relative"
      >
        {/* Shake UNTIL read */}
        <div
          className={`inline-block ${
            unreadCount > 0 ? "animate-bell" : ""
          }`}
        >
          <Bell className="w-6 h-6 text-gray-700 hover:text-red-600 transition" />
        </div>

        {/*  Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </div>

      {/* 📥 Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-96 bg-white shadow-xl rounded-xl border z-50">
          <div className="p-3 border-b font-semibold text-red-600">
            Fraud Alerts
          </div>

          {alerts.length === 0 ? (
            <div className="p-4 text-sm text-gray-500 text-center">
              No new fraud alerts
            </div>
          ) : (
            alerts.map(alert => (
              <div
                key={alert.transactionId}
                className="p-3 border-b hover:bg-red-50"
              >
                <p className="text-sm font-bold text-red-600">
                  🚨 Fraud Detected
                </p>
                <p className="text-xs">
                  Txn: {alert.transactionId}
                </p>
                <p className="text-xs">
                  Amount: ₹{alert.amount}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AlertBell;
