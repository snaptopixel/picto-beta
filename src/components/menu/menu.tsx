import {
  Component,
  Element,
  Event,
  EventEmitter,
  Prop,
  State,
} from '@stencil/core';
import { css } from 'emotion';
import { stubArray } from 'lodash-es';

const styles = {
  title: css`
    margin-bottom: 0.5em !important;
  `,
  link: css`
    padding: 6px 2px !important;
    &.is-active picto-icon {
      color: white !important;
    }
  `,
};

@Component({
  tag: 'picto-menu',
})
export class Menu {
  @Element() el: HTMLElement;
  @Event() linkClicked: EventEmitter<ILink>;
  @Prop() options: Array<IMenu | ILink>;
  @State() selectedLink: ILink;
  renderLink(link: IMenu, showActive = true) {
    return link.sref ? (
      <stencil-route-link
        url={link.sref}
        exact={true}
        activeClass={showActive ? 'is-active' : ''}
        anchorClass={styles.link}
        onClick={e => {
          this.linkClicked.emit(link);
        }}
      >
        {link.links && (
          <picto-icon
            name={link.icon || 'book'}
            style={{ float: 'left', marginTop: '-5px' }}
            class='has-text-grey-light'
          />
        )}
        {!link.links && (
          <picto-icon
            name={link.icon || 'file-alt'}
            style={{ float: 'left', marginTop: '-5px' }}
            class='has-text-grey-light'
          />
        )}
        {link.label}
      </stencil-route-link>
    ) : (
      <a
        class={styles.link}
        href={link.href}
        onClick={e => {
          if (
            e.button === 0 &&
            !e.ctrlKey &&
            !e.shiftKey &&
            !e.altKey &&
            !e.metaKey
          ) {
            e.preventDefault();
            this.linkClicked.emit(link);
          }
        }}
      >
        <picto-icon
          style={{ float: 'left', marginTop: '-5px' }}
          class='has-text-grey-light'
          name={link.icon || 'link'}
        />
        {link.label}
      </a>
    );
  }
  render() {
    return [
      <picto-styled>
        <aside class='menu is-size-7'>
          <ul class='menu-list'>
            <li>
              {this.options.map((opt: IMenu) => {
                if (!opt.links) {
                  return (
                    <p class={`menu-label ${styles.title}`}>{opt.label}</p>
                  );
                } else {
                  return opt.links.map((link: any) => {
                    if (link.links) {
                      return (
                        <li>
                          {this.renderLink(link)}
                          <stencil-route
                            url={link.sref}
                            routeRender={() => (
                              <picto-styled>
                                <ul>
                                  {link.links.map((sublink: ILink) => {
                                    return this.renderLink(sublink);
                                  })}
                                </ul>
                              </picto-styled>
                            )}
                          />
                        </li>
                      );
                    } else {
                      return <li>{this.renderLink(link)}</li>;
                    }
                  });
                }
              })}
            </li>
          </ul>
        </aside>
      </picto-styled>,
    ];
  }
}
