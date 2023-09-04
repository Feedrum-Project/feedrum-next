import { Tag } from "types/Tag";

export interface IContent {
  isShow: boolean;
  tags: Tag;
  inputsContent: string;
}

export interface IAction {
  type: "switchShow" | "addTag" | "addTags" | "removeTag" | "changeInput";
  payload?: any;
}