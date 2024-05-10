import Cookies from "js-cookie";
const useAuth = () => {
  const isLogin = Cookies.get("isLogin");
  return isLogin;
};

export default useAuth;
