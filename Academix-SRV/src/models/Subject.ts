export interface Subject {
    id: string;
    name: string;
    created_at: Date
}

//todo: there should be a table for subject-user
//since a subject could belong to many users and a user could own many subjects