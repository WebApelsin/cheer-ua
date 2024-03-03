import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getPerformance, getEvaluationCriterias, getEvaluations } from "@/hooks";

import { Container, Section, Heading, Text, Badge } from "@radix-ui/themes";
import EvaluationForm from "./EvaluationForm";

export default async function PerformancePage({ params: { id } }) {
    const performance = await getPerformance(id, cookies);
    const criterias = await getEvaluationCriterias(id, cookies);
    const evaluations = await getEvaluations(id, cookies);

    if (!performance)
        return notFound();

    // TODO: check if the current user has rights to make evaluations
    // TODO: handle form submit with server action

    return (
        <main>
            <Container>
                <Section size="2">
                    <Heading>
                        {performance.team}
                    </Heading>
                    <Text size="2">
                        {performance.nomination} <Badge color="gray">{performance.age}</Badge>
                    </Text>
                </Section>

                <EvaluationForm
                    performance_id={performance.id}
                    criterias={criterias}
                    evaluations={evaluations} />
            </Container>
        </main>
    );
}