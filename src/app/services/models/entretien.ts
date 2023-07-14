import { Feedback } from './feedback';
import { Specialite } from './specialite';

export interface Entretien {
  id?: string;
  nom?: string;
  prenom?: string;
  datecreation?: string;
  datemodif?: string;
  commentaire?: string;
  recruteur?: string;
  specialite?: Specialite;
  feedback?: Feedback;
  loadFileId?: string;
}
