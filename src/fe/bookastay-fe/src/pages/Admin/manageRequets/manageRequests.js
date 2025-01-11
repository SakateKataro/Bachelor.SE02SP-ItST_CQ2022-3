import React, { useState, useEffect } from 'react';
import './manageRequests.css';
import icons from "~/assets/icon";

function ManageRequests() {
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null); // Request được chọn
  const [inputPage, setInputPage] = useState('');

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/hotels/admin/dashboard/ga/request');
      const data = await response.json();
      setRequests(data);
      setTotalPages(Math.ceil(data.length / itemsPerPage));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleGoToPage = () => {
    const page = parseInt(inputPage, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    } else {
      alert(`Please enter a valid page number between 1 and ${totalPages}`);
    }
  };

  // Lấy danh sách requests cho trang hiện tại
  const currentRequests = requests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Xử lý click vào hàng
  const handleRowClick = (request) => {
    setSelectedRequest(request); // Lưu request được chọn
  };

  // Xử lý Accept và Reject
  const handleAction = async (action) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/hotels/admin/dashboard/ga/request/${selectedRequest.hotel_id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action }),
        }
      );
      if (response.ok) {
        alert(`Request has been ${action.toLowerCase()}ed successfully!`);
        setSelectedRequest(null); // Đặt lại request được chọn
        fetchRequests(); // Cập nhật lại danh sách requests
      } else {
        console.error('Error processing action:', await response.text());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="d-flex flex-column px-5 py-3 m-5 requests">
      <div className='d-flex justify-content-between mb-3'>
        <div className="title">Requests</div>
        <div className="text-white p-4 rounded text-center box" style={{ width: '20%' }}>
          <h3>Total Requests</h3>
          <h1>{requests.length}</h1>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : selectedRequest ? (
        // Hiển thị chi tiết request
        <div className="request-details mt-4">
          <p><strong>ID:</strong> {selectedRequest.hotel_id}</p>
          <p><strong>Name:</strong> {selectedRequest.hotel_name}</p>
          <p><strong>Email:</strong> {selectedRequest.hotel_email}</p>
          <p><strong>Status:</strong> {selectedRequest.hotel_status}</p>
          <p><strong>Address:</strong> {selectedRequest.location_detailAddress}</p>
          <p><strong>Created At:</strong> {new Date(selectedRequest.createdat).toLocaleString()}</p>

          <div className="mt-5">
            <div className='my-5 d-flex justify-content-evenly'>
              <button
                className="btn btn-success" style={{ fontSize: '20px', padding: '5px 15px' }}
                onClick={() => handleAction('Accept')}
              >
                Accept
                <img src={icons.checkIcon} className="icon ms-4" alt="check-icon"/>
              </button>
              <button
                className="btn btn-danger" style={{ fontSize: '20px', padding: '5px 15px' }}
                onClick={() => handleAction('Reject')}
              >
                Reject
                <img src={icons.closeIcon} className="icon ms-4" alt="close-icon"/>
              </button>
            </div>
          </div>
          <button
            className="btn btn-secondary mt-5" style={{ fontSize: '20px', padding: '5px 15px' }}
            onClick={() => setSelectedRequest(null)}
          >
            <img src={icons.arrowLeftIcon} className="icon me-4" alt="arrow-left-icon"/>
            Back to List
          </button>
        </div>
      ) : (
        <>
          <table className="table table-hover">
            <thead className='table-dark fs-3'>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Address</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {currentRequests.map((request) => (
                <tr key={request.hotel_id} onClick={() => handleRowClick(request)}>
                  <td>{request.hotel_id}</td>
                  <td>{request.hotel_name}</td>
                  <td>{request.hotel_email}</td>
                  <td>{request.hotel_status}</td>
                  <td>{request.location_detailAddress}</td>
                  <td>{new Date(request.createdat).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-evenly align-items-center mt-4">
            <button
              className="btn" style={{ backgroundColor: '#1C2D6E' }}
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <img src={icons.chevronLeftPinkIcon} className="left-icon icon m-2" alt="chevron-left-icon"/>
            </button>
            <span className="fs-2">
              {currentPage} / {totalPages}
            </span>
            <div className="d-flex justify-content-center align-items-center">
              <input
                type="number"
                value={inputPage}
                onChange={(e) => setInputPage(e.target.value)}
                className="form-control mx-2 fs-4"
                placeholder="Page"
                style={{ width: '100px', padding: "5px 15px" }}
              />
              <button
                onClick={handleGoToPage}
                className="btn btn-success mx-2 fs-4" style={{ padding: "5px 15px" }}
              >
                Go to
              </button>
            </div>
            <button
              className="btn" style={{ backgroundColor: '#1C2D6E' }}
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <img src={icons.chevronRightPinkIcon} className="right-icon icon m-2" alt="chevron-right-icon"/>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ManageRequests;
