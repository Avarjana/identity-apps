/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com).
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
import Card from "@oxygen-ui/react/Card";
import CardContent from "@oxygen-ui/react/CardContent";
import Stack from "@oxygen-ui/react/Stack";
import Typography from "@oxygen-ui/react/Typography";
import { AppConstants, history } from "@wso2is/admin.core.v1";
import { AlertLevels, IdentifiableComponentInterface } from "@wso2is/core/models";
import { addAlert } from "@wso2is/core/store";
import kebabCase from "lodash-es/kebabCase";
import React, { FunctionComponent, HTMLAttributes, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { Icon } from "semantic-ui-react";
import { Popup } from "../../../modules/react-components/src";
import { deletePolicy, publishPolicy } from "../api/entitlement-policies";
import { PolicyInterface } from "../models/policies";
import "./policy-list-node.scss";

/**
 * Props interface of {@link PolicyListDraggableNode}
 */
export interface PolicyListDraggableNodePropsInterface
    extends IdentifiableComponentInterface,
        HTMLAttributes<HTMLDivElement> {
    /**
     * The node that is being dragged.
     */
    policy: PolicyInterface;
    mutateInactivePolicyList?: () => void;
    setInactivePolicies?: React.Dispatch<React.SetStateAction<PolicyInterface[]>>;
    setPageInactive: React.Dispatch<React.SetStateAction<number>>;
    setHasMoreInactivePolicies: React.Dispatch<React.SetStateAction<boolean>>;
    mutateActivePolicyList?: () => void;
}

const PolicyListNode: FunctionComponent<PolicyListDraggableNodePropsInterface> = ({
    "data-componentid": componentId = "policy-list--node",
    id,
    policy,
    mutateInactivePolicyList,
    setInactivePolicies,
    setPageInactive,
    setHasMoreInactivePolicies,
    mutateActivePolicyList,
    ...rest
}: PolicyListDraggableNodePropsInterface): ReactElement => {
    const { t } = useTranslation();

    const dispatch: Dispatch = useDispatch();

    const handleEdit = (policyId: string) => {
        history.push(`${AppConstants.getPaths().get("EDIT_POLICY").replace(":id", kebabCase(policyId))}`);
    };

    const handleDelete = async (): Promise<void> => {
        try {
            await deletePolicy(policy.policyId);

            setPageInactive(0);
            setHasMoreInactivePolicies(true);
            setInactivePolicies([]);

            dispatch(addAlert({
                description: "The policy has been deleted successfully",
                level: AlertLevels.SUCCESS,
                message: "Delete successful"
            }));

            mutateInactivePolicyList();

        } catch (error) {
            // Dispatch the error alert.
            dispatch(addAlert({
                description: "An error occurred while deleting the policy",
                level: AlertLevels.ERROR,
                message: "Delete error"
            }));
        }
    };





    const handleActivate = async () : Promise<void> => {
        try{
            await publishPolicy({
                action: "CREATE",
                enable: true,
                order: 0,
                policyIds: [ `${policy.policyId}` ],
                subscriberIds: [ "PDP Subscriber" ]
            });

            setPageInactive(0);
            setHasMoreInactivePolicies(true);
            setInactivePolicies([]);

            mutateActivePolicyList();
            mutateInactivePolicyList();

        } catch ( error ) {
            dispatch(addAlert({
                description: "An error occurred while activating the policy",
                level: AlertLevels.ERROR,
                message: "Activation error"
            }));
        }
    };

    return (
        <Card variant="outlined" className="policy-list-node">
            <CardContent>
                <Stack direction={ "row" } justifyContent={ "space-between" }>
                    <Stack direction={ "row" } spacing={ 1 } >
                        <Popup
                            trigger={ (
                                <Icon
                                    onClick={ handleActivate }
                                    data-componentid={ `${componentId}-edit-button` }
                                    className="list-icon"
                                    size="massive"
                                    color="grey"
                                    name="chevron left"
                                />
                            ) }
                            position="top center"
                            content={ "Deactivate" }
                            inverted
                        />
                        <Typography>{ policy.policyId }</Typography>
                    </Stack>
                    <Stack direction={ "row" } marginTop={ "3px" }>
                        <Popup
                            trigger={ (
                                <Icon
                                    link={ true }
                                    onClick={ () => handleEdit(policy.policyId) }
                                    data-componentid={ `${componentId}-edit-button` }
                                    className="list-icon"
                                    size="small"
                                    color="grey"
                                    name="pencil alternate"
                                />
                            ) }
                            position="top center"
                            content={ "Edit" }
                            inverted
                        />
                        <Popup
                            trigger={ (
                                <Icon
                                    onClick={ handleDelete }
                                    data-componentid={ `${componentId}-edit-button` }
                                    className="list-icon"
                                    size="small"
                                    color="grey"
                                    name="trash alternate"
                                />
                            ) }
                            position="top center"
                            content={ "Delete" }
                            inverted
                        />
                    </Stack>
                </Stack>
            </CardContent>
        </Card>

    );
};

export default PolicyListNode;
