import type { ComponentInterface } from '@stencil/core';
import { Component, Host, Prop, h } from '@stencil/core';
import { createColorClasses } from '@utils/theme';

import { getIonTheme } from '../../global/ionic-global';
import type { Color } from '../../interface';

/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
@Component({
  tag: 'ion-note',
  styleUrls: {
    ios: 'note.ios.scss',
    md: 'note.md.scss',
  },
  shadow: true,
})
export class Note implements ComponentInterface {
  /**
   * The color to use from your application's color palette.
   * Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`.
   * For more information on colors, see [theming](/docs/theming/basics).
   */
  @Prop({ reflect: true }) color?: Color;

  render() {
    const theme = getIonTheme(this);
    return (
      <Host
        class={createColorClasses(this.color, {
          [theme]: true,
        })}
      >
        <slot></slot>
      </Host>
    );
  }
}
