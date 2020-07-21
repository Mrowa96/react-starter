import { ReactChildren } from 'react';

type ButtonProps = {
  className?: string;
  children: ReactChildren | string;
  onClick?: () => void;
};

export default ButtonProps;
