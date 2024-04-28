import { pipe, each, filter } from "@fxts/core";
import type { ISetStore, IStore } from "../types";

const initialValues: IStore = {
  isLoading: false,
  originImage: "",
  newImage: "",
};

class Store {
  isLoading: boolean;
  originImage: string;
  newImage: string;

  constructor({ isLoading, originImage, newImage }: IStore) {
    this.isLoading = isLoading;
    this.originImage = originImage;
    this.newImage = newImage;
  }

  getStore() {
    return {
      isLoading: this.isLoading,
      originImage: this.originImage,
      newImage: this.newImage,
    };
  }

  setStore(data: ISetStore) {
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
