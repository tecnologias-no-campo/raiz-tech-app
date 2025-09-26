import {createClient } from '@supabase/supabase-js'
import Constants from "expo-constants"

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl as string | undefined;
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey as string | undefined;

if(!supabaseUrl || !supabaseAnonKey)    {
    throw new Error("Chaves de acesso do supabase não fornecidas");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);