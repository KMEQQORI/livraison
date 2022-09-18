export default {
  titles: {
    confirmation_screen: "قم بتأكيد طلبك",
    commande_list: "قائمة طلباتك",
    store: "اختر منتجاتك",
    user_location: "أضف عنوانك",
    user_phone_number: "أضف رقمك",
    user_information: "أضف معلوماتك",
  },
  alerts: {
    login_page: {
      wrong_number_title: "رقم هاتف خاطئ",
      wrong_number_body: "الرقم الذي أدخلته غير صالح يرجى المحاولة مرة أخرى",
      wrong_number_cancel_button: "حاول مرة أخرى",
    },
    confirm_cart_page: {
      wrong_profile_alert: "يرجى ملء كل هذه المعلومات حتى تتمكن من تأكيد طلبك",
    },
  },
  login_page: {
    main_title: "توصيل",
    secondary_title: "سريع",
    input_text: "استخدم رقم هاتفك للاتصال",
  },
  login_check_page: {
    insert_phone_code: "أدخل الرمز المكون من 4 أرقام الذي تلقيته على هاتفك",
    wrong_phone_number:
      "الرمز الذي تم إدخاله غير صحيح ، يرجى المحاولة مرة أخرى",
  },
  service_page: {
    main_title: "الخدمات المقترحة",
  },
  home_page: {
    change_service_button: "تغيير الخدمة",
    change_location: "تحديث موقعك",
    location_alert_button_text: "أضف موقعك",
    localisation_alert:
      "لحساب تكاليف التوصيل بشكل أكثر دقة ، يرجى مشاركة موقعك الحالي معنا",
    empty_store:
      "لا توجد متاجر مفتوحة في مدينتك في هذا الوقت ، يرجى المحاولة لاحقًا",
  },
  welcome_page: {
    autorisations_text: "نحتاج إلى المعلومات التالية لتلبية طلباتك",
    localisation_text: "موقعك",
    localisation_button: "حفظ موقعي",
    phone_number_text: "رقم هاتفك",
    phone_number_button: " حفظ رقم هاتفي",
    skip_button: "المرة القادمة",
  },
  edit_location_page: {
    user_location: "استخدم موقعك",
    gps_off: "نظام تحديد المواقع الجغرافي غير مشغل",
    error_text:
      "نحتاج إلى موقعك لتقدير تكاليف عمليات التسليم الخاصة بك ، يرجى تفعيل نظام تحديد المواقع على جهازك ",
    try_again: "حاول مرة أخرى",
  },
  money: "درهم",
  profile: {
    orders_button: "طلباتي",
    client_service_button: "اتصل بخدمة العملاء",
    logout_button: "تسجيل الخروج",
    social_header: "انضم الينا",
    user_informations: {
      header: "معلومات المستخدم",
      edit_button: "تعديل",
      user_name: "اسم المستخدم",
      adress: "عنوان",
      instructions: "تعليمات التوصيل",
      phoneNumber: "رقم الهاتف ",
    },
    edit_user_informations: {
      header: "معلومات المستخدم",
      edit_button: "تحديث ",
      user_name: "اسم المستخدم",
      instructions: "تعليمات التوصيل",
    },
    phone_number: {
      header: "رقم الهاتف",
      add_phone_number: "أضف رقمك ",
      edit_phone_number: "تحديث",
    },
    location: {
      header: "الموقع الجغرافي",
      add_location: "أضف موقع",
      edit_location: "تحديث",
    },
    language_change_text: "تغيير اللغة",
  },
  order: {
    cancel_button: "إلغاء",
    total_amount: ": مجموع",
    livraison: "تكاليف الشحن",
    total: "المبلغ الإجمالي",
    status: {
      SENT: {
        header: "في الانتظار :",
        description:
          "يتم معالجة طلبك من طرف احد عملائنا للتحقق من طلبك و لتكليف احد الموصلين ",
      },
      CANCELED: {
        header: "ألغيت:",
        description: "لقد ألغيت هذا الطلب",
      },
      REFUSED: {
        header: "مرفوض",
        description:
          "تم رفض طلبك من قبل خدمتنا ، يرجى الاتصال بنا للحصول على مزيد من المعلومات.",
      },
      ACCEPTED: {
        header: "مقبول",
        description:
          "تم قبول طلبك وتم تعيين  أحد موظفي التوصيل لدينا وهو في طريقه إلى المتجر.",
      },
      COLLECTED: {
        header: "مستلم",
        description: "قام الموصل بتسلم طلبك وهو في طريقه إليك.",
      },
      DELIVERED: {
        header: "تم التوصيل",
        description: "تم تسليم الطلب.",
      },
      FAILED: {
        header: "تسليم مستحيل",
        description: "لم ننجح في التوصيل  الرجاء التواصل مع خدماتنا",
      },
    },
    empty_cart: {
      empty_state_text: "إنك لم تسجل اية طلبات حتى الآن",
    },
  },
  cart: {
    cancel_button: "إلغاء",
    validate_button: "تأكيد",
    total_order: " القيمة الإجمالية للطلبية",
    delivree_fees: "تكاليف التوصيل",
    total: "المجموع",
    empty_cart: {
      empty_state_text: "لا يوجد أي منتج في سلتك",
      orders_button: "طلباتي السابقة",
    },
  },
  confirmation_cart: {
    cancel_button: "الغاء",
    validate_button: " تأكيد الطلب",
    total_order: " القيمة الإجمالية للطلبية",
    delivree_fees: "تكاليف التوصيل",
    total: "المجموع",
  },
  store: {
    cart: "سلة",
  },
  product_modal: {
    validate_button: "أضف إلى السلة",
    cancel_button: "إلغاء",
  },
};
