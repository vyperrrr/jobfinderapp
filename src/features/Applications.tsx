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

  if (isError) {
    return <div>An error occurred...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <span className="space-y-4">
        <h1 className="text-3xl font-semibold underline underline-offset-4">
          Jelentkezéseim
        </h1>
        {applications?.map((application) => (
          <JobPanel key={application.jobId} job={application.job} />
        ))}
      </span>
    </div>
  );
};

export default Applications;
