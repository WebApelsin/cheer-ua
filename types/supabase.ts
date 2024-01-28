export type Json = | string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
    public: {
        Tables: {
            evaluation_criteria: {
                Row: {
                    category: string | null
                    description: string | null
                    id: number
                    max_value: number
                    nomination_id: number
                    order: number
                    subject: string
                }
                Insert: {
                    category?: string | null
                    description?: string | null
                    id?: number
                    max_value?: number
                    nomination_id: number
                    order?: number
                    subject: string
                }
                Update: {
                    category?: string | null
                    description?: string | null
                    id?: number
                    max_value?: number
                    nomination_id?: number
                    order?: number
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
                    user_id: string
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
                        foreignKeyName: "evaluations_performance_id_fkey"
                        columns: ["performance_id"]
                        isOneToOne: false
                        referencedRelation: "performances"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "evaluations_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "evaluations_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            judges: {
                Row: {
                    id: number
                    nomination_id: number
                    user_id: string
                }
                Insert: {
                    id?: number
                    nomination_id: number
                    user_id: string
                }
                Update: {
                    id?: number
                    nomination_id?: number
                    user_id?: string
                }
                Relationships: [
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
                    age: string
                    id: number
                    name: string
                }
                Insert: {
                    age: string
                    id?: number
                    name: string
                }
                Update: {
                    age?: string
                    id?: number
                    name?: string
                }
                Relationships: []
            }
            performances: {
                Row: {
                    coach: string | null
                    id: number
                    is_active: boolean
                    members: string | null
                    nomination_id: number
                    start_time: string | null
                    team: string | null
                }
                Insert: {
                    coach?: string | null
                    id?: number
                    is_active?: boolean
                    members?: string | null
                    nomination_id: number
                    start_time?: string | null
                    team?: string | null
                }
                Update: {
                    coach?: string | null
                    id?: number
                    is_active?: boolean
                    members?: string | null
                    nomination_id?: number
                    start_time?: string | null
                    team?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "performances_nomination_id_fkey"
                        columns: ["nomination_id"]
                        isOneToOne: false
                        referencedRelation: "nominations"
                        referencedColumns: ["id"]
                    }
                ]
            }
            profiles: {
                Row: {
                    given_name: string
                    id: number
                    role: Database["public"]["Enums"]["role"]
                    user_id: string
                }
                Insert: {
                    given_name: string
                    id?: number
                    role: Database["public"]["Enums"]["role"]
                    user_id: string
                }
                Update: {
                    given_name?: string
                    id?: number
                    role?: Database["public"]["Enums"]["role"]
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "profiles_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: true
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "profiles_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: true
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
        }
        Views: {
            startlist: {
                Row: {
                    age: string | null
                    coach: string | null
                    is_active: boolean | null
                    members: string | null
                    nomination: string | null
                    row_number: number | null
                    start_time: string | null
                    team: string | null
                }
                Relationships: []
            }
            users: {
                Row: {
                    email: string | null
                    given_name: string | null
                    id: string | null
                    role: Database["public"]["Enums"]["role"] | null
                }
                Relationships: []
            }
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            role: "visitor" | "judge" | "admin"
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

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
