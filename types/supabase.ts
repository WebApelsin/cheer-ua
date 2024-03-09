export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
    public: {
        Tables: {
            ages: {
                Row: {
                    id: number
                    name: string
                }
                Insert: {
                    id?: number
                    name: string
                }
                Update: {
                    id?: number
                    name?: string
                }
                Relationships: []
            }
            evaluation_criteria: {
                Row: {
                    category: string | null
                    description: string | null
                    id: number
                    max_value: number
                    nomination_id: number
                    sort_order: number
                    subject: string
                }
                Insert: {
                    category?: string | null
                    description?: string | null
                    id?: number
                    max_value?: number
                    nomination_id: number
                    sort_order?: number
                    subject: string
                }
                Update: {
                    category?: string | null
                    description?: string | null
                    id?: number
                    max_value?: number
                    nomination_id?: number
                    sort_order?: number
                    subject?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "evaluation_criteria_nomination_id_fkey"
                        columns: ["nomination_id"]
                        isOneToOne: false
                        referencedRelation: "nominations"
                        referencedColumns: ["id"]
                    }
                ]
            }
            evaluations: {
                Row: {
                    criteria_id: number
                    id: number
                    performance_id: number
                    user_id: string
                    value: number
                }
                Insert: {
                    criteria_id: number
                    id?: number
                    performance_id: number
                    user_id?: string
                    value?: number
                }
                Update: {
                    criteria_id?: number
                    id?: number
                    performance_id?: number
                    user_id?: string
                    value?: number
                }
                Relationships: [
                    {
                        foreignKeyName: "evaluations_criteria_id_fkey"
                        columns: ["criteria_id"]
                        isOneToOne: false
                        referencedRelation: "evaluation_criteria"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "evaluations_criteria_id_fkey"
                        columns: ["criteria_id"]
                        isOneToOne: false
                        referencedRelation: "evaluations_template"
                        referencedColumns: ["criteria_id"]
                    },
                    {
                        foreignKeyName: "evaluations_performance_id_fkey"
                        columns: ["performance_id"]
                        isOneToOne: false
                        referencedRelation: "evaluations_template"
                        referencedColumns: ["performance_id"]
                    },
                    {
                        foreignKeyName: "evaluations_performance_id_fkey"
                        columns: ["performance_id"]
                        isOneToOne: false
                        referencedRelation: "performances"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "evaluations_performance_id_fkey"
                        columns: ["performance_id"]
                        isOneToOne: false
                        referencedRelation: "startlist"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "pevaluations_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            events: {
                Row: {
                    chief_judge: string | null
                    chief_secretary: string | null
                    id: number
                    image: string | null
                    is_active: boolean
                    name: string
                    start_date: string
                }
                Insert: {
                    chief_judge?: string | null
                    chief_secretary?: string | null
                    id?: number
                    image?: string | null
                    is_active?: boolean
                    name: string
                    start_date?: string
                }
                Update: {
                    chief_judge?: string | null
                    chief_secretary?: string | null
                    id?: number
                    image?: string | null
                    is_active?: boolean
                    name?: string
                    start_date?: string
                }
                Relationships: []
            }
            judges: {
                Row: {
                    age_id: number
                    event_id: number
                    id: number
                    nomination_id: number
                    user_id: string
                }
                Insert: {
                    age_id: number
                    event_id: number
                    id?: number
                    nomination_id: number
                    user_id: string
                }
                Update: {
                    age_id?: number
                    event_id?: number
                    id?: number
                    nomination_id?: number
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "judges_age_id_fkey"
                        columns: ["age_id"]
                        isOneToOne: false
                        referencedRelation: "ages"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "judges_event_id_fkey"
                        columns: ["event_id"]
                        isOneToOne: false
                        referencedRelation: "events"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "judges_nomination_id_fkey"
                        columns: ["nomination_id"]
                        isOneToOne: false
                        referencedRelation: "nominations"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "judges_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            nominations: {
                Row: {
                    id: number
                    name: string
                }
                Insert: {
                    id?: number
                    name: string
                }
                Update: {
                    id?: number
                    name?: string
                }
                Relationships: []
            }
            performances: {
                Row: {
                    age_id: number
                    coach: string | null
                    event_id: number
                    id: number
                    is_active: boolean
                    is_editable: boolean
                    members: string | null
                    nomination_id: number
                    start_time: string | null
                    team: string | null
                }
                Insert: {
                    age_id: number | null
                    coach?: string | null
                    event_id: number
                    id?: number
                    is_active?: boolean
                    is_editable?: boolean
                    members?: string | null
                    nomination_id: number
                    start_time?: string | null
                    team?: string | null
                }
                Update: {
                    age_id: number | null
                    coach?: string | null
                    event_id?: number
                    id?: number
                    is_active?: boolean
                    is_editable?: boolean
                    members?: string | null
                    nomination_id?: number
                    start_time?: string | null
                    team?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "performances_age_id_fkey"
                        columns: ["age_id"]
                        isOneToOne: false
                        referencedRelation: "ages"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "performances_event_id_fkey"
                        columns: ["event_id"]
                        isOneToOne: false
                        referencedRelation: "events"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "performances_nomination_id_fkey"
                        columns: ["nomination_id"]
                        isOneToOne: false
                        referencedRelation: "nominations"
                        referencedColumns: ["id"]
                    }
                ]
            }
        }
        Views: {
            evaluations_template: {
                Row: {
                    category: string | null
                    criteria_id: number
                    description: string | null
                    max_value: number
                    performance_id: number
                    sort_order: number
                    subject: string | null
                }
                Relationships: []
            }
            startlist: {
                Row: {
                    age_id: number
                    age: string | null
                    coach: string | null
                    event_id: number
                    id: number
                    is_active: boolean
                    is_editable: boolean
                    members: string | null
                    nomination_id: number
                    nomination: string | null
                    row_number: number | null
                    start_time: string | null
                    team: string | null
                }
                Relationships: []
            }
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
};

export type Tables<
    PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
        Row: infer R
    }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
        ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
            Row: infer R
        }
            ? R
            : never
        : never;

export type TablesInsert<
    PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Insert: infer I
    }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
        ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
            Insert: infer I
        }
            ? I
            : never
        : never;

export type TablesUpdate<
    PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Update: infer U
    }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
        ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
            Update: infer U
        }
            ? U
            : never
        : never;

export type Enums<
    PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
        : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
        ? Database["public"]["Enums"][PublicEnumNameOrOptions]
        : never;

export type Event = Database["public"]["Tables"]["events"]["Row"];
export type Performance = Database["public"]["Views"]["startlist"]["Row"];
export type Evaluation = Database["public"]["Tables"]["evaluations"]["Row"];
export type EvaluationCriteria = Database["public"]["Views"]["evaluations_template"]["Row"];
export type Assignment = Database["public"]["Tables"]["judges"]["Row"];