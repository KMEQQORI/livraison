export default {
  titles: {
    confirmation_screen: "Confirmer les informations de livraison",
    commande_list: "Liste de vos commandes",
    store: "Choisissez vos produits",
    user_location: "Ajouter votre adresse",
    user_phone_number: "Ajouter votre numéro",
    user_information: "Ajouter vos informations",
  },
  alerts: {
    login_page: {
      wrong_number_title: "Numéro de téléphone erroné",
      wrong_number_body:
        "le Numéro que vous avez saisi n'est pas valable. Veuillez ressayer",
      wrong_number_cancel_button: "Réessayez",
    },
    confirm_cart_page: {
      wrong_profile_alert:
        "Veuillez remplir tous ces informations pour pouvoir confirmer votre commande",
    },
  },
  login_page: {
    main_title: "Livraison",
    secondary_title: "Rapide",
    input_text: "Utilisez votre numéro de téléphone pour vous connecter",
  },
  login_check_page: {
    insert_phone_code:
      "Entrez le code à 4 chiffres que vous avez reçu sur le numéro",
    wrong_phone_number: "Le code inséré n'est pas bon veuillez réssayer",
  },
  service_page: {
    main_title: "Services proposés",
  },
  home_page: {
    change_service_button: "Services",
    change_location: "Position",
    location_alert_button_text: "ajouter votre position",
    localisation_alert:
      "Afin de nous permettre le calcul des frais de livraison plus précisément ,veuillez nous partager votre position actuelle",
    empty_store:
      "aucun magasin n'est ouvert dans votre ville à cette heure, Veuillez réssayer ultérieurement",
  },
  welcome_page: {
    autorisations_text:
      "Nous avons besoin des informations suivantes pour le bon déroulement de vos commandes",
    localisation_text: "Votre position",
    localisation_button: "Enregistrer ma position",
    phone_number_text: "Votre Numéro de téléphone",
    phone_number_button: " Enregistrer mon numéro",
    skip_button: "passer",
  },
  edit_location_page: {
    user_location: "Utiliser cette position",
    gps_off: "GPS désactivé",
    error_text:
      "On a besoin de votre position pour estimer les frais de vos livraisons, Veuillez activer le gps sur votre appareil",
    try_again: "Réssayer",
  },
  money: "dh",
  profile: {
    orders_button: "Mes commandes",
    client_service_button: "Appeler le service client",
    logout_button: "Se déconnecter",
    social_header: "Rejoignez-nous",
    user_informations: {
      header: "Informations utilisateur ",
      edit_button: "Changer ",
      user_name: "Nom d'utilisateur : ",
      adress: "Adresse : ",
      instructions: "Instructions de livraison :",
      phoneNumber: "Numéro téléphone : ",
    },
    edit_user_informations: {
      header: "Informations",
      edit_button: "changer ",
      user_name: "Nom: ",
      instructions: "Instructions de livraison :",
    },
    phone_number: {
      header: "Numéro téléphone",
      add_phone_number: "Ajouter votre numéro ",
      edit_phone_number: "changer",
    },
    location: {
      header: "Adresse",
      add_location: "Ajouter votre adresse ",
      edit_location: "changer",
    },
    language_change_text: "changer la langue ",
  },
  order: {
    cancel_button: "Annuler",
    total_amount: "Total commande : ",
    livraison: "Frais livraison : ",
    total: "Total à régler : ",
    status: {
      SENT: {
        header: "En attente",
        description:
          "votre commande est prise en charge par l'un de nos agents pour validation et attribution d'un livreur, temps estimé de cette étape : 5mn.",
      },
      CANCELED: {
        header: "Annulée",
        description: "Vous avez annulé cette commande.",
      },
      REFUSED: {
        header: "Refusée",
        description:
          "Votre commande a été réfusée par nos service ,Veuillez nous contacter pour plus d'informations.",
      },
      ACCEPTED: {
        header: "Acceptée",
        description:
          "Votre commande à été acceptée par nos services et attribuée à l'un de nos livreurs qui est en route vers le magasin choisi.",
      },
      COLLECTED: {
        header: "Récupérée",
        description:
          "notre livreur a recupéré votre commande et il est en chemin vers vous.",
      },
      DELIVERED: {
        header: "Livrée",
        description: "Commande bien livrée.",
      },
      FAILED: {
        header: "livraison impossile",
        description:
          "on a pas reussi à vous livrer veuillez contacter nos services",
      },
    },
    empty_cart: {
      empty_state_text: "Vous n'avez pas encore effectué de commande.",
    },
  },
  cart: {
    cancel_button: "Annuler",
    validate_button: "Valider",
    total_order: "Total de la commande",
    delivree_fees: "Frais de livraison",
    total: "Total à régler ",
    empty_cart: {
      empty_state_text: "Vous n'avez pas de produit dans votre panier .",
      orders_button: "Mes Commandes",
    },
  },
  confirmation_cart: {
    cancel_button: "Annuler",
    validate_button: "Confirmer la livraison",
    total_order: "Total de la commande",
    delivree_fees: "Frais de livraison",
    total: "Total à régler ",
  },
  store: {
    cart: "Panier",
  },
  product_modal: {
    validate_button: "Ajouter au panier",
    cancel_button: "Annuler",
  },
};
