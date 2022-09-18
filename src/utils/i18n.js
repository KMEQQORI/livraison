import i18n from "i18n-js";

import ar from "../locales/ar";
import fr from "../locales/fr";

i18n.locale = "fr";

i18n.fallbacks = false;
i18n.translations = {
  ar,
  fr,
};

export default i18n;
