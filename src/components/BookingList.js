import React, { useEffect, useState } from "react";
import Search from "./Search";

// Mocked booking data (pretend it's from an API)
const fetchBookings = async () => {
  // Simulating network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  // Example data
  return [
    {
      id: 1,
      studentName: "Alice",
      dateTime: "2025-03-10T09:00",
      status: "Scheduled",
    },
    {
      id: 2,
      studentName: "Bob",
      dateTime: "2025-03-10T10:00",
      status: "Scheduled",
    },
    {
      id: 3,
      studentName: "Charlie",
      dateTime: "2025-03-10T11:00",
      status: "Scheduled",
    },
  ];
};

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchBookings();
        setBookings(data);
        setFilteredBookings(data)
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    getData();
  }, []);

  const markAsCompleted = (bookingId) => {
    const bookingData = bookings.map((booking) => {
      if (booking.id === bookingId) {
        booking.status = "Completed";
        return booking;
      } else {
        return booking;
      }
    });
    setBookings(bookingData);
    setFilteredBookings(bookingData)
  };

  const handleSearch = (name) => {
    if (name.trim() === "") {
      setFilteredBookings(bookings);
    } else {
      const bookingData = bookings.filter((booking) => booking.studentName.toLowerCase().includes(name.toLowerCase()));
      setFilteredBookings(bookingData);
    }
  };

  return (
    <div>
      <h2>Upcoming Bookings</h2>

      <Search onSearch={handleSearch} />

      {/* Table of bookings */}
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date/Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.studentName}</td>
                <td>{new Date(booking.dateTime).toLocaleString()}</td>
                <td>{booking.status}</td>
                <td>
                  {booking.status !== "Completed" && (
                    <button onClick={() => markAsCompleted(booking.id)}>
                      Complete
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No bookings found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BookingList;
