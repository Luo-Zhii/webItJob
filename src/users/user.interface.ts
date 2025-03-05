import mongoose from "mongoose";

export class IUser {
    _id: string;
    name: string;
    email: string;
    age: number;
    gender: string;
    address: string;
    company: {
        _id : string, 
        name: string
    };
    role: string;
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    createdBy: {
        _id: mongoose.Types.ObjectId, 
        name: string,
    };
    updatedBy: {
        _id: mongoose.Types.ObjectId, 
        name: string,
    };
    deletedBy: {
        _id: mongoose.Types.ObjectId, 
        name: string,
    };
}