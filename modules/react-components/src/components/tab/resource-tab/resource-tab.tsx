/**
 * Copyright (c) 2020, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
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

import { IdentifiableComponentInterface, TestableComponentInterface } from "@wso2is/core/models";
import classNames from "classnames";
import inRange from "lodash-es/inRange";
import React, { FunctionComponent, MouseEvent, ReactElement, useEffect, useState } from "react";
import { MenuProps, Tab, TabProps } from "semantic-ui-react";
import { ResourceTabPane } from "./resource-tab-pane";

/**
 * Interface for the resource tab sub components.
 */
export interface ResourceTabSubComponentsInterface {
    Pane: typeof ResourceTabPane;
}

/**
 * Resource tabs component Prop types.
 */
export interface ResourceTabPropsInterface extends TabProps, IdentifiableComponentInterface,
    TestableComponentInterface {

    /**
     * Custom class for the component.
     */
    className?: string;
    /**
     * Callback to set the panes list length.
     */
    onInitialize?: ({ panesLength }: { panesLength: number }) => void;
    /**
     * Is the tab menu and content attached?
     */
    attached?: MenuProps[ "attached" ];
    /**
     * Is the tab menu has pointed items.
     */
    pointing?: MenuProps[ "pointing" ];
    /**
     * Is the tab menu in secondary variation.
     */
    secondary?: MenuProps[ "secondary" ];
    /**
     * Specifies if it is needed to redirect to a specific tabindex
     */
    isAutomaticTabRedirectionEnabled?: boolean;
    /**
     * Specifies, to which tab(tabid) it need to redirect.
     */
    tabIdentifier?: string;
}

/**
 * Resource tab component.
 *
 * @param props - Props injected to the component.
 *
 * @returns Resource tab component
 */
export const ResourceTab: FunctionComponent<ResourceTabPropsInterface> & ResourceTabSubComponentsInterface = (
    props: ResourceTabPropsInterface
): ReactElement => {

    const {
        attached,
        className,
        onInitialize,
        panes,
        defaultActiveIndex,
        pointing,
        secondary,
        onTabChange,
        isAutomaticTabRedirectionEnabled,
        tabIdentifier,
        [ "data-componentid" ]: componentId,
        [ "data-testid" ]: testId,
        ...rest
    } = props;

    const classes = classNames(
        "tabs resource-tabs",
        {
            "attached": attached
        }
        , className
    );

    const [ activeIndex, setActiveIndex ] = useState(defaultActiveIndex);

    useEffect(() => {
        setActiveIndex(defaultActiveIndex);
    }, [ defaultActiveIndex ]);

    /**
     * Called to set the pane index as the active tab index if it is needed to redirect to a specific tab
     */
    useEffect(() => {
        if (isAutomaticTabRedirectionEnabled) {
            const tabIndex: number = panes.indexOf(panes.find(element => element["data-tabid"] === tabIdentifier));
            
            if (inRange(tabIndex,  0, panes.length)) {
                if (tabIndex === activeIndex) {
                    return;
                }
                setActiveIndex(tabIndex);
            } else {
                setActiveIndex(defaultActiveIndex);
            }
        }
        
    }, []);

    /**
     * Called to set the panes list length initially.
     */
    useEffect(()=> {

        if(onInitialize && typeof onInitialize === "function") {
            onInitialize({ panesLength: panes.length });
        }
    }, []);

    /**
     * Handles the tab change.
     */
    const handleTabChange = (e, activeIndex) => {
        setActiveIndex(activeIndex);
    };

    return (
        <Tab
            onTabChange={ (e: MouseEvent<HTMLDivElement>, data: TabProps ) => {
                handleTabChange(e, data.activeIndex);
                onTabChange && typeof onTabChange === "function" && onTabChange(e, data);
            } }
            className={ classes }
            menu={ {
                attached,
                pointing,
                secondary
            } }
            panes={ panes }
            activeIndex={ activeIndex }
            data-componentid={ componentId }
            data-testid={ testId }
            { ...rest }
        />
    );
};

/**
 * Default props for the resource tab component.
 */
ResourceTab.defaultProps = {
    attached: false,
    "data-componentid": "resource-tabs",
    "data-testid": "resource-tabs",
    isAutomaticTabRedirectionEnabled: false,
    pointing: true,
    secondary: true,
    tabIdentifierURLFrag: ""
};

ResourceTab.Pane = ResourceTabPane;
