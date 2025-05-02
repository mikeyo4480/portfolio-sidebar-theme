/**
 * Copyright 2025 mikeyo4480
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `portfolio-sidebar-screen`
 *
 * @demo index.html
 * @element portfolio-sidebar-screen
 */
export class PortfolioSidebarScreen extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "portfolio-sidebar-screen";
  }

  constructor() {
    super();
    this.title = "";
    this.pagenumber = null;
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/portfolio-sidebar-theme.ar.json", import.meta.url)
          .href + "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      pagenumber: { type: Number },
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
          height: 100vh;
          overflow: hidden;
        }
        .wrapper {
          margin: var(--ddd-spacing-0);
          padding-top: var(--ddd-spacing-0);
          margin-left: var(--ddd-spacing-25);
          box-sizing: border-box;
          margin-top: -10px;
        }
        .header {
          width: 100vw;
          background-size: cover;
          background-position: center;
          height: 150px;
          background-color: #6601ff;
          color: var(--ddd-theme-default-white);
        }
        .content {
          margin: 0 auto;
          text-align: center;
          font-size: var(--ddd-font-size-3xs);
        }
        h3 span {
          font-size: var(
            --portfolio-sidebar-screen-label-font-size,
            var(--ddd-font-size-s)
          );
          color: var(--ddd-theme-default-coalyGray);
        }
        @media (max-width: 768px) {
          .header {
            height: 142px;
            background-size: cover;
            background-position: center;
            background: linear-gradient(to right, #6601ff, #353ae1);
          }
          .content {
            margin: 0 auto;
            text-align: center;
            font-size: var(--ddd-font-size-3xs);
          }
        }
      `,
    ];
  }

  // Lit render the HTML
  render() {
    return html` <div class="wrapper" id="section-${this.pagenumber}">
      <div class="header"> </div>
      <div class="content">
        <slot></slot>
      </div>
    </div>`;
  }

  firstUpdated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
    this.dispatchEvent(
      new CustomEvent("page-added", {
        bubbles: true,
        composed: true,
        detail: {
          value: this,
        },
      })
    );
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
  PortfolioSidebarScreen.tag,
  PortfolioSidebarScreen
);
