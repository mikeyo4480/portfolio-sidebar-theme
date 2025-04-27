/**
 * Copyright 2025 mikeyo4480
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./portfolio-sidebar.js";
import "@haxtheweb/scroll-button/scroll-button.js";

/**
 * `portfolio-sidebar-theme`
 *
 * @demo index.html
 * @element portfolio-sidebar-theme
 */
export class PortfolioSidebarTheme extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "portfolio-sidebar-theme";
  }

  constructor() {
    super();
    this.title = "";
    this.pages = [];
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      pages: { type: Array },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          color: var(--ddd-theme-primary);
          background-color: var(--ddd-theme-accent);
          font-family: var(--ddd-font-navigation);
          overflow-x: hidden;
        }

        h3 span {
          font-size: var(
            --portfolio-sidebar-theme-label-font-size,
            var(--ddd-font-size-s)
          );
        }
        portfolio-sidebar {
          display: block;
          width: 310px;
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          margin: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-4);
        }
        h1 {
          font-size: 48px;
          font-weight: bold;
          color: var(--ddd-theme-default-beaver80);
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          text-align: right;
          margin-top: 10px;
          margin-right: 20px;
          margin-bottom: 0px;
        }
        portfolio-sidebar a {
          font-family: sans-serif;
          font-size: 30px;
          text-align: center;
          justify-content: center;
          border: none;
          margin-top: 100px;
          margin-left: 42px;
          text-align: center;
          padding: var(--ddd-spacing-4);
          display: block;
          color: white;
          background-color: red;
        }
      `,
    ];
  }

  // Lit render the HTML
  render() {
    return html`
      <portfolio-sidebar>
        <ul>
          ${this.pages.map(
            (page, index) => html`
              <a
                href="#${page.number}"
                @click="${this.linkChange}"
                data-index="${index}"
              >
                ${page.title}
              </a>
            `
          )}
        </ul>
      </portfolio-sidebar>
      <div class="wrapper" @page-added="${this.addPage}">
        <h1>Portfolio</h1>
        <slot></slot>
      </div>
    `;
  }

  linkChange(e) {
    e.preventDefault();
    const index = parseInt(e.target.getAttribute("data-index"));
    if (index >= 0 && this.pages[index]) {
      this.pages[index].element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
  addPage(e) {
    const element = e.detail.value;
    const page = {
      number: element.pagenumber, // Still problems with this. Pages arent being added on sidebar
      title: element.title,
      element: element,
    };
    this.pages = [...this.pages, page];
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(
  PortfolioSidebarTheme.tag,
  PortfolioSidebarTheme
);
