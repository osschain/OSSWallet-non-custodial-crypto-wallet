import * as Clipboard from "expo-clipboard";
import React, { useState } from "react";

import IconUi from "./IconUi";

const CopyUi = ({
  text,
  onCopy = () => {},
}: {
  text: string;
  onCopy?: () => void;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await Clipboard.setStringAsync(text);
    setIsCopied(true);
    onCopy();
    setTimeout(() => setIsCopied(false), 1500);
  };

  return (
    <IconUi
      onPress={copy}
      library="Feather"
      name={isCopied ? "check" : "copy"}
      size="lg"
      color="icon-second"
    />
  );
};

export default CopyUi;
