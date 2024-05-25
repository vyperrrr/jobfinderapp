import { Button } from "@radix-ui/themes";
import AdvertisementPanel from "../components/AdvertisementPanel";

import { useGetAllJobsQuery } from "../services/jobsApi";
import { useAuth } from "../hooks/useAuth";

const Advertisements = () => {
  const { data: jobs } = useGetAllJobsQuery();
  const { user } = useAuth();

  const advertisements =
    jobs?.data.filter((job) => job.userId === user?.id) || [];

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
          />
        ))}
      </div>
    </div>
  );
};

export default Advertisements;
