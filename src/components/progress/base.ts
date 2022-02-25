import { html, LitElement, nothing } from 'lit';
import { property, queryAssignedElements, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { watch } from '../common/decorators';
import { asPercent, clamp } from '../common/util';

export abstract class IgcProgressBaseComponent extends LitElement {
  protected animation!: Animation;

  @queryAssignedElements()
  protected assignedElements!: Array<HTMLElement>;

  @state()
  protected percentage = 0;

  protected get animationOptions(): KeyframeAnimationOptions {
    return {
      easing: 'ease-out',
      fill: 'forwards',
      duration: this.animationDuration,
    };
  }

  /** Maximum value of the control. */
  @property({ type: Number })
  public max = 100;

  /** The value of the control. */
  @property({ type: Number })
  public value = 0;

  /** The variant of the control. */
  @property()
  public variant: 'primary' | 'info' | 'success' | 'warning' | 'danger' =
    'primary';

  /** Animation duration in milliseconds. */
  @property({ type: Number, attribute: 'animation-duration' })
  public animationDuration = 2000;

  /** The indeterminate state of the control. */
  @property({ type: Boolean, reflect: false })
  public indeterminate = false;

  /** Shows/hides the label of the control. */
  @property({ type: Boolean, attribute: 'hide-label', reflect: false })
  public hideLabel = false;

  /**
   * Format string for the default label of the control.
   * Placeholders:
   *  {0} - current value of the control.
   *  {1} - max value of the control.
   */
  @property({ attribute: 'label-format' })
  public labelFormat!: string;

  @watch('indeterminate', { waitUntilFirstUpdate: true })
  protected indeterminateChange() {
    if (!this.indeterminate) {
      this.runAnimation(0, this.value, true);
    } else {
      setTimeout(() => {
        this.animation?.finish();
        setTimeout(() => {
          this.animation?.cancel();
        }, 0);
      }, 0);
    }
  }

  @watch('max', { waitUntilFirstUpdate: true })
  protected maxChange() {
    this.max = Math.max(0, this.max);
    if (this.value > this.max) {
      this.value = this.max;
    } else {
      if (!this.indeterminate) {
        this.runAnimation(0, this.value);
      }
    }
  }

  @watch('value', { waitUntilFirstUpdate: true })
  protected valueChange(oldVal: number) {
    this.value = clamp(this.value, 0, this.max);
    if (!this.indeterminate) {
      this.runAnimation(oldVal, this.value);
    }
  }

  protected override firstUpdated() {
    if (!this.indeterminate) {
      this.runAnimation(0, this.value);
    }
  }

  protected animateLabelTo(
    start: number,
    end: number,
    animationDuration: number
  ) {
    let t0: number;

    const tick = (t1: number) => {
      t0 = t0 ?? t1;

      const progress = Math.min((t1 - t0) / (animationDuration || 1), 1);
      this.percentage = Math.floor(
        asPercent(Math.floor(progress * (end - start) + start), this.max)
      );
      progress < 1
        ? requestAnimationFrame(tick)
        : cancelAnimationFrame(requestAnimationFrame(tick));
    };

    requestAnimationFrame(tick);
  }

  protected renderLabelFormat() {
    return this.labelFormat
      .replace(/\{0\}/gm, `${this.value}`)
      .replace(/\{1\}/gm, `${this.max}`);
  }

  protected renderDefaultSlot() {
    return html`<slot part="label" @slotchange=${this.slotChanges}>
      ${when(
        this.indeterminate || this.hideLabel || this.assignedElements.length,
        () => nothing,
        () => html`<span part="value">${this.renderLabelText()}</span>`
      )}
    </slot>`;
  }

  protected renderLabelText() {
    return this.labelFormat ? this.renderLabelFormat() : `${this.percentage}%`;
  }

  protected slotChanges() {
    this.requestUpdate();
  }

  protected abstract runAnimation(
    start: number,
    end: number,
    indeterminateChange?: boolean
  ): void;
}
