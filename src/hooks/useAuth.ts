import { useSelector } from "react-redux";
import { getUser } from "../features/authSlice";
import { getToken } from "../features/authSlice";

export const useAuth = () => {
  const user = useSelector(getUser);
  const token = useSelector(getToken);

  return { user, token };
};
