import React, { Component, type Element } from 'react';
import SVGInline from 'react-svg-inline';
import classnames from 'classnames';
import styles from './styles.css';

type OptionalProps = {
  height?: number,
  customClass?: string,
};

type Props = OptionalProps & {
  name: string,
  width: number,
};

type State = {
  svgSource?: string,
  hasLoadProblem?: boolean,
};

export default class SvgIcon extends Component<Props, State> {
  static defaultProps: OptionalProps = {
    height: 0,
    customClass: '',
  };

  state: State = {
    svgSource: undefined,
    hasLoadProblem: undefined,
  };

  componentDidMount(): void {
    const { name } = this.props;

    import(`../../assets/icons/${name}.svg`)
      .then(module => {
        this.setState({ svgSource: module.default });
      })
      .catch(() => this.setState({ hasLoadProblem: true }));
  }

  render(): Element<any> | null {
    const { width, height, customClass } = this.props;
    const { svgSource, hasLoadProblem } = this.state;

    return (
      <>
        {svgSource && !hasLoadProblem && (
          <SVGInline
            className={classnames(styles.Icon, customClass)}
            classSuffix="-icon"
            cleanup
            width={`${width}px`}
            height={height ? `${height}px` : `${width}px`}
            svg={svgSource}
          />
        )}
        {!svgSource && hasLoadProblem && (
          <span className={styles.ProblemMessage}>
            Problem ocurred during svg loading
          </span>
        )}
      </>
    );
  }
}
