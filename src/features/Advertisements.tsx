import { Button } from "@radix-ui/themes";
import AdvertisementPanel from "../components/AdvertisementPanel";
import { useGetJobsQuery } from "../services/jobsApi";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { Job } from "../types";

const Advertisements = () => {
  const { user } = useAuth();
  const { data } = useGetJobsQuery({
    userId: user.id,
  });

  const navigate = useNavigate();

  const jobs = data?.data;

  return (
    <div className="space-y-4">
      <div>
        <span className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Álláshirdetések</h1>
          <Button
            variant="surface"
            color="green"
            onClick={() => navigate("/advertisements/new")}
          >
            Új hirdetés feladása
          </Button>
        </span>

        <h2 className="text-xl">A te hirdetéseid</h2>
      </div>
      <div className="space-y-4">
        {jobs?.map((job: Job) => (
          <AdvertisementPanel
            key={job.id}
            advertisement={job}
            onEdit={(id) => navigate(`/advertisements/${id}/edit`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Advertisements;
