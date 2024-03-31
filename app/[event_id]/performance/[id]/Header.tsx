"use client";

import { useContext } from "react";
import { EvaluationContext } from "./EvaluationContext";
import { Section, Flex, Box, Heading, Text, Badge, Strong } from "@radix-ui/themes";
import type { Performance } from "@/types/supabase";
import type { EvaluationTotal } from "@/api/getTotalEvaluations";

export default function Header({ performance, totals = [] as EvaluationTotal[] }: {
    performance: Performance,
    totals: EvaluationTotal[]
}) {
    const { score } = useContext(EvaluationContext);

    const rank = totals
        .filter(total => total.performance_id !== performance.id)
        .filter(total => total.nomination_id === performance.nomination_id && total.age_id === performance.age_id)
        .filter(total => total.value > score)
        .length + 1;

    // TODO: show back button
    // TODO: show the rank

    return (
        <div className="container">
            <Section size="2">
                <Flex direction="row" align="center">
                    <Box>
                        <Heading>
                            {performance.team}
                        </Heading>
                        <Text size="2">
                            {performance.nomination} <Badge color="gray">{performance.age}</Badge>
                        </Text>
                    </Box>
                    <Box>
                        <Text size="4"><Strong>{rank}</Strong></Text>
                        <Text size="2">Місце</Text>
                    </Box>
                    <Box>
                        <Text size="4"><Strong>{score}</Strong></Text>
                        <Text size="2">Усього</Text>
                    </Box>
                </Flex>
            </Section>
        </div>
    );
}