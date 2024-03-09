import Link from "next/link";
import { cookies } from "next/headers";
import { getEvents } from "@/api";

import { Container } from "@radix-ui/themes";

export default async function Home() {
    const events = await getEvents(cookies);

    // TODO: redirect to the event page if there are only one active event
    // TODO: show message if there isn't any active event

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
