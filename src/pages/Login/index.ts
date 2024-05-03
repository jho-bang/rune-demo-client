import { html, Page } from "rune-ts";
import { getCookie } from "../../shared";

interface Props {}

export class LoginView extends Page<Props> {
  override onMount() {
    const access_token = getCookie("access_token");
    if (access_token) {
      window.location.href = "/";
    }
  }

  override template() {
    return html` <a href="/kakao">카카오 로그인</a> `;
  }
}
