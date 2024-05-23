import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'global/global';

@Schema()
export class Admin extends AbstractDocument  {
  @Prop()
  public_id: string;

  @Prop({ required: true })
  full_name: string;

  @Prop({ type: String, required: true, unique: true })
  username: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop()
  email_verified_at?: Date;

  @Prop({ type: String, required: true, unique: true })
  phone_number: string;

  @Prop()
  phone_number_verified_at?: Date;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Date.now })
  created_at?: Date;

  @Prop({ default: Date.now })
  updated_at?: Date;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);


/* 

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Admin extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);

 */