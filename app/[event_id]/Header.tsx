"use client";

import { useRouter } from "next/navigation";
import type { Event } from "@/types/supabase";
import type { User } from "@supabase/supabase-js";

import { Flex, Heading, Text, Avatar, IconButton } from "@radix-ui/themes";
import { ExitIcon, PersonIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import styles from "@/styles/header.module.css";

export default function Header({ event, user }: { event: Event, user: User }) {
    const router = useRouter();

    const onLogout = () => {
        // TODO: show dialog
        router.push("/auth/signout");
    };

    return (
        <header className={styles.header}>
            <div className="container">
                <Flex align="center" justify="between" gap="4">
                    <Link className={styles.branding} href={`/${event.id}/startlist`}>
                        <img className={styles.logo} src={event.image} alt="" />
                        <Heading size="3">{event.name}</Heading>
                    </Link>

                    <Flex align="center" gap="2">
                        <Text size="2">{user.email}</Text>
                        <Avatar radius="full" fallback={<PersonIcon />} />

                        <IconButton type="button" variant="ghost" onClick={onLogout}>
                            <ExitIcon />
                        </IconButton>
                    </Flex>
                </Flex>
            </div>
        </header>
    );
}