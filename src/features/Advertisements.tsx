import { Button } from "@radix-ui/themes";
import AdvertisementPanel from "../components/AdvertisementPanel";

const DUMMY_ADVERTISEMENTS = [
  {
    id: 1,
    company: "Google",
    position: "Software Engineer",
    city: "Budapest",
    salaryFrom: 500000,
    salaryTo: 800000,
    type: "Teljes munkaidő",
  },
  {
    id: 2,
    company: "Facebook",
    position: "Frontend Developer",
    city: "Budapest",
    salaryFrom: 100000,
    salaryTo: 500000,
    type: "Részleges munkaidő",
  },
  {
    id: 3,
    company: "Twitch",
    position: "Backend Developer",
    city: "Budapest",
    salaryFrom: 400000,
    salaryTo: 900000,
    type: "Gyakornoki állás",
  },
];

const Advertisements = () => {
  return (
    <div className="space-y-4">
      <div>
        <span className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Álláshirdetések</h1>
          <Button variant="surface" color="green">
            Új hirdetés feladása
          </Button>
        </span>

        <h2 className="text-xl">A te hirdetéseid</h2>
      </div>
      <div className="space-y-4">
        {DUMMY_ADVERTISEMENTS.map((advertisement) => (
          <AdvertisementPanel
            key={advertisement.id}
            advertisement={advertisement}
          />
        ))}
      </div>
    </div>
  );
};

export default Advertisements;
