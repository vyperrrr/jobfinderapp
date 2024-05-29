import { useParams } from "react-router";
import { useGetJobQuery } from "../services/jobsApi";
import {
  useApplyForJobMutation,
  useGetJobsForApplicantQuery,
  useRemoveJobApplicantMutation,
} from "../services/applicantsApi";

import { Button, DataList, Section } from "@radix-ui/themes";

import { toast } from "react-toastify";
import { useEffect } from "react";

import { useAuth } from "../hooks/useAuth";

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const { data: job, isError, isLoading } = useGetJobQuery({ id });
  const [apply, { isSuccess: isApplySuccess, isError: isApplyError }] =
    useApplyForJobMutation();
  const [removeApplication] = useRemoveJobApplicantMutation();

  const { data: applications } = useGetJobsForApplicantQuery(user!.id);

  const isApplied = applications?.some((app) => app.jobId === job?.id);

  useEffect(() => {
    if (isApplySuccess) {
      toast.success("Sikeres jelentkezés!");
    } else if (isApplyError) {
      toast.error("Hiba történt a jelentkezés során.");
    }
  }, [isApplySuccess, isApplyError]);

  if (isError) {
    return <div>An error occurred...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Section className="space-y-10">
      <h1 className="text-4xl font-semibold">Cég részletei</h1>
      <DataList.Root size="3">
        <DataList.Item>
          <DataList.Label minWidth="88px">Név</DataList.Label>
          <DataList.Value>{job?.company}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Pozíció</DataList.Label>
          <DataList.Value>{job?.position}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Leírás</DataList.Label>
          <DataList.Value>{job?.description}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Fizetési sáv</DataList.Label>
          <DataList.Value>0</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Foglalkoztatás típusa</DataList.Label>
          <DataList.Value>{job?.type}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Település</DataList.Label>
          <DataList.Value>{job?.city}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Home Office</DataList.Label>
          <DataList.Value>true</DataList.Value>
        </DataList.Item>
      </DataList.Root>
      {isApplied ? (
        <div>
          <p>Már jelentkeztél erre az állásra...</p>
          <Button
            variant="outline"
            color="red"
            onClick={() => removeApplication(job!.id)}
          >
            Jelentkezés lemondása
          </Button>
        </div>
      ) : (
        <Button variant="outline" onClick={() => apply(job!.id)}>
          Jelentkezés
        </Button>
      )}
    </Section>
  );
};

export default JobDetails;
