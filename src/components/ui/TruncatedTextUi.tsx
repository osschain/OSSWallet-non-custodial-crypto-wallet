import React, { ComponentPropsWithoutRef } from "react";
import { Text, View } from "react-native";

import BodyTextUi from "./BodyTextUi";

type PropsType = {
  text: string;
  maxLength: number;
  startLength: number;
  endLength: number;
} & ComponentPropsWithoutRef<typeof BodyTextUi>;
const TruncatedText = ({
  text,
  maxLength,
  startLength,
  endLength,
  ...props
}: PropsType) => {
  if (text.length <= maxLength) {
    return <Text>{text}</Text>;
  }

  const startText = text.substring(0, startLength);
  const endText = text.substring(text.length - endLength, text.length);

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <BodyTextUi {...props}>{startText}</BodyTextUi>
      <BodyTextUi {...props}>...</BodyTextUi>
      <BodyTextUi {...props}>{endText}</BodyTextUi>
    </View>
  );
};

export default TruncatedText;

// const App = () => {
//   const longText = 'Hello, this is a very long piece of text that we want to truncate in the middle!';

//   return (
//     <View style={{ padding: 20 }}>
//       <TruncatedText
//         text={longText}
//         maxLength={30}
//         startLength={10}
//         endLength={10}
//       />
//     </View>
//   );
// };
