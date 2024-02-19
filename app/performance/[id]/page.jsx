"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePerformance, useEvaluationCriterias } from "@/hooks";
import { Container, Section, Flex, Box, Heading, Text, Badge, Button, Separator } from "@radix-ui/themes";
import { CheckIcon } from "@radix-ui/react-icons";
import Spinner from "@/components/Spinner";


export default function PerformancePage({ params: { id } }) {
    const router = useRouter();

    const [performance] = usePerformance(id);
    const [criterias] = useEvaluationCriterias(id);
    // const criteriaGroups = Object.groupBy(criterias, ({ category }) => category || "");
    const [values, setValues] = useState({});

    // TODO: check statuses
    // TODO: check if the current user has rights to make evaluations

    const onChange = (criteria_id, value) => {
        setValues({ ...values, [criteria_id]: value });
    };

    const onSubmit = async () => {
        console.log(values);
        // TODO: validate data and submit data

        router.push(`/startlist`);
    };


    const criteriaGroups = criterias?.reduce((groups, criteria) => {
        const category = criteria.category || "";
        const group = groups[category] || [];

        group.push(criteria);
        groups[category] = group;

        return groups;
    }, {}) || {};

    return (
        <main>
            <Container>
                <Section size="2">
                    <Heading>
                        {performance?.team}
                    </Heading>
                    <Text size="2">
                        {performance?.nomination} <Badge color="gray">{performance?.age}</Badge>
                    </Text>
                </Section>

                {Object.entries(criteriaGroups).map(([category, criterias]) =>
                    <Section key={category} size="1">
                        <Box mb="4">
                            <Heading as="h2" size="3" mb="2" color="violet">{category}</Heading>
                            <Separator orientation="horizontal" size="4" />
                        </Box>

                        <Flex direction="column" gap="4">
                            {criterias.map(({ criteria_id, subject, description, max_value }) =>
                                <Flex key={criteria_id} direction="row" align="center" justify="between" gap="9">
                                    <Box>
                                        <Heading as="h3" size="3">{subject}</Heading>
                                        <Text size="2">{description}</Text>
                                    </Box>

                                    <Spinner
                                        value={values[criteria_id] || 0}
                                        min={0}
                                        max={max_value}
                                        onChange={(value) => onChange(criteria_id, value)} />
                                </Flex>
                            )}
                        </Flex>
                    </Section>
                )}

                <Section size="2">
                    <Flex justify="end">
                        <Button size="3" radius="full" onClick={onSubmit}>
                            Зберегти <CheckIcon />
                        </Button>
                    </Flex>
                </Section>
            </Container>
        </main>
    );
}