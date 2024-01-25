import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseURL = "https://cdghajsgkgidasvdkzdd.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkZ2hhanNna2dpZGFzdmRremRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU0NjMwNjgsImV4cCI6MjAyMTAzOTA2OH0.q3IyOyIyQ8gU2qboJaL45Db4eSkfZtiq3IwnGC5gOmA";

export const supabase = createClient(supabaseURL, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
