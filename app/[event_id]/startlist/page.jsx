import { cookies } from "next/headers";
import { getStartlist, getTotalEvaluations, getAssignments } from "@/api";
import { Heading } from "@radix-ui/themes";
import Startlist from "./Startlist";

export default async function StartlistPage({ params: { event_id } }) {
    const startlist = await getStartlist(event_id, cookies);
    const assignments = await getAssignments(event_id, cookies);
    const scores = await getTotalEvaluations(event_id, cookies);

    // TODO: open evaluation form when assigned performance becomes active

    return (
        <div className="container">
            <Heading my="6">
                Стартлист
            </Heading>

            <Startlist
                startlist={startlist}
                assignments={assignments}
                scores={scores} />
        </div>
    );
}