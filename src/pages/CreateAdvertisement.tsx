import { Section } from "@radix-ui/themes";
import AdvertisementForm from "../features/AdvertisementForm";
import { useCreateJobMutation } from "../services/jobsApi";
import { useNavigate } from "react-router";
import { Job } from "../types";
import { useEffect } from "react";
import { toast } from "react-toastify";

const CreateAdvertisement = () => {
  const navigate = useNavigate();
  const [createJob, { isSuccess, isError }] = useCreateJobMutation();

  function handleSubmit(data: Job) {
    createJob(data);
    navigate("/profile");
  }

  useEffect(() => {
    if (isSuccess) {
      toast.dark("Sikeres létrehozás!");
      navigate("/profile");
    } else if (isError) {
      toast.error("Hiba történt a létrehozás során!");
    }
  });

  return (
    <Section className="space-y-10 px-2">
      <h1 className="text-3xl font-semibold">Álláshirdetés hozzáadása</h1>
      <div className="flex rounded-md bg-slate-800 px-6 py-12 md:p-12">
        <AdvertisementForm submitAction={(data) => handleSubmit(data)} />
      </div>
    </Section>
  );
};

export default CreateAdvertisement;
