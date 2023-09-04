import { Entretien } from "./entretien";
import { Infocandidate } from "./infocandidate";
import { RepenseQRH } from "./repense-qrh";
import { RepenseQTECH } from "./repense-qtech";

export class CompteRendu {
    id!: string;
    entretien!: Entretien;
    infocandidate!: Infocandidate;
    repenseQRH!: RepenseQRH;
    repenseQTECH!: RepenseQTECH[];
}
