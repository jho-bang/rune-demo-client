import { CustomEventWithDetail, CustomEventWithoutDetail } from "rune-ts";

export class RequestEvent extends CustomEventWithoutDetail {}

export class IsLoading extends CustomEventWithDetail<boolean> {}

export class OnFileSelect extends CustomEventWithDetail<File> {}

export class OnFileSetup extends CustomEventWithDetail<File> {}
