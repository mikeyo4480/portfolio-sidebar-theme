/**
 * Copyright 2025 mikeyo4480
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `portfolio-sidebar`
 *
 * @demo index.html
 * @element portfolio-sidebar
 */
export class PortfolioSidebar extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "portfolio-sidebar";
  }

  constructor() {
    super();
    this.title = "";
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
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
            --portfolio-sidebar-label-font-size,
            var(--ddd-font-size-s)
          );
        }
        .sidenav {
          height: 100vh;
          width: 250px;
          position: fixed;
          top: 0;
          left: 0;
          background-image: url("https://github.com/mikeyo4480/portfolio-sidebar-theme/blob/main/assets/bg.png?raw=true");
          background-size: cover;
        }
        a {
          font-family: sans-serif;
          font-size: 30px;
          text-align: center;
          justify-content: center;
          background-color: var(--ddd-theme-default-slateGray);
          border: none;
          margin-left: 42px;
          text-align: center;
          display: block;
          color: white;
        }
        scroll-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: var(--ddd-theme-default-beaver80);
          color: white;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
      `,
    ];
  }

  // Lit render the HTML
  render() {
    return html` <div class="wrapper">
      <div class="sidenav">
        <slot></slot>
        <scroll-button></scroll-button>
      </div>
    </div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(PortfolioSidebar.tag, PortfolioSidebar);
