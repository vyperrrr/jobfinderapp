import { Section } from "@radix-ui/themes";
import AdvertisementForm from "../features/AdvertisementForm";
import { useNavigate, useParams } from "react-router";
import { useEditJobMutation, useGetJobQuery } from "../services/jobsApi";
import { useEffect } from "react";
import { toast } from "react-toastify";

const EditAdvertisement = () => {
  const { id } = useParams<{ id: string }>();
  const { data: advertisement } = useGetJobQuery({ id });
  const navigate = useNavigate();
  const [editJob, { isSuccess, isError }] = useEditJobMutation();

  function handleSubmit(data: Job) {
    const { id, userId, ...rest } = data;
    editJob({ id, data: rest });
  }

  useEffect(() => {
    if (isSuccess) {
      toast.dark("Sikeres módosítás!");
      navigate("/profile");
    } else if (isError) {
      toast.error("Hiba történt a módosítás során!");
    }
  });

  return (
    <Section className="space-y-10 px-2">
      <h1 className="text-4xl font-semibold">Álláshirdetés módosítása</h1>
      <div className="flex rounded-md bg-slate-800 px-6 py-12 md:p-12">
        <AdvertisementForm
          defaultValues={advertisement}
          submitAction={(data) => handleSubmit(data)}
        />
      </div>
    </Section>
  );
};

export default EditAdvertisement;
