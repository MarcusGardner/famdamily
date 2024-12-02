import { supabase } from '../../supabaseClient'; // Ensure to import supabase client
import type { IPerson } from '../appModel';

let debugging: boolean = true;
// Function to insert a new row
export async function CREATE(queryname: string, tablename: string, fieldnameValueKeyPairs: Record<string, any>) {
    const { data, error } = await supabase
        .from(tablename)
        .insert([fieldnameValueKeyPairs]);
    console.log(`RETRIEVE: ${queryname}`, { data, error });
    return { data, error };
}
export async function RETRIEVE_OR(queryname: string, tablename: string, fieldnames: string[], conditions: Record<string, any>, orConditions?: Record<string, any>) {
    let query = supabase.from(tablename).select(fieldnames.join(','));
    for (const [key, value] of Object.entries(conditions)) {
        query = query.eq(key, value);
    }
    if (orConditions) {
        const orQuery = Object.entries(orConditions)
            .map(([key, value]) => `${key}.eq.${value}`)
            .join(',');
        query = query.or(orQuery);
    }
    const { data, error } = await query;
    return { error, data };
}

export async function RETRIEVE(queryname: string, tablename: string, fieldnames: string[], conditions: Record<string, any>) {
    let query = supabase.from(tablename).select(fieldnames.join(','));
    for (const [key, value] of Object.entries(conditions)) {
        query = query.eq(key, value);
    }

    const { data, error } = await query;
    return { error, data };
}

export async function UPDATE(queryname: string, id: string, tablename: string, updatedFieldValues: Record<string, any>) {
    const { data, error } = await supabase
        .from(tablename)
        .update([updatedFieldValues])
        .eq('id', id);
    console.log(`UPDATE: ${queryname}`, { data, error });
    return { data, error };
}

export async function DELETE(queryname: string, tablename: string, idEquals: string) {
    const { data, error } = await supabase
        .from(tablename)
        .delete()
        .eq('id', idEquals);
    console.log(`DELETE: ${queryname}`, { data, error });
    return { data, error };
}

export async function DB_GET_COUPLE_FROM_CHILD(personId: string) {

    let { data, error } = await supabase
        .rpc('get_couple_by_child', { child_id: personId });

    if (error) {
        console.error('Error calling stored procedure:', error);
    } else {
        console.log('Couple Details:', data);
    }
    return { data, error };
}

export async function DB_GET_COUPLES_WITH_PARTNER(personId: string) {

    let { data, error } = await supabase.rpc('get_couples_by_partner', { partnerid: personId });

    if (error) {
        console.error('Error calling stored procedure:', error);
    } else {
        console.log('Couple Details:', data);
    }
    return { data, error };
}




