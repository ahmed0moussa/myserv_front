import { Entretien } from "./entretien";
import { Infocandidate } from "./infocandidate";
import { RepenseQRH } from "./repense-qrh";
import { RepenseQTECH } from "./repense-qtech";

export class CompteRendu {
    id!: string;
    infocandidate!: Infocandidate;
    repenseQRHList!: RepenseQRH[];
    repenseQTECHList!: RepenseQTECH[];

    compteRenduFile!:string;
}
