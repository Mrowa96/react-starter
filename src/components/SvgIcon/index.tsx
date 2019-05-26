import React, { Component } from 'react';
import SVGInline from 'react-svg-inline';
import classnames from 'classnames';
import styles from './styles.css';

type OptionalProps = {
  height?: number;
  customClass?: string;
};

type SvgIconProps = OptionalProps & {
  name: string;
  width: number;
};

type SvgIconState = {
  svgSource?: string;
  hasLoadProblem?: boolean;
};

export default class SvgIcon extends Component<SvgIconProps, SvgIconState> {
  public static defaultProps: OptionalProps = {
    customClass: '',
    height: 0,
  };

  public state: SvgIconState = {
    hasLoadProblem: undefined,
    svgSource: undefined,
  };

  public componentDidMount(): void {
    const { name } = this.props;

    import(`../../assets/icons/${name}.svg`)
      .then(module => {
        this.setState({ svgSource: module.default });
      })
      .catch(() => this.setState({ hasLoadProblem: true }));
  }

  public render() {
    const { width, height, customClass } = this.props;
    const { svgSource, hasLoadProblem } = this.state;

    return (
      <>
        {svgSource && !hasLoadProblem && (
          <SVGInline
            className={classnames(styles.Icon, customClass)}
            classSuffix="-icon"
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
