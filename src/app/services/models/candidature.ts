import { Infocandidate } from "./infocandidate";

export class Candidature {
    id!: string;
    infocandidate!: Infocandidate;
    disponible!:string;
    checked: boolean = false;
    domaine!: string;
    typeDeMission!: string; 
    technologies!: string;
    certifications!: string;
    contrat!: string;
    lettreDeMotivation!: string;
    
}
