import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getPerformanceById, getEvaluationCriterias, getEvaluations } from "@/hooks";

import { Container } from "@radix-ui/themes";
import Header from "./Header";
import EvaluationForm from "./EvaluationForm";
import { EvaluationContextProvider } from "./EvaluationContext";

export default async function PerformancePage({ params: { event_id, id } }) {
    const performance = await getPerformanceById(id, cookies);
    if (!performance) {
        return notFound();
    }

    const criterias = await getEvaluationCriterias(id, cookies);
    const evaluations = await getEvaluations(id, cookies);
    const total = evaluations.reduce((sum, item) => sum + item.value, 0);

    // TODO: check if the current performance is active/editable
    // TODO: check if the current user has rights to make evaluations
    // TODO: check if there are any evaluation criteria
    // TODO: handle form submit with server action

    return (
        <main>
            <EvaluationContextProvider total={total}>
                <Header performance={performance} />

                <Container>
                    <EvaluationForm
                        performance_id={performance.id}
                        criterias={criterias}
                        evaluations={evaluations} />
                </Container>
            </EvaluationContextProvider>
        </main>
    );
}