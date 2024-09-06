
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
export function AuthRouter({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const token = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {

        if (!token && location.pathname !== '/login') {
            alert('请登录')
            navigate('/login');
        }
        else if (token && token.role === 'user') {
            if (location.pathname !== '/book' && location.pathname !== '/user/edit/[object%20Object]') {
                alert('无权限')
                navigate('/book');
            }
        }
    }, [token, location]);

    return <>{children}</>;
}
