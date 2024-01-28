import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseURL = "https://ebevadwcakijqkebpoac.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViZXZhZHdjYWtpanFrZWJwb2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYwMjY0NTksImV4cCI6MjAyMTYwMjQ1OX0.bpi1JlQaftU3tGrilieMIMQQXJnWaNhbfN0Fva9oVGE";
export const supabase = createClient(supabaseURL, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
