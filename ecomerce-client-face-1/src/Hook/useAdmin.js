import Cookies from "js-cookie";
const useAdmin = () => {
  const isAogin = Cookies.get("isAdmin");
  return isAogin;
};

export default useAdmin;
