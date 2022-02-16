import { html, nothing, svg } from 'lit';
import { query } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { styleMap } from 'lit/directives/style-map.js';
import { asPercent, partNameMap } from '../common/util';
import { IgcProgressBaseComponent } from './base';
import { styles } from './circular.progress.material.css';

const R = 46;
const C = 2 * Math.PI * R;

/**
 * A circular progress indicator used to express unspecified wait time or display
 * the length of a process.
 *
 * @element igc-circular-progress
 *
 * @slot - The text area container.
 *
 * @csspart track
 * @csspart indicator
 */
export default class IgcCircularProgressComponent extends IgcProgressBaseComponent {
  public static readonly tagName = 'igc-circular-progress';
  public static override styles = styles;

  @query('#circle', true)
  protected svgCircle!: SVGCircleElement;

  protected gradientId = Date.now().toString(16);

  protected get isLTR() {
    return window.getComputedStyle(this).getPropertyValue('direction') == 'ltr';
  }

  protected get stroke() {
    return { stroke: `url(#${this.gradientId})` };
  }

  protected get wrapperParts() {
    return {
      wrapper: true,
      indeterminate: this.indeterminate,
    };
  }

  protected getOffset(val: number) {
    return this.isLTR ? C - (val * C) / 100 : C + (val * C) / 100;
  }

  protected override runAnimation(start: number, end: number): void {
    this.animation?.finish();

    const opacity = asPercent(end, this.max) + 0.2;
    const offset0 = this.getOffset(asPercent(start, this.max));
    const offset1 = this.getOffset(asPercent(end, this.max));

    const frames = [
      { strokeDashoffset: offset0, strokeOpacity: 1 },
      { strokeDashoffset: offset1, strokeOpacity: opacity },
    ];

    this.animation = this.svgCircle.animate(frames, this.animationOptions);
    this.animateLabelTo(start, end);
  }

  protected renderLabel() {
    return svg`
      <text text-anchor="middle" x="50" y="60">
          <tspan part="text">
            ${this.renderLabelText()}
          </tspan>
      </text>
    `;
  }

  protected renderSvg() {
    return svg`
      <circle cx="50" cy="50" r="46" part="inner" />
      <circle id="circle" style=${styleMap(
        this.stroke
      )} part="outer" cx="50" cy="50" r="46" />

      ${when(
        this.indeterminate || this.hideLabel,
        () => nothing,
        () => this.renderLabel()
      )}

      <defs>
      <linearGradient id=${this.gradientId} gradientTransform="rotate(90)">
        <stop offset="0%" part="gradient_start" />
        <stop offset="100%" part="gradient_end" />
      </linearGradient>
    </defs>
    `;
  }

  protected renderWrapper() {
    return html`
      <div part="${partNameMap(this.wrapperParts)}">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          part="svg"
          aria-valuemin="0"
          aria-valuemax=${this.max}
          aria-valuenow=${this.value}
        >
          ${this.renderSvg()}
        </svg>
      </div>
    `;
  }

  protected override render() {
    return this.renderWrapper();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'igc-circular-progress': IgcCircularProgressComponent;
  }
}
