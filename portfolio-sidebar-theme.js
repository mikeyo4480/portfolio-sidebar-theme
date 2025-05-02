/**
 * Copyright 2025 mikeyo4480
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./portfolio-sidebar.js";
import "@haxtheweb/scroll-button/scroll-button.js";
import "@haxtheweb/awesome-explosion/awesome-explosion.js";

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
          top: var(--ddd-spacing-0);
          left: var(--ddd-spacing-0);
          bottom: var(--ddd-spacing-0);
          margin: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-4);
        }
        h1 {
          font-size: var(--ddd-font-size-3xs);
          font-weight: var(--ddd-font-weight-bold);
          color: var(--ddd-theme-default-beaver80);
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          text-align: right;
          margin-top: var(--ddd-spacing-3);
          margin-bottom: var(--ddd-spacing-0);
        }
        portfolio-sidebar a {
          font-family: var(--ddd-font-primary);
          font-size: var(--ddd-font-size-3xs);
          text-align: center;
          justify-content: center;
          border: none;
          margin-left: var(--ddd-spacing-0);
          text-align: center;
          padding: var(--ddd-spacing-4);
          display: block;
          color: white !important;
          background-color: var(--ddd-theme-default-original87Pink);
          margin-top: var(--ddd-spacing-5);
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
        ul {
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          height: 100vh;
        }
        li {
          display: block;
          list-style: none;
        }
        @media (max-width: 768px) {
          portfolio-sidebar-screen {
            max-width: 200px;
            margin-left: var(--ddd-spacing-25);
            padding: var(--ddd-spacing-2);
          }
          ul li {
            flex-direction: column;
            flex-wrap: wrap;
            justify-content: space-evenly;
            height: auto;
          }
          portfolio-sidebar a {
            font-size: var(--ddd-font-size-3xs);
            padding: var(--ddd-spacing-2);
          }
          portfolio-sidebar {
            font-size: var(--ddd-font-size-3xs);
            width: 100px;
          }
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
              <li>
                <a
                  href="#section-${page.number}"
                  @click="${this.linkChange}"
                  data-index="${index}"
                >
                  ${page.title}
                </a>
              </li>
            `
          )}
        </ul>
      </portfolio-sidebar>
      <div class="wrapper" @page-added="${this.addPage}">
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
      window.history.pushState(
        // doesnt account for pasting links smh
        "data",
        "test",
        `#section-${this.pages[index].number}`
      );
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
    console.log("Page added:", page);
    console.log("Pages array:", this.pages);
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }

  firstUpdated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
    // scroll to the correct target based on hash in the URL
    setTimeout(() => {
      const hash = window.location.hash;
      if (hash) {
        const sectionId = hash.replace("#section-", "");
        const page = this.pages.find((p) => p.number === parseInt(sectionId));
        if (page) {
          page.element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        } else {
          console.warn(`No page found for section id: ${sectionId}`);
        }
      }
    }, 0);
  }
}

globalThis.customElements.define(
  PortfolioSidebarTheme.tag,
  PortfolioSidebarTheme
);
