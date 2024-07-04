import { ComponentPropsWithoutRef } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  ListRenderItem,
  TouchableOpacity,
} from "react-native";
import { FlatList, RefreshControl } from "react-native-gesture-handler";

import BodyTextUi from "./BodyTextUi";
import SpacerUi from "./SpacerUi";

type FlatListUiProps = {
  data: any[] | undefined | null;
  renderItem: ListRenderItem<any>;
  onRefresh?: () => void;
  showLoadMore?: boolean;
  isRefetching?: boolean;
  onLoadMore?: () => void;
} & ComponentPropsWithoutRef<typeof FlatList>;

const FlatListUi: React.FC<FlatListUiProps> = ({
  data,
  renderItem,
  onRefresh,
  showLoadMore = false,
  isRefetching,
  onLoadMore,
  ...rest
}) => {
  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      ListFooterComponent={() => (
        <>
          <LoadMore
            showLoadMore={showLoadMore}
            onLoadMore={onLoadMore}
            isRefetching={isRefetching}
          />
        </>
      )}
      refreshControl={
        <>
          {onRefresh ? (
            <RefreshControl
              onRefresh={async () => {
                onRefresh();
              }}
              refreshing={false}
            />
          ) : null}
        </>
      }
      {...rest}
    />
  );
};

type LoadMoreProps = {
  showLoadMore?: boolean;
  isRefetching?: boolean;
  onLoadMore?: () => void;
};

const LoadMore: React.FC<LoadMoreProps> = ({
  showLoadMore,
  isRefetching,
  onLoadMore,
}) => {
  const { t } = useTranslation();

  if (showLoadMore) {
    return (
      <SpacerUi style={{ padding: 20 }}>
        {isRefetching ? (
          <ActivityIndicator />
        ) : (
          <TouchableOpacity onPress={onLoadMore}>
            <BodyTextUi color="blue-500" style={{ textAlign: "center" }}>
              {t("shared.loadMore")}
            </BodyTextUi>
          </TouchableOpacity>
        )}
      </SpacerUi>
    );
  }

  return null;
};

export default FlatListUi;
