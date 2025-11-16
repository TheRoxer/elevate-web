/**
 * Database TypeScript types generated from Supabase schema
 *
 * This file defines the structure of your Supabase database tables.
 * Update this file when you modify your database schema.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: "user" | "admin";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: "user" | "admin";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: "user" | "admin";
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          client_name: string;
          client_email: string;
          project_type: string;
          status: "Pending" | "In Progress" | "Completed" | "Cancelled";
          deadline: string;
          amount: number;
          description: string;
          notes: string;
          created_at: string;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          id?: string;
          client_name: string;
          client_email: string;
          project_type: string;
          status?: "Pending" | "In Progress" | "Completed" | "Cancelled";
          deadline: string;
          amount: number;
          description: string;
          notes?: string;
          created_at?: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          id?: string;
          client_name?: string;
          client_email?: string;
          project_type?: string;
          status?: "Pending" | "In Progress" | "Completed" | "Cancelled";
          deadline?: string;
          amount?: number;
          description?: string;
          notes?: string;
          created_at?: string;
          updated_at?: string;
          user_id?: string | null;
        };
      };
      tasks: {
        Row: {
          id: number;
          order_id: string;
          text: string;
          status: "pending" | "in-progress" | "completed";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          order_id: string;
          text: string;
          status?: "pending" | "in-progress" | "completed";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          order_id?: string;
          text?: string;
          status?: "pending" | "in-progress" | "completed";
          created_at?: string;
          updated_at?: string;
        };
      };
      chart_data: {
        Row: {
          id: number;
          name: string;
          average: number;
          today: number;
          date: string;
          user_id: string | null;
        };
        Insert: {
          id?: number;
          name: string;
          average: number;
          today: number;
          date?: string;
          user_id?: string | null;
        };
        Update: {
          id?: number;
          name?: string;
          average?: number;
          today?: number;
          date?: string;
          user_id?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      order_status: "Pending" | "In Progress" | "Completed" | "Cancelled";
      task_status: "pending" | "in-progress" | "completed";
    };
  };
}
