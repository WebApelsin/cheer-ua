"use client";

import { useContext } from "react";
import { EvaluationContext } from "./EvaluationContext";
import { Container, Section, Heading, Text, Badge, Strong } from "@radix-ui/themes";
import type { Performance } from "@/types/supabase";

export default function Header({ performance }: { performance: Performance }) {
    const { total } = useContext(EvaluationContext);

    return (
        <Container>
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
        </Container>
    );
}