class Collapse extends HTMLElement {
  static items = new Set;
  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = /*html*/`
      <main>
        <header>
          <slot name="header"></slot>
        </header>
        <section>
          <slot></slot>
        </section>
      </main>
      <style>
        :host {
          display: block;
        }
        :host([open]) main > section {
          max-height: var(--scroll-height, fit-content);
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
      </style>
    `;
    const templateContent = template.content;
    this.attachShadow({ mode: 'open' }).appendChild(templateContent.cloneNode(true));
  }

  get open() {
    return this.hasAttribute('open');
  }

  close() {
    if (this.open) {
      const section = this.shadowRoot.querySelector('main > header + section');
      section.style.setProperty('--scroll-height', section.scrollHeight + 'px');
      setTimeout(() => {
        this.removeAttribute('open');
      }, 0);
    }
  }

  connectedCallback() {
    Collapse.items.add(this);
    const host = this;
    const header = this.shadowRoot.querySelector('main > header');
    const section = this.shadowRoot.querySelector('main > header + section');

    const slotHeader = this.querySelector('[slot="header"]');
    if (!slotHeader) {
      header.innerHTML = this.getAttribute('placeholder');
    }

    header.addEventListener('click', () => {
      if (!this.open) {
        getSiblings().forEach(item => item.close());
      }
      section.style.setProperty('--scroll-height', `${section.scrollHeight}px`);
      setTimeout(() => this.toggleAttribute('open'), 0);
    });

    section.addEventListener('transitionend', () => {
      section.style.removeProperty('--scroll-height');
    });

    function getSiblings() {
      const name = host.getAttribute('name');
      if (!name) return [];
      return Array.from(Collapse.items).filter(item => item.getAttribute('name') === name && item !== host);
    }
  }

  disconnectedCallback() {
    Collapse.items.delete(this);
  }
}

customElements.define('collapse-wrapper', Collapse);
