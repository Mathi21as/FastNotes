import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  es: {
    translation: {
      "No notes to show. Add one by pressing \"+\"": "No hay notas para mostrar. Agrega una pulsando \"+\"",
			"Jan": "Ene",
			"Apr": "Abr",
			"Aug": "Ago",
			"Dec": "Dic",
			"Last modification: ": "Última modificación: ",
			"Title": "Titulo",
			"Title Empty": "Sin Titulo",
			"Text Empty": "Sin Texto",
			"Type something...": "Escribe algo...",
			"New Item": "Nuevo Item",
			"No items. Add one pressing": "No hay items. Agregue uno presionando",
			"and then": "y luego",
			"Select type note": "Seleccione el tipo de nota",
			"Note": "Nota",
			"List": "Lista",

			"On this version, the notes only save on local storage \
														of the navigator, so if you delete the data of your \
														navigator, will lose your notes.\
														On the next version your notes will save on your Google\
														Drive and if you don't sign in with your Google user,\
														your notes will save on the navigator."
			:
			"En esta versión, sus notas se guardaran en el almacenamiento local del \
			navegador, entonces si usted borra los datos del navegador, perderá sus \
			notas. En la siguiente versión sus notas se guardaran en su cuenta de \
			Google Drive y si no ingresa con su cuenta de Google,l sus notas se \
			guardaran en el navegador.",

			"Close": "Cerrar",
			"Change theme": "Cambiar tema",
			"Change language": "Cambiar idioma",
			"Web App info": "Informacion de la aplicacion web",
			"Delete": "Eliminar",
			"Developed by": "Desarrollado por",
		}
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "es-ES",// language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;