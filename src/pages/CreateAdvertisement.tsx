import { Section } from "@radix-ui/themes";
import AdvertisementForm from "../components/AdvertisementForm";

const CreateAdvertisement = () => {
  return (
    <Section className="space-y-10">
      <h1 className="text-4xl font-semibold">Álláshirdetés hozzáadása</h1>
      <AdvertisementForm />
    </Section>
  );
};

export default CreateAdvertisement;
