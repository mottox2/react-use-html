const { useMemo } = require("react");
const {
  default: parse,
  attributesToProps,
  domToReact,
  Element,
} = require("html-react-parser");

exports.useHtml = (html, components) => {
  const elements = useMemo(() => {
    const options = {
      replace: (node) => {
        if (!(node instanceof Element) || typeof node === "string") return node;
        const props = attributesToProps(node.attribs);
        const children = domToReact(node.children, options);
        const render = components[node.name];
        if (render) return render({ name: node.name, props, children });
        return node;
      },
    };
    return parse(html, options);
  }, [html, components]);
  return elements;
};
