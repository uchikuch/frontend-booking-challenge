import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchBookings();
        setBookings([]);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    getData();
  }, []);

  const markAsCompleted = (bookingId) => {
    setBookings(bookings);
  };

  return (
    <div>
      <h2>Upcoming Bookings</h2>

      {/* Table of bookings */}
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Date/Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
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
