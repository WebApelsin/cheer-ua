import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getPerformanceById, getEvaluationCriterias, getEvaluations, getTotalEvaluations } from "@/api";

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
    const score = evaluations.reduce((sum, item) => sum + item.value, 0);
    const totalEvaluations = await getTotalEvaluations(event_id, cookies);

    // TODO: check if the current user has rights to make evaluations
    // TODO: disable form controls if the performance is not enabled
    // TODO: check if there are any evaluation criteria
    // TODO: handle form submit with server action

    // TODO: show evaluations summary if the current user is admin

    return (
        <main>
            <EvaluationContextProvider score={score}>
                <Header performance={performance} totals={totalEvaluations} />

                <div className="container">
                    <EvaluationForm
                        performance_id={performance.id}
                        criterias={criterias}
                        evaluations={evaluations} />
                </div>
            </EvaluationContextProvider>
        </main>
    );
}