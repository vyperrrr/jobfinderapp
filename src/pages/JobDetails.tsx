import { useParams } from "react-router";
import { useGetJobQuery } from "../services/jobsApi";
import { useApplyForJobMutation } from "../services/applicantsApi";

import { Button, DataList, Section } from "@radix-ui/themes";
import { FileTextIcon } from "@radix-ui/react-icons";

import { toast } from "react-toastify";

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data: job, isError, isLoading } = useGetJobQuery({ id });
  const [applyForJob, { isSuccess: isApplySuccess, isError: isApplyError }] =
    useApplyForJobMutation();

  if (isError) {
    return <div>An error occurred...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleApply = () => {
    applyForJob({ id });
    if (isApplySuccess) {
      toast.success("Sikeres jelentkezés!");
    } else if (isApplyError) {
      toast.error("Hiba történt a jelentkezés során.");
    }
  };

  return (
    <Section className="space-y-10">
      <div className="flex items-start justify-between">
        <span>
          <h1 className="text-4xl font-semibold">Cég részletei</h1>
        </span>
        <Button variant="outline" onClick={handleApply}>
          <FileTextIcon />
          Jelentkezem a pozícióra
        </Button>
      </div>
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
    </Section>
  );
};

export default JobDetails;
