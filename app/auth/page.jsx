import { Flex, Box, Heading, Text, TextFieldRoot, TextFieldInput, TextFieldSlot, Button } from "@radix-ui/themes";
import { AvatarIcon, LockClosedIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import styles from "@/styles/auth.module.css";

export default function Auth() {
    return (
        <main className="full-height">
            <Flex direction="column" align="center" justify="center" height="100%">
                <form action="/auth/signin" method="post">
                    <Box className={styles.container}>
                        <Box className={styles.header}>
                            <Heading>Авторизація</Heading>
                            <Text size="2" color="gray">Увійдіть під своїм акаунтом</Text>
                        </Box>

                        <Box className={styles.field}>
                            <Text as="label" className={styles.label} htmlFor="email" size="2" weight="medium">
                                E-mail
                            </Text>

                            <TextFieldRoot>
                                <TextFieldSlot>
                                    <AvatarIcon width={16} height={16} />
                                </TextFieldSlot>
                                <TextFieldInput name="email" type="email" size="3"
                                    placeholder="username@cheer.ua" required />
                            </TextFieldRoot>
                        </Box>

                        <Box className={styles.field}>
                            <Text as="label" className={styles.label} htmlFor="password" size="2" weight="medium">
                                Пароль
                            </Text>

                            <TextFieldRoot>
                                <TextFieldSlot>
                                    <LockClosedIcon width={16} height={16} />
                                </TextFieldSlot>
                                <TextFieldInput name="password" type="password" size="3"
                                    placeholder="пароль" required />
                            </TextFieldRoot>
                        </Box>

                        <Flex className={styles.footer} direction="row" justify="end">
                            <Button>
                                Увійти <ArrowRightIcon width={16} height={16} />
                            </Button>
                        </Flex>
                    </Box>
                </form>
            </Flex>
        </main>
    );
}