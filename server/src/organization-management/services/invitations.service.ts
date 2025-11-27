import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Invitations } from "../entities/invitations.entity";
import { Repository } from "typeorm";


@Injectable()
export class InvitationsService {
    constructor(@InjectRepository(Invitations)
        private categoriesRepository: Repository<Invitations>,){} 
    
    async createInvitation(invitationData: Partial<Invitations>): Promise<Invitations> {
        const invitation = this.categoriesRepository.create(invitationData);
        return this.categoriesRepository.save(invitation);
    }
}