export interface IPerson {
    id: string; // UUID
    created_at: Date; // Timestamp
    last_edited_by: string; // UUID
    first_name: string; // Text
    last_name: string; // Text
    born: Date; // Date
    sex: string; // Text
    fullname: string;
    died: Date | undefined; // Date (optional)
    died_where: string | undefined; // Text (optional)
    born_where: string | undefined; // Text (optional)
    middle_name: string | undefined; // Text (optional)
    maiden_name?: string | undefined; // Text (optional)
    alias: string | undefined; // Text (optional)
    mother: string | undefined;
    father: string | undefined;
    step_mother: string | undefined;
    step_father: string | undefined;
}

export class PersonModel {
    id: string; // UUID
    created_at: Date; // Timestamp
    first_name: string; // Text
    middle_name: string | undefined; // Text (optional)
    last_name: string; // Text
    maiden_name: string | undefined; // Text (optional)
    alias: string | undefined; // Text (optional)
    born: Date; // Date
    died: Date | undefined; // Date (optional)
    last_edited_by: string; // UUID
    sex: string; // Text
    died_where: string | undefined; // Text (optional)
    born_where: string | undefined; // Text (optional)
    mother: string | undefined;
    father: string | undefined;
    step_mother: string | undefined;
    step_father: string | undefined;
    constructor(data: {
        id: string;
        created_at: Date;
        first_name: string;
        last_name: string;
        born: Date;
        last_edited_by: string;
        sex: string;
        fullname: string;
        alias: string | undefined;
        died: Date | undefined;
        died_where: string | undefined;
        born_where: string | undefined;
        middle_name: string | undefined;
        maiden_name: string | undefined;
        mother: string | undefined;
        father: string | undefined;
        step_mother: string | undefined;
        step_father: string | undefined;
    }) {
        this.id = data.id;
        this.created_at = data.created_at;
        this.first_name = data.first_name;
        this.middle_name = data.middle_name;
        this.last_name = data.last_name;
        this.maiden_name = data.maiden_name;
        this.alias = data.alias;
        this.born = data.born;
        this.died = data.died;
        this.last_edited_by = data.last_edited_by;
        this.sex = data.sex;
        this.died_where = data.died_where;
        this.born_where = data.born_where;
        this.mother = data.mother;
        this.father = data.father;
        this.step_mother = data.step_mother;
        this.step_father = data.step_father;
    }

    get fullname(): string {
        let fullname = `${this.first_name} ${this.middle_name ? this.middle_name + ' ' : ''}${this.last_name}`;
        if (this.sex === 'Female' && this.maiden_name) {
            fullname += ` (${this.maiden_name})`;
        }
        return fullname;
    }
}

// Convert a single data string to an IPerson object
export function convertStringToPerson(dataString: string): IPerson {
    const data = JSON.parse(dataString);
    // Ensure parent fields are properly copied
    return {
        ...data,
        born: new Date(data.born),
        died: data.died ? new Date(data.died) : undefined,
        created_at: new Date(data.created_at),
        // Explicitly copy parent relationships
        mother: data.mother || undefined,
        father: data.father || undefined,
        step_mother: data.step_mother || undefined,
        step_father: data.step_father || undefined
    };
}

// Convert an array of data strings to an array of IPerson objects
export function convertStringsToPeople(dataStrings: string[]): IPerson[] {
    return dataStrings.map(dataString => convertStringToPerson(dataString));
}

export function newID(): string {
    return crypto.randomUUID();
}