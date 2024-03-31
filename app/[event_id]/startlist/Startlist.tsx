"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Table } from "@radix-ui/themes";
import Row from "./StartlistRow";

import type { Database, Performance, Assignment } from "@/types/supabase";
import type { EvaluationTotal } from "@/api/getTotalEvaluations";
import type { RealtimePostgresUpdatePayload } from "@supabase/supabase-js";

type StartlistProps = {
    startlist: Performance[],
    assignments: Assignment[],
    scores: EvaluationTotal[]
};

export default function Startlist({ startlist, assignments, scores }: StartlistProps): React.ReactNode {
    const router = useRouter();
    const params = useParams();

    const [active, setActive] = useState<number[]>(startlist.filter(x => x.is_active).map(x => x.id));
    const [editable, setEditable] = useState<number[]>(startlist.filter(x => x.is_editable).map(x => x.id));
    const supabase = createClientComponentClient<Database>();

    const isAssigned = useCallback((performance: Performance) => {
        return assignments.some(assignment => {
            return assignment.nomination_id === performance.nomination_id && assignment.age_id === performance.age_id;
        });
    }, [assignments]);

    const onUpdate = useCallback((payload: RealtimePostgresUpdatePayload<Performance>) => {
        const { new: item, old } = payload;

        if (item.is_editable != old.is_editable) {
            if (item.is_editable) {
                setEditable(editable => editable.concat(item.id));
            } else {
                setEditable(editable => editable.filter(x => x !== item.id));
            }
        }

        if (item.is_active != old.is_active) {
            if (item.is_active) {
                setActive(active => active.concat(item.id));

                if (isAssigned(item)) {
                    router.push(`/${params.event_id}/performance/${item.id}`);
                }
            } else {
                setActive(active => active.filter(x => x !== item.id));
            }
        }
    }, [setActive, setEditable, router, params, isAssigned]);

    useEffect(() => {
        const channel = supabase.channel("performances").on(
            "postgres_changes",
            { event: "UPDATE", schema: "public", table: "performances" },
            onUpdate
        ).subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase, onUpdate]);

    return (
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
                    const score = scores.find(x => x.performance_id === item.id)?.value;
                    const assigned = isAssigned(item);

                    return (
                        <Row key={item.id}
                            item={item}
                            score={score}
                            active={active.includes(item.id)}
                            editable={editable.includes(item.id)}
                            assigned={assigned} />
                    );
                })}
            </Table.Body>
        </Table.Root>
    );
}
