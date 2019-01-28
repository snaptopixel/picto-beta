import {
  Component,
  Element,
  Event,
  EventEmitter,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { css } from 'emotion';

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
  @Event() navLinkClicked: EventEmitter<ILink>;
  @Prop() options: Array<IMenu | ILink> = [];
  @State() selectedLink: ILink;
  @State() visibleOptions: IMenu[];
  rawLinks: ILink[] = [];
  searchEl: HTMLInputElement;

  onSearchInput = (event: Event) => {
    const options = {
      minMatchCharLength: 2,
      keys: ['label'] as any,
    };
    if (this.searchEl.value) {
      const links = this.rawLinks.filter(l => {
        return l.label
          .toLowerCase()
          .includes(this.searchEl.value.toLowerCase());
      });
      if (links.length) {
        this.visibleOptions = [{ label: 'Results' }, { links }];
      } else {
        this.visibleOptions = [
          {
            links: [{ label: 'No results…', icon: 'exclamation-triangle' }],
          },
        ];
      }
    } else {
      this.visibleOptions = this.options;
    }
  };
  renderLink(link: IMenu, showActive = true) {
    return link.sref ? (
      <stencil-route-link
        url={link.sref}
        exact={true}
        activeClass={showActive ? 'is-active' : ''}
        anchorClass={styles.link}
        onClick={e => {
          this.navLinkClicked.emit(link);
        }}
      >
        {link.links && (
          <picto-icon
            name={link.icon || 'book'}
            styleType={(link.iconStyle as any) || 'solid'}
            style={{ float: 'left', marginTop: '-5px' }}
            class='has-text-grey-light'
          />
        )}
        {!link.links && (
          <picto-icon
            name={link.icon || 'file-alt'}
            styleType={(link.iconStyle as any) || 'solid'}
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
            this.navLinkClicked.emit(link);
          }
        }}
      >
        <picto-icon
          style={{ float: 'left', marginTop: '-5px' }}
          class='has-text-grey-light'
          name={link.icon || 'link'}
          styleType={(link.iconStyle as any) || 'solid'}
        />
        {link.label}
      </a>
    );
  }
  @Watch('options')
  componentWillLoad() {
    this.visibleOptions = this.options;
    this.rawLinks = [];
    const parseLink = (link: IMenu) => {
      if (link.href || link.sref) {
        this.rawLinks.push(link);
      }
      if (link.links) {
        link.links.map(parseLink);
      }
    };
    this.options.map(parseLink);
  }
  render() {
    return [
      <picto-styled>
        <aside class='menu is-size-7'>
          <ul class='menu-list'>
            <li>
              <p class='control has-icons-left has-icons-right'>
                <input
                  class='input is-small'
                  style={{ marginBottom: '10px' }}
                  type='text'
                  placeholder='Find…'
                  ref={el => (this.searchEl = el)}
                  onInput={this.onSearchInput}
                />
                <span class='icon is-small is-left'>
                  <i class='fas fa-search' />
                </span>
              </p>
              {this.visibleOptions.map((opt: IMenu) => {
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
