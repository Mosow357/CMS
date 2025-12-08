import { API_BASE_URL } from "src/common/constant/constant";
import { EmailNotificationBase } from "./emailNotificationBase";

export class TestimonialInvitationEmailTemplate extends EmailNotificationBase{

    constructor(input:{toEmail:string,token:string}){
        super();
        this.recipentEmail = input.toEmail;
        this.subject = `You're Invited to Share Your Testimonial!`;
        this.variables = {
            token: input.token,
            domain: API_BASE_URL + "/testimonials/submit"
        };
    }
}