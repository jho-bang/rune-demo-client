import { html, View } from "rune-ts";
import { pipe, filter, each } from "@fxts/core";
import style from "./style.module.scss";

export interface IAutoCompleteProps<T> {
  placeholder?: string;
  onChange: (value: T) => void;
  dataSource: Array<{
    label: string;
    value: T;
  }>;
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

    pipe(
      this.data.dataSource,
      filter((item) => item.label.substring(0, value.length).includes(value)),
      each((item) => {
        const _div = document.createElement("div");
        _div.innerHTML = `<strong>${item.label.substring(0, value.length)}</strong>${item.label.substring(value.length)}`;
        _div.addEventListener("click", () => {
          e.target.value = item.value;
          this.data.onChange(item.value);
          this.closeAllList();
        });
        div.appendChild(_div);
      }),
    );
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

  override onMount() {
    const autoCompleteInput = this.element().querySelector(
      "#autocomplete-input",
    );
    if (autoCompleteInput) {
      autoCompleteInput.addEventListener("keyup", (e) => this.onInput(e));
      autoCompleteInput.addEventListener("focusout", () =>
        setTimeout(this.closeAllList, 100),
      );
    }
  }
}
