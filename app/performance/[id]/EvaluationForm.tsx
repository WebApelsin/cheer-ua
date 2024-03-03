"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { groupBy } from "@/utils";

import { Section, Flex, Box, Heading, Text, Button, Separator } from "@radix-ui/themes";
import { CheckIcon, UpdateIcon } from "@radix-ui/react-icons";
import Spinner from "@/components/Spinner";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database, Evaluation, EvaluationCriteria } from "@/types/supabase";
export type EvaluationInsert = Database["public"]["Tables"]["evaluations"]["Insert"];

type EvaluationFormProps = {
    performance_id: number;
    evaluations: Evaluation[];
    criterias: EvaluationCriteria[];
};

export default function EvaluationForm(props: EvaluationFormProps): React.ReactNode {
    const { performance_id, evaluations, criterias } = props;

    const criteriaGroups = groupBy(criterias, ({ category }) => category || "");
    const initialValues = criterias.reduce((result, criteria) => {
        const evaluation = evaluations.find(x => x.criteria_id === criteria.criteria_id);
        if (evaluation) {
            result[criteria.criteria_id] = evaluation.value;
        }

        return result;
    }, {} as { [key: number]: number });


    const router = useRouter();
    const [values, setValues] = useState(initialValues);
    const [submitting, setSubmitting] = useState(false);


    const onChange = (criteria_id: number, value: number) => {
        setValues({ ...values, [criteria_id]: value });
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: validate data
        setSubmitting(true);

        const supabase = createClientComponentClient<Database>();
        const evaluations = Object.entries(values).map(([criteria_id, value]) => ({
            performance_id: performance_id,
            criteria_id: parseInt(criteria_id),
            value: value
        }));

        const { error: deleteError } = await supabase
            .from("evaluations")
            .delete()
            .eq("performance_id", performance_id);

        const { error: insertError } = await supabase
            .from("evaluations")
            .insert(evaluations)
            .select();

        // TODO: handle errors

        setSubmitting(false);
        router.push(`/startlist`);
    };

    const onDismiss = () => {
        router.push(`/startlist`);
    };

    return (
        <form onSubmit={onSubmit}>
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
                                    step={0.5}
                                    onChange={(value) => onChange(criteria_id, value)} />
                            </Flex>
                        )}
                    </Flex>
                </Section>
            )}

            <Section size="2">
                <Flex gap="8" align="center" justify="end">
                    <Button type="button" size="3" color="gray" radius="full" variant="ghost" onClick={onDismiss}>
                        Відміна
                    </Button>
                    <Button size="3" radius="full">
                        Зберегти {submitting ? <UpdateIcon className="animate-spin" /> : <CheckIcon />}
                    </Button>
                </Flex>
            </Section>
        </form>
    );
}