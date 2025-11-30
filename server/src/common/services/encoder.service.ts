import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'; 
import { createHash } from "crypto";

@Injectable()
export class EncoderService{
    async encodePassword(password:string):Promise<string>{
        const salt = await bcrypt.genSalt()
        return bcrypt.hashSync(password,salt) 
    }
    async checkPassword(oldPassword:string,newPassword:string):Promise<boolean>{
        return bcrypt.compareSync(oldPassword,newPassword) 
    }
    async encodeToken(token:string):Promise<string>{
        return createHash('sha256').update(token).digest('hex');
    }
}