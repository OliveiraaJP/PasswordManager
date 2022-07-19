import { Card } from "@prisma/client";

export type CardDataObj = Omit <Card, 'createdAt' | 'id'>

export type CardDataReq = Omit<CardDataObj, 'userId'>