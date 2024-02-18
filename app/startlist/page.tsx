"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import type { Database } from "@/types/supabase";
type Performance = Database["public"]["Views"]["startlist"]["Row"];

import { Container, Heading, Badge, Text, Table } from "@radix-ui/themes";
import styles from "@/styles/startlist.module.css";

export default function StartlistPage() {
    const [startlist, setStartlist] = useState<Array<Performance>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    async function getStartlist() {
        const supabase = createClientComponentClient<Database>();
        // const supabase = createServerComponentClient<Database>({ cookies });

        // TODO: filter by event_id
        const { data, error } = await supabase
            .from("startlist")
            .select();

        setStartlist(data);
    }

    const onClick = (item: Performance) => {
        console.log(item);
        // TODO: check if the current user has rights to make evaluations
        // TODO: navigate to performance view
    };

    useEffect(() => {
        getStartlist();
    }, []);

    return (
        <main>
            <Container>
                <Heading my="6">
                    Стартлист
                </Heading>

                <Table.Root variant="surface">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>№</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Час</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Номінація, вік</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Місто, клуб</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Спортсмени</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Тренер</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {startlist.map((item, i) =>
                            <Table.Row key={item.id} className="" onClick={() => onClick(item)}>
                                <Table.Cell justify="center">{item.row_number}</Table.Cell>
                                <Table.Cell justify="end">
                                    {item.start_time?.replace(/(\d{2}\:\d{2})(\:\d{2})$/g, "$1")}
                                </Table.Cell>
                                <Table.Cell className={styles.nomination}>
                                    <Text className="nowrap">{item.nomination}</Text>
                                    <Badge color="gray">{item.age}</Badge>
                                </Table.Cell>
                                <Table.Cell>
                                    <Text weight="medium">{item.team}</Text>
                                </Table.Cell>
                                <Table.Cell>
                                    <Text weight="light">{item.members}</Text>
                                </Table.Cell>
                                <Table.Cell className={styles.coach}>
                                    <Text className="nowrap">{item.coach}</Text>
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table.Root>
            </Container>
        </main>
    );
}