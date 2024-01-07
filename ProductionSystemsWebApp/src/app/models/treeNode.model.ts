export interface TreeNode {
  nodeId: string;
  keyId: string;
  parentId: string;
  name: string;
  expandable?: boolean;
  level?: number;
  children?: TreeNode[];
  width: number;
  height: number;
}
