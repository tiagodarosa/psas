import { StatusNineBox } from "./status-nine-box.enum";
import UserData from "./user-data";

export default class NineBoxData {

    color: string;
    status: StatusNineBox;
    value: number;
    percentage: number;
    totalUsers: number;
    users: Array<UserData>;

    constructor(status: StatusNineBox, value: number, percentage: number, totalUsers: number, users: Array<UserData>) {
        this.status = status;
        this.value = value;
        this.percentage = percentage;
        this.totalUsers = totalUsers;
        this.users = users || [];
    }

}