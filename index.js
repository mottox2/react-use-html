const { useMemo } = require("react");
const {
  default: parse,
  attributesToProps,
  domToReact,
  Element,
} = require("html-react-parser");

exports.useHtml = (html, components, methods = {}) => {
  const elements = useMemo(() => {
    const options = {
      replace: (node) => {
        if (!(node instanceof Element) || typeof node === "string") return node;
        // FIXME: Rename to attrs
        const props = attributesToProps(node.attribs);
        const children = domToReact(node.children, options);
        const render = components[node.name];
        if (render) return render({ name: node.name, props, children, methods });
        return node;
      },
    };
    return parse(html, options);
  }, [html, components, methods]);
  return elements;
};
