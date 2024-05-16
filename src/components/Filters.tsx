import * as Form from "@radix-ui/react-form";
import {
  Button,
  Select,
  TextField,
  Text,
  Flex,
  Checkbox,
} from "@radix-ui/themes";

const Filters: React.FC = () => {
  return (
    <Form.Root className="space-y-2">
      <Form.Field name="salaryFrom">
        <Form.Label>Fizetési sáv alja</Form.Label>
        <Form.Control asChild>
          <TextField.Root />
        </Form.Control>
      </Form.Field>
      <Form.Field name="salaryTo">
        <Form.Label>Fizetési sáv teteje</Form.Label>
        <Form.Control asChild>
          <TextField.Root />
        </Form.Control>
      </Form.Field>
      <Select.Root defaultValue="full-time" name="type">
        <Select.Group>
          <Select.Label>Foglalkoztatás típusa</Select.Label>
          <Select.Trigger />
          <Select.Content position="popper">
            <Select.Item value="full-time">Teljes állás</Select.Item>
            <Select.Item value="part-time">Részmunkaidős állás</Select.Item>
            <Select.Item value="internship">Gyakornoki állás</Select.Item>
          </Select.Content>
        </Select.Group>
      </Select.Root>
      <Form.Field name="city">
        <Form.Label>Település</Form.Label>
        <Form.Control asChild>
          <TextField.Root />
        </Form.Control>
      </Form.Field>
      <Text as="label" size="2">
        <Flex gap="2">
          <Checkbox defaultChecked name="homeOffice" />
          Agree to Terms and Conditions
        </Flex>
      </Text>
      <Form.Submit>
        <Button variant="soft">Szűrők alkalmazása</Button>
      </Form.Submit>
    </Form.Root>
  );
};

export default Filters;
