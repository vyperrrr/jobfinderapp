import { Button, Quote } from "@radix-ui/themes";
import AdvertisementPanel from "../components/AdvertisementPanel";
import { useGetJobsQuery } from "../services/jobsApi";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { Job } from "../types";
import { DoubleArrowUpIcon } from "@radix-ui/react-icons";

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
          <h1 className="text-3xl font-semibold underline underline-offset-4">
            Álláshirdetések
          </h1>
          <Button
            variant="surface"
            color="green"
            onClick={() => navigate("/advertisements/new")}
          >
            <DoubleArrowUpIcon />
            Új hirdetés feladása
          </Button>
        </span>
        <Quote className="text-xl">A te hirdetéseid...</Quote>
      </div>
      <div className="space-y-6">
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
