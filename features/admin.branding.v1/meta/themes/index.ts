/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com).
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

import { DynamicBrandingPreferenceThemeInterface, PredefinedThemes } from "@wso2is/common.branding.v1/models";
import { DARK_THEME } from "./dark-theme";
import { LIGHT_THEME } from "./light-theme";
import { ThemeSwatchUIConfigsInterface } from "../../components/design/theme-swatch/theme-swatch";

export const THEMES: DynamicBrandingPreferenceThemeInterface = {
    [ PredefinedThemes.LIGHT ]: LIGHT_THEME,
    [ PredefinedThemes.DARK ]: DARK_THEME
};

export const THEME_SWATCH_UI_CONFIGS: {
    [ key in PredefinedThemes]: ThemeSwatchUIConfigsInterface
} = {
    [ PredefinedThemes.LIGHT ]: {
        colors: {
            headerBackground: "#f8f8fa",
            headerBorderColor: "#e9e9e9",
            pageBackground: LIGHT_THEME.colors.background.body.main,
            primary: LIGHT_THEME.colors.primary,
            secondary: LIGHT_THEME.colors.secondary
        },
        displayName: "Light",
        type: PredefinedThemes.LIGHT
    },
    [ PredefinedThemes.DARK ]: {
        colors: {
            headerBackground: "#121016",
            headerBorderColor: "#3c3c3c",
            pageBackground: DARK_THEME.colors.background.body.main,
            primary: DARK_THEME.colors.primary,
            secondary: DARK_THEME.colors.secondary
        },
        displayName: "Dark",
        type: PredefinedThemes.DARK
    }
};
