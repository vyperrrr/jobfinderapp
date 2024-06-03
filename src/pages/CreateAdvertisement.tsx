import { Section } from "@radix-ui/themes";
import AdvertisementForm from "../features/AdvertisementForm";
import { useCreateJobMutation } from "../services/jobsApi";

const CreateAdvertisement = () => {
  const [createJob] = useCreateJobMutation();
  return (
    <Section className="space-y-10">
      <h1 className="text-3xl font-semibold underline underline-offset-4">
        Álláshirdetés hozzáadása
      </h1>
      <div className="rounded-md bg-slate-800 p-12">
        <AdvertisementForm submitAction={(data) => createJob(data)} />
      </div>
    </Section>
  );
};

export default CreateAdvertisement;
