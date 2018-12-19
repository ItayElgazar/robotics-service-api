import { Exclude, Expose, Transform } from 'class-transformer';
import { ObjectId } from 'bson';

export class LoginInfo {
    @Exclude({ toPlainOnly: true })
    _id: ObjectId;
    @Transform(p => p.toString())
    email: string;
    token: string;

    @Exclude() password: string;


    constructor(partial: Partial<LoginInfo>) {
        Object.assign(this, partial);
    }
}
