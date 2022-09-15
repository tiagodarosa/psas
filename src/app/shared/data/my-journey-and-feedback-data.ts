export default class MyJourneyAndFeedbackData {

    organizationId?: string;
    utilizationDate?: Date;
    informationType?: number;
    recipient?: string;
    recipientName?: string;
    issuer?: string;
    message?: string;
    messageType?: number;
    relatedSkills?: Array<string>;
    keepAnonymous?: boolean;
    shareToTeamLeader?: boolean;
    issuerPhotoUrl: string;
    issuerName: string;

    constructor() {
        this.utilizationDate = new Date();
        this.informationType = 1;
        this.recipient = '';
        this.message = '';
        this.messageType = 0;
        this.relatedSkills = new Array();
        this.keepAnonymous = false;
        this.shareToTeamLeader = false;
        this.issuerPhotoUrl = '';
    }

}