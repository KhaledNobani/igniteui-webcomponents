import { html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { asPercent, partNameMap } from '../common/util';
import { IgcProgressBaseComponent } from './base';
import { styles } from './themes/linear/linear.progress.base.css';
import { styles as bootstrap } from './themes/linear/linear.progress.bootstrap.css';
import { styles as fluent } from './themes/linear/linear.progress.fluent.css';
import { styles as indigo } from './themes/linear/linear.progress.indigo.css';
import { themes } from '../../theming';

/**
 * A linear progress indicator used to express unspecified wait time or display
 * the length of a process.
 *
 * @element igc-linear-progress
 *
 * @slot - The text area container.
 *
 * @csspart track
 * @csspart fill
 * @csspart striped
 * @csspart label
 * @csspart value
 * @csspart indeterminate
 * @csspart primary
 * @csspart danger
 * @csspart warning
 * @csspart info
 * @csspart success
 * @csspart top
 * @csspart top-start
 * @csspart top-end
 * @csspart bottom
 * @csspart bottom-start
 * @csspart bottom-end
 */
@themes({ bootstrap, indigo, fluent })
export default class IgcLinearProgressComponent extends IgcProgressBaseComponent {
  public static readonly tagName = 'igc-linear-progress';
  public static override styles = styles;

  /** Sets the striped look of the control. */
  @property({ type: Boolean, reflect: true })
  public striped = false;

  /** The position for the default label of the control. */
  @property({ attribute: 'label-align', reflect: true })
  public labelAlign:
    | 'top-start'
    | 'top'
    | 'top-end'
    | 'bottom-start'
    | 'bottom'
    | 'bottom-end' = 'top-start';

  protected get wrapperParts() {
    return {
      fill: true,
      striped: this.striped,
      indeterminate: this.indeterminate,
      primary: this.variant === 'primary',
      success: this.variant === 'success',
      danger: this.variant === 'danger',
      warning: this.variant === 'warning',
      info: this.variant === 'info',
    };
  }

  protected override runAnimation(start: number, end: number) {
    this.animation?.finish();

    const frames = [
      { width: start },
      { width: `${asPercent(end, this.max)}%` },
    ];

    this.animation = this.progressIndicator.animate(
      frames,
      this.animationOptions
    );
    cancelAnimationFrame(this.tick);
    this.animateLabelTo(start, end);
  }

  protected override render() {
    return html`
      <div
        part="track"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-valuenow=${this.indeterminate ? nothing : this.value}
      >
        <div part="${partNameMap(this.wrapperParts)}"></div>
      </div>
      ${this.renderDefaultSlot()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'igc-linear-progress': IgcLinearProgressComponent;
  }
}
