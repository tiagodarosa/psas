export default class MyJourneyAndFeedbackFilterData {
    
    startPeriod?: string;
    endPeriod?: string;
    informationType?: number;
    recipient?: string;
    messageType?: number;
    relatedSkills?: Array<string>;
    userLogged: string;

    constructor() {
        this.informationType = 0;
        this.recipient = '';
        this.messageType = 0;
        this.startPeriod = `01/01/${new Date().getFullYear() - 1}`;
        this.endPeriod = `31/12/${new Date().getFullYear() - 1}`;
        this.relatedSkills = new Array();
    }

}