import {
  Feather,
  AntDesign,
  Ionicons,
  MaterialIcons,
  Entypo,
  FontAwesome5,
  FontAwesome,
  EvilIcons,
} from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

import { ColorsType, SizesType } from "@/theme/types";
import { pixelToNumber } from "@/util/pixelToNumber";

// Define icon library types
type IconLibraries = {
  Feather: typeof Feather;
  Entypo: typeof Entypo;
  FontAwesome5: typeof FontAwesome5;
  AntDesign: typeof AntDesign;
  Ionicons: typeof Ionicons;
  MaterialIcons: typeof MaterialIcons;
  FontAwesome: typeof FontAwesome;
  EvilIcons: typeof EvilIcons;
};

type IconType = keyof IconLibraries;
type IconName<T extends IconType> = keyof IconLibraries[T]["glyphMap"];
type IconLibrary = IconLibraries[IconType];

// Define component props
type Props<T extends IconType> = {
  library: T;
  name: IconName<T>;
  color: ColorsType;
  size: SizesType;
  onPress?: () => void;
};

// Icon component
export default function IconUi<T extends IconType>({
  library,
  name,
  color,
  size,
  ...rest
}: Props<T>) {
  const theme = useTheme();

  // Create a map of icon libraries
  const IconLibraries: IconLibraries = {
    Feather,
    AntDesign,
    Ionicons,
    MaterialIcons,
    Entypo,
    FontAwesome5,
    FontAwesome,
    EvilIcons,
  };

  const IconComponent: IconLibrary = IconLibraries[library];

  return (
    <IconComponent
      color={theme.colors[color]}
      size={pixelToNumber(theme.sizes[size])}
      name={name}
      {...rest}
    />
  );
}
