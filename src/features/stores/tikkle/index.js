import { pipe, each, filter } from "@fxts/core";
import { ISetStore, IStore } from "../../types/tikkle/index.js";
const initialValues = {
  isLoading: false,
};
class Store {
  isLoading;
  originImage;
  newImage;
  constructor({ isLoading }) {
    this.isLoading = isLoading;
  }
  getStore() {
    return {
      isLoading: this.isLoading,
      originImage: this.originImage,
      newImage: this.newImage,
    };
  }
  setStore(data) {
    pipe(
      Object.entries(data),
      filter(([key, value]) => typeof value === "boolean" || value),
      each(([key, value]) => (this[key] = value)),
    );
  }
  resetStore() {
    this.setStore(initialValues);
  }
}
export const store = new Store(initialValues);
