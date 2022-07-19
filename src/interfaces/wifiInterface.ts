import { Wifi } from "@prisma/client";

export type WifiDataObj = Omit<Wifi, 'id' | 'createdAt'>

export type WifiDataReq = Omit<WifiDataObj, 'userId'>