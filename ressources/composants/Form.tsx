import { DimensionValue, View } from "react-native";
import { Text } from "~/components/ui/text";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { FormInputs } from "../interfaces/FormInputs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";

export default function Form({
  inputs,
  heigth,
  width,
  callback,
}: {
  inputs: FormInputs;
  heigth?: DimensionValue;
  width?: DimensionValue;
  callback?: (inputs: FormInputs) => void;
}) {
  const [formInputs, setFormInputs] = useState(inputs);
  return (
    <Card style={{ width: width, height: heigth }}>
      <CardHeader>
        <CardTitle>{inputs.title}</CardTitle>
        <CardDescription>{inputs.description}</CardDescription>
      </CardHeader>
      <CardContent style={{ gap: inputs.gap || 15 }}>
        {inputs.inputs.map((input, index) => (
          <View key={index}>
            {inputs.label && <Label>{input.name}</Label>}
            <Input
              className="w-full"
              placeholder={input.placeholder}
              secureTextEntry={input.secureTextEntry}
              onChangeText={(text) => {
                const newInputs = { ...formInputs };
                newInputs.inputs[index].value = text;
                setFormInputs(newInputs);
              }}
            />
          </View>
        ))}

        <View style={{ marginTop: 20 }}>
          <Button onPressOut={() => callback && callback(formInputs)}>
            <Text>{inputs.submitName}</Text>
          </Button>
        </View>
      </CardContent>
    </Card>
  );
}
