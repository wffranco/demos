import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class Collapse extends LitElement {
  static items = new Set;
  _height = undefined;

  get _header() {
    return this.renderRoot?.querySelector('header') ?? null;
  }
  get _section() {
    return this.renderRoot?.querySelector('section') ?? null;
  }

  static styles = css`
    :host {
      display: block;
    }
    main {
      --scroll-height: fit-content;
    }
    main > header {
      display: block;
      position: relative;
      cursor: pointer;
    }
    main > section {
      max-height: 0;
      overflow: hidden;
      transition: max-height var(--collapse-delay, 300ms);
    }
    :host([open]) main > section {
      max-height: var(--scroll-height, fit-content);
    }
  `;

  render() {
    return html`
      <main>
        ${this._header ? this._header : html`
          <header @click=${this.toggle}>
            <slot name="header"></slot>  
          </header>
        `}
        ${this._section ? this._section : html`
          <section
            style="${this.height ? `--scroll-height: ${this.height};` : undefined}"
            @transitionend=${() => this._removeHeight()}
          >
            <slot></slot>
          </section>
        `}
      </main>
    `;
  }

  connectedCallback() {
    super.connectedCallback()
    Collapse.items.add(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    Collapse.items.delete(this);
  }

  get _isOpen() {
    return this.hasAttribute('open');
  }

  get _section() {
    return this.shadowRoot.querySelector('main > header + section');
  }

  _setHeight() {
    const section = this._section;
    section.style.setProperty('--scroll-height', `${section.scrollHeight}px`);
  }
  _removeHeight() {
    this._section.style.removeProperty('--scroll-height');
  }

  close() {
    if (this._isOpen) this.toggle();
  }

  open() {
    if (!this._isOpen) this.toggle();
  }

  toggle() {
    this._setHeight();
    if (this._isOpen) {
      setTimeout(() => this.removeAttribute('open'), 0);
    } else {
      setTimeout(() => this.setAttribute('open', ''), 0);
    }
  }
}

customElements.define('collapse-wrapper', Collapse);
