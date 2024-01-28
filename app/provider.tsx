"use client";

import { Theme } from "@radix-ui/themes";

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <Theme
            appearance="light"
            accentColor="violet"
            grayColor="gray"
            panelBackground="solid"
            scaling="100%"
            radius="medium">
            {children}
        </Theme>
    );
}