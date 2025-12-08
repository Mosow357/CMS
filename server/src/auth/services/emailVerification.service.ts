import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EmailVerification } from "../entities/emailVerification";
import { Repository } from "typeorm";

@Injectable()
export class EmailVerificationService {
    constructor(@InjectRepository(EmailVerification) private emailVerificationRepo:Repository<EmailVerification>){}

    async create(email: string, token: string, expiresAt: Date): Promise<EmailVerification> {
        const emailVerification = this.emailVerificationRepo.create({
            email,
            token,
            expiresAt,
        });
        return this.emailVerificationRepo.save(emailVerification);
    }
    async update(emailVerification: EmailVerification): Promise<EmailVerification> {
        return this.emailVerificationRepo.save(emailVerification);
    }
    async findByToken(token: string): Promise<EmailVerification | null> {
        return this.emailVerificationRepo.findOne({ where: { token } });
    }
}