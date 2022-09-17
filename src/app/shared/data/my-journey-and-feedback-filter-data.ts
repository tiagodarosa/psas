export default class MyJourneyAndFeedbackFilterData {
    
    startPeriod?: string;
    endPeriod?: string;
    informationType?: string;
    recipient?: string;
    issuer?: string;
    messageType?: string;
    relatedSkills?: Array<string>;
    userLogged: string;
    organizationId: string;
    teamLeader?: string;
    profile: string;
    membersList?: string;
    words?: string;

    constructor() {
        this.informationType = '';
        this.recipient = '';
        this.issuer = '';
        this.startPeriod = `01/01/${new Date().getFullYear() - 1}`;
        const d = new Date();
        this.endPeriod = `${d.getDate()}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
        this.relatedSkills = new Array();
        this.profile = '';
        this.teamLeader = '';
        this.words = '';
    }

}