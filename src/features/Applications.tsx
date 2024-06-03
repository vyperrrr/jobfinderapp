import { useGetJobsForApplicantQuery } from "../services/applicantsApi";
import { useAuth } from "../hooks/useAuth";
import JobPanel from "../components/JobPanel";

const Applications = () => {
  const { user } = useAuth();
  const {
    data: applications,
    isLoading,
    isError,
  } = useGetJobsForApplicantQuery(user!.id);

  return (
    <div>
      <span className="space-y-4">
        <h1 className="text-3xl font-semibold underline underline-offset-4">
          Jelentkezéseim
        </h1>
        {isError && <p>Hiba történt...</p>}
        {isLoading && <p>Jelentkezések betöltése...</p>}
        {!isLoading &&
          !isError &&
          (applications && applications.length > 0 ? (
            applications?.map((application) => (
              <JobPanel key={application.jobId} job={application.job} />
            ))
          ) : (
            <p>Még nem jelentkeztél egy állásra sem...</p>
          ))}
      </span>
    </div>
  );
};

export default Applications;
