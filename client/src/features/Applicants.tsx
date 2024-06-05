import { Callout, ScrollArea } from "@radix-ui/themes";
import { useGetJobApplicantsQuery } from "../services/applicantsApi";
import ApplicantsPanel from "../components/ApplicantsPanel";
import { CiFaceFrown } from "react-icons/ci";

interface ApplicantsProps {
  advertisementId: number;
}

const Applicants: React.FC<ApplicantsProps> = ({ advertisementId }) => {
  const { data: applicants } = useGetJobApplicantsQuery({
    id: advertisementId,
  });

  return (
    <div>
      {applicants?.length === 0 ? (
        <Callout.Root color="orange">
          <Callout.Icon>
            <CiFaceFrown />
          </Callout.Icon>
          <Callout.Text>
            Sajnos még nem jelentkeztek erre az állásra.
          </Callout.Text>
        </Callout.Root>
      ) : (
        <ScrollArea type="auto" scrollbars="vertical">
          <ul className="space-y-2">
            {applicants?.map((applicant) => (
              <ApplicantsPanel
                key={applicant.user.id}
                applicant={applicant.user}
              />
            ))}
          </ul>
        </ScrollArea>
      )}
    </div>
  );
};

export default Applicants;
