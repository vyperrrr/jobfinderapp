import { Button } from "@radix-ui/themes";
import AdvertisementPanel from "../components/AdvertisementPanel";

import { useGetAllJobsQuery, useDeleteJobMutation } from "../services/jobsApi";
import { useAuth } from "../hooks/useAuth";

const Advertisements = () => {
  const { data: jobs, refetch } = useGetAllJobsQuery();
  const [deleteJob] = useDeleteJobMutation();
  const { user } = useAuth();

  const advertisements =
    jobs?.data.filter((job) => job.userId === user?.id) || [];

  function handleDelete(id: number) {
    deleteJob({ id });
    refetch();
  }

  return (
    <div className="space-y-4">
      <div>
        <span className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Álláshirdetések</h1>
          <Button variant="surface" color="green">
            Új hirdetés feladása
          </Button>
        </span>

        <h2 className="text-xl">A te hirdetéseid</h2>
      </div>
      <div className="space-y-4">
        {advertisements.map((advertisement) => (
          <AdvertisementPanel
            key={advertisement.id}
            advertisement={advertisement}
            onDelete={() => handleDelete(advertisement.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Advertisements;
