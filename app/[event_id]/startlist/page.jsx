import { cookies } from "next/headers";
import { getStartlist } from "@/hooks";

import { Container, Heading, Table } from "@radix-ui/themes";
import StartlistItem from "./Item";
import styles from "@/styles/startlist.module.css";

export default async function StartlistPage({ params: { event_id } }) {
    const startlist = await getStartlist(event_id, cookies);

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
                        {startlist.map(item =>
                            <StartlistItem key={item.id} item={item} />
                        )}
                    </Table.Body>
                </Table.Root>
            </Container>
        </main>
    );
}