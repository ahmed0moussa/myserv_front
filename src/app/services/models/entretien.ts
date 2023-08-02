import { Feedback } from './feedback';
import { loggedin } from './loggedin';
import { Specialite } from './specialite';

export interface Entretien {
  id?: string;
  nom?: string;
  prenom?: string;
  datecreation?: string;
  date?: string;
  time?: string;
  commentaire?: string;
  recruteur?: loggedin;
  specialite?: Specialite;
  feedback?: Feedback;
  loadFileId?: string;
}
