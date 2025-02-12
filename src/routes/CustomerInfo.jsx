import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../data/nav_menu";
import "../css/login.css";

function CustomerInfo() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [phoneOptions, setPhoneOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Thêm loading state
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy dữ liệu ban đầu từ localStorage nếu có
    setId(localStorage.getItem("id") || "");
    setName(localStorage.getItem("fullname") || "");
    setEmail(localStorage.getItem("email") || "");
    setPhone(localStorage.getItem("phone") || "");

    // Gợi ý danh sách số điện thoại mẫu
    setPhoneOptions(["0123456789", "0987654321", "0912345678", "0908765432"]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      setMessage("Please fill in all fields.");
      return;
    }

    const validatePhoneNumber = (number) => {
      const phoneRegex = /^[0-9]{10,12}$/; // Kiểm tra số điện thoại hợp lệ
      return phoneRegex.test(number);
    };

    if (!validatePhoneNumber(phone)) {
      setMessage("Invalid phone number. Please enter a valid number.");
      return;
    }

    const customerData = {
      id: id || undefined, // ID chỉ cần khi cập nhật
      fullname: name,
      email: email,
      phone: phone,
      updatedAt: new Date().toISOString(), // Thêm timestamp cập nhật
    };

    setIsLoading(true); // Bắt đầu loading

    try {
      const method = id ? "PUT" : "POST"; // Nếu có ID thì cập nhật, không thì tạo mới
      const url = id
        ? `https://676a0b77863eaa5ac0dd3616.mockapi.io/api/v1/login/${id}`
        : "https://676a0b77863eaa5ac0dd3616.mockapi.io/api/v1/login";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      });

      if (!response.ok) {
        throw new Error("Failed to update information");
      }

      const data = await response.json();

      // Cập nhật thông tin vào localStorage nếu cần thiết
      localStorage.setItem("id", data.id);
      localStorage.setItem("fullname", data.fullname);
      localStorage.setItem("email", data.email);
      localStorage.setItem("phone", data.phone);

      setMessage("Information updated successfully!");

      // Tự động quay lại trang chính sau 2 giây
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false); // Kết thúc loading
    }
  };

  return (
    <div>
      <div className="left-res">
        <button onClick={() => navigate("/user")}>
          <img src="/icon/left-svgrepo-com.svg" alt="" />
        </button>
      </div>
      <div className="background-pj-v2">
        <div className="panda-face">
          <div className="ear-l" id="ear-l"></div>
          <div className="ear-r" id="ear-r"></div>
          <div>
            <div className="eye-l" id="eye-l">
              <div className="eyeball-l" id="eyeL"></div>
            </div>
            <div className="eye-r" id="eye-r">
              <div className="eyeball-r" id="eyeR"></div>
            </div>
            <div className="blush-l" id="blush-l"></div>
            <div className="blush-r" id="blush-r"></div>
            <div className="nose" id="nose"></div>
            <div className="mouth" id="mouth"></div>
          </div>
          <div className="hand-l" id="handL"></div>
          <div className="hand-r" id="handR"></div>
          <div className="paw-l" id="paw-l"></div>
          <div className="paw-r" id="paw-r"></div>
        </div>

        <h2>Update Information</h2>
        <form onSubmit={handleSubmit} className="login_form">
          <div className="user-info">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name..."
            />
          </div>
          <div className="user-info">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
            />
          </div>
          <div className="user-info">
            <label>Phone:</label>
            <select value={phone} onChange={(e) => setPhone(e.target.value)}>
              <option value="">Select a phone number...</option>
              {phoneOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Or enter your phone number..."
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Information"}
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default CustomerInfo;
