import React, { type Element } from 'react';
import classnames from 'classnames';
import sprite from '../../styles/sprite.css';
import styles from './styles.css';

type Props = {
  name: string,
};

const SpriteIcon: Function = ({ name }: Props): Element<any> | null => {
  const spriteClassName: string | null = sprite[`icon-${name}`];

  if (!spriteClassName) {
    return null;
  }

  return <span className={classnames(styles.Icon, spriteClassName)} />;
};

export default SpriteIcon;
