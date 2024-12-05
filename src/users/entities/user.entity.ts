import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid4 } from 'uuid';

export type UserEntityDocument = UserEntity & Document;

@Schema({ collection: 'users', timestamps: true })
export class UserEntity {
  @Prop({ default: uuid4 })
    _id: string;

  @Prop({ required: true })
    mobile: string;

  @Prop({ required: false })
    username?: string;

  @Prop({ required: false })
    password?: string;

  @Prop({ required: false })
    imageId?: string;

  @Prop({ required: false })
    gender?: string;

  @Prop({ required: false })
    firstName?: string;

  @Prop({ required: false })
    lastName?: string;

  @Prop({ required: false })
    phone?: string;

  @Prop({ required: false })
    province?: string;

  @Prop({ required: false })
    city?: string;

  @Prop({ required: false })
    addresses?: Array<string>;
}

const UserEntitySchema = SchemaFactory.createForClass(UserEntity);

UserEntitySchema.index({ username: 1 }, { unique: true });
UserEntitySchema.index({ mobile: 1 }, { unique: true });

export { UserEntitySchema };