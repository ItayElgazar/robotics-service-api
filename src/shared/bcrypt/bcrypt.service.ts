import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {

    async hash(data: any, saltOrRounds: string | number): Promise<string> {
        return await bcrypt.hashSync(data, saltOrRounds);
    }

    compare(data: string, encryptedData: string) {
        return bcrypt.compareSync(data, encryptedData);
    }

}
