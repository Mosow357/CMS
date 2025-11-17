import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class EncoderService{
    async encodePassword(password:string):Promise<string>{
        const salt = await bcrypt.genSalt()
        return bcrypt.hashSync(password,salt) 
    }
    async checkPassword(oldPassword:string,newPassword:string):Promise<boolean>{
        return bcrypt.compareSync(oldPassword,newPassword) 
    }
}