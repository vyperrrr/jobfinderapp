import { Section } from "@radix-ui/themes";
import AdvertisementForm from "../features/AdvertisementForm";
import { useCreateJobMutation } from "../services/jobsApi";
import { useNavigate } from "react-router";
import { Job } from "../types";

const CreateAdvertisement = () => {
  const navigate = useNavigate();
  const [createJob] = useCreateJobMutation();

  function handleSubmit(data: Job) {
    createJob(data);
    navigate("/profile");
  }

  return (
    <Section className="space-y-10">
      <h1 className="text-3xl font-semibold underline underline-offset-4">
        Álláshirdetés hozzáadása
      </h1>
      <div className="rounded-md bg-slate-800 p-12">
        <AdvertisementForm submitAction={(data) => handleSubmit(data)} />
      </div>
    </Section>
  );
};

export default CreateAdvertisement;
