import { html, Page } from "rune-ts";
import { getCookie } from "../../shared";

import style from "./style.module.scss";

import kakaoLoginBtn from "../../shared/assets/imgs/kakao_login_large_narrow.png";

interface Props {}

export class LoginView extends Page<Props> {
  override onMount() {
    const access_token = getCookie("access_token");
    if (access_token) {
      window.location.href = "/";
    }
  }

  override template() {
    return html`
      <div class="${style.main}">
        <a href="/kakao"><img src="${kakaoLoginBtn}" alt="카카오 로그인" /></a>
      </div>
    `;
  }
}
