"use client";

import { Heading, Text } from "@/components/ui/typography";
import { useTranslation } from "@/hooks/useTranslation";

export function HomeHeader() {
  const { t } = useTranslation();

  return (
    <div className="mb-10 text-center space-y-4">
      <Heading as="h1" variant="h1">
        {t.home.title}
      </Heading>
      <Text variant="lead" className="max-w-2xl mx-auto">
        {t.home.description}
      </Text>
    </div>
  );
}
