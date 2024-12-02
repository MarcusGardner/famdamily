import { CREATE, RETRIEVE, UPDATE, DELETE, RETRIEVE_OR, DB_GET_COUPLES_WITH_PARTNER } from './api/db';
import { supabase } from '../supabaseClient';
import type { IPerson } from './appModel';
import { PersonModel } from './appModel';

let debugging: boolean = false;
// Fetch all records from a table
export async function fetchAll(tablename: string) {
    return await RETRIEVE('fetchAll', tablename, ['*'], {});
}

// Fetch a single record by ID
export async function fetchSingle(tablename: string, whereConditions: Record<string, any>) {
    return await RETRIEVE('fetchSingle', tablename, ['*'], { whereConditions });
}

// Update a single record by ID
export async function updateSingle(tablename: string, id: string, updatedFieldValues: Record<string, any>) {
    return await UPDATE('updateSingle', id, tablename, updatedFieldValues);
}

// Update multiple records with conditions
export async function updateBatch(tablename: string, conditions: Record<string, any>, updatedFieldValues: Record<string, any>) {
    let query = supabase.from(tablename).update(updatedFieldValues);

    for (const [key, value] of Object.entries(conditions)) {
        query = query.eq(key, value);
    }

    const { data, error } = await query;
    return { data, error };
}

// Delete a single record by ID
export async function deleteSingle(tablename: string, id: string) {
    return await DELETE('deleteSingle', tablename, id);
}

// Insert a single record
export async function insertSingle(tablename: string, fieldnameValueKeyPairs: Record<string, any>) {
    return await CREATE('insertSingle', tablename, fieldnameValueKeyPairs);
}

// Insert multiple records
export async function insertBatch(tablename: string, records: Record<string, any>[]) {
    const { data, error } = await supabase
        .from(tablename)
        .insert(records);
    return { data, error };
}



export async function db_LoadPeople(): Promise<{ data: string[] | null; error: string | null }> {
    
    const { data, error } = await RETRIEVE('loadPeople', 'vw_person', ['*'], {});

    if (error) {
        return { data: null, error: `Failed to load people: ${error.message}` };
    }

    if (!data || !Array.isArray(data)) {
        return { data: null, error: 'Data is not an array' };
    }

    // Convert each item to a string representation
    const stringData = data.map(item => JSON.stringify(item));
    return { data: stringData, error: null };
}

