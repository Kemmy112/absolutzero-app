// supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hcohhbpqnjhjnnjzppxg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhjb2hoYnBxbmpoam5uanpwcHhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5MzU3MTUsImV4cCI6MjA2NjUxMTcxNX0.hn0RMaqmbvDL8ZLQ4b8XThLlQ8G3XHGd3mVJwcIO8lc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
