import {PropertyType} from "./property";

export interface MessageType {
  _id: string;
  sender: {
    _id: string;
    name: string;
  };
  recipient: {
    _id: string;
    email: string;
  };
  property: PropertyType;
  name: string;
  email: string;
  phone: string;
  body: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}
