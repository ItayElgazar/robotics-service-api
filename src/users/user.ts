import { Document } from 'mongoose';
import { Roles } from '../shared/permissions/roles.enum';

export interface User extends Document {
    _id: string;
    email: string;
    password: string;
    role: Roles;
}
