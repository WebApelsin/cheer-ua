import { cookies } from "next/headers";
import { getStartlist, getTotalEvaluations, getAssignments } from "@/api";

import { Heading, Table } from "@radix-ui/themes";
import TableRow from "./TableRow";
import styles from "@/styles/startlist.module.css";

export default async function StartlistPage({ params: { event_id } }) {
    const startlist = await getStartlist(event_id, cookies);
    const assignments = await getAssignments(event_id, cookies);

    // TODO: filter evaluations by the list of performances
    const totals = await getTotalEvaluations(cookies);

    // TODO: listen for is_enabled/is_active updates
    // TODO: open evaluation form when assigned performance becomes active

    return (
        <div className="container">
            <Heading my="6">
                Стартлист
            </Heading>

            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>&nbsp;</Table.ColumnHeaderCell>
                        {/* <Table.ColumnHeaderCell>№</Table.ColumnHeaderCell> */}
                        <Table.ColumnHeaderCell>Час</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Номінація, вік</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Місто, клуб, cпортсмени</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Тренер</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Оцінка</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {startlist.map(item => {
                        const score = totals.find(x => x.performance_id === item.id)?.value;
                        const is_assigned = assignments.some(assignment => {
                            return assignment.nomination_id === item.nomination_id && assignment.age_id === item.age_id;
                        });

                        return (
                            <TableRow key={item.id} item={item}
                                total={score}
                                assigned={is_assigned} />
                        );
                    })}
                </Table.Body>
            </Table.Root>
        </div>
    );
}