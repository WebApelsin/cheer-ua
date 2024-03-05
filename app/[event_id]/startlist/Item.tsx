"use client";

import { useRouter, useParams } from "next/navigation";
import { Table, Text, Badge } from "@radix-ui/themes";
import styles from "@/styles/startlist.module.css";

import type { Performance } from "@/types/supabase";


export default function StartlistItem({ item }: { item: Performance }) {
    const router = useRouter();
    const params = useParams();

    const onClick = (item: Performance) => {
        // TODO: check if the current user has rights to make evaluations
        router.push(`/${params.event_id}/performance/${item.id}`);
    };

    return (
        <Table.Row key={item.id} onClick={() => onClick(item)}>
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
    );
}