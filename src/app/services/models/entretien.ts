import { Feedback } from './feedback';
import { loggedin } from './loggedin';
import { Specialite } from './specialite';

export class Entretien {
  id?: string;
  lastName?: string;
  firstName?: string;
  datecreation?: string;
  datemodif?: string;
  time?: string;
  commentaire?: string;
  recruteur?: loggedin;
  specialite?: Specialite;
  feedback?: Feedback;
  file?: string;
}
