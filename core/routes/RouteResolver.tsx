import { LayoutLoader } from '../layouts';

const RouteResolver = ({ Component }: { Component: any }) => {
  if (Component?.layout || Component?.subHeader || Component?.content) {
    return (
      <LayoutLoader
        content={Component.content}
        layout={Component.layout}
        subHeader={Component.subHeader}
      />
    );
  }

  return <Component />;
}

export default RouteResolver;
