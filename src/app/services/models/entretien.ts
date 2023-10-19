import { Feedback } from './feedback';


export class Entretien {
  id?: string;
  datecreation?: string;
  date?: string;
  time?: string;
  commentaire?: string;
  feedback?: Feedback;
  entretienType?:string;
  
}
