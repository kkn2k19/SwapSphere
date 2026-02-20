import { useNavigate } from "react-router-dom"

const ProtectedRoute = ({ children, roleRequired }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) navigate("/login");
    if (roleRequired && role !== roleRequired) navigate("/")

    return children
}

export default ProtectedRoute