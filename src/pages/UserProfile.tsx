import { useAuth } from "../hooks/useAuth";
import { useGetExperiencesQuery } from "../services/experiencesApi";

const UserProfile = () => {
  const { user } = useAuth();
  const { data: experiences, isError, isSuccess } = useGetExperiencesQuery();

  return (
    <div className="prose lg:prose-xl">
      <h1></h1>
      {user?.fullname}
    </div>
  );
};

export default UserProfile;
