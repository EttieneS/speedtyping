export class User {
  id: number;
  name: string;
  lastName: string;
  cellNumber: string;
  idNumber: string;
  dateCreated: Date = new Date();
  dateOfBirth: Date = new Date();
  score: number;
  competition: boolean;
}
