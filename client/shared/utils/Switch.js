export const Switch = ({ children }) => {
  const choice = children.find((child) => child.props.condition || child.props.default);
  return choice?.props?.render?.() ?? null;
};

export const Case = () => null;
