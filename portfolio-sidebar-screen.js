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
    this.currentScreen = "home";
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
      currentScreen: { type: String },
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
        }
        .wrapper {
          margin: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-4);
          padding-top: 0;
          margin-left: 100px;
          box-sizing: border-box;
          margin-top: -10px;
          height: 150px;
          width: 100%;
        }
        .header {
          width: 100vw;
          background-image: url("assets/portfolio-banner-3.jpg");
          background-size: cover;
          background-position: center;
          height: 150px;
        }
        .content {
          width: 400px;
          margin: 0 auto;
          text-align: center;
          font-size: 28px;
        }
        h3 span {
          font-size: var(
            --portfolio-sidebar-screen-label-font-size,
            var(--ddd-font-size-s)
          );
          color: black;
        }
      `,
    ];
  }

  // Lit render the HTML
  render() {
    return html` <div class="wrapper">
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
