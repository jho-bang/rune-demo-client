import { html, View } from "rune-ts";
import style from "./style.module.scss";

export interface IAutoCompleteProps<T> {
  dataSource: Array<{
    label: string;
    value: T;
  }>;
  placeholder?: string;
}

export class AutoComplete<T> extends View<IAutoCompleteProps<T>> {
  private onInput(e) {
    const value = e.target.value;
    this.closeAllList();
    if (!value) return false;

    const input = this.element()!.querySelector("input");

    const div = document.createElement("div");
    div.setAttribute("class", style.autocompleteItems);
    input!.parentNode!.appendChild(div);

    this.data.dataSource.forEach((item) => {
      if (item.label.substring(0, value.length).includes(value)) {
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

  override template({ placeholder = "placeholder" }: IAutoCompleteProps<T>) {
    return html`<div class="${style.autocomplete}">
      <input
        id="autocomplete-input"
        type="text"
        placeholder="${placeholder}"
        class="${style.autocomplete_input}"
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
