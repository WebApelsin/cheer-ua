import { Flex, Box, Card, Heading, Text, TextFieldRoot, TextFieldInput, TextFieldSlot, Button } from "@radix-ui/themes";
import { AvatarIcon, LockClosedIcon, ArrowRightIcon } from "@radix-ui/react-icons";

export default function Auth() {
    return (
        <Flex direction="column" align="center" justify="center" height="100%">
            <form action="/auth/signin" method="post">
                <Card size="4" style={{ maxWidth: "600px" }}>
                    <Heading>Авторизація</Heading>
                    <Text>Увійдіть під своїм акаунтом</Text>

                    <Box mb="4">
                        <Text as="label" htmlFor="email" size="3" weight="medium">E-mail</Text>
                        <TextFieldRoot>
                            <TextFieldSlot>
                                <AvatarIcon width={16} height={16} />
                            </TextFieldSlot>
                            <TextFieldInput name="email"
                                type="email"
                                size="3"
                                placeholder="username@cheer.ua"
                                required />
                        </TextFieldRoot>
                    </Box>

                    <Box mb="4">
                        <Text as="label" htmlFor="password" size="3" weight="medium">Пароль</Text>
                        <TextFieldRoot>
                            <TextFieldSlot>
                                <LockClosedIcon width={16} height={16} />
                            </TextFieldSlot>
                            <TextFieldInput
                                name="password"
                                type="password"
                                size="3"
                                placeholder="пароль"
                                required />
                        </TextFieldRoot>
                    </Box>

                    <Flex direction="row" justify="end">
                        <Button>
                            Увійти <ArrowRightIcon width={16} height={16} />
                        </Button>
                    </Flex>
                </Card>
            </form>
        </Flex>
    );
}