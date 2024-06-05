import { useSelector } from "react-redux";
import { getUser } from "../features/auth/authSlice";
import { getToken } from "../features/auth/authSlice";

export const useAuth = () => {
  const user = useSelector(getUser);
  const token = useSelector(getToken);

  return { user, token };
};
