import { useState } from "react";
export interface ISelectedPanel {
  heading?: boolean;
  italic?: boolean;
  link?: boolean;
  bold?: boolean;
  image?: boolean;
  code?: boolean;
}
export default function useSelected(): [ISelectedPanel, (e: string) => void] {
  const [selectedPanel, setSelected] = useState<ISelectedPanel>({
    heading: false,
    italic: false,
    link: false,
    bold: false,
    image: false
  });
  function toSelect(tagName: string) {
    switch (tagName) {
      case "P":
        setSelected({});
        break;
      case "H1":
      case "H2":
      case "H3":
      case "H4":
      case "H5":
      case "H6":
        setSelected({
          heading: true
        });
        break;
      case "EM":
      case "I":
        return setSelected({
          italic: true
        });
      case "A":
        setSelected({
          link: true
        });
        break;
      case "BOLD":
      case "B":
      case "STRONG":
        setSelected({
          bold: true
        });
        break;
      case "IMG":
        setSelected({
          image: true
        });
        break;
      default:
        setSelected({});
        break;
    }
  }
  return [selectedPanel, toSelect];
}
