import { Section } from "@radix-ui/themes";
import AdvertisementForm from "../features/AdvertisementForm";
import { useCreateJobMutation } from "../services/jobsApi";

const CreateAdvertisement = () => {
  const [createJob] = useCreateJobMutation();
  return (
    <Section className="space-y-10">
      <h1 className="text-4xl font-semibold">Álláshirdetés hozzáadása</h1>
      <AdvertisementForm submitAction={(data) => createJob(data)} />
    </Section>
  );
};

export default CreateAdvertisement;
