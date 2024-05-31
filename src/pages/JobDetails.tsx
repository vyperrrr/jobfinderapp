import { useParams } from "react-router";
import { useGetJobQuery } from "../services/jobsApi";
import {
  useApplyForJobMutation,
  useGetJobsForApplicantQuery,
  useRemoveJobApplicantMutation,
} from "../services/applicantsApi";

import { Badge, Button, Callout, Quote, Section } from "@radix-ui/themes";

import { toast } from "react-toastify";
import { useEffect } from "react";

import { useAuth } from "../hooks/useAuth";
import { IoLocationSharp } from "react-icons/io5";
import { CiBadgeDollar } from "react-icons/ci";
import { InfoCircledIcon, Pencil1Icon, ResetIcon } from "@radix-ui/react-icons";
import { prettyPrint } from "../utils";

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
      <div className="space-y-4">
        <h1 className="text-right text-4xl font-semibold underline underline-offset-4">
          {job?.company}
        </h1>
        <span className="flex items-center justify-between gap-x-2 rounded-md border-b-8 border-l-4 border-b-slate-300 border-l-slate-300 bg-slate-800 p-4 shadow-md">
          <p className="text-3xl font-semibold">{job?.position}</p>
          <span className="flex items-center gap-x-2 rounded-md border-b-4 border-b-slate-300 bg-slate-700 p-4 shadow-md">
            <CiBadgeDollar className="h-8 w-8 text-emerald-400" />
            <p className="font-semibold">
              {prettyPrint(job!.salaryFrom)
                .concat(" - ")
                .concat(prettyPrint(job!.salaryTo))}
            </p>
          </span>
        </span>
        <span className="flex items-center gap-x-1">
          <Badge>{job?.homeOffice ? "Remote" : "On-site"}</Badge>
          <span className="flex items-center">
            <IoLocationSharp />
            <Quote className="text-sm">{job?.city}</Quote>
          </span>
        </span>
      </div>
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold underline underline-offset-4">
          Leírás
        </h2>
        <p className="whitespace-pre-wrap text-sm">{job?.description}</p>
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
              className="cursor-pointer"
            >
              <p>Jelentkezés lemondása</p>
              <ResetIcon />
            </Button>
          </div>
        ) : (
          <Button
            variant="surface"
            onClick={() => apply(job!.id)}
            size="4"
            className="cursor-pointer"
          >
            <p>Jelentkezés</p>
            <Pencil1Icon />
          </Button>
        )}
      </div>
    </Section>
  );
};

export default JobDetails;
