import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Invitation } from "../entities/invitations.entity";
import { Repository } from "typeorm";


@Injectable()
export class InvitationsService {
    constructor(@InjectRepository(Invitation)
        private invitationRepository: Repository<Invitation>,){} 
    
    async createInvitation(invitationData: Partial<Invitation>): Promise<Invitation> {
        const invitation = this.invitationRepository.create(invitationData);
        return this.invitationRepository.save(invitation);
    }
    async findByHashedToken(hashedToken: string): Promise<Invitation | null> {
        return this.invitationRepository.findOne({ where: { token_hashed: hashedToken } });
    }
}