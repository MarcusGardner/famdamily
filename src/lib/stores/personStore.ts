// guidelines: functions prefixed with fetch are to get data from the store itself 
// whereas functions prefixed with load are to get data from the database

import { writable, get } from 'svelte/store';
import type { IPerson } from '../data/appModel';
import { db_LoadPeople, insertSingle, updateSingle } from '../data/db';
import { convertStringsToPeople, newID } from '../data/appModel';

export const people = writable<IPerson[]>([]);
export const selectedPerson = writable<IPerson | null>(null);
export const parents = writable<IPerson[]>([]);
export const partners = writable<IPerson[]>([]);
export const isLoading = writable(false);

export async function loadPeopleFromDb() {
    people.set([]);
    const { data, error } = await db_LoadPeople();
    if (error) {
        console.error('Error loading people:', error);
        return;
    }
    if (data) {
        const peopleArray = convertStringsToPeople(data);
        people.set(peopleArray);
    }
}
// Function to fetch all person data
export function fetchPeople(): IPerson[] {
    return get(people);
}

// Create a writable store for isLoggedIn
export const isLoggedIn = writable(false);

export async function fetchPerson(id: string): Promise<IPerson> {
    const person = get(people).find(person => person.id === id);
    if (!person) {
        throw new Error(`Person with id ${id} not found`);
    }
    return person;
}

export async function addPerson(person: Partial<IPerson>) {
    // save the persons original fullname
    const originalFullName = `${person.first_name} ${person.last_name}`;
    // remove the fullName field from the person object
    const { fullname, ...personWithoutFullName } = person;
    // the person does have an empty id field, create one with crypto.randomUUID()
    const id = person.id || crypto.randomUUID();

    // fix the sex field, its format is { label: "Male", value: "Male"} and should only be the value    
    const sex = typeof person.sex === 'object' && person.sex !== null && 'value' in person.sex
        ? (person.sex as { value: string }).value
        : person.sex;

    // create the person object to insert
    const personToInsert = {
        ...personWithoutFullName,
        id,
        sex
    };
    // insert it into the database
    const { data, error } = await insertSingle('person', personToInsert);
    if (error) {
        console.error('Error adding person:', error);
        return null;
    }
    // update the store with the new person
    // put the original fullname and sex back in to the person object
    const personWithFullName = {
        ...personToInsert,
        fullname: originalFullName
    } as IPerson;  // Type assertion to IPerson
    people.update(people => [...people, personWithFullName]);

    return personToInsert;
}

export function fetchChildren(id1: string, id2: string): IPerson[] {
    const allChildren: IPerson[] = get(people).filter(person => 
        id1 === person.father || 
        id1 === person.step_father || 
        id1 === person.mother || 
        id1 === person.step_mother
    );
    
    const children: IPerson[] = allChildren.filter(child => 
        child.father === id2 || 
        child.mother === id2 || 
        child.step_father === id2 || 
        child.step_mother === id2
    ).sort((a, b) => {
        if (!a.born || !b.born) return 0;
        return new Date(a.born).getTime() - new Date(b.born).getTime();
    });
    
    return children;
}

export async function fetchPartners(id: string): Promise<IPerson[]> {
    const allPeople = get(people);
    const partnersMap = new Map<string, IPerson>();

    // Find all people who have the given id as any type of parent
    const children = allPeople.filter(person =>
        person.father === id ||
        person.mother === id ||
        person.step_father === id ||
        person.step_mother === id
    );

    // For each child, find the other parent(s)
    for (const child of children) {
        const parentFields = [
            { field: 'father', value: child.father },
            { field: 'mother', value: child.mother },
            { field: 'step_father', value: child.step_father },
            { field: 'step_mother', value: child.step_mother }
        ];

        // Add any parent that isn't the original person (id)
        for (const { value } of parentFields) {
            if (value && value !== id) {
                const partner = allPeople.find(p => p.id === value);
                if (partner) {
                    partnersMap.set(partner.id, partner);
                }
            }
        }
    }

    return Array.from(partnersMap.values());
}

export function fetchParents(id: string): IPerson[] {
    const parents: IPerson[] = [];
    const person = get(people).find(person => person.id === id);
    if (person) {
        if (person.father) {
            const fatherPerson = get(people).find(p => p.id === person.father);
            if (fatherPerson) parents.push(fatherPerson);
        }
        if (person.mother) {
            const motherPerson = get(people).find(p => p.id === person.mother);
            if (motherPerson) parents.push(motherPerson);
        }
        if (person.step_father) {
            const stepFatherPerson = get(people).find(p => p.id === person.step_father);
            if (stepFatherPerson) parents.push(stepFatherPerson);
        }
        if (person.step_mother) {
            const stepMotherPerson = get(people).find(p => p.id === person.step_mother);
            if (stepMotherPerson) parents.push(stepMotherPerson);
        }
    }
    return parents;
}

export async function updatePerson(updatedPerson: IPerson) {
    // Ensure created_at is always a valid Date
    let created_at: Date;
    try {
        if (updatedPerson.created_at instanceof Date) {
            created_at = updatedPerson.created_at;
        } else if (typeof updatedPerson.created_at === 'string') {
            created_at = new Date(updatedPerson.created_at);
        } else {
            created_at = new Date(); // Fallback to current date
        }

        // Verify the date is valid
        if (isNaN(created_at.getTime())) {
            created_at = new Date(); // Fallback if date is invalid
        }
    } catch (error) {
        created_at = new Date(); // Fallback if any error occurs
    }

    // Create Record<string, any> from person attributes
    const fieldValues: Record<string, any> = {
        created_at, // Use the validated created_at
        first_name: updatedPerson.first_name,
        middle_name: updatedPerson.middle_name || null,
        last_name: updatedPerson.last_name,
        maiden_name: updatedPerson.maiden_name || null,
        alias: updatedPerson.alias || null,
        born: updatedPerson.born,
        died: updatedPerson.died || null,
        last_edited_by: updatedPerson.last_edited_by,
        sex: updatedPerson.sex,
        died_where: updatedPerson.died_where || null,
        born_where: updatedPerson.born_where || null,
        mother: updatedPerson.mother || null,
        father: updatedPerson.father || null,
        step_mother: updatedPerson.step_mother || null,
        step_father: updatedPerson.step_father || null
    };

    // update store
    people.update(currentPeople =>
        currentPeople.map(person =>
            person.id === updatedPerson.id ? updatedPerson : person
        )
    );

    // update database
    const { data, error } = await updateSingle('person', updatedPerson.id, fieldValues);
    if (error) {
        console.error('Error updating person:', error);
    } else {
        console.log('Person updated:', data);
    }
    return { data, error };
}

export function fetchSiblings(exemptPersonId: string, Parents: IPerson[]): IPerson[] {
    const tempPeople = get(people);
    const siblingsMap = new Map<string, IPerson>();

    for (const parent of Parents) {
        // Find all children where the partner is any type of parent
        const children = tempPeople.filter(person => {
                if (person.mother === parent.id ||
                    person.father === parent.id ||
                    person.step_mother === parent.id ||
                    person.step_father === parent.id) 
                {
                        return person.id !== exemptPersonId;
                }
                return false;
        });
        children.forEach(child => siblingsMap.set(child.id, child));
    }

    return Array.from(siblingsMap.values())
        .sort((b, a) => new Date(b.born).getTime() - new Date(a.born).getTime());
}

