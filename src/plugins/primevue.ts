import "@/assets/styles.scss";

import type { App } from "vue";

import Primevue from "primevue/config";
import DialogService from "primevue/dialogservice";
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";

//directive
import Tooltip from "primevue/tooltip";
import BadgeDirective from "primevue/badgedirective";
import Ripple from "primevue/ripple";
import StyleClass from "primevue/styleclass";

export default function installPrimevue(app: App) {
  return app
    .use(Primevue, { ripple: true })
    .use(DialogService)
    .use(ConfirmationService)
    .use(ToastService)
    .directive("tooltip", Tooltip)
    .directive("badge", BadgeDirective)
    .directive("ripple", Ripple)
    .directive("styleclass", StyleClass);
}
