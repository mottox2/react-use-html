declare type Components = Record<
  string,
  (props: {
    name: string;
    props: Record<string, string>;
    children: string | JSX.Element | JSX.Element[];
  }) => JSX.Element
>;
export declare const useHtml: (
  html: string,
  components: Components,
  methods: any
) => string | JSX.Element | JSX.Element[];
