import { Section } from "@radix-ui/themes";
import AdvertisementForm from "../features/AdvertisementForm";
import { useNavigate, useParams } from "react-router";
import { useEditJobMutation, useGetJobQuery } from "../services/jobsApi";

const EditAdvertisement = () => {
  const { id } = useParams<{ id: string }>();
  const { data: advertisement } = useGetJobQuery({ id });
  const navigate = useNavigate();
  const [editJob] = useEditJobMutation();

  function handleSubmit(data: Job) {
    const { id, userId, ...rest } = data;
    editJob({ id, data: rest });
    navigate("/profile");
  }

  return (
    <Section className="space-y-10">
      <h1 className="text-4xl font-semibold">Álláshirdetés módosítása</h1>
      <AdvertisementForm
        defaultValues={advertisement}
        submitAction={(data) => handleSubmit(data)}
      />
    </Section>
  );
};

export default EditAdvertisement;
