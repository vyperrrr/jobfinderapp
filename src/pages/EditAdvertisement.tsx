import { Section } from "@radix-ui/themes";
import AdvertisementForm from "../features/AdvertisementForm";
import { useParams } from "react-router";
import { useEditJobMutation, useGetJobQuery } from "../services/jobsApi";

const EditAdvertisement = () => {
  const { id } = useParams<{ id: string }>();
  const { data: advertisement } = useGetJobQuery({ id });
  const [editJob] = useEditJobMutation();
  return (
    <Section className="space-y-10">
      <h1 className="text-4xl font-semibold">Álláshirdetés módosítása</h1>
      <AdvertisementForm
        defaultValues={advertisement}
        submitAction={(data) => {
          delete data.id;
          delete data.userId;
          editJob({ id, data });
        }}
      />
    </Section>
  );
};

export default EditAdvertisement;
