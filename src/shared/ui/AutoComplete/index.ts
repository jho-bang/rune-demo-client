import { html, View } from "rune-ts";
import style from "./style.module.scss";

interface Props<T> {
  dataSource: Array<{
    label: string;
    value: T;
  }>;
}

export class AutoComplete<T> extends View<Props<T>> {
  private onInput(e) {
    const value = e.target.value;
    this.closeAllList();
    if (!value) return false;

    const input = this.element()!.querySelector("input");

    const div = document.createElement("div");
    div.setAttribute("class", style.autocompleteItems);
    input!.parentNode!.appendChild(div);

    this.data.dataSource.forEach((item) => {
      if (
        item.label.substring(0, value.length).toUpperCase() ===
        value.toUpperCase()
      ) {
        const _div = document.createElement("div");
        _div.innerHTML = `<strong>${item.label.substring(0, value.length)}</strong>${item.label.substring(value.length)}`;
        _div.addEventListener("click", () => {
          e.target.value = item.label;
          this.closeAllList();
        });
        div.appendChild(_div);
      }
    });
  }

  private closeAllList() {
    const list = document.querySelectorAll(`.${style.autocompleteItems}`);
    for (const item of list) {
      if (item && item.parentNode) {
        item.parentNode.removeChild(item);
      }
    }
  }

  override template() {
    return html`<div class="${style.autocomplete}">
      <input
        id="autocomplete-input"
        type="text"
        name="myCountry"
        placeholder="Country"
      />
      <div id="autocomplete-list" class="${style.autocompleteItems}"></div>
    </div>`;
  }

  override onRender() {
    this.element()
      .querySelector("input")!
      .addEventListener("keyup", (e) => {
        this.onInput(e);
      });
  }
}
