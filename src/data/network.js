const navigate = useNavigate();
const [data, setData] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [isNetworkError, setIsNetworkError] = useState(false);
const [isNetworkFluctuating, setIsNetworkFluctuating] = useState(false);
const [isTimeout, setIsTimeout] = useState(false); // Trạng thái timeout

const TIMEOUT_LIMIT = 10000; // Thời gian tối đa chờ tải dữ liệu (10 giây)

const fetchData = () => {
  setIsLoading(true);
  setIsTimeout(false);
  setIsNetworkError(false);

  const mockData = [
    { id: 1, name: "Course 1", description: "Description for Course 1" },
    { id: 2, name: "Course 2", description: "Description for Course 2" },
    { id: 3, name: "Course 3", description: "Description for Course 3" },
  ];

  // Đặt timeout để kiểm tra nếu tải dữ liệu quá lâu
  const timeout = setTimeout(() => {
    if (isLoading) {
      setIsTimeout(true);
      setIsLoading(false);
    }
  }, TIMEOUT_LIMIT);

  // Giả lập tải dữ liệu
  setTimeout(() => {
    clearTimeout(timeout); // Hủy bỏ timeout nếu dữ liệu tải xong
    setData(mockData);
    setIsLoading(false);
  }, 2000); // Giả lập delay 2 giây
};

// Kiểm tra mạng và xử lý khi mạng thay đổi
useEffect(() => {
  const checkNetwork = () => {
    const online = navigator.onLine;
    if (!online) {
      setIsNetworkError(true);
      setIsNetworkFluctuating(true);
    } else {
      setIsNetworkError(false);
      if (isNetworkFluctuating) {
        fetchData();
        setTimeout(() => setIsNetworkFluctuating(false), 2000); // Tắt trạng thái mạng chập chờn
      }
    }
  };

  // Gắn sự kiện lắng nghe trạng thái mạng
  window.addEventListener("online", checkNetwork);
  window.addEventListener("offline", checkNetwork);

  checkNetwork(); // Kiểm tra ngay khi component render

  return () => {
    window.removeEventListener("online", checkNetwork);
    window.removeEventListener("offline", checkNetwork);
  };
}, [isNetworkFluctuating]);

// Tải dữ liệu lần đầu khi component được render
useEffect(() => {
  fetchData();
}, []);
