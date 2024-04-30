import { ComponentPropsWithRef } from "react";
import { Control, Controller } from "react-hook-form";

import BodyTextUi from "./BodyTextUi";

import SpacerUi from "@/components/ui/SpacerUi";
import TextInputUi from "@/components/ui/TextInputUi";

type propsType = {
  control: Control<any>;
  errors: any;
  name: string;
} & ComponentPropsWithRef<typeof TextInputUi>;

const ControllTextInputUi = ({ control, name, errors, ...rest }: propsType) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInputUi {...rest} value={value} onChangeText={onChange} />
        )}
      />
      <SpacerUi size="xl" />
      {errors[name] && (
        <BodyTextUi color="red-500">{errors[name].message}</BodyTextUi>
      )}
    </>
  );
};

export default ControllTextInputUi;
