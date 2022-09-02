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
        this.startPeriod = '01/01/2000';
        this.endPeriod = '01/01/2100';
        this.relatedSkills = new Array();
    }

}