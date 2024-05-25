import { useParams } from "react-router";
import { useGetJobQuery } from "../services/jobsApi";
import { Button, Section } from "@radix-ui/themes";
import { Table } from "@radix-ui/themes";
import { formatSalary } from "../utils";

import { FileTextIcon } from "@radix-ui/react-icons";

import { useApplyForJobMutation } from "../services/applicantsApi";

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: job, isError, isLoading } = useGetJobQuery({ id });
  const [applyForJob] = useApplyForJobMutation();

  const handleApply = () => applyForJob({ jobId: job!.id });

  if (isError) {
    return <div>An error occurred...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const salaryFormatted =
    formatSalary(job!.salaryFrom) + " - " + formatSalary(job!.salaryTo);

  const hasHomeOffice = job?.homeOffice ? "Igen" : "Nem";

  return (
    <Section className="space-y-10">
      <div className="flex items-start justify-between">
        <span>
          <h1 className="text-4xl font-semibold">Cég részletei</h1>
          <h2 className="text-2xl font-semibold">
            Megtetszett a lehetőség? Jelentkezz!
          </h2>
        </span>
        <Button variant="outline" onClick={handleApply}>
          <FileTextIcon />
          Jelentkezem a pozícióra
        </Button>
      </div>
      <Table.Root>
        <Table.Body>
          <Table.Row>
            <Table.RowHeaderCell>Név</Table.RowHeaderCell>
            <Table.Cell>{job?.company}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.RowHeaderCell>Pozíció</Table.RowHeaderCell>
            <Table.Cell>{job?.position}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.RowHeaderCell>Leiírás</Table.RowHeaderCell>
            <Table.Cell>{job?.description}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.RowHeaderCell>Fizetési Sáv</Table.RowHeaderCell>
            <Table.Cell>{salaryFormatted}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.RowHeaderCell>Foglalkoztatás típusa</Table.RowHeaderCell>
            <Table.Cell>{job?.type}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.RowHeaderCell>Település</Table.RowHeaderCell>
            <Table.Cell>{job?.city}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.RowHeaderCell>Home Office</Table.RowHeaderCell>
            <Table.Cell>{hasHomeOffice}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Section>
  );
};

export default JobDetail;
