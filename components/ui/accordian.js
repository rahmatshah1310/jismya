"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";

export default function DemoAccordion() {
  return (
    <Accordion.Root type="single" collapsible className="w-full">
      <Accordion.Item value="item-1" className="border-b">
        <Accordion.Header>
          <Accordion.Trigger className="flex w-full justify-between py-2 text-lg font-medium">
            Section 1
            <ChevronDownIcon className="h-5 w-5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="py-2 text-gray-600">
          This is the content for section 1.
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="item-2" className="border-b">
        <Accordion.Header>
          <Accordion.Trigger className="flex w-full justify-between py-2 text-lg font-medium">
            Section 2
            <ChevronDownIcon className="h-5 w-5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="py-2 text-gray-600">
          Content for section 2 goes here.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}
