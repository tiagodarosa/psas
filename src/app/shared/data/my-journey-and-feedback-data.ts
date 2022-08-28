export default class MyJourneyAndFeedbackData {
    
    utilizationDate?: Date;
    informationType?: number;
    recipient?: string;
    message?: string;
    messageType?: number;
    relatedSkills?: Array<string>;
    keepAnonymous?: boolean;
    shareToTeamLeader?: boolean;

    constructor() {
        this.utilizationDate = new Date();
        this.informationType = 1;
        this.recipient = '';
        this.message = '';
        this.messageType = 1;
        this.relatedSkills = new Array();
        this.keepAnonymous = false;
        this.shareToTeamLeader = false;
    }

}