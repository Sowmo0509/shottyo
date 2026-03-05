import { useCallback } from "react";
import { Select, Card, Text } from "@sanity/ui";
import { StringInputProps, useFormValue, set, unset } from "sanity";
import { districts } from "../lib/locations";

export function DistrictSelectInput(props: StringInputProps) {
  const { value, onChange, readOnly } = props;

  // Get the current value of the 'division' field
  const division = useFormValue(["division"]) as string | undefined;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const nextValue = event.currentTarget.value;
      if (nextValue) {
        onChange(set(nextValue));
      } else {
        onChange(unset());
      }
    },
    [onChange],
  );

  // If no division is selected, show a message instead of the dropdown
  if (!division) {
    return (
      <Card padding={3} radius={2} tone="caution">
        <Text size={1}>Please select a Division first to see available Districts.</Text>
      </Card>
    );
  }

  // Filter districts based on the selected division
  const availableDistricts = districts.filter((d) => d.division === division);

  return (
    <Select value={value || ""} onChange={handleChange} readOnly={readOnly}>
      <option value="">Select a District...</option>
      {availableDistricts.map((district) => (
        <option key={district.value} value={district.value}>
          {district.title}
        </option>
      ))}
    </Select>
  );
}
