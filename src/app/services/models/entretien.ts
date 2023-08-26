import { Feedback } from './feedback';
import { loggedin } from './loggedin';
import { Specialite } from './specialite';

export interface Entretien {
  id?: string;
  lastName?: string;
  firstName?: string;
  datecreation?: string;
  date?: string;
  time?: string;
  commentaire?: string;
  recruteur?: loggedin;
  specialite?: Specialite;
  feedback?: Feedback;
  file?: string;
}
