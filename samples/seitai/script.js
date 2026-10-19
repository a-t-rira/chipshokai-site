const areaContent = {
  neck: {
    title: "首まわり",
    audience: "長時間のデスクワークやスマートフォンのあと、首まわりがこわばるように感じる方。",
    method: "座り方や動かしやすさを確認し、首と肩の境目に負担の少ない手の圧を添えていきます。"
  },
  shoulder: {
    title: "肩",
    audience: "荷物を持つことや家事が続き、腕を上げづらく感じることがある方。",
    method: "腕の動きや姿勢を確かめ、肩まわりから腕にかけてゆっくり触れていきます。"
  },
  back: {
    title: "背中",
    audience: "座りっぱなしの日や、前かがみの姿勢が多い方。",
    method: "呼吸に合わせて背中の張り具合を確かめ、広い範囲をやさしい手で整えます。"
  },
  waist: {
    title: "腰",
    audience: "立ち仕事や座る仕事のあと、腰まわりが重く感じる方。",
    method: "腰だけでなく、脚や姿勢の動きも確かめながら無理のない範囲で触れていきます。"
  },
  pelvis: {
    title: "骨盤まわり",
    audience: "長い移動や同じ姿勢が続き、腰からお尻のあたりが気になる方。",
    method: "姿勢や動きの癖を確かめ、腰・お尻・脚の付け根を希望に沿って施術します。"
  }
};

const bodyButtons = [...document.querySelectorAll(".body-point")];
const areaTitle = document.querySelector("#area-title");
const audience = document.querySelector("#area-audience");
const method = document.querySelector("#area-method");
const index = document.querySelector(".detail-index");
const bodyIllustration = document.querySelector(".body-illustration");

bodyIllustration.dataset.activeArea = "neck";

bodyButtons.forEach((button, position) => {
  button.addEventListener("click", () => {
    const content = areaContent[button.dataset.area];
    if (!content) return;

    bodyButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    bodyIllustration.dataset.activeArea = button.dataset.area;
    index.textContent = String(position + 1).padStart(2, "0");
    areaTitle.textContent = content.title;
    audience.textContent = content.audience;
    method.textContent = content.method;
  });
});
