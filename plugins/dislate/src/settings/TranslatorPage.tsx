import { getAssetIDByName } from "@vendetta/ui/assets";
import { React, ReactNative } from "@vendetta/metro/common";
import { Forms } from "@vendetta/ui/components";
import { showToast } from "@vendetta/ui/toasts";
import { useProxy } from "@vendetta/storage";
import { settings } from "..";

export default () => {
    useProxy(settings);
    const { FormRow, FormInput } = Forms;
    const { ScrollView } = ReactNative;
    return (
        <ScrollView style={{ flex: 1 }}>
            <FormRow
                label="DeepL"
                trailing={() => <FormRow.Arrow />}
                onPress={() => {
                    if (settings.translator === 0) return;
                    settings.translator = 0;
                    showToast(`Saved Translator to DeepL`, getAssetIDByName("check"));
                }}
                selected={settings.translator === 0}
            />
            <FormRow
                label="Google Translate"
                trailing={() => <FormRow.Arrow />}
                onPress={() => {
                    if (settings.translator === 1) return;
                    settings.translator = 1;
                    showToast(`Saved Translator to Google Translate`, getAssetIDByName("check"));
                }}
                selected={settings.translator === 1}
            />
            <FormRow
                label="Gemini (Google AI)"
                trailing={() => <FormRow.Arrow />}
                onPress={() => {
                    if (settings.translator === 2) return;
                    settings.translator = 2;
                    showToast(`Saved Translator to Gemini`, getAssetIDByName("check"));
                }}
                selected={settings.translator === 2}
            />
            {settings.translator === 2 && (
                <>
                    <FormInput
                        title="Gemini API Key"
                        value={settings.gemini_api_key || ""}
                        onChange={v => settings.gemini_api_key = v}
                        placeholder="Paste your Gemini API key here"
                    />
                    <FormInput
                        title="Gemini Model"
                        value={settings.gemini_model || "gemini-pro"}
                        onChange={v => settings.gemini_model = v}
                        placeholder="gemini-pro"
                    />
                    <FormInput
                        title="Prompt"
                        value={settings.gemini_prompt || "Translate '{text}' to {lang}."}
                        onChange={v => settings.gemini_prompt = v}
                        placeholder="Translate '{text}' to {lang}."
                        multiline
                    />
                </>
            )}
        </ScrollView>
    );
}