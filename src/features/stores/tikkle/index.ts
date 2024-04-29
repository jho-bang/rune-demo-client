import { pipe, each, filter } from "@fxts/core";
import type { ITikkleStore, ITikkleSetStore } from "../../types";

const initialValues: ITikkleStore = {
  isLoading: false,
  originImage: "",
  newImage: "",
};

class TikkleStore {
  isLoading: boolean;
  originImage: string;
  newImage: string;

  constructor({ isLoading, originImage, newImage }: ITikkleStore) {
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

  setStore(data: ITikkleSetStore) {
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

export const tikkleStore = new TikkleStore(initialValues);
