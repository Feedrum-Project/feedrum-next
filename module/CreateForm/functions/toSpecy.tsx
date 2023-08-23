export function toSpecy(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent> & {
    target: { id: string };
  },
  href?: string
) {
  if (e.target === null) return -1;

  const sel = window.getSelection()?.getRangeAt(0);
  if (!sel) return -2;

  const { target } = e;
  let node: Node & HTMLElement;

  switch (target.id) {
    case "h1":
      node = document.createElement("h1");
      break;
    case "h2":
      node = document.createElement("h2");
      break;
    case "h3":
      node = document.createElement("h3");
      break;
    case "h4":
      node = document.createElement("h4");
      break;
    case "h5":
      node = document.createElement("h5");
      break;
    case "italic":
      node = document.createElement("i");
      break;
    case "link":
      node = document.createElement("a");
      if (!href) return -4;
      node.setAttribute("href", href);
      break;
    case "bold":
      node = document.createElement("b");
      break;
    case "image":
      node = document.createElement("img");
      break;
    default:
      return;
  }
  if (node === undefined) return -3;

  const parent = sel?.commonAncestorContainer!.parentNode! as HTMLElement;
  if (parent.tagName === "P" || parent.id === "txt")
    return sel.surroundContents(node);
  return -3;
}
