"use client";

import { useRouter, useParams } from "next/navigation";
import { Table, Text, Badge } from "@radix-ui/themes";
import { DrawingPinFilledIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import styles from "@/styles/startlist.module.css";

import type { Performance } from "@/types/supabase";

type StartlistRowProps = {
    item: Performance,
    score?: number | null,
    active: boolean,
    editable: boolean,
    assigned: boolean
};

export default function StartlistRow({
    item,
    score = null,
    active = false,
    editable = false,
    assigned = false
}: StartlistRowProps) {
    const router = useRouter();
    const params = useParams();

    const onClick = (item: Performance) => {
        if (!assigned)
            return;

        router.push(`/${params.event_id}/performance/${item.id}`);
    };

    const className = classNames(styles.row, {
        [styles.active]: active,
        [styles.assigned]: assigned
    });

    return (
        <Table.Row className={className} onClick={() => onClick(item)}>
            <Table.Cell justify="center">
                {assigned &&
                    <DrawingPinFilledIcon className={classNames(styles.status, styles.assigned, {
                        [styles.editable]: editable
                    })} />
                }
            </Table.Cell>
            {/* <Table.Cell justify="center">
                {item.row_number}
            </Table.Cell> */}
            <Table.Cell justify="end">
                {item.start_time?.replace(/^(\d{2})\:(\d{2})\:(\d{2})$/g, "$1:$2")}
            </Table.Cell>
            <Table.Cell className={styles.nomination}>
                <Text className="nowrap">{item.nomination}</Text>
                <Badge color="gray">{item.age}</Badge>
            </Table.Cell>
            <Table.Cell>
                <Text weight="medium">{item.team}</Text><br />
                <Text size="1" weight="light">{item.members}</Text>
            </Table.Cell>
            <Table.Cell className={styles.coach}>
                <Text className="nowrap">{item.coach}</Text>
            </Table.Cell>
            <Table.Cell justify="end">
                <Text className="nowrap">{score?.toFixed(1)}</Text>
            </Table.Cell>
        </Table.Row>
    );
}