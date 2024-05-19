import { useParams } from "react-router";
import { useGetJobQuery } from "../features/JobList/jobsApi";
import { Button, Section } from "@radix-ui/themes";
import { Table } from "@radix-ui/themes";
import { formatSalary } from "../utils";

const JobDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: job, isError, isLoading } = useGetJobQuery({ id });

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
    <Section>
      <div className="flex items-center justify-between">
        <span>
          <h1 className="text-xl font-semibold">Cég részletei</h1>
          <h2 className="text-lg">Megtetszett a lehetőség? Jelentkezz!</h2>
        </span>
        <Button>Jelentkezés</Button>
      </div>
      <Table.Root>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Név</Table.Cell>
            <Table.Cell>{job?.company}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Pozíció</Table.Cell>
            <Table.Cell>{job?.position}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Leiírás</Table.Cell>
            <Table.Cell>{job?.description}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Fizetési Sáv</Table.Cell>
            <Table.Cell>{salaryFormatted}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Foglalkoztatás típusa</Table.Cell>
            <Table.Cell>{job?.type}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Település</Table.Cell>
            <Table.Cell>{job?.city}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Home Office</Table.Cell>
            <Table.Cell>{hasHomeOffice}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Section>
  );
};

export default JobDetailPage;
