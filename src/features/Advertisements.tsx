import { Button, Quote } from "@radix-ui/themes";
import AdvertisementPanel from "../components/AdvertisementPanel";
import { useGetJobsQuery } from "../services/jobsApi";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { Job } from "../types";
import { DoubleArrowUpIcon } from "@radix-ui/react-icons";

const Advertisements = () => {
  const { user } = useAuth();
  const { data, isLoading, isError } = useGetJobsQuery({
    userId: user.id,
  });

  const navigate = useNavigate();

  const jobs = data?.data;

  return (
    <div className="space-y-4">
      <div>
        <span className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-semibold">Álláshirdetések</h1>
          <Button
            variant="surface"
            color="green"
            onClick={() => navigate("/advertisements/new")}
            className="cursor-pointer"
          >
            <DoubleArrowUpIcon />
            Új hirdetés feladása
          </Button>
        </span>
        <Quote className="hidden text-xl md:block">A te hirdetéseid...</Quote>
      </div>
      <div className="space-y-6">
        {isLoading && <p>Adatok betöltése...</p>}
        {isError && <p>Hiba történt...</p>}
        {!isLoading && !isError && (
          <>
            {jobs && jobs.length > 0 ? (
              jobs.map((job: Job) => (
                <AdvertisementPanel
                  key={job.id}
                  advertisement={job}
                  onEdit={(id) => navigate(`/advertisements/${id}/edit`)}
                />
              ))
            ) : (
              <p>Még nincs egy hirdetésed sem...</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Advertisements;
