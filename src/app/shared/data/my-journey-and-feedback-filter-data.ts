export default class MyJourneyAndFeedbackFilterData {
    
    startPeriod?: string;
    endPeriod?: string;
    informationType?: number;
    recipient?: string;
    messageType?: number;
    relatedSkills?: Array<string>;

    constructor() {
        this.informationType = 0;
        this.recipient = '';
        this.messageType = 0;
        this.startPeriod = new Date(2000, 1, 1).toISOString();
        this.endPeriod = new Date(2100, 1, 1).toISOString();
        this.relatedSkills = new Array();
    }

}