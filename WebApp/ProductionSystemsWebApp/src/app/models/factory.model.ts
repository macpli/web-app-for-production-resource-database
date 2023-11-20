import { Department } from "./department.model";

export interface Factory{
    nodeId: string;
    keyId: string;
    parentId: string;
    name: string;
    departments?: Department[];
}