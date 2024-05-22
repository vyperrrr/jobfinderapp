import { useAuth } from "../hooks/useAuth";
import { useGetExperiencesQuery } from "../services/experiencesApi";

const UserProfile = () => {
  const { user } = useAuth();
  const { data: experiences } = useGetExperiencesQuery();

  return (
    <div>
      <h1>{JSON.stringify(user)}</h1>
      <h2>{JSON.stringify(experiences)}</h2>
    </div>
  );
};

export default UserProfile;
