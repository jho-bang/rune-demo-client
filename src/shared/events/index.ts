import { CustomEventWithDetail, CustomEventWithoutDetail } from "rune-ts";

export class RequestEvent extends CustomEventWithoutDetail {}

export class IsLoading extends CustomEventWithDetail<boolean> {}
