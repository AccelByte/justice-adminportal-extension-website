/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import React from "react";
import { Card, LoadingOrErrorWrapper, Page } from "justice-ui-library";
import networkManager from "~/api/networkManager";
import { RequestType } from "~/api/types";
import classNames from "classnames";
import { fetchStores } from "~/api/ecommerce/store";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Store } from "~/api/ecommerce/models/store";
import StoreList from "../components/StoreList";
import { t } from "~/utils/i18n/i18n";
import { showToastNotificationSuccess } from "~/utils/notification";

export const StoresPage = () => {
  const history = useHistory();
  const location = useLocation();
  const { namespace } = useParams<{ namespace: string }>();
  const [stores, setStores] = React.useState<RequestType<Store[]>>({
    data: [],
    error: null,
    isLoading: false,
  });

  const onViewClick = (store: Store) => {
    history.push(`${location.pathname}/${store.storeId}/items`);
  };

  React.useEffect(() => {
    setStores({ data: [], error: null, isLoading: true });
    const network = networkManager.withCredentials();
    fetchStores(network, namespace)
      .then((res) => {
        if (res.error) throw res.error;
        setStores({ data: res.response.data, error: null, isLoading: false });
      })
      .catch((err) => {
        console.error(err);
        setStores({ error: err, data: [], isLoading: false });
      });
  }, []);

  // This is only for cross-domain communication testing purposes
  // where the communication is done manually by the user.
  // Please do not remove
  const testShowToastNotification = (message: string) => {
    const element = (
      <div>
        <p>
          {message} <strong>using element</strong>
        </p>
      </div>
    );
    showToastNotificationSuccess(element);
    showToastNotificationSuccess(`${message} using string`);
  };

  return (
    <Page title={t("example.module.subModule2.storesPage.title")}>
      <Card
        cardTitle={t("example.module.subModule2.storesPage.stores.title")}
        buttonOnClick={() => testShowToastNotification("notification is successful")}
        buttonAppearance="primary"
        buttonText="click here to test the toast notification"
        noHorizontalMargin
        noPadding
      >
        <div className={classNames({ "mt-5": stores.isLoading })}>
          <LoadingOrErrorWrapper isLoading={stores.isLoading} error={stores.error} errorTitle={"Unable to show data"}>
            <StoreList stores={stores.data.filter((store) => store.published)} onView={onViewClick} />
          </LoadingOrErrorWrapper>
        </div>
      </Card>
    </Page>
  );
};
