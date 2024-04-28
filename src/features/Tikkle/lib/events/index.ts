import { CustomEventWithDetail } from "rune-ts";

export class IsLoading extends CustomEventWithDetail<boolean> {}

export class OnFileSelect extends CustomEventWithDetail<File> {}
