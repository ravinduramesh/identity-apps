/**
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { ContentLoader } from "@wso2is/react-components";
import { IdentityProviderRolesInterface } from "../../../models";
import React, { FunctionComponent, ReactElement } from "react";
import { useDispatch } from "react-redux";

/**
 * Proptypes for the identity providers settings component.
 */
interface IdentityProviderSettingsPropsInterface {

    /**
     * Currently editing idp id.
     */
    idpId: string;

    /**
     * Claims of the IDP
     */
    claims: string;

    /**
     * Roles of the IDP
     */
    roles: IdentityProviderRolesInterface;

    /**
     * Is the idp info request loading.
     */
    isLoading?: boolean;

    /**
     * Callback to update the idp details.
     */
    onUpdate: (id: string) => void;
}

/**
 *  Identity Provider and advance settings component.
 *
 * @param {IdentityProviderSettingsPropsInterface} props - Props injected to the component.
 * @return {ReactElement}
 */
export const AttributeSettings: FunctionComponent<IdentityProviderSettingsPropsInterface> = (
    props: IdentityProviderSettingsPropsInterface
): ReactElement => {

    const {
        idpId,
        claims,
        roles,
        isLoading,
        onUpdate
    } = props;

    const dispatch = useDispatch();

    return (
        (!isLoading)
            ? (
                <div className="inbound-protocols-section">
                    <h2>Claims</h2>
                    <h2>Roles</h2>
                </div>
            )
            : <ContentLoader/>
    );
};
