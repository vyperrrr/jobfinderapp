import { useParams } from "react-router";
import { useGetJobQuery } from "../services/jobsApi";
import {
  useApplyForJobMutation,
  useGetJobsForApplicantQuery,
  useRemoveJobApplicantMutation,
} from "../services/applicantsApi";

import { Badge, Button, Callout, Section } from "@radix-ui/themes";

import { toast } from "react-toastify";
import { useEffect } from "react";

import { useAuth } from "../hooks/useAuth";
import { IoLocationSharp } from "react-icons/io5";
import { CiBadgeDollar } from "react-icons/ci";
import { InfoCircledIcon } from "@radix-ui/react-icons";

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const { data: job, isError, isLoading } = useGetJobQuery({ id });
  const [apply, { isSuccess: isApplySuccess, isError: isApplyError }] =
    useApplyForJobMutation();
  const [
    removeApplication,
    { isSuccess: isRemoveSuccess, isError: isRemoveError },
  ] = useRemoveJobApplicantMutation();

  const { data: applications } = useGetJobsForApplicantQuery(user!.id);

  const isApplied = applications?.some((app) => app.jobId === job?.id);

  useEffect(() => {
    if (isApplySuccess) {
      toast.success("Sikeres jelentkezés!");
    } else if (isApplyError) {
      toast.error("Hiba történt a jelentkezés során.");
    }
  }, [isApplySuccess, isApplyError]);

  useEffect(() => {
    if (isRemoveSuccess) {
      toast.success("Sikeres lejelentkezés!");
    } else if (isRemoveError) {
      toast.error("Hiba történt a lejelentkezés során.");
    }
  }, [isRemoveSuccess, isRemoveError]);

  if (isError) {
    return <div>An error occurred...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Section className="space-y-10">
      <div>
        <h1 className="text-4xl font-semibold">{job?.company}</h1>
        <span className="flex items-center gap-x-2">
          <h2 className="text-3xl">{job?.position}</h2>
          <Badge>{job?.homeOffice ? "Remote" : "On-site"}</Badge>
        </span>
        <span className="flex items-center gap-x-1">
          <IoLocationSharp />
          <p className="text-sm">{job?.city}</p>
        </span>
      </div>
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">Leírás</h3>
        <p className="whitespace-pre-wrap text-sm">{job?.description}</p>
      </div>
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">Fizetési sáv</h3>
        <span className="flex items-center gap-x-2">
          <CiBadgeDollar />
          <p>
            {job?.salaryFrom} - {job?.salaryTo}
          </p>
        </span>
      </div>
      <div>
        {isApplied ? (
          <div className="space-y-4">
            <Callout.Root className="flex-1">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>Már jelentkeztél erre a pozícióra.</Callout.Text>
            </Callout.Root>
            <Button
              variant="outline"
              color="red"
              size="4"
              onClick={() => removeApplication(job!.id)}
            >
              Jelentkezés lemondása
            </Button>
          </div>
        ) : (
          <Button variant="outline" onClick={() => apply(job!.id)} size="4">
            Jelentkezés
          </Button>
        )}
      </div>
    </Section>
  );
};

export default JobDetails;
