import { Tag } from "types/Tag";
import { IAction, IContent } from "../types/Tags";
import { Dispatch, SetStateAction } from "react";

export const initialState: IContent = {
  isShow: false,
  tags: null,
  inputsContent: ""
};

export function reducer(state: IContent, action: IAction) {
  const { type, payload } = action;

  const deleteDublicates = (array: Array<any>) => Array.from(new Set(array));

  switch (type) {
    case "switchShow": {
      return {
        ...state,
        isShow: !state.isShow
      };
    }
    case "addTag": {
      return {
        ...state,
        tags: payload
      };
    }
    case "addTags": {
      if (!state.tags)
        return {
          ...state,
          tags: deleteDublicates(payload)
        };
      return {
        ...state,
        tags: deleteDublicates(state.tags.concat(payload))
      };
    }
    case "removeTag": {
      if (!state.tags) return state;
      return {
        ...state,
        tags: state.tags.filter((tag) => tag !== payload)
      };
    }
    case "changeInput": {
      return {
        ...state,
        inputsContent: payload as string
      };
    }
    default: {
      return state;
    }
  }
}

interface IHandler {
  content: IContent;
  setTags: Dispatch<SetStateAction<Tag>>;
  dispatch: Dispatch<IAction>;
}

export function handleClick({ content, dispatch }: IHandler) {

  if (content.isShow) {
  }
  
  const value = content.inputsContent
    .split(",")
    .map((tag) => tag.trim())
    .filter((e) => e !== "");

  if(value.length) {
     value.length > 1 ? dispatch({type: "addTags", payload: value}) : null;
  }
  
  dispatch({ type: "changeInput", payload: "" });
  dispatch({ type: "switchShow" });
}
