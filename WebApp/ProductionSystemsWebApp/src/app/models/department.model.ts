import { Station } from "./station.model";

export interface Department{
    nodeId: string;
    keyId: string;
    parentId: string;
    name: string;
    stations?: Station[];
}