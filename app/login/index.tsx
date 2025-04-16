import { useNavigation } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { AccountManager } from "~/ressources/Account/AccountManager";
import Form from "~/ressources/composants/Form";
import { FormInputs } from "~/ressources/interfaces/FormInputs";

export default function Login() {
  const nav = useNavigation();
  AccountManager.isLoggedIn().then((isLoggedIn) => {
    if (isLoggedIn) nav.replace("(tabs)/index");
  });
  const inputs: FormInputs = {
    title: "Login",
    description: "Please enter your credentials",
    submitName: "Se connecter",
    inputs: [
      {
        placeholder: "prenom.nom.etu",
        name: "Identifiant",
        value: "",
      },
      {
        name: "mot de passe",
        value: "",
        placeholder: "********",
        secureTextEntry: true,
      },
    ],
  };
  const [formInputs, setFormInputs] = useState(inputs);
  const handleSubmit = (form: FormInputs) => {
    Toast.show({
      type: "info",
      text1: "Connexion en cours...",
      position: "top",
    });
    AccountManager.login(
      form.inputs[0].value ?? "",
      form.inputs[1].value ?? ""
    ).then((res) => {
      if (res) {
        Toast.show({
          type: "success",
          text2: "Bienvenue sur l'application",
          text1: "Connexion réussie",
          position: "top",
        });
        setTimeout(() => {
          console.log("Login successful");
          nav.replace("(tabs)/index");
        }, 1000);
      } else {
        console.log("Login failed");
        Toast.show({
          type: "error",
          text1: "Erreur de connexion",
          text2: "Identifiant ou mot de passe incorrect",
          position: "top",
        });
      }
    });
  };
  return (
    <View className="h-full w-full items-center justify-center">
      <Form inputs={formInputs} width={"90%"} callback={handleSubmit} />
    </View>
  );
}
