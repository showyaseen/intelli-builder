import { useState, useEffect } from 'react';
import ApiKeySettings from './ApiKeySettings';
import apiFetch from '@wordpress/api-fetch';

const App = () => {
    const [settings, setSettings] = useState({
        enable_chatgpt: false,
        chatgpt_api_key: '',
        enable_gemini: false,
        gemini_api_key: ''
    });

    useEffect(() => {
        apiFetch({
            url: intellibuilderSettings.apiUrl,
            method: 'GET',
            headers: {
				'Content-Type':'application/json',
                'X-WP-Nonce': intellibuilderSettings.nonce
            }
        }).then((response) => {
            setSettings(response);
        });
    }, []);

    const handleSave = () => {
        apiFetch({
            url: intellibuilderSettings.apiUrl,
            method: 'POST',
            headers: {
				'Content-Type':'application/json',
                'X-WP-Nonce': intellibuilderSettings.nonce
            },
            body: JSON.stringify(settings)
        }).then(() => {
            alert('Settings saved!');
        });
    };

    return (
        <div>
            <h1>IntelliBuilder Settings</h1>
            <ApiKeySettings
                label="Enable ChatGPT"
                enabled={settings.enable_chatgpt}
                apiKey={settings.chatgpt_api_key}
                onToggle={(enabled) => setSettings({ ...settings, enable_chatgpt: enabled })}
                onApiKeyChange={(apiKey) => setSettings({ ...settings, chatgpt_api_key: apiKey })}
            />
            <ApiKeySettings
                label="Enable Gemini"
                enabled={settings.enable_gemini}
                apiKey={settings.gemini_api_key}
                onToggle={(enabled) => setSettings({ ...settings, enable_gemini: enabled })}
                onApiKeyChange={(apiKey) => setSettings({ ...settings, gemini_api_key: apiKey })}
            />
            <button onClick={handleSave}>Save Settings</button>
        </div>
    );
};

export default App;
