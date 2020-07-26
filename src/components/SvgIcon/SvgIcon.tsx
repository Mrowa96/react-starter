/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { Component } from 'react';
import SVGInline from 'react-svg-inline';
import classnames from 'classnames';
import styles from './SvgIcon.styles.scss';

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
  // eslint-disable-next-line react/static-property-placement
  public static defaultProps: OptionalProps = {
    customClass: '',
    height: 0,
  };

  public constructor(props: SvgIconProps) {
    super(props);

    this.state = {
      hasLoadProblem: undefined,
      svgSource: undefined,
    };
  }

  public componentDidMount(): void {
    const { name } = this.props;

    import(
      /* webpackMode: "lazy-once" */
      `@/static/svg/${name}.svg`
    )
      .then(module => {
        this.setState({ svgSource: module.default });
      })
      .catch(() => this.setState({ hasLoadProblem: true }));
  }

  public render(): JSX.Element {
    const { width, height, customClass } = this.props;
    const { svgSource, hasLoadProblem } = this.state;

    return (
      <>
        {svgSource && !hasLoadProblem && (
          <SVGInline
            className={classnames(styles.Icon, customClass)}
            classSuffix='-icon'
            width={`${width}px`}
            height={height ? `${height}px` : `${width}px`}
            svg={svgSource}
          />
        )}
        {!svgSource && hasLoadProblem && (
          <span className={styles.ProblemMessage}>Problem ocurred during svg loading</span>
        )}
      </>
    );
  }
}
