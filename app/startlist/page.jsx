"use client";

import { useRouter } from "next/navigation";
import { useStartlist } from "@/hooks";
import { Container, Heading, Badge, Text, Table } from "@radix-ui/themes";
import styles from "@/styles/startlist.module.css";

export default function StartlistPage() {
    const router = useRouter();
    const [startlist] = useStartlist();

    const onClick = (item) => {
        // TODO: check if the current user has rights to make evaluations
        router.push(`/performance/${item.id}`);
    };

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