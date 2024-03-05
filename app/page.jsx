import Link from "next/link";
import { cookies } from "next/headers";
import { getEvents } from "@/api";

import { Container } from "@radix-ui/themes";

export default async function Home() {
    const events = await getEvents(cookies);

    // TODO: check if there any active event

    return (
        <main>
            <Container>
                {events.map(event =>
                    <Link key={event.id} href={`/${event.id}/startlist`}>
                        {event.name}
                    </Link>
                )}
            </Container>
        </main>
    );
}
