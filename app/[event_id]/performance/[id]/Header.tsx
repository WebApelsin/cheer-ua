"use client";

import { useContext } from "react";
import { EvaluationContext } from "./EvaluationContext";
import { Section, Heading, Text, Badge, Strong } from "@radix-ui/themes";
import type { Performance } from "@/types/supabase";

export default function Header({ performance }: { performance: Performance }) {
    const { total } = useContext(EvaluationContext);

    // TODO: show back button
    // TODO: show the rank

    return (
        <div className="container">
            <Section size="2">
                <Heading>
                    {performance.team}
                </Heading>
                <Text size="2">
                    {performance.nomination} <Badge color="gray">{performance.age}</Badge>
                </Text>
                <Text size="2">
                    Усього: <Strong>{total}</Strong>
                </Text>
            </Section>
        </div>
    );
}